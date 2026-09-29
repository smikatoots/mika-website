/**
 * Tell IndexNow (Bing, Yandex, Naver, Seznam, Yep) which URLs changed.
 *
 * Reads the live sitemap, compares it with the snapshot from the previous run,
 * and submits only URLs that are new or whose <lastmod> moved. Google does not
 * use IndexNow; it keeps reading the sitemap from Search Console.
 *
 * Run: node scripts/indexnow-submit.mjs [--all] [--dry-run] [--snapshot <path>]
 *
 *   --all        submit every sitemap URL (first-time seeding only)
 *   --dry-run    print what would be submitted; do not call IndexNow
 *   --snapshot   JSON file of { url: lastmod } from the previous run.
 *                Missing file → submit only URLs with lastmod in the last 7 days.
 *
 * The key file lives at public/<INDEXNOW_KEY>.txt and must stay published.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const SITE_URL = process.env.SITE_URL ?? "https://mikareyes.com";
const INDEXNOW_KEY = "11632f18d629ff9b5ca9ede331235d25";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH_SIZE = 10_000;
const FALLBACK_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

const args = process.argv.slice(2);
const submitAll = args.includes("--all");
const dryRun = args.includes("--dry-run");
const snapshotIdx = args.indexOf("--snapshot");
const snapshotPath =
  snapshotIdx === -1 ? ".indexnow-snapshot.json" : args[snapshotIdx + 1];

async function loadSitemap() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { "cache-control": "no-cache" },
  });
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  /** @type {Record<string, string>} */
  const entries = {};
  for (const [, block] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    entries[loc] = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? "";
  }
  return entries;
}

function pickChanged(current, previous) {
  if (submitAll) return Object.keys(current);
  if (previous) {
    return Object.keys(current).filter(
      (url) => !(url in previous) || previous[url] !== current[url],
    );
  }
  const cutoff = Date.now() - FALLBACK_WINDOW_MS;
  return Object.entries(current)
    .filter(([, lastmod]) => lastmod && Date.parse(lastmod) >= cutoff)
    .map(([url]) => url);
}

async function submit(urlList) {
  const { host } = new URL(SITE_URL);
  for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
    const batch = urlList.slice(i, i + BATCH_SIZE);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });
    // 200 = accepted, 202 = accepted pending key validation.
    if (res.status !== 200 && res.status !== 202) {
      throw new Error(
        `IndexNow returned ${res.status}: ${(await res.text()).slice(0, 300)}`,
      );
    }
    console.log(`IndexNow accepted ${batch.length} URL(s) (${res.status}).`);
  }
}

const current = await loadSitemap();
const previous =
  snapshotPath && existsSync(snapshotPath)
    ? JSON.parse(readFileSync(snapshotPath, "utf8"))
    : null;
const changed = pickChanged(current, previous);

console.log(
  `Sitemap: ${Object.keys(current).length} URLs. ` +
    `Mode: ${submitAll ? "all" : previous ? "diff vs snapshot" : "last 7 days (no snapshot)"}. ` +
    `To submit: ${changed.length}.`,
);
for (const url of changed.slice(0, 50)) console.log(`  ${url}`);
if (changed.length > 50) console.log(`  …and ${changed.length - 50} more`);

if (dryRun) process.exit(0);
if (changed.length > 0) await submit(changed);
// Only advance the snapshot after a successful submit, so failures retry next run.
writeFileSync(snapshotPath, JSON.stringify(current, null, 2));
