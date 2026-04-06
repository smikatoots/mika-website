/**
 * One-shot / occasional sync: Projects Notion DB → content/projects/*.mdx,
 * public/projects/covers/*, and content/projects/manifest.json
 *
 * Run: npm run sync:projects
 * Requires NOTION_API_KEY and access to the Projects database.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { getNotionClient } from "../src/lib/notion/client";
import { slugifyTitleForBlog } from "../src/lib/slugify";

const DATABASE_ID = "7e16a0d55d8e4ea6b85314dd561f9690";

type TagInfo = { name: string; color: string };

type ManifestEntry = {
  slug: string;
  title: string;
  url: string | null;
  tags: TagInfo[];
  cover: string | null;
  launchDate: string | null;
  notionPageId: string;
};

function getDataSourceIdFromDatabase(db: {
  data_sources?: Array<{ id: string }>;
}): string {
  const ds = db.data_sources?.[0]?.id;
  if (!ds) throw new Error("Database has no data_sources");
  return ds;
}

function titleFromPage(page: {
  properties: Record<string, unknown>;
}): string {
  for (const p of Object.values(page.properties)) {
    const prop = p as { type?: string; title?: Array<{ plain_text: string }> };
    if (prop.type === "title" && prop.title?.length) {
      return prop.title.map((t) => t.plain_text).join("");
    }
  }
  return "Untitled";
}

function urlFromPage(page: {
  properties: Record<string, unknown>;
}): string | null {
  for (const p of Object.values(page.properties)) {
    const prop = p as { type?: string; url?: string | null };
    if (prop.type === "url") return prop.url ?? null;
  }
  return null;
}

function tagsFromPage(page: {
  properties: Record<string, unknown>;
}): TagInfo[] {
  for (const p of Object.values(page.properties)) {
    const prop = p as {
      type?: string;
      multi_select?: Array<{ name: string; color: string }>;
    };
    if (prop.type === "multi_select" && prop.multi_select?.length) {
      return prop.multi_select.map((t) => ({
        name: t.name,
        color: t.color,
      }));
    }
  }
  return [];
}

function launchDateFromPage(page: {
  properties: Record<string, unknown>;
}): string | null {
  for (const p of Object.values(page.properties)) {
    const prop = p as {
      type?: string;
      date?: { start: string } | null;
    };
    if (prop.type === "date" && prop.date?.start) return prop.date.start;
  }
  return null;
}

function uniqueSlug(base: string, used: Set<string>): string {
  let s = base;
  let n = 2;
  while (used.has(s)) {
    s = `${base}-${n}`;
    n += 1;
  }
  used.add(s);
  return s;
}

function extFromUrl(u: string): "png" | "jpg" | "webp" | "gif" {
  const lower = u.toLowerCase();
  if (lower.includes(".jpg") || lower.includes(".jpeg")) return "jpg";
  if (lower.includes(".webp")) return "webp";
  if (lower.includes(".gif")) return "gif";
  return "png";
}

async function downloadImage(url: string, dest: string): Promise<void> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url.slice(0, 80)}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
}

function rewriteMarkdownImages(
  markdown: string,
  slug: string,
): { body: string; files: { url: string; filename: string }[] } {
  const files: { url: string; filename: string }[] = [];
  let i = 0;
  const body = markdown.replace(
    /!\[([^\]]*)\]\((https:\/\/[^)\s]+)\)/g,
    (_m, alt, imageUrl: string) => {
      const ext = extFromUrl(imageUrl);
      const filename = `${slug}-${i}.${ext}`;
      i += 1;
      files.push({ url: imageUrl, filename });
      return `![${alt}](/projects/covers/${filename})`;
    },
  );
  return { body, files };
}

async function main() {
  const notion = getNotionClient();
  const db = await notion.databases.retrieve({ database_id: DATABASE_ID });
  const dataSourceId = getDataSourceIdFromDatabase(
    db as { data_sources?: Array<{ id: string }> },
  );

  let cursor: string | undefined;
  const pages: Array<{ object: string; id: string; properties: Record<string, unknown> }> =
    [];

  do {
    const res = await notion.dataSources.query({
      data_source_id: dataSourceId,
      start_cursor: cursor,
      page_size: 100,
    });
    for (const r of res.results) {
      if (
        typeof r === "object" &&
        r !== null &&
        "object" in r &&
        (r as { object: string }).object === "page" &&
        "properties" in r
      ) {
        pages.push(r as (typeof pages)[0]);
      }
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  pages.sort(
    (a, b) =>
      (launchDateFromPage(b) ?? "").localeCompare(launchDateFromPage(a) ?? "") ||
      titleFromPage(a).localeCompare(titleFromPage(b)),
  );

  const outDir = path.join(process.cwd(), "content/projects");
  const covDir = path.join(process.cwd(), "public/projects/covers");
  await mkdir(outDir, { recursive: true });
  await mkdir(covDir, { recursive: true });

  const manifest: ManifestEntry[] = [];
  const usedSlugs = new Set<string>();

  let n = 0;
  for (const page of pages) {
    n += 1;
    const title = titleFromPage(page);
    const baseSlug = slugifyTitleForBlog(title);
    const slug = uniqueSlug(baseSlug, usedSlugs);
    const linkUrl = urlFromPage(page);
    const tags = tagsFromPage(page);
    const launchDate = launchDateFromPage(page);

    const mdRes = await notion.pages.retrieveMarkdown({ page_id: page.id });
    let markdown = (mdRes.markdown ?? "").trim();
    markdown = markdown.replace(/<empty-block\/>/g, "").trim();

    const { body: bodyAfter, files } = rewriteMarkdownImages(markdown, slug);
    for (const f of files) {
      const dest = path.join(covDir, f.filename);
      try {
        await downloadImage(f.url, dest);
        process.stdout.write(`  [img] ${slug} ← ${f.filename}\n`);
      } catch (e) {
        console.warn(`  [warn] skip image ${f.filename}:`, (e as Error).message);
      }
    }

    const cover =
      files.length > 0 ? `/projects/covers/${files[0]!.filename}` : null;

    const frontmatter = {
      title,
      slug,
      url: linkUrl,
      tags,
      cover,
      launchDate,
      notionPageId: page.id,
    };

    const fileContent = matter.stringify(bodyAfter || "_No description yet._\n", frontmatter);
    await writeFile(path.join(outDir, `${slug}.mdx`), fileContent, "utf-8");
    process.stdout.write(`  [${n}] ${slug} — ${title.slice(0, 50)}\n`);

    manifest.push({
      slug,
      title,
      url: linkUrl,
      tags,
      cover,
      launchDate,
      notionPageId: page.id,
    });
  }

  await writeFile(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), projects: manifest }, null, 2)}\n`,
    "utf-8",
  );

  console.log(`\nSynced ${manifest.length} project(s) → content/projects/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
