/**
 * Notion "file" image URLs from the API expire (~1h). Synced MDX would otherwise
 * embed dead links. This mirrors matching URLs into public/blog-assets/<slug>/
 * and rewrites markdown to stable /blog-assets/... paths.
 */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const MD_IMAGE = /!\[([^\]]*)\]\((https?:[^)\s]+)\)/g;

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Hosts used for Notion-uploaded assets (signed, short-lived). */
export function isNotionHostedFileUrl(urlString: string): boolean {
  try {
    const h = new URL(urlString).hostname.toLowerCase();
    if (h.endsWith(".amazonaws.com")) return true;
    if (h.endsWith("notionusercontent.com")) return true;
    return false;
  } catch {
    return false;
  }
}

/** True if markdown still embeds Notion file/s3 URLs that expire (~1h). */
export function markdownContainsExpiringNotionImageUrls(markdown: string): boolean {
  const re = new RegExp(MD_IMAGE.source, MD_IMAGE.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(markdown)) !== null) {
    if (isNotionHostedFileUrl(m[2])) return true;
  }
  return false;
}

function extensionFromContentType(ct: string | null): string {
  if (!ct) return "bin";
  const base = ct.split(";")[0]?.trim().toLowerCase() ?? "";
  if (base === "image/jpeg") return "jpg";
  if (base === "image/png") return "png";
  if (base === "image/webp") return "webp";
  if (base === "image/gif") return "gif";
  if (base === "image/avif") return "avif";
  if (base === "image/svg+xml") return "svg";
  return "bin";
}

async function downloadOne(
  url: string,
  destPathWithoutExt: string,
): Promise<string | null> {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) {
    console.warn(`  [img] HTTP ${res.status} for ${url.slice(0, 80)}…`);
    return null;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = extensionFromContentType(res.headers.get("content-type"));
  const suffix = ext === "bin" ? "" : `.${ext}`;
  const finalPath = destPathWithoutExt + suffix;
  await writeFile(finalPath, buf);
  return path.basename(finalPath);
}

/**
 * Rewrites markdown so Notion-hosted image URLs become local /blog-assets/<slug>/…
 */
export async function localizeNotionMarkdownImages(
  markdown: string,
  slug: string,
): Promise<string> {
  const cwd = process.cwd();
  const assetDir = path.join(cwd, "public", "blog-assets", slug);
  await rm(assetDir, { recursive: true, force: true });

  const matches: { alt: string; url: string }[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(MD_IMAGE.source, MD_IMAGE.flags);
  while ((m = re.exec(markdown)) !== null) {
    matches.push({ alt: m[1], url: m[2] });
  }

  const uniqueUrls = [
    ...new Set(
      matches
        .map((x) => x.url)
        .filter((u) => isNotionHostedFileUrl(u)),
    ),
  ];

  if (uniqueUrls.length === 0) {
    return markdown;
  }

  await mkdir(assetDir, { recursive: true });

  const urlToFile = new Map<string, string>();
  let seq = 0;
  for (const url of uniqueUrls) {
    const baseName = String(seq).padStart(3, "0");
    seq += 1;
    const destBase = path.join(assetDir, baseName);
    const written = await downloadOne(url, destBase);
    if (written) {
      urlToFile.set(url, `/blog-assets/${slug}/${written}`);
    }
  }

  let out = markdown;
  for (const { alt, url } of matches) {
    if (!isNotionHostedFileUrl(url)) continue;
    const local = urlToFile.get(url);
    if (!local) continue;
    const needle = new RegExp(
      `!\\[${escapeRegExp(alt)}\\]\\(${escapeRegExp(url)}\\)`,
      "g",
    );
    out = out.replace(needle, `![${alt}](${local})`);
  }

  return out;
}
