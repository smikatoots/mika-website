/**
 * Locked type scale for every deck slide. Two content sizes + one meta size —
 * change a value here and every deck retunes at once.
 *
 * Sizes are FIXED, with no responsive variants, because reveal.js lays every
 * slide out on a fixed 1440x810 canvas and scales that canvas to fit the
 * window. A `sm:` variant would key off the real viewport instead of the
 * canvas, so a slide would change size for reasons the design never intended.
 * For the same reason, never use `vw` units on a slide: they resolve against
 * the window and then get scaled again by Reveal.
 *
 * RULE: nothing that carries the spoken message may be smaller than
 * `statement` (the floor, matched to the CTA "MIKA" size). `meta` is reserved
 * for non-message footnotes only (image credits, the slide counter).
 */
export const deckType = {
  /** Biggest moment on a slide: hero statements, the CTA, step numbers. */
  display: "text-[11rem]",
  /** Default for all headlines + image headers. The minimum for message text. */
  statement: "text-9xl",
  /** One named step below `statement`, for image/step headers only — use when a
   *  full-size header crowds the screenshot it sits above. Never for a hero
   *  statement, and never go below this. */
  statementSm: "text-8xl",
  /** Footnotes only — never the message. */
  meta: "text-base text-zinc-500",
} as const;

/** Shared heading treatment; compose with a `deckType` size. */
export const headingBase =
  "text-balance font-extrabold leading-[var(--deck-leading)] tracking-[var(--deck-tracking)] text-[var(--deck-ink)]";
