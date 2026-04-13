/**
 * Removes edge-connected near-black pixels (typical flat PNG background) so the
 * monogram can sit on any page color. Run after updating the source asset:
 *   npx tsx scripts/make-logo-transparent.ts
 */

import path from "node:path";

import sharp from "sharp";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "public", "mika-reyes-logo.png");
const OUTPUT = path.join(ROOT, "public", "mika-reyes-logo.png");
const FAVICON = path.join(ROOT, "src", "app", "icon.png");

/** Sum RGB below this counts as "background black" for flood-fill traversal. */
const DARK_SUM_MAX = 45;

function isDark(r: number, g: number, b: number): boolean {
  return r + g + b < DARK_SUM_MAX;
}

async function main() {
  const { data, info } = await sharp(INPUT)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const w = info.width;
  const h = info.height;
  const ch = info.channels;
  if (ch !== 4) {
    throw new Error(`Expected RGBA, got ${ch} channels`);
  }

  const seen = new Uint8Array(w * h);
  const queue: [number, number][] = [];

  const idx = (x: number, y: number) => (y * w + x) * ch;
  const key = (x: number, y: number) => y * w + x;

  const tryPush = (x: number, y: number) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const k = key(x, y);
    if (seen[k]) return;
    const i = idx(x, y);
    const r = data[i] ?? 0;
    const g = data[i + 1] ?? 0;
    const b = data[i + 2] ?? 0;
    if (!isDark(r, g, b)) return;
    seen[k] = 1;
    queue.push([x, y]);
  };

  for (let x = 0; x < w; x += 1) {
    tryPush(x, 0);
    tryPush(x, h - 1);
  }
  for (let y = 0; y < h; y += 1) {
    tryPush(0, y);
    tryPush(w - 1, y);
  }

  for (let qi = 0; qi < queue.length; qi += 1) {
    const [x, y] = queue[qi]!;
    tryPush(x + 1, y);
    tryPush(x - 1, y);
    tryPush(x, y + 1);
    tryPush(x, y - 1);
  }

  const out = Buffer.from(data);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const k = key(x, y);
      if (seen[k] !== 1) continue;
      const i = idx(x, y);
      out[i + 3] = 0;
    }
  }

  const rgba = sharp(out, {
    raw: { width: w, height: h, channels: 4 },
  }).png();

  await rgba.toFile(OUTPUT);
  console.log(`Wrote transparent logo: ${OUTPUT}`);

  await sharp(OUTPUT)
    .resize(512, 512, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(FAVICON);
  console.log(`Wrote favicon: ${FAVICON}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
