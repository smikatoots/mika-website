import Image from "next/image";
import Link from "next/link";

import { homeBioLinks } from "@/lib/home-bio-links";

import { Confetti } from "./Confetti";
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

const awards = [
  { label: "Forbes 30 Under 30", bg: "var(--nd-sun-yellow)" },
  { label: "Tatler Gen.T Leader of Tomorrow", bg: "var(--nd-turquoise)" },
  { label: "Kleiner Perkins Fellow", bg: "var(--nd-lime)" },
  { label: "SPC Founder Fellow", bg: "var(--nd-salmon-pink)" },
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
    img: "/about-assets/003.jpg",
    bg: "var(--nd-lime)",
  },
  {
    tag: "Free",
    title: "AI Guides",
    blurb: "Practical how-tos pulled straight from the videos.",
    href: "/ai",
    img: "/about-assets/006.jpg",
    bg: "var(--nd-sun-yellow)",
  },
  {
    tag: "Series",
    title: "AI Challenges",
    blurb: "Hard skills learned with AI as the only coach.",
    href: "/challenges",
    img: "/about-assets/010.jpg",
    bg: "var(--nd-periwinkle)",
  },
  {
    tag: "Writing",
    title: "The Blog",
    blurb: "Longer thinking on building small, staying time-rich.",
    href: "/blog",
    img: "/about-assets/008.jpg",
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

/** One wordmark letter, with an optional cut-paper shape tucked behind it.
    Placement is driven by the ink-band tokens on `.nd-display`, so the shapes
    stay on the glyphs if the display face is ever swapped again. */
function Letter({
  char,
  shape,
  color,
  anchor = "cap",
}: {
  char: string;
  shape?: "dot" | "swatch";
  color?: string;
  /** Lowercase letters with no ascender hang off the x-height, not the cap. */
  anchor?: "cap" | "x";
}) {
  return (
    <span className="nd-letter">
      {shape ? (
        <span
          aria-hidden="true"
          className={[
            "nd-letter-shape",
            `nd-letter-${shape}`,
            shape === "dot" && anchor === "x" ? "nd-letter-dot--x" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ ["--c" as string]: color }}
        />
      ) : null}
      <span className="nd-letter-glyph">{char}</span>
    </span>
  );
}

export default function NewDesignPage() {
  return (
    <>
      <NewDesignNav />

      {/* ── Hero ────────────────────────────────────────── */}
      <header className="nd-section" style={{ overflow: "hidden" }}>
        <Confetti shape="sparkle" color="var(--nd-salmon)" size={44} motion="bob" style={{ top: "14%", left: "6%" }} />
        <Confetti shape="zigzag" color="var(--nd-periwinkle)" size={92} rotate={-8} style={{ top: "30%", left: "3%" }} />
        <Confetti shape="ring" color="var(--nd-turquoise)" size={58} motion="sway" style={{ bottom: "26%", left: "8%" }} />
        <Confetti shape="squiggle" color="var(--nd-lime)" size={96} rotate={6} style={{ top: "18%", right: "4%" }} />
        <Confetti shape="burst" color="var(--nd-sun-yellow)" size={46} motion="spin" style={{ top: "38%", right: "9%" }} />
        <Confetti shape="dots" color="var(--nd-salmon-pink)" size={64} rotate={-12} style={{ bottom: "30%", right: "5%" }} />

        <div className="nd-wrap" style={{ position: "relative", zIndex: 1 }}>
          <p className="nd-heading" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            ✦ AI Educator · Founder · Creator ✦
          </p>

          <h1
            className="nd-display"
            style={{ textAlign: "center", marginTop: "clamp(24px,4vw,40px)" }}
          >
            <Letter char="M" shape="dot" color="var(--nd-sun-yellow)" />
            <Letter char="i" />
            <Letter char="k" shape="swatch" color="var(--nd-turquoise)" />
            <Letter char="a" />{" "}
            <Letter char="R" shape="dot" color="var(--nd-salmon-pink)" />
            <Letter char="e" />
            <Letter char="y" shape="swatch" color="var(--nd-lime)" />
            <Letter char="e" />
            <Letter char="s" shape="dot" color="var(--nd-periwinkle)" anchor="x" />
          </h1>

          <p
            className="nd-body-lg"
            style={{
              maxWidth: "640px",
              margin: "clamp(24px,4vw,36px) auto 0",
              textAlign: "center",
            }}
          >
            Founder and knowledge creator. I help high-achieving professionals use AI to
            build ambitious, time-rich careers, wealth and lives.
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
            {/* Salmon now carries the buttons, so the big decorative masses
                here are yellow and turquoise — a salmon blob this size would
                pull rank on the CTA sitting right above it. */}
            <Confetti
              shape="disc"
              color="var(--nd-sun-yellow)"
              size={104}
              motion="bob"
              always
              style={{ top: "-38px", left: "-38px" }}
            />
            <Confetti
              shape="triangle"
              color="var(--nd-lime)"
              size={66}
              rotate={18}
              motion="sway"
              always
              style={{ bottom: "-30px", right: "34px" }}
            />
            <Confetti
              shape="capsule"
              color="var(--nd-turquoise)"
              size={78}
              rotate={12}
              always
              style={{ top: "-30px", right: "-26px" }}
            />
          </figure>
        </div>
      </header>

      {/* ── Press strip ─────────────────────────────────── */}
      <section aria-label="Press coverage" style={{ position: "relative" }}>
        <Confetti shape="cross" color="var(--nd-salmon)" size={26} motion="bob" style={{ top: "34%", left: "3%" }} />
        <Confetti shape="dots" color="var(--nd-turquoise)" size={46} style={{ top: "40%", right: "3%" }} />

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
        <Confetti shape="disc" color="var(--nd-sun-yellow)" size={110} motion="bob" style={{ top: "10%", left: "20px" }} />
        <Confetti shape="triangle" color="var(--nd-salmon)" size={72} rotate={-14} style={{ top: "26%", right: "28px" }} />
        <Confetti shape="sparkle" color="var(--nd-lime)" size={40} motion="spin" style={{ top: "6%", right: "12%" }} />
        <Confetti shape="arc" color="var(--nd-salmon-pink)" size={78} rotate={-18} motion="sway" style={{ top: "44%", left: "6%" }} />
        <Confetti shape="blob" color="var(--nd-periwinkle)" size={132} rotate={-8} style={{ bottom: "12%", left: "24px" }} />
        <Confetti shape="capsule" color="var(--nd-turquoise)" size={104} rotate={11} style={{ bottom: "18%", right: "24px" }} />
        <Confetti shape="cross" color="var(--nd-sun-yellow)" size={34} motion="bob" style={{ bottom: "34%", right: "11%" }} />
        <Confetti shape="ring" color="var(--nd-lime)" size={52} style={{ bottom: "6%", left: "13%" }} />

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

      {/* ── Awards ──────────────────────────────────────── */}
      <section className="nd-section" style={{ paddingBlock: "clamp(40px,6vw,64px)" }}>
        <Confetti shape="sparkle" color="var(--nd-sun-yellow)" size={38} motion="spin" style={{ top: "22%", left: "5%" }} />
        <Confetti shape="squiggle" color="var(--nd-periwinkle)" size={80} rotate={-10} style={{ bottom: "18%", right: "4%" }} />

        <div className="nd-wrap">
          <p className="nd-caption" style={{ textAlign: "center", letterSpacing: "0.04em" }}>
            Awards &amp; fellowships
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            {awards.map(({ label, bg }) => (
              <span
                key={label}
                className="nd-body"
                style={{
                  background: bg,
                  color: "var(--nd-ink)",
                  borderRadius: "var(--nd-radius)",
                  padding: "12px 18px",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Start here: 4-column card grid ──────────────── */}
      <section className="nd-section" style={{ paddingTop: 0 }}>
        <Confetti shape="zigzag" color="var(--nd-lime)" size={84} rotate={6} style={{ top: "6%", left: "2%" }} />
        <Confetti shape="ring" color="var(--nd-salmon)" size={54} motion="sway" style={{ top: "4%", right: "3%" }} />
        <Confetti shape="blob" color="var(--nd-salmon-pink)" size={96} rotate={14} style={{ bottom: "8%", left: "1%" }} />
        <Confetti shape="burst" color="var(--nd-turquoise)" size={40} motion="spin" style={{ bottom: "14%", right: "2%" }} />

        <div className="nd-wrap">
          <h2 className="nd-heading" style={{ textAlign: "center", marginBottom: "36px" }}>
            Start here
          </h2>

          <div className="nd-grid">
            {startHere.map(({ tag, title, blurb, href, img, bg }) => (
              <Link
                key={href}
                href={href}
                className="nd-card"
                style={{ background: bg, display: "block" }}
              >
                <Image
                  src={img}
                  alt=""
                  aria-hidden="true"
                  width={400}
                  height={220}
                  unoptimized
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                />
                <span
                  className="nd-tag"
                  style={{ background: "var(--nd-paper)", marginTop: "16px" }}
                >
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

      {/* ── Speaking ────────────────────────────────────── */}
      <section className="nd-section" style={{ paddingTop: 0 }}>
        <Confetti shape="arc" color="var(--nd-sun-yellow)" size={72} rotate={12} motion="bob" style={{ top: "8%", left: "2%" }} />
        <Confetti shape="capsule" color="var(--nd-salmon-pink)" size={78} rotate={-14} style={{ bottom: "16%", right: "2%" }} />

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
                height: "clamp(220px,32vw,340px)",
                objectFit: "cover",
                objectPosition: "72% center",
                borderRadius: "var(--nd-radius)",
              }}
            />

            <div>
              <span className="nd-tag" style={{ background: "var(--nd-paper)" }}>
                SPEAKING
              </span>

              <h2 className="nd-heading-lg" style={{ marginTop: "16px" }}>
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

        {/* ── Press preview ───────────────────────────────── */}
        <section className="nd-section" style={{ paddingTop: 0 }}>
          <Confetti shape="dots" color="var(--nd-lime)" size={54} rotate={8} style={{ top: "4%", left: "1%" }} />
          <Confetti shape="sparkle" color="var(--nd-salmon)" size={36} motion="bob" style={{ bottom: "10%", right: "2%" }} />

          <div className="nd-wrap">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "16px",
                marginBottom: "28px",
              }}
            >
              <h2 className="nd-heading">In the press</h2>
              <Link href="/press" className="nd-ghost">
                All coverage
              </Link>
            </div>

            <div className="nd-grid">
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
                  <span
                    className="nd-tag"
                    style={{ background: "var(--nd-sand)", marginTop: "20px" }}
                  >
                    READ →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────── */}
        <section id="contact" className="nd-section" style={{ paddingTop: 0 }}>
          <Confetti shape="zigzag" color="var(--nd-turquoise)" size={88} rotate={-6} style={{ top: "4%", left: "1%" }} />
          <Confetti shape="cross" color="var(--nd-periwinkle)" size={34} motion="spin" style={{ bottom: "12%", left: "3%" }} />
          <Confetti shape="ring" color="var(--nd-salmon)" size={58} motion="sway" style={{ top: "8%", right: "1%" }} />

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
              <span className="nd-badge" aria-hidden="true">
                M
              </span>
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
