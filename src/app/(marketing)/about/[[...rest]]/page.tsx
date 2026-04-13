import type { Metadata } from "next";

import { AboutPageContent } from "@/components/about/AboutPageContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About",
  description: "About Mika Reyes — bio, now, and photos.",
};

/** Prerenders `/about` only (● in `next build` — optional catch-all with one static variant). */
export function generateStaticParams() {
  return [{ rest: [] as string[] }];
}

export default function AboutPage() {
  return <AboutPageContent />;
}
