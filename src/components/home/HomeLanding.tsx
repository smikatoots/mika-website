"use client";

import Image from "next/image";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";
import { homeBioLinks } from "@/lib/home-bio-links";

const stats = [
  { value: "25K+", label: "Community" },
  { value: "~$5M+", label: "Raised" },
  { value: "4", label: "Recognitions" },
];

const awards = [
  { icon: "🏆", label: "Forbes 30 Under 30", href: homeBioLinks.awards.forbes30 },
  { icon: "✦", label: "Tatler Gen.T Leader of Tomorrow", href: homeBioLinks.awards.tatler },
  { icon: "🌱", label: "Kleiner Perkins Fellow", href: homeBioLinks.awards.kleinerPerkins },
  { icon: "🚀", label: "SPC Founder Fellow", href: homeBioLinks.awards.spc },
];

const pressItems = [
  { label: "Forbes", href: homeBioLinks.press.forbes },
  { label: "TechCrunch", href: homeBioLinks.press.techcrunch },
  { label: "Yahoo!", href: homeBioLinks.press.yahoo },
  { label: "Tech in Asia", href: homeBioLinks.press.techInAsia },
  { label: "Inquirer", href: homeBioLinks.press.inquirer },
];

const featuredPress = [
  {
    outlet: "Forbes",
    title: "Forbes 30 Under 30: Finance & Venture Capital",
    type: "READ",
    href: "/press/forbes-30-under-30-finance-venture-capital-forbes",
  },
  {
    outlet: "TechCrunch",
    title: "Parallax on TechCrunch",
    type: "READ",
    href: "/press/parallax-on-techcrunch",
  },
  {
    outlet: "Yahoo! Finance",
    title: "Parallax Launch Coverage",
    type: "READ",
    href: "/press/parallax-launch-on-yahoo",
  },
  {
    outlet: "Kleiner Perkins",
    title: "Meet the Kleiner Perkins Fellows",
    type: "READ",
    href: "/press/meet-the-kleiner-perkins-fellows",
  },
];

const speakingTopics = [
  { num: "01", title: "AI foundations for non-technical founders & professionals" },
  { num: "02", title: "Content, growth & marketing systems with AI" },
  { num: "03", title: "Career strategy in the age of AI" },
];

const contactTypes = [
  { num: "01", title: "Brand partnerships", desc: "Sponsorships, integrations, ongoing partnerships.", subject: "Brand partnership inquiry" },
  { num: "02", title: "Press", desc: "Quotes, interviews, podcast guesting.", subject: "Press inquiry" },
  { num: "03", title: "Speaking", desc: "Conferences, company off-sites, universities, panels, podcasts.", subject: "Speaking inquiry" },
  { num: "04", title: "AI Workshop", desc: "Classes, tutorials and workshops about AI.", subject: "AI Workshop inquiry" },
];

const eyebrow = (color: string): React.CSSProperties => ({
  display: "inline-block",
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-eyebrow)",
  fontWeight: "var(--mr-weight-display)",
  color,
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  marginBottom: "16px",
});

export function HomeLanding() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section style={{ background: "var(--mr-bg)", padding: "clamp(48px,8vw,80px) 0", overflow: "hidden" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10 flex flex-col md:flex-row md:items-center gap-10 md:gap-12">
          {/* Text */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--mr-surface-rose-2)",
                color: "var(--mr-coral)",
                padding: "7px 16px",
                borderRadius: "var(--mr-radius-pill)",
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-xs)",
                fontWeight: "var(--mr-weight-display)",
                marginBottom: "28px",
              }}
            >
              ✦ AI Educator · Founder · Creator
            </span>

            <h1
              style={{
                fontFamily: "var(--mr-font-display)",
                fontSize: "clamp(42px, 6vw, 72px)",
                fontWeight: "var(--mr-weight-display)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "var(--mr-ink)",
                marginBottom: "20px",
              }}
            >
              Mika Reyes
            </h1>

            <p
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "clamp(16px, 2vw, var(--mr-text-lead))",
                color: "var(--mr-text-soft)",
                lineHeight: 1.55,
                marginBottom: "36px",
                maxWidth: "520px",
              }}
            >
              I teach ambitious, non-technical founders and professionals how to use AI to get ahead in their careers, get time back, and stay relevant in the AI age.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="mr-pressable"
                onClick={() =>
                  trackGa4Event("contact_cta_click", {
                    cta_label: "Work with me",
                    cta_location: "hero",
                    destination_url: "#contact",
                    link_type: "internal_anchor",
                  })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--mr-coral)",
                  color: "#fff",
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  fontWeight: "var(--mr-weight-semi)",
                  padding: "16px 30px",
                  borderRadius: "var(--mr-radius-pill)",
                  boxShadow: "var(--mr-shadow-cta)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Work with me →
              </a>

              <a
                href="https://instagram.com/its.mikareyes"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-pressable"
                onClick={() =>
                  trackGa4Event("social_cta_click", {
                    cta_label: "Follow on Instagram",
                    cta_location: "hero",
                    destination_url: "https://instagram.com/its.mikareyes",
                    link_type: "social_instagram",
                  })
                }
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--mr-surface)",
                  color: "var(--mr-ink)",
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  fontWeight: "var(--mr-weight-semi)",
                  padding: "15px 26px",
                  borderRadius: "var(--mr-radius-pill)",
                  border: "1.5px solid var(--mr-border-input)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Follow on Instagram
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="hidden md:block" style={{ position: "relative", flexShrink: 0 }}>
            <div className="mr-float-slow" style={{ position: "relative", zIndex: 1 }}>
              <Image
                src="/about-assets/009.jpg"
                alt="Mika Reyes"
                width={340}
                height={420}
                priority
                unoptimized
                style={{
                  borderRadius: "28px",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  boxShadow: "var(--mr-shadow-frame)",
                  display: "block",
                  width: "340px",
                  height: "420px",
                }}
              />
            </div>
            <div
              className="mr-drift"
              style={{
                position: "absolute", top: "-20px", right: "-24px",
                width: "80px", height: "80px", borderRadius: "50%",
                background: "var(--mr-coral)", opacity: 0.12, zIndex: 0,
              }}
            />
            <div
              style={{
                position: "absolute", bottom: "-16px", left: "-20px",
                width: "48px", height: "48px", borderRadius: "50%",
                background: "var(--mr-teal)", opacity: 0.18, zIndex: 0,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Press Bar ────────────────────────────────────── */}
      <section style={{ background: "var(--mr-surface-warm)", borderTop: "1px solid var(--mr-border-warm)", borderBottom: "1px solid var(--mr-border-warm)", padding: "36px 0" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p
            className="mb-6 text-center"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-eyebrow)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
            {pressItems.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("/") ? undefined : "_blank"}
                rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                onClick={() =>
                  trackGa4Event("press_reference_click", {
                    cta_label: label,
                    cta_location: "press_bar",
                    destination_url: href,
                    link_type: "external_press",
                  })
                }
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "17px",
                  fontWeight: "var(--mr-weight-heavy)",
                  color: "var(--mr-muted)",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                }}
                className="hover:text-[var(--mr-ink)] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat Band ────────────────────────────────────── */}
      <section style={{ background: "var(--mr-coral)", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />
        {/* 2-col on mobile, 4-col on md+ */}
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-14 grid grid-cols-3 gap-6 relative">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(28px, 5vw, var(--mr-text-stat))",
                  fontWeight: "var(--mr-weight-display)",
                  color: "#fff",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                  color: "#FBD7DC",
                  marginTop: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: "var(--mr-weight-semi)",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MY WORK ──────────────────────────────────────── */}
      <section style={{ background: "var(--mr-bg)", padding: "clamp(56px,8vw,80px) 0" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* Header row: headline left, LinkedIn CTA right */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <span style={eyebrow("var(--mr-coral)")}>My Work</span>
              <h2
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(28px, 4vw, var(--mr-text-h2))",
                  fontWeight: "var(--mr-weight-display)",
                  color: "var(--mr-ink)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                What I do.
              </h2>
            </div>
            <a
              href={homeBioLinks.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-pressable"
              onClick={() =>
                trackGa4Event("social_cta_click", {
                  cta_label: "Connect on LinkedIn",
                  cta_location: "my_work_section",
                  destination_url: homeBioLinks.linkedinProfile,
                  link_type: "social_linkedin",
                })
              }
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "var(--mr-surface)",
                color: "var(--mr-ink)",
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-sm)",
                fontWeight: "var(--mr-weight-semi)",
                padding: "12px 22px",
                borderRadius: "var(--mr-radius-pill)",
                border: "1.5px solid var(--mr-border-input)",
                textDecoration: "none",
                flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              Connect on LinkedIn →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Now card */}
            <div
              className="mr-lift"
              style={{
                background: "var(--mr-surface-rose)",
                border: "1px solid var(--mr-border-rose)",
                borderRadius: "var(--mr-radius-card)",
                padding: "clamp(24px,4vw,32px)",
              }}
            >
              <span style={eyebrow("var(--mr-coral)")}>Now</span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "AI product studio & consulting for growth & marketing teams",
                  "Teaching AI to 25K+ founders & professionals on Instagram & TikTok",
                  "1:1 AI & career office hours & coaching",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      color: "var(--mr-text-soft)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--mr-coral)", flexShrink: 0, marginTop: "2px" }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prior card */}
            <div
              className="mr-lift"
              style={{
                background: "var(--mr-surface-cream)",
                border: "1px solid var(--mr-border-cream)",
                borderRadius: "var(--mr-radius-card)",
                padding: "clamp(24px,4vw,32px)",
              }}
            >
              <span style={eyebrow("var(--mr-teal)")}>Prior</span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  "Founded Parallax · Raised ~$5M from Dragonfly & GC · Acquired by Phantom ($3B valuation)",
                  'Product @ LinkedIn (launched "I\'m Hiring" feature ring)',
                  "Founded Filipinos @ LinkedIn · Women in Product exec",
                  "Earlier: Kumu.ph, MedGrocer, Ripcord (via KP Fellowship)",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      color: "var(--mr-text-soft)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: "var(--mr-teal)", flexShrink: 0, marginTop: "2px" }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Awards ───────────────────────────────────────── */}
      <section style={{ background: "var(--mr-surface-sand)", padding: "clamp(48px,6vw,64px) 0" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <p
            className="mb-8 text-center"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-eyebrow)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            Awards & Fellowships
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {awards.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("/") ? undefined : "_blank"}
                rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                className="mr-lift"
                onClick={() =>
                  trackGa4Event("award_reference_click", {
                    cta_label: label,
                    cta_location: "awards_band",
                    destination_url: href,
                    link_type: "external_award",
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "var(--mr-surface)",
                  border: "1px solid #EFE0CF",
                  borderRadius: "var(--mr-radius-chip)",
                  padding: "13px 18px",
                  boxShadow: "var(--mr-shadow-card)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <span style={{ fontSize: "18px", lineHeight: 1 }}>{icon}</span>
                <span
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    fontWeight: "var(--mr-weight-semi)",
                    color: "var(--mr-ink)",
                  }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKING ─────────────────────────────────────── */}
      <section style={{ background: "var(--mr-teal-deep)", overflow: "hidden" }}>
        {/* On mobile: stacked. On md+: photo left (380px), content right */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-[380px_1fr]">
          {/* Left: photo */}
          <div
            className="hidden md:block"
            style={{ position: "relative", overflow: "hidden", minHeight: "420px" }}
          >
            <Image
              src="/about-assets/005.jpg"
              alt="Mika Reyes"
              fill
              unoptimized
              style={{ objectFit: "cover", objectPosition: "72% center", opacity: 0.9 }}
              sizes="380px"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, transparent 55%, var(--mr-teal-deep) 100%)",
              }}
            />
          </div>

          {/* Right: content */}
          <div className="px-6 md:px-0" style={{ padding: "clamp(40px,6vw,64px) clamp(28px,4vw,56px)" }}>
            <span style={eyebrow("var(--mr-coral)")}>Speaking</span>

            <h2
              style={{
                fontFamily: "var(--mr-font-display)",
                fontSize: "clamp(26px, 3.2vw, 40px)",
                fontWeight: "var(--mr-weight-display)",
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              Talks, panels,{" "}
              <br />
              <span style={{ color: "var(--mr-coral)", fontStyle: "italic" }}>and workshops.</span>
            </h2>

            <p
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-sm)",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.6,
                marginBottom: "32px",
                maxWidth: "420px",
              }}
            >
              I speak about AI for non-technical audiences — founders, professionals, and teams who want practical tools, not hype.
            </p>

            <div>
              {speakingTopics.map(({ num, title }, i) => (
                <div
                  key={num}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    paddingTop: "18px",
                    paddingBottom: "18px",
                    borderBottom: i === speakingTopics.length - 1 ? "1px solid rgba(255,255,255,0.1)" : undefined,
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-xs)",
                      fontWeight: "var(--mr-weight-display)",
                      color: "var(--mr-coral)",
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                      width: "24px",
                    }}
                  >
                    {num}
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--mr-font-display)",
                      fontSize: "var(--mr-text-sm)",
                      fontWeight: "var(--mr-weight-display)",
                      color: "#fff",
                      lineHeight: 1.3,
                      margin: 0,
                    }}
                  >
                    {title}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "32px" }}>
              <a
                href="#contact"
                className="mr-pressable"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "var(--mr-coral)",
                  color: "#fff",
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-sm)",
                  fontWeight: "var(--mr-weight-semi)",
                  padding: "14px 26px",
                  borderRadius: "var(--mr-radius-pill)",
                  boxShadow: "var(--mr-shadow-cta)",
                  textDecoration: "none",
                }}
              >
                Book me to speak →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS PREVIEW ────────────────────────────────── */}
      <section style={{ background: "var(--mr-bg)", padding: "clamp(56px,8vw,80px) 0" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* Header row */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span style={eyebrow("var(--mr-muted)")}>Press</span>
              <h2
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  fontWeight: "var(--mr-weight-display)",
                  color: "var(--mr-ink)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Coverage{" "}
                <span style={{ fontStyle: "italic", color: "var(--mr-teal)" }}>in the media.</span>
              </h2>
            </div>
            <a
              href="/press"
              className="mr-pressable"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "var(--mr-surface)",
                border: "1.5px solid var(--mr-border-input)",
                borderRadius: "var(--mr-radius-pill)",
                padding: "10px 20px",
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-xs)",
                fontWeight: "var(--mr-weight-display)",
                color: "var(--mr-ink)",
                textDecoration: "none",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              See all press →
            </a>
          </div>

          {/* Table — 3 cols on mobile (no date), 4 cols on md+ */}
          <div style={{ borderTop: "1.5px solid var(--mr-border)" }}>
            {featuredPress.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="group"
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1fr 72px",
                  gap: "0 12px",
                  alignItems: "center",
                  padding: "18px 16px",
                  borderBottom: "1px solid var(--mr-border)",
                  textDecoration: "none",
                  background: i % 2 === 1 ? "var(--mr-surface-cream)" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-xs)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    lineHeight: 1.3,
                  }}
                >
                  {item.outlet}
                </span>
                <span
                  className="group-hover:text-[var(--mr-teal)] transition-colors"
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-sm)",
                    fontWeight: "var(--mr-weight-semi)",
                    color: "var(--mr-ink)",
                    lineHeight: 1.35,
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-xs)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-teal)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    textAlign: "right",
                  }}
                >
                  {item.type} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section id="contact" style={{ background: "var(--mr-teal-deep)", padding: "clamp(56px,8vw,80px) 0" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          {/* 2-col on md+: left = header + email card, right = categories. Stacked on mobile. */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">

            {/* Left: header + email card */}
            <div>
              <span style={eyebrow("var(--mr-coral)")}>Contact</span>
              <h2
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(30px, 4vw, 48px)",
                  fontWeight: "var(--mr-weight-display)",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginBottom: "12px",
                }}
              >
                Let&apos;s{" "}
                <span style={{ fontStyle: "italic", color: "var(--mr-coral)" }}>work together.</span>
              </h2>
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.55,
                  marginBottom: "32px",
                }}
              >
                For brand partnerships, press, speaking, and AI workshops.
              </p>

              {/* Email card */}
              <div
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "var(--mr-radius-panel)",
                  padding: "clamp(24px,4vw,36px)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-xs)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-coral)",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    marginBottom: "10px",
                  }}
                >
                  Reach out directly
                </p>
                <p
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "clamp(17px, 2vw, 22px)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "#fff",
                    lineHeight: 1.2,
                    marginBottom: "8px",
                  }}
                >
                  mika@kingscrosslabs.com
                </p>
                <p
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                  }}
                >
                  Choose a category for a pre-filled message. Or just email me directly.
                </p>
                <a
                  href="mailto:mika@kingscrosslabs.com"
                  className="mr-pressable"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "var(--mr-coral)",
                    color: "#fff",
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    fontWeight: "var(--mr-weight-semi)",
                    padding: "13px 26px",
                    borderRadius: "var(--mr-radius-pill)",
                    textDecoration: "none",
                    boxShadow: "var(--mr-shadow-cta)",
                  }}
                >
                  Send an email →
                </a>

              </div>
            </div>

            {/* Right: category list — each row is a mailto: link */}
            <div style={{ paddingTop: "4px" }}>
              {contactTypes.map(({ num, title, desc, subject }, i) => (
                <a
                  key={num}
                  href={`mailto:mika@kingscrosslabs.com?subject=${encodeURIComponent(subject)}`}
                  className="group block"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    borderBottom: i === contactTypes.length - 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-xs)",
                      fontWeight: "var(--mr-weight-display)",
                      color: "var(--mr-coral)",
                      letterSpacing: "0.08em",
                      flexShrink: 0,
                      marginTop: "2px",
                      width: "24px",
                    }}
                  >
                    {num}
                  </span>
                  <div style={{ flex: 1 }}>
                    <p
                      className="group-hover:text-[var(--mr-coral)] transition-colors"
                      style={{
                        fontFamily: "var(--mr-font-display)",
                        fontSize: "var(--mr-text-sm)",
                        fontWeight: "var(--mr-weight-display)",
                        color: "#fff",
                        lineHeight: 1.25,
                        marginBottom: "5px",
                      }}
                    >
                      {title}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--mr-font-body)",
                        fontSize: "var(--mr-text-xs)",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.55,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                  <span
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--mr-coral)", fontSize: "var(--mr-text-sm)", flexShrink: 0, alignSelf: "center" }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
