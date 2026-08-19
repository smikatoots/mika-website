"use client";

import posthog from "posthog-js";

import { Ga4TrackedInternalLink } from "@/components/analytics/Ga4TrackedLink";
import { BUILD_YOUR_FIRST_AGENT_PRICE } from "@/lib/courses/build-your-first-agent";

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
        Want to build one yourself?
      </h2>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-700">
        This guide is free — Build Your First Agent 101 is the hands-on next
        step: ${BUILD_YOUR_FIRST_AGENT_PRICE}, one day, one working agent
        built for your own workflow.
      </p>
      <Ga4TrackedInternalLink
        href={COURSE_HREF}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--mr-coral)] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[var(--mr-coral-bright)]"
        ga4EventName="course_cta_clicked"
        ga4Params={{
          cta_label: "Build Your First Agent 101",
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
        Build Your First Agent 101 →
      </Ga4TrackedInternalLink>
    </section>
  );
}
