import type { Metadata } from "next";
import { Caveat } from "next/font/google";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  CoverSlide,
  HL,
  ImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

import { SeriesCoverSlide } from "../_shared/series";

export const metadata: Metadata = {
  title: "The AI Era Belongs to Women — Episode 4",
};

const LIB = "/decks/_library";

const ACCENT = "#fd4869";
const INK = "#111111";

// Handwriting face for the "MARKETING ENGINEER" scrawl on the cover badge.
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/**
 * Slide 1 — a slightly rotated white conference name badge with a drop shadow.
 * "MARKETING" is printed on it in black Bricolage, crossed out with a
 * hand-drawn salmon line, and a short salmon arrow curves down to a
 * handwritten "MARKETING ENGINEER" scribbled underneath.
 */
function MarketingBadge() {
  return (
    <div
      className={`${caveat.variable} deck-pop flex h-full w-full items-center justify-center p-4`}
    >
      <svg
        viewBox="0 0 1000 620"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label='A name badge reading "MARKETING", crossed out and relabeled by hand as "MARKETING ENGINEER".'
      >
        <defs>
          <filter id="badge-shadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow
              dx="0"
              dy="26"
              stdDeviation="26"
              floodColor="#000000"
              floodOpacity="0.22"
            />
          </filter>
        </defs>

        <g transform="rotate(-3.5 500 310)">
          {/* the badge card */}
          <rect
            x={100}
            y={70}
            width={800}
            height={480}
            rx={28}
            fill="#ffffff"
            stroke="#e6e6e6"
            strokeWidth={2}
            filter="url(#badge-shadow)"
          />
          {/* lanyard slot */}
          <rect x={455} y={118} width={90} height={16} rx={8} fill="#d9d9d9" />

          {/* the printed title */}
          <text
            x={500}
            y={286}
            textAnchor="middle"
            fontSize={104}
            fontWeight={700}
            letterSpacing={1}
            fill={INK}
          >
            MARKETING
          </text>

          {/* hand-drawn strike-through */}
          <g stroke={ACCENT} strokeWidth={9} strokeLinecap="round" fill="none">
            <path d="M168 252 C 300 234 424 260 566 240 S 762 248 840 232" />
            <path
              d="M176 262 C 316 246 436 268 578 250 S 768 256 834 244"
              strokeWidth={4}
              opacity={0.5}
            />
          </g>

          {/* curved arrow down to the handwritten relabel */}
          <g stroke={ACCENT} strokeWidth={7} strokeLinecap="round" fill="none">
            <path d="M648 316 C 694 366 622 392 512 408" />
            <polyline points="541,414 512,408 537,392" strokeWidth={7} />
          </g>

          {/* the handwritten relabel */}
          <text
            x={500}
            y={492}
            textAnchor="middle"
            fontFamily="var(--font-caveat), cursive"
            fontSize={74}
            fontWeight={700}
            fill={ACCENT}
          >
            MARKETING ENGINEER
          </text>
        </g>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — I'm convinced marketing is getting rebranded in the age of AI to make it more acceptable for the boys.
  <CoverSlide key="cover-badge" diagram={<MarketingBadge />} />,

  // 2 — This is Episode 4 of Women & AI.
  <SeriesCoverSlide key="cover" episode={4} description="Marketing gets a rebrand" />,

  // 3 — At first, I told myself the work had probably evolved. AI is creating new roles, after all.
  <ImageSlide
    key="evolution"
    src={`${LIB}/human-evolution.gif`}
    alt="Human evolution march"
  />,

  // 4 — But then I started seeing it everywhere:
  <TextSlide key="everywhere">
    But then I started seeing it <HL>everywhere</HL>
  </TextSlide>,

  // 5 — Marketing became "growth engineering" or "marketing engineering."
  <ImageSlide
    key="step-marketing"
    src={`${LIB}/marketing-engineer-job-board.png`}
    alt="Job board listings for marketing engineer roles"
    caption={
      <>
        Marketing &rarr; <A>&quot;growth engineering&quot;</A>
      </>
    }
  />,

  // 6 — Social media became "UGC engineering"
  <ImageSlide
    key="step-social"
    src={`${LIB}/ugc-engineer-job-description.webp`}
    alt="UGC engineer job description"
    caption={
      <>
        Social media &rarr; <A>&quot;UGC engineering&quot;</A>
      </>
    }
  />,

  // 7 — Writing became "prompt engineering."
  <ImageSlide
    key="step-writing"
    src={`${LIB}/prompt-engineering.png`}
    alt="Prompt engineering role"
    caption={
      <>
        Writing &rarr; <A>&quot;prompt engineering&quot;</A>
      </>
    }
  />,

  // 8 — Did the boys just discover marketing??!?!?!
  <ImageSlide
    key="spongebob"
    src={`${LIB}/marketing-spongebob.gif`}
    alt="SpongeBob reaction to marketing"
  />,

  // 9 — Now AI is making technical execution easier while increasing the value of distribution, creativity, taste, empathy, and storytelling.
  <TextSlide key="distribution">distribution &gt; technical execution</TextSlide>,

  // 10 — And right as those skills become more valuable, we're attaching "engineering" to them.
  <TextSlide key="engineering">&quot;engineering&quot;</TextSlide>,

  // 11 — 6 women programmed the ENIAC, and at its 1946 public debut the male hardware designers were introduced to the press.
  <ImageSlide
    key="eniac"
    src={`${LIB}/eniac.webp`}
    alt="Women programming the ENIAC computer"
  />,

  // 12 — Programming was treated as lower-status clerical work when women did it.
  <ImageSlide
    key="hidden-figures"
    src={`${LIB}/hidden-figures.webp`}
    alt="Hidden Figures"
  />,

  // 13 — We can't let history repeat with AI. Follow for the other 2 consequences.
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        <HL>Follow</HL> for Ep. 5 — the other 2 consequences
      </>
    }
    headlinePlain
    size="md"
    textWide
    preview={`${LIB}/women-and-ai-article-preview.webp`}
    previewAlt="Preview of the Women & AI article"
  />,
];

export default function MasculinizationOfMarketingDeckPage() {
  return <Deck slides={slides} />;
}
