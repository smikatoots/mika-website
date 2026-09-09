import Image from "next/image";
import Link from "next/link";

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
  { label: "SPC Founder Fellow", bg: "var(--nd-soft-salmon)" },
];

const pressLogos = [
  { label: "Forbes", logo: "/press-logos/forbes.svg", h: 20 },
  { label: "TechCrunch", logo: "/press-logos/techcrunch-icon.svg", h: 26 },
  { label: "Yahoo!", logo: "/press-logos/yahoo.svg", h: 22 },
  { label: "Tech in Asia", logo: "/press-logos/tech-in-asia.png", h: 22 },
  { label: "Rappler", logo: "/press-logos/rappler.png", h: 26 },
  { label: "Inquirer", logo: "/press-logos/inquirer.svg", h: 18 },
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
    bg: "var(--nd-sand)",
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
    The shape is deliberately smaller than the glyph and offset, so it reads as
    a sticker pressed onto the page rather than a highlight over the letter. */
function Letter({
  char,
  shape,
}: {
  char: string;
  shape?: React.ReactNode;
}) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      {shape ? (
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {shape}
        </span>
      ) : null}
      <span style={{ position: "relative", zIndex: 1 }}>{char}</span>
    </span>
  );
}

const dot = (color: string) => (
  <span
    className="nd-circle"
    style={{
      position: "absolute",
      width: "0.44em",
      height: "0.44em",
      background: color,
      top: "-0.04em",
      left: "-0.14em",
    }}
  />
);

const swatch = (color: string) => (
  <span
    style={{
      position: "absolute",
      width: "0.46em",
      height: "0.34em",
      background: color,
      borderRadius: "var(--nd-radius)",
      bottom: "0.02em",
      right: "-0.12em",
      transform: "rotate(-7deg)",
    }}
  />
);

export default function NewDesignPage() {
  return (
    <>
      <NewDesignNav />

      {/* ── Hero ────────────────────────────────────────── */}
      <header className="nd-section" style={{ position: "relative", overflow: "hidden" }}>
        <div className="nd-wrap">
          <p className="nd-heading" style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}>
            A way better way of working.
          </p>

          <h1
            className="nd-display"
            style={{ textAlign: "center", marginTop: "clamp(24px,4vw,40px)" }}
          >
            <Letter char="M" shape={dot("var(--nd-sun-yellow)")} />
            <Letter char="I" />
            <Letter char="K" shape={swatch("var(--nd-turquoise)")} />
            <Letter char="A" />
            <span style={{ display: "inline-block", width: "0.3em" }} />
            <Letter char="R" shape={dot("var(--nd-soft-salmon)")} />
            <Letter char="E" />
            <Letter char="Y" shape={swatch("var(--nd-lime)")} />
            <Letter char="E" />
            <Letter char="S" shape={dot("var(--nd-periwinkle)")} />
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
            <span
              className="nd-shape nd-circle"
              aria-hidden="true"
              style={{
                width: "96px",
                height: "96px",
                background: "var(--nd-salmon)",
                top: "-34px",
                left: "-34px",
              }}
            />
            <span
              className="nd-shape nd-triangle"
              aria-hidden="true"
              style={{
                ["--s" as string]: "34px",
                ["--c" as string]: "var(--nd-sun-yellow)",
                bottom: "-28px",
                right: "24px",
                transform: "rotate(18deg)",
              }}
            />
            <span
              className="nd-shape"
              aria-hidden="true"
              style={{
                width: "72px",
                height: "56px",
                background: "var(--nd-turquoise)",
                borderRadius: "var(--nd-radius)",
                top: "-24px",
                right: "-22px",
                transform: "rotate(9deg)",
              }}
            />
          </figure>
        </div>
      </header>

      {/* ── Press strip ─────────────────────────────────── */}
      <section aria-label="Press coverage">
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
          {pressLogos.map(({ label, logo, h }) => (
            <Image
              key={label}
              src={logo}
              alt={label}
              width={140}
              height={h}
              unoptimized
              style={{ height: `${h}px`, width: "auto", opacity: 0.72 }}
            />
          ))}
        </div>
        <hr className="nd-rule" />
      </section>

      {/* ── Dark editorial band — the one per page ──────── */}
      <section className="nd-dark nd-section">
        {/* Collage atmosphere */}
        <span
          className="nd-shape nd-circle"
          aria-hidden="true"
          style={{ width: "120px", height: "120px", background: "var(--nd-sun-yellow)", top: "8%", left: "4%" }}
        />
        <span
          className="nd-shape nd-triangle"
          aria-hidden="true"
          style={{ ["--s" as string]: "42px", ["--c" as string]: "var(--nd-salmon)", top: "18%", right: "8%", transform: "rotate(-14deg)" }}
        />
        <span
          className="nd-shape"
          aria-hidden="true"
          style={{
            width: "150px",
            height: "90px",
            background: "var(--nd-periwinkle)",
            borderRadius: "var(--nd-radius)",
            bottom: "10%",
            left: "7%",
            transform: "rotate(-8deg)",
            opacity: 0.9,
          }}
        />
        <span
          className="nd-shape"
          aria-hidden="true"
          style={{
            width: "110px",
            height: "70px",
            background: "var(--nd-turquoise)",
            borderRadius: "var(--nd-radius)",
            bottom: "16%",
            right: "6%",
            transform: "rotate(11deg)",
          }}
        />

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
