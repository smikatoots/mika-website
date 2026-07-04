import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Fable-Worthy Use Cases Before July 8",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Spoken hook
  <ImageSlide key="fable-5" src={`${LIB}/fable-5.jpg`} alt="Fable 5 by Anthropic" />,

  // 2 — Context
  <TextSlide key="pay-per-use">
    Pay <HL>per use</HL> after <HL>July 8</HL>
  </TextSlide>,

  // 3 — Audit & custom use cases
  <ImageSlide
    key="custom-use-cases"
    src={`${LIB}/fable-5.jpg`}
    alt="Fable 5 by Anthropic"
    caption={
      <>
        Custom <A>Fable-worthy</A> use cases
      </>
    }
  />,

  // 4 — Life or business advisor
  <ImageSlide
    key="advisor"
    src={`${LIB}/chairman.jpg`}
    alt="Chairman meme"
    caption={<>Life or business advisor</>}
  />,

  // 5 — Execute a big project
  <ImageSlide
    key="big-project"
    src={`${LIB}/slash-plan.gif`}
    alt="/plan command in Claude Code"
    caption={<>Execute a big project</>}
  />,

  // 6 — Part 2 tease + Harry Potter example
  <TextSlide key="part-2" display>
    Follow for <HL>part 2</HL>
    <span>
      Like this <HL>Harry Potter world</HL>!
    </span>
  </TextSlide>,

  // 7 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for the prompts for all 3"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Fable prompts guide"
  />,
];

export default function FableBeforeJuly8DeckPage() {
  return <Deck slides={slides} />;
}
