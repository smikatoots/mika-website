import type { Metadata } from "next";

import {
  LinkInBioContent,
  type BioGuide,
} from "@/components/link-in-bio/LinkInBioContent";
import { loadAllAiGuideIndexEntries } from "@/lib/ai-guides/load-guides";
import { FEATURED_LINK_IDS } from "@/lib/link-in-bio";
import { productLinks } from "@/lib/product-links";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";

const title = "Mika Reyes — start here";
const description =
  "The course, office hours, tools I use, and free AI guides — all in one place.";
const canonical = canonicalUrl("/link-in-bio");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

export default async function LinkInBioPage() {
  const entries = await loadAllAiGuideIndexEntries();

  const guides: BioGuide[] = entries
    .filter((entry) => entry.status !== "coming-soon")
    .slice(0, 3)
    .map((entry) => ({ slug: entry.slug, title: entry.title }));

  // Preserve the curated order from FEATURED_LINK_IDS, not catalog order.
  const featuredLinks = FEATURED_LINK_IDS.map((id) =>
    productLinks.find((link) => link.id === id),
  ).filter((link) => link !== undefined);

  return <LinkInBioContent guides={guides} featuredLinks={featuredLinks} />;
}
