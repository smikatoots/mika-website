import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "VC CEOs Are Hiring the Same Person",
};

const LIB = "/decks/_library";

const skillSteps: React.ReactNode[] = [
  "You can build",
  "You can hold a room",
  "You can write well",
  "You have taste",
  "You\u2019re easy to bet on",
];

const skillVisuals = [
  { src: `${LIB}/claude-logo.png`, alt: "Claude logo" },
  { src: `${LIB}/attention-please.gif`, alt: "Attention please" },
  { src: `${LIB}/spongebob-writing-notepad.gif`, alt: "Spongebob writing" },
  { src: `${LIB}/you-have-taste.gif`, alt: "You have taste" },
  { src: `${LIB}/dream-team.gif`, alt: "Dream team" },
];

function StruckLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative flex h-[min(40vh,20rem)] w-full flex-1 items-center justify-center sm:h-[min(50vh,24rem)]">
      <Image src={src} alt={alt} fill sizes="33vw" className="object-contain" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[6px] w-[115%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-full bg-[var(--deck-accent)] shadow-[0_2px_8px_rgba(253,72,105,0.35)]"
        aria-hidden
      />
    </div>
  );
}

function StruckPedigreeLogos() {
  const logos = [
    { src: `${LIB}/mckinsey-logo.png`, alt: "McKinsey logo" },
    { src: `${LIB}/stanford-logo.png`, alt: "Stanford logo" },
    { src: `${LIB}/google-logo.png`, alt: "Google logo" },
  ];

  return (
    <div className="deck-fade flex h-full w-full items-center justify-center gap-6 px-8 py-12 sm:gap-10 md:gap-14 md:px-16">
      {logos.map((logo) => (
        <StruckLogo key={logo.alt} src={logo.src} alt={logo.alt} />
      ))}
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
  <ImageSlide
    key="hook"
    src={`${LIB}/ceo-starter-kit.png`}
    alt="CEO starter kit"
  />,

  // 2 — Context (pedigree logos struck through)
  <StruckPedigreeLogos key="context" />,

  // 3 — Credibility
  <ImageSlide
    key="credibility"
    src={`${LIB}/mika-linkedin-hero.png`}
    alt="Mika LinkedIn profile"
  />,

  // 4–8 — Five skills (Steps sequence)
  <StepsSlide
    key="skill-0"
    steps={skillSteps}
    current={0}
    visual={<StepImage src={skillVisuals[0].src} alt={skillVisuals[0].alt} />}
  />,
  <StepsSlide
    key="skill-1"
    steps={skillSteps}
    current={1}
    visual={<StepImage src={skillVisuals[1].src} alt={skillVisuals[1].alt} />}
  />,
  <StepsSlide
    key="skill-2"
    steps={skillSteps}
    current={2}
    visual={<StepImage src={skillVisuals[2].src} alt={skillVisuals[2].alt} />}
  />,
  <StepsSlide
    key="skill-3"
    steps={skillSteps}
    current={3}
    visual={<StepImage src={skillVisuals[3].src} alt={skillVisuals[3].alt} />}
  />,
  <StepsSlide
    key="skill-4"
    steps={skillSteps}
    current={4}
    visual={<StepImage src={skillVisuals[4].src} alt={skillVisuals[4].alt} />}
  />,

  // 9 — Repeat pedigree logos
  <StruckPedigreeLogos key="not-on-list" />,

  // 10 — The game changed
  <TextSlide key="game-changed">
    <HL>AI changed the game</HL>
  </TextSlide>,

  // 11 — CTA
  <CtaSlide key="cta" prompt="" headline="Follow" sub="to stay ahead with AI" />,
];

export default function VcCeosHiringSamePersonDeckPage() {
  return <Deck slides={slides} />;
}
