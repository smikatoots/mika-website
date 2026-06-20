import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";

export const metadata: Metadata = {
  title: "Monthly Friends & AI Meeting Agenda",
};

const LIB = "/decks/_library";

const agendaSteps: React.ReactNode[] = [
  "AI wins",
  "AI fails",
  "AI tips",
  "Hot seat",
  "AI goal",
];

const agendaVisuals = [
  { src: `${LIB}/win-o-clock.gif`, alt: "Win o clock" },
  { src: `${LIB}/you-do-you-boo.gif`, alt: "You do you boo" },
  { src: `${LIB}/tip-jar.gif`, alt: "Tip jar" },
  { src: `${LIB}/sweating-a-lot.gif`, alt: "Sweating a lot" },
  { src: `${LIB}/target-dont-miss.gif`, alt: "Target don't miss" },
];

function StepImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[min(72vh,36rem)] w-full max-w-xl">
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        sizes="(max-width: 768px) 90vw, 28rem"
        className="object-contain"
      />
    </div>
  );
}

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
  // 1 — Title
  <TextSlide key="title" display>
    Monthly <HL>Friends</HL> &amp; <HL delay={0.4}>AI Meeting</HL> Agenda
  </TextSlide>,

  // 2–6 — Agenda items (Steps sequence)
  <StepsSlide
    key="agenda-0"
    steps={agendaSteps}
    current={0}
    visual={<StepImage src={agendaVisuals[0].src} alt={agendaVisuals[0].alt} />}
  />,
  <StepsSlide
    key="agenda-1"
    steps={agendaSteps}
    current={1}
    visual={<StepImage src={agendaVisuals[1].src} alt={agendaVisuals[1].alt} />}
  />,
  <StepsSlide
    key="agenda-2"
    steps={agendaSteps}
    current={2}
    visual={<StepImage src={agendaVisuals[2].src} alt={agendaVisuals[2].alt} />}
  />,
  <StepsSlide
    key="agenda-3"
    steps={agendaSteps}
    current={3}
    visual={<StepImage src={agendaVisuals[3].src} alt={agendaVisuals[3].alt} />}
  />,
  <StepsSlide
    key="agenda-4"
    steps={agendaSteps}
    current={4}
    visual={<StepImage src={agendaVisuals[4].src} alt={agendaVisuals[4].alt} />}
  />,

  // 7 — Why this works
  <GifSlide key="why" src={`${LIB}/friends-kumbayah.gif`} alt="Friends kumbayah" />,

  // 8 — CTA
  <TextSlide key="cta">
    <HL>Send this</HL> to a friend you&apos;d do this with
  </TextSlide>,
];

export default function FriendsAiMeetingDeckPage() {
  return <Deck slides={slides} />;
}
