"use client";

import posthog from "posthog-js";

import { Ga4TrackedAnchor } from "@/components/analytics/Ga4TrackedLink";

const CTA_LOCATION = "ai_guide_intro";
const ADELI_HREF =
  "https://tryadeli.com/?utm_source=mikareyes.com&utm_medium=referral&utm_campaign=ai_guides&utm_content=guide_intro_box";

/**
 * Adeli promo box. Injected into every AI guide right after the intro and
 * before the first heading by remarkInsertAdeliCta (see render-ai-guide-mdx).
 * Styled to match CourseCta so the two boxes read as one system.
 */
export function AdeliCta() {
  return (
    <aside className="not-prose my-10 rounded-[var(--mr-radius-card)] border border-[var(--mr-line)] bg-[var(--mr-paper)] px-6 py-8 text-center md:px-10 md:py-10">
      <p className="font-[family-name:var(--mr-font-display)] text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
        Building with social media and ads APIs?
      </p>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-[var(--mr-charcoal)] md:max-w-none">
        I&apos;m currently building{" "}
        <a
          href={ADELI_HREF}
          target="_blank"
          rel="noopener"
          className="text-[var(--mr-red-deep)] underline underline-offset-4"
        >
          <strong>Adeli</strong>
        </a>
        ! We help builders and founders{" "}
        <strong>
          connect their<br />
          users to social media and ads platforms
        </strong>{" "}
        through one API.
      </p>
      <p className="mx-auto mt-3 max-w-xl leading-relaxed text-[var(--mr-charcoal)] md:max-w-none">
        Creator, agency, or marketer? Use it to see{" "}
        <strong>all your social and ads metrics in one place</strong>.
      </p>
      <Ga4TrackedAnchor
        href={ADELI_HREF}
        target="_blank"
        rel="noopener"
        className="mr-pressable mt-6 inline-flex items-center justify-center rounded-[var(--mr-radius-pill)] bg-[var(--mr-red-deep)] px-8 py-3 text-sm font-bold text-white no-underline"
        ga4EventName="adeli_cta_clicked"
        ga4Params={{
          cta_label: "Learn more",
          cta_location: CTA_LOCATION,
          destination_url: ADELI_HREF,
          link_type: "external_adeli_cta",
        }}
        onClick={() => {
          posthog.capture("adeli_cta_clicked", { cta_location: CTA_LOCATION });
        }}
      >
        Learn more
      </Ga4TrackedAnchor>
    </aside>
  );
}
