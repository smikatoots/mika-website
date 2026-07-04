import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, ImageSlide, TextSlide } from "@/components/deck/slide-parts";

export const metadata: Metadata = {
  title: "LLMs but Brainrot Gen Z",
};

const LIB = "/decks/_library";

/**
 * Slide 2 — custom inline SVG. Three rounded icon-tiles (an open book, a
 * chat-thread bubble, a browser window labeled "blog") stacked with clear
 * vertical spacing on the left, each icon centered in its box, funnelling via
 * dashed salmon connector lines into a single "model" tile rendered as a small
 * neural-node grid on the right. No header — the SVG is the whole slide.
 */
function DataToModelSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 520"
      className={className}
      role="img"
      aria-label="An open book, a chat thread, and a blog browser window all funneling into a single model, drawn as a neural-node grid."
    >
      {/* Dashed salmon connectors — sources funneling into the model */}
      <g
        fill="none"
        stroke="var(--deck-accent)"
        strokeWidth="4"
        strokeDasharray="10 10"
        strokeLinecap="round"
      >
        <path d="M300 85 C 460 110, 520 235, 640 260" />
        <path d="M300 260 C 460 260, 540 260, 640 260" />
        <path d="M300 435 C 460 410, 520 285, 640 260" />
      </g>

      {/* Source tile 1 — open book (centered in box: 70,15 → 300,155) */}
      <g className="deck-tier" style={{ animationDelay: "0.1s" }}>
        <rect x="70" y="15" width="230" height="140" rx="22" fill="#f3e2bf" />
        <g
          transform="translate(110 53)"
          fill="none"
          stroke="#b5742a"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M0 8 C 25 -4, 55 -4, 75 8 L 75 68 C 55 56, 25 56, 0 68 Z" />
          <path d="M75 8 C 95 -4, 125 -4, 150 8 L 150 68 C 125 56, 95 56, 75 56" />
          <line x1="75" y1="8" x2="75" y2="60" />
        </g>
      </g>

      {/* Source tile 2 — chat-thread bubble (centered in box: 70,190 → 300,330) */}
      <g className="deck-tier" style={{ animationDelay: "0.25s" }}>
        <rect x="70" y="190" width="230" height="140" rx="22" fill="#dccada" />
        <g transform="translate(130 218)" fill="#6b2d5c">
          <path d="M0 12 C 0 5, 6 0, 14 0 L 96 0 C 104 0, 110 5, 110 12 L 110 52 C 110 59, 104 64, 96 64 L 40 64 L 20 84 L 20 64 L 14 64 C 6 64, 0 59, 0 52 Z" />
          <g fill="#dccada">
            <circle cx="30" cy="32" r="6" />
            <circle cx="55" cy="32" r="6" />
            <circle cx="80" cy="32" r="6" />
          </g>
        </g>
      </g>

      {/* Source tile 3 — browser window labeled "blog" (centered in box: 70,365 → 300,505) */}
      <g className="deck-tier" style={{ animationDelay: "0.4s" }}>
        <rect x="70" y="365" width="230" height="140" rx="22" fill="#efc9c4" />
        <g transform="translate(112 387)">
          <rect x="0" y="0" width="146" height="96" rx="10" fill="#fff" stroke="#9b3024" strokeWidth="5" />
          <path d="M0 26 L 146 26" stroke="#9b3024" strokeWidth="5" />
          <circle cx="16" cy="13" r="4.5" fill="#9b3024" />
          <circle cx="32" cy="13" r="4.5" fill="#9b3024" />
          <circle cx="48" cy="13" r="4.5" fill="#9b3024" />
          <text
            x="73"
            y="72"
            textAnchor="middle"
            fill="#9b3024"
            fontSize="30"
            fontWeight="800"
            fontFamily="var(--font-bricolage)"
          >
            blog
          </text>
        </g>
      </g>

      {/* Model tile — neural-node grid */}
      <g className="deck-tier" style={{ animationDelay: "0.6s" }}>
        <rect x="640" y="170" width="200" height="180" rx="24" fill="#fff" stroke="var(--deck-accent)" strokeWidth="5" />
        {/* connections */}
        <g stroke="var(--deck-accent)" strokeWidth="3" opacity="0.55">
          <line x1="690" y1="215" x2="745" y2="215" />
          <line x1="690" y1="215" x2="745" y2="260" />
          <line x1="690" y1="260" x2="745" y2="215" />
          <line x1="690" y1="260" x2="745" y2="260" />
          <line x1="690" y1="260" x2="745" y2="305" />
          <line x1="690" y1="305" x2="745" y2="260" />
          <line x1="690" y1="305" x2="745" y2="305" />
          <line x1="745" y1="215" x2="795" y2="240" />
          <line x1="745" y1="260" x2="795" y2="240" />
          <line x1="745" y1="260" x2="795" y2="285" />
          <line x1="745" y1="305" x2="795" y2="285" />
        </g>
        {/* nodes */}
        <g fill="var(--deck-accent)">
          <circle cx="690" cy="215" r="9" />
          <circle cx="690" cy="260" r="9" />
          <circle cx="690" cy="305" r="9" />
          <circle cx="745" cy="215" r="9" />
          <circle cx="745" cy="260" r="9" />
          <circle cx="745" cy="305" r="9" />
          <circle cx="795" cy="240" r="9" />
          <circle cx="795" cy="285" r="9" />
        </g>
        <text
          x="740"
          y="130"
          textAnchor="middle"
          fill="var(--deck-accent)"
          fontSize="34"
          fontWeight="800"
          fontFamily="var(--font-bricolage)"
        >
          model
        </text>
      </g>
    </svg>
  );
}

/** Slide 2 — the funnel SVG only, centered, no header. */
function DataToModelSlide() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center px-6 py-10 sm:px-12">
      <DataToModelSvg className="h-[min(82vh,44rem)] w-auto max-w-[94vw]" />
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — ai-multicolored gif, image only.
  <ImageSlide
    key="hook"
    src={`${LIB}/ai-multicolored.gif`}
    alt="Shifting multicolored AI orb."
  />,

  // 2 — Custom SVG: sources funneling into the model. No header.
  <DataToModelSlide key="data-to-model" />,

  // 3 — Text statement.
  <TextSlide key="autocomplete">
    world&apos;s most gigachad <A>autocomplete</A>
  </TextSlide>,

  // 4 — bussin, image only.
  <ImageSlide key="one-token" src={`${LIB}/bussin.gif`} alt="Bussin reaction gif." />,

  // 5 — sending-good-vibes, image only.
  <ImageSlide key="patterns" src={`${LIB}/sending-good-vibes.gif`} alt="Sending good vibes gif." />,

  // 6 — optical-illusion, image only.
  <ImageSlide key="hallucinate" src={`${LIB}/optical-illusion.gif`} alt="Optical illusion gif." />,

  // 7 — dog-and-money, image only.
  <ImageSlide key="prompts" src={`${LIB}/dog-and-money.gif`} alt="Dog surrounded by money gif." />,

  // 8 — ai-multicolored gif (reused from slide 1), image only, full-bleed.
  <ImageSlide key="cta" src={`${LIB}/ai-multicolored.gif`} alt="Shifting multicolored AI orb." />,
];

export default function LlmsButBrainrotGenZDeckPage() {
  return <Deck slides={slides} />;
}
