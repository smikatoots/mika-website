import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { PepperedCommands } from "../_shared/commands";

export const metadata: Metadata = { title: "Claude Code Commands, Part 2" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Hook: the five commands, peppered + animated
  <PepperedCommands
    key="hook"
    commands={["/model", "/usage", "/rewind", "/context", "/compact"]}
  />,

  // 2–6 — The five commands
  <ImageSlide key="model" src={`${LIB}/slash-model.gif`} alt="/model command" caption="/model" />,
  <ImageSlide key="usage" src={`${LIB}/elmo-fire.gif`} alt="/usage command" caption="/usage" />,
  <ImageSlide key="rewind" src={`${LIB}/slash-rewind.gif`} alt="/rewind command" caption="/rewind" />,
  <ImageSlide key="context" src={`${LIB}/slash-context.gif`} alt="/context command" caption="/context" />,
  <ImageSlide key="compact" src={`${LIB}/slash-compact.gif`} alt="/compact command" caption="/compact" />,

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

export default function ClaudeCodeCommands2DeckPage() {
  return <Deck slides={slides} />;
}
