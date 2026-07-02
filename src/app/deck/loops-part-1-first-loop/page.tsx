import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import {
  BigEmoji,
  LoopHookSlide,
  LoopsQuad,
  LoopsTitle,
  ResearchBeforeAfter,
} from "../_shared/loops";

export const metadata: Metadata = { title: "Loops, Part 1 — Build Your First Loop" };

const LIB = "/decks/_library";

const partSteps: React.ReactNode[] = ["Goal", "Memory", "Trigger"];

const slides: React.ReactNode[] = [
  // 1 — Credibility: Claude + OpenClaw, Peter Steinberger + Boris Cherny
  <LoopsQuad key="quad" />,

  // 2 — Hook: prompting dead-ends, looping closes the loop
  <LoopHookSlide key="hook" />,

  // 3 — Series marker
  <LoopsTitle key="title" part={1} />,

  // 4 — A loop is an automated system where the AI acts as its own prompter until a goal is complete
  <TextSlide key="definition">
    <span>A loop is an automated system</span>
    <span>
      where the AI <HL>acts as its own prompter</HL>
    </span>
    <span>until a goal is complete</span>
  </TextSlide>,

  // 5 — It's a job description for the work
  <ImageSlide key="job-description" src={`${LIB}/job-description.webp`} alt="A job description document" />,

  // 6–8 — The three parts of a loop (giant-emoji visuals)
  <StepsSlide key="part-goal" steps={partSteps} current={0} visual={<BigEmoji>🎯</BigEmoji>} />,
  <StepsSlide key="part-memory" steps={partSteps} current={1} visual={<BigEmoji>🧠</BigEmoji>} />,
  <StepsSlide key="part-trigger" steps={partSteps} current={2} visual={<BigEmoji>🕰️</BigEmoji>} />,

  // 9 — /goal
  <TextSlide key="goal-cmd" number="1">
    <span>
      <HL>/goal</HL> runs until the goal is completed
    </span>
  </TextSlide>,

  // 10 — /loop
  <TextSlide key="loop-cmd" number="2">
    <span>
      <HL>/loop</HL> re-runs on a frequency (e.g. every 3 min)
    </span>
  </TextSlide>,

  // 11 — /schedule
  <TextSlide key="schedule-cmd" number="3">
    <span>
      <HL>/schedule</HL> runs on a scheduled trigger
    </span>
  </TextSlide>,

  // 12 — Real example: self-checking research brief
  <ResearchBeforeAfter key="research" />,

  // 13 — Cost guardrail
  <TextSlide key="cost">
    <span>
      Tight loop: <HL>under $1</HL>.
    </span>
    <span>
      Vague loop: <HL>$80+</HL>.
    </span>
    <span>Always set an exit.</span>
  </TextSlide>,

  // 14 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Loops guide preview"
    previewSide="left"
  />,
];

export default function LoopsPart1DeckPage() {
  return <Deck slides={slides} />;
}
