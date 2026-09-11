import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import {
  DualImageSlide,
  HL,
  ImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "AI washing: the cycle big companies are running",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Bloomberg has a name for what happens when companies replace people with AI, keep the same broken systems, and then magically call it innovation: AI washing.
  <Fragment key="bloomberg-headline">
    <ImageSlide
      src={`${LIB}/bloomberg-logo.png`}
      alt="The Bloomberg wordmark"
      maxWidth="max-w-3xl"
    />
    <Notes>
      Bloomberg has a name for what happens when companies replace people with
      AI, keep the same broken systems, and then magically call it innovation:
      AI washing.
    </Notes>
  </Fragment>,

  // 2 — Companies are dressing up boring cost cuts and bad management as forward-thinking restructuring.
  <Fragment key="techcrunch-blame">
    <ImageSlide
      src={`${LIB}/techcrunch-blame-ai-layoffs.png`}
      alt="TechCrunch article about companies blaming AI for layoffs"
    />
    <Notes>
      Companies are dressing up boring cost cuts and bad management as
      forward-thinking restructuring.
    </Notes>
  </Fragment>,

  // 3 — Here's the part that should worry every CEO doing this. Employees know. Clients know.
  <Fragment key="layoff-stock-up">
    <DualImageSlide
      left={{
        src: `${LIB}/block_layoff.png`,
        alt: "Yahoo Finance headline: Jack Dorsey says Block is laying off 40% of employees due to AI innovation",
      }}
      right={{
        src: `${LIB}/block_layoff_stock_up.jpeg`,
        alt: "Block's stock price rising after the layoff announcement",
      }}
    />
    <Notes>
      Here&apos;s the part that should worry every CEO doing this. Employees
      know. Clients know.
    </Notes>
  </Fragment>,

  // 4 — It's the same story with hiring or managing a team. When I was building my startup, early on, we didn't necessarily have product-market fit, or we had a lot of broken systems. Hiring a person wasn't going to fix the fact that we didn't have product-market fit or the fact that we had broken systems.
  <Fragment key="bloomberg-article">
    <ImageSlide
      src={`${LIB}/ai-wash-cycle-bloomberg-headline-crop.png`}
      alt="Bloomberg Opinion headline by Catherine Thorbecke: AI Washing Is Masking an Insidious Labor Crisis"
    />
    <Notes>
      It&apos;s the same story with hiring or managing a team. When I was
      building my startup, early on, we didn&apos;t necessarily have
      product-market fit, or we had a lot of broken systems. Hiring a person
      wasn&apos;t going to fix the fact that we didn&apos;t have product-market
      fit or the fact that we had broken systems.
    </Notes>
  </Fragment>,

  // 5 — The candidates you want next year are watching how you talked about the people you cut this year.
  <Fragment key="dorsey-wording">
    <ImageSlide
      src={`${LIB}/ai-wash-cycle-dorsey-quote-crop.png`}
      alt="Yahoo Finance caption: Jack Dorsey says Block is laying off 40% of employees due to AI innovation"
    />
    <Notes>
      The candidates you want next year are watching how you talked about the
      people you cut this year.
    </Notes>
  </Fragment>,

  // 6 — Big corporations, we're not stupid. We are watching.
  <Fragment key="not-stupid">
    <TextSlide display>
      We&apos;re <HL>not stupid</HL>.
    </TextSlide>
    <Notes>Big corporations, we&apos;re not stupid. We are watching.</Notes>
  </Fragment>,

  // 7 — What do you think? Follow if you're also skeptical of big corporations in the age of AI.
  <Fragment key="cta">
    <CtaSlide prompt="What do you think?" headline={null} headlinePlain />
    <Notes>
      What do you think? Follow if you&apos;re also skeptical of big
      corporations in the age of AI.
    </Notes>
  </Fragment>,
];

export default function AiWashCycleDeckPage() {
  return <Deck slides={slides} />;
}
