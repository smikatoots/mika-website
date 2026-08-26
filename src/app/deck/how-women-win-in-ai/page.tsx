import type { Metadata } from "next";

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
  title: "The AI Era Belongs to Women — Episode 6",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";

/**
 * Slide 8 visual — a 2×2 grid of outlined tiles, each with a small salmon dot
 * in its top-left corner, naming a form of ownership.
 */
function OwnershipGrid() {
  const tiles = [
    { label: "EQUITY", x: 20, y: 20 },
    { label: "AUDIENCE", x: 510, y: 20 },
    { label: "INVESTMENTS", x: 20, y: 300 },
    { label: "SMALL BUSINESS", x: 510, y: 300 },
  ];

  return (
    <div className="deck-pop flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 960 580"
        className="h-auto w-full max-w-2xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="Four forms of ownership: equity, audience, investments, small business."
      >
        {tiles.map(({ label, x, y }) => (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={430}
              height={260}
              rx={28}
              fill="#ffffff"
              stroke={INK}
              strokeWidth={2}
            />
            <circle cx={x + 40} cy={y + 44} r={12} fill={ACCENT} />
            <text
              x={x + 215}
              y={y + 150}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={42}
              fontWeight={700}
              letterSpacing={1}
              fill={INK}
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — So, how do women win in the AI era? What needs to change?
  <ImageSlide
    key="article-preview"
    src={`${LIB}/women-and-ai-article-preview.webp`}
    alt="Women and AI article preview"
  />,

  // 2 — This is the final episode of my Women in AI series.
  <SeriesCoverSlide key="cover" episode={6} description="What to do about it" />,

  // 3 — I'm making this for myself and for my little sister, who's eight years younger than me as much as I am for everyone else.
  <ImageSlide
    key="mika-and-sister"
    src={`${LIB}/mika-and-sister.webp`}
    alt="Mika and her little sister"
  />,

  // 4 — Women cannot close this gap alone. Stop asking why women are falling behind, and ask what needs to change about AI.
  // Both approved lines are far longer than a normal statement, so they're set
  // a step below the statement floor to fit the slide without clipping — the
  // same accommodation StepsSlide labels get when they run long.
  <TextSlide key="better-question">
    <span className="block text-6xl leading-[1.1] text-zinc-400 line-through decoration-[var(--deck-accent)] decoration-[0.07em] sm:text-7xl">
      Why are women falling behind?
    </span>
    <span className="mt-8 block text-7xl leading-[1.06] sm:text-8xl">
      What needs to change about AI so more women say yes?
    </span>
  </TextSlide>,

  // 5 — So, while we keep pushing the industry to change, here are three things that are in your control.
  <TextSlide key="in-your-control">
    3 things in <HL>your</HL> control
  </TextSlide>,

  // 6 — First, start with your own problems. My first AI aha moment was cleaning up my messy Desktop.
  <ImageSlide
    key="step-own-problems"
    src={`${LIB}/desktop-anxiety-downloads.png`}
    alt="A messy Downloads folder full of files"
    caption={
      <>
        Start with <A>your own problems</A>
      </>
    }
  />,

  // 7 — Second, build a personal brand by sharing what you learn. My AI health dashboard got 300,000 views and ended up in The Wall Street Journal.
  <ImageSlide
    key="step-share"
    src={`${LIB}/wsj-datamaxxers.png`}
    alt="Wall Street Journal article on datamaxxers"
    caption={
      <>
        Share <A>what you learn</A>
      </>
    }
  />,

  // 8 — Third, move closer to ownership. Equity, an audience, investments, or a small business.
  <CoverSlide
    key="step-ownership"
    title={
      <>
        Move closer to <HL>ownership</HL>
      </>
    }
    diagram={<OwnershipGrid />}
  />,

  // 9 — Women are the best positioned to win in the AI economy & we can take advantage of this today.
  <TextSlide key="best-positioned">
    Women are <HL>best positioned</HL> to win
  </TextSlide>,

  // 10 — I explore all this in my full Substack piece. Comment "MIKA" for that & share this with one woman you want to win with.
  <CtaSlide
    key="cta"
    prompt={null}
    size="md"
    headlinePlain
    headline={
      <>
        Comment <HL>MIKA</HL> for my full piece on Women &amp; AI
      </>
    }
    sub="Share this with one woman you want to win with."
    preview={`${LIB}/women-and-ai-article-preview.webp`}
    previewAlt="Women and AI article preview"
  />,
];

export default function HowWomenWinInAiDeckPage() {
  return <Deck slides={slides} />;
}
