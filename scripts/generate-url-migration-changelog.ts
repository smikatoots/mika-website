/**
 * Generates data/url-migration-changelog.md from data/mikareyes-url-inventory.json
 * and `src/lib/url-redirects.ts` (same source as next.config.ts).
 *
 * Run: node -r ./scripts/bootstrap-env.cjs node_modules/.bin/tsx scripts/generate-url-migration-changelog.ts
 */

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { urlRedirects } from "../src/lib/url-redirects";

type InvEntry = {
  url: string;
  path: string;
  category: string;
};

type InvFile = { entries: InvEntry[]; fetchedAt: string; source: string };

const exactRedirects = urlRedirects.filter((r) => !r.source.includes(":slug"));
const dynamicRedirects = urlRedirects.filter((r) => r.source.includes(":slug"));
const REDIR_MAP = new Map(
  exactRedirects.map((r) => [r.source, r.destination] as const),
);

const GONE = new Set(["/guestbook", "/links/holiday-gift-guide-2025"]);

function applyDynamicRedirect(p: string): string | null {
  for (const r of dynamicRedirects) {
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

function applyNextRedirects(p: string): string {
  const hit = REDIR_MAP.get(p);
  if (hit) return hit;
  const dyn = applyDynamicRedirect(p);
  if (dyn) return dyn;
  return p;
}

/** Matches src/app/(site)/more/page.tsx and dreams/page.tsx */
function applyAppRedirects(p: string): string {
  if (p === "/more") return "/projects";
  if (p === "/dreams") return "/my-dreams";
  return p;
}

function resolvePath(path: string): string {
  let p = path;
  for (let i = 0; i < 8; i++) {
    const n = applyAppRedirects(applyNextRedirects(p));
    if (n === p) break;
    p = n;
  }
  return p;
}

function disposition(
  orig: string,
  blogResolvedInManifest: boolean,
): {
  finalPath: string;
  kind: string;
  note: string;
} {
  if (GONE.has(orig)) {
    return {
      finalPath: orig,
      kind: "410 Gone",
      note: "Route handler; intentionally removed",
    };
  }
  const after = resolvePath(orig);
  if (after !== orig) {
    return {
      finalPath: after,
      kind: "301 permanent redirect",
      note: "",
    };
  }
  if (orig.startsWith("/blog/") && !blogResolvedInManifest) {
    return {
      finalPath: orig,
      kind: "404 until content",
      note: "Not in Notion blog DB (sync) — add MDX or publish in Notion",
    };
  }
  return {
    finalPath: orig,
    kind: "Same URL (200)",
    note: "No redirect; served by app",
  };
}

async function main() {
  const root = process.cwd();
  const invPath = path.join(root, "data/mikareyes-url-inventory.json");
  const outPath = path.join(root, "data/url-migration-changelog.md");
  const inv = JSON.parse(await readFile(invPath, "utf-8")) as InvFile;

  const rows: string[] = [];
  rows.push("# URL migration changelog (legacy sitemap → mika-website)");
  rows.push("");
  rows.push(
    `Generated from \`data/mikareyes-url-inventory.json\` (source: ${inv.source}, fetched ${inv.fetchedAt}).`,
  );
  rows.push("");
  rows.push(
    "Review rows marked **best-effort** — adjust `next.config.ts` and re-run `scripts/generate-url-migration-changelog.ts` if needed.",
  );
  rows.push("");
  rows.push("## Blog posts not in Notion sync (30 URLs)");
  rows.push("");
  rows.push(
    "`yarn sync:blog` only exports rows in the Notion blog database with `Path` = `blog/<slug>`. The following legacy sitemap URLs still have **no** MDX in-repo until you publish them in Notion (or add MDX manually):",
  );
  rows.push("");

  const manifestPath = path.join(root, "content/blog/manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf-8")) as {
    posts: { slug: string }[];
  };
  const slugs = new Set(manifest.posts.map((p) => p.slug));

  const missingBlog: string[] = [];
  for (const e of inv.entries) {
    if (!e.path.startsWith("/blog/")) continue;
    const slug = e.path.slice(6);
    if (slug.includes("/")) continue;
    const resolved = resolvePath(e.path);
    const slugAfter =
      resolved.startsWith("/blog/") && !resolved.slice(6).includes("/")
        ? resolved.slice(6)
        : null;
    const inManifest = slugAfter ? slugs.has(slugAfter) : slugs.has(slug);
    if (!inManifest) missingBlog.push(e.path);
  }

  for (const p of missingBlog.sort()) {
    rows.push(`- ${p}`);
  }
  rows.push("");

  rows.push("## Full inventory disposition");
  rows.push("");
  rows.push(
    "| Legacy URL | Category | Disposition | Final path or status | Notes |",
  );
  rows.push("|------------|----------|-------------|----------------------|-------|");

  const bestEffort = new Set([
    "/a-real-life-wonderwoman",
    "/dear-aspiring-kpcb-fellow",
    "/early-career-pm-job-hunt",
    "/hiring-designer",
    "/network",
    "/parallax",
    "/strides-beta",
  ]);

  for (const e of inv.entries) {
    let slugResolved = true;
    if (e.path.startsWith("/blog/")) {
      const r = resolvePath(e.path);
      const slug =
        r.startsWith("/blog/") && !r.slice(6).includes("/")
          ? r.slice(6)
          : null;
      slugResolved = slug ? slugs.has(slug) : false;
    }
    const d = disposition(e.path, slugResolved);
    let note = d.note;
    if (d.kind === "301 permanent redirect" && bestEffort.has(e.path)) {
      note = "Best-effort target — verify";
    }
    const finalCol =
      d.kind === "410 Gone"
        ? "410 Gone"
        : d.kind === "404 until content"
          ? `404 (missing MDX)`
          : `https://mikareyes.com${d.finalPath}`;
    rows.push(
      `| ${e.url} | ${e.category} | ${d.kind} | ${finalCol} | ${note} |`,
    );
  }

  rows.push("");
  rows.push("## Sitemap note");
  rows.push("");
  rows.push(
    "Non-blog Notion rows are **not** listed in `sitemap.xml` anymore; canonical URLs are MDX/static routes only.",
  );
  rows.push("");

  await writeFile(outPath, rows.join("\n"), "utf-8");
  console.log(`Wrote ${outPath} (${inv.entries.length} rows)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
