import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "AI Makes Us Work More" };

const LIB = "/decks/_library";

const INK = "#0f0f0f";
const ACCENT = "var(--deck-accent)";

/**
 * A balance scale that starts level and tips right: the left pan ("more AI
 * output") stays light and raised, the right pan ("time with loved ones") is
 * heavier and dips down. The winning (right) pan is salmon. Beam + pans settle
 * via deck-scale-tilt.
 */
function ScaleTradeoff() {
  return (
    <div className="flex w-full items-center justify-center">
      <svg
        viewBox="-44 44 712 372"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="A balance scale tipping toward time with loved ones over more AI output"
      >
        {/* Fixed structure: stand, post, pivot */}
        <g>
          <path d="M222 356 L338 356 L325 342 L235 342 Z" fill={INK} />
          <rect x="275" y="120" width="10" height="224" rx="5" fill={INK} />
          <circle cx="280" cy="120" r="9" fill={ACCENT} />
        </g>

        {/* Beam + chains + pans + pan labels settle together about the pivot */}
        <g
          className="deck-scale-tilt"
          style={{ transformBox: "view-box", transformOrigin: "280px 120px" }}
        >
          {/* Beam */}
          <line
            x1="115"
            y1="88"
            x2="445"
            y2="152"
            stroke={INK}
            strokeWidth="9"
            strokeLinecap="round"
          />
          <circle cx="115" cy="88" r="6" fill={INK} />
          <circle cx="445" cy="152" r="6" fill={INK} />

          {/* Left pan — light, raised: "more AI output" */}
          <line x1="115" y1="88" x2="58" y2="166" stroke={INK} strokeWidth="3" />
          <line x1="115" y1="88" x2="172" y2="166" stroke={INK} strokeWidth="3" />
          <line x1="58" y1="166" x2="172" y2="166" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <path d="M58 166 Q115 206 172 166" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <text
            x="115"
            y="240"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="34"
            fontWeight="700"
            letterSpacing="0.8"
            fill={INK}
          >
            more AI output
          </text>

          {/* Right pan — heavy, dipped: "time with loved ones" (salmon, winning) */}
          <line x1="445" y1="152" x2="388" y2="268" stroke={INK} strokeWidth="3" />
          <line x1="445" y1="152" x2="502" y2="268" stroke={INK} strokeWidth="3" />
          <line x1="388" y1="268" x2="502" y2="268" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          <path d="M388 268 Q445 308 502 268" fill={ACCENT} stroke={ACCENT} strokeWidth="5" strokeLinejoin="round" />
          <text
            x="445"
            y="384"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="34"
            fontWeight="800"
            letterSpacing="0.8"
            fill={ACCENT}
          >
            time with loved ones
          </text>
        </g>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — The Washington Post's AI-native dad story
  <DualImageSlide
    key="wapo"
    left={{
      src: `${LIB}/washington-post-logo.jpeg`,
      alt: "The Washington Post",
    }}
    right={{
      src: `${LIB}/wapo-ai-native-dad.png`,
      alt: "Washington Post: dad going AI native at the cost of family time",
    }}
  />,

  // 2 — The Atlantic / UC Berkeley: AI users didn't work less
  <ImageSlide
    key="atlantic"
    src={`${LIB}/atlantic-ai-work-more.png`}
    alt="The Atlantic: AI users didn't work less (10,000+ worker study)"
  />,

  // 3 — Their time in apps more than doubled, business software +94%
  <TextSlide key="stats">
    <HL>2×</HL> time in apps, <HL>+94%</HL> in business software
  </TextSlide>,

  // 4 — Once AI made hard things easy, work crammed into every gap
  <ImageSlide
    key="hamster"
    src={`${LIB}/hamster-wheel.webp`}
    alt="Hamster wheel — work with no off switch"
  />,

  // 5 — The whole point of AI is to buy back time
  <TextSlide key="time-rich" display>
    AI should make us <HL>time-rich</HL>
  </TextSlide>,

  // 6 — The fix isn't quitting AI, it's guardrails
  <TextSlide key="guardrails">
    The fix isn&apos;t quitting AI. It&apos;s{" "}
    <span style={{ whiteSpace: "nowrap" }}>
      <HL>guardrails</HL>.
    </span>
  </TextSlide>,

  // 7 — The tradeoff calculus: time with loved ones wins (custom SVG)
  <TextSlide key="tradeoff">
    <ScaleTradeoff />
  </TextSlide>,

  // 8 — Follow + comment MIKA for the link
  <CtaSlide
    key="cta"
    prompt=""
    headline={
      <>
        Follow + comment <HL>MIKA</HL> for a link to the article
      </>
    }
    headlinePlain
    textWide
    size="mlg"
  />,
];

export default function AiMakesUsWorkMoreDeckPage() {
  return <Deck slides={slides} />;
}
