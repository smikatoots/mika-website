import Image from "next/image";
import Link from "next/link";

import { homeBioLinks } from "@/lib/home-bio-links";

import { ConfettiField, type ConfettiPlacement } from "./Confetti";
import { NewDesignNav } from "./NewDesignNav";

/* ────────────────────────────────────────────────────────────
   Design prototype for mikareyes.com — "designer scrapbook desk".

   Reference system applied verbatim except for two colors, which
   are swapped to Mika's approved identity colors:
     Hot Pink     → Coral / salmon    #E8425A
     Spring Green → Teal / turquoise  #0E8C8C

   Content is the real homepage content so the comparison against
   `/` is like-for-like.
   ──────────────────────────────────────────────────────────── */

// Destinations come from the live homepage's link map, same as the press
// strip. Every fill here clears AA with black type, turquoise included at
// 5.09:1 — so the pills all set ink.
const awards = [
  { label: "Forbes 30 Under 30", bg: "var(--nd-sun-yellow)", href: homeBioLinks.awards.forbes30 },
  { label: "Tatler Gen.T Leader of Tomorrow", bg: "var(--nd-turquoise)", href: homeBioLinks.awards.tatler },
  { label: "Kleiner Perkins Fellow", bg: "var(--nd-lime)", href: homeBioLinks.awards.kleinerPerkins },
  { label: "SPC Founder Fellow", bg: "var(--nd-salmon-pink)", href: homeBioLinks.awards.spc },
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
    bg: "var(--nd-lime)",
  },
  {
    tag: "Free",
    title: "AI Guides",
    blurb: "Practical how-tos pulled straight from the videos.",
    href: "/ai",
    bg: "var(--nd-sun-yellow)",
  },
  {
    tag: "Series",
    title: "AI Challenges",
    blurb: "Hard skills learned with AI as the only coach.",
    href: "/challenges",
    bg: "var(--nd-periwinkle)",
  },
  {
    tag: "Writing",
    title: "The Blog",
    blurb: "Longer thinking on building small, staying time-rich.",
    href: "/blog",
    bg: "var(--nd-salmon-pink)",
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

/* Past 1200px the gutter keeps growing, so a shape pinned to a percentage of
   the section drifts further and further from the content it decorates. These
   two anchor to the content column's edge instead, holding the same distance
   at any width. Sections whose text is capped narrower than the wrap — the
   hero, the dark band — can pull their shapes inside that edge; sections whose
   content fills the wrap have to stay outside it. */
const inside = (px: number) => `calc(var(--nd-edge) + ${px}px)`;

/* The `max()` is a floor, not a preference: at 1200px the gutter is only 24px
   wide, so the plain calc pushes a shape clean off the page. It clamps at 18px
   still showing, which keeps the "nothing disappears" rule true at every width
   rather than only below the breakpoint. */
const outside = (px: number) =>
  `max(calc(18px - var(--w)), calc(var(--nd-edge) - var(--w) - ${px}px))`;

const HERO_PHOTO_CONFETTI: ConfettiPlacement[] = [
  // Salmon carries the buttons now, so the big masses beside the CTA are
  // yellow and turquoise — a salmon blob here would pull rank on it.
  { shape: "disc", color: "var(--nd-sun-yellow)", size: 104, motion: "bob", duration: 5.5, at: { top: "-38px", left: "-38px" } },
  { shape: "triangle", color: "var(--nd-lime)", size: 66, rotate: 18, motion: "sway", duration: 7.5, delay: 0.6, at: { bottom: "-30px", right: "34px" } },
  { shape: "capsule", color: "var(--nd-turquoise)", size: 78, rotate: 12, motion: "twist", duration: 6.5, delay: 1.1, at: { top: "-30px", right: "-26px" } },
];

const HERO_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--nd-salmon)", size: 44, motion: "bob", duration: 5, at: { top: "12%", left: inside(30) }, narrow: { top: "8px", left: "8%" } },
  { shape: "squiggle", color: "var(--nd-lime)", size: 96, rotate: 6, motion: "drift", duration: 11, delay: 0.5, at: { top: "38%", right: inside(16) }, narrow: { bottom: "6px", left: "8%" } },
  { shape: "zigzag", color: "var(--nd-periwinkle)", size: 92, rotate: -8, motion: "twist", duration: 8, delay: 1.1, at: { top: "62%", left: inside(14) }, narrow: { top: "62%", left: "-40px" } },
  { shape: "dots", color: "var(--nd-salmon-pink)", size: 64, rotate: -12, motion: "shake", duration: 6, delay: 0.3, at: { top: "85%", right: inside(26) }, narrow: { bottom: "10px", right: "6%" } },
];

const PRESS_STRIP_CONFETTI: ConfettiPlacement[] = [
  { shape: "dots", color: "var(--nd-turquoise)", size: 46, motion: "shake", duration: 7, at: { top: "38%", right: outside(16) }, narrow: { top: "34%", right: "-8px" } },
];

const DARK_CONFETTI: ConfettiPlacement[] = [
  // The headline column stops at 820px, so there is room inside the wrap here
  // that the card-grid sections do not have.
  { shape: "disc", color: "var(--nd-sun-yellow)", size: 110, motion: "bob", duration: 6, at: { top: "10%", left: inside(18) }, narrow: { top: "1%", left: "-48px" } },
  { shape: "triangle", color: "var(--nd-salmon)", size: 72, rotate: -14, motion: "twist", duration: 8.5, delay: 0.7, at: { top: "30%", right: inside(30) }, narrow: { top: "22%", right: "-27px" } },
  { shape: "arc", color: "var(--nd-salmon-pink)", size: 78, rotate: -18, motion: "sway", duration: 9.5, delay: 1.4, at: { top: "52%", left: inside(26) }, narrow: { bottom: "12px", right: "8%" } },
  { shape: "blob", color: "var(--nd-periwinkle)", size: 132, rotate: -8, motion: "drift", duration: 12, delay: 0.2, at: { top: "70%", right: inside(14) }, narrow: { top: "70%", right: "-64px" } },
  { shape: "ring", color: "var(--nd-lime)", size: 52, motion: "pulse", duration: 6.5, delay: 1.9, at: { bottom: "6%", left: inside(70) }, narrow: { bottom: "10px", left: "8%" } },
];

const PRESS_AWARDS_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--nd-sun-yellow)", size: 38, motion: "spin", duration: 18, at: { top: "14%", left: outside(14) }, narrow: { top: "6px", left: "4%" } },
  { shape: "squiggle", color: "var(--nd-periwinkle)", size: 80, rotate: -10, motion: "drift", duration: 10.5, delay: 0.8, at: { top: "52%", right: outside(12) }, narrow: { bottom: "12px", right: "8%" } },
  { shape: "dots", color: "var(--nd-lime)", size: 54, rotate: 8, motion: "shake", duration: 6.5, delay: 1.4, at: { top: "86%", left: outside(20) }, narrow: { top: "6px", right: "6%" } },
];

const ADVENTURE_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--nd-lime)", size: 84, rotate: 6, motion: "twist", duration: 7, at: { top: "8%", left: outside(12) }, narrow: { top: "2%", left: "-34px" } },
  { shape: "ring", color: "var(--nd-salmon)", size: 54, motion: "sway", duration: 9, delay: 0.6, at: { top: "34%", right: outside(16) }, narrow: { top: "30%", right: "-18px" } },
  { shape: "blob", color: "var(--nd-salmon-pink)", size: 96, rotate: 14, motion: "drift", duration: 12.5, delay: 1.3, at: { top: "62%", left: outside(10) }, narrow: { top: "62%", left: "-38px" } },
  { shape: "burst", color: "var(--nd-turquoise)", size: 40, motion: "spin", duration: 22, at: { bottom: "8%", right: outside(22) }, narrow: { bottom: "12px", right: "-8px" } },
];

const SPEAKING_CONFETTI: ConfettiPlacement[] = [
  { shape: "arc", color: "var(--nd-sun-yellow)", size: 72, rotate: 12, motion: "bob", duration: 6.5, at: { top: "20%", left: outside(14) }, narrow: { top: "2%", left: "-26px" } },
  { shape: "capsule", color: "var(--nd-salmon-pink)", size: 78, rotate: -14, motion: "shake", duration: 8, delay: 1, at: { top: "75%", right: outside(12) }, narrow: { bottom: "8%", right: "-30px" } },
];

const CONTACT_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--nd-turquoise)", size: 88, rotate: -6, motion: "twist", duration: 8.5, at: { top: "12%", left: outside(10) }, narrow: { top: "1%", left: "-36px" } },
  { shape: "ring", color: "var(--nd-salmon)", size: 58, motion: "sway", duration: 10, delay: 1.5, at: { top: "48%", right: outside(14) }, narrow: { top: "44%", right: "-22px" } },
  { shape: "cross", color: "var(--nd-periwinkle)", size: 34, motion: "spin", duration: 26, at: { top: "85%", left: outside(24) }, narrow: { bottom: "6%", left: "-3px" } },
];

export default function NewDesignPage() {
  return (
    <>
      <NewDesignNav />

      {/* ── Hero ────────────────────────────────────────── */}
      <header className="nd-section" style={{ overflow: "hidden" }}>
        <ConfettiField items={HERO_CONFETTI} />

        <div className="nd-wrap" style={{ position: "relative", zIndex: 1 }}>
          <p className="nd-heading" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            ✦ AI Educator · Founder · Creator ✦
          </p>

          <h1
            className="nd-display"
            style={{ textAlign: "center", marginTop: "clamp(24px,4vw,40px)" }}
          >
            Mika Reyes
          </h1>

          <p
            className="nd-body-lg"
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
            <a href="#contact" className="nd-cta">
              Work with me
            </a>
            <a
              href="https://instagram.com/its.mikareyes"
              target="_blank"
              rel="noopener noreferrer"
              className="nd-ghost"
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
                borderRadius: "var(--nd-radius)",
              }}
            />
            <ConfettiField items={HERO_PHOTO_CONFETTI} />
          </figure>
        </div>
      </header>

      {/* ── Press strip ─────────────────────────────────── */}
      <section aria-label="Press coverage" style={{ position: "relative", overflow: "hidden" }}>
        <ConfettiField items={PRESS_STRIP_CONFETTI} />

        <hr className="nd-rule" />
        <div
          className="nd-wrap"
          style={{
            paddingBlock: "28px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(24px,5vw,56px)",
          }}
        >
          <span className="nd-caption" style={{ letterSpacing: "0.04em" }}>
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
                className="nd-presslogo"
                style={{ height: `${h}px`, width: "auto" }}
              />
            </Link>
          ))}
        </div>
        <hr className="nd-rule" />
      </section>

      {/* ── Dark editorial band — the one per page ──────── */}
      <section className="nd-dark nd-section">
        {/* Collage atmosphere. Everything here lives in the gutters — the
            headline column runs to 820px and white type over a yellow disc
            is unreadable, so nothing may drift inward. */}
        <ConfettiField items={DARK_CONFETTI} />

        <div className="nd-wrap" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span
            className="nd-tag"
            style={{ background: "var(--nd-turquoise)", color: "var(--nd-ink)" }}
          >
            THE THESIS
          </span>

          <h2 className="nd-heading-lg" style={{ margin: "24px auto 0", maxWidth: "820px" }}>
            Two people. One small company. No permission needed.
          </h2>

          <p
            className="nd-body-lg"
            style={{ maxWidth: "600px", margin: "28px auto 0", color: "rgba(255,255,255,0.78)" }}
          >
            I raised venture money, scaled a cross-border payments company past $100M in
            volume, and got acquired. Then I chose a different shape: bootstrapped,
            couple-led, built for autonomy instead of hypergrowth.
          </p>

          <p
            className="nd-body-lg"
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
                      ["var(--nd-sun-yellow)", "var(--nd-salmon)", "var(--nd-lime)"][i]
                    }`,
                  }}
                />
              ),
            )}
          </div>

          <div style={{ marginTop: "40px" }}>
            <Link href="/about" className="nd-cta">
              Read the whole story
            </Link>
          </div>
        </div>
      </section>

      {/* ── Time for some adventure: 4-column card grid ──────────────── */}
      <section className="nd-section">
        <ConfettiField items={ADVENTURE_CONFETTI} />

        <div className="nd-wrap">
          <div className="nd-grid">
            {startHere.map(({ tag, title, blurb, href, bg }) => (
              <Link
                key={href}
                href={href}
                className="nd-card"
                style={{ background: bg, display: "block" }}
              >
                <span className="nd-tag" style={{ background: "var(--nd-paper)" }}>
                  {tag.toUpperCase()}
                </span>
                <h3 className="nd-subheading" style={{ marginTop: "10px" }}>
                  {title}
                </h3>
                <p className="nd-body" style={{ marginTop: "8px" }}>
                  {blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press & awards ──────────────────────────────── */}
      <section className="nd-section">
        <ConfettiField items={PRESS_AWARDS_CONFETTI} />

        <div className="nd-wrap">
          <div className="nd-card nd-panel-purple">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <h2 className="nd-heading-lg">In the press</h2>
              <Link href="/press" className="nd-ghost nd-ghost-dark">
                All coverage
              </Link>
            </div>

            <div className="nd-grid" style={{ marginTop: "36px" }}>
              {featuredPress.map(({ outlet, title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="nd-card nd-card-paper"
                  style={{ display: "block" }}
                >
                  <span className="nd-caption" style={{ letterSpacing: "0.04em" }}>
                    {outlet}
                  </span>
                  <p className="nd-body-lg" style={{ marginTop: "12px" }}>
                    {title}
                  </p>
                  <span className="nd-tag" style={{ background: "var(--nd-sand)", marginTop: "20px" }}>
                    READ →
                  </span>
                </Link>
              ))}
            </div>

            <hr className="nd-panel-rule" />

            <p className="nd-caption" style={{ letterSpacing: "0.04em" }}>
              Awards &amp; fellowships
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
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
                    className="nd-award nd-body"
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    style={{ background: bg, color: "var(--nd-ink)" }}
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
      <section className="nd-section" style={{ paddingTop: 0 }}>
        <ConfettiField items={SPEAKING_CONFETTI} />

        <div className="nd-wrap">
          <div
            className="nd-card nd-split"
            style={{
              background: "var(--nd-turquoise)",
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
                borderRadius: "var(--nd-radius)",
              }}
            />

            <div>
              <h2 className="nd-heading-lg">
                Talks, panels, and workshops.
              </h2>

              <p className="nd-body-lg" style={{ marginTop: "16px", maxWidth: "460px" }}>
                I speak about AI for non-technical audiences — founders, professionals,
                and teams who want practical tools, not hype.
              </p>

              <div style={{ marginTop: "28px" }}>
                {speakingTopics.map(({ num, title }, i) => (
                  <div
                    key={num}
                    style={{
                      borderTop: "1px solid var(--nd-ink)",
                      borderBottom:
                        i === speakingTopics.length - 1 ? "1px solid var(--nd-ink)" : undefined,
                      paddingBlock: "14px",
                      display: "flex",
                      gap: "16px",
                    }}
                  >
                    <span className="nd-caption" style={{ width: "24px", flexShrink: 0 }}>
                      {num}
                    </span>
                    <p className="nd-body">{title}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "28px" }}>
                <a href="#contact" className="nd-cta">
                  Book me to speak
                </a>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────── */}
        <section id="contact" className="nd-section" style={{ paddingTop: 0 }}>
          <ConfettiField items={CONTACT_CONFETTI} />

          <div className="nd-wrap">
            <div
              className="nd-card"
              style={{ background: "var(--nd-sun-yellow)", padding: "clamp(28px,5vw,48px)" }}
            >
              <div className="nd-split">
                <div>
                  <h2 className="nd-heading-lg">Work with me</h2>
                  <p className="nd-body-lg" style={{ marginTop: "16px", maxWidth: "420px" }}>
                    Tell me what you&apos;re building and what you need. I read every note
                    myself.
                  </p>
                  <div style={{ marginTop: "28px" }}>
                    <a href="mailto:ask@kingscrosslabs.com" className="nd-ghost" style={{ padding: "16px 24px" }}>
                      ask@kingscrosslabs.com
                    </a>
                  </div>
                </div>

                <div>
                  {contactTypes.map(({ num, title, desc }, i) => (
                    <div
                      key={num}
                      style={{
                        borderTop: "1px solid var(--nd-ink)",
                        borderBottom:
                          i === contactTypes.length - 1 ? "1px solid var(--nd-ink)" : undefined,
                        paddingBlock: "14px",
                        display: "flex",
                        gap: "16px",
                      }}
                    >
                      <span className="nd-caption" style={{ width: "24px", flexShrink: 0 }}>
                        {num}
                      </span>
                      <div>
                        <p className="nd-body-lg">{title}</p>
                        <p className="nd-body" style={{ marginTop: "4px" }}>
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

        {/* ── Footer ──────────────────────────────────────── */}
        <footer style={{ background: "var(--nd-paper)" }}>
          <hr className="nd-rule" />
          <div
            className="nd-wrap"
            style={{
              paddingBlock: "40px",
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="nd-navmark">
              <Link href="/" aria-label="Mika Reyes, home" className="nd-badge">
                <Image src="/mika-reyes-logo.png" alt="Mika Reyes" width={36} height={36} />
              </Link>
              <span className="nd-body">Mika Reyes · New York City</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["/about", "/ai", "/blog", "/press", "/projects", "/links"].map((href) => (
                <Link key={href} href={href} className="nd-tag" style={{ background: "var(--nd-sand)" }}>
                  {href.replace("/", "").toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </footer>
    </>
  );
}
