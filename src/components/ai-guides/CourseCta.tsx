"use client";

import posthog from "posthog-js";

import { Ga4TrackedInternalLink } from "@/components/analytics/Ga4TrackedLink";

const COURSE_HREF = "/build-your-first-agent-101";
const CTA_LOCATION = "ai_guide_article_end";

/**
 * End-of-article CTA promoting the self-paced course. Appended to every
 * published AI guide (see src/app/(site)/ai/[slug]/page.tsx) so warm,
 * already-interested readers see a clear next step instead of a dead end.
 */
export function CourseCta() {
  return (
    <section className="mt-16 rounded-2xl border border-[var(--mr-border-rose)] bg-[var(--mr-surface-rose)] px-6 py-8 text-center md:px-10 md:py-10">
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
        Want to build your first AI agent?
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-700">
        Build Your First Agent 101 is the next step! You&apos;ll get{" "}
        <strong>
          step by step guides, video tutorials and starter prompts
        </strong>{" "}
        to <strong>create your first agent</strong> in half a day,{" "}
        <strong>customized</strong> to your own workflow.
      </p>
      <Ga4TrackedInternalLink
        href={COURSE_HREF}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--mr-coral)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--mr-coral-bright)]"
        ga4EventName="course_cta_clicked"
        ga4Params={{
          cta_label: "Learn more",
          cta_location: CTA_LOCATION,
          destination_url: COURSE_HREF,
          link_type: "internal_course_cta",
        }}
        onClick={() => {
          posthog.capture("course_cta_clicked", {
            cta_location: CTA_LOCATION,
          });
        }}
      >
        Learn more
      </Ga4TrackedInternalLink>
    </section>
  );
}
