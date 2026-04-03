/**
 * Pulls published blog rows from Notion and writes:
 * - content/blog/<slug>.mdx (markdown body + YAML frontmatter)
 * - content/blog/manifest.json (for /blog index, filters, sitemap)
 *
 * Run: npm run sync:blog
 * Requires NOTION_API_KEY + NOTION_BLOG_DATABASE_ID (and optional property envs).
 *
 * Scheduling: use GitHub Actions (see .github/workflows/sync-notion-blog.yml) to run
 * daily and commit changes — serverless hosts cannot persist new files without a git push.
 */

import { writeFile, readdir, mkdir, unlink } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { NotionToMarkdown } from "notion-to-md";

import { getNotionClient } from "../src/lib/notion/client";
import { isNotionConfigured } from "../src/lib/notion/config";
import { queryDatabasePages } from "../src/lib/notion/posts";
import { getPublicPath, getTags, getTitle } from "../src/lib/notion/properties";

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

async function main() {
  if (!isNotionConfigured()) {
    console.error("Set NOTION_API_KEY and NOTION_BLOG_DATABASE_ID first.");
    process.exit(1);
  }

  const notion = getNotionClient();
  const n2m = new NotionToMarkdown({ notionClient: notion });

  const pages = await queryDatabasePages();
  const outDir = path.join(process.cwd(), "content/blog");
  await mkdir(outDir, { recursive: true });

  const manifestPosts: BlogManifestPost[] = [];
  const syncedSlugs = new Set<string>();

  for (const page of pages) {
    const pubPath = getPublicPath(page);
    if (!pubPath) continue;
    const slug = blogSlugFromPath(pubPath);
    if (!slug) continue;

    const title = getTitle(page);
    const tags = getTags(page);
    const lastEdited = page.last_edited_time;

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

    const fileContent = matter.stringify(body || "_No body exported from Notion._\n", frontmatter);
    const filePath = path.join(outDir, `${slug}.mdx`);
    await writeFile(filePath, fileContent, "utf-8");
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

  console.log(`Synced ${manifestPosts.length} post(s) → content/blog/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
