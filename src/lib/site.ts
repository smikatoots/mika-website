export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mikareyes.com";

/** Concise brand name used consistently for Google's site-name signals. */
export const SITE_NAME = "Mika Reyes";

export const SITE_TAGLINE = "AI Founder & Creator";

export const SITE_DESCRIPTION = "Mika Reyes — AI, startups, and life.";

export const SITE_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Mika Reyes — follow for real talk on founder life, AI, and living time-rich.",
} as const;
