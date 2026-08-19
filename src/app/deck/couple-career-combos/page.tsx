import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "4 couple career combos in AI" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — The most ambitious couples in AI have one person in a steady AI job and one in a moonshot, trading intel every night.
  <TextSlide key="hook" display>
    ambitious AI couples: 💆 + 🚀 -&gt; 💬
  </TextSlide>,

  // 2 — One plays the security game, one plays the freedom game, and you trade intel to build leverage.
  <TextSlide key="thesis">
    <HL>security</HL> 💆 + <HL>freedom</HL> 🚀 + <HL>intel</HL> 💬 = leverage
  </TextSlide>,

  // 3 — Combo one. A founder and a W2 employee. That was me and my husband.
  <ImageSlide
    key="founder-w2"
    src={`${LIB}/mika-and-nick.jpeg`}
    alt="Mika and Nick — a founder and a W2 employee"
    caption={
      <>
        <A>AI Founder</A> + W2
      </>
    }
  />,

  // 4 — Combo two. An AI founder and someone using AI inside a traditional industry.
  <ImageSlide
    key="founder-trad"
    src={`${LIB}/home-services.jpeg`}
    alt="A traditional industry worksite — construction, manufacturing, home services"
    caption={
      <>
        <A>AI Founder</A> + Employee in Trad Industry
      </>
    }
  />,

  // 5 — Combo three. An AI founder and an AI investor.
  <ImageSlide
    key="investor-founder"
    src={`${LIB}/investor-founder.jpeg`}
    alt="An AI investor and an AI founder"
    caption={
      <>
        <A>AI Investor</A> + Founder
      </>
    }
  />,

  // 6 — Combo four. A fractional AI consultant and a full-time employee at an AI company.
  <ImageSlide
    key="w2-fractional"
    src={`${LIB}/fractional-consultant.jpg`}
    alt="A fractional AI consultant working across multiple companies"
    caption={
      <>
        <A>AI W2</A> + Fractional
      </>
    }
  />,

  // 7 — CTA: I talk about these 6 career games. Comment MIKA for the full post.
  <CtaSlide
    key="cta"
    prompt={null}
    size="md"
    headlinePlain
    headline={
      <>
        Comment <HL>MIKA</HL>
      </>
    }
    sub="for the 6 career games in the age of AI"
    preview={`${LIB}/six-career-games.png`}
    previewAlt="The Six Career Games value slide"
  />,
];

export default function CoupleCareerCombosDeckPage() {
  return <Deck slides={slides} />;
}
