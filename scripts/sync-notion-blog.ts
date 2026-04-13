/**
 * Pulls published blog rows from Notion and writes:
 * - content/blog/<slug>.mdx (markdown body + YAML frontmatter)
 * - public/blog-assets/<slug>/… for Notion-hosted images (API URLs expire ~1h)
 * - Escapes "<" before digits in prose (outside ``` fences) for MDX safety
 * - content/blog/manifest.json (for /blog index, filters, sitemap)
 *
 * Incremental: skips pageToMarkdown when frontmatter lastEdited matches Notion
 * last_edited_time (and notionPageId matches), unless MDX still contains
 * Notion S3 image URLs (they expire ~1h) or you pass --force.
 * Always refreshes manifest. Removes .mdx for posts no longer in Notion.
 *
 * Run: yarn sync:blog
 * Re-export everything (e.g. after changing image pipeline): yarn sync:blog --force
 *
 * Optional: content/blog/sync-path-overrides.json — { "overrides": { "<notionPageId>": "blog/your-slug" } }
 * forces filename + frontmatter path/slug for those pages so you do not have to match Slug/Path in Notion.
 */

import { readFile, writeFile, readdir, mkdir, unlink, rm } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { NotionToMarkdown } from "notion-to-md";

import { getNotionClient } from "../src/lib/notion/client";
import { isNotionConfigured } from "../src/lib/notion/config";
import {
  getPublicPath,
  getPublishedTime,
  getTags,
  getTitle,
} from "../src/lib/notion/properties";
import { queryDatabasePages } from "../src/lib/notion/query-database-pages";

import type { BlogManifest, BlogManifestPost } from "../src/lib/blog/types";

import { escapeLessThanBeforeDigitsForMdx } from "./escape-mdx-less-than-digit";
import {
  localizeNotionMarkdownImages,
  markdownContainsExpiringNotionImageUrls,
} from "./localize-notion-markdown-images";

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

/** Notion page id (any hyphenation) → full public path e.g. blog/my-post */
async function loadPathOverrides(
  outDir: string,
): Promise<Map<string, string>> {
  const p = path.join(outDir, "sync-path-overrides.json");
  try {
    const raw = await readFile(p, "utf-8");
    const data = JSON.parse(raw) as { overrides?: Record<string, string> };
    const m = new Map<string, string>();
    for (const [k, v] of Object.entries(data.overrides ?? {})) {
      const pathNorm = String(v)
        .trim()
        .replace(/^\/+|\/+$/g, "");
      if (pathNorm) {
        m.set(normalizeNotionId(k), pathNorm);
      }
    }
    return m;
  } catch {
    return new Map();
  }
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
  const forceResync = process.argv.includes("--force");
  console.log("Notion blog sync — starting…");
  if (forceResync) {
    console.log("(force) Re-exporting every post body from Notion.\n");
  }

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

  const pathOverrides = await loadPathOverrides(outDir);
  if (pathOverrides.size > 0) {
    console.log(
      `Using ${pathOverrides.size} path override(s) from sync-path-overrides.json`,
    );
  }

  const manifestPosts: BlogManifestPost[] = [];
  const syncedSlugs = new Set<string>();

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of pages) {
    const fromNotion = getPublicPath(page);
    const rawOverride = pathOverrides.get(normalizeNotionId(page.id));
    let pubPath: string | null = null;
    if (rawOverride) {
      pubPath = rawOverride;
    } else {
      pubPath = fromNotion;
    }
    if (!pubPath) continue;
    const slug = blogSlugFromPath(pubPath);
    if (!slug) continue;

    if (rawOverride && fromNotion && fromNotion !== pubPath) {
      console.log(
        `  [path override] Using ${pubPath} (Notion had ${fromNotion})`,
      );
    } else if (rawOverride && !fromNotion) {
      console.log(`  [path override] Using ${pubPath} (no Path/Slug from Notion)`);
    }

    const title = getTitle(page);
    const tags = getTags(page);
    const lastEdited = page.last_edited_time;
    const published = getPublishedTime(page);
    const filePath = path.join(outDir, `${slug}.mdx`);

    let fileExisted = false;
    let skipMarkdown = false;
    let unchangedFromNotion = false;
    let bodyHasExpiringNotionImages = false;
    try {
      const existing = await readFile(filePath, "utf-8");
      fileExisted = true;
      const { data, content } = matter(existing);
      unchangedFromNotion = canSkipBodySync(
        lastEdited,
        page.id,
        data as Record<string, unknown>,
      );
      bodyHasExpiringNotionImages = markdownContainsExpiringNotionImageUrls(
        content.trim(),
      );
      skipMarkdown =
        !forceResync && unchangedFromNotion && !bodyHasExpiringNotionImages;
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

      if (
        unchangedFromNotion &&
        bodyHasExpiringNotionImages &&
        !forceResync
      ) {
        console.log(
          `  [images] ${slug} — MDX still has Notion-hosted image URLs; re-exporting`,
        );
      }

      console.log(
        `  [${label}] ${slug} — ${title.slice(0, 55)}${title.length > 55 ? "…" : ""}`,
      );
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const mdObj = n2m.toMarkdownString(mdBlocks);
      const rawBody = (mdObj.parent ?? "").trim();
      const localized = await localizeNotionMarkdownImages(rawBody, slug);
      const body = escapeLessThanBeforeDigitsForMdx(localized);

      const frontmatter = {
        title,
        slug,
        path: pubPath,
        lastEdited,
        published,
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
      published,
      notionPageId: page.id,
      tags,
    });
  }

  function sortTime(p: BlogManifestPost): number {
    return new Date(p.published ?? p.lastEdited).getTime();
  }

  manifestPosts.sort((a, b) => sortTime(b) - sortTime(a));

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
      await rm(path.join(process.cwd(), "public", "blog-assets", base), {
        recursive: true,
        force: true,
      });
      console.log("Removed stale:", name);
    }
  }

  console.log(
    `Done: ${manifestPosts.length} post(s) in manifest — ${created} new, ${updated} updated, ${skipped} skipped (unchanged & no expiring image URLs in MDX).`,
  );
  if (skipped > 0 && !forceResync) {
    console.log(
      "Tip: use yarn sync:blog --force to re-export all bodies (fresh Notion image URLs).",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
