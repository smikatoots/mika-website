"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";

const PLACEMENT = "inline_byline";

type AnalyticsParams = Record<string, string | number | boolean>;

function trackEmailCaptureEvent(eventName: string, params: AnalyticsParams) {
  posthog.capture(eventName, { ...params, placement: PLACEMENT });
  trackGa4Event(eventName, { ...params, placement: PLACEMENT });
}

type GuideEmailCaptureProps = {
  guideSlug: string;
  guideTitle: string;
};

/**
 * Inline email capture for AI guides. Sits directly under the author byline so
 * it is always available without interrupting the read — it replaced a mobile
 * modal that competed with the site-wide Substack modal for the same attention.
 *
 * Mobile only (`md:hidden`, matching the old modal's 767px cutoff): desktop
 * readers get the Substack modal instead, so showing both would be two asks on
 * one page. Hiding via CSS rather than JS keeps it out of the intersection
 * observer on desktop — a display:none element never intersects, so the
 * "viewed" event stays mobile-only too.
 */
export function GuideEmailCapture({
  guideSlug,
  guideTitle,
}: GuideEmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // "Viewed" only counts once the box is actually on screen; firing on mount
  // would make it a duplicate of the pageview and flatten the funnel.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        trackEmailCaptureEvent("ai_guide_email_gate_viewed", {
          guide_slug: guideSlug,
          guide_title: guideTitle,
        });
      },
      { threshold: 0.4 },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, [guideSlug, guideTitle]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    trackEmailCaptureEvent("ai_guide_email_gate_submit_started", {
      guide_slug: guideSlug,
      guide_title: guideTitle,
    });

    try {
      const response = await fetch("/api/ai-guide-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, guideSlug }),
      });

      if (!response.ok) throw new Error("Request failed");

      trackEmailCaptureEvent("ai_guide_email_gate_submitted", {
        guide_slug: guideSlug,
        guide_title: guideTitle,
      });
      trackGa4Event("generate_lead", {
        guide_slug: guideSlug,
        lead_source: "ai_guide_email_capture",
        placement: PLACEMENT,
      });
      setIsSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
      trackEmailCaptureEvent("ai_guide_email_gate_submit_failed", {
        guide_slug: guideSlug,
        guide_title: guideTitle,
      });
      posthog.captureException(new Error("AI guide email capture failed"), {
        guide_slug: guideSlug,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="guide-email-heading"
      className="mt-8 md:hidden rounded-[var(--mr-radius-card)] border border-[var(--mr-border-teal)] bg-[var(--mr-surface-teal)] px-6 py-8 text-center md:px-10 md:py-10"
      ref={sectionRef}
    >
      {isSent ? (
        <>
          <span
            aria-hidden="true"
            className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-600 text-white"
          >
            <svg className="size-7" fill="none" viewBox="0 0 24 24">
              <path
                d="m5 12.5 4.25 4.25L19 7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </span>
          <p
            className="mt-4 font-[family-name:var(--mr-font-display)] text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
            id="guide-email-heading"
          >
            Check your email!
          </p>
          <p
            className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-700"
            role="status"
          >
            This guide is on its way to <strong>{email}</strong>.
          </p>
        </>
      ) : (
        <>
          <p
            className="font-[family-name:var(--mr-font-display)] text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
            id="guide-email-heading"
          >
            Send this guide to yourself
          </p>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-zinc-700">
            Get the link in your inbox so you can read it whenever you&apos;re
            ready.
          </p>
          <form className="mx-auto mt-6 max-w-sm" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="guide-email">
              Email address
            </label>
            <input
              autoComplete="email"
              className="min-h-12 w-full rounded-[var(--mr-radius-input)] border border-[var(--mr-border-input)] bg-white px-4 text-left text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[var(--mr-coral)] focus:ring-2 focus:ring-[var(--mr-coral)]/20"
              id="guide-email"
              inputMode="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
            <button
              className="mr-pressable mt-3 min-h-12 w-full rounded-[var(--mr-radius-pill)] bg-[var(--mr-coral-deep)] px-6 py-3 text-sm font-bold text-white transition disabled:cursor-wait disabled:opacity-65"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Sending…" : "Send me the guide"}
            </button>
          </form>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">
            Your email will also be saved for future updates.
          </p>
          {error ? (
            <p className="mt-3 text-sm text-red-700" role="alert">
              {error}
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
