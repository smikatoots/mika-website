import { Fragment } from "react";
import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Anthropic President: The #1 Degree to Study in the AI Age",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const SURFACE = "#E4E4E7";
const DECK_FONT = "var(--font-deck), system-ui, sans-serif";

/**
 * Slide 3 visual — the rising floor.
 *
 * A ramp climbing left to right is everyone's AI-raised baseline. The top
 * sliver of that ramp is the only coral on the slide: the last 10% that is
 * now worth 10x, tapering to the 1% tip worth 100x.
 */
function RisingFloorDiagram() {
  return (
    <div className="deck-fade flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 640"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="A ramp rising from left to right. The bulk of it is labelled the floor; the coral sliver at the top is the last 10 percent, worth 10x, tapering to a 1 percent tip worth 100x."
      >
        {/* The raised floor — the bulk of the ramp */}
        <polygon points="100,560 1060,150 1060,560" fill={SURFACE} />

        {/* The last 10% — the top sliver, the one accent on this slide */}
        <polygon points="802,260 1060,150 1060,260" fill={ACCENT} />

        {/* Ground line */}
        <line
          x1={100}
          y1={560}
          x2={1060}
          y2={560}
          stroke={INK}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Leader from the apex up to the 1% label */}
        <line
          x1={1052}
          y1={148}
          x2={1052}
          y2={104}
          stroke={INK}
          strokeWidth={3}
          strokeLinecap="round"
        />

        <text
          x={1060}
          y={84}
          textAnchor="end"
          fill={INK}
          fontSize={46}
          fontWeight={800}
          letterSpacing="-0.02em"
        >
          LAST 1% = 100×
        </text>

        <text
          x={1020}
          y={232}
          textAnchor="end"
          fill={INK}
          fontSize={44}
          fontWeight={800}
          letterSpacing="-0.02em"
        >
          LAST 10% = 10×
        </text>

        <text
          x={560}
          y={470}
          textAnchor="middle"
          fill={INK}
          fontSize={56}
          fontWeight={800}
          letterSpacing="-0.03em"
        >
          THE FLOOR
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Anthropic's president argues that if AI raises the floor for everyone, then this degree and this skill are worth 100x more.
  <Fragment key="hook">
    <TextSlide>
      This degree is now worth <HL>100x</HL> more
    </TextSlide>
    <Notes>
      Anthropic&apos;s president argues that if AI raises the floor for
      everyone, then this degree and this skill are worth 100x more.
    </Notes>
  </Fragment>,

  // 2 — That's Daniela Amodei. She said that in the age of AI, we should prize the things that make us human.
  <Fragment key="amodei">
    <ImageSlide
      src={`${LIB}/anthropic-president-degree-daniela-amodei-interview.png`}
      alt="Daniela Amodei, President of Anthropic, in an ABC News Live interview."
    />
    <Notes>
      That&apos;s Daniela Amodei. She said that in the age of AI, we should
      prize the things that make us human.
    </Notes>
  </Fragment>,

  // 3 — When the floor rises everywhere, the last 10% matters 10x more. The last 1%, 100x more.
  <Fragment key="rising-floor">
    <RisingFloorDiagram />
    <Notes>
      The way I read it: when the floor rises everywhere, the last 10% matters
      10x more. The last 1%, 100x more.
    </Notes>
  </Fragment>,

  // 4 — Everyone's using AI on job applications, so every resume reads perfect. The relationship is what gets you hired.
  <Fragment key="relationships">
    <TextSlide>
      Finding a job? <HL>Relationships</HL> win.
    </TextSlide>
    <Notes>
      Everyone&apos;s using AI on job applications, so every resume reads
      perfect. The relationship is what gets you hired.
    </Notes>
  </Fragment>,

  // 5 — Same with college essays. The one that still sounds human wins.
  <Fragment key="essays">
    <TextSlide>
      Writing essays? <HL>Human</HL> writing wins.
    </TextSlide>
    <Notes>
      Same with college essays. The one that still sounds human wins.
    </Notes>
  </Fragment>,

  // 6 — I studied at a liberal arts college, and all the humanities classes I took are now the valuable ones.
  <Fragment key="liberal-arts">
    <ImageSlide
      src={`${LIB}/wesleyan-college-graduation.jpg`}
      alt="A liberal arts college graduation ceremony on campus."
    />
    <Notes>
      Which to me means the degree that appreciates is the more human one. I
      studied at a liberal arts college, and I&apos;m excited because all the
      humanities classes I took are now the valuable ones in the age of AI.
    </Notes>
  </Fragment>,

  // 7 — You're the final touch, the orchestrator, the tutor, the taste, the judgment, the expert. The human.
  <Fragment key="human">
    <TextSlide emoji="💁‍♀️" display>
      HUMAN
    </TextSlide>
    <Notes>
      Because humans matter more now. You&apos;re the final touch, the
      orchestrator, the tutor, the taste, the judgment, the expert. The human.
    </Notes>
  </Fragment>,

  // 8 — Follow to build a time-rich career & life with AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Follow for a"
      headline="TIME RICH"
      sub="career &amp; life with AI"
    />
    <Notes>
      Let me know what you think in the comments, and follow to build a
      time-rich career and life on your own terms with AI.
    </Notes>
  </Fragment>,
];

export default function AnthropicPresidentDegreeDeckPage() {
  return <Deck slides={slides} />;
}
