import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How One Founder Runs a $6M Company With Zero Employees",
};

const LIB = "/decks/_library";

/** A big emoji centered in its container — the per-step visual for StepsSlide. */
function StepEmoji({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-pop text-8xl leading-none sm:text-9xl" aria-hidden>
      {children}
    </div>
  );
}

const steps: React.ReactNode[] = [
  "Wake up on their own",
  "Check each business",
  "Pick the highest-leverage move",
  "Do it",
  "Email you a report",
];

/**
 * One entry per spoken beat in the script. Order matters — Mika advances with
 * the arrow keys / on-screen arrows while recording.
 */
const slides: React.ReactNode[] = [
  // 1 — "A $6M company. Zero employees."
  <TextSlide key="hook" display>
    A <HL>$6M</HL> company. <HL delay={0.4}>Zero employees</HL>.
  </TextSlide>,

  // 2 — "6,000 businesses run while he sleeps."
  <ImageSlide
    key="sleeping"
    src={`${LIB}/working-while-sleeping.webp`}
    alt="A person asleep in bed as AI agents work overnight."
    caption={
      <>
        6,000 businesses run <A>while he sleeps</A>
      </>
    }
  />,

  // 3 — "Ben Broca/Cera built Polsia."
  <ImageSlide
    key="ben-cera"
    framed
    src={`${LIB}/ben-cera.png`}
    alt="Ben Broca/Cera, the founder of Polsia."
    caption={
      <>
        Ben Broca/Cera built <A>Polsia</A>
      </>
    }
  />,

  // 4 — "Most AI tools just wait for you."
  <ImageSlide
    key="ai-agent"
    src={`${LIB}/ai-agent.webp`}
    alt="An AI agent / chatbot icon."
    caption={
      <>
        Most AI tools just <A>wait for you</A>
      </>
    }
  />,

  // 5 — "Polsia doesn't wait."
  <ImageSlide
    key="polsia-doesnt-wait"
    src={`${LIB}/polsia-homepage.png`}
    alt="The Polsia homepage."
    caption={
      <>
        Polsia <A>doesn&apos;t wait</A>
      </>
    }
  />,

  // 6 — "The agents wake up on their own."
  <StepsSlide
    key="step-0"
    steps={steps}
    current={0}
    visual={<StepEmoji>🌙</StepEmoji>}
  />,

  // 7 — "They check each business."
  <StepsSlide
    key="step-1"
    steps={steps}
    current={1}
    visual={<StepEmoji>📊</StepEmoji>}
  />,

  // 8 — "They pick the highest-leverage move."
  <StepsSlide
    key="step-2"
    steps={steps}
    current={2}
    visual={<StepEmoji>🎯</StepEmoji>}
  />,

  // 9 — "They do it."
  <StepsSlide
    key="step-3"
    steps={steps}
    current={3}
    visual={<StepEmoji>⚙️</StepEmoji>}
  />,

  // 10 — "And they email you a report."
  <StepsSlide
    key="step-4"
    steps={steps}
    current={4}
    visual={<StepEmoji>📧</StepEmoji>}
  />,

  // 11 — "A whole team of agents."
  <ImageSlide
    key="polsia-team"
    framed
    src={`${LIB}/polsia-team.png`}
    alt="Polsia's roster of specialized agents."
    caption={
      <>
        A whole <A>team</A> of agents
      </>
    }
  />,

  // 12 — "6,000 companies. 25,000 tasks a day. $800 a month."
  <TextSlide key="numbers">
    <HL>6,000</HL> companies
    <br />
    <HL delay={0.3}>25,000</HL> tasks a day
    <br />
    <HL delay={0.6}>$800</HL> a month
  </TextSlide>,

  // 13 — "But real talk: ~50% churn."
  <TextSlide key="churn">
    But real talk: <HL delay={0.4}>~50% churn</HL>.
  </TextSlide>,

  // 14 — "You don't need to be technical to build."
  <TextSlide key="not-technical">
    You don&apos;t need to be <HL delay={0.4}>technical</HL> to build.
  </TextSlide>,

  // 15 — CTA
  <CtaSlide
    key="cta"
    sub="and I'll send my Polsia guide."
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Preview of Mika's AI guides"
  />,
];

export default function PolsiaOnePersonBusinessDeckPage() {
  return <Deck slides={slides} />;
}
