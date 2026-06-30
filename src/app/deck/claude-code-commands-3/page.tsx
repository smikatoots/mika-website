import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { PepperedCommands } from "../_shared/commands";

export const metadata: Metadata = { title: "Claude Code Commands, Part 3" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Hook: the five commands, peppered + animated
  <PepperedCommands
    key="hook"
    commands={["/plan", "/branch", "/security-review", "/background", "/agents"]}
  />,

  // 2–6 — The five commands
  <ImageSlide key="plan" src={`${LIB}/slash-plan.gif`} alt="/plan command" caption="/plan" />,
  <ImageSlide key="branch" src={`${LIB}/slash-branch.gif`} alt="/branch command" caption="/branch" />,
  <ImageSlide key="security-review" src={`${LIB}/slash-security-review.gif`} alt="/security-review command" caption="/security-review" />,
  <ImageSlide key="background" src={`${LIB}/slash-background.gif`} alt="/background command" caption="/background" />,
  <ImageSlide key="agents" src={`${LIB}/slash-agents.gif`} alt="/agents command" caption="/agents" />,

  // 7 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Command guide preview"
    previewSide="left"
  />,
];

export default function ClaudeCodeCommands3DeckPage() {
  return <Deck slides={slides} />;
}
