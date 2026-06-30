import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { LoopsQuad } from "../_shared/loops";

export const metadata: Metadata = { title: "Loops, Part 4 — Six Real Loops" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Credibility grid (reused)
  <LoopsQuad key="quad" />,

  // 2 — Context: most people use AI like a vending machine
  <ImageSlide key="context" src={`${LIB}/vending-machine.gif`} alt="A vending machine" />,

  // 3 — Sales loop
  <ImageSlide key="sales" src={`${LIB}/sales-sales-sales.gif`} alt="Sales, sales, sales" caption="Sales follow-ups" />,

  // 4 — Marketing loop
  <ImageSlide key="marketing" src={`${LIB}/marketing-spongebob.gif`} alt="SpongeBob marketing" caption="Marketing performance" />,

  // 5 — Competitive intel loop
  <ImageSlide key="intel" src={`${LIB}/competition-is-fierce.gif`} alt="The competition is fierce" caption="Competitive intel" />,

  // 6 — Customer support loop
  <ImageSlide key="support" src={`${LIB}/just-smile-and-wave.gif`} alt="Just smile and wave" caption="Customer support" />,

  // 7 — Personal weekly review loop
  <ImageSlide
    key="review"
    src={`${LIB}/5-things-you-did-this-week.gif`}
    alt="Five things you did this week"
    caption="Personal weekly review"
  />,

  // 8 — Personal finance loop
  <ImageSlide key="finance" src={`${LIB}/hello-i-like-money.gif`} alt="Hello, I like money" caption="Personal finance" />,

  // 9 — Guardrail
  <TextSlide key="guardrail">
    Give every loop a{" "}
    <span>
      <HL>good goal or exit</HL>.
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

export default function LoopsPart4DeckPage() {
  return <Deck slides={slides} />;
}
