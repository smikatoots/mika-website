"use client";

import type { CSSProperties, ReactNode } from "react";

import { trackGa4Event } from "@/lib/analytics/ga4";
import { siteLink } from "@/lib/ui/site-styles";

import { buttonStyle } from "@/components/ui/buttonStyle";

const HOST_HREF =
  "mailto:mika@kingscrosslabs.com?subject=" +
  encodeURIComponent("Host an event");

const LUMA_CALENDAR_HREF =
  "https://luma.com/calendar/cal-VGIuN3lXHlOfej9?period=past";

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "What types of events do you produce?",
    answer:
      "Curated, intimate dinners and roundtables with 10–20 attendees, and larger workshops with up to 100 people.",
  },
  {
    question: "How do you work with clients?",
    answer:
      "We start by understanding your goals, then recommend a format for you to sponsor or participate in.",
  },
  {
    question: "Who attends these events?",
    answer:
      "Leaders & operators in growth, marketing & GTM, as well as content creators in NYC.",
  },
  {
    question: "How do I subscribe or attend future events?",
    answer: (
      <>
        Subscribe{" "}
        <a
          href={LUMA_CALENDAR_HREF}
          className={siteLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </>
    ),
  },
];

const ctaButtonStyle: CSSProperties = buttonStyle({ size: "lg" });

function HostCta({ location }: { location: string }) {
  return (
    <a
      href={HOST_HREF}
      className="mr-pressable"
      onClick={() =>
        trackGa4Event("contact_cta_click", {
          cta_label: "Host an event",
          cta_location: location,
          destination_url: HOST_HREF,
          link_type: "external_contact",
        })
      }
      style={ctaButtonStyle}
    >
      Host an event →
    </a>
  );
}

export function EventsPageContent() {
  return (
    <main>
      <section
        style={{
          padding: "clamp(48px, 8vw, 80px) 0 clamp(56px, 8vw, 72px)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
          <span
            className="mb-5 inline-flex items-center gap-2"
            style={{
              background: "var(--mr-surface-rose-2)",
              color: "var(--mr-coral)",
              padding: "7px 16px",
              borderRadius: "var(--mr-radius-pill)",
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-xs)",
              fontWeight: "var(--mr-weight-display)",
            }}
          >
            ✦ NYC Events
          </span>
          <h1
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: "var(--mr-weight-display)",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: "var(--mr-ink)",
              marginTop: "8px",
            }}
          >
            Host an event in New York
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "clamp(16px, 2vw, var(--mr-text-lead))",
              lineHeight: 1.6,
              color: "var(--mr-muted)",
            }}
          >
            Position your company or startup directly in front of
            decision-makers at high-growth, early-stage tech companies in New
            York City.
          </p>
          <div className="mt-8 flex justify-center">
            <HostCta location="events_hero" />
          </div>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--mr-border-warm)",
          padding: "clamp(48px, 7vw, 72px) 0",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <p
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              lineHeight: 1.7,
              color: "var(--mr-text-soft)",
              textAlign: "center",
            }}
          >
            I plan and produce events for marketers, growth professionals,
            content creators and salespeople. I&apos;ll help you design the
            format, curate the room, book the space, market the event and put
            your brand in front of the right people.
          </p>
        </div>
      </section>

      <section
        style={{
          borderTop: "1px solid var(--mr-border-warm)",
          padding: "clamp(48px, 7vw, 72px) 0 clamp(64px, 10vw, 96px)",
        }}
      >
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <h2
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: "var(--mr-weight-display)",
              letterSpacing: "-0.02em",
              color: "var(--mr-ink)",
            }}
          >
            FAQ
          </h2>
          <dl className="mt-10 space-y-8">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <dt
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-body)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                  }}
                >
                  {question}
                </dt>
                <dd
                  className="mt-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.65,
                  }}
                >
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
