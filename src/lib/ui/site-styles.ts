/**
 * Shared Tailwind class strings — single source for typography, links, layout width.
 * Colors reference design-token CSS variables via --mr-* custom properties.
 */

export const textDefault = "text-[var(--mr-ink)]";

export const textBody = "text-[length:var(--mr-text-body)] leading-relaxed text-[var(--mr-text-soft)]";

export const textH1 =
  "font-[family-name:var(--mr-font-display)] text-4xl font-bold tracking-tight text-[var(--mr-ink)] leading-[1.02] md:text-5xl";

export const textH2 =
  "font-[family-name:var(--mr-font-display)] text-2xl font-bold tracking-tight text-[var(--mr-ink)] leading-[1.05] md:text-3xl";

export const textH3 = "font-[family-name:var(--mr-font-display)] text-xl font-bold text-[var(--mr-ink)] leading-[1.2]";

export const textMuted = "text-[length:var(--mr-text-xs)] text-[var(--mr-muted)]";

/* Links stay coral — they should look like links — but at the deepened value.
   Plain coral as text is 3.7:1 on paper white and fails AA; `--mr-coral-deep`
   is 4.79:1 and exists for exactly this. Hover brightens to full coral, where
   the contrast requirement no longer applies because it is a transient state
   on text the reader has already found. */
export const siteLink =
  "font-semibold text-[var(--mr-coral-deep)] underline decoration-[var(--mr-border-rose)] underline-offset-[3px] transition-colors hover:text-[var(--mr-coral)]";

export const siteLinkSubtle =
  "text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-coral-deep)] underline decoration-[var(--mr-coral-deep)]/40 underline-offset-[3px] transition-colors hover:text-[var(--mr-coral)]";

export const siteNavLink =
  "text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-text-soft)] transition-colors hover:text-[var(--mr-coral-deep)]";

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
