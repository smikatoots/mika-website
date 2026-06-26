import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  HL,
  ImageSlide,
  DualImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "Anthropic just made Claude a member of your team",
};

const LIB = "/decks/_library";

// ─── Co-located components ───────────────────────────────────────────────────

function ClaudeTeamSlide() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-0 px-6 py-2 sm:px-12 sm:py-2">
      {/* Claude logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${LIB}/claude-logo.png`}
        alt="Claude logo"
        className="deck-rise w-[26rem] sm:w-[34rem]"
        style={{ animationDelay: "0.05s" }}
      />
      {/* Handshake emoji */}
      <div
        className="deck-rise text-[6rem] leading-none sm:text-[8rem]"
        style={{ animationDelay: "0.15s" }}
      >
        🤝
      </div>
      {/* YOUR TEAM */}
      <p
        className={`deck-rise text-center ${headingBase} ${deckType.display}`}
        style={{
          animationDelay: "0.25s",
          color: "var(--deck-accent)",
        }}
      >
        YOUR TEAM
      </p>
    </div>
  );
}

function VideoSlide({
  src,
  caption,
  fullBleed = false,
}: {
  src: string;
  caption?: React.ReactNode;
  fullBleed?: boolean;
}) {
  if (fullBleed) {
    return (
      <div className="deck-fade relative flex h-full w-full items-center justify-center overflow-hidden bg-black">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-2 px-6 py-10 sm:gap-3 sm:px-12 sm:py-12">
      {caption ? (
        <h2
          className={`deck-rise text-center ${headingBase} ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {caption}
        </h2>
      ) : null}
      <div className="relative flex max-h-[70vh] w-full items-center justify-center">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-[70vh] max-w-full object-contain"
        />
      </div>
    </div>
  );
}

// ─── Slides ──────────────────────────────────────────────────────────────────

const slides: React.ReactNode[] = [
  // 1 — Claude + your team
  <ClaudeTeamSlide key="claude-team" />,

  // 3 — Preview video (full-bleed, no text)
  <VideoSlide
    key="preview-video"
    src={`${LIB}/claude-tag-preview.mov`}
    fullBleed
  />,

  // 4 — claude-tag-cover image
  <ImageSlide
    key="tag-cover"
    src={`${LIB}/claude-tag-cover.png`}
    alt="Claude TAG product cover"
  />,

  // 5 — Multiplayer
  <ImageSlide
    key="multiplayer"
    src={`${LIB}/claude-tag-multiplayer.png`}
    alt="Claude TAG multiplayer feature"
    caption={<A>Multiplayer</A>}
  />,

  // 6 — Self-learning
  <ImageSlide
    key="learns"
    src={`${LIB}/claude-tag-learns.png`}
    alt="Claude TAG self-learning feature"
    caption={<A>Self-learning</A>}
  />,

  // 7 — Proactive
  <ImageSlide
    key="proactive"
    src={`${LIB}/claude-tag-proactive.png`}
    alt="Claude TAG proactive feature"
    caption={<A>Proactive</A>}
  />,

  // 8 — Async video with caption
  <VideoSlide
    key="async-video"
    src={`${LIB}/claude-tag-async.mov`}
    caption={<A>Async</A>}
  />,

  // 9 — 65% stat
  <TextSlide key="65-percent">
    <HL>65%</HL> of Anthropic&apos;s code. Written by Claude.
  </TextSlide>,

  // 10 — Dual image: OpenClaw + Hermes
  <DualImageSlide
    key="openclaw-hermes"
    left={{ src: `${LIB}/openclaw-logo.png`, alt: "OpenClaw logo" }}
    right={{ src: `${LIB}/hermes-logo.svg`, alt: "Hermes logo" }}
  />,

  // 11 — Beta / launch credit
  <TextSlide key="beta-launch">
    Beta now. <HL>Launch credit</HL> available.
  </TextSlide>,

  // 12 — CTA
  <CtaSlide
    key="cta"
    prompt="comment"
    headline="MIKA"
    sub="for my guide"
    size="lg"
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
