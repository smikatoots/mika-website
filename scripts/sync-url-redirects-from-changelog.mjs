/**
 * Regenerates `src/lib/url-redirects.ts` from:
 * - `data/url-migration-changelog.md` — rows with **301 permanent redirect** or
 *   **404 until content** where “Final path” is a `/…` path (not `404 (missing MDX)`).
 * - Plus legacy blog slug URLs below (not always present as their own sitemap row).
 *
 * Run: node scripts/sync-url-redirects-from-changelog.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mdPath = path.join(root, "data/url-migration-changelog.md");
const outPath = path.join(root, "src/lib/url-redirects.ts");

const text = readFileSync(mdPath, "utf8");
const lines = text.split("\n");

function legacyUrlFromLine(line) {
  const m = line.match(/^\|\s*\[[^\]]*\]\((https:\/\/mikareyes\.com[^)]+)\)/);
  return m ? m[1].replace(/\/$/, "") : null;
}

function splitRow(line) {
  const raw = line.split("|");
  return raw.map((s) => s.trim()).filter((_, i) => i > 0 && i < raw.length - 1);
}

function parseFinalPath(cell) {
  if (!cell) return null;
  const t = cell.trim();
  if (/^404\s*\(missing/i.test(t) || /^410\s/i.test(t)) return null;
  const pathOnly = t.match(/^(\/[a-zA-Z0-9/_-]+)\s*$/);
  if (pathOnly) return pathOnly[1];
  const m = cell.match(/\]\((https:\/\/mikareyes\.com[^)]+)\)/);
  if (m) {
    try {
      return new URL(m[1]).pathname;
    } catch {
      return null;
    }
  }
  const m2 = cell.match(/https:\/\/mikareyes\.com(\/[a-zA-Z0-9/_-]*)/);
  if (m2) return m2[1] || "/";
  return null;
}

function pathFromUrl(url) {
  try {
    return new URL(url).pathname || "/";
  } catch {
    return null;
  }
}

const fromChangelog = new Map();

for (const line of lines) {
  if (!line.startsWith("|") || line.includes("Legacy URL") || line.includes("---")) {
    continue;
  }
  const cells = splitRow(line);
  if (cells.length < 4) continue;
  const legacyUrl = legacyUrlFromLine(line);
  if (!legacyUrl) continue;
  const source = pathFromUrl(legacyUrl);
  if (!source) continue;
  const disposition = cells[2];
  const finalPath = parseFinalPath(cells[3]);
  const is301 = disposition.includes("301 permanent redirect");
  const is404WithTarget =
    disposition.includes("404 until content") &&
    finalPath &&
    finalPath.startsWith("/");

  if (is301 && finalPath && finalPath !== source) {
    fromChangelog.set(source, finalPath);
  } else if (is404WithTarget && finalPath !== source) {
    fromChangelog.set(source, finalPath);
  }
}

for (const key of [...fromChangelog.keys()]) {
  if (key.startsWith("/more/mikas-projects/") && key !== "/more/mikas-projects") {
    fromChangelog.delete(key);
  }
}
fromChangelog.set("/more/mikas-projects/:slug", "/projects/:slug");
/** Index URL: not a row in some changelogs but required for migration. */
fromChangelog.set("/more/mikas-projects", "/projects");

/** Old blog URLs that often are not their own row in the migration table. */
const legacyBlogSlugRedirects = [
  [
    "/blog/the-ultimate-millenial-s-personal-finance-guide-part-1-budgeting",
    "/blog/the-ultimate-millenials-personal-finance-guide-part-1-budgeting",
  ],
  [
    "/blog/the-ultimate-millenial-s-personal-finance-guide-part-2-saving",
    "/blog/the-ultimate-millenials-personal-finance-guide-part-2-saving",
  ],
  [
    "/blog/innovation-through-constraints-deepseek-s-secret",
    "/blog/innovation-through-constraints-deepseeks-secret",
  ],
  [
    "/blog/full-circle-speaking-at-filip-in-os-at-linkedin",
    "/blog/full-circle-speaking-at-filipinos-at-linkedin",
  ],
  [
    "/blog/becoming-a-u-s-citizen-my-immigrant-journey",
    "/blog/becoming-a-us-citizen-my-immigrant-journey",
  ],
  [
    "/blog/just-do-the-thing-impostor-syndrome-lessons",
    "/blog/just-do-the-thingimpostor-syndrome-lessons",
  ],
  [
    "/blog/why-most-founders-shouldn-t-build-in-public",
    "/blog/why-most-founders-shouldnt-build-in-public",
  ],
  [
    "/blog/why-i-skipped-the-mba-and-don-t-regret-it",
    "/blog/why-i-skipped-the-mbaand-dont-regret-it",
  ],
  [
    "/blog/celebrating-an-inspiring-women-s-event",
    "/blog/celebrating-an-inspiring-womens-event",
  ],
  [
    "/blog/my-first-job-offer-was-rescinded-twice",
    "/blog/my-job-offer-was-rescinded-twice",
  ],
  ["/blog/how-we-1-5x-d-users-in-one-month", "/blog/how-we-15xd-users-in-one-month"],
  [
    "/blog/how-to-launch-with-press-and-pr",
    "/blog/learnings-on-prep-for-press-and-pr",
  ],
  ["/blog/how-to-prevent-nft-cash-grabs", "/blog/how-to-prevent-cash-grabs"],
  ["/blog/we-re-launching-consensus", "/blog/were-launching-consensus"],
  ["/blog/daily-learnings", "/blog/weekly-mtgs"],
];

const merged = new Map([...fromChangelog, ...legacyBlogSlugRedirects]);

const entries = [...merged.entries()].sort((a, b) => {
  const la = a[0].length;
  const lb = b[0].length;
  if (lb !== la) return lb - la;
  return a[0].localeCompare(b[0]);
});

function formatEntry(source, destination) {
  const compact = source.length + destination.length < 72;
  if (compact) {
    return `  { source: ${JSON.stringify(source)}, destination: ${JSON.stringify(destination)} },`;
  }
  return `  {
    source: ${JSON.stringify(source)},
    destination: ${JSON.stringify(destination)},
  },`;
}

const body = entries.map(([s, d]) => formatEntry(s, d)).join("\n");

const file = `/**
 * Permanent redirects for Next.js (\`permanent: true\` → **308**).
 *
 * **Source of truth:** edit \`data/url-migration-changelog.md\` (301 / 404→path rows),
 * then run \`yarn sync:url-redirects\` to regenerate this file. Legacy blog slug rows
 * that are not in the changelog table are appended in \`scripts/sync-url-redirects-from-changelog.mjs\`.
 *
 * Longer \`source\` paths are listed first so specific rules win over dynamic segments.
 */
export const urlRedirects: { source: string; destination: string }[] = [
${body}
];
`;

writeFileSync(outPath, file, "utf8");
console.log(`Wrote ${entries.length} redirects → ${path.relative(root, outPath)}`);

const jsonPath = path.join(root, "data/url-redirects.json");
const jsonPayload = entries.map(([source, destination]) => ({ source, destination }));
writeFileSync(jsonPath, `${JSON.stringify(jsonPayload, null, 2)}\n`, "utf8");
console.log(`Wrote ${jsonPayload.length} redirects → ${path.relative(root, jsonPath)}`);
