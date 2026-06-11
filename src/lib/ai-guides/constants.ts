/** Hub filter pills (fixed set + “All”). */
export const AI_HUB_FILTER_TAGS = [
  "beginner",
  "advanced",
  "skills",
  "claude",
] as const;

/**
 * Legacy: guides shown on /ai but not linked from the hub card.
 * Prefer `status: coming-soon` in guide frontmatter so the card stays
 * clickable and the in-progress state appears on the guide page instead.
 */
export const AI_GUIDE_COMING_SOON_SLUGS: ReadonlySet<string> = new Set();
