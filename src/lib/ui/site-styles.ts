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

export const siteLink =
  "font-semibold text-[var(--mr-coral)] underline decoration-[var(--mr-border-rose)] underline-offset-[3px] transition-colors hover:text-[var(--mr-coral-bright)]";

export const siteLinkSubtle =
  "text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-coral)] underline decoration-[var(--mr-coral)]/40 underline-offset-[3px] transition-colors hover:text-[var(--mr-coral-bright)]";

export const siteNavLink =
  "text-[length:var(--mr-text-sm)] font-semibold text-[var(--mr-text-soft)] transition-colors hover:text-[var(--mr-coral)]";

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
