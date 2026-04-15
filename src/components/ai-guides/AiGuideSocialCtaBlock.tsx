import { homeBioLinks } from "@/lib/home-bio-links";

/**
 * Shared promo block at the bottom of every AI guide. Edit copy and links here
 * only — it is reused across all `/ai/*` guide pages.
 */
export function AiGuideSocialCtaBlock() {
  const instagramHref = homeBioLinks.instagram;

  return (
    <aside className="not-prose mt-14 flex flex-col items-center rounded-[10px] border border-accent bg-white px-6 py-8 text-center shadow-sm sm:px-8">
      <h2 className="max-w-xl text-xl font-semibold tracking-tight text-accent sm:text-2xl">
        Want to watch more practical AI tips?
      </h2>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-accent">
        I post daily on Instagram, TikTok and LinkedIn.
      </p>
      <a
        href={instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-accent px-6 py-2.5 text-base font-semibold text-white transition hover:bg-accent-hover"
      >
        Follow
      </a>
    </aside>
  );
}
