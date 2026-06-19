import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, DualImageSlide, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "LLM Council — Karpathy's Fix for Claude the Yes-Man",
};

const LIB = "/decks/_library";

function StepEmoji({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-pop text-8xl leading-none sm:text-9xl" aria-hidden>
      {children}
    </div>
  );
}

const advisorSteps: React.ReactNode[] = [
  "Contrarian — what will fail",
  "Assumption-ripper — tear apart premises",
  "Expansionist — upside you\u2019re missing",
  "Outsider — the dumb questions",
  "Executor — what you\u2019ll do Monday",
];

const slides: React.ReactNode[] = [
  // 1 — Stanford: Claude is a yes-man. Karpathy: here's the fix.
  <DualImageSlide
    key="stanford-karpathy"
    left={{
      src: `${LIB}/stanford-logo.png`,
      alt: "Stanford logo",
    }}
    right={{
      src: `${LIB}/andrej-karpathy.jpg`,
      alt: "Andrej Karpathy",
    }}
  />,

  // 2 — Stanford just proved Claude is a yes-man…
  <DualImageSlide
    key="yes-man-stats"
    left={{
      src: `${LIB}/stanford-report-ai-yes-man.png`,
      alt: "Stanford report on Claude agreeing more than humans",
    }}
    right={{
      src: `${LIB}/ai-agreeable-than-human.png`,
      alt: "Research showing Claude is more agreeable than humans",
    }}
  />,

  // 3 — Karpathy's fix is something he calls the LLM Council…
  <ImageSlide
    key="llm-council"
    src={`${LIB}/llm-council.jpg`}
    alt="Karpathy LLM Council"
  />,

  // 4 — Here's how it works…
  <TextSlide key="five-advisors">
    <HL>Five advisors</HL>, five angles
  </TextSlide>,

  // 5–9 — One is a contrarian… (Steps sequence)
  <StepsSlide
    key="advisor-0"
    steps={advisorSteps}
    current={0}
    visual={<StepEmoji>🚫</StepEmoji>}
  />,
  <StepsSlide
    key="advisor-1"
    steps={advisorSteps}
    current={1}
    visual={<StepEmoji>🔍</StepEmoji>}
  />,
  <StepsSlide
    key="advisor-2"
    steps={advisorSteps}
    current={2}
    visual={<StepEmoji>📈</StepEmoji>}
  />,
  <StepsSlide
    key="advisor-3"
    steps={advisorSteps}
    current={3}
    visual={<StepEmoji>❓</StepEmoji>}
  />,
  <StepsSlide
    key="advisor-4"
    steps={advisorSteps}
    current={4}
    visual={<StepEmoji>✅</StepEmoji>}
  />,

  // 10 — Then each advisor reviews the others blind…
  <TextSlide key="blind-review">
    <HL>Blind peer review</HL> — ideas, not egos
  </TextSlide>,

  // 11 — A chairman reads all of it…
  <ImageSlide
    key="chairman"
    src={`${LIB}/chairman.jpg`}
    alt="LLM Council chairman synthesizing advisor responses"
  />,

  // 12 — Comment MIKA & I'll send the skill
  <CtaSlide
    key="cta"
    sub="& I'll send the skill"
    preview={`${LIB}/llm-council.jpg`}
    previewAlt="LLM Council skill"
    previewPlain
    previewLarge
  />,
];

export default function LlmCouncilKarpathyDeckPage() {
  return <Deck slides={slides} />;
}
