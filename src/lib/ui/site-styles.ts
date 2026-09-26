/**
 * Shared Tailwind class strings — single source for typography, links, layout width.
 * Colors reference design-token CSS variables via --mr-* custom properties.
 */

export const textDefault = "text-[var(--mr-ink)]";

export const textBody = "text-[length:var(--mr-text-body)] leading-relaxed text-[var(--mr-charcoal)]";

export const textH1 =
  "font-[family-name:var(--mr-font-display)] text-4xl font-bold tracking-tight text-[var(--mr-ink)] leading-[1.02] md:text-5xl";

export const textH2 =
  "font-[family-name:var(--mr-font-display)] text-2xl font-bold tracking-tight text-[var(--mr-ink)] leading-[1.05] md:text-3xl";

export const textH3 = "font-[family-name:var(--mr-font-display)] text-xl font-bold text-[var(--mr-ink)] leading-[1.2]";

export const textMuted = "text-[length:var(--mr-text-xs)] text-[var(--mr-muted)]";

/* Links stay coral — they should look like links — but at the deepened value.
   Plain coral as text is 3.7:1 on paper white and fails AA; `--mr-red-deep`
   is 4.79:1 and exists for exactly this. Hover brightens to full coral, where
   the contrast requirement no longer applies because it is a transient state
   on text the reader has already found. */
export const siteLink =
  "font-semibold text-[var(--mr-red-deep)] underline decoration-[var(--mr-line)] underline-offset-[3px] transition-colors hover:text-[var(--mr-red-deep)]";

export const siteLinkSubtle =
  "text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-red-deep)] underline decoration-[var(--mr-red-deep)]/40 underline-offset-[3px] transition-colors hover:text-[var(--mr-red-deep)]";

export const siteNavLink =
  "text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-charcoal)] transition-colors hover:text-[var(--mr-red-deep)]";

/** Article-width main column. */
export const mainProse =
  "mx-auto w-full max-w-2xl px-6 py-16 md:px-8";

/** Blog / AI guide detail pages — wider than prose, still under index width. */
export const mainArticle =
  "mx-auto w-full max-w-5xl px-6 py-16 md:px-8";

/** Wider index pages (projects, blog list). */
export const mainWide =
  "mx-auto w-full max-w-6xl px-6 py-16 md:px-8";

/** Press-style dense grid container. */
export const mainGallery =
  "mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:px-8 md:py-16";

/* Card grounds for the colour-cycled grids on /links and /ai. Shared so the
   two pages cannot drift into different palettes.

   Each ground carries its own type colour rather than assuming ink, so a
   future dark accent can invert without touching the grids. Today all four
   take ink.

   Cycle these by grid position, not by item id, so a filtered grid still shows
   the full spread. Green and aqua are kept apart in the order because they
   sit close in lightness. */
export const CARD_GROUNDS = [
  { bg: "var(--mr-green)", fg: "var(--mr-ink)", chip: "var(--mr-paper)" },
  { bg: "var(--mr-yellow)", fg: "var(--mr-ink)", chip: "var(--mr-paper)" },
  { bg: "var(--mr-aqua)", fg: "var(--mr-ink)", chip: "var(--mr-paper)" },
  { bg: "var(--mr-red)", fg: "var(--mr-ink)", chip: "var(--mr-paper)" },
] as const;

/** The white pill CTA that sits inside a coloured card. */
export const cardButton =
  "mt-auto inline-flex w-fit items-center gap-1.5 rounded-[var(--mr-radius-pill)]" +
  " border border-[var(--mr-ink)] bg-white px-4 py-2" +
  " text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-ink)]";
