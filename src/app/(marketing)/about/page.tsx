import type { Metadata } from "next";

/**
 * Images are taken from the Notion About page in depth-first order:
 * 1 = profile (left column), 2–5 = Photos thumbnails, 6 = large feature,
 * 7–8 = gallery row (2-up), 9–11 = gallery row (3-up), 12 = full-width.
 * Reorder blocks in Notion if slots don’t match.
 */

import { AboutPageContent } from "@/components/about/AboutPageContent";
import {
  isAboutPageConfigured,
  isNotionConfigured,
} from "@/lib/notion/config";
import { getAboutPageFromEnv } from "@/lib/notion/about";
import { collectImageUrlsFromBlocks } from "@/lib/notion/extract-images";
import { getPostByPath } from "@/lib/notion/posts";
import type { BlockTree } from "@/lib/notion/blocks";

export const metadata: Metadata = {
  title: "About",
  description: "About Mika Reyes — bio, now, and photos.",
};

async function resolveAboutBlocks(): Promise<BlockTree[]> {
  if (isAboutPageConfigured()) {
    const env = await getAboutPageFromEnv();
    if (env?.blocks.length) {
      return env.blocks;
    }
  }
  if (isNotionConfigured()) {
    const db = await getPostByPath("about");
    if (db?.blocks.length) {
      return db.blocks;
    }
  }
  return [];
}

export default async function AboutPage() {
  const blocks = await resolveAboutBlocks();
  const imageUrls = collectImageUrlsFromBlocks(blocks);

  return <AboutPageContent imageUrls={imageUrls} />;
}
