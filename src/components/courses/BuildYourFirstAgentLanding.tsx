import Image from "next/image";

import {
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
import { EnrollCta } from "./EnrollCta";
import { GuidePreviewGallery } from "./GuidePreviewGallery";

const sectionPad = "72px 0";
const container = "mx-auto max-w-6xl px-6 md:px-10";

const credibility = [
  { value: "1,300+", label: "Sign ups to our first lesson" },
  { value: "1000+", label: "hours of AI; 2 instructors" },
  { value: "20K+", label: "Community" },
  { value: "#1", label: "Trending Maven workshop" },
];

const learningBenefits = [
  "Having you BUILD and actually create AI agents as you read through the guide",
  "Making the material FUN & memorable (through memes & custom visuals)",
  "Sharing starter prompts you can easily copy & paste to Claude or Codex",
  "Offering a mix of formats: video, text & visuals",
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "var(--mr-font-body)",
        fontSize: "var(--mr-text-eyebrow)",
        fontWeight: "var(--mr-weight-display)",
        // Ink, not coral: an accent is never text, and coral on the
        // bright grounds this page now uses is unreadable.
        color: "var(--mr-ink)",
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
        background: isFor ? "var(--mr-mint)" : "var(--mr-line)",
        border: isFor
          ? "1px solid var(--mr-line)"
          : "1px solid var(--mr-line)",
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
          color: "var(--mr-ink)",
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
              color: "var(--mr-ink)",
              lineHeight: 1.55,
              padding: "14px 0",
              borderTop:
                index === 0 ? "none" : "1px solid var(--mr-line)",
            }}
          >
            <span
              aria-hidden
              style={{
                color: "var(--mr-ink)",
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
  return (
    <main>
      {/* Hero */}
      <section
        style={{ background: "var(--mr-charcoal)", padding: "80px 0 88px" }}
      >
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
                Master agentic AI as a non-technical pro
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
                Build your own custom AI agent in 1 day in a self-paced course.
                Skip 6 months of trial &amp; error.
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
                {buildYourFirstAgentOutcomes.map((item) => (
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
                    <span style={{ color: "var(--mr-white)" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility strip */}
      <section
        style={{ background: "var(--mr-line)", padding: "32px 0" }}
      >
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
                  color: "var(--mr-ink)",
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
                  background: "var(--mr-paper)",
                  border: "1px solid var(--mr-line)",
                  borderRadius: "var(--mr-radius-card)",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-h3)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-ink)",
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
              color: "var(--mr-ink)",
              lineHeight: 1.7,
              maxWidth: "100%",
            }}
          >
            We&apos;ve spent{" "}
            <span>
              <strong>1,000+ hours learning (and failing) with AI</strong>
            </span>{" "}
            so you don&apos;t have to.
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.7,
              maxWidth: "100%",
            }}
          >
            We&apos;ve built and shipped software used by{" "}
            <strong>millions</strong>, and we&apos;ve sat on both sides of the
            table (as <strong>technical and non-technical co-founders</strong>).
            We built our own AI-native operating system from scratch. This guide
            is the <strong>shortcut we wish we had</strong>.
          </p>
          <p
            className="mt-4"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.6,
              maxWidth: "100%",
            }}
          >
            <strong>In one day</strong>, you&apos;ll learn more than most people
            (including us!) piece together over{" "}
            <strong>months of trial and error</strong>.
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section
        style={{ background: "var(--mr-gold)", padding: sectionPad }}
      >
        <div className={container}>
          <SectionEyebrow>✦ Testimonials</SectionEyebrow>
          <SectionTitle>
            Built for people who ship, not slide-watch
          </SectionTitle>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.6,
            }}
          >
            Hear directly about the material, from our amazing students!
          </p>
        </div>

        <div
          className="byfa-proof-marquee mt-10"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <div className="byfa-proof-marquee__track flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex shrink-0 items-stretch gap-5 pr-5"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {buildYourFirstAgentProofShots.map(
                  ({ id, src, alt, width, height }) => (
                    <figure
                      key={`${copy}-${id}`}
                      className="shrink-0"
                      style={{
                        width: "min(640px, 92vw)",
                        background: "var(--mr-paper)",
                        border: "1px solid var(--mr-line)",
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
                  ),
                )}
              </div>
            ))}
          </div>
          <style>{`
            .byfa-proof-marquee__track {
              animation: ke-marquee 50s linear infinite;
            }
            .byfa-proof-marquee:hover .byfa-proof-marquee__track,
            .byfa-proof-marquee__track:hover {
              animation-play-state: paused !important;
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
          <SectionTitle>By the end of this guide, you will have:</SectionTitle>
          <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)]">
            <ul className="space-y-4">
              {buildYourFirstAgentOutcomes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-body)",
                    color: "var(--mr-ink)",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      color: "var(--mr-ink)",
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
            <div
              className="flex items-center"
              style={{
                background: "var(--mr-paper)",
                border: "1px solid var(--mr-line)",
                borderRadius: "var(--mr-radius-card)",
                padding: "24px",
                boxShadow: "var(--mr-shadow-card)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-sm)",
                  color: "var(--mr-ink)",
                  lineHeight: 1.65,
                }}
              >
                This is a guide where you BUILD as you learn, not a passive
                resource. We have two formats: video &amp; text (with visuals).
                We give you starter prompts, and go step by step to walk you
                through building an agent!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning formats */}
      <section
        style={{ background: "var(--mr-mint)", padding: sectionPad }}
      >
        <div className={container}>
          <SectionEyebrow>✦ How you&apos;ll learn</SectionEyebrow>
          <SectionTitle>
            Learn in various formats: video, text &amp; visuals
          </SectionTitle>
          <p
            className="mt-4 max-w-3xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.6,
            }}
          >
            We designed our guide for active learning as it increases retention
            by 75%. We do this by:
          </p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {learningBenefits.map((benefit) => (
              <li
                key={benefit}
                className="flex gap-3"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  color: "var(--mr-ink)",
                  lineHeight: 1.55,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    color: "var(--mr-ink)",
                    fontWeight: "var(--mr-weight-display)",
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <GuidePreviewGallery />
        </div>
      </section>

      {/* Curriculum */}
      <section
        style={{ background: "var(--mr-watermelon)", padding: sectionPad }}
      >
        <div className={container}>
          <SectionEyebrow>✦ What you&apos;ll learn</SectionEyebrow>
          <SectionTitle>
            Build your own custom AI agent &amp; learn how to do it on your own.
          </SectionTitle>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.6,
            }}
          >
            Five core modules plus 1 bonus module! Each one has videos, text,
            visuals and starter prompts for building. By the end, you&apos;ll
            build not 1 but 2 AGENTS (instead of just a folder of unfinished
            notes!)
          </p>

          <div className="mt-10 grid gap-4 md:grid-flow-col md:grid-cols-2 md:grid-rows-3">
            {buildYourFirstAgentModules.map(
              ({ num, title, description, bullets }) => (
                <article
                  key={num}
                  className="mr-lift"
                  style={{
                    background: "var(--mr-paper)",
                    border: "1px solid var(--mr-line)",
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
                        color: "var(--mr-ink)",
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
                        color: "var(--mr-ink)",
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
                            color: "var(--mr-ink)",
                            lineHeight: 1.45,
                          }}
                        >
                          <span style={{ color: "var(--mr-ink)" }}>→</span>
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
          <SectionTitle>
            Everything you need to build an agent on your own!
          </SectionTitle>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {buildYourFirstAgentIncluded.map(({ title, body }) => (
              <article
                key={title}
                style={{
                  background: "var(--mr-paper)",
                  border: "1px solid var(--mr-line)",
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
                    color: "var(--mr-ink)",
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
      <section
        style={{ background: "var(--mr-gold)", padding: sectionPad }}
      >
        <div className={container}>
          <SectionEyebrow>✦ Who this is for and not for</SectionEyebrow>
          <SectionTitle>Read this before you join!</SectionTitle>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
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
          <div
            className="mt-4 space-y-4"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.6,
            }}
          >
            <p>
              We&apos;re a couple co-founders of an AI company (you get 2 for
              the price of 1). Our goal is to help non-technical professionals
              end up on the right side of history, post-AI.
            </p>
            <p>
              We&apos;ve built software at LinkedIn, Microsoft, Airbnb, and
              Google, raised $4.5M, taken AI and software products to production
              and millions of users, and sold a company.
            </p>
            <p>
              We&apos;re excited to share our AI obsession and expertise to more
              people who can benefit!
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {buildYourFirstAgentInstructors.map((instructor) => (
              <article
                key={instructor.name}
                style={{
                  background: "var(--mr-paper)",
                  border: "1px solid var(--mr-line)",
                  borderRadius: "var(--mr-radius-panel)",
                  padding: "28px",
                }}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={72}
                    height={72}
                    className="rounded-full"
                    style={{ boxShadow: "var(--mr-shadow-frame)" }}
                  />
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
                        color: "var(--mr-ink)",
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
                    color: "var(--mr-ink)",
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
                      color: "var(--mr-ink)",
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
                          className={`w-auto object-contain object-left ${
                            name === "South Park Commons" || name === "Phantom"
                              ? "h-8"
                              : "h-7"
                          }`}
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
      <section
        style={{ background: "var(--mr-mint)", padding: sectionPad }}
      >
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
            <div>
              <SectionEyebrow>✦ The math</SectionEyebrow>
              <SectionTitle>
                ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} of value. Invest just $
                {BUILD_YOUR_FIRST_AGENT_PRICE}.
              </SectionTitle>
              <p
                className="mt-4 max-w-xl"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-body)",
                  color: "var(--mr-ink)",
                  lineHeight: 1.6,
                }}
              >
                Our live workshop was $499. We designed a self-paced course,
                with all content from our workshop with a{" "}
                <strong>$461 discount!</strong>
              </p>

              <ul className="mt-8 space-y-3">
                {buildYourFirstAgentValueStack.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3"
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      color: "var(--mr-ink)",
                      paddingBottom: "12px",
                      borderBottom: "1px solid var(--mr-line)",
                    }}
                  >
                    <span style={{ color: "var(--mr-ink)" }}>✓</span>
                    {item}
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
                  <span>Everything included</span>
                  <span>${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} value</span>
                </li>
              </ul>
            </div>

            <div className="sticky top-24">
              <aside
                style={{
                  background: "var(--mr-paper)",
                  border: "2px solid var(--mr-watermelon)",
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
                    color: "var(--mr-ink)",
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
                      fontSize: "28px",
                      color: "var(--mr-ink)",
                      textDecoration: "line-through",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE}
                  </span>
                  <span
                    className="inline-flex rounded-full"
                    style={{
                      background: "var(--mr-mint)",
                      color: "var(--mr-ink)",
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      fontWeight: "var(--mr-weight-display)",
                      lineHeight: 1,
                      marginBottom: "1px",
                      padding: "10px 14px",
                    }}
                  >
                    Save $461!
                  </span>
                </div>

                <div className="mt-6">
                  <EnrollCta
                    location="pricing-card"
                    label="Get instant access"
                  />
                </div>

                <ul className="mt-6 space-y-2">
                  {[
                    "Instant access after checkout",
                    "Templates + build walkthroughs",
                    "No coding required",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-2"
                      style={{
                        fontFamily: "var(--mr-font-body)",
                        fontSize: "var(--mr-text-xs)",
                        color: "var(--mr-ink)",
                      }}
                    >
                      <span style={{ color: "var(--mr-ink)" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </aside>
              <ul className="mt-5 space-y-3">
                <li
                  className="flex gap-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-ink)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "var(--mr-ink)", flexShrink: 0 }}>
                    ✓
                  </span>
                  <span>
                    Everything you build is <strong>yours to keep</strong> and
                    use every day, <strong>for life</strong>.
                  </span>
                </li>
                <li
                  className="flex gap-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-ink)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "var(--mr-ink)", flexShrink: 0 }}>
                    ✓
                  </span>
                  <span>
                    At ${BUILD_YOUR_FIRST_AGENT_PRICE}, you{" "}
                    <strong>make that back</strong> once AI saves you an
                    afternoon.
                  </span>
                </li>
                <li
                  className="flex gap-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-ink)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "var(--mr-ink)", flexShrink: 0 }}>
                    ✓
                  </span>
                  <span>
                    No subscription. <strong>Lifetime access</strong> included.
                  </span>
                </li>
              </ul>
            </div>
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
                  background: "var(--mr-paper)",
                  border: "1px solid var(--mr-line)",
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
                      color: "var(--mr-ink)",
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
                    color: "var(--mr-ink)",
                    lineHeight: 1.65,
                    paddingBottom: "18px",
                    whiteSpace: "pre-line",
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
          background: "var(--mr-line)",
          padding: "88px 0",
          borderTop: "1px solid var(--mr-line)",
        }}
      >
        <div className={`${container} mx-auto max-w-2xl text-center`}>
          <p
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-eyebrow)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-ink)",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: "28px",
            }}
          >
            P.S. If you only read one thing
          </p>

          <div
            className="space-y-5 text-left"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-ink)",
              lineHeight: 1.7,
            }}
          >
            <p>
              Hi! It&apos;s Mika. I personally know what it feels to see &amp;
              hear everyone talk about AI this or AI that &amp; feel overwhelmed
              or confused how to start.
            </p>
            <p>
              I&apos;m non-technical myself &amp; found all the jargon
              overwhelming. But, after my first company exited, I took a real
              break and finally had time to jump into AI. I was also lucky to
              have friends who knew about AI and a husband who was technical who
              I could ask dumb questions to.
            </p>
            <p>
              I spent AT LEAST 6 months and 500+ hours failing with AI, and now
              it saves me time, makes me money and has also unlocked new
              creative tools! It&apos;s made building more fun and made me more
              time-rich.
            </p>
            <p>
              I teach 30k+ followers on socials everything about AI and I keep
              hearing how overwhelmed folks are with it. We created this course
              to help more people out. We&apos;re so grateful it got raving
              reviews &amp; we&apos;re excited to make it more accessible to
              more people!
            </p>
            <p>We&apos;re excited to see you there :)</p>
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
            Mika
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
