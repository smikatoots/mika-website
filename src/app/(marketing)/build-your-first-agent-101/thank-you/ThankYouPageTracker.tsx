"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";

/**
 * Fires once when a buyer's browser lands here after Stripe checkout. This is
 * the only signal this repo has that a "Build Your First Agent 101" sale
 * happened — there's no Stripe webhook, so this page (wired up as the
 * Payment Link's post-payment redirect in the Stripe Dashboard) is it.
 */
export function ThankYouPageTracker() {
  useEffect(() => {
    trackGa4Event("purchase_confirmed", { cta_location: "thank_you_page" });
    posthog.capture("purchase_confirmed", {});
  }, []);

  return null;
}
