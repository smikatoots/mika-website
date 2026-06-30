import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { BigEmoji, LoopsQuad, LoopsTitle } from "../_shared/loops";

export const metadata: Metadata = { title: "Loops, Part 2 — The Five Pieces" };

const LIB = "/decks/_library";

const pieceSteps: React.ReactNode[] = [
  "Automation",
  "Work trees",
  "Skills",
  "Connectors",
  "Sub-agents",
];

const slides: React.ReactNode[] = [
  // 1 — Credibility grid (reused)
  <LoopsQuad key="quad" />,

  // 2 — Series marker
  <LoopsTitle key="title" part={2} />,

  // 3 — Context: most people use AI like a vending machine
  <ImageSlide key="context" src={`${LIB}/vending-machine.gif`} alt="A vending machine" />,

  // 4–8 — The five pieces of a sophisticated loop
  <StepsSlide key="piece-automation" steps={pieceSteps} current={0} visual={<BigEmoji>⚙️</BigEmoji>} />,
  <StepsSlide key="piece-worktrees" steps={pieceSteps} current={1} visual={<BigEmoji>🌳</BigEmoji>} />,
  <StepsSlide key="piece-skills" steps={pieceSteps} current={2} visual={<BigEmoji>🧩</BigEmoji>} />,
  <StepsSlide key="piece-connectors" steps={pieceSteps} current={3} visual={<BigEmoji>🔌</BigEmoji>} />,
  <StepsSlide key="piece-subagents" steps={pieceSteps} current={4} visual={<BigEmoji>🤖</BigEmoji>} />,

  // 9 — All five together
  <TextSlide key="together">
    Five pieces = a team working{" "}
    <span>
      <HL>around the clock</HL>.
    </span>
  </TextSlide>,

  // 10 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Loops guide preview"
    previewSide="left"
  />,
];

export default function LoopsPart2DeckPage() {
  return <Deck slides={slides} />;
}
