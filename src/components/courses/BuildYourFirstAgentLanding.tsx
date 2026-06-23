import Image from "next/image";

import {
  BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL,
  BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE,
  BUILD_YOUR_FIRST_AGENT_PRICE,
  buildYourFirstAgentFaqs,
  buildYourFirstAgentModules,
  buildYourFirstAgentTestimonials,
  buildYourFirstAgentValueStack,
} from "@/lib/courses/build-your-first-agent";

const sectionPad = "72px 0";
const container = "mx-auto max-w-6xl px-6 md:px-10";

const credibility = [
  { value: "20K+", label: "Community" },
  { value: "#1", label: "Trending Maven workshop" },
  { value: "Forbes", label: "30 Under 30" },
  { value: "$499", label: "Paid by live cohort" },
];

function EnrollCta({
  label = "Enroll for $37",
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
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.08)",
                  color: "#F4B8C0",
                  padding: "7px 16px",
                  borderRadius: "var(--mr-radius-pill)",
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "var(--mr-text-xs)",
                  fontWeight: "var(--mr-weight-display)",
                  marginBottom: "24px",
                }}
              >
                ✦ Self-paced · Was ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} live
              </span>

              <h1
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "clamp(40px, 5.5vw, 64px)",
                  fontWeight: "var(--mr-weight-display)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  marginBottom: "20px",
                  maxWidth: "720px",
                }}
              >
                Build your first AI agent — without writing code
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
                The same curriculum founders paid ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE}{" "}
                for in a live cohort — now self-paced, templates included, and
                priced for solo builders who want results this week, not next quarter.
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
                  <s style={{ opacity: 0.7 }}>${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE}</s>
                  {" → "}
                  <strong style={{ color: "#fff" }}>${BUILD_YOUR_FIRST_AGENT_PRICE}</strong>
                  {" · lifetime access"}
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
                You&apos;ll ship
              </p>
              <ul className="space-y-4">
                {[
                  "A working agent on real tasks",
                  "Reusable context + skill templates",
                  "A tool-connected workflow (MCP-ready)",
                  "A playbook to add more agents later",
                ].map((item) => (
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

      {/* Social proof */}
      <section style={{ padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ Social proof</SectionEyebrow>
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
            Taught live to operators, founders, and marketers who paid full price.
            These are representative outcomes from the cohort — swap in your final
            testimonials when ready.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {buildYourFirstAgentTestimonials.map(({ quote, name, role }) => (
              <blockquote
                key={name}
                className="mr-lift flex h-full flex-col"
                style={{
                  background: "var(--mr-surface)",
                  border: "1px solid var(--mr-border)",
                  borderRadius: "var(--mr-radius-card)",
                  padding: "24px",
                  boxShadow: "var(--mr-shadow-card)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.65,
                    flex: 1,
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="mt-5 pt-4" style={{ borderTop: "1px solid var(--mr-border-warm)" }}>
                  <p
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-sm)",
                      fontWeight: "var(--mr-weight-display)",
                      color: "var(--mr-ink)",
                    }}
                  >
                    {name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--mr-font-body)",
                      fontSize: "var(--mr-text-xs)",
                      color: "var(--mr-muted)",
                      marginTop: "2px",
                    }}
                  >
                    {role}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section style={{ background: "var(--mr-surface-rose)", padding: sectionPad }}>
        <div className={container}>
          <SectionEyebrow>✦ What&apos;s inside</SectionEyebrow>
          <SectionTitle>6 modules. One shipped agent.</SectionTitle>
          <p
            className="mt-4 max-w-2xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.6,
            }}
          >
            Each module ends with a concrete build block. By the end you have an
            agent — not a folder of half-finished notes.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {buildYourFirstAgentModules.map(({ num, title, description }) => (
              <article
                key={num}
                className="mr-lift"
                style={{
                  background: "var(--mr-surface)",
                  border: "1px solid var(--mr-border-rose)",
                  borderRadius: "var(--mr-radius-card)",
                  padding: "24px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-xs)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-coral)",
                  }}
                >
                  Module {num}
                </span>
                <h3
                  className="mt-2"
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Price juxtaposition */}
      <section style={{ padding: sectionPad }}>
        <div className={container}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <div>
              <SectionEyebrow>✦ The math</SectionEyebrow>
              <SectionTitle>
                ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} of value. ${BUILD_YOUR_FIRST_AGENT_PRICE} today.
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
                Live cohort students paid ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} for
                access, accountability, and live builds. You get the core curriculum,
                templates, and replays — without the cohort schedule.
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
                One-time payment. Lifetime access. The price of a nice dinner —
                for a skill that pays back every week.
              </p>

              <div className="mt-6">
                <EnrollCta location="pricing-card" label="Get instant access" />
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

      {/* Instructor */}
      <section style={{ background: "var(--mr-surface-cream)", padding: sectionPad }}>
        <div className={`${container} grid items-center gap-10 md:grid-cols-[120px_1fr]`}>
          <Image
            src="/mika-reyes.jpg"
            alt="Mika Reyes"
            width={120}
            height={120}
            className="rounded-full"
            style={{ boxShadow: "var(--mr-shadow-frame)" }}
          />
          <div>
            <SectionEyebrow>✦ Your instructor</SectionEyebrow>
            <h2
              style={{
                fontFamily: "var(--mr-font-display)",
                fontSize: "var(--mr-text-h2)",
                fontWeight: "var(--mr-weight-display)",
                color: "var(--mr-ink)",
              }}
            >
              Mika Reyes
            </h2>
            <p
              className="mt-3 max-w-2xl"
              style={{
                fontFamily: "var(--mr-font-body)",
                fontSize: "var(--mr-text-body)",
                color: "var(--mr-text-soft)",
                lineHeight: 1.6,
              }}
            >
              Forbes 30 Under 30 founder and AI educator. I teach non-technical
              professionals to build with AI — not just chat with it. My live
              workshops have hit #1 trending on Maven; this course packages that
              build path for people who learn better on their own schedule.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: sectionPad }}>
        <div className={`${container} max-w-3xl`}>
          <SectionEyebrow>✦ FAQ</SectionEyebrow>
          <SectionTitle>Questions before you enroll</SectionTitle>
          <dl className="mt-10 space-y-8">
            {buildYourFirstAgentFaqs.map(({ question, answer }) => (
              <div key={question}>
                <dt
                  style={{
                    fontFamily: "var(--mr-font-display)",
                    fontSize: "var(--mr-text-body)",
                    fontWeight: "var(--mr-weight-display)",
                    color: "var(--mr-ink)",
                  }}
                >
                  {question}
                </dt>
                <dd
                  className="mt-2"
                  style={{
                    fontFamily: "var(--mr-font-body)",
                    fontSize: "var(--mr-text-sm)",
                    color: "var(--mr-text-soft)",
                    lineHeight: 1.65,
                  }}
                >
                  {answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: "var(--mr-surface-rose-2)",
          padding: "80px 0",
          borderTop: "1px solid var(--mr-border-rose)",
        }}
      >
        <div className={`${container} text-center`}>
          <h2
            style={{
              fontFamily: "var(--mr-font-display)",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: "var(--mr-weight-display)",
              color: "var(--mr-ink)",
              letterSpacing: "-0.02em",
              maxWidth: "640px",
              margin: "0 auto 16px",
            }}
          >
            Stop prompting. Start building.
          </h2>
          <p
            className="mx-auto max-w-xl"
            style={{
              fontFamily: "var(--mr-font-body)",
              fontSize: "var(--mr-text-body)",
              color: "var(--mr-text-soft)",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            Join the self-paced course — ${BUILD_YOUR_FIRST_AGENT_PRICE} today,
            was ${BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE} live.
          </p>
          <EnrollCta location="footer" label="Enroll now — $37" />
        </div>
      </section>
    </main>
  );
}
