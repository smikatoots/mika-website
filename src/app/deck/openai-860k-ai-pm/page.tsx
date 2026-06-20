import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "OpenAI's $860K AI Product Manager Role",
};

const LIB = "/decks/_library";

function GifSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <div className="relative w-full flex-1">
        <Image src={src} alt={alt} fill unoptimized sizes="100vw" className="object-contain" />
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Visual + spoken hook
  <ImageSlide
    key="hook"
    src={`${LIB}/openai-860k-salary.png`}
    alt="OpenAI $860K salary"
  />,

  // 2 — Traditional PM vs AI PM
  <GifSlide key="shift" src={`${LIB}/human-vs-ai.gif`} alt="Human vs AI product management" />,

  // 3 — LinkedIn PM credibility
  <ImageSlide
    key="linkedin-pm"
    src={`${LIB}/mika-linkedin-hero.png`}
    alt="Mika LinkedIn profile"
  />,

  // 4 — Comp numbers
  <DualImageSlide
    key="comp"
    left={{ src: `${LIB}/openai-860k-salary.png`, alt: "OpenAI PM compensation" }}
    right={{ src: `${LIB}/anthropic-pm-salary.png`, alt: "Anthropic PM compensation" }}
    balancedHeight
  />,

  // 5 — Agent Managers
  <ImageSlide
    key="agent-managers"
    src={`${LIB}/-hbr-agent-managers.png`}
    alt="HBR Agent Managers article"
    caption={<>Agent Managers or AI PMs</>}
  />,

  // 6 — CTA
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for the job link" />,
];

export default function Openai860kAiPmDeckPage() {
  return <Deck slides={slides} />;
}
