/**
 * Map legacy sitemap /blog/<slug> URLs to canonical repo slugs.
 *
 * Fast path (default): exact slug in manifest + Notion Path/Slug match + slug-token similarity.
 * Optional: --fetch-live hits mikareyes.com with per-request timeout (no hanging).
 *
 * Run:
 *   yarn match:legacy-blog
 *   yarn match:legacy-blog --fetch-live
 *   yarn match:legacy-blog --skip-notion   (manifest-only; never waits on Notion API)
 *
 * Requires .env.local for Notion branch (same as sync:blog). Notion query is capped by
 * --notion-timeout-ms (default 90s) so the script does not hang indefinitely.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";

import type { BlogManifest } from "../src/lib/blog/types";
import { isNotionConfigured } from "../src/lib/notion/config";
import { getPublicPath, getTitle } from "../src/lib/notion/properties";
import { queryDatabasePages } from "../src/lib/notion/query-database-pages";

/** Legacy URLs that did not 1:1 match manifest slugs (from sitemap inventory). */
const LEGACY_PATHS: string[] = [
  "/blog/a-learning-a-day",
  "/blog/ai-app-builders-fast-starts-slow-finishes",
  "/blog/ai-opportunities-for-filipinos",
  "/blog/ai-tool-to-auto-update-faq-docs",
  "/blog/ai-tools-for-custom-landing-page-graphics",
  "/blog/best-way-to-manage-founder-psychology",
  "/blog/bridge-and-stripe-announce-monumental-partnership",
  "/blog/building-a-guestbook-app-in-three-hours-with-ai",
  "/blog/building-community-at-south-park-commons",
  "/blog/building-customer-empathy-across-the-whole-team",
  "/blog/celebrating-my-sisters-notion-internship",
  "/blog/crisis-management",
  "/blog/custom-logo-inspired-ring-creation",
  "/blog/discreet-tips-for-second-job-applications",
  "/blog/empathy-as-a-service",
  "/blog/fintech-reality-your-data-isnt-truly-private",
  "/blog/fintech-things-i-didnt-know-i-didnt-know",
  "/blog/how-we-slashed-our-startup-legal-bills",
  "/blog/innovation-through-constraints-deepseeks-secret",
  "/blog/is-this-possible",
  "/blog/just-do-the-thingimpostor-syndrome-lessons",
  "/blog/moderating-ai-in-fintech-at-ai-agent-conference",
  "/blog/my-deep-dive-into-fintech",
  "/blog/my-favorite-emails-that-make-me-smile",
  "/blog/parallax-joins-phantom-to-revolutionize-payments",
  "/blog/send-a-wallet-to-a-friend",
  "/blog/soft-launch-vs-hard-launch",
  "/blog/the-hidden-biases-in-fintech-compliance",
  "/blog/want-to-chat-with-me-about-spc-or-the-kp-fellowship",
  "/blog/when-comfort-becomes-the-bigger-risk",
  "/blog/why-angels-first-in-fundraising",
  "/blog/why-most-founders-shouldnt-build-in-public",
  "/blog/why-your-domain-choice-really-matters",
];

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikareyes.com";
const STOP = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "for",
  "to",
  "of",
  "in",
  "on",
  "at",
  "is",
  "it",
  "my",
  "we",
  "you",
  "how",
  "why",
  "what",
  "with",
  "from",
  "this",
  "that",
  "are",
  "as",
  "be",
  "not",
  "i",
  "me",
]);

function slugFromBlogPath(p: string): string | null {
  const t = p.replace(/^\/+|\/+$/g, "");
  if (!t.startsWith("blog/")) return null;
  const slug = t.slice("blog/".length);
  return slug && !slug.includes("/") ? slug : null;
}

function decodeBasicEntities(s: string): string {
  return s
    .replace(/&#x27;/gi, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function normTitle(s: string): string {
  return decodeBasicEntities(s)
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleWords(s: string): Set<string> {
  const out = new Set<string>();
  for (const w of normTitle(s).split(/\s+/)) {
    if (w.length > 1 && !STOP.has(w)) out.add(w);
  }
  return out;
}

function slugTokens(slug: string): Set<string> {
  return new Set(
    slug
      .toLowerCase()
      .split(/-+/)
      .filter((t) => t.length > 1 && !STOP.has(t)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  const u = a.size + b.size - inter;
  return u === 0 ? 0 : inter / u;
}

function bestTitleMatch(
  needleWords: Set<string>,
  candidates: { slug: string; title: string }[],
): { slug: string; title: string; score: number } | null {
  let best: { slug: string; title: string; score: number } | null = null;
  for (const c of candidates) {
    const score = jaccard(needleWords, titleWords(c.title));
    if (!best || score > best.score) {
      best = { slug: c.slug, title: c.title, score };
    }
  }
  return best && best.score >= 0.22 ? best : null;
}

function bestSlugTokenMatch(
  legacySlug: string,
  candidates: { slug: string; title: string }[],
): { slug: string; title: string; score: number } | null {
  const a = slugTokens(legacySlug);
  if (a.size === 0) return null;
  let best: { slug: string; title: string; score: number } | null = null;
  for (const c of candidates) {
    const score = jaccard(a, slugTokens(c.slug));
    if (!best || score > best.score) {
      best = { slug: c.slug, title: c.title, score };
    }
  }
  return best && best.score >= 0.35 ? best : null;
}

function extractTitleFromHtml(html: string): string | null {
  const og =
    html.match(/property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ??
    html.match(/content=["']([^"']*)["'][^>]*property=["']og:title["']/i);
  if (og?.[1]?.trim()) return decodeBasicEntities(og[1].trim());
  const tw = html.match(
    /name=["']twitter:title["'][^>]*content=["']([^"']*)["']/i,
  );
  if (tw?.[1]?.trim()) return decodeBasicEntities(tw[1].trim());
  const t = html.match(/<title[^>]*>([^<]{1,400})<\/title>/i);
  if (t?.[1]?.trim()) return decodeBasicEntities(t[1].trim());
  return null;
}

async function fetchLiveTitle(
  url: string,
  timeoutMs: number,
): Promise<string | null> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: ac.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; mika-website-legacy-match/1.0; +https://mikareyes.com)",
        Accept: "text/html",
      },
      redirect: "follow",
    });
    const html = await res.text();
    return extractTitleFromHtml(html);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`${label} timed out after ${ms}ms`));
    }, ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function poolMap<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let i = 0;
  async function worker() {
    for (;;) {
      const idx = i++;
      if (idx >= items.length) return;
      out[idx] = await fn(items[idx]!);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, worker),
  );
  return out;
}

function parseArgs() {
  const argv = process.argv.slice(2);
  return {
    fetchLive: argv.includes("--fetch-live"),
    skipNotion: argv.includes("--skip-notion"),
    timeoutMs: (() => {
      const i = argv.indexOf("--timeout-ms");
      if (i >= 0 && argv[i + 1]) {
        return Math.min(120000, Math.max(3000, Number(argv[i + 1]) || 12000));
      }
      return 12000;
    })(),
    notionTimeoutMs: (() => {
      const i = argv.indexOf("--notion-timeout-ms");
      if (i >= 0 && argv[i + 1]) {
        return Math.min(300000, Math.max(5000, Number(argv[i + 1]) || 90000));
      }
      return 90000;
    })(),
    concurrency: (() => {
      const i = argv.indexOf("--concurrency");
      if (i >= 0 && argv[i + 1]) return Math.min(8, Math.max(1, Number(argv[i + 1]) || 4));
      return 4;
    })(),
  };
}

async function main() {
  const { fetchLive, skipNotion, timeoutMs, notionTimeoutMs, concurrency } =
    parseArgs();

  console.error("match-legacy-blog: reading manifest…");
  const manifestPath = path.join(process.cwd(), "content/blog/manifest.json");
  const raw = await readFile(manifestPath, "utf-8");
  const manifest = JSON.parse(raw) as BlogManifest;
  const posts = manifest.posts ?? [];
  const slugSet = new Set(posts.map((p) => p.slug));
  console.error(`match-legacy-blog: ${posts.length} post(s) in manifest.`);

  type NotionRow = { slug: string; path: string; title: string };
  const notionRows: NotionRow[] = [];
  if (skipNotion) {
    console.error("Notion: skipped (--skip-notion).");
  } else if (isNotionConfigured()) {
    console.error(
      `Notion: querying database (aborts after ${notionTimeoutMs}ms if stuck)…`,
    );
    try {
      const pages = await withTimeout(
        queryDatabasePages(),
        notionTimeoutMs,
        "queryDatabasePages",
      );
      for (const page of pages) {
        const pub = getPublicPath(page);
        if (!pub?.startsWith("blog/")) continue;
        const slug = pub.slice("blog/".length);
        if (!slug || slug.includes("/")) continue;
        notionRows.push({
          slug,
          path: pub,
          title: getTitle(page),
        });
      }
      console.error(`Notion: ${notionRows.length} published blog row(s).`);
    } catch (e) {
      console.error(
        "Notion: query failed or timed out — continuing with manifest-only.",
        e instanceof Error ? e.message : e,
      );
    }
  } else {
    console.error(
      "Notion: not configured (skip Path/Title from DB). Set NOTION_API_KEY + NOTION_BLOG_DATABASE_ID for full match.",
    );
  }
  const notionSlugSet = new Set(notionRows.map((r) => r.slug));

  const base = SITE.replace(/\/+$/, "");
  let liveTitles: Map<string, string | null> = new Map();
  if (fetchLive) {
    const paths = [...LEGACY_PATHS];
    console.error(
      `Fetching ${paths.length} live URLs (${timeoutMs}ms each, concurrency ${concurrency})…`,
    );
    let done = 0;
    const results = await poolMap(paths, concurrency, async (p) => {
      const url = `${base}${p}`;
      const title = await fetchLiveTitle(url, timeoutMs);
      done += 1;
      console.error(`  live ${done}/${paths.length} ${p}`);
      return { p, title };
    });
    liveTitles = new Map(results.map((r) => [r.p, r.title]));
  }

  console.log(
    "| Legacy path | Live title (if fetched) | Match kind | Canonical `/blog/...` in repo | Repo post title |",
  );
  console.log("| --- | --- | --- | --- | --- |");

  for (const legacyPath of LEGACY_PATHS) {
    const legacySlug = slugFromBlogPath(legacyPath);
    if (!legacySlug) continue;

    const liveTitle = fetchLive ? (liveTitles.get(legacyPath) ?? null) : null;
    const liveCol = liveTitle ? liveTitle.replace(/\|/g, "\\|") : "—";

    if (slugSet.has(legacySlug)) {
      const p = posts.find((x) => x.slug === legacySlug)!;
      console.log(
        `| ${legacyPath} | ${liveCol} | exact slug in manifest | /blog/${legacySlug} | ${p.title.replace(/\|/g, "\\|")} |`,
      );
      continue;
    }

    if (notionSlugSet.has(legacySlug)) {
      const n = notionRows.find((r) => r.slug === legacySlug)!;
      const p = posts.find((x) => x.slug === legacySlug);
      console.log(
        `| ${legacyPath} | ${liveCol} | exact slug in Notion (manifest ${p ? "agrees" : "missing"}) | /blog/${legacySlug} | ${(p?.title ?? n.title).replace(/\|/g, "\\|")} |`,
      );
      continue;
    }

    let matchKind = "";
    let canonSlug = "";
    let canonTitle = "";

    if (liveTitle) {
      const w = titleWords(liveTitle);
      const byManifest = bestTitleMatch(w, posts);
      const byNotion = bestTitleMatch(w, notionRows);
      if (byManifest && (!byNotion || byManifest.score >= byNotion.score)) {
        matchKind = `live title → manifest (score ${byManifest.score.toFixed(2)})`;
        canonSlug = byManifest.slug;
        canonTitle = byManifest.title;
      } else if (byNotion) {
        matchKind = `live title → Notion (score ${byNotion.score.toFixed(2)})`;
        canonSlug = byNotion.slug;
        const p = posts.find((x) => x.slug === byNotion.slug);
        canonTitle = p?.title ?? byNotion.title;
      }
    }

    if (!canonSlug) {
      const bySlug = bestSlugTokenMatch(legacySlug, posts);
      if (bySlug) {
        matchKind = `slug token overlap (score ${bySlug.score.toFixed(2)})`;
        canonSlug = bySlug.slug;
        canonTitle = bySlug.title;
      }
    }

    if (!canonSlug) {
      console.log(
        `| ${legacyPath} | ${liveCol} | **no confident match** | — | — |`,
      );
      continue;
    }

    console.log(
      `| ${legacyPath} | ${liveCol} | ${matchKind} | /blog/${canonSlug} | ${canonTitle.replace(/\|/g, "\\|")} |`,
    );
  }

  if (!fetchLive) {
    console.error(
      "\nTip: run `yarn match:legacy-blog --fetch-live` to pull titles from the live site (timeouts prevent hanging).",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
