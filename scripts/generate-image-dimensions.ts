/**
 * Precomputes intrinsic pixel dimensions for every raster image under public/
 * and writes them to src/lib/blog/image-dimensions.generated.json.
 *
 * Why: MDX images look up their width/height at render time to avoid layout
 * shift. Doing that with a runtime `sharp(public/<dynamic src>)` read forces
 * Vercel's file tracer to bundle ALL of public/ (~540MB) into every content
 * function. Reading from this committed map instead keeps the render path free
 * of any filesystem access to public/.
 *
 * Run: yarn gen:image-dims  (also runs automatically before `next build`)
 */

import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

type ImageDimensions = { width: number; height: number };

const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUT_FILE = path.join(
  process.cwd(),
  "src/lib/blog/image-dimensions.generated.json",
);
const RASTER = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"]);

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return RASTER.has(path.extname(entry.name).toLowerCase()) ? [full] : [];
    }),
  );
  return files.flat();
}

async function main() {
  const files = await walk(PUBLIC_DIR);
  const map: Record<string, ImageDimensions> = {};

  for (const file of files) {
    // Key is the public URL path, e.g. "/ai-guides/foo.png".
    const src = "/" + path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
    try {
      const { width, height } = await sharp(file).metadata();
      if (width && height) {
        map[src] = { width, height };
      }
    } catch {
      // Unreadable image — skip; the browser just won't reserve its box.
    }
  }

  // Sort keys for stable diffs.
  const sorted = Object.fromEntries(
    Object.keys(map)
      .sort()
      .map((k) => [k, map[k]]),
  );

  await writeFile(OUT_FILE, JSON.stringify(sorted, null, 2) + "\n", "utf-8");
  console.log(
    `Wrote ${Object.keys(sorted).length} image dimensions to ${path.relative(process.cwd(), OUT_FILE)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
