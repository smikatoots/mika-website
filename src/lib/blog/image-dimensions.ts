import "server-only";

import path from "node:path";
import { cache } from "react";
import sharp from "sharp";

export type ImageDimensions = { width: number; height: number };

/**
 * Read the intrinsic pixel dimensions of a local image under `public/` at
 * build time so the browser can reserve the correct box and avoid layout
 * shift while the image loads. Returns null for remote or unreadable images.
 * Cached per src for the duration of a render pass.
 */
export const getPublicImageDimensions = cache(
  async (src: string): Promise<ImageDimensions | null> => {
    // Only local, absolute public paths (e.g. "/ai-guides/foo.png").
    if (!src.startsWith("/") || src.startsWith("//")) {
      return null;
    }

    try {
      const filePath = path.join(process.cwd(), "public", src);
      const { width, height } = await sharp(filePath).metadata();
      if (!width || !height) {
        return null;
      }
      return { width, height };
    } catch {
      return null;
    }
  },
);
