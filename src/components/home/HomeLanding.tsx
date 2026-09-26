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

   Sections run light -> charcoal -> light, one dark band only. The green
   press band gets a linen breather (Time Rich Club), then the page closes
   on full-bleed yellow and aqua bands that butt together. The
   confetti layer lives in the gutters; see DESIGN.md for the rules it
   follows and `Confetti.tsx` for why placements come in pairs.
   ──────────────────────────────────────────────────────────── */

// The hero's secondary action sends readers to the newsletter, tagged so
// Substack's traffic report shows this button as its own source.
const SUBSTACK_HERO_URL =
  "https://mikareyes.substack.com/?utm_source=mikareyes.com&utm_medium=website&utm_campaign=homepage_hero";

// Destinations come from the live homepage's link map, same as the press
// strip. The pills sit on the green band, so green is the one accent
// they cannot use; yellow repeats as the fourth. Every fill clears AA with
// black type, so the pills all set ink.
const awards = [
  { label: "Forbes 30 Under 30", bg: "var(--mr-yellow)", href: homeBioLinks.awards.forbes30 },
  { label: "Tatler Gen.T Leader of Tomorrow", bg: "var(--mr-aqua)", href: homeBioLinks.awards.tatler },
  { label: "Kleiner Perkins Fellow", bg: "var(--mr-red)", href: homeBioLinks.awards.kleinerPerkins },
  { label: "SPC Founder Fellow", bg: "var(--mr-yellow)", href: homeBioLinks.awards.spc },
];

// Destinations come from the live homepage's link map, so the prototype
// points at the same coverage rather than a second copy that can drift.
// `ratio` is each file's intrinsic width / height. Width is set from it
// rather than left to `auto`, because next/image warns whenever the
// rendered size drifts from the width/height attributes on only one axis.
const pressLogos = [
  { label: "Forbes", logo: "/press-logos/forbes.svg", h: 20, ratio: 3.818, href: homeBioLinks.press.forbes },
  { label: "TechCrunch", logo: "/press-logos/techcrunch-icon.svg", h: 26, ratio: 1, href: homeBioLinks.press.techcrunch },
  { label: "Yahoo!", logo: "/press-logos/yahoo.svg", h: 22, ratio: 3.606, href: homeBioLinks.press.yahoo },
  { label: "Tech in Asia", logo: "/press-logos/tech-in-asia.png", h: 22, ratio: 5.307, href: homeBioLinks.press.techInAsia },
  { label: "Rappler", logo: "/press-logos/rappler.png", h: 26, ratio: 3.97, href: homeBioLinks.press.rappler },
  { label: "Inquirer", logo: "/press-logos/inquirer.svg", h: 18, ratio: 5.364, href: homeBioLinks.press.inquirer },
];

const startHere = [
  {
    tag: "Course",
    title: "Master Agentic AI",
    blurb: "Build your own custom AI agent in a day. No engineering degree.",
    href: "/build-your-first-agent-101",
    bg: "var(--mr-aqua)",
    fg: "var(--mr-ink)",
  },
  {
    tag: "Free",
    title: "AI Guides",
    blurb: "Practical how-tos pulled straight from the videos.",
    href: "/ai",
    bg: "var(--mr-yellow)",
    fg: "var(--mr-ink)",
  },
  {
    tag: "Series",
    title: "AI Challenges",
    blurb: "Hard skills learned with AI as the only coach.",
    href: "/challenges",
    bg: "var(--mr-green)",
    fg: "var(--mr-ink)",
  },
  {
    tag: "Writing",
    title: "The Blog",
    blurb: "Longer thinking on building small, staying time-rich.",
    href: "/blog",
    bg: "var(--mr-red)",
    fg: "var(--mr-ink)",
  },
];

// Time Rich Club. The banner is the one tile that goes anywhere (Luma);
// the event photos are evidence, not links. `ratio` is each logo file's
// intrinsic width / height, for the same next/image reason as the press strip.
const TIME_RICH_CLUB_URL = "https://luma.com/timerichclub";

const eventPhotos = [
  { area: "talk", src: "/time-rich-club/workshop.webp", alt: "Mika presenting a live Claude workshop at a Time Rich Club event", position: "60% center" },
  { area: "group", src: "/time-rich-club/group.webp", alt: "A full room of founders and creators at a Time Rich Club workshop in New York", position: "center 60%" },
  { area: "dinner", src: "/time-rich-club/dinner.webp", alt: "An intimate Time Rich Club dinner around one long table", position: "center" },
  { area: "selfie", src: "/time-rich-club/selfie.webp", alt: "A small Time Rich Club gathering smiling around a conference table", position: "center 40%" },
  { area: "present", src: "/time-rich-club/presenting.webp", alt: "Mika walking a small group through a live AI demo", position: "72% 55%" },
  { area: "room", src: "/time-rich-club/room.webp", alt: "Attendees building along on laptops during a Time Rich Club workshop", position: "30% center" },
];

// Paper ships only its mark, so it carries a set wordmark beside it.
const collaborators: { label: string; logo: string; h: number; ratio: number; href: string; wordmark?: boolean }[] = [
  { label: "Milled", logo: "/time-rich-club/milled.png", h: 34, ratio: 3.92, href: "https://milled.com" },
  { label: "Claude", logo: "/time-rich-club/claude.png", h: 38, ratio: 4.644, href: "https://claude.com" },
  { label: "BuildBetter", logo: "/time-rich-club/buildbetter.png", h: 50, ratio: 3.73, href: "https://buildbetter.ai" },
  { label: "Paper", logo: "/time-rich-club/paper.svg", h: 34, ratio: 1, href: "https://paper.design", wordmark: true },
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
  { shape: "disc", color: "var(--mr-yellow)", size: 104, motion: "bob", duration: 5.5, at: { top: "-38px", left: "-38px" } },
  { shape: "triangle", color: "var(--mr-aqua)", size: 66, rotate: 18, motion: "sway", duration: 7.5, delay: 0.6, at: { bottom: "-30px", right: "34px" } },
  { shape: "capsule", color: "var(--mr-green)", size: 78, rotate: 12, motion: "twist", duration: 6.5, delay: 1.1, at: { top: "-30px", right: "-26px" } },
];

const HERO_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--mr-red)", size: 44, motion: "bob", duration: 5, at: { top: "12%", left: outside(18) }, narrow: { top: "8px", left: "8%" } },
  { shape: "squiggle", color: "var(--mr-aqua)", size: 96, rotate: 6, motion: "drift", duration: 11, delay: 0.5, at: { top: "38%", right: outside(14) }, narrow: { bottom: "6px", left: "8%" } },
  { shape: "zigzag", color: "var(--mr-green)", size: 92, rotate: -8, motion: "twist", duration: 8, delay: 1.1, at: { top: "62%", left: outside(12) }, narrow: { top: "62%", left: "-40px" } },
  { shape: "dots", color: "var(--mr-red)", size: 64, rotate: -12, motion: "shake", duration: 6, delay: 0.3, at: { top: "85%", right: outside(22) }, narrow: { bottom: "10px", right: "6%" } },
];

const PRESS_STRIP_CONFETTI: ConfettiPlacement[] = [
  { shape: "dots", color: "var(--mr-aqua)", size: 46, motion: "shake", duration: 7, at: { top: "38%", right: outside(16) }, narrow: { top: "34%", right: "-8px" } },
];

const DARK_CONFETTI: ConfettiPlacement[] = [
  // The headline column stops at 820px, so there is room inside the wrap here
  // that the card-grid sections do not have.
  { shape: "disc", color: "var(--mr-yellow)", size: 110, motion: "bob", duration: 6, at: { top: "10%", left: inside(18) }, narrow: { top: "1%", left: "-48px" } },
  { shape: "triangle", color: "var(--mr-red)", size: 72, rotate: -14, motion: "twist", duration: 8.5, delay: 0.7, at: { top: "30%", right: inside(30) }, narrow: { top: "22%", right: "-27px" } },
  { shape: "arc", color: "var(--mr-yellow)", size: 78, rotate: -18, motion: "sway", duration: 9.5, delay: 1.4, at: { top: "52%", left: inside(26) }, narrow: { bottom: "12px", right: "8%" } },
  { shape: "blob", color: "var(--mr-green)", size: 132, rotate: -8, motion: "drift", duration: 12, delay: 0.2, at: { top: "70%", right: inside(14) }, narrow: { top: "70%", right: "-64px" } },
  { shape: "ring", color: "var(--mr-aqua)", size: 52, motion: "pulse", duration: 6.5, delay: 1.9, at: { bottom: "6%", left: inside(70) }, narrow: { bottom: "10px", left: "8%" } },
];

const PRESS_AWARDS_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--mr-yellow)", size: 38, motion: "spin", duration: 18, at: { top: "14%", left: outside(14) }, narrow: { top: "6px", left: "4%" } },
  { shape: "squiggle", color: "var(--mr-red)", size: 80, rotate: -10, motion: "drift", duration: 10.5, delay: 0.8, at: { top: "52%", right: outside(12) }, narrow: { bottom: "12px", right: "8%" } },
  { shape: "dots", color: "var(--mr-aqua)", size: 54, rotate: 8, motion: "shake", duration: 6.5, delay: 1.4, at: { top: "86%", left: outside(20) }, narrow: { top: "6px", right: "6%" } },
];

const ADVENTURE_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--mr-aqua)", size: 84, rotate: 6, motion: "twist", duration: 7, at: { top: "8%", left: outside(12) }, narrow: { top: "2%", left: "-34px" } },
  { shape: "ring", color: "var(--mr-red)", size: 54, motion: "sway", duration: 9, delay: 0.6, at: { top: "34%", right: outside(16) }, narrow: { top: "30%", right: "-18px" } },
  { shape: "blob", color: "var(--mr-yellow)", size: 96, rotate: 14, motion: "drift", duration: 12.5, delay: 1.3, at: { top: "62%", left: outside(10) }, narrow: { top: "62%", left: "-38px" } },
  { shape: "burst", color: "var(--mr-green)", size: 40, motion: "spin", duration: 22, at: { bottom: "8%", right: outside(22) }, narrow: { bottom: "12px", right: "-8px" } },
];

const CLUB_CONFETTI: ConfettiPlacement[] = [
  { shape: "burst", color: "var(--mr-red)", size: 42, motion: "spin", duration: 20, at: { top: "10%", right: outside(16) }, narrow: { top: "6px", right: "6%" } },
  { shape: "squiggle", color: "var(--mr-yellow)", size: 84, rotate: 8, motion: "drift", duration: 11.5, delay: 0.9, at: { top: "46%", left: outside(12) }, narrow: { top: "6px", left: "4%" } },
  { shape: "capsule", color: "var(--mr-aqua)", size: 70, rotate: -16, motion: "bob", duration: 7, delay: 1.6, at: { bottom: "10%", right: outside(18) }, narrow: { bottom: "10px", right: "8%" } },
];

const SPEAKING_CONFETTI: ConfettiPlacement[] = [
  { shape: "arc", color: "var(--mr-green)", size: 72, rotate: 12, motion: "bob", duration: 6.5, at: { top: "20%", left: outside(14) }, narrow: { top: "2%", left: "-26px" } },
  { shape: "capsule", color: "var(--mr-red)", size: 78, rotate: -14, motion: "shake", duration: 8, delay: 1, at: { top: "75%", right: outside(12) }, narrow: { bottom: "8%", right: "-30px" } },
];

const CONTACT_CONFETTI: ConfettiPlacement[] = [
  { shape: "zigzag", color: "var(--mr-yellow)", size: 88, rotate: -6, motion: "twist", duration: 8.5, at: { top: "12%", left: outside(10) }, narrow: { top: "1%", left: "-36px" } },
  { shape: "ring", color: "var(--mr-red)", size: 58, motion: "sway", duration: 10, delay: 1.5, at: { top: "48%", right: outside(14) }, narrow: { top: "44%", right: "-22px" } },
  { shape: "cross", color: "var(--mr-red)", size: 34, motion: "spin", duration: 26, at: { top: "85%", left: outside(24) }, narrow: { bottom: "6%", left: "-3px" } },
];

export function HomeLanding() {
  return (
    <div className="mr-root">
      {/* ── Hero ────────────────────────────────────────── */}
      <header className="mr-section" style={{ overflow: "hidden" }}>
        <ConfettiField items={HERO_CONFETTI} />

        <div className="mr-wrap mr-hero" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <p className="mr-subheading">✦ AI Educator · Founder · Creator ✦</p>

            <h1 className="mr-display mr-hero-name" style={{ marginTop: "clamp(16px,3vw,28px)" }}>
              Mika Reyes
            </h1>

            <p className="mr-body-lg" style={{ maxWidth: "520px", marginTop: "clamp(20px,3vw,32px)" }}>
              I help high-achieving founders, creators &amp; professionals use AI to build
              ambitious, time-rich careers, wealth and lives.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px" }}>
              <a href="#contact" className="mr-cta">
                Work with me
              </a>
              <a
                href={SUBSTACK_HERO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-ghost"
                style={{ padding: "16px 24px" }}
              >
                Subscribe
              </a>
            </div>
          </div>

          {/* Photo, framed as a paper cutout with shapes around it */}
          <figure style={{ position: "relative" }}>
            <Image
              src="/about-assets/009.jpg"
              alt="Mika Reyes"
              width={720}
              height={900}
              priority
              unoptimized
              className="mr-hero-photo"
              style={{
                width: "100%",
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
          {pressLogos.map(({ label, logo, h, ratio, href }) => {
            const w = Math.round(h * ratio);
            return (
              <Link key={label} href={href} aria-label={`${label} coverage`}>
                <Image
                  src={logo}
                  alt={label}
                  width={w}
                  height={h}
                  unoptimized
                  className="mr-presslogo"
                  style={{ height: `${h}px`, width: `${w}px` }}
                />
              </Link>
            );
          })}
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
            style={{ background: "var(--mr-aqua)", color: "var(--mr-ink)" }}
          >
            THE THESIS
          </span>

          <h2 className="mr-heading-lg" style={{ margin: "24px auto 0", maxWidth: "820px" }}>
            Ambitious <em>and</em>{" "}time-rich. You don&apos;t have to pick.
          </h2>

          <p
            className="mr-body-lg"
            style={{ maxWidth: "600px", margin: "28px auto 0", color: "rgba(255,255,255,0.78)" }}
          >
            High achievers get told to choose either the big career or a life outside it.
            I think that&apos;s a false trade, and AI unlocks a new way.
          </p>

          <p
            className="mr-body-lg"
            style={{ maxWidth: "600px", margin: "20px auto 0", color: "rgba(255,255,255,0.78)" }}
          >
            I played the prestige game: Product at LinkedIn, a venture-backed company,
            fellowships, awards &amp; an acquisition. Now I&apos;m still building a startup
            &amp; creator business but leverage AI to protect my hours for the people I love.
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
                      ["var(--mr-yellow)", "var(--mr-red)", "var(--mr-aqua)"][i]
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
            {startHere.map(({ tag, title, blurb, href, bg, fg }) => (
              <Link
                key={href}
                href={href}
                className="mr-card"
                style={{ background: bg, color: fg, display: "block" }}
              >
                <span className="mr-tag" style={{ background: "var(--mr-paper)", color: "var(--mr-ink)" }}>
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
      <section className="mr-section mr-press-band">
        <ConfettiField items={PRESS_AWARDS_CONFETTI} />

        <div className="mr-wrap">
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
            <Link href="/press" className="mr-ghost">
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
                <span className="mr-tag" style={{ background: "var(--mr-line)", marginTop: "20px" }}>
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
      </section>

      {/* ── Time Rich Club ─────────────────────────────── */}
      <section className="mr-section">
        <ConfettiField items={CLUB_CONFETTI} />

        <div className="mr-wrap">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <h2 className="mr-heading-lg">Time Rich Club</h2>
              <p className="mr-body-lg" style={{ marginTop: "16px", maxWidth: "620px" }}>
                In-person community and events in New York City for ambitious AI builders.
                I host talks, workshops, intimate gatherings and socials for founders &amp;
                creators building time-rich businesses with AI.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
              <a
                href={TIME_RICH_CLUB_URL}
                className="mr-ghost"
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "16px 24px" }}
              >
                Join future events
              </a>
              <Link href="/events" className="mr-cta">
                Sponsor an event
              </Link>
            </div>
          </div>

          <div className="mr-bento" style={{ marginTop: "36px" }}>
            <a
              href={TIME_RICH_CLUB_URL}
              className="mr-bento-tile mr-bento-banner mr-lift"
              style={{ gridArea: "banner" }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Time Rich Club on Luma"
            >
              <Image
                src="/time-rich-club/banner.webp"
                alt="Time Rich Club: for ambitious founders, creators and growth operators building time-rich lives. Hosted by mikareyes.com"
                fill
                sizes="(min-width: 1000px) 560px, 100vw"
                style={{ objectFit: "cover" }}
              />
            </a>

            {eventPhotos.map(({ area, src, alt, position }) => (
              <div key={area} className="mr-bento-tile" style={{ gridArea: area }}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(min-width: 1000px) 560px, (min-width: 640px) 50vw, 100vw"
                  style={{ objectFit: "cover", objectPosition: position }}
                />
              </div>
            ))}

            <div className="mr-card mr-bento-card" style={{ gridArea: "logos", background: "var(--mr-green)" }}>
              <p className="mr-caption" style={{ letterSpacing: "0.04em", color: "var(--mr-ink)" }}>
                Past collaborators &amp; sponsors
              </p>
              <div className="mr-bento-logos">
                {collaborators.map(({ label, logo, h, ratio, href, wordmark }) => (
                  <a
                    key={label}
                    href={href}
                    className="mr-presslogo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--mr-ink)" }}
                  >
                    <Image
                      src={logo}
                      alt={label}
                      width={Math.round(h * ratio)}
                      height={h}
                      style={{ height: `${h}px`, width: `${Math.round(h * ratio)}px`, display: "block" }}
                    />
                    {wordmark && (
                      <span className="mr-subheading" aria-hidden style={{ lineHeight: 1 }}>
                        {label}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="mailto:ask@kingscrosslabs.com?subject=Sponsoring%20Time%20Rich%20Club"
              className="mr-card mr-bento-card mr-lift"
              style={{ gridArea: "cta", background: "var(--mr-red)", color: "var(--mr-ink)" }}
            >
              <p className="mr-caption" style={{ letterSpacing: "0.04em", color: "var(--mr-ink)" }}>
                For brands
              </p>
              <div>
                <h3 className="mr-subheading">Sponsor an event</h3>
                <p className="mr-body" style={{ marginTop: "6px" }}>
                  Put your product in front of a room of AI builders.
                </p>
                <span className="mr-ghost" style={{ marginTop: "16px" }}>
                  Get in touch →
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── Speaking ────────────────────────────────────── */}
      <section className="mr-section" style={{ background: "var(--mr-yellow)" }}>
        <ConfettiField items={SPEAKING_CONFETTI} />

        <div className="mr-wrap">
          <div className="mr-split">
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
      <section id="contact" className="mr-section" style={{ background: "var(--mr-aqua)" }}>
        <ConfettiField items={CONTACT_CONFETTI} />

        <div className="mr-wrap">
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
      </section>
    </div>
  );
}
