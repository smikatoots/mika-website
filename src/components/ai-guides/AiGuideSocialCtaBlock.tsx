import Image from "next/image";

const MAVEN_WORKSHOP_URL =
  "https://maven.com/mika-reyes/master-claude-code-as-a-non-technical-pro?promoCode=MAY7";

/**
 * Shared promo block at the top of every AI guide (`/ai/*`). Edit copy and links
 * here only — it is reused across all guide pages.
 */
export function AiGuideSocialCtaBlock() {
  return (
    <aside className="not-prose mt-14 flex flex-col overflow-hidden rounded-[10px] border border-accent bg-white shadow-sm">
      <Image
        src="/ai-guides/maven-master-claude-may-22-banner.jpg"
        alt="Master Claude as a Non-Technical Pro — live workshop with Mikaela Reyes and Nicolas Reyes"
        width={1024}
        height={288}
        sizes="(min-width: 768px) 48rem, 100vw"
        className="h-auto w-full border-0"
      />
      <div className="flex flex-col items-center px-6 pb-8 pt-6 text-center sm:px-8">
        <h2 className="max-w-3xl text-xl font-semibold tracking-tight text-accent sm:text-2xl">
          Join our <strong>live, hands-on</strong> workshop on{" "}
          <strong>May 22, 2026</strong>!
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-accent">
          Build your own AI agent in 1 day. Skip 6 months of trial &amp; error
          with direct access to AI experts, a community of peers.
        </p>
        <a
          href={MAVEN_WORKSHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-accent px-6 py-2.5 text-base font-semibold text-white transition hover:bg-accent-hover"
        >
          Get 40% off
        </a>
      </div>
    </aside>
  );
}
