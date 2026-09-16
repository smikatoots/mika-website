import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { deckType } from "@/components/deck/deck-styles";
import { A, HL, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How to make your website look cute and expensive",
};

const LIB = "/decks/_library";

// ─── Slides ──────────────────────────────────────────────────────────────────

const slides: React.ReactNode[] = [
  // 1 — At my first startup we paid a design agency ten thousand dollars just to redesign our website.
  <ImageSlide
    key="my-website"
    src={`${LIB}/mikareyes-homepage.png`}
    alt="The mikareyes.com homepage"
    framed
  />,

  // 2 — First, make a brand and design MD files.
  <ImageSlide
    key="brand-md"
    src={`${LIB}/brand-md.png`}
    alt="A brand.md file holding colors, fonts, and voice"
    captionSize={deckType.statementSm}
    caption={
      <>
        Make your <A>brand + design</A> files
      </>
    }
  />,

  // 3 — Then go to Refero Design and find a website you actually like the look of.
  <ImageSlide
    key="refero"
    src={`${LIB}/refero-browse-grid.png`}
    alt="Refero Design browse grid of website screenshots"
    captionSize={deckType.statementSm}
    caption={
      <>
        Find a site you love on <A>Refero</A>
      </>
    }
  />,

  // 4 — Then get their design.md file and put it into your brand guidelines.
  <ImageSlide
    key="design-md"
    src={`${LIB}/duoling-design-md.png`}
    alt="Duolingo design.md file pasted into the brand guidelines"
    captionSize={deckType.statementSm}
    caption={
      <>
        Paste its <A>design.md</A>
      </>
    }
  />,

  // 5 — Then, when you ask Claude or Codex to make a new landing page, it reads that file first.
  <ImageSlide
    key="design-prompt"
    src={`${LIB}/design-prompt-on-claude.png`}
    alt="Prompting Claude to redesign the website using the design file"
    captionSize={deckType.statementSm}
    caption={
      <>
        Create your <A>website!</A>
      </>
    }
  />,

  // 6 — Comment MIKA for my full guide, and tell me what website you'd use this on!
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL> for the full guide
      </>
    }
    headlinePlain
    subSize="sm"
    sub="And tell me what website you'd use this on"
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
