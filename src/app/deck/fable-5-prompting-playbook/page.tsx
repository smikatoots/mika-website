import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Anthropic's Fable 5 Prompting Playbook",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Spoken hook
  <ImageSlide key="fable-5" src={`${LIB}/fable-5.jpg`} alt="Fable 5 by Anthropic" />,

  // 2 — Here are the 3 tips
  <TextSlide key="three-habits">
    3 <HL>Fable 5-specific</HL> prompting habits
  </TextSlide>,

  // 3 — First, stop babysitting the prompt
  <TextSlide key="babysitting" emoji="🍼">
    Stop <HL delay={0.4}>babysitting</HL> the prompt
  </TextSlide>,

  // 4 — Second, give it big tasks
  <TextSlide key="big-tasks" emoji="🎯">
    Give it <HL delay={0.4}>big tasks</HL>
  </TextSlide>,

  // 5 — Third, tell it why, not just what
  <TextSlide key="tell-why" emoji="🧭">
    Tell it{" "}
    <span style={{ whiteSpace: "nowrap" }}>
      <HL delay={0.4}>why</HL>,
    </span>{" "}
    not just what
  </TextSlide>,

  // 6 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for Anthropic's full Fable 5 playbook"
  />,
];

export default function Fable5PromptingPlaybookDeckPage() {
  return <Deck slides={slides} />;
}
