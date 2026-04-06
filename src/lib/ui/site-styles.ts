/**
 * Shared Tailwind class strings — single source for typography, links, layout width.
 */

/** Primary text (body on white). */
export const textDefault = "text-zinc-950";

/** Body copy — slightly softer than headings. */
export const textBody = "text-[1.05rem] leading-relaxed text-zinc-800";

/** Page title (hero H1). */
export const textH1 =
  "text-4xl font-semibold tracking-tight text-zinc-950 md:text-5xl";

/** Section title on content pages. */
export const textH2 =
  "text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl";

/** Subsection title. */
export const textH3 = "text-xl font-semibold tracking-tight text-zinc-950";

/** Muted / metadata. */
export const textMuted = "text-sm text-zinc-500";

/** Inline & nav links (turquoise + hover). */
export const siteLink =
  "font-medium text-teal-600 underline decoration-teal-500/45 underline-offset-[3px] transition-colors hover:text-teal-800 hover:decoration-teal-700/60";

/** Simpler link (e.g. back link). */
export const siteLinkSubtle =
  "text-sm font-medium text-teal-600 underline decoration-teal-400/50 underline-offset-[3px] transition-colors hover:text-teal-800";

/** Header nav: same teal as body links, no underline (dense horizontal nav). */
export const siteNavLink =
  "text-sm font-medium text-teal-600 transition-colors hover:text-teal-800";

/** Article-width main column. */
export const mainProse =
  "mx-auto w-full max-w-2xl px-6 py-16 md:px-8";

/** Wider index pages (projects, blog list). */
export const mainWide =
  "mx-auto w-full max-w-6xl px-6 py-16 md:px-8";

/** Press-style dense grid container. */
export const mainGallery =
  "mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:px-8 md:py-16";
