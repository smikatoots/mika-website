import Image from "next/image";

/**
 * Shared promo block at the bottom of every AI guide. Edit copy and links here
 * only — it is reused across all `/ai/*` guide pages.
 */
export function AiGuideSocialCtaBlock() {
  return (
    <aside className="not-prose mt-14 flex flex-col overflow-hidden rounded-[10px] border border-accent bg-white shadow-sm">
      <Image
        src="/lightning-lesson-may-7-2026.png"
        alt="Mika and Nick speaking at a Lightning Lesson"
        width={1024}
        height={576}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="w-full border-0 h-auto"
      />
      <div className="flex flex-col items-center px-6 pb-8 pt-6 text-center sm:px-8">
        <h2 className="max-w-3xl text-xl font-semibold tracking-tight text-accent sm:text-2xl">
          Join our <strong>free, live</strong> Lightning Lesson
          <br />
          on <strong>May 7, 2026</strong>!
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-accent">
          We&apos;re partnering with Maven to host a free live workshop on May 7.
          Watch three live demos, ask questions in real time, and leave with a
          clear picture of what&apos;s possible. Only a few spots available!
        </p>
        <a
          href="https://maven.com/p/8fabac/use-claude-code-as-a-non-technical-pro?utm_campaign=website_ai_guide&utm_medium=ll_share_link&utm_source=instructor"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-accent px-6 py-2.5 text-base font-semibold text-white transition hover:bg-accent-hover"
        >
          Sign up for free
        </a>
      </div>
    </aside>
  );
}
