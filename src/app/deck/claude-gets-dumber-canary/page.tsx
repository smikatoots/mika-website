import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, DualImageSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Claude Gets Dumber — The Canary Rule",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Hook: hero visual of session-shortcuts slide 1 (headbang gif + Claude logo below, no text)
  <DualImageSlide
    key="hook"
    stacked
    left={{ src: `${LIB}/dumb-headbang.gif`, alt: "Dumb and dumber headbang gif" }}
    right={{ src: `${LIB}/claude-logo.png`, alt: "Claude logo" }}
  />,

  // 2 — Text + Image · Canary
  <ImageSlide
    key="canary"
    src={`${LIB}/canary.jpeg`}
    alt="A canary"
    caption={<A>Canary</A>}
  />,

  // 3 — The rule
  <ImageSlide
    key="rule"
    src={`${LIB}/mika-canary-rule.png`}
    alt="Mika's canary rule: start every response with my name"
    caption={
      <>
        Start every response with <A>my name</A>.
      </>
    }
  />,

  // 4 — The tripwire
  <ImageSlide
    key="tripwire"
    src={`${LIB}/tick-tick-timebomb.gif`}
    alt="Tick tick timebomb"
    caption={
      <>
        That rule is your <A>tripwire</A>
      </>
    }
  />,

  // 5 — Image + Text · Context rot
  <ImageSlide
    key="context-rot"
    src={`${LIB}/claude-context-window.png`}
    alt="Claude context window"
    caption={
      <>
        Context <A>rot</A>
      </>
    }
  />,

  // 6 — Statement · text-only
  <TextSlide key="brief">
    Ask for a <HL>context brief</HL> → new chat
  </TextSlide>,

  // 7 — CTA · text-only
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="and I'll send you my guide." />,
];

export default function ClaudeGetsDumberCanaryDeckPage() {
  return <Deck slides={slides} />;
}
