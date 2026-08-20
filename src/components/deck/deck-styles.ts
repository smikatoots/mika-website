/**
 * Locked type scale for every deck slide. Two content sizes + one meta size —
 * change a value here and every deck retunes at once.
 *
 * RULE: nothing that carries the spoken message may be smaller than
 * `statement` (the floor, matched to the CTA "MIKA" size). `meta` is reserved
 * for non-message footnotes only (image credits, the slide counter).
 */
export const deckType = {
  /** Biggest moment on a slide: hero statements, the CTA, step numbers. */
  display: "text-9xl sm:text-[11rem]",
  /** Default for all headlines + image headers. The minimum for message text. */
  statement: "text-8xl sm:text-9xl",
  /** One named step below `statement`, for image/step headers only — use when a
   *  full-size header crowds the screenshot it sits above. Never for a hero
   *  statement, and never go below this. */
  statementSm: "text-7xl sm:text-8xl",
  /** Footnotes only — never the message. */
  meta: "text-sm text-zinc-400 sm:text-base",
} as const;

/** Shared heading treatment; compose with a `deckType` size. */
export const headingBase =
  "text-balance font-extrabold leading-[1.04] tracking-tight text-zinc-950";
