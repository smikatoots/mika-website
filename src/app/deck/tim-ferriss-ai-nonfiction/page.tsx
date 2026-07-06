import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "Has AI Killed Tim Ferriss's Books?" };

const LIB = "/decks/_library";

// 3 — His book sales since ChatGPT: -5 / -13 / -46 / -57% (last = "on pace").
function SalesChartSvg() {
  const bars = [
    { label: "-5%", h: 70, dashed: false },
    { label: "-13%", h: 150, dashed: false },
    { label: "-46%", h: 300, dashed: false },
    { label: "-57%", h: 360, dashed: true },
  ];
  const baseY = 430;
  const x0 = 170;
  const gap = 170;
  const bw = 110;
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-4 text-center ${headingBase} ${deckType.statement}`}>
        His book sales, <A>since ChatGPT</A>
      </span>
      <svg
        viewBox="0 0 900 500"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <line x1="120" y1={baseY} x2="850" y2={baseY} stroke="#111" strokeWidth="3" />
        {bars.map((b, i) => {
          const x = x0 + i * gap;
          return (
            <g key={b.label} className="deck-pop" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
              <rect
                x={x}
                y={baseY - b.h}
                width={bw}
                height={b.h}
                rx="8"
                fill={b.dashed ? "none" : i === 3 ? "#fd4869" : "#111"}
                stroke={b.dashed ? "#fd4869" : "none"}
                strokeWidth={b.dashed ? "4" : "0"}
                strokeDasharray={b.dashed ? "12 10" : undefined}
              />
              <text
                x={x + bw / 2}
                y={baseY - b.h - 16}
                textAnchor="middle"
                fontSize="34"
                fontWeight="800"
                fill={i >= 2 ? "#fd4869" : "#111"}
              >
                {b.label}
              </text>
            </g>
          );
        })}
        <text x={x0 + 3 * gap + bw / 2} y={baseY + 40} textAnchor="middle" fontSize="22" fill="#9ca3af">
          on pace
        </text>
        <text x="485" y="480" textAnchor="middle" fontSize="24" fill="#6b7280">
          since ChatGPT launched →
        </text>
      </svg>
    </div>
  );
}

// 8 — Same advice, two outcomes: bullets → 0 acted vs designed path → 1,000s changed.
function ProofSplitSvg() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-5 text-center ${headingBase} ${deckType.statement}`}>
        Same advice, <A>two outcomes</A>
      </span>
      <svg
        viewBox="0 0 1000 520"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {/* LEFT — bullet list, 0 acted */}
        <g stroke="#9ca3af" strokeWidth="3" fill="none">
          <rect x="70" y="80" width="360" height="300" rx="22" />
        </g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx="120" cy={140 + i * 55} r="7" fill="#9ca3af" />
            <line x1="150" y1={140 + i * 55} x2="390" y2={140 + i * 55} stroke="#9ca3af" strokeWidth="10" strokeLinecap="round" />
          </g>
        ))}
        <rect x="120" y="410" width="260" height="60" rx="30" fill="#e5e7eb" />
        <text x="250" y="450" textAnchor="middle" fontSize="30" fontWeight="800" fill="#6b7280">
          0 acted
        </text>

        {/* RIGHT — 10×10 grid of 📙 → the thousands who changed */}
        {Array.from({ length: 10 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <text
              key={`book-${r}-${c}`}
              x={590 + c * 34}
              y={120 + r * 32}
              fontSize="24"
              textAnchor="middle"
              className="deck-pop"
              style={{ animationDelay: `${0.01 * (r * 10 + c)}s` }}
            >
              📙
            </text>
          )),
        )}
        <rect x="600" y="450" width="330" height="60" rx="30" fill="#fd4869" />
        <text x="765" y="490" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff">
          1,000s lost 100 lbs+
        </text>
      </svg>
    </div>
  );
}

const playbook: React.ReactNode[] = ["Find your 1,000 true fans", "Surprise & overdeliver", "Again & again"];

const slides: React.ReactNode[] = [
  // 1 — Hook: the guy who wrote The 4-Hour Workweek…
  <ImageSlide key="tim" src={`${LIB}/tim-ferriss.jpeg`} alt="Tim Ferriss" />,

  // 2 — He laid it all out in a new essay
  <ImageSlide key="essay" src={`${LIB}/tim-ferriss-essay.png`} alt="Tim Ferriss's essay on AI and nonfiction" />,

  // 3 — Sales dropped 5, 13, 46, 57%
  <SalesChartSvg key="sales" />,

  // 4 — How-to books are a lookup table
  <ImageSlide key="howto" src={`${LIB}/how-to-books.jpg`} alt="A stack of how-to books" />,

  // 5 — The canary in the coal mine
  <ImageSlide key="canary" src={`${LIB}/canary.jpeg`} alt="A canary" caption={<>The <A>canary in the coal mine</A></>} />,

  // 6 — What survives: comedy, storytelling, fiction
  <TextSlide key="survives" emoji="🎭">
    Comedy, storytelling, fiction
  </TextSlide>,

  // 7 — The value was never the info — it was the sequencing
  <ImageSlide key="tim2" src={`${LIB}/tim-ferriss.jpeg`} alt="Tim Ferriss" />,

  // 8 — Proof: 0 acted on bullets vs 1,000s changed by a designed path
  <ProofSplitSvg key="proof" />,

  // 9 — Voice & taste are the only moats left
  <ImageSlide key="taste" src={`${LIB}/you-have-taste.gif`} alt="You have taste" caption={<>voice &amp; taste</>} />,

  // 10–12 — The playbook (3 steps), centered, no right-side visual
  <StepsSlide key="p1" steps={playbook} current={0} />,
  <StepsSlide key="p2" steps={playbook} current={1} />,
  <StepsSlide key="p3" steps={playbook} current={2} />,

  // 11 — CTA
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for a link to the essay" />,
];

export default function TimFerrissDeckPage() {
  return <Deck slides={slides} />;
}
