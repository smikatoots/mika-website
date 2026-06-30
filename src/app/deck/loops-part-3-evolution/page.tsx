import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { LoopsQuad, LoopsTitle } from "../_shared/loops";

export const metadata: Metadata = { title: "Loops, Part 3 — The Evolution" };

const LIB = "/decks/_library";

const stages = [
  { label: "Prompt", year: "2020" },
  { label: "Context", year: "2023" },
  { label: "Harness", year: "2024" },
  { label: "Loop", year: "2026" },
];

// Four ascending steps, side by side so every label is fully visible. The
// active stage glows salmon and the figure stands on top of it — the higher
// the system climbs, the more it does for you.
function Staircase({ active }: { active: number }) {
  const accent = "#fd4869";
  const grey = "#d4d4d8";
  const baseY = 560;
  const barW = 210;
  const gap = 20;
  const startX = 70;
  const riser = 120;
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1030 640"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {stages.map((s, i) => {
          const x = startX + i * (barW + gap);
          const h = (i + 1) * riser;
          const y = baseY - h;
          const on = i === active;
          const cx = x + barW / 2;
          return (
            <g key={s.label}>
              <rect x={x} y={y} width={barW} height={h} rx="12" fill={on ? accent : grey} />
              <text
                x={cx}
                y={y + 58}
                textAnchor="middle"
                fontSize="42"
                fontWeight="800"
                fill={on ? "#ffffff" : "#71717a"}
              >
                {s.label}
              </text>
              <text
                x={cx}
                y={y + 106}
                textAnchor="middle"
                fontSize="40"
                fontWeight="600"
                fill={on ? "#ffe1e7" : "#a1a1aa"}
              >
                {s.year}
              </text>
              {on ? (
                <text x={cx} y={y - 16} textAnchor="middle" fontSize="80">
                  🧍
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Credibility grid (reused)
  <LoopsQuad key="quad" />,

  // 2 — Series marker
  <LoopsTitle key="title" part={3} />,

  // 3 — The four terms, side by side
  <TextSlide key="four-terms">
    <span>prompt vs. context vs. harness vs.</span>
    <span>
      <HL>loop</HL> engineering
    </span>
  </TextSlide>,

  // 4–7 — The evolution, one rung at a time
  <StepsSlide
    key="stage-prompt"
    steps={stages.map((s) => s.label)}
    current={0}
    visual={<Staircase active={0} />}
  />,
  <StepsSlide
    key="stage-context"
    steps={stages.map((s) => s.label)}
    current={1}
    visual={<Staircase active={1} />}
  />,
  <StepsSlide
    key="stage-harness"
    steps={stages.map((s) => s.label)}
    current={2}
    visual={<Staircase active={2} />}
  />,
  <StepsSlide
    key="stage-loop"
    steps={stages.map((s) => s.label)}
    current={3}
    visual={<Staircase active={3} />}
  />,

  // 8 — The pattern
  <TextSlide key="pattern">
    <span>Every evolution →</span>
    <span>the system does</span>
    <HL>more each time.</HL>
  </TextSlide>,

  // 9 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Loops guide preview"
    previewSide="left"
  />,
];

export default function LoopsPart3DeckPage() {
  return <Deck slides={slides} />;
}
