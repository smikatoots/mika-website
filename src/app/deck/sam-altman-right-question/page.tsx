import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "The New No. 1 Ability — Sam Altman",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const MUTED = "#A1A1AA";
const MUTED_LINE = "#D4D4D8";

/**
 * Slide 7 visual — two stacked flows. The "old way" runs problem → you → answer
 * in muted grey; the "new way" puts the human at the front, naming the problem,
 * in coral, then hands off to AI.
 */
function OldWayNewWaySvg() {
  const rows = [
    {
      label: "OLD WAY",
      labelFill: MUTED,
      y: 92,
      stroke: MUTED_LINE,
      textFill: MUTED,
      arrow: MUTED_LINE,
      accentFirst: false,
      pills: [["PROBLEM"], ["YOU"], ["ANSWER"]],
    },
    {
      label: "NEW WAY",
      labelFill: ACCENT,
      y: 432,
      stroke: INK,
      textFill: INK,
      arrow: INK,
      accentFirst: true,
      pills: [["NAME THE", "PROBLEM"], ["AI"], ["ANSWER"]],
    },
  ];

  const PILL_W = 290;
  const PILL_H = 130;
  const GAP = 70;
  const X0 = 55;

  return (
    <div className="deck-pop flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1120 620"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="Old way: problem, then you, then answer. New way: you name the problem, then AI, then the answer."
      >
        <defs>
          <marker
            id="arrow-muted"
            viewBox="0 0 12 12"
            refX={10}
            refY={6}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
          >
            <path d="M0 0 L12 6 L0 12 z" fill={MUTED_LINE} />
          </marker>
          <marker
            id="arrow-ink"
            viewBox="0 0 12 12"
            refX={10}
            refY={6}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
          >
            <path d="M0 0 L12 6 L0 12 z" fill={INK} />
          </marker>
        </defs>

        {rows.map((row) => (
          <g key={row.label}>
            <text
              x={X0}
              y={row.y - 32}
              fontSize={30}
              fontWeight={700}
              letterSpacing={5}
              fill={row.labelFill}
            >
              {row.label}
            </text>

            {row.pills.map((lines, i) => {
              const x = X0 + i * (PILL_W + GAP);
              const filled = row.accentFirst && i === 0;
              const cy = row.y + PILL_H / 2;
              const fontSize = lines.length > 1 ? 38 : 44;
              const startY = cy - ((lines.length - 1) * fontSize * 1.15) / 2;

              return (
                <g key={lines.join(" ")}>
                  <rect
                    x={x}
                    y={row.y}
                    width={PILL_W}
                    height={PILL_H}
                    rx={28}
                    fill={filled ? ACCENT : "#ffffff"}
                    stroke={filled ? ACCENT : row.stroke}
                    strokeWidth={3}
                  />
                  {lines.map((line, li) => (
                    <text
                      key={line}
                      x={x + PILL_W / 2}
                      y={startY + li * fontSize * 1.15}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={fontSize}
                      fontWeight={700}
                      letterSpacing={1}
                      fill={filled ? "#ffffff" : row.textFill}
                    >
                      {line}
                    </text>
                  ))}

                  {i < row.pills.length - 1 && (
                    <line
                      x1={x + PILL_W + 14}
                      y1={cy}
                      x2={x + PILL_W + GAP - 14}
                      y2={cy}
                      stroke={row.arrow}
                      strokeWidth={4}
                      markerEnd={
                        row.arrow === INK
                          ? "url(#arrow-ink)"
                          : "url(#arrow-muted)"
                      }
                    />
                  )}
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — The CEO of OpenAI said the number one ability you need to succeed is not raw intelligence. It's this instead, and most high-achievers are actively bad at it.
  <Fragment key="altman-hook">
    <ImageSlide src={`${LIB}/sam-altman.jpeg`} alt="Sam Altman, CEO of OpenAI" />
    <Notes>
      The CEO of OpenAI said the number one ability you need to succeed is not
      raw intelligence. It&apos;s this instead, and most high-achievers are
      actively bad at it.
    </Notes>
  </Fragment>,

  // 2 — For twenty years the most valuable person in the room was the one with the answer. That person now costs twenty dollars a month and replies in three seconds.
  <Fragment key="openai">
    <ImageSlide src={`${LIB}/openai-logo.png`} alt="The OpenAI logo" />
    <Notes>
      For twenty years the most valuable person in the room was the one with the
      answer. That person now costs twenty dollars a month and replies in three
      seconds.
    </Notes>
  </Fragment>,

  // 3 — What's left is knowing which question to point it at.
  <Fragment key="question">
    <TextSlide display>???</TextSlide>
    <Notes>What&apos;s left is knowing which question to point it at.</Notes>
  </Fragment>,

  // 4 — High achievers are the worst at this. We got rewarded for a decade for raising our hand with the answer, so asking feels like admitting you don't know.
  <Fragment key="nerd">
    <ImageSlide
      src={`${LIB}/nerd.gif`}
      alt="An eager student raising their hand with the answer"
    />
    <Notes>
      High achievers are the worst at this. We got rewarded for a decade for
      raising our hand with the answer, so asking feels like admitting you
      don&apos;t know.
    </Notes>
  </Fragment>,

  // 5 — I did that for years. I was the nerdiest person in my classrooms and I walk into my meeting with the answer already loaded.
  <Fragment key="wesleyan">
    <ImageSlide
      src={`${LIB}/wesleyan-college-graduation.jpg`}
      alt="Mika at her Wesleyan college graduation"
    />
    <Notes>
      I did that for years. I was the nerdiest person in my classrooms and I
      walk into my meeting with the answer already loaded.
    </Notes>
  </Fragment>,

  // 6 — Altman said the greatest professional joy of his career came from reasoning through a problem and landing on an answer no one had found before.
  <Fragment key="altman-joy">
    <ImageSlide src={`${LIB}/sam-altman.jpeg`} alt="Sam Altman, CEO of OpenAI" />
    <Notes>
      Altman said the greatest professional joy of his career came from
      reasoning through a problem and landing on an answer no one had found
      before.
    </Notes>
  </Fragment>,

  // 7 — He's not saying the thinking is over. He said there's going to be a new way we work on the hard problems, and that work starts with whoever names the problem.
  <Fragment key="old-way-new-way">
    <OldWayNewWaySvg />
    <Notes>
      He&apos;s not saying the thinking is over. He said there&apos;s going to
      be a new way we work on the hard problems, and that work starts with
      whoever names the problem.
    </Notes>
  </Fragment>,

  // 8 — Do you agree? Let me know what you think in the comments and follow to build a time-rich career & life on your own terms with AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Do you agree?"
      headline="FOLLOW"
      sub="for a time-rich career & life with AI."
    />
    <Notes>
      Do you agree? Let me know what you think in the comments and follow to
      build a time-rich career and life on your own terms with AI.
    </Notes>
  </Fragment>,
];

export default function SamAltmanRightQuestionDeckPage() {
  return <Deck slides={slides} />;
}
