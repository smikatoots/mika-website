import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { PepperedCommands } from "../_shared/commands";

export const metadata: Metadata = { title: "Claude Code Commands, Part 1" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Hook: the five commands, peppered + animated
  <PepperedCommands
    key="hook"
    commands={["/memory", "/schedule", "/loop", "/rewind", "/goal"]}
  />,

  // 2 — What a command is
  <TextSlide key="what">
    <span>
      Commands are <HL>shortcuts</HL>.
    </span>
    <span>
      Type <HL>/</HL> then the command.
    </span>
  </TextSlide>,

  // 3–7 — The five commands
  <ImageSlide key="memory" src={`${LIB}/slash-memory.gif`} alt="/memory command" caption="/memory" />,
  <ImageSlide key="schedule" src={`${LIB}/slash-schedule.gif`} alt="/schedule command" caption="/schedule" />,
  <ImageSlide key="loop" src={`${LIB}/slash-loop.gif`} alt="/loop command" caption="/loop" />,
  <ImageSlide key="rewind" src={`${LIB}/slash-rewind.gif`} alt="/rewind command" caption="/rewind" />,
  <ImageSlide key="goal" src={`${LIB}/slash-goal.gif`} alt="/goal command" caption="/goal" />,

  // 8 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Command guide preview"
    previewSide="left"
  />,
];

export default function ClaudeCodeCommands1DeckPage() {
  return <Deck slides={slides} />;
}
