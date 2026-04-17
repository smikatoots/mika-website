/** Hub filter pills (fixed set + “All”). */
export const AI_HUB_FILTER_TAGS = [
  "beginner",
  "advanced",
  "skills",
  "claude",
] as const;

/**
 * Guides still shown on /ai but not linked until photos or polish are ready.
 * Remove a slug from this set when you want the card to navigate again.
 */
export const AI_GUIDE_COMING_SOON_SLUGS: ReadonlySet<string> = new Set([
  "reduce-claude-tokens-part-2",
  "reduce-claude-tokens-part-3",
  "how-to-setup-claude-code",
]);
