import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, ImageSlide, TextSlide, HL } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "What Are Subagents?" };

const LIB = "/decks/_library";

// 3 — One main agent fanning out to 10 parallel workers (top) vs. the same 10
// running one-at-a-time in series (bottom).
function ParallelFanSvg() {
  const workers = Array.from({ length: 10 }, (_, i) => i);
  const pillH = 26;
  const pillGap = 8;
  const stackTop = 40;
  // sequential row geometry
  const seqW = 60;
  const seqStep = 92;
  const seqX = (i: number) => 40 + i * seqStep;
  const seqY = 520;
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-6 sm:p-10">
      <svg
        viewBox="0 0 1000 640"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <marker id="fanArrow" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#fd4869" />
          </marker>
          <marker id="seqArrow" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af" />
          </marker>
        </defs>

        {/* parallel label */}
        <text x="560" y="28" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">⏱ all at once — parallel</text>

        {/* main agent */}
        <rect x="60" y="150" width="200" height="96" rx="20" fill="#fd4869" />
        <text x="160" y="190" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff">You + Claude</text>
        <text x="160" y="222" textAnchor="middle" fontSize="18" fill="#ffe0e6">main agent</text>

        {/* fan connectors + parallel worker pills */}
        {workers.map((i) => {
          const y = stackTop + i * (pillH + pillGap) + pillH / 2;
          return (
            <g key={i} className="deck-pop" style={{ animationDelay: `${0.05 * i}s` }}>
              <path d={`M260 198 C 430 198, 480 ${y}, 640 ${y}`} fill="none" stroke="#fd4869" strokeWidth="2" strokeDasharray="5 6" markerEnd="url(#fanArrow)" />
              <rect x="650" y={y - pillH / 2} width="260" height={pillH} rx={pillH / 2} fill="#fff" stroke="#111" strokeWidth="2" />
              <text x="780" y={y + 6} textAnchor="middle" fontSize="16" fontWeight="700" fill="#111">Hook · Topic {i + 1}</text>
            </g>
          );
        })}

        {/* divider */}
        <line x1="60" y1="470" x2="940" y2="470" stroke="#e5e7eb" strokeWidth="2" />

        {/* sequential row: 10 pills in series with arrows between */}
        <text x="500" y="500" textAnchor="middle" fontSize="22" fontWeight="700" fill="#9ca3af">vs. one at a time:</text>
        {workers.map((i) => (
          <g key={`seq-${i}`}>
            <rect x={seqX(i)} y={seqY} width={seqW} height="44" rx="12" fill="none" stroke="#9ca3af" strokeWidth="2" />
            <text x={seqX(i) + seqW / 2} y={seqY + 29} textAnchor="middle" fontSize="18" fontWeight="700" fill="#9ca3af">{i + 1}</text>
            {i < workers.length - 1 ? (
              <line
                x1={seqX(i) + seqW + 4}
                y1={seqY + 22}
                x2={seqX(i + 1) - 4}
                y2={seqY + 22}
                stroke="#9ca3af"
                strokeWidth="2"
                markerEnd="url(#seqArrow)"
              />
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — The creator of Claude Code said the next update runs subagents in the background
  <DualImageSlide
    key="hook"
    left={{ src: `${LIB}/subagents-boris-announcement.png`, alt: "Boris Cherny's announcement about background subagents" }}
    right={{ src: `${LIB}/boris-cherny.jpeg`, alt: "Boris Cherny, creator of Claude Code" }}
  />,

  // 2 — What a subagent is
  <TextSlide key="def">
    Main agent tells subagents to <HL>spawn</HL> and handle tasks <HL>simultaneously</HL>
  </TextSlide>,

  // 3 — Example: 10 subagents drafting hooks in parallel
  <ParallelFanSvg key="fan" />,

  // 4 — Right now they run in your chat = you're blocked
  <TextSlide key="blocked">
    Now: they run <HL>in your chat</HL> = you&apos;re <HL>blocked</HL>
  </TextSlide>,

  // 5 — The update: they run as background tasks
  <ImageSlide key="update" src={`${LIB}/subagents-boris-announcement.png`} alt="Boris Cherny's announcement about background subagents" />,

  // 6 — The tricky part: not always clear if they're really working
  <ImageSlide key="where" src={`${LIB}/subagents-where-is-the-task.png`} alt="Checking whether the subagents are actually running" />,

  // 7 — How to check: three dots → Background Tasks
  <DualImageSlide
    key="check"
    left={{ src: `${LIB}/subagents-boris-announcement.png`, alt: "Boris Cherny's announcement about background subagents" }}
    right={{ src: `${LIB}/subagents-background-task-menu.png`, alt: "The Background Tasks menu" }}
  />,

  // 8 — CTA
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for my guide on subagents" />,
];

export default function SubagentsDeckPage() {
  return <Deck slides={slides} />;
}
