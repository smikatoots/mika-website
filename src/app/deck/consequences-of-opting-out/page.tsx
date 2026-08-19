import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, DualImageSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

import { SeriesCoverSlide } from "../_shared/series";

export const metadata: Metadata = { title: "The AI Era Belongs to Women — Episode 5" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — WHAT'S WRONG WITH THIS PHOTO?
  <ImageSlide
    key="panel-question"
    src={`${LIB}/women-in-ai-panel.png`}
    alt="Panel about AI with its organizers and speakers"
  />,

  // 2 — Don't worry, I'll wait. This is a photo of a panel about AI with the organizers and speakers. Hint: this is the Women in AI series.
  <SeriesCoverSlide key="cover" episode={5} description="Consequences of opting out" />,

  // 3 — Time's up. Yes I am the only woman.
  <ImageSlide
    key="panel-answer"
    src={`${LIB}/women-in-ai-panel-2.webp`}
    alt="The same AI panel, with Mika as the only woman"
  />,

  // 4 — This photo might look a bit familiar with the PayPal mafia photo.
  <ImageSlide
    key="paypal-mafia"
    src={`${LIB}/paypal-mafia.jpg`}
    alt="Fortune's PayPal Mafia photo"
  />,

  // 5 — There are legitimate reasons for opting out of AI, but AI is getting built regardless and women opting out lose in three ways.
  <TextSlide key="either-way">
    AI gets built <HL>either way</HL>
  </TextSlide>,

  // 6 — First is history: who gets remembered and credited, covered in the last episode.
  <ImageSlide
    key="history-eniac"
    src={`${LIB}/eniac.webp`}
    alt="The women programmers of the ENIAC computer"
    caption={
      <>
        <A>History</A> — who gets credit
      </>
    }
  />,

  // 7 — Second is power and who shapes the technology. The fewer women shaping AI, the less power we have to challenge systems that fail women.
  <DualImageSlide
    key="power"
    left={{ src: `${LIB}/sam-altman.jpeg`, alt: "Sam Altman" }}
    right={{ src: `${LIB}/dario-amodei.jpeg`, alt: "Dario Amodei" }}
    caption={
      <>
        <A>Power</A> — who makes decisions
      </>
    }
  />,

  // 8 — ChatGPT recommended about $1,000 more in negotiations when the same employee used he/him instead of she/her.
  <TextSlide key="gender-bias">ChatGPT: gender bias in negotiations</TextSlide>,

  // 9 — Lastly, ownership. Early equity, relationships, and reputations compound for decades — 13 men who went on to build LinkedIn, YouTube, Palantir.
  <ImageSlide
    key="paypal-mafia-ownership"
    src={`${LIB}/paypal-mafia.jpg`}
    alt="Fortune's PayPal Mafia photo"
    caption={
      <>
        <A>Ownership</A> — who gains wealth
      </>
    }
  />,

  // 10 — But I'm not hopeless. I still believe women are the best positioned to win in the AI economy.
  <ImageSlide
    key="women-and-ai"
    src={`${LIB}/women-and-ai-article-preview.webp`}
    alt="Women and AI article preview"
  />,

  // 11 — Follow for the final episode, where I'll share what we can do to take advantage of this era.
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        <HL>Follow</HL> for the final episode of The AI Era Belongs to Women
      </>
    }
    headlinePlain
    size="md"
  />,
];

export default function ConsequencesOfOptingOutDeckPage() {
  return <Deck slides={slides} />;
}
