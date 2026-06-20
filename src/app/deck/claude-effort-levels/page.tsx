import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Claude Effort Levels",
};

const LIB = "/decks/_library";

const effortSteps: React.ReactNode[] = [
  "Low",
  "Medium",
  "High",
  "Max",
  "Ultra Code",
];

const effortVisuals = [
  { src: `${LIB}/effort-low.png`, alt: "Claude Effort Low" },
  { src: `${LIB}/effort-medium.png`, alt: "Claude Effort Medium" },
  { src: `${LIB}/effort-high.png`, alt: "Claude Effort High" },
  { src: `${LIB}/effort-max.png`, alt: "Claude Effort Max" },
  { src: `${LIB}/effort-ultra-code.png`, alt: "Claude Effort Ultra Code" },
];

function LowBattHook() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-12">
      <div className="relative h-[min(45vh,24rem)] w-full max-w-xl">
        <Image
          src={`${LIB}/low-batt.gif`}
          alt="Low battery"
          fill
          unoptimized
          sizes="(max-width: 768px) 90vw, 36rem"
          className="object-contain"
        />
      </div>
      <div className="relative h-80 w-80 sm:h-[28rem] sm:w-[28rem] md:h-[32rem] md:w-[32rem]">
        <Image
          src={`${LIB}/claude-logo.png`}
          alt="Claude logo"
          fill
          sizes="32rem"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function StepImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[min(72vh,36rem)] w-full max-w-xl">
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 28rem" className="object-contain" />
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Visual + spoken hook
  <LowBattHook key="hook" />,

  // 2 — Effort 101 intro
  <ImageSlide
    key="intro"
    src={`${LIB}/effort-preview.png`}
    alt="Claude Effort levels preview"
    caption={<>Claude Effort Levels 101</>}
  />,

  // 3 — Default depends on plan
  <DualImageSlide
    key="default"
    left={{ src: `${LIB}/claude-logo.png`, alt: "Claude logo" }}
    right={{ src: `${LIB}/effort-preview.png`, alt: "Claude Effort preview" }}
    balancedHeight
  />,

  // 4 — Five levels intro
  <ImageSlide
    key="five-levels"
    src={`${LIB}/effort-preview.png`}
    alt="Claude Effort levels"
    caption={<>5 Effort Levels</>}
  />,

  // 5–9 — Effort levels (Steps sequence)
  <StepsSlide
    key="effort-0"
    steps={effortSteps}
    current={0}
    visual={<StepImage src={effortVisuals[0].src} alt={effortVisuals[0].alt} />}
  />,
  <StepsSlide
    key="effort-1"
    steps={effortSteps}
    current={1}
    visual={<StepImage src={effortVisuals[1].src} alt={effortVisuals[1].alt} />}
  />,
  <StepsSlide
    key="effort-2"
    steps={effortSteps}
    current={2}
    visual={<StepImage src={effortVisuals[2].src} alt={effortVisuals[2].alt} />}
  />,
  <StepsSlide
    key="effort-3"
    steps={effortSteps}
    current={3}
    visual={<StepImage src={effortVisuals[3].src} alt={effortVisuals[3].alt} />}
  />,
  <StepsSlide
    key="effort-4"
    steps={effortSteps}
    current={4}
    visual={<StepImage src={effortVisuals[4].src} alt={effortVisuals[4].alt} />}
  />,

  // 10 — Good context beats high effort
  <TextSlide key="context-beats">
    <HL>Good context</HL> &gt; high effort
  </TextSlide>,

  // 11 — Match effort to task
  <TextSlide key="match-effort">
    Match <HL>effort to task</HL> for better tokens
  </TextSlide>,

  // 12 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="& I'll send my cheat sheet"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Claude Effort cheat sheet"
    previewPlain
  />,
];

export default function ClaudeEffortLevelsDeckPage() {
  return <Deck slides={slides} />;
}
