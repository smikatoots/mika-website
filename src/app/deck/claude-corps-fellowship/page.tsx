import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { deckType, headingBase } from "@/components/deck/deck-styles";
import {
  A,
  DualImageSlide,
  HL,
  ImageSlide,
  PointSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How to Stand Out in the Claude Corps Fellowship",
};

const LIB = "/decks/_library";

/**
 * Four selective-fellowship logos under a shared header — laid out in a
 * balanced 2×2 grid that fills the slide. On-brand: salmon accent in the
 * header, large/legible logo cards, deck-* entrance animations.
 */
function FellowshipLogosSlide() {
  const logos = [
    { src: `${LIB}/kleiner-perkins-logo.png`, alt: "Kleiner Perkins logo" },
    { src: `${LIB}/spc-fellowship-logo.jpg`, alt: "South Park Commons logo" },
    { src: `${LIB}/freeman-logo.png`, alt: "Freeman scholarship logo" },
    { src: `${LIB}/f30u30-logo.png`, alt: "Forbes 30 Under 30 logo" },
  ];
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <h2
        className={`deck-rise mb-6 text-center sm:mb-9 ${headingBase} ${deckType.statement}`}
        style={{ animationDelay: "0.05s" }}
      >
        <A>4</A> selective programs
      </h2>
      <div className="grid w-full max-w-5xl flex-1 grid-cols-2 gap-5 sm:gap-8">
        {logos.map((logo, i) => (
          <div
            key={logo.src}
            className="deck-pop relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.3)]"
            style={{ animationDelay: `${0.12 + i * 0.08}s` }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 45vw, 24rem"
              className="object-contain p-6 sm:p-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Prestige progression — three pedigree logos with salmon arrows between them:
 * Goldman Sachs → McKinsey → Google. Stacks vertically (arrows rotate) on
 * narrow screens, runs as a row on wide ones.
 */
function PrestigeProgressionSlide() {
  const logos = [
    { src: `${LIB}/goldman-sachs-logo.jpg`, alt: "Goldman Sachs logo" },
    { src: `${LIB}/mckinsey-logo.png`, alt: "McKinsey logo" },
    { src: `${LIB}/google-logo.png`, alt: "Google logo" },
  ];
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-6 px-8 py-12 sm:flex-row sm:gap-4 sm:px-14">
      {logos.map((logo, i) => (
        <div key={logo.src} className="contents">
          <div
            className="deck-pop relative h-40 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.3)] sm:h-56 sm:flex-1"
            style={{ animationDelay: `${0.12 + i * 0.18}s` }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 80vw, 20rem"
              className="object-contain p-6 sm:p-9"
            />
          </div>
          {i < logos.length - 1 ? (
            <span
              className="deck-pop deck-accent rotate-90 text-7xl font-black leading-none sm:rotate-0 sm:text-8xl"
              style={{ animationDelay: `${0.21 + i * 0.18}s` }}
              aria-hidden
            >
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** One entry per spoken beat. Order matters — Mika advances while recording. */
const slides: React.ReactNode[] = [
  // 1 — "Here's how to stand out in Claude Corps."
  <ImageSlide
    key="hero"
    src={`${LIB}/claude-corps-hero.webp`}
    alt="Claude Corps fellowship hero."
    caption={
      <>
        How to stand out in <A>Claude Corps</A>
      </>
    }
  />,

  // 2 — "I've gotten into four of the most selective programs out there."
  <FellowshipLogosSlide key="fellowship-logos" />,

  // 3 — "Kleiner Perkins takes a handful out of tens of thousands."
  <ImageSlide
    key="kp"
    framed
    src={`${LIB}/kleiner-perkins-logo.png`}
    alt="Kleiner Perkins logo."
    caption={
      <>
        KP admits <A>80 out of thousands</A>
      </>
    }
  />,

  // 4 — "SPC gave me $400K before I even had an idea."
  <ImageSlide
    key="spc"
    framed
    src={`${LIB}/spc-fellowship-logo.jpg`}
    alt="South Park Commons logo."
    caption={
      <>
        SPC gave me <A>$400K</A> — pre-idea
      </>
    }
  />,

  // 5 — "Freeman paid for my entire degree."
  <ImageSlide
    key="freeman"
    framed
    src={`${LIB}/freeman-logo.png`}
    alt="Freeman scholarship logo."
    caption={
      <>
        Freeman paid for <A>my whole degree</A>
      </>
    }
  />,

  // 6 — "Claude Corps is that same kind of opportunity, right now."
  <ImageSlide
    key="claude-corps-now"
    src={`${LIB}/claude-corps-hero.webp`}
    alt="Claude Corps fellowship."
    caption={
      <>
        Claude Corps is that opportunity <A>now</A>
      </>
    }
  />,

  // 7 — "These signals used to be Goldman, then McKinsey, then Google."
  <PrestigeProgressionSlide key="prestige" />,

  // 8 — "Now the signal is AI."
  <DualImageSlide
    key="ai-now"
    left={{ src: `${LIB}/claude-logo.png`, alt: "Claude logo" }}
    right={{ src: `${LIB}/openai-logo.png`, alt: "OpenAI logo" }}
  />,

  // 9 — "So here's what I'd do to stand out."
  <TextSlide key="what-id-do">
    What I&apos;d do to <HL delay={0.4}>stand out</HL>.
  </TextSlide>,

  // 10 — "One: understand the incentives."
  <PointSlide key="incentives" number="01" emoji="🎯">
    Understand the <HL delay={0.4}>incentives</HL>.
  </PointSlide>,

  // 11 — "What's actually their incentive to invest in you?"
  <TextSlide key="their-incentive">
    What&apos;s their incentive to invest in <HL delay={0.4}>you?</HL>
  </TextSlide>,

  // 12 — "Two: lean into what's uniquely you."
  <PointSlide key="uniquely-you" number="02" emoji="✨">
    Lean into <HL delay={0.4}>what&rsquo;s uniquely you</HL>.
  </PointSlide>,

  // 13 — "What you've built beats pedigree every time."
  <TextSlide key="built-vs-pedigree">
    What you&apos;ve <HL delay={0.4}>built</HL> <span className="mx-1">&gt;</span> pedigree.
  </TextSlide>,

  // 14 — "So build something, right now."
  <TextSlide key="build-now" display>
    Build something <HL delay={0.4}>right now</HL>.
  </TextSlide>,

  // 15 — CTA
  <CtaSlide key="cta" sub="for my guide to stand out for Claude Corps." />,
];

export default function ClaudeCorpsFellowshipDeckPage() {
  return <Deck slides={slides} />;
}
