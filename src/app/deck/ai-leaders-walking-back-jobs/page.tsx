import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, DualImageSlide, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "AI Leaders Are Walking Back Their Job Apocalypse Prophecies",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — AI billionaires lied. / For two years straight…
  <DualImageSlide
    key="hook"
    balancedHeight
    rightScale={0.75}
    left={{
      src: `${LIB}/sam-altman.jpeg`,
      alt: "Sam Altman",
    }}
    right={{
      src: `${LIB}/dario-amodei.jpeg`,
      alt: "Dario Amodei",
    }}
  />,

  // 2 — They hyped it for two reasons. First, branding…
  <ImageSlide
    key="branding"
    src={`${LIB}/puppet-strings.jpg`}
    alt="Puppet strings metaphor for AI hype as branding"
    caption={
      <>
        Reason 1: <A>Branding</A>
      </>
    }
  />,

  // 3 — Second, it was cover for layoffs…
  <ImageSlide
    key="layoffs"
    src={`${LIB}/layoffs.jpg`}
    alt="Tech layoffs headlines"
    caption={
      <>
        Reason 2: <A>Cover for layoffs</A>
      </>
    }
  />,

  // 4 — And the product hasn't delivered. Starbucks…
  <ImageSlide
    key="starbucks"
    src={`${LIB}/starbucks-ai-inventory-headline.jpeg`}
    alt="Starbucks killed an AI inventory tool headline"
    caption={<>Starbucks killed an AI tool</>}
  />,

  // 5 — But now Sam Altman and Dario…
  <ImageSlide
    key="walkback"
    src={`${LIB}/altman-dario-jobs-walkback.jpg`}
    alt="Sam Altman and Dario Amodei walking back AI job replacement claims"
    caption={
      <>
        <A>IPO timing</A>: narrative shift
      </>
    }
  />,

  // 6 — So here's the takeaway…
  <TextSlide key="takeaway">
    Don&rsquo;t buy the <HL>doom</HL> or the <HL delay={0.4}>hype</HL>
  </TextSlide>,

  // 7 — Comment MIKA…
  <CtaSlide
    key="cta"
    sub="for guides to get started with AI."
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="AI guides preview"
  />,
];

export default function AiLeadersWalkingBackJobsDeckPage() {
  return <Deck slides={slides} />;
}
