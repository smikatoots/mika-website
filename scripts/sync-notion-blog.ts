/**
 * Pulls published blog rows from Notion and writes:
 * - content/blog/<slug>.mdx (markdown body + YAML frontmatter)
 * - content/blog/manifest.json (for /blog index, filters, sitemap)
 *
 * Incremental: skips pageToMarkdown when frontmatter lastEdited matches Notion
 * last_edited_time (and notionPageId matches). Always refreshes manifest.
 * Removes .mdx for posts no longer in Notion.
 *
 * Run: npm run sync:blog
 */

import { readFile, writeFile, readdir, mkdir, unlink } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { NotionToMarkdown } from "notion-to-md";

import { getNotionClient } from "../src/lib/notion/client";
import { isNotionConfigured } from "../src/lib/notion/config";
import { getPublicPath, getTags, getTitle } from "../src/lib/notion/properties";
import { queryDatabasePages } from "../src/lib/notion/query-database-pages";

import type { BlogManifest, BlogManifestPost } from "../src/lib/blog/types";

function blogSlugFromPath(p: string): string | null {
  if (!p.startsWith("blog/")) return null;
  const slug = p.slice("blog/".length);
  if (!slug.length || slug.includes("/")) {
    console.warn(`Skipping nested or empty blog path: ${p}`);
    return null;
  }
  return slug;
}

function normalizeNotionId(id: string): string {
  return id.replace(/-/g, "").toLowerCase();
}

function toTimeMs(value: unknown): number | null {
  if (value == null) return null;
  if (value instanceof Date) {
    const t = value.getTime();
    return Number.isNaN(t) ? null : t;
  }
  const t = new Date(String(value)).getTime();
  return Number.isNaN(t) ? null : t;
}

/** True if existing MDX is already from this page revision (skip expensive export). */
function canSkipBodySync(
  notionLastEdited: string,
  notionPageId: string,
  fm: Record<string, unknown>,
): boolean {
  const notionMs = toTimeMs(notionLastEdited);
  const fileMs = toTimeMs(fm.lastEdited);
  if (notionMs === null || fileMs === null) return false;
  if (notionMs !== fileMs) return false;

  const fileId = fm.notionPageId;
  if (fileId == null || fileId === "") {
    // Legacy MDX without notionPageId: trust timestamp only
    return true;
  }
  return normalizeNotionId(String(fileId)) === normalizeNotionId(notionPageId);
}

async function main() {
  console.log("Notion blog sync — starting…");

  if (!isNotionConfigured()) {
    console.error("Set NOTION_API_KEY and NOTION_BLOG_DATABASE_ID first.");
    process.exit(1);
  }

  const notion = getNotionClient();
  const n2m = new NotionToMarkdown({ notionClient: notion });

  console.log("Fetching published pages from Notion…");
  const pages = await queryDatabasePages();
  console.log(`Found ${pages.length} published page(s) in the database.`);
  const outDir = path.join(process.cwd(), "content/blog");
  await mkdir(outDir, { recursive: true });

  const manifestPosts: BlogManifestPost[] = [];
  const syncedSlugs = new Set<string>();

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of pages) {
    const pubPath = getPublicPath(page);
    if (!pubPath) continue;
    const slug = blogSlugFromPath(pubPath);
    if (!slug) continue;

    const title = getTitle(page);
    const tags = getTags(page);
    const lastEdited = page.last_edited_time;
    const filePath = path.join(outDir, `${slug}.mdx`);

    let fileExisted = false;
    let skipMarkdown = false;
    try {
      const existing = await readFile(filePath, "utf-8");
      fileExisted = true;
      const { data } = matter(existing);
      skipMarkdown = canSkipBodySync(lastEdited, page.id, data as Record<string, unknown>);
    } catch {
      // missing file → full sync
    }

    if (skipMarkdown) {
      console.log(
        `  [skip] ${slug} — ${title.slice(0, 55)}${title.length > 55 ? "…" : ""} (unchanged)`,
      );
      skipped += 1;
    } else {
      const label = fileExisted ? "update" : "new";
      if (label === "new") created += 1;
      else updated += 1;

      console.log(
        `  [${label}] ${slug} — ${title.slice(0, 55)}${title.length > 55 ? "…" : ""}`,
      );
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdObj = n2m.toMarkdownString(mdBlocks);
      const body = (mdObj.parent ?? "").trim();

      const frontmatter = {
        title,
        slug,
        path: pubPath,
        lastEdited,
        notionPageId: page.id,
        tags,
      };

      const fileContent = matter.stringify(
        body || "_No body exported from Notion._\n",
        frontmatter,
      );
      await writeFile(filePath, fileContent, "utf-8");
    }

    syncedSlugs.add(slug);
    manifestPosts.push({
      slug,
      title,
      path: pubPath,
      lastEdited,
      notionPageId: page.id,
      tags,
    });
  }

  manifestPosts.sort(
    (a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime(),
  );

  const manifest: BlogManifest = {
    generatedAt: new Date().toISOString(),
    posts: manifestPosts,
  };
  await writeFile(
    path.join(outDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf-8",
  );

  for (const name of await readdir(outDir)) {
    if (!name.endsWith(".mdx")) continue;
    const base = name.slice(0, -4);
    if (!syncedSlugs.has(base)) {
      await unlink(path.join(outDir, name));
      console.log("Removed stale:", name);
    }
  }

  console.log(
    `Done: ${manifestPosts.length} post(s) in manifest — ${created} new, ${updated} updated, ${skipped} skipped (no Notion body changes).`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
