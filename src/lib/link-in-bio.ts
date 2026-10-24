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
export const FEATURED_LINK_IDS = ["stanley", "wispr-flow"] as const;

/** Short, benefit-led blurbs for the bio page. The /links page keeps its own. */
export const FEATURED_LINK_BLURBS: Record<string, string> = {
  stanley: "My AI head of content. It drafts and plans my posts across socials.",
  "wispr-flow": "I talk instead of type. 3x faster than my keyboard.",
};

export const LINK_IN_BIO_SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/its.mikareyes/" },
  { label: "TikTok", href: "https://www.tiktok.com/@its.mikareyes" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/itsmikareyes" },
] as const;
