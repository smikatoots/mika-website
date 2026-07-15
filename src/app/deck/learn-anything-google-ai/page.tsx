import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "Turn a YouTube playlist into an AI tutor",
};

const FONT = "var(--font-bricolage)";
const LIB = "/decks/_library";

/** Text + video slide: an optional caption on top, an autoplaying muted loop
 *  below. Mirrors ImageSlide's shape so image and video steps read as a set. */
function VideoSlide({
  src,
  caption,
}: {
  src: string;
  caption?: React.ReactNode;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-3 px-6 py-10 sm:gap-5 sm:px-12 sm:py-12">
      {caption ? (
        <h2
          className={`deck-rise text-center ${headingBase} ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {caption}
        </h2>
      ) : null}
      <div className="relative flex max-h-[70vh] w-full flex-1 items-center justify-center">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}

/**
 * Slide 1 — flow diagram: a YouTube playlist (stacked video thumbnails) flows
 * right through NotebookLM and Gemini (shown as logos) into a graduation cap
 * that stands for the finished "AI tutor."
 */
function TutorFlowSvg() {
  return (
    <svg
      viewBox="0 0 980 300"
      className="h-auto w-full max-w-[92rem]"
      role="img"
      aria-label="A YouTube playlist flows through NotebookLM and Gemini to become an AI tutor."
    >
      <defs>
        <marker
          id="flow-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 Z" fill="var(--deck-accent)" />
        </marker>
      </defs>

      {/* Playlist — stacked video thumbnails */}
      <g className="deck-pop" style={{ animationDelay: "0.05s" }}>
        <rect x="95" y="66" width="160" height="102" rx="12" fill="#e4e4e7" />
        <rect x="78" y="83" width="160" height="102" rx="12" fill="#f4f4f5" stroke="#d4d4d8" strokeWidth="2" />
        <rect x="61" y="100" width="160" height="102" rx="12" fill="#ffffff" stroke="#18181b" strokeWidth="2.5" />
        <polygon points="123,130 123,172 161,151" fill="var(--deck-accent)" />
        <text x="141" y="240" textAnchor="middle" fill="#18181b" fontSize="30" fontWeight="700" fontFamily={FONT}>
          YouTube playlist
        </text>
      </g>

      <line x1="244" y1="151" x2="360" y2="151" stroke="var(--deck-accent)" strokeWidth="5" markerEnd="url(#flow-arrow)" />

      {/* NotebookLM */}
      <g className="deck-pop" style={{ animationDelay: "0.18s" }}>
        <circle cx="430" cy="151" r="66" fill="#ffffff" stroke="var(--deck-accent)" strokeWidth="4" />
        <image
          href={`${LIB}/notebooklm-logo.png`}
          x="378"
          y="99"
          width="104"
          height="104"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      <line x1="500" y1="151" x2="538" y2="151" stroke="var(--deck-accent)" strokeWidth="5" markerEnd="url(#flow-arrow)" />

      {/* Gemini */}
      <g className="deck-pop" style={{ animationDelay: "0.3s" }}>
        <circle cx="610" cy="151" r="66" fill="#ffffff" stroke="var(--deck-accent)" strokeWidth="4" />
        <image
          href={`${LIB}/gemini-logo.png`}
          x="558"
          y="99"
          width="104"
          height="104"
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

      <line x1="680" y1="151" x2="742" y2="151" stroke="var(--deck-accent)" strokeWidth="5" markerEnd="url(#flow-arrow)" />

      {/* AI tutor — graduation cap */}
      <g className="deck-pop" style={{ animationDelay: "0.42s" }}>
        <polygon points="806,102 878,130 806,158 734,130" fill="#18181b" />
        <path d="M770,142 L770,164 C770,182 842,182 842,164 L842,142 Z" fill="var(--deck-accent)" />
        <line x1="878" y1="130" x2="878" y2="156" stroke="#18181b" strokeWidth="3" />
        <circle cx="878" cy="160" r="6" fill="var(--deck-accent)" />
        <text x="806" y="240" textAnchor="middle" fill="#18181b" fontSize="30" fontWeight="700" fontFamily={FONT}>
          AI tutor
        </text>
      </g>
    </svg>
  );
}

/**
 * Slide 7 — retention bar chart: a short gray "passive" bar next to a tall
 * salmon "active" bar, with bold percentages above each and a baseline axis.
 * Enlarged type for legibility.
 */
function RetentionBarsSvg() {
  return (
    <svg
      viewBox="0 0 720 520"
      className="h-auto w-full max-w-3xl"
      role="img"
      aria-label="Passive watching yields about 10% retention; active use yields about 75%."
    >
      {/* Bars */}
      <g className="deck-pop" style={{ animationDelay: "0.1s" }}>
        <rect x="140" y="400" width="180" height="40" rx="8" fill="#d4d4d8" />
        <text x="230" y="372" textAnchor="middle" fill="#71717a" fontSize="72" fontWeight="800" fontFamily={FONT}>
          10%
        </text>
      </g>
      <g className="deck-pop" style={{ animationDelay: "0.25s" }}>
        <rect x="400" y="150" width="180" height="290" rx="8" fill="var(--deck-accent)" />
        <text x="490" y="122" textAnchor="middle" fill="var(--deck-accent)" fontSize="88" fontWeight="800" fontFamily={FONT}>
          75%
        </text>
      </g>

      {/* Baseline */}
      <line x1="60" y1="440" x2="660" y2="440" stroke="#18181b" strokeWidth="3" />

      {/* Labels */}
      <text x="230" y="486" textAnchor="middle" fill="#3f3f46" fontSize="34" fontWeight="700" fontFamily={FONT}>
        Passive watching
      </text>
      <text x="490" y="486" textAnchor="middle" fill="#18181b" fontSize="34" fontWeight="700" fontFamily={FONT}>
        Active use
      </text>
    </svg>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Hook: the flow diagram, full-bleed, no text
  <CoverSlide key="cover" diagram={<TutorFlowSvg />} />,

  // 2 — YouTube logo
  <ImageSlide
    key="youtube"
    src={`${LIB}/youtube-logo.png`}
    alt="YouTube"
    maxWidth="max-w-2xl"
  />,

  // 3 — Step 1: paste the YouTube link on NotebookLM
  <VideoSlide
    key="step1"
    src={`${LIB}/google-tutor-step1.mov`}
    caption={
      <>
        Step 1: Paste YouTube link on <HL>NotebookLM</HL>
      </>
    }
  />,

  // 4 — Step 2: explore the overviews & formats
  <ImageSlide
    key="step2"
    src={`${LIB}/google-tutor-step2.png`}
    alt="Exploring NotebookLM overviews and formats"
    framed
    caption={
      <>
        Step 2: Explore the <HL>overviews &amp; formats</HL>
      </>
    }
  />,

  // 5 — Step 3: give it to Gemini
  <ImageSlide
    key="step3"
    src={`${LIB}/google-tutor-step3.png`}
    alt="Handing the outline to Gemini"
    framed
    caption={
      <>
        Step 3: Give it to <HL>Gemini</HL>
      </>
    }
  />,

  // 6 — The finished product: your personal AI tutor (full-bleed, no frame/text)
  <ImageSlide
    key="final-product"
    src={`${LIB}/google-tutor-final-product.png`}
    alt="The finished AI tutor built from the YouTube playlist"
  />,

  // 7 — Passive vs. active learning (retention bars)
  <CoverSlide
    key="retention"
    title={
      <>
        <HL>Passive</HL> vs. <HL>Active</HL> learning
      </>
    }
    diagram={<RetentionBarsSvg />}
  />,

  // 8 — CTA
  <CtaSlide
    key="cta"
    prompt="Follow me, comment"
    headline="MIKA"
    sub="for my guide."
  />,
];

export default function LearnAnythingGoogleAiDeckPage() {
  return <Deck slides={slides} />;
}
