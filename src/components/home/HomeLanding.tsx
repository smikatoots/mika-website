"use client";

import Image from "next/image";
import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";
import { homeBioLinks } from "@/lib/home-bio-links";
import { MyStoryTimeline } from "@/components/home/MyStoryTimeline";

const awards = [
  { icon: "🏆", label: "Forbes 30 Under 30", href: homeBioLinks.awards.forbes30 },
  { icon: "✦", label: "Tatler Gen.T Leader of Tomorrow", href: homeBioLinks.awards.tatler },
  { icon: "🌱", label: "Kleiner Perkins Fellow", href: homeBioLinks.awards.kleinerPerkins },
  { icon: "🚀", label: "SPC Founder Fellow", href: homeBioLinks.awards.spc },
];

const pressItems = [
  { label: "Forbes", href: homeBioLinks.press.forbes, logo: "/press-logos/forbes.svg", logoHeight: 20 },
  { label: "TechCrunch", href: homeBioLinks.press.techcrunch, logo: "/press-logos/techcrunch-icon.svg", logoHeight: 28 },
  { label: "Yahoo!", href: homeBioLinks.press.yahoo, logo: "/press-logos/yahoo.svg", logoHeight: 22 },
  { label: "Tech in Asia", href: homeBioLinks.press.techInAsia, logo: "/press-logos/tech-in-asia.png", logoHeight: 24, logoMaxWidth: 180 },
  { label: "Rappler", href: homeBioLinks.press.rappler, logo: "/press-logos/rappler.png", logoHeight: 28, logoMaxWidth: 140 },
  { label: "Inquirer", href: homeBioLinks.press.inquirer, logo: "/press-logos/inquirer.svg", logoHeight: 18 },
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
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 text-center md:flex-row md:items-center md:gap-12 md:px-10 md:text-left">
          {/* Text */}
          <div className="flex w-full flex-col items-center md:items-start" style={{ flex: "1 1 0", minWidth: 0 }}>
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
              className="mx-auto md:mx-0"
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

            <div className="flex w-full flex-wrap items-center justify-center gap-3 md:justify-start">
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
          <div
            className="-mx-6 w-[calc(100%+3rem)] md:mx-0 md:w-auto"
            style={{ position: "relative", flexShrink: 0 }}
          >
            <div className="mr-float-slow" style={{ position: "relative", zIndex: 1 }}>
              <Image
                src="/about-assets/009.jpg"
                alt="Mika Reyes"
                width={340}
                height={420}
                priority
                unoptimized
                className="aspect-[4/5] w-full md:aspect-auto md:h-[420px] md:w-[340px] md:rounded-[var(--mr-radius-card)]"
                style={{
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  boxShadow: "var(--mr-shadow-frame)",
                  display: "block",
                }}
                sizes="(max-width: 768px) 100vw, 340px"
              />
            </div>
            <div
              className="mr-drift hidden md:block"
              style={{
                position: "absolute", top: "-20px", right: "-24px",
                width: "80px", height: "80px", borderRadius: "50%",
                background: "var(--mr-coral)", opacity: 0.12, zIndex: 0,
              }}
            />
            <div
              className="hidden md:block"
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
      <section style={{ background: "var(--mr-coral)", position: "relative", overflow: "hidden", padding: "36px 0" }}>
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <p
            className="mb-8 text-center"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-eyebrow)",
              fontWeight: "var(--mr-weight-display)",
              color: "#FBD7DC",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
            }}
          >
            Featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {pressItems.map(({ label, href, logo, logoHeight, logoMaxWidth }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("/") ? undefined : "_blank"}
                rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
                aria-label={label}
                onClick={() =>
                  trackGa4Event("press_reference_click", {
                    cta_label: label,
                    cta_location: "press_bar",
                    destination_url: href,
                    link_type: "external_press",
                  })
                }
                className="group transition-opacity hover:opacity-100"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  opacity: 0.8,
                  textDecoration: "none",
                }}
              >
                <Image
                  src={logo}
                  alt={label}
                  width={140}
                  height={logoHeight}
                  unoptimized
                  style={{
                    height: `${logoHeight}px`,
                    width: "auto",
                    maxWidth: `${logoMaxWidth ?? 140}px`,
                    filter: "grayscale(100%) brightness(0) invert(1)",
                  }}
                  className="transition-[filter] group-hover:brightness-[1.1]"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MY STORY ─────────────────────────────────────── */}
      <section style={{ background: "var(--mr-bg)", padding: "clamp(56px,8vw,80px) 0" }}>
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-10 md:mb-12">
            <div>
              <span style={eyebrow("var(--mr-coral)")}>My Story</span>
              <h2
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(28px, 4vw, var(--mr-text-h2))",
                  fontWeight: "var(--mr-weight-display)",
                  color: "var(--mr-ink)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  margin: "0 0 16px",
                }}
              >
                Building ambitious, time-rich lives with AI
              </h2>
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-lead)",
                  color: "var(--mr-text-soft)",
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: "560px",
                }}
              >
                I&apos;m using AI to rebuild on my own terms and help high-achieving, non-technical professionals stop trading freedom for ambition.
              </p>
            </div>
            <a
              href={homeBioLinks.linkedinProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-pressable"
              onClick={() =>
                trackGa4Event("social_cta_click", {
                  cta_label: "Connect on LinkedIn",
                  cta_location: "my_story_section",
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

          <MyStoryTimeline />
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
                background:
                  "linear-gradient(to right, var(--mr-teal-deep) 0%, transparent 22%, transparent 55%, var(--mr-teal-deep) 100%)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[32%]"
              style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                maskImage: "linear-gradient(to right, black 0%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 100%)",
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
