import Image from "next/image";

import {
  BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL,
  BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE,
  BUILD_YOUR_FIRST_AGENT_PRICE,
  buildYourFirstAgentFaqs,
  buildYourFirstAgentForYou,
  buildYourFirstAgentIncluded,
  buildYourFirstAgentInstructors,
  buildYourFirstAgentModules,
  buildYourFirstAgentNotForYou,
  buildYourFirstAgentOutcomes,
  buildYourFirstAgentPainPoints,
  buildYourFirstAgentProofShots,
  buildYourFirstAgentValueStack,
} from "@/lib/courses/build-your-first-agent";

const sectionPad = "72px 0";
const container = "mx-auto max-w-6xl px-6 md:px-10";

const credibility = [
  { value: "1,300+", label: "Sign ups to our first lesson" },
  { value: "2", label: "AI instructors with 1,000+ hours of AI" },
  { value: "20K+", label: "Community" },
  { value: "#1", label: "Trending Maven workshop" },
];

function EnrollCta({
  label = "Enroll now",
  location,
}: {
  label?: string;
  location: string;
}) {
  return (
    <a
      href={BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL}
      className="mr-pressable inline-flex items-center justify-center"
      data-cta-location={location}
      style={{
        background: "var(--mr-coral)",
        color: "#fff",
        fontFamily: "var(--mr-font-body)",
        fontSize: "var(--mr-text-body)",
        fontWeight: "var(--mr-weight-semi)",
        padding: "16px 32px",
        borderRadius: "var(--mr-radius-pill)",
        boxShadow: "var(--mr-shadow-cta)",
        textDecoration: "none",
      }}
    >
      {label} →
    </a>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--mr-font-body)",
        fontSize: "var(--mr-text-eyebrow)",
        fontWeight: "var(--mr-weight-display)",
        color: "var(--mr-coral)",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        marginBottom: "16px",
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--mr-font-display)",
        fontSize: "clamp(32px, 4vw, 44px)",
        fontWeight: "var(--mr-weight-display)",
        letterSpacing: "-0.02em",
        lineHeight: 1.05,
        color: "var(--mr-ink)",
      }}
    >
      {children}
    </h2>
  );
}

function QualList({
  title,
  items,
  variant,
}: {
  title: string;
  items: readonly string[];
  variant: "for" | "against";
}) {
  const isFor = variant === "for";

  return (
    <div
      style={{
        background: isFor ? "var(--mr-surface)" : "var(--mr-surface-cream)",
        border: isFor
          ? "1px solid var(--mr-border)"
          : "1px solid var(--mr-border-warm)",
        borderRadius: "var(--mr-radius-panel)",
        padding: "28px 24px",
        boxShadow: isFor ? "var(--mr-shadow-card)" : "none",
      }}
    >
      <p
        style={{
          fontFamily: "var(--mr-font-body)",
          fontSize: "var(--mr-text-eyebrow)",
          fontWeight: "var(--mr-weight-display)",
          color: "var(--mr-coral)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "20px",
        }}
      >
        {title}
      </p>
      <ul>
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-3"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-sm)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.55,
              padding: "14px 0",
              borderTop: index === 0 ? "none" : "1px solid var(--mr-border-warm)",
            }}
          >
            <span
              aria-hidden
              style={{
                color: isFor ? "var(--mr-coral)" : "var(--mr-muted)",
                fontWeight: "var(--mr-weight-display)",
                flexShrink: 0,
              }}
            >
              {isFor ? "✓" : "×"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BuildYourFirstAgentLanding() {
  const valueTotal = buildYourFirstAgentValueStack.reduce(
    (sum, row) => sum + row.value,
    0,
  );
  const savings = valueTotal - BUILD_YOUR_FIRST_AGENT_PRICE;

  return (
    <main>
      {/* Hero */}
      <section style={{ background: "var(--mr-teal-deep)", padding: "80px 0 88px" }}>
        <div className={container}>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <h1
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(36px, 5vw, 58px)",
                  fontWeight: "var(--mr-weight-display)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  marginBottom: "20px",
                  maxWidth: "720px",
                }}
              >
                Build your own AI agent in 1 day.{" "}
                <span style={{ color: "#F4B8C0" }}>
                  Skip 6 months of trial &amp; error.
                </span>
              </h1>

              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-lead)",
                  color: "rgba(255,255,255,0.78)",
                  lineHeight: 1.55,
                  maxWidth: "560px",
                  marginBottom: "32px",
                }}
              >
                The abbreviated, self-paced version of our hands-on workshop.
                Same build path Mika &amp; Nick teach live — context files,
                custom skills, MCPs, and a working agent for your role.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <EnrollCta location="hero" />
                <span
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                >
                  Lifetime access · no coding required
                </span>
              </div>
            </div>

            <div
              className="mr-lift hidden lg:block"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "var(--mr-radius-panel)",
                padding: "28px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                  fontWeight: "var(--mr-weight-display)",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "16px",
                }}
              >
                By the end you&apos;ll have
              </p>
              <ul className="space-y-4">
                {buildYourFirstAgentOutcomes.slice(0, 4).map((item) => (
                  <li
                    key={item}
                    className="flex gap-3"
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      color: "rgba(255,255,255,0.88)",
                      lineHeight: 1.45,
                    }}
                  >
                    <span style={{ color: "var(--mr-coral-bright)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section style={{ background: "var(--mr-surface-cream)", padding: "32px 0" }}>
        <div className={`${container} grid grid-cols-2 gap-6 md:grid-cols-4`}>
          {credibility.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "var(--mr-text-stat)",
                  fontWeight: "var(--mr-weight-display)",
                  color: "var(--mr-ink)",
                  lineHeight: 1,
                }}
              >
                {value}
              </p>
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                  color: "var(--mr-muted)",
                  marginTop: "8px",
                }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ The problem</SectionEyebrow>
          <h2
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(28px, 3.4vw, 40px)",
              fontWeight: "var(--mr-weight-display)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "var(--mr-ink)",
              maxWidth: "100%",
            }}
          >
            AI is moving fast. For most non-technical professionals, it feels…
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {buildYourFirstAgentPainPoints.map(({ title, body }) => (
              <div
                key={title}
                style={{
                  background: "var(--mr-surface)",
                  border: "1px solid var(--mr-border)",
                  borderRadius: "var(--mr-radius-card)",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-h3)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-coral)",
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.55,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-10"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.7,
              maxWidth: "100%",
            }}
          >
            We&apos;ve spent 1,000+ hours learning (and failing) in Claude so you
            don&apos;t have to. We&apos;ve built and shipped software used by
            millions, and we&apos;ve sat on both sides of the table: technical and
            non-technical. We built our own AI-native operating system from
            scratch. This course is the shortcut we wish we had.
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              fontWeight: "var(--mr-weight-semi)",
              lineHeight: 1.6,
              maxWidth: "100%",
            }}
          >
            In one day, you&apos;ll learn more than most people piece together
            over months of trial and error.
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ background: "var(--mr-surface-rose)", padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ Testimonials</SectionEyebrow>
          <SectionTitle>Built for people who ship, not slide-watch</SectionTitle>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.6,
            }}
          >
            Taught live to founders, operators, and marketers in small cohorts.
          </p>
        </div>

        <div className="byfa-proof-marquee mt-10" style={{ overflow: "hidden", width: "100%" }}>
          <div className="byfa-proof-marquee__track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-stretch gap-5 pr-5"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {buildYourFirstAgentProofShots.map(({ id, src, alt, width, height }) => (
                  <figure
                    key={`${copy}-${id}`}
                    className="shrink-0"
                    style={{
                      width: "min(640px, 92vw)",
                      background: "var(--mr-surface)",
                      border: "1px solid var(--mr-border)",
                      borderRadius: "var(--mr-radius-card)",
                      overflow: "hidden",
                      boxShadow: "var(--mr-shadow-card)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      width={width}
                      height={height}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 92vw, 640px"
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>
          <style>{`
            .byfa-proof-marquee__track {
              animation: ke-marquee 50s linear infinite;
            }
            .byfa-proof-marquee:hover .byfa-proof-marquee__track {
              animation-play-state: paused;
            }
            @media (prefers-reduced-motion: reduce) {
              .byfa-proof-marquee__track {
                animation: none !important;
              }
            }
          `}</style>
        </div>
      </section>

      {/* Outcomes */}
      <section style={{ padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ Outcomes</SectionEyebrow>
          <SectionTitle>By the end of this course, you will have:</SectionTitle>
          <ul className="mt-10 max-w-3xl space-y-4">
            {buildYourFirstAgentOutcomes.map((item) => (
              <li
                key={item}
                className="flex gap-3"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  color: "var(--mr-text-soft)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    color: "var(--mr-coral)",
                    fontWeight: "var(--mr-weight-display)",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p
            className="mt-8 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-sm)",
              color: "var(--mr-muted)",
              lineHeight: 1.6,
            }}
          >
            This is a 101 hands-on build — not a passive webinar. The live
            version keeps cohorts small and intimate. This self-paced version
            keeps the same build sequence, on your schedule.
          </p>
        </div>
      </section>

      {/* Curriculum */}
      <section style={{ background: "var(--mr-surface-rose)", padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ What you&apos;ll learn</SectionEyebrow>
          <SectionTitle>
            Build your own AI agent — and learn how to do it on your own.
          </SectionTitle>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.6,
            }}
          >
            Five modules. Each one ends with a concrete build block. By the end
            you have an agent — not a folder of half-finished notes.
          </p>

          <div className="mt-10 space-y-4">
            {buildYourFirstAgentModules.map(
              ({ num, title, description, bullets }) => (
                <article
                  key={num}
                  className="mr-lift"
                  style={{
                    background: "var(--mr-surface)",
                    border: "1px solid var(--mr-border-rose)",
                    borderRadius: "var(--mr-radius-card)",
                    padding: "28px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--mr-font-body)",
                        fontSize: "var(--mr-text-eyebrow)",
                        fontWeight: "var(--mr-weight-display)",
                        color: "var(--mr-coral)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: "10px",
                      }}
                    >
                      Module {num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--mr-font-display)",
                        fontSize: "var(--mr-text-h3)",
                        fontWeight: "var(--mr-weight-display)",
                        color: "var(--mr-ink)",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="mt-2"
                      style={{
                        fontFamily: "var(--mr-font-body)",
                        fontSize: "var(--mr-text-sm)",
                        color: "var(--mr-text-soft)",
                        lineHeight: 1.6,
                      }}
                    >
                      {description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2"
                          style={{
                            fontFamily: "var(--mr-font-body)",
                            fontSize: "var(--mr-text-sm)",
                            color: "var(--mr-muted)",
                            lineHeight: 1.45,
                          }}
                        >
                          <span style={{ color: "var(--mr-coral)" }}>→</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section style={{ padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ What&apos;s included</SectionEyebrow>
          <SectionTitle>Everything you need to ship — then keep going.</SectionTitle>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {buildYourFirstAgentIncluded.map(({ title, body }) => (
              <article
                key={title}
                style={{
                  background: "var(--mr-surface)",
                  border: "1px solid var(--mr-border)",
                  borderRadius: "var(--mr-radius-card)",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-body)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                  }}
                >
                  {title}
                </h3>
                <p
                  className="mt-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.55,
                  }}
                >
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Qualification */}
      <section style={{ background: "var(--mr-surface-cream)", padding: sectionPad }}>
        <div className={container}>
          <h2
            className="text-center"
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: "var(--mr-weight-display)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              textTransform: "uppercase",
              marginBottom: "40px",
            }}
          >
            <span style={{ color: "var(--mr-ink)" }}>Read this </span>
            <span style={{ color: "var(--mr-coral)" }}>before you join.</span>
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <QualList
              title="This is for you if"
              items={buildYourFirstAgentForYou}
              variant="for"
            />
            <QualList
              title="This is not for you if"
              items={buildYourFirstAgentNotForYou}
              variant="against"
            />
          </div>

          <div className="mt-10 flex justify-center">
            <EnrollCta location="qualification" label="Enroll now" />
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section style={{ padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ Your instructors</SectionEyebrow>
          <SectionTitle>We&apos;ve clocked 1000+ hours with AI</SectionTitle>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.6,
            }}
          >
            You get 2 for the price of 1! We&apos;re the couple co-founders of an
            AI startup. Collectively, we&apos;ve clocked in 1000+ hours with AI.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {buildYourFirstAgentInstructors.map((instructor) => (
              <article
                key={instructor.name}
                style={{
                  background: "var(--mr-surface)",
                  border: "1px solid var(--mr-border)",
                  borderRadius: "var(--mr-radius-panel)",
                  padding: "28px",
                }}
              >
                <div className="flex items-center gap-4">
                  {instructor.image ? (
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={72}
                      height={72}
                      className="rounded-full"
                      style={{ boxShadow: "var(--mr-shadow-frame)" }}
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 72,
                        height: 72,
                        background: "var(--mr-surface-cream)",
                        border: "1px solid var(--mr-border-warm)",
                        fontFamily: "var(--mr-font-display)",
                        fontWeight: "var(--mr-weight-display)",
                        color: "var(--mr-coral)",
                        fontSize: "18px",
                      }}
                    >
                      {instructor.initials}
                    </div>
                  )}
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--mr-font-display)",
                        fontSize: "var(--mr-text-h3)",
                        fontWeight: "var(--mr-weight-display)",
                        color: "var(--mr-ink)",
                      }}
                    >
                      {instructor.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--mr-font-body)",
                        fontSize: "var(--mr-text-xs)",
                        color: "var(--mr-coral)",
                        marginTop: "4px",
                      }}
                    >
                      {instructor.role}
                    </p>
                  </div>
                </div>
                <p
                  className="mt-5"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.65,
                  }}
                >
                  {instructor.bio}
                </p>
                <div className="mt-5">
                  <p
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-xs)",
                      color: "var(--mr-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "14px",
                    }}
                  >
                    Previously at
                  </p>
                  <ul className="flex flex-wrap items-center gap-x-6 gap-y-4">
                    {instructor.previous.map(({ name, logo }) => (
                      <li key={name}>
                        <Image
                          src={logo}
                          alt={name}
                          width={160}
                          height={40}
                          className="h-7 w-auto object-contain object-left"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ background: "var(--mr-surface-cream)", padding: sectionPad }}>
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <SectionEyebrow>✦ The math</SectionEyebrow>
              <SectionTitle>
                ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} live workshop value. $
                {BUILD_YOUR_FIRST_AGENT_PRICE} self-paced today.
              </SectionTitle>
              <p
                className="mt-4 max-w-xl"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  color: "var(--mr-text-soft)",
                  lineHeight: 1.6,
                }}
              >
                Live cohort students paid ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE}{" "}
                for a small, intimate build day with Mika &amp; Nick in the room.
                You get the abbreviated curriculum, templates, and walkthroughs —
                without the cohort schedule.
              </p>

              <ul className="mt-8 space-y-3">
                {buildYourFirstAgentValueStack.map(({ item, value }) => (
                  <li
                    key={item}
                    className="flex items-center justify-between gap-4"
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      color: "var(--mr-text-soft)",
                      paddingBottom: "12px",
                      borderBottom: "1px solid var(--mr-border-warm)",
                    }}
                  >
                    <span>{item}</span>
                    <span style={{ color: "var(--mr-muted)", whiteSpace: "nowrap" }}>
                      ${value} value
                    </span>
                  </li>
                ))}
                <li
                  className="flex items-center justify-between gap-4 pt-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-body)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                  }}
                >
                  <span>Total value</span>
                  <span>${valueTotal}</span>
                </li>
              </ul>
            </div>

            <aside
              className="sticky top-24"
              style={{
                background: "var(--mr-surface)",
                border: "2px solid var(--mr-coral)",
                borderRadius: "var(--mr-radius-panel)",
                padding: "32px",
                boxShadow: "var(--mr-shadow-lift)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                  fontWeight: "var(--mr-weight-display)",
                  color: "var(--mr-coral)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Self-paced enrollment
              </p>

              <div className="mt-4 flex items-end gap-3">
                <span
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "56px",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                    lineHeight: 1,
                  }}
                >
                  ${BUILD_YOUR_FIRST_AGENT_PRICE}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-body)",
                    color: "var(--mr-muted)",
                    textDecoration: "line-through",
                    marginBottom: "8px",
                  }}
                >
                  ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE}
                </span>
              </div>

              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-sm)",
                  color: "var(--mr-teal)",
                  fontWeight: "var(--mr-weight-semi)",
                }}
              >
                You save ${savings}+ vs. listed value
              </p>

              <p
                className="mt-4"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-sm)",
                  color: "var(--mr-text-soft)",
                  lineHeight: 1.55,
                }}
              >
                One-time payment. Lifetime access. The shortcut we wish we had —
                without six months of trial and error.
              </p>

              <div className="mt-6">
                <EnrollCta location="pricing-card" label="Get instant access" />
              </div>

              <ul className="mt-6 space-y-2">
                {[
                  "Instant access after checkout",
                  "Templates + build walkthroughs",
                  "Claude Pro/Max + Desktop to follow along",
                  "No coding required",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2"
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-xs)",
                      color: "var(--mr-muted)",
                    }}
                  >
                    <span style={{ color: "var(--mr-coral)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: sectionPad }}>
        <div className={`${container} max-w-3xl`}>
          <SectionEyebrow>✦ FAQ</SectionEyebrow>
          <SectionTitle>Questions before you enroll</SectionTitle>
          <div className="mt-10 space-y-3">
            {buildYourFirstAgentFaqs.map(({ question, answer }) => (
              <details
                key={question}
                className="group"
                style={{
                  background: "var(--mr-surface)",
                  border: "1px solid var(--mr-border)",
                  borderRadius: "var(--mr-radius-card)",
                  padding: "4px 20px",
                }}
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden"
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-body)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                  }}
                >
                  <span>{question}</span>
                  <span
                    aria-hidden
                    className="shrink-0 transition-transform duration-200 group-open:rotate-180"
                    style={{
                      color: "var(--mr-coral)",
                      fontSize: "14px",
                    }}
                  >
                    ▾
                  </span>
                </summary>
                <p
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.65,
                    paddingBottom: "18px",
                  }}
                >
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* P.S. */}
      <section
        style={{
          background: "var(--mr-surface-cream)",
          padding: "88px 0",
          borderTop: "1px solid var(--mr-border-warm)",
        }}
      >
        <div className={`${container} mx-auto max-w-2xl text-center`}>
          <p
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-eyebrow)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-coral)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: "28px",
            }}
          >
            P.S. If you only read one thing
          </p>

          <div
            className="space-y-5"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.7,
            }}
          >
            <p>
              We know what it feels like to open Claude and feel like you&apos;re
              already supposed to know what to do. We also know what it feels like
              to watch everyone talk about agents and automations while you&apos;re
              still stuck in another chat window that doesn&apos;t quite get you.
            </p>
            <p>
              The people who get ahead with AI are not the ones who know every
              tool. They are the ones who build the reps — better context,
              clearer skills, real tool connections — until AI stops feeling
              impressive and starts feeling useful.
            </p>
            <p>
              That&apos;s what this self-paced course is for. We&apos;ll show you
              how we think about agents, how we build them, and how to ship your
              first one without writing code. Ready? Let&apos;s go.
            </p>
          </div>

          <p
            className="mt-8"
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "var(--mr-text-body)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-ink)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Mika &amp; Nick
          </p>

          <div className="mt-10">
            <EnrollCta
              location="ps"
              label={`Enroll now — $${BUILD_YOUR_FIRST_AGENT_PRICE}`}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
