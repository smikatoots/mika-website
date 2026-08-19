"use client";

import posthog from "posthog-js";

import { Ga4TrackedAnchor } from "@/components/analytics/Ga4TrackedLink";
import { BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL } from "@/lib/courses/build-your-first-agent";

/**
 * The only conversion action on the course page. Fires both GA4 and PostHog
 * so CTA location performance (hero vs. pricing card vs. P.S., etc.) is
 * actually measurable instead of going straight to an untracked Stripe link.
 */
export function EnrollCta({
  label = "Enroll now",
  location,
}: {
  label?: string;
  location: string;
}) {
  return (
    <Ga4TrackedAnchor
      href={BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL}
      className="mr-pressable inline-flex items-center justify-center"
      data-cta-location={location}
      ga4EventName="enroll_cta_clicked"
      ga4Params={{
        cta_label: label,
        cta_location: location,
        destination_url: BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL,
        link_type: "external_checkout",
      }}
      onClick={() => {
        posthog.capture("enroll_cta_clicked", {
          cta_label: label,
          cta_location: location,
          destination_url: BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL,
        });
      }}
      style={{
        background: "var(--mr-coral)",
        color: "#fff",
        fontFamily: "var(--mr-font-body)",
        fontSize: "var(--mr-text-body)",
        fontWeight: "var(--mr-weight-semi)",
        padding: "16px 32px",
        borderRadius: "var(--mr-radius-pill)",
        boxShadow: "var(--mr-shadow-cta)",
        textDecoration: "none",
      }}
    >
      {label} →
    </Ga4TrackedAnchor>
  );
}
