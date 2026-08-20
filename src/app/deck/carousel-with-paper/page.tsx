import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { deckType } from "@/components/deck/deck-styles";
import {
  A,
  DualImageSlide,
  HL,
  ImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Instagram Carousels in 10 Minutes with Paper",
};

const LIB = "/decks/_library";

const sampleLeft = { src: `${LIB}/carousel-sample-1.png`, alt: "Carousel slide made in Paper" };
const sampleRight = { src: `${LIB}/carousel-sample-2.png`, alt: "Second carousel slide made in Paper" };

const slides: React.ReactNode[] = [
  // 1 — If you're a creator or a marketer, here's how you can make Instagram carousels in 10 minutes, without rebuilding your brand from scratch.
  <DualImageSlide key="hook" left={sampleLeft} right={sampleRight} />,

  // 2 — I posted about this in a previous video and y'all wanted a tutorial so here it is!
  <DualImageSlide key="tutorial" left={sampleLeft} right={sampleRight} />,

  // 3 — I've started using a product called Paper. It's like Figma, but built so AI can actually design in it.
  <DualImageSlide
    key="paper"
    left={{ src: `${LIB}/figma-logo.avif`, alt: "Figma logo" }}
    right={{ src: `${LIB}/paper-log.avif`, alt: "Paper logo" }}
    captionSize={deckType.statementSm}
    caption={
      <>
        Like Figma, but <A>AI can actually design in it</A>
      </>
    }
  />,

  // 4 — First, you have to download the Paper desktop app and connect the Paper MCP to Claude.
  <ImageSlide
    key="mcp"
    src={`${LIB}/carousel-with-paper-mcp-connected.png`}
    alt="Paper MCP connected to Claude"
    caption="1. Download Paper + connect the MCP"
    captionSize={deckType.statementSm}
  />,

  // 5 — Then tell Claude to read your brand file. It loads your colors and fonts into Paper as tokens.
  <ImageSlide
    key="brand-tokens"
    src={`${LIB}/carousel-with-paper-brand-tokens.png`}
    alt="Brand colors and fonts loaded into Paper as tokens"
    caption="2. Point Claude at your brand file"
    captionSize={deckType.statementSm}
  />,

  // 6 — Now write your slide copy, one idea per slide, and tell Claude to build it in Paper.
  <ImageSlide
    key="carousel-skill"
    src={`${LIB}/carousel-with-paper-carousel-skill.png`}
    alt="Carousel skill drafting slide copy"
    caption="3. Write your slide copy, one per slide"
    captionSize={deckType.statementSm}
  />,

  // 7 — You should see Paper literally generating your carousels in real-time, using your brand.
  <ImageSlide
    key="finished"
    src={`${LIB}/carousel-with-paper-finished-carousel.png`}
    alt="Finished carousel generated in Paper"
  />,

  // 8 — As a bonus: save this as a whole skill so every Carousel after this is easy to build.
  <TextSlide key="bonus" emoji="🎁">
    <span>
      Save it once, reuse it <HL>forever</HL>
    </span>
  </TextSlide>,

  // 9 — Comment MIKA for my full guide and tell me what carousel you'd build first.
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL> for the full guide
      </>
    }
    headlinePlain
    size="sm"
    sub="Tell me what carousel you'd build first"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="AI guides preview"
  />,
];

export default function CarouselWithPaperDeckPage() {
  return <Deck slides={slides} />;
}
