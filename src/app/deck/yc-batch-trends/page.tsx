import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, DualImageSlide, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "YC P26 Batch Trends",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — YC P26 results are in
  <ImageSlide
    key="p26-results"
    src={`${LIB}/yc-homepage.png`}
    alt="Y Combinator homepage"
    caption={<>YC P26 results are in</>}
  />,

  // 2 — 95% of the new YC class is touching AI now…
  <TextSlide key="not-differentiator">
    <HL>95%</HL> touch AI — it&rsquo;s not the <HL delay={0.4}>differentiator</HL>
  </TextSlide>,

  // 3 — I went through some posts & numbers…
  <ImageSlide
    key="stat-intro"
    src={`${LIB}/yc-p26-stats-intro.png`}
    alt="YC P26 batch stats from Olivia Moore and Chris Lu"
  />,

  // 4 — First, AI isn't a feature anymore…
  <TextSlide key="ai-native">
    <HL>80%</HL> AI-native — AI <HL delay={0.4}>is</HL> the product
  </TextSlide>,

  // 5 — Second, agents are the real headline…
  <ImageSlide
    key="building-agents"
    src={`${LIB}/yc-building-agents.jpeg`}
    alt="YC P26 companies building AI agents"
  />,

  // 6 — Third, this is a B2B batch…
  <DualImageSlide
    key="b2b-batch"
    left={{
      src: `${LIB}/yc-p26-industry.jpeg`,
      alt: "YC P26 industry breakdown",
    }}
    right={{
      src: `${LIB}/yc-p26-business-model.jpeg`,
      alt: "YC P26 business model breakdown",
    }}
  />,

  // 7 — So here's what actually wins instead…
  <TextSlide key="execution" emoji="🏁">
    Win on <HL>execution &amp; distribution</HL>, not product ideas.
  </TextSlide>,

  // 8 — Comment MIKA for links to the YC batch breakdown
  <CtaSlide key="cta" sub="for links to the YC batch breakdown." />,
];

export default function YcBatchTrendsDeckPage() {
  return <Deck slides={slides} />;
}
