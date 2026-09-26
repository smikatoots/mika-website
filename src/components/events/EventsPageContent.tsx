"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { trackGa4Event } from "@/lib/analytics/ga4";

import {
  ConfettiField,
  outsideEdge as outside,
  type ConfettiPlacement,
} from "@/components/ui/Confetti";

/* ────────────────────────────────────────────────────────────
   /events — the Time Rich Club sponsor page.

   Every section answers the next question a sponsor asks, in order:
   is this real (hero, collaborators), why this room (why sponsor), what
   it looks like (past events), what can I buy (formats), did it work for others
   (testimonials), who is running it (host), and the logistics (FAQ).
   The one action is "Sponsor an event", at the top and the bottom.

   Grounds run linen -> charcoal -> linen -> yellow -> linen -> green -> linen ->
   aqua, so the one dark band stays single and aqua never meets green.
   ──────────────────────────────────────────────────────────── */

const SPONSOR_HREF =
  "mailto:mika@kingscrosslabs.com?subject=" +
  encodeURIComponent("Sponsoring a Time Rich Club event");

const LUMA_HREF = "https://luma.com/timerichclub";

// `ratio` is each logo file's intrinsic width / height, so next/image gets
// the right box without a layout shift. Paper ships only its mark, so it
// carries a set wordmark beside it, same as the homepage.
const collaborators: { label: string; logo: string; h: number; ratio: number; href: string; wordmark?: boolean }[] = [
  { label: "Milled", logo: "/time-rich-club/milled.png", h: 26, ratio: 3.92, href: "https://milled.com" },
  { label: "Claude", logo: "/time-rich-club/claude.png", h: 26, ratio: 4.64, href: "https://claude.com" },
  { label: "BuildBetter", logo: "/time-rich-club/buildbetter.png", h: 34, ratio: 3.73, href: "https://buildbetter.ai" },
  { label: "Paper", logo: "/time-rich-club/paper.svg", h: 26, ratio: 1, href: "https://paper.design", wordmark: true },
];

const pastEvents = [
  {
    name: "Claude for Content Creation",
    format: "Workshop",
    date: "August 2026",
    desc: "Build AI agents for content creation workflows with Mika Reyes & TheVibeFounder. 500+ signups from founders, creators and AI builders.",
    src: "/time-rich-club/group.webp",
    alt: "A full room of founders and creators at the Claude for Content Creation workshop in New York",
    position: "center 60%",
  },
  {
    name: "AI & Marketing Roundtable",
    format: "Intimate dinner",
    date: "July 2026",
    desc: "An intimate dinner for 10 CMOs and marketing leaders, discussing the changing AI and marketing landscape.",
    src: "/time-rich-club/dinner.webp",
    alt: "CMOs and marketing leaders around one long table at the AI & Marketing Roundtable",
    position: "center 40%",
  },
];

const stats = [
  { value: "1,000+", label: "Registrations for previous workshops" },
  { value: "100+", label: "Attendees in a prior workshop" },
  { value: "40,000+", label: "Followers across socials" },
  { value: "700+", label: "Newsletter & Luma subscribers" },
];

const formats = [
  {
    name: "Workshop",
    size: "20–100+ guests",
    desc: "A hands-on build session. You get a demo slot, your tool built into the curriculum, or your logo on the takeaway site.",
  },
  {
    name: "Intimate social",
    size: "10–30 guests",
    desc: "A curated table of founders, creators and builders. You get a seat, the introductions and the conversation.",
  },
  {
    name: "Series",
    size: "3+ events",
    desc: "A recurring Time Rich Club presence, so the same community sees your brand event after event.",
  },
];

// Order matters: emerald and aqua sit too close in lightness to touch, so
// yellow always sits between them.
const testimonials = [
  {
    quote:
      "This was one of the biggest events I've ever hosted. Mika was a great collaborator the whole way through and made sure every guest left with something tangible.",
    name: "TheVibeFounder",
    role: "Creator & co-host",
    bg: "var(--mr-green)",
  },
  {
    quote:
      "I'd never planned an event for Milled before, and Mika made it easy. She curated every event around our goals, the logistics ran smoothly, and when things didn't go to plan, like the weather, her on-the-spot calls worked really well.",
    name: "Chaz Y.",
    role: "Sponsor",
    bg: "var(--mr-yellow)",
  },
  {
    quote:
      "I love how we built our own agents on the spot AND had a whole website with step-by-step instructions so we could keep going on our own. Mika was clear and made sure everyone got something out of it. I also met other founders who are now friends.",
    name: "Nick C.",
    role: "Workshop attendee",
    bg: "var(--mr-aqua)",
  },
];


const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "What does a sponsorship include?",
    answer: (
      <>
        It depends on the event and your goals, but a sponsorship typically includes:
        <ul style={{ margin: "10px 0 0", paddingLeft: "20px", listStyle: "disc" }}>
          <li>Your logo and a mention across all promotional material</li>
          <li>A mention on Mika&apos;s socials (40,000+ followers)</li>
          <li>Your product built into the curriculum, for workshops</li>
          <li>A 2–5 minute segment during the event to talk about your product</li>
        </ul>
      </>
    ),
  },
  {
    question: "What types of events do you produce?",
    answer:
      "Hands-on AI workshops for 20–100+ people, and curated socials and dinners for 10–30.",
  },
  {
    question: "Who attends these events?",
    answer: "Founders, creators, builders and growth operators in New York City.",
  },
  {
    question: "How do you work with sponsors?",
    answer:
      "We start with your goals, then recommend a format for you to sponsor or take part in.",
  },
  {
    question: "Do you run events outside New York, or online?",
    answer:
      "We're based in New York, so that's where we specialize. We also run events online.",
  },
  {
    question: "How far in advance should we reach out?",
    answer:
      "4–6 weeks before the event is ideal. That leaves time to shape the format around your goals and promote it properly.",
  },
  {
    question: "How do I attend a future event?",
    answer: (
      <>
        Follow Time Rich Club on{" "}
        <a
          href={LUMA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--mr-red-deep)", textDecoration: "underline" }}
        >
          Luma
        </a>{" "}
        to hear about new events first.
      </>
    ),
  },
];

/* ── Confetti placements ──────────────────────────────────────────────
   Same rules as the homepage: gutters only, every shape moves, and each
   narrow placement sits in a section's padding band or on the page edge. */

const HERO_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--mr-red)", size: 52, motion: "pulse", duration: 5, at: { top: "14%", left: outside(12) }, narrow: { top: "8px", left: "4%" } },
  { shape: "squiggle", color: "var(--mr-aqua)", size: 80, rotate: -10, motion: "drift", duration: 11, delay: 0.8, at: { bottom: "12%", left: outside(16) }, narrow: { bottom: "10px", left: "6%" } },
  { shape: "disc", color: "var(--mr-yellow)", size: 46, motion: "bob", duration: 7, delay: 1.2, at: { top: "30%", right: outside(14) }, narrow: { top: "8px", right: "6%" } },
];

const EVENTS_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--mr-green)", size: 84, rotate: 6, motion: "twist", duration: 8, at: { top: "10%", right: outside(12) }, narrow: { top: "8px", right: "6%" } },
  { shape: "ring", color: "var(--mr-red)", size: 50, motion: "sway", duration: 9.5, delay: 0.7, at: { bottom: "14%", left: outside(14) }, narrow: { bottom: "10px", left: "5%" } },
];

const DARK_CONFETTI: ConfettiPlacement[] = [
  { shape: "burst", color: "var(--mr-yellow)", size: 44, motion: "spin", duration: 22, at: { top: "12%", left: outside(16) }, narrow: { top: "8px", left: "5%" } },
  { shape: "capsule", color: "var(--mr-aqua)", size: 72, rotate: -18, motion: "bob", duration: 7.5, delay: 1.1, at: { bottom: "14%", right: outside(14) }, narrow: { bottom: "10px", right: "6%" } },
];

const FORMATS_CONFETTI: ConfettiPlacement[] = [
  { shape: "triangle", color: "var(--mr-red)", size: 50, rotate: 12, motion: "shake", duration: 8.5, at: { top: "16%", left: outside(14) }, narrow: { top: "8px", left: "5%" } },
];

const TESTIMONIAL_CONFETTI: ConfettiPlacement[] = [
  { shape: "blob", color: "var(--mr-green)", size: 90, rotate: 10, motion: "drift", duration: 12, at: { top: "18%", left: outside(10) }, narrow: { top: "8px", left: "4%" } },
  { shape: "cross", color: "var(--mr-red)", size: 34, motion: "spin", duration: 24, delay: 0.5, at: { bottom: "16%", right: outside(20) }, narrow: { bottom: "10px", right: "6%" } },
];

const HOST_CONFETTI: ConfettiPlacement[] = [
  { shape: "arc", color: "var(--mr-yellow)", size: 72, rotate: -8, motion: "bob", duration: 6.5, at: { top: "18%", right: outside(14) }, narrow: { top: "8px", right: "6%" } },
];

const CTA_CONFETTI: ConfettiPlacement[] = [
  { shape: "dots", color: "var(--mr-yellow)", size: 70, motion: "sway", duration: 10, at: { top: "20%", left: outside(12) }, narrow: { top: "8px", left: "5%" } },
  { shape: "sparkle", color: "var(--mr-red)", size: 48, motion: "pulse", duration: 5.5, delay: 0.9, at: { bottom: "20%", right: outside(16) }, narrow: { bottom: "10px", right: "6%" } },
];

const THREE_UP = {
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  marginTop: "36px",
} as const;

function SponsorCta({ location }: { location: string }) {
  return (
    <a
      href={SPONSOR_HREF}
      className="mr-cta mr-pressable"
      onClick={() =>
        trackGa4Event("contact_cta_click", {
          cta_label: "Sponsor an event",
          cta_location: location,
          destination_url: SPONSOR_HREF,
          link_type: "external_contact",
        })
      }
    >
      Sponsor an event →
    </a>
  );
}

function SectionHeader({ title, lead }: { title: ReactNode; lead?: ReactNode }) {
  return (
    <div style={{ maxWidth: "720px" }}>
      <h2 className="mr-heading-lg">{title}</h2>
      {lead ? (
        <p className="mr-body-lg" style={{ marginTop: "16px" }}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}

export function EventsPageContent() {
  return (
    <main className="mr-root">
      {/* ── Hero ────────────────────────────────────────── */}
      <header className="mr-section">
        <ConfettiField items={HERO_CONFETTI} />

        <div className="mr-wrap mr-hero" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <span className="mr-tag" style={{ background: "var(--mr-paper)", color: "var(--mr-ink)" }}>
              ✦ 500+ signups for a single workshop
            </span>

            <h1 className="mr-heading-lg" style={{ marginTop: "clamp(16px,3vw,28px)" }}>
              Get in front of the ambitious AI builders in New York City
            </h1>

            <p className="mr-body-lg" style={{ maxWidth: "540px", marginTop: "clamp(20px,3vw,28px)" }}>
              I host hands-on AI workshops, intimate dinners and socials in New York for
              founders, creators and growth operators.
            </p>

            <div style={{ marginTop: "32px" }}>
              <SponsorCta location="events_hero" />
            </div>
          </div>

          <figure style={{ position: "relative" }}>
            <Image
              src="/time-rich-club/workshop.webp"
              alt="Mika presenting a live Claude workshop at a Time Rich Club event"
              width={1440}
              height={1920}
              priority
              sizes="(min-width: 900px) 45vw, 100vw"
              className="mr-hero-photo"
              style={{
                width: "100%",
                objectFit: "cover",
                objectPosition: "60% center",
                borderRadius: "var(--mr-radius-card)",
              }}
            />
          </figure>
        </div>
      </header>

      {/* ── Past collaborators banner ───────────────────── */}
      <section aria-label="Past collaborators and sponsors">
        <hr className="mr-rule" />
        <div
          className="mr-wrap"
          style={{
            paddingBlock: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(24px,5vw,56px)",
          }}
        >
          <span className="mr-caption" style={{ letterSpacing: "0.04em" }}>
            Past collaborators &amp; sponsors
          </span>
          {collaborators.map(({ label, logo, h, ratio, href, wordmark }) => {
            const w = Math.round(h * ratio);
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="mr-presslogo"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Image
                  src={logo}
                  alt={label}
                  width={w}
                  height={h}
                  style={{ height: `${h}px`, width: `${w}px`, display: "block" }}
                />
                {wordmark ? (
                  <span className="mr-subheading" aria-hidden style={{ lineHeight: 1 }}>
                    {label}
                  </span>
                ) : null}
              </a>
            );
          })}
        </div>
        <hr className="mr-rule" />
      </section>

      {/* ── Why sponsor — the one dark band ─────────────── */}
      <section className="mr-dark mr-section">
        <ConfettiField items={DARK_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "780px" }}>
            <h2 className="mr-heading-lg">Why sponsor an event?</h2>
            <p className="mr-body-lg" style={{ marginTop: "20px", color: "rgba(255,255,255,0.82)" }}>
              I&apos;m a founder, creator and builder who makes AI click for a wide audience,
              and I&apos;ve done it for rooms of 100+. I&apos;ve built companies venture-backed
              and bootstrapped, so I know where you&apos;re coming from.
            </p>
          </div>

          <dl
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              marginTop: "44px",
              marginBottom: 0,
            }}
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                style={{ borderTop: "1px solid rgba(255,255,255,0.4)", paddingTop: "18px" }}
              >
                <dt
                  className="mr-heading"
                  style={{ fontSize: "clamp(36px, 5vw, var(--mr-text-stat))" }}
                >
                  {value}
                </dt>
                <dd className="mr-body" style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.78)" }}>
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Events in action ────────────────────────────── */}
      <section className="mr-section">
        <ConfettiField items={EVENTS_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeader
            title="Events in action"
            lead="Curated events designed to achieve your company's goal."
          />

          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
              marginTop: "36px",
            }}
          >
            {pastEvents.map(({ name, format, date, desc, src, alt, position }) => (
              <article key={name} className="mr-card mr-card-paper" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "16 / 10", background: "var(--mr-line)" }}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(min-width: 800px) 560px, 100vw"
                    style={{ objectFit: "cover", objectPosition: position }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    <span className="mr-tag" style={{ background: "var(--mr-yellow)" }}>
                      {format}
                    </span>
                    <span className="mr-tag" style={{ background: "var(--mr-line)" }}>
                      {date}
                    </span>
                  </div>
                  <h3 className="mr-subheading" style={{ marginTop: "16px" }}>
                    {name}
                  </h3>
                  <p className="mr-body" style={{ marginTop: "10px", color: "var(--mr-charcoal)" }}>
                    {desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formats ─────────────────────────────────────── */}
      <section className="mr-section" style={{ background: "var(--mr-yellow)" }}>
        <ConfettiField items={FORMATS_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeader title="Ways to partner" />

          <div style={THREE_UP}>
            {formats.map(({ name, size, desc }) => (
              <div key={name} className="mr-card mr-card-paper">
                <span className="mr-caption" style={{ letterSpacing: "0.04em" }}>
                  {size}
                </span>
                <h3 className="mr-subheading" style={{ marginTop: "12px" }}>
                  {name}
                </h3>
                <p className="mr-body" style={{ marginTop: "10px", color: "var(--mr-charcoal)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────── */}
      <section className="mr-section">
        <ConfettiField items={TESTIMONIAL_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1 }}>
          <SectionHeader title="What people say" />

          <div style={THREE_UP}>
            {testimonials.map(({ quote, name, role, bg }) => (
              <figure
                key={name}
                className="mr-card"
                style={{
                  background: bg,
                  color: "var(--mr-ink)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "24px",
                }}
              >
                <blockquote className="mr-body" style={{ margin: 0 }}>
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption>
                  <p className="mr-subheading" style={{ fontSize: "20px" }}>
                    {name}
                  </p>
                  <p className="mr-caption" style={{ marginTop: "6px", letterSpacing: "0.04em" }}>
                    {role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Your host ───────────────────────────────────── */}
      <section className="mr-section mr-press-band">
        <ConfettiField items={HOST_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1 }}>
          <div className="mr-split">
            <Image
              src="/about-assets/005.jpg"
              alt="Mika Reyes speaking"
              width={520}
              height={650}
              unoptimized
              style={{
                width: "100%",
                maxWidth: "380px",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "72% center",
                borderRadius: "var(--mr-radius-card)",
              }}
            />

            <div>
              <h2 className="mr-heading-lg">Your host!</h2>
              <p className="mr-body-lg" style={{ marginTop: "16px", maxWidth: "520px" }}>
                Hi! I&apos;m Mika: creator, founder, educator &amp; event host!
              </p>
              <p className="mr-body" style={{ marginTop: "16px", maxWidth: "520px" }}>
                I&apos;ve always been &ldquo;the party host&rdquo; among my friends &amp; family,
                planning games, murder mysteries, karaoke nights and not-your-typical party
                activities. I have a knack for reading the room, and I get giddy with excitement
                when people have a good time.
              </p>
              <p className="mr-body" style={{ marginTop: "16px", maxWidth: "520px" }}>
                I&apos;m also a teacher at heart, always showing my friends &amp; family tech and
                AI things. I taught 2 for-credit classes in college, and now I teach AI to my
                40,000+ followers.
              </p>
              <p className="mr-body-lg" style={{ marginTop: "16px", maxWidth: "520px" }}>
                So of course, I turned all of that into a business!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="mr-section">
        <div className="mr-wrap" style={{ maxWidth: "820px" }}>
          <h2 className="mr-heading-lg">FAQ</h2>
          <dl style={{ marginTop: "32px", marginBottom: 0 }}>
            {faqs.map(({ question, answer }, i) => (
              <div
                key={question}
                style={{
                  borderTop: "1px solid var(--mr-ink)",
                  borderBottom: i === faqs.length - 1 ? "1px solid var(--mr-ink)" : undefined,
                  paddingBlock: "20px",
                }}
              >
                <dt className="mr-subheading" style={{ fontSize: "clamp(20px, 2.6vw, 24px)" }}>
                  {question}
                </dt>
                <dd className="mr-body" style={{ margin: "10px 0 0", color: "var(--mr-charcoal)" }}>
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Closing CTA ─────────────────────────────────── */}
      <section className="mr-section" style={{ background: "var(--mr-aqua)" }}>
        <ConfettiField items={CTA_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 className="mr-heading-lg">Let&apos;s work together!</h2>
          <div style={{ marginTop: "28px" }}>
            <SponsorCta location="events_footer" />
          </div>
        </div>
      </section>
    </main>
  );
}
