import dimensions from "./image-dimensions.generated.json";

export type ImageDimensions = { width: number; height: number };

const map = dimensions as Record<string, ImageDimensions>;

/**
 * Intrinsic pixel dimensions of a local image under `public/`, so the browser
 * can reserve the correct box and avoid layout shift while it loads. Values are
 * precomputed at build time into `image-dimensions.generated.json` (see
 * `scripts/generate-image-dimensions.ts`) — reading the file with sharp at
 * render time would force Vercel to bundle all of public/ into every function.
 * Returns null for remote or unknown images.
 */
export function getPublicImageDimensions(
  src: string,
): ImageDimensions | null {
  if (!src.startsWith("/") || src.startsWith("//")) {
    return null;
  }
  return map[src] ?? null;
}
