/**
 * Static check: legacy sitemap paths → resolved URL has a known route (MDX manifest or static).
 * Does not start a server or call Notion.
 *
 * Run: node scripts/verify-legacy-urls.mjs
 *       node scripts/verify-legacy-urls.mjs --allow-missing-blog  (warn only; exit 0 if no other errors)
 *
 * Exit 1 if any path is unresolved, or blog slug missing (unless listed in
 * `data/intentional-blog-404-paths.json` or `--allow-missing-blog`).
 */

import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const allowMissingBlog = process.argv.includes("--allow-missing-blog");

const GONE = new Set(["/guestbook", "/links/holiday-gift-guide-2025"]);

const STATIC = new Set([
  "/",
  "/about",
  "/blog",
  "/links",
  "/press",
  "/projects",
  "/my-dreams",
]);

function loadJson(p) {
  return JSON.parse(readFileSync(path.join(root, p), "utf8"));
}

/** Blog URLs we deliberately do not ship; app returns 404 (no MDX). */
let intentionalBlog404 = new Set();
const intentionalPath = path.join(root, "data/intentional-blog-404-paths.json");
if (existsSync(intentionalPath)) {
  const raw = loadJson("data/intentional-blog-404-paths.json");
  if (Array.isArray(raw)) {
    intentionalBlog404 = new Set(raw.filter((x) => typeof x === "string"));
  }
}

const inv = loadJson("data/mikareyes-url-inventory.json");
const redirectJsonPath = path.join(root, "data/url-redirects.json");
if (!existsSync(redirectJsonPath)) {
  console.error("Missing data/url-redirects.json — run: yarn sync:url-redirects");
  process.exit(1);
}

const urlRedirects = loadJson("data/url-redirects.json");
const exactMap = new Map(
  urlRedirects.filter((r) => !r.source.includes(":slug")).map((r) => [r.source, r.destination]),
);
const dynamicRules = urlRedirects.filter((r) => r.source.includes(":slug"));

function applyDynamic(p) {
  for (const r of dynamicRules) {
    const idx = r.source.indexOf("/:slug");
    if (idx === -1) continue;
    const prefix = r.source.slice(0, idx);
    if (!p.startsWith(`${prefix}/`)) continue;
    const slug = p.slice(prefix.length + 1);
    if (slug.includes("/")) continue;
    return r.destination.replace(/:slug/g, slug);
  }
  return null;
}

function resolvePath(orig) {
  let p = orig;
  for (let i = 0; i < 48; i++) {
    let next = p;
    const hit = exactMap.get(next);
    if (hit) next = hit;
    else {
      const dyn = applyDynamic(next);
      if (dyn) next = dyn;
    }
    if (next === "/dreams") next = "/my-dreams";
    if (next === p) break;
    p = next;
  }
  return p;
}

const blog = loadJson("content/blog/manifest.json");
const blogSlugs = new Set(blog.posts.map((x) => x.slug));

const press = loadJson("content/press/manifest.json");
const pressSlugs = new Set(press.items.map((x) => x.slug));

const projects = loadJson("content/projects/manifest.json");
const projectSlugs = new Set(projects.projects.map((x) => x.slug));

function classify(finalPath) {
  if (STATIC.has(finalPath)) return "ok_static";
  if (finalPath.startsWith("/blog/")) {
    const slug = finalPath.slice(6);
    if (!slug || slug.includes("/")) return "unknown";
    if (blogSlugs.has(slug)) return "ok_blog";
    if (intentionalBlog404.has(finalPath)) return "ok_intentional_blog_404";
    return "missing_blog_mdx";
  }
  if (finalPath.startsWith("/press/")) {
    const slug = finalPath.slice(7);
    if (!slug || slug.includes("/")) return "unknown";
    return pressSlugs.has(slug) ? "ok_press" : "missing_press_mdx";
  }
  if (finalPath.startsWith("/projects/")) {
    const slug = finalPath.slice(10);
    if (!slug || slug.includes("/")) return "unknown";
    return projectSlugs.has(slug) ? "ok_project" : "missing_project_mdx";
  }
  return "notion_or_unknown";
}

const byKind = {
  ok_static: [],
  ok_blog: [],
  ok_press: [],
  ok_project: [],
  ok_intentional_blog_404: [],
  gone: [],
  missing_blog_mdx: [],
  missing_press_mdx: [],
  missing_project_mdx: [],
  notion_or_unknown: [],
};

for (const e of inv.entries) {
  const orig = e.path;
  if (GONE.has(orig)) {
    byKind.gone.push(orig);
    continue;
  }
  const finalPath = resolvePath(orig);
  const kind = classify(finalPath);
  byKind[kind].push({ orig, finalPath, category: e.category });
}

function printList(title, arr, limit = 12) {
  console.log(`\n${title} (${arr.length})`);
  for (const row of arr.slice(0, limit)) {
    if (typeof row === "string") console.log(`  ${row}`);
    else console.log(`  ${row.orig} → ${row.finalPath}  [${row.category}]`);
  }
  if (arr.length > limit) console.log(`  … +${arr.length - limit} more`);
}

console.log("Legacy URL verify (mikareyes-url-inventory.json)");
console.log("Redirects:", urlRedirects.length, "rules from data/url-redirects.json");

printList("410 Gone (expected)", byKind.gone, 5);
printList("OK static", byKind.ok_static);
printList("OK blog", byKind.ok_blog, 8);
printList("OK press", byKind.ok_press, 8);
printList("OK project", byKind.ok_project, 8);
printList(
  "OK intentional blog 404 (no MDX by choice)",
  byKind.ok_intentional_blog_404,
  20,
);
printList("MISSING blog MDX", byKind.missing_blog_mdx, 40);
printList("MISSING press MDX", byKind.missing_press_mdx, 20);
printList("MISSING project MDX", byKind.missing_project_mdx, 20);
printList("NOTION or unknown (no static/MDX route)", byKind.notion_or_unknown, 30);

const hardFail =
  byKind.missing_press_mdx.length +
  byKind.missing_project_mdx.length +
  byKind.notion_or_unknown.length;

const blogGap = byKind.missing_blog_mdx.length;

if (blogGap > 0 && allowMissingBlog) {
  console.warn(
    `\nWarning: ${blogGap} legacy blog URL(s) have no MDX slug (publish in Notion + sync, add MDX, or add changelog redirects).`,
  );
}

if (hardFail > 0) {
  console.error(
    `\nExit 1: ${hardFail} path(s) have no static/press/project route after redirects.`,
  );
  process.exit(1);
}

if (blogGap > 0 && !allowMissingBlog) {
  console.error(
    `\nExit 1: ${blogGap} blog URL(s) have no MDX. Fix content or run with --allow-missing-blog to proceed while you backfill.`,
  );
  process.exit(1);
}

console.log(
  "\nAll legacy inventory paths resolve to a static page, MDX route, intentional 410, or intentional blog 404.",
);
if (blogGap > 0 && allowMissingBlog) {
  console.log("(Blog backfill still recommended — verify used --allow-missing-blog.)");
}
process.exit(0);
