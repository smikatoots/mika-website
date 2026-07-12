import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Turn a YouTube playlist into an AI tutor",
};

const FONT = "var(--font-bricolage)";

/**
 * Slide 1 — flow diagram: a YouTube playlist (stacked video thumbnails) flows
 * right through two labeled circles (NotebookLM, Gemini) into a graduation cap
 * that stands for the finished "AI tutor."
 */
function TutorFlowSvg() {
  return (
    <svg
      viewBox="0 0 980 300"
      className="h-auto w-full max-w-4xl"
      role="img"
      aria-label="A YouTube playlist flows through NotebookLM and Gemini to become an AI tutor."
    >
      <defs>
        <marker
          id="flow-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--deck-accent)" />
        </marker>
      </defs>

      {/* Playlist — stacked video thumbnails */}
      <g className="deck-pop" style={{ animationDelay: "0.05s" }}>
        <rect x="95" y="70" width="150" height="95" rx="12" fill="#e4e4e7" />
        <rect x="80" y="85" width="150" height="95" rx="12" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />
        <rect x="65" y="100" width="150" height="95" rx="12" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
        <polygon points="126,128 126,168 160,148" fill="var(--deck-accent)" />
        <text x="140" y="232" textAnchor="middle" fill="#18181b" fontSize="22" fontWeight="700" fontFamily={FONT}>
          YouTube playlist
        </text>
      </g>

      <line x1="236" y1="148" x2="366" y2="148" stroke="var(--deck-accent)" strokeWidth="4" markerEnd="url(#flow-arrow)" />

      {/* NotebookLM */}
      <g className="deck-pop" style={{ animationDelay: "0.18s" }}>
        <circle cx="430" cy="148" r="58" fill="#ffffff" stroke="var(--deck-accent)" strokeWidth="3.5" />
        <text x="430" y="154" textAnchor="middle" fill="#18181b" fontSize="18" fontWeight="800" fontFamily={FONT}>
          NotebookLM
        </text>
      </g>

      <line x1="490" y1="148" x2="548" y2="148" stroke="var(--deck-accent)" strokeWidth="4" markerEnd="url(#flow-arrow)" />

      {/* Gemini */}
      <g className="deck-pop" style={{ animationDelay: "0.3s" }}>
        <circle cx="610" cy="148" r="58" fill="#ffffff" stroke="var(--deck-accent)" strokeWidth="3.5" />
        <text x="610" y="154" textAnchor="middle" fill="#18181b" fontSize="24" fontWeight="800" fontFamily={FONT}>
          Gemini
        </text>
      </g>

      <line x1="670" y1="148" x2="748" y2="148" stroke="var(--deck-accent)" strokeWidth="4" markerEnd="url(#flow-arrow)" />

      {/* AI tutor — graduation cap */}
      <g className="deck-pop" style={{ animationDelay: "0.42s" }}>
        <polygon points="800,108 858,130 800,152 742,130" fill="#18181b" />
        <path d="M770,139 L770,157 C770,172 830,172 830,157 L830,139 Z" fill="var(--deck-accent)" />
        <line x1="858" y1="130" x2="858" y2="150" stroke="#18181b" strokeWidth="2.5" />
        <circle cx="858" cy="154" r="5" fill="var(--deck-accent)" />
        <text x="800" y="232" textAnchor="middle" fill="#18181b" fontSize="22" fontWeight="700" fontFamily={FONT}>
          AI tutor
        </text>
      </g>
    </svg>
  );
}

/**
 * Slide 7 — retention bar chart: a short gray "passive" bar next to a tall
 * salmon "active" bar, with bold percentages above each and a baseline axis.
 */
function RetentionBarsSvg() {
  return (
    <svg
      viewBox="0 0 700 470"
      className="h-auto w-full max-w-2xl"
      role="img"
      aria-label="Passive watching yields about 10% retention; active use yields about 75%."
    >
      {/* Bars */}
      <g className="deck-pop" style={{ animationDelay: "0.1s" }}>
        <rect x="150" y="368" width="150" height="32" rx="6" fill="#d4d4d8" />
        <text x="225" y="348" textAnchor="middle" fill="#71717a" fontSize="52" fontWeight="800" fontFamily={FONT}>
          10%
        </text>
      </g>
      <g className="deck-pop" style={{ animationDelay: "0.25s" }}>
        <rect x="400" y="160" width="150" height="240" rx="6" fill="var(--deck-accent)" />
        <text x="475" y="140" textAnchor="middle" fill="var(--deck-accent)" fontSize="68" fontWeight="800" fontFamily={FONT}>
          75%
        </text>
      </g>

      {/* Baseline */}
      <line x1="70" y1="400" x2="620" y2="400" stroke="#18181b" strokeWidth="3" />

      {/* Labels */}
      <text x="225" y="438" textAnchor="middle" fill="#3f3f46" fontSize="26" fontWeight="700" fontFamily={FONT}>
        Passive watching
      </text>
      <text x="475" y="438" textAnchor="middle" fill="#18181b" fontSize="26" fontWeight="700" fontFamily={FONT}>
        Active use
      </text>
    </svg>
  );
}

// Shared step roadmap — labels kept to one line; keyword highlighted per step.
const STEPS: React.ReactNode[] = [
  <>
    Paste into <HL>NotebookLM</HL>
  </>,
  <>
    Build an <HL>outline</HL>
  </>,
  <>
    Make an app in <HL>Gemini</HL>
  </>,
];

const slides: React.ReactNode[] = [
  // 1 — Hook: two free Google tools turn a playlist into a personal AI tutor
  <CoverSlide
    key="cover"
    title={
      <>
        Turn any YouTube playlist into a <HL>personal AI tutor</HL> — using two Google tools that are{" "}
        <HL>free</HL>.
      </>
    }
    diagram={<TutorFlowSvg />}
  />,

  // 2 — The playlist you never finish, fixed in 5 minutes
  //     (fallback: youtube-watch-later.jpg missing → large-text header slide)
  <TextSlide key="hook2">
    That playlist you never finish? Fixed in <HL>5 minutes</HL>.
  </TextSlide>,

  // 3 — Three steps, tools you already have
  <TextSlide key="three">
    Three steps. Tools you <HL>already have</HL>.
  </TextSlide>,

  // 4 — Step 1: paste the YouTube link into NotebookLM
  //     (fallback: notebooklm-add-source.png missing → steps without visual)
  <StepsSlide key="step1" steps={STEPS} current={0} />,

  // 5 — Step 2: ask it to build a short outline
  //     (fallback: notebooklm-outline.png missing → steps without visual)
  <StepsSlide key="step2" steps={STEPS} current={1} />,

  // 6 — Step 3: turn the outline into an app in Gemini
  //     (fallback: gemini-app-build.png missing → steps without visual)
  <StepsSlide key="step3" steps={STEPS} current={2} />,

  // 7 — Retention: 10% passive vs 75% active (custom bar chart)
  <CoverSlide
    key="retention"
    title={
      <>
        Passive watching: <HL>10%</HL> retention. Active use: <HL>75%</HL>.
      </>
    }
    diagram={<RetentionBarsSvg />}
  />,

  // 8 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="and I'll tell you what to use it for"
  />,
];

export default function LearnAnythingGoogleAiDeckPage() {
  return <Deck slides={slides} />;
}
