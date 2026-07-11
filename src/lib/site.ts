export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikareyes.com";

/** On-site branding (header, footer, page title suffix). */
export const SITE_NAME = "Mika Reyes";

/** Site name for search engines and social previews. */
export const SITE_SEO_NAME = "Mika Reyes - AI Founder & Creator";

export const SITE_DESCRIPTION = "Mika Reyes — AI, startups, and life.";

export const SITE_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Mika Reyes — follow for real talk on founder life, AI, and living time-rich.",
} as const;
