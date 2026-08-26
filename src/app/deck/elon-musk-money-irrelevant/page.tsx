import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Elon Musk: AI makes money irrelevant",
};

const LIB = "/decks/_library";

const INK = "var(--deck-ink)";
const ACCENT = "var(--deck-accent)";
const DECK_FONT = "var(--font-deck), ui-sans-serif, system-ui, sans-serif";

// ─── Co-located diagrams ─────────────────────────────────────────────────────

/**
 * Slide 2 — "scarce" vs "abundant" split panel.
 *
 * Left: a handful of units and a working dollar sign. Right: the same units
 * everywhere and the dollar sign struck out in coral — the one accent on the
 * slide, landing on the payoff ("money stops having a job").
 */
function ScarceVsAbundantSlide() {
  const scarce = [190, 286, 382];
  const abundantCols = [784, 836, 888, 940, 992, 1044, 1096];
  const abundantRows = [190, 242, 294];

  return (
    <div className="flex h-full w-full items-center justify-center px-12">
      <svg
        viewBox="0 0 1280 560"
        className="deck-fade w-full max-w-[1320px]"
        role="img"
        aria-label="Split panel: a scarce world with few goods and a working dollar, next to an abundant world with many goods and the dollar crossed out"
        style={{ fontFamily: DECK_FONT }}
      >
        {/* divider */}
        <path
          d="M640 20 L640 540"
          stroke={INK}
          strokeWidth={3}
          strokeOpacity={0.25}
          strokeDasharray="10 14"
          strokeLinecap="round"
        />

        {/* ── SCARCE ── */}
        <text
          x={320}
          y={104}
          textAnchor="middle"
          fontSize={96}
          fontWeight={800}
          letterSpacing={-3}
          fill={INK}
        >
          SCARCE
        </text>
        {scarce.map((x) => (
          <rect
            key={`scarce-${x}`}
            x={x}
            y={222}
            width={68}
            height={68}
            rx={10}
            fill="none"
            stroke={INK}
            strokeWidth={6}
          />
        ))}
        <text
          x={320}
          y={500}
          textAnchor="middle"
          fontSize={190}
          fontWeight={800}
          fill={INK}
        >
          $
        </text>

        {/* ── ABUNDANT ── */}
        <text
          x={960}
          y={104}
          textAnchor="middle"
          fontSize={96}
          fontWeight={800}
          letterSpacing={-3}
          fill={INK}
        >
          ABUNDANT
        </text>
        {abundantRows.map((y) =>
          abundantCols.map((x) => (
            <rect
              key={`abundant-${x}-${y}`}
              x={x}
              y={y}
              width={40}
              height={40}
              rx={7}
              fill="none"
              stroke={INK}
              strokeWidth={5}
            />
          )),
        )}
        <text
          x={960}
          y={500}
          textAnchor="middle"
          fontSize={190}
          fontWeight={800}
          fill={INK}
        >
          $
        </text>
        <path
          d="M895 522 L1025 392"
          stroke={ACCENT}
          strokeWidth={18}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Elon Musk predicts that AI makes money and retirement savings irrelevant
  //     in the next 20 years. Here's his actual logic, and the one part I think
  //     he gets completely wrong.
  <Fragment key="headline">
    <ImageSlide
      src={`${LIB}/elon-musk-money-irrelevant-article-headline.png`}
      alt="Fortune headline: Elon Musk warns that money will 'disappear' in the future as AI makes work (and salaries) irrelevant"
      framed
    />
    <Notes>
      {
        "Elon Musk predicts that AI makes money and retirement savings irrelevant in the next 20 years. And no, he's not saying AI turns everyone into a billionaire. Here's his actual logic, and the one part I think he gets completely wrong."
      }
    </Notes>
  </Fragment>,

  // 2 — Money is a tool for allocating scarce labor. If nothing stays scarce,
  //     money stops having a job to do.
  <Fragment key="scarce-abundant">
    <ScarceVsAbundantSlide />
    <Notes>
      {
        "His argument is that money is a tool for allocating scarce labor. If AI and robots can produce almost anything, nothing stays scarce, and money stops having a job to do."
      }
    </Notes>
  </Fragment>,

  // 3 — Grocery analogy: buy vegetables today, grow them tomorrow. Same with
  //     software.
  <Fragment key="grocery-garden">
    <ImageSlide
      src={`${LIB}/elon-musk-money-irrelevant-grocery-aisle.png`}
      alt="A supermarket aisle stacked with packaged food"
    />
    <Notes>
      {
        "His analogy is with groceries. Today you buy vegetables at the store, in the future you just grow them in your backyard. Same with software in the AI world: you stop buying the tool and can now build the thing yourself."
      }
    </Notes>
  </Fragment>,

  // 4 — He's the richest man alive, so of course it's easy for him to say
  //     don't focus on money.
  <Fragment key="net-worth">
    <ImageSlide
      src={`${LIB}/elon-musk-money-irrelevant-net-worth.png`}
      alt="Search result: Elon Musk's net worth is approximately $855 billion, making him the richest person in the world"
      framed
    />
    <Notes>
      {
        "But here's where I think he's wrong. First off, he's the richest man alive so of course it's easy for him to say don't focus on money when you already own everything money buys."
      }
    </Notes>
  </Fragment>,

  // 5 — The point was never "build your own tools" — it's getting your life
  //     back. Automate the manual stuff, spend the time on what matters.
  <Fragment key="skip-automate-life">
    <TextSlide>
      goal: use money to be <HL>time rich</HL>
    </TextSlide>
    <Notes>
      {
        "Second, the point of all this was never that you can build your own tools now. It's that the tools should be giving you your life back. So don't rebuild software that already saves you hours. Automate the manual stuff still eating your week. Then go spend that time with your friends, your family, the things you actually love."
      }
    </Notes>
  </Fragment>,

  // 6 — Follow to build a time-rich career & life with AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Follow for a"
      headline="TIME RICH"
      sub="career & life with AI"
    />
    <Notes>
      {
        "Let me know what you think in the comments and follow to build a time-rich career and life on your own terms with AI."
      }
    </Notes>
  </Fragment>,
];

export default function ElonMuskMoneyIrrelevantDeckPage() {
  return <Deck slides={slides} />;
}
