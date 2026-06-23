import type { Metadata } from "next";

import { ProductLinksContent } from "@/components/links/ProductLinksContent";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

export const metadata: Metadata = {
  title: "Links",
  description: "Links I recommend and use",
  openGraph: buildOpenGraph({
    title: "Links",
    description: "Links I recommend and use",
  }),
  twitter: buildTwitter({
    title: "Links",
    description: "Links I recommend and use",
  }),
};

export default function ProductLinksPage() {
  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero eyebrow="✦ Things I recommend" title="Links" />
      <div className="mt-12">
        <ProductLinksContent />
      </div>
    </main>
  );
}
