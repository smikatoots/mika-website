/**
 * Reusable in-content CTA for AI consulting services.
 * Inserted into guide MDX so updating this component updates all guides.
 */
export function AiGuideBusinessCtaBlock() {
  return (
    <aside className="not-prose mt-8 mb-16 flex flex-col items-center rounded-[10px] border border-accent bg-white px-6 py-8 text-center shadow-sm sm:px-8">
      <h2 className="max-w-3xl text-xl font-semibold tracking-tight text-accent sm:text-2xl">
        Looking to integrate AI into your business so you&apos;re not falling
        behind?
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-accent">
        We do AI consulting, assessments &amp; implementation services. We&apos;ve
        built AI &amp; software for millions at LinkedIn, Microsoft, Airbnb,
        and Google. We&apos;ve raised $4.5M, taken AI and software products to
        production and millions of users, and sold a payments company.
      </p>
      <a
        href="https://kingscrosslabs.com/ai-assessment"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center justify-center rounded-[10px] bg-accent px-6 py-2.5 text-base font-semibold text-white transition hover:bg-accent-hover"
      >
        Learn more
      </a>
    </aside>
  );
}
