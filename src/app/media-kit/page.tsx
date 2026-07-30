import type { Metadata } from "next";

import { MediaKitPageContent } from "@/components/media-kit/MediaKitPageContent";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";

export const dynamic = "force-static";

const title = "Creator Media Kit";
const description = "Mika Reyes — creator media kit for brand partnerships.";
const canonical = canonicalUrl("/media-kit");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

export default function MediaKitPage() {
  return <MediaKitPageContent />;
}
