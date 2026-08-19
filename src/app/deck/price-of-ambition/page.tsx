import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

import { SeriesCoverSlide } from "../_shared/series";

export const metadata: Metadata = { title: "The Price of Ambition" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — As an ambitious woman in tech & AI, I once thought learning to smoke was the price of getting ahead. Because at one startup, important company conversations happened during the boys' lunchtime smoke breaks. I hate how reasonable that calculation felt at the time.
  <ImageSlide
    key="men-smoking-break"
    src={`${LIB}/men-smoking-break-2.png`}
    alt="Men taking a lunchtime smoke break outside an office"
  />,

  // 2 — This is my Women in AI series, part 1.
  <SeriesCoverSlide key="cover" episode={1} description="The price of ambition" />,

  // 3 — I told myself I was simply being strategic. If I wanted to advance, I needed to learn the rules of the room and adapt accordingly. I didn't start smoking. But I adapted in other ways.
  <TextSlide key="adapted">
    I didn&apos;t start smoking. I <HL>adapted</HL>.
  </TextSlide>,

  // 4 — I prioritized economics, data, and computer science over creative skills. As a PM, I fought to earn respect from engineers. Then I became the CEO of a fintech startup because one male-dominated industry apparently wasn't enough.
  <ImageSlide
    key="mika-linkedin-hero"
    src={`${LIB}/mika-linkedin-hero.png`}
    alt="Mika's LinkedIn profile hero"
  />,

  // 5 — I was also sanding down the parts of me that were warm, empathetic, intuitive, and creative.
  <TextSlide key="sanded-down">warm · empathetic · intuitive · creative</TextSlide>,

  // 7 — But now, the value of those skills has changed. AI has made analytical and technical execution faster, cheaper, and more accessible. Taste, judgment, creativity and empathy are more valuable. In the AI age, the qualities us women were encouraged to hide may become some of our greatest advantages in this AI economy.
  <TextSlide key="new-advantages">taste, judgment, creativity and empathy</TextSlide>,

  // 8 — In the next post, I'll explain with data why I believe AI could become one of the biggest wealth-building opportunities for women & why we're uniquely positioned to win. Follow for the next episode and comment MIKA if you want a copy of my women and AI article.
  <CtaSlide
    key="cta"
    prompt={null}
    size="md"
    headlinePlain
    headline={
      <>
        Comment <HL>MIKA</HL> for the article
      </>
    }
    sub="Follow for Episode 2"
    preview={`${LIB}/women-and-ai-article-preview.webp`}
    previewAlt="Women and AI article preview"
  />,
];

export default function PriceOfAmbitionDeckPage() {
  return <Deck slides={slides} />;
}
