import Image from "next/image";
import Link from "next/link";

import { homeBioLinks } from "@/lib/home-bio-links";

import {
  ConfettiField,
  insideEdge as inside,
  outsideEdge as outside,
  type ConfettiPlacement,
} from "@/components/ui/Confetti";

/* ────────────────────────────────────────────────────────────
   The mikareyes.com landing page — "designer scrapbook desk".

   Sections run light -> charcoal -> light, one dark band only. The
   confetti layer lives in the gutters; see DESIGN.md for the rules it
   follows and `Confetti.tsx` for why placements come in pairs.
   ──────────────────────────────────────────────────────────── */

// Destinations come from the live homepage's link map, same as the press
// strip. Every fill here clears AA with black type, turquoise included at
// 5.09:1 — so the pills all set ink.
const awards = [
  { label: "Forbes 30 Under 30", bg: "var(--mr-sun-yellow)", href: homeBioLinks.awards.forbes30 },
  { label: "Tatler Gen.T Leader of Tomorrow", bg: "var(--mr-teal)", href: homeBioLinks.awards.tatler },
  { label: "Kleiner Perkins Fellow", bg: "var(--mr-lime)", href: homeBioLinks.awards.kleinerPerkins },
  { label: "SPC Founder Fellow", bg: "var(--mr-coral-soft)", href: homeBioLinks.awards.spc },
];

// Destinations come from the live homepage's link map, so the prototype
// points at the same coverage rather than a second copy that can drift.
const pressLogos = [
  { label: "Forbes", logo: "/press-logos/forbes.svg", h: 20, href: homeBioLinks.press.forbes },
  { label: "TechCrunch", logo: "/press-logos/techcrunch-icon.svg", h: 26, href: homeBioLinks.press.techcrunch },
  { label: "Yahoo!", logo: "/press-logos/yahoo.svg", h: 22, href: homeBioLinks.press.yahoo },
  { label: "Tech in Asia", logo: "/press-logos/tech-in-asia.png", h: 22, href: homeBioLinks.press.techInAsia },
  { label: "Rappler", logo: "/press-logos/rappler.png", h: 26, href: homeBioLinks.press.rappler },
  { label: "Inquirer", logo: "/press-logos/inquirer.svg", h: 18, href: homeBioLinks.press.inquirer },
];

const startHere = [
  {
    tag: "Course",
    title: "Master Agentic AI",
    blurb: "Build your own custom AI agent in a day. No engineering degree.",
    href: "/build-your-first-agent-101",
    bg: "var(--mr-lime)",
  },
  {
    tag: "Free",
    title: "AI Guides",
    blurb: "Practical how-tos pulled straight from the videos.",
    href: "/ai",
    bg: "var(--mr-sun-yellow)",
  },
  {
    tag: "Series",
    title: "AI Challenges",
    blurb: "Hard skills learned with AI as the only coach.",
    href: "/challenges",
    bg: "var(--mr-periwinkle)",
  },
  {
    tag: "Writing",
    title: "The Blog",
    blurb: "Longer thinking on building small, staying time-rich.",
    href: "/blog",
    bg: "var(--mr-coral-soft)",
  },
];

const speakingTopics = [
  { num: "01", title: "AI foundations for non-technical founders & professionals" },
  { num: "02", title: "Content, growth & marketing systems with AI" },
  { num: "03", title: "Career strategy in the age of AI" },
];

const featuredPress = [
  {
    outlet: "Forbes",
    title: "Forbes 30 Under 30: Finance & Venture Capital",
    href: "/press/forbes-30-under-30-finance-venture-capital-forbes",
  },
  {
    outlet: "TechCrunch",
    title: "Parallax on TechCrunch",
    href: "/press/parallax-on-techcrunch",
  },
  {
    outlet: "Yahoo! Finance",
    title: "Parallax Launch Coverage",
    href: "/press/parallax-launch-on-yahoo",
  },
  {
    outlet: "Kleiner Perkins",
    title: "Meet the Kleiner Perkins Fellows",
    href: "/press/meet-the-kleiner-perkins-fellows",
  },
];

const contactTypes = [
  { num: "01", title: "Brand partnerships", desc: "Sponsorships, integrations, ongoing partnerships." },
  { num: "02", title: "Press", desc: "Quotes, interviews, podcast guesting." },
  { num: "03", title: "Speaking", desc: "Conferences, off-sites, universities, panels." },
  { num: "04", title: "AI workshops", desc: "Classes, tutorials and team training." },
];

/* ── Confetti placements ──────────────────────────────────────────────
   One entry per shape. `at` is the wide placement; `narrow` takes over
   below 1200px and goes where a compressed layout actually has room —
   hugging the page edge inside the 24px wrap padding, or inside a
   section's vertical padding band, which is empty across the width.
   Nothing is switched off when the layout narrows, and nothing is
   static. Durations are deliberately coprime-ish so the field never
   falls into step. */

const HERO_PHOTO_CONFETTI: ConfettiPlacement[] = [
  // Salmon carries the buttons now, so the big masses beside the CTA are
  // yellow and turquoise — a salmon blob here would pull rank on it.
  { shape: "disc", color: "var(--mr-sun-yellow)", size: 104, motion: "bob", duration: 5.5, at: { top: "-38px", left: "-38px" } },
  { shape: "triangle", color: "var(--mr-lime)", size: 66, rotate: 18, motion: "sway", duration: 7.5, delay: 0.6, at: { bottom: "-30px", right: "34px" } },
  { shape: "capsule", color: "var(--mr-teal)", size: 78, rotate: 12, motion: "twist", duration: 6.5, delay: 1.1, at: { top: "-30px", right: "-26px" } },
];

const HERO_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--mr-coral)", size: 44, motion: "bob", duration: 5, at: { top: "12%", left: inside(30) }, narrow: { top: "8px", left: "8%" } },
  { shape: "squiggle", color: "var(--mr-lime)", size: 96, rotate: 6, motion: "drift", duration: 11, delay: 0.5, at: { top: "38%", right: inside(16) }, narrow: { bottom: "6px", left: "8%" } },
  { shape: "zigzag", color: "var(--mr-periwinkle)", size: 92, rotate: -8, motion: "twist", duration: 8, delay: 1.1, at: { top: "62%", left: inside(14) }, narrow: { top: "62%", left: "-40px" } },
  { shape: "dots", color: "var(--mr-coral-soft)", size: 64, rotate: -12, motion: "shake", duration: 6, delay: 0.3, at: { top: "85%", right: inside(26) }, narrow: { bottom: "10px", right: "6%" } },
];

const PRESS_STRIP_CONFETTI: ConfettiPlacement[] = [
  { shape: "dots", color: "var(--mr-teal)", size: 46, motion: "shake", duration: 7, at: { top: "38%", right: outside(16) }, narrow: { top: "34%", right: "-8px" } },
];

const DARK_CONFETTI: ConfettiPlacement[] = [
  // The headline column stops at 820px, so there is room inside the wrap here
  // that the card-grid sections do not have.
  { shape: "disc", color: "var(--mr-sun-yellow)", size: 110, motion: "bob", duration: 6, at: { top: "10%", left: inside(18) }, narrow: { top: "1%", left: "-48px" } },
  { shape: "triangle", color: "var(--mr-coral)", size: 72, rotate: -14, motion: "twist", duration: 8.5, delay: 0.7, at: { top: "30%", right: inside(30) }, narrow: { top: "22%", right: "-27px" } },
  { shape: "arc", color: "var(--mr-coral-soft)", size: 78, rotate: -18, motion: "sway", duration: 9.5, delay: 1.4, at: { top: "52%", left: inside(26) }, narrow: { bottom: "12px", right: "8%" } },
  { shape: "blob", color: "var(--mr-periwinkle)", size: 132, rotate: -8, motion: "drift", duration: 12, delay: 0.2, at: { top: "70%", right: inside(14) }, narrow: { top: "70%", right: "-64px" } },
  { shape: "ring", color: "var(--mr-lime)", size: 52, motion: "pulse", duration: 6.5, delay: 1.9, at: { bottom: "6%", left: inside(70) }, narrow: { bottom: "10px", left: "8%" } },
];

const PRESS_AWARDS_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--mr-sun-yellow)", size: 38, motion: "spin", duration: 18, at: { top: "14%", left: outside(14) }, narrow: { top: "6px", left: "4%" } },
  { shape: "squiggle", color: "var(--mr-periwinkle)", size: 80, rotate: -10, motion: "drift", duration: 10.5, delay: 0.8, at: { top: "52%", right: outside(12) }, narrow: { bottom: "12px", right: "8%" } },
  { shape: "dots", color: "var(--mr-lime)", size: 54, rotate: 8, motion: "shake", duration: 6.5, delay: 1.4, at: { top: "86%", left: outside(20) }, narrow: { top: "6px", right: "6%" } },
];

const ADVENTURE_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--mr-lime)", size: 84, rotate: 6, motion: "twist", duration: 7, at: { top: "8%", left: outside(12) }, narrow: { top: "2%", left: "-34px" } },
  { shape: "ring", color: "var(--mr-coral)", size: 54, motion: "sway", duration: 9, delay: 0.6, at: { top: "34%", right: outside(16) }, narrow: { top: "30%", right: "-18px" } },
  { shape: "blob", color: "var(--mr-coral-soft)", size: 96, rotate: 14, motion: "drift", duration: 12.5, delay: 1.3, at: { top: "62%", left: outside(10) }, narrow: { top: "62%", left: "-38px" } },
  { shape: "burst", color: "var(--mr-teal)", size: 40, motion: "spin", duration: 22, at: { bottom: "8%", right: outside(22) }, narrow: { bottom: "12px", right: "-8px" } },
];

const SPEAKING_CONFETTI: ConfettiPlacement[] = [
  { shape: "arc", color: "var(--mr-sun-yellow)", size: 72, rotate: 12, motion: "bob", duration: 6.5, at: { top: "20%", left: outside(14) }, narrow: { top: "2%", left: "-26px" } },
  { shape: "capsule", color: "var(--mr-coral-soft)", size: 78, rotate: -14, motion: "shake", duration: 8, delay: 1, at: { top: "75%", right: outside(12) }, narrow: { bottom: "8%", right: "-30px" } },
];

const CONTACT_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--mr-teal)", size: 88, rotate: -6, motion: "twist", duration: 8.5, at: { top: "12%", left: outside(10) }, narrow: { top: "1%", left: "-36px" } },
  { shape: "ring", color: "var(--mr-coral)", size: 58, motion: "sway", duration: 10, delay: 1.5, at: { top: "48%", right: outside(14) }, narrow: { top: "44%", right: "-22px" } },
  { shape: "cross", color: "var(--mr-periwinkle)", size: 34, motion: "spin", duration: 26, at: { top: "85%", left: outside(24) }, narrow: { bottom: "6%", left: "-3px" } },
];

export function HomeLanding() {
  return (
    <div className="mr-root">
      {/* ── Hero ────────────────────────────────────────── */}
      <header className="mr-section" style={{ overflow: "hidden" }}>
        <ConfettiField items={HERO_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 1 }}>
          <p className="mr-heading" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            ✦ AI Educator · Founder · Creator ✦
          </p>

          <h1
            className="mr-display"
            style={{ textAlign: "center", marginTop: "clamp(24px,4vw,40px)" }}
          >
            Mika Reyes
          </h1>

          <p
            className="mr-body-lg"
            style={{
              maxWidth: "640px",
              margin: "clamp(24px,4vw,36px) auto 0",
              textAlign: "center",
            }}
          >
            I help high-achieving founders, creators &amp; professionals use AI to build
            ambitious, time-rich careers, wealth and lives.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <a href="#contact" className="mr-cta">
              Work with me
            </a>
            <a
              href="https://instagram.com/its.mikareyes"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-ghost"
              style={{ padding: "16px 24px" }}
            >
              Follow on Instagram
            </a>
          </div>

          {/* Photo, framed as a paper cutout with shapes around it */}
          <figure
            style={{
              position: "relative",
              width: "min(100%, 720px)",
              margin: "clamp(48px,7vw,72px) auto 0",
            }}
          >
            <Image
              src="/about-assets/009.jpg"
              alt="Mika Reyes"
              width={720}
              height={420}
              priority
              unoptimized
              style={{
                width: "100%",
                height: "clamp(240px, 42vw, 420px)",
                objectFit: "cover",
                objectPosition: "center 18%",
                borderRadius: "var(--mr-radius-card)",
              }}
            />
            <ConfettiField items={HERO_PHOTO_CONFETTI} />
          </figure>
        </div>
      </header>

      {/* ── Press strip ─────────────────────────────────── */}
      <section aria-label="Press coverage" style={{ position: "relative", overflow: "hidden" }}>
        <ConfettiField items={PRESS_STRIP_CONFETTI} />

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
            As seen in
          </span>
          {pressLogos.map(({ label, logo, h, href }) => (
            <Link key={label} href={href} aria-label={`${label} coverage`}>
              <Image
                src={logo}
                alt={label}
                width={140}
                height={h}
                unoptimized
                className="mr-presslogo"
                style={{ height: `${h}px`, width: "auto" }}
              />
            </Link>
          ))}
        </div>
        <hr className="mr-rule" />
      </section>

      {/* ── Dark editorial band — the one per page ──────── */}
      <section className="mr-dark mr-section">
        {/* Collage atmosphere. Everything here lives in the gutters — the
            headline column runs to 820px and white type over a yellow disc
            is unreadable, so nothing may drift inward. */}
        <ConfettiField items={DARK_CONFETTI} />

        <div className="mr-wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span
            className="mr-tag"
            style={{ background: "var(--mr-teal)", color: "var(--mr-ink)" }}
          >
            THE THESIS
          </span>

          <h2 className="mr-heading-lg" style={{ margin: "24px auto 0", maxWidth: "820px" }}>
            Two people. One small company. No permission needed.
          </h2>

          <p
            className="mr-body-lg"
            style={{ maxWidth: "600px", margin: "28px auto 0", color: "rgba(255,255,255,0.78)" }}
          >
            I raised venture money, scaled a cross-border payments company past $100M in
            volume, and got acquired. Then I chose a different shape: bootstrapped,
            couple-led, built for autonomy instead of hypergrowth.
          </p>

          <p
            className="mr-body-lg"
            style={{ maxWidth: "600px", margin: "20px auto 0", color: "rgba(255,255,255,0.78)" }}
          >
            Everything I teach comes out of running that experiment in public — the AI
            systems that let a team of two do the work of twenty.
          </p>

          {/* Overlapping circular photo crops */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "44px",
            }}
          >
            {["/about-assets/002.jpg", "/about-assets/007.jpg", "/about-assets/011.jpg"].map(
              (src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden="true"
                  width={132}
                  height={132}
                  unoptimized
                  style={{
                    width: "clamp(84px,13vw,132px)",
                    height: "clamp(84px,13vw,132px)",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: i === 0 ? 0 : "-22px",
                    border: `3px solid ${
                      ["var(--mr-sun-yellow)", "var(--mr-coral)", "var(--mr-lime)"][i]
                    }`,
                  }}
                />
              ),
            )}
          </div>

          <div style={{ marginTop: "40px" }}>
            <Link href="/about" className="mr-cta">
              Read the whole story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Time for some adventure: 4-column card grid ──────────────── */}
      <section className="mr-section">
        <ConfettiField items={ADVENTURE_CONFETTI} />

        <div className="mr-wrap">
          <div className="mr-grid">
            {startHere.map(({ tag, title, blurb, href, bg }) => (
              <Link
                key={href}
                href={href}
                className="mr-card"
                style={{ background: bg, display: "block" }}
              >
                <span className="mr-tag" style={{ background: "var(--mr-paper)" }}>
                  {tag.toUpperCase()}
                </span>
                <h3 className="mr-subheading" style={{ marginTop: "10px" }}>
                  {title}
                </h3>
                <p className="mr-body" style={{ marginTop: "8px" }}>
                  {blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press & awards ──────────────────────────────── */}
      <section className="mr-section" style={{ paddingTop: "clamp(44px,5vw,56px)" }}>
        <ConfettiField items={PRESS_AWARDS_CONFETTI} />

        <div className="mr-wrap">
          <div className="mr-card mr-panel-purple">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <h2 className="mr-heading-lg">In the press</h2>
              <Link href="/press" className="mr-ghost mr-ghost-dark">
                All coverage
              </Link>
            </div>

            <div className="mr-grid" style={{ marginTop: "36px" }}>
              {featuredPress.map(({ outlet, title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="mr-card mr-card-paper"
                  style={{ display: "block" }}
                >
                  <span className="mr-caption" style={{ letterSpacing: "0.04em" }}>
                    {outlet}
                  </span>
                  <p className="mr-body-lg" style={{ marginTop: "12px" }}>
                    {title}
                  </p>
                  <span className="mr-tag" style={{ background: "var(--mr-sand)", marginTop: "20px" }}>
                    READ →
                  </span>
                </Link>
              ))}
            </div>

            <hr className="mr-panel-rule" />

            <p className="mr-caption" style={{ letterSpacing: "0.04em" }}>
              Awards &amp; fellowships
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
                gap: "12px",
                marginTop: "16px",
              }}
            >
              {awards.map(({ label, bg, href }) => {
                const external = !href.startsWith("/");
                return (
                  <Link
                    key={label}
                    href={href}
                    className="mr-award mr-body"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{ background: bg, color: "var(--mr-ink)", textAlign: "center" }}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Speaking ────────────────────────────────────── */}
      <section className="mr-section" style={{ paddingTop: 0 }}>
        <ConfettiField items={SPEAKING_CONFETTI} />

        <div className="mr-wrap">
          <div
            className="mr-card mr-split"
            style={{
              background: "var(--mr-lime)",
              padding: "clamp(24px,4vw,32px)",
            }}
          >
            <Image
              src="/about-assets/005.jpg"
              alt="Mika Reyes speaking"
              width={520}
              height={360}
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
              <h2 className="mr-heading-lg">
                Talks, panels, and workshops.
              </h2>

              <p className="mr-body-lg" style={{ marginTop: "16px", maxWidth: "460px" }}>
                I speak about AI for non-technical audiences — founders, professionals,
                and teams who want practical tools, not hype.
              </p>

              <div style={{ marginTop: "28px" }}>
                {speakingTopics.map(({ num, title }, i) => (
                  <div
                    key={num}
                    style={{
                      borderTop: "1px solid var(--mr-ink)",
                      borderBottom:
                        i === speakingTopics.length - 1 ? "1px solid var(--mr-ink)" : undefined,
                      paddingBlock: "14px",
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <span className="mr-caption" style={{ width: "24px", flexShrink: 0 }}>
                      {num}
                    </span>
                    <p className="mr-body">{title}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "28px" }}>
                <a href="#contact" className="mr-cta">
                  Book me to speak
                </a>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────── */}
        <section id="contact" className="mr-section" style={{ paddingTop: 0 }}>
          <ConfettiField items={CONTACT_CONFETTI} />

          <div className="mr-wrap">
            <div
              className="mr-card"
              style={{ background: "var(--mr-sun-yellow)", padding: "clamp(28px,5vw,48px)" }}
            >
              <div className="mr-split">
                <div>
                  <h2 className="mr-heading-lg">Work with me</h2>
                  <p className="mr-body-lg" style={{ marginTop: "16px", maxWidth: "420px" }}>
                    Tell me what you&apos;re building and what you need. I read every note
                    myself.
                  </p>
                  <div style={{ marginTop: "28px" }}>
                    <a href="mailto:ask@kingscrosslabs.com" className="mr-ghost" style={{ padding: "16px 24px" }}>
                      ask@kingscrosslabs.com
                    </a>
                  </div>
                </div>

                <div>
                  {contactTypes.map(({ num, title, desc }, i) => (
                    <div
                      key={num}
                      style={{
                        borderTop: "1px solid var(--mr-ink)",
                        borderBottom:
                          i === contactTypes.length - 1 ? "1px solid var(--mr-ink)" : undefined,
                        paddingBlock: "14px",
                        display: "flex",
                        gap: "16px",
                      }}
                    >
                      <span className="mr-caption" style={{ width: "24px", flexShrink: 0 }}>
                        {num}
                      </span>
                      <div>
                        <p className="mr-body-lg">{title}</p>
                        <p className="mr-body" style={{ marginTop: "4px" }}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
  );
}
