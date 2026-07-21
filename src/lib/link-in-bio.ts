/**
 * Content config for the /link-in-bio landing page (the Instagram + TikTok
 * bio destination). Kept separate from the page so copy and featured picks can
 * be edited without touching layout.
 */

/**
 * The bio card CTA reads "Learn more", so it points at the sales page rather
 * than straight at Stripe — cold social traffic needs the pitch first.
 */
export const COURSE_URL = "/build-your-first-agent-101";

export const OFFICE_HOURS_URL = "https://cal.com/mika-reyes/office-hours";

export const OFFICE_HOURS_PRICE = 150;

/**
 * Featured affiliate picks, in display order. Ids must exist in
 * `src/lib/product-links.ts` — the full catalog stays the source of truth for
 * URLs and descriptions.
 */
export const FEATURED_LINK_IDS = [
  "granola",
  "wispr-flow",
  "monarch-money",
] as const;

/** Short, benefit-led blurbs for the bio page. The /links page keeps its own. */
export const FEATURED_LINK_BLURBS: Record<string, string> = {
  granola: "I stopped taking meeting notes entirely. 2 months free.",
  "wispr-flow": "I talk instead of type. 3x faster than my keyboard.",
  "monarch-money": "How I track every dollar without a spreadsheet.",
};

export const LINK_IN_BIO_SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/its.mikareyes/" },
  { label: "TikTok", href: "https://www.tiktok.com/@its.mikareyes" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/itsmikareyes" },
] as const;
