import type { Metadata } from "next";
import Link from "next/link";

import { ThankYouPageTracker } from "./ThankYouPageTracker";

import { buttonStyle } from "@/components/ui/buttonStyle";

// Private post-checkout surface — not a page anyone should search for or
// land on organically. See SEO.md, "When a page should not be indexed."
export const metadata: Metadata = {
  title: "You're in! · Build Your First Agent 101",
  robots: { index: false, follow: false },
};

export default function BuildYourFirstAgentThankYouPage() {
  return (
    <main>
      <ThankYouPageTracker />

      <section
        style={{
          background: "var(--mr-charcoal)",
          padding: "96px 0 104px",
          minHeight: "calc(100vh - 200px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="mx-auto max-w-2xl px-6 text-center md:px-10">
          <p
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-eyebrow)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-red-bright)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: "20px",
            }}
          >
            You&apos;re in!
          </p>

          <h1
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: "var(--mr-weight-display)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#fff",
              marginBottom: "24px",
            }}
          >
            Your purchase went through 🎉
          </h1>

          <div
            className="space-y-5 text-left"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.7,
              marginBottom: "40px",
            }}
          >
            <p>Hi, it&apos;s Mika!</p>
            <p>
              Thank you so much for enrolling in Build Your First Agent 101 —
              I&apos;m genuinely excited for you to start building.
            </p>
            <p>
              Access and login instructions are on their way to the email you
              used at checkout. If you don&apos;t see it in a few minutes,
              check your spam/promotions folder — and if it still hasn&apos;t
              shown up, email me at{" "}
              <a
                href="mailto:hello@mikareyes.com"
                style={{
                  color: "#fff",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                hello@mikareyes.com
              </a>{" "}
              and I&apos;ll sort you out personally.
            </p>
            <p>Can&apos;t wait to see what you build :)</p>
          </div>

          <p
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "var(--mr-text-body)",
              fontWeight: "var(--mr-weight-display)",
              color: "#fff",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            Mika
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="mr-pressable inline-flex items-center justify-center"
              style={buttonStyle({ size: "lg" })}
            >
              Keep exploring →
            </Link>
            <Link
              href="/ai"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-sm)",
                color: "rgba(255,255,255,0.75)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              More free AI guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
