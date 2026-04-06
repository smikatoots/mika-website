/**
 * One-shot sync: Press Notion DB → content/press/*.mdx,
 * public/press/covers/*, content/press/manifest.json
 *
 * Run: npm run sync:press
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { getNotionClient } from "../src/lib/notion/client";
import { slugifyTitleForBlog } from "../src/lib/slugify";

const DATABASE_ID = "709d852ea89a4c8c91ef3936c5b50323";

type ManifestEntry = {
  slug: string;
  title: string;
  url: string | null;
  cover: string | null;
  notionPageId: string;
  lastEdited: string;
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

type NotionPageCover = {
  cover?: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  } | null;
};

function coverUrlFromPage(page: NotionPageCover): string | null {
  const c = page.cover;
  if (!c) return null;
  if (c.type === "external" && c.external?.url) return c.external.url;
  if (c.type === "file" && c.file?.url) return c.file.url;
  return null;
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
      return `![${alt}](/press/covers/${filename})`;
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
  type PageRow = {
    object: string;
    id: string;
    last_edited_time: string;
    cover?: unknown;
    properties: Record<string, unknown>;
    in_trash?: boolean;
    is_archived?: boolean;
  };
  const pages: PageRow[] = [];

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
        const p = r as PageRow;
        if (p.in_trash || p.is_archived) continue;
        pages.push(p);
      }
    }
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);

  pages.sort(
    (a, b) =>
      new Date(b.last_edited_time).getTime() -
      new Date(a.last_edited_time).getTime(),
  );

  const outDir = path.join(process.cwd(), "content/press");
  const covDir = path.join(process.cwd(), "public/press/covers");
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
    const lastEdited = page.last_edited_time;

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

    let cover: string | null =
      files.length > 0 ? `/press/covers/${files[0]!.filename}` : null;

    if (!cover) {
      const full = await notion.pages.retrieve({ page_id: page.id });
      const coverRemote = coverUrlFromPage(full as NotionPageCover);
      if (coverRemote) {
        const ext = extFromUrl(coverRemote);
        const fn = `${slug}-cover.${ext}`;
        try {
          await downloadImage(coverRemote, path.join(covDir, fn));
          cover = `/press/covers/${fn}`;
          process.stdout.write(`  [cover] ${slug} ← ${fn}\n`);
        } catch (e) {
          console.warn(`  [warn] skip cover ${slug}:`, (e as Error).message);
        }
      }
    }

    const frontmatter = {
      title,
      slug,
      url: linkUrl,
      cover,
      notionPageId: page.id,
      lastEdited,
    };

    const fileContent = matter.stringify(
      bodyAfter || "_No description yet._\n",
      frontmatter,
    );
    await writeFile(path.join(outDir, `${slug}.mdx`), fileContent, "utf-8");
    process.stdout.write(`  [${n}] ${slug} — ${title.slice(0, 56)}\n`);

    manifest.push({
      slug,
      title,
      url: linkUrl,
      cover,
      notionPageId: page.id,
      lastEdited,
    });
  }

  await writeFile(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify({ generatedAt: new Date().toISOString(), items: manifest }, null, 2)}\n`,
    "utf-8",
  );

  console.log(`\nSynced ${manifest.length} press item(s) → content/press/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
