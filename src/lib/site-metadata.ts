import type { Metadata } from "next";

import {
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  SITE_SEO_NAME,
  SITE_URL,
} from "@/lib/site";

type OpenGraphOptions = {
  title?: string;
  description?: string;
  url?: string;
};

/** Keeps og:image and siteName when pages override Open Graph metadata. */
export function buildOpenGraph(
  options: OpenGraphOptions = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_US",
    url: options.url ?? SITE_URL,
    siteName: SITE_SEO_NAME,
    description: options.description ?? SITE_DESCRIPTION,
    title: options.title,
    images: [SITE_OG_IMAGE],
  };
}

export function buildTwitter(
  options: OpenGraphOptions = {},
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: options.title,
    description: options.description,
    images: [SITE_OG_IMAGE.url],
  };
}
