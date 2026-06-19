import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { A, HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Stanford: AI's Biggest Productivity Boost Is Happening at Home",
};

const LIB = "/decks/_library";

/** The three-stage finding, revealed one row at a time. */
const steps: React.ReactNode[] = [
  "AI boosts home productivity",
  "But the time isn't reinvested",
  "A widening adoption gap",
];

const slides: React.ReactNode[] = [
  // 1 — "Stanford just dropped a new AI report."
  <ImageSlide
    key="hero"
    src={`${LIB}/stanford-report-ai-home-productivity-hero.png`}
    alt="Stanford SIEPR report on AI and home productivity."
    caption={
      <>
        Stanford&apos;s new <A>AI report</A>
      </>
    }
  />,

  // 2 — "The catch? It can actually make you poorer."
  <TextSlide key="catch">
    The catch? It can make you <HL>poorer</HL>.
  </TextSlide>,

  // TODO: swap in stanford-siepr-article.png ImageSlide(framed) when added
  // 3 — "It's one of the first studies looking at AI at home, not at work."
  <TextSlide key="at-home">
    One of the first studies on AI at <HL>home</HL>, not work.
  </TextSlide>,

  // 4 — "200,000 households — and chores got done 76 to 176% faster."
  <TextSlide key="numbers">
    200,000 households.
    <br />
    Chores done <HL>76–176% faster</HL>.
  </TextSlide>,

  // 5 — "First: AI boosts home productivity."
  <StepsSlide
    key="step-0"
    steps={steps}
    current={0}
    visual={
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={`${LIB}/home-productivity.jpg`}
          alt="getting things done at home"
          fill
          sizes="50vw"
          className="rounded-2xl object-contain"
        />
      </div>
    }
  />,

  // 6 — "But the time you save isn't getting reinvested."
  <StepsSlide
    key="step-1"
    steps={steps}
    current={1}
    visual={
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={`${LIB}/clock.gif`}
          alt="time passing"
          fill
          sizes="50vw"
          className="rounded-2xl object-contain"
        />
      </div>
    }
  />,

  // 7 — "And there's a widening adoption gap."
  <StepsSlide
    key="step-2"
    steps={steps}
    current={2}
    visual={
      <div className="relative h-72 w-full sm:h-96">
        <Image
          src={`${LIB}/quite-a-gap.gif`}
          alt="a widening gap"
          fill
          sizes="50vw"
          className="rounded-2xl object-contain"
        />
      </div>
    }
  />,

  // 8 — "It only pays off if you use that time to climb."
  <ImageSlide
    key="pocket"
    src={`${LIB}/money-in-your-pocket.jpeg`}
    alt="money in a pocket."
    maxWidth="max-w-md"
  />,

  // 9 — "So the real question: what are you actually doing with it?"
  <TextSlide key="question" display>
    What are you actually <HL>doing with it?</HL>
  </TextSlide>,

  // 10 — CTA
  <CtaSlide
    key="cta"
    sub="and I'll send you the study."
    preview={`${LIB}/stanford-report-ai-home-productivity-hero.png`}
    previewAlt="Stanford AI report"
  />,
];

export default function StanfordAiAtHomeDeckPage() {
  return <Deck slides={slides} />;
}
