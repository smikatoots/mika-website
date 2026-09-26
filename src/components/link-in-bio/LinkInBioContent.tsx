"use client";

import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";
import {
  COURSE_URL,
  FEATURED_LINK_BLURBS,
  LINK_IN_BIO_SOCIALS,
  OFFICE_HOURS_PRICE,
  OFFICE_HOURS_URL,
} from "@/lib/link-in-bio";
import type { ProductLink } from "@/lib/product-links";
import {
  IconInstagram,
  IconLinkedIn,
  IconTikTok,
} from "@/components/ui/SocialIcons";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  Instagram: IconInstagram,
  TikTok: IconTikTok,
  LinkedIn: IconLinkedIn,
};

/* ────────────────────────────────────────────────────────────────────────────
 * TYPE SYSTEM — exactly three styles on this page.
 *
 * Each constant is a COMPLETE set: family + size + weight + line-height +
 * tracking. Always spread the whole object; never set `fontSize` on its own.
 * That is how line-heights drifted apart before (eight different values under
 * only three sizes), which is what made the page feel inconsistent.
 *
 * Only `color` may vary on top of a style — it carries the hierarchy
 * (ink = primary, muted = secondary). Anything else — a fourth size, a one-off
 * weight, a local line-height — is a bug.
 * ──────────────────────────────────────────────────────────────────────────── */

/** Bricolage 24/700. Three uses only: the name and the two offer-card titles. */
const DISPLAY: React.CSSProperties = {
  fontFamily: "var(--mr-font-display)",
  fontSize: "var(--mr-text-h3)",
  fontWeight: 700,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
};

/** Hanken 17/500. Everything readable: copy, buttons, tool names, guides. */
const BODY: React.CSSProperties = {
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-body)",
  fontWeight: 500,
  lineHeight: 1.45,
  letterSpacing: "normal",
};

/**
 * Hanken 13/600, uppercase. Every small non-button label: section headers,
 * "see all", "get the deal", the footer link. Uppercase is baked into the
 * style rather than applied per-use, so these can't drift apart.
 */
const META: React.CSSProperties = {
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-xs)",
  fontWeight: 600,
  lineHeight: 1.4,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
};

export type BioGuide = {
  slug: string;
  title: string;
};

function track({
  label,
  href,
  linkType,
}: {
  label: string;
  href: string;
  linkType: string;
}) {
  posthog.capture("link_in_bio_clicked", {
    label,
    href,
    link_type: linkType,
  });
  trackGa4Event("link_in_bio_click", {
    cta_label: label,
    cta_location: "link_in_bio",
    destination_url: href,
    link_type: linkType,
  });
}

/** Full-width pill. Shared by both offer cards so they read as a matched pair. */
function CardButton({
  children,
  background,
}: {
  children: React.ReactNode;
  background: string;
}) {
  return (
    <span
      style={{
        ...BODY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
        // Ink, not white: both grounds (red, aqua) fail AA with white.
        color: "var(--mr-ink)",
        padding: "14px 24px",
        borderRadius: "var(--mr-radius-pill)",
      }}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  label,
  href,
  onSeeAll,
}: {
  label: string;
  href: string;
  onSeeAll: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "10px",
      }}
    >
      <h2 style={{ ...META, color: "var(--mr-muted)" }}>{label}</h2>
      <Link
        href={href}
        onClick={onSeeAll}
        style={{
          ...META,
          color: "var(--mr-teal)",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        See all →
      </Link>
    </div>
  );
}

export function LinkInBioContent({
  guides,
  featuredLinks,
}: {
  guides: BioGuide[];
  featuredLinks: ProductLink[];
}) {
  return (
    <main
      style={{
        width: "100%",
        maxWidth: "520px",
        // `main` is a flex item of <body>; without an explicit floor the swipe
        // rail's intrinsic card width pushes this wider than the viewport and
        // the overflow becomes unreachable (the page itself will not scroll x).
        minWidth: 0,
        margin: "0 auto",
        padding: "24px 20px 36px",
      }}
    >
      {/* ── Identity ─────────────────────────────────────────────── */}
      <header style={{ textAlign: "center", marginBottom: "20px" }}>
        <Image
          src="/mika-reyes.jpg"
          alt="Mika Reyes"
          width={144}
          height={144}
          priority
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            objectFit: "cover",
            margin: "0 auto 10px",
            border: "3px solid var(--mr-aqua)",
          }}
        />
        <h1 style={{ ...DISPLAY, color: "var(--mr-ink)", marginBottom: "8px" }}>
          Mika Reyes | Timerich AI Founder
        </h1>
      </header>

      {/* ── Primary offer: the course ────────────────────────────── */}
      <Link
        href={COURSE_URL}
        onClick={() =>
          track({
            label: "Master agentic AI for non-techies",
            href: COURSE_URL,
            linkType: "course",
          })
        }
        className="mr-pressable"
        style={{
          display: "block",
          background: "var(--mr-charcoal)",
          borderRadius: "var(--mr-radius-panel)",
          padding: "22px",
          textDecoration: "none",
          boxShadow: "var(--mr-shadow-frame)",
          marginBottom: "12px",
        }}
      >
        <p style={{ ...DISPLAY, color: "#fff", marginBottom: "8px" }}>
          Master agentic AI for non-techies
        </p>
        <p
          style={{
            ...BODY,
            color: "rgba(255,255,255,0.74)",
            marginBottom: "16px",
          }}
        >
          Build your first AI agent in 1 day with a step-by-step guide!
        </p>
        <CardButton background="var(--mr-red)">Learn more →</CardButton>
      </Link>

      {/* ── Newsletter subscribe ─────────────────────────────────── */}
      <div
        style={{
          background: "var(--mr-paper)",
          border: "1px solid var(--mr-line)",
          borderRadius: "var(--mr-radius-panel)",
          padding: "22px",
          marginBottom: "12px",
          overflow: "hidden",
        }}
      >
        <p style={{ ...DISPLAY, color: "var(--mr-ink)", marginBottom: "8px" }}>
          Subscribe to my newsletter
        </p>
        <p style={{ ...BODY, color: "var(--mr-charcoal)", marginBottom: "12px" }}>
          For high-achievers leveraging AI to build time-rich &amp; ambitious
          careers, wealth &amp; lives
        </p>
        <iframe
          src="https://mikareyes.substack.com/embed?transparent=1"
          title="Subscribe to Mika Reyes on Substack"
          width={480}
          height={150}
          frameBorder={0}
          scrolling="no"
          style={{
            display: "block",
            width: "100%",
            maxWidth: "480px",
            height: "150px",
            margin: "0 auto",
            border: 0,
            background: "transparent",
          }}
        />
      </div>

      {/* ── Secondary offer: office hours ────────────────────────── */}
      <a
        href={OFFICE_HOURS_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track({
            label: "Office hours with Mika",
            href: OFFICE_HOURS_URL,
            linkType: "office_hours",
          })
        }
        className="mr-pressable"
        style={{
          display: "block",
          background: "var(--mr-paper)",
          border: "1px solid var(--mr-line)",
          borderRadius: "var(--mr-radius-panel)",
          padding: "22px",
          textDecoration: "none",
          marginBottom: "28px",
        }}
      >
        <p
          style={{ ...DISPLAY, color: "var(--mr-charcoal)", marginBottom: "8px" }}
        >
          Office hours with Mika
        </p>
        <p style={{ ...BODY, color: "var(--mr-charcoal)", marginBottom: "16px" }}>
          Ask me anything for 30min! (${OFFICE_HOURS_PRICE})
        </p>
        <CardButton background="var(--mr-aqua)">Book a 1:1 →</CardButton>
      </a>

      {/* ── Tools & deals: horizontal swipe ──────────────────────── */}
      <section style={{ marginBottom: "28px" }}>
        <SectionHeader
          label="Tools & deals"
          href="/links"
          onSeeAll={() =>
            track({ label: "All links", href: "/links", linkType: "internal" })
          }
        />

        {/* Full-bleed on mobile so cards can bleed past the page gutter. */}
        <div
          className="bio-swipe"
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            scrollPaddingLeft: "20px",
            padding: "4px 20px 8px",
            margin: "0 -20px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {featuredLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track({
                  label: link.name,
                  href: link.href,
                  linkType: "affiliate",
                })
              }
              className="mr-lift"
              style={{
                flex: "0 0 74%",
                minWidth: 0,
                maxWidth: "250px",
                scrollSnapAlign: "start",
                background: "var(--mr-paper)",
                border: "1px solid var(--mr-line)",
                borderRadius: "var(--mr-radius-card)",
                boxShadow: "var(--mr-shadow-card)",
                padding: "16px 18px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div>
                {/* Same style as the blurb — color alone carries the hierarchy. */}
                <p style={{ ...BODY, color: "var(--mr-ink)", marginBottom: "2px" }}>
                  {link.name}
                </p>
                <p style={{ ...BODY, color: "var(--mr-muted)" }}>
                  {FEATURED_LINK_BLURBS[link.id] ?? link.description}
                </p>
              </div>
              <span style={{ ...META, color: "var(--mr-teal)" }}>
                Get the deal →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Free guides ──────────────────────────────────────────── */}
      <section style={{ marginBottom: "28px" }}>
        <SectionHeader
          label="Free AI guides"
          href="/ai"
          onSeeAll={() =>
            track({ label: "All guides", href: "/ai", linkType: "internal" })
          }
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/ai/${guide.slug}`}
              onClick={() =>
                track({
                  label: guide.title,
                  href: `/ai/${guide.slug}`,
                  linkType: "guide",
                })
              }
              className="mr-lift"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                background: "var(--mr-paper)",
                border: "1px solid var(--mr-line)",
                borderRadius: "var(--mr-radius-card)",
                padding: "14px 16px",
                textDecoration: "none",
              }}
            >
              <span style={{ ...BODY, color: "var(--mr-ink)" }}>
                {guide.title}
              </span>
              <span
                aria-hidden
                style={{ ...BODY, color: "var(--mr-teal)" }}
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "10px",
          }}
        >
          {LINK_IN_BIO_SOCIALS.map((social) => {
            const Icon = SOCIAL_ICONS[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                onClick={() =>
                  track({
                    label: social.label,
                    href: social.href,
                    linkType: "social",
                  })
                }
                className="bio-social"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--mr-radius-pill)",
                  color: "var(--mr-charcoal)",
                  textDecoration: "none",
                }}
              >
                <Icon size={22} />
              </a>
            );
          })}
        </div>
        <Link
          href="/"
          className="bio-social"
          style={{
            ...META,
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: "var(--mr-radius-pill)",
            color: "var(--mr-muted)",
            textDecoration: "none",
          }}
        >
          mikareyes.com
        </Link>
      </footer>
    </main>
  );
}
