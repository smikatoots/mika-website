import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide, StepsSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Claude Code Session Shortcuts",
};

const LIB = "/decks/_library";

const commandSteps: React.ReactNode[] = ["/clear", "/compact", "/model"];

const commandVisuals = [
  { src: `${LIB}/clear-command.png`, alt: "Claude Code /clear command" },
  { src: `${LIB}/compact-command.png`, alt: "Claude Code /compact command" },
  { src: `${LIB}/model-command.png`, alt: "Claude Code /model command" },
];

function DumbHeadbangHook() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-12">
      <div className="relative h-[min(50vh,26rem)] w-full max-w-2xl">
        <Image
          src={`${LIB}/dumb-headbang.gif`}
          alt="Dumb and dumber headbang gif"
          fill
          unoptimized
          sizes="(max-width: 768px) 90vw, 42rem"
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
  <DumbHeadbangHook key="hook" />,

  // 2 — Context
  <ImageSlide
    key="context"
    src={`${LIB}/claude-context-window.png`}
    alt="Claude Code context window"
  />,

  // 3–5 — Commands (Steps sequence)
  <StepsSlide
    key="command-0"
    steps={commandSteps}
    current={0}
    visual={<StepImage src={commandVisuals[0].src} alt={commandVisuals[0].alt} />}
  />,
  <StepsSlide
    key="command-1"
    steps={commandSteps}
    current={1}
    visual={<StepImage src={commandVisuals[1].src} alt={commandVisuals[1].alt} />}
  />,
  <StepsSlide
    key="command-2"
    steps={commandSteps}
    current={2}
    visual={<StepImage src={commandVisuals[2].src} alt={commandVisuals[2].alt} />}
  />,

  // 6 — Not actually dumber
  <ImageSlide key="not-dumber" src={`${LIB}/dumber.gif`} alt="Claude getting dumber" />,

  // 7 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for my command cheatsheet"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Claude Code command cheatsheet"
    previewPlain
  />,
];

export default function ClaudeCodeSessionShortcutsDeckPage() {
  return <Deck slides={slides} />;
}
