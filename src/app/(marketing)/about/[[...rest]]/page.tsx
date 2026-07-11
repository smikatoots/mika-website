import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/AboutPageContent";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";

export const dynamic = "force-static";

const title = "About";
const description = "About Mika Reyes — bio, now, and photos.";
const canonical = canonicalUrl("/about");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

/** Prerenders `/about` only (● in `next build` — optional catch-all with one static variant). */
export function generateStaticParams() {
  return [{ rest: [] as string[] }];
}

export default function AboutPage() {
  return <AboutPageContent />;
}
