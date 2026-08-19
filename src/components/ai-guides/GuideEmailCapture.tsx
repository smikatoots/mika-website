"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";

const STORAGE_KEY_PREFIX = "mr-ai-guide-email-capture-seen:";

type AnalyticsParams = Record<string, string | number | boolean>;

function trackEmailGateEvent(eventName: string, params: AnalyticsParams) {
  posthog.capture(eventName, params);
  trackGa4Event(eventName, params);
}

type GuideEmailCaptureProps = {
  guideSlug: string;
  guideTitle: string;
};

export function GuideEmailCapture({
  guideSlug,
  guideTitle,
}: GuideEmailCaptureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const forceOpen =
      new URLSearchParams(window.location.search).get("emailGate") === "1";
    const isMobileViewer = window.matchMedia("(max-width: 767px)").matches;

    if (!forceOpen && !isMobileViewer) return;

    if (!forceOpen) {
      try {
        const storageKey = `${STORAGE_KEY_PREFIX}${guideSlug}`;
        if (window.localStorage.getItem(storageKey)) return;
        window.localStorage.setItem(storageKey, "1");
      } catch {
        // Storage can be unavailable in private browsing; still show the gate.
      }
    }

    setIsOpen(true);
    trackEmailGateEvent("ai_guide_email_gate_viewed", {
      guide_slug: guideSlug,
      guide_title: guideTitle,
      force_opened: forceOpen,
      mobile_viewer: isMobileViewer,
    });
  }, [guideSlug, guideTitle]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      trackEmailGateEvent("ai_guide_email_gate_dismissed", {
        guide_slug: guideSlug,
        guide_title: guideTitle,
        dismiss_method: "escape_key",
        modal_state: isSent ? "confirmation" : "form",
      });
      setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guideSlug, guideTitle, isOpen, isSent]);

  function dismiss(method: "close_button" | "backdrop" | "escape_key") {
    trackEmailGateEvent("ai_guide_email_gate_dismissed", {
      guide_slug: guideSlug,
      guide_title: guideTitle,
      dismiss_method: method,
      modal_state: isSent ? "confirmation" : "form",
    });
    setIsOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    trackEmailGateEvent("ai_guide_email_gate_submit_started", {
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

      trackEmailGateEvent("ai_guide_email_gate_submitted", {
        guide_slug: guideSlug,
        guide_title: guideTitle,
      });
      trackGa4Event("generate_lead", {
        guide_slug: guideSlug,
        lead_source: "ai_guide_email_gate",
      });
      setIsSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
      trackEmailGateEvent("ai_guide_email_gate_submit_failed", {
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) dismiss("backdrop");
      }}
    >
      <div
        aria-describedby="guide-email-description"
        aria-labelledby="guide-email-title"
        aria-modal="true"
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-white px-5 pb-6 pt-8 shadow-2xl sm:px-8 sm:pb-8"
        role="dialog"
      >
        <button
          aria-label="Close"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-2xl leading-none text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          onClick={() => dismiss("close_button")}
          type="button"
        >
          ×
        </button>
        {isSent ? (
          <div className="py-4 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <svg
                aria-hidden="true"
                className="size-9"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m5 12.5 4.25 4.25L19 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <h2
              className="mt-5 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl"
              id="guide-email-title"
            >
              Check your email!
            </h2>
            <p
              className="mt-3 text-base leading-relaxed text-zinc-600"
              id="guide-email-description"
              role="status"
            >
              Your guide is on its way to <strong>{email}</strong>.
            </p>
            <button
              className="mt-7 min-h-12 w-full rounded-full bg-[var(--mr-coral)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--mr-coral-bright)]"
              onClick={() => dismiss("close_button")}
              type="button"
            >
              Back to the guide
            </button>
          </div>
        ) : (
          <>
            <h2
              className="pr-8 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl"
              id="guide-email-title"
            >
              Send this guide to yourself
            </h2>
            <p
              className="mt-3 text-base leading-relaxed text-zinc-600"
              id="guide-email-description"
            >
              Get the link in your inbox so you can read it whenever you&apos;re
              ready.
            </p>
            <form className="mt-6" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="guide-email">
                Email address
              </label>
              <input
                autoComplete="email"
                className="min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[var(--mr-coral)] focus:ring-2 focus:ring-[var(--mr-coral)]/20"
                id="guide-email"
                inputMode="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                ref={emailInputRef}
                required
                type="email"
                value={email}
              />
              <button
                className="mt-3 min-h-12 w-full rounded-full bg-[var(--mr-coral)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--mr-coral-bright)] disabled:cursor-wait disabled:opacity-65"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Sending…" : "Send me the guide"}
              </button>
              <p className="mt-3 text-center text-xs leading-relaxed text-zinc-500">
                Your email will also be saved for future updates.
              </p>
              {error ? (
                <p className="mt-3 text-center text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
