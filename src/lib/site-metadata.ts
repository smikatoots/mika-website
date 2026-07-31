import type { Metadata } from "next";

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
} from "@/lib/site";

type OpenGraphOptions = {
  title?: string;
  description?: string;
  url?: string;
  /**
   * Set true on routes that provide their own `opengraph-image.tsx`. Omitting
   * the static image here lets Next's file convention inject the dynamic one;
   * an explicit `images` value would otherwise take precedence over it.
   */
  dynamicImage?: boolean;
};

/**
 * Absolute canonical URL for a route. Pass the route's own path (e.g. "/blog"
 * or `/blog/${slug}`); the homepage is "/". Feed the same value to
 * `buildOpenGraph({ url })` so `og:url` always matches the canonical link.
 */
export function canonicalUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Keeps og:image and siteName when pages override Open Graph metadata. */
export function buildOpenGraph(
  options: OpenGraphOptions = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    locale: "en_US",
    url: options.url ?? SITE_URL,
    siteName: SITE_NAME,
    description: options.description ?? SITE_DESCRIPTION,
    title: options.title,
    ...(options.dynamicImage ? {} : { images: [SITE_OG_IMAGE] }),
  };
}

export function buildTwitter(
  options: OpenGraphOptions = {},
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: options.title,
    description: options.description,
    // Twitter falls back to the Open Graph image when none is set here.
    ...(options.dynamicImage ? {} : { images: [SITE_OG_IMAGE.url] }),
  };
}
