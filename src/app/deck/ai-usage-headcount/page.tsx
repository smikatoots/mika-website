import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, DualImageSlide, ImageSlide, PointSlide, TextSlide, HL } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "More AI = Fewer Jobs? Debunked" };

const LIB = "/decks/_library";

// 8 — The threshold J-curve: setup + investment, then productive.
function JCurveSvg() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-4 text-center ${headingBase} ${deckType.statement}`}>
        First, cross the <A>threshold</A>
      </span>
      <svg
        viewBox="0 0 1000 500"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <line x1="80" y1="440" x2="940" y2="440" stroke="#111" strokeWidth="3" />
        {/* dip then rise */}
        <path d="M110 230 C 220 320, 340 380, 480 360" fill="none" stroke="#9ca3af" strokeWidth="6" strokeLinecap="round" />
        <path d="M480 360 C 640 330, 760 200, 900 70" fill="none" stroke="#fd4869" strokeWidth="6" strokeLinecap="round" />
        {/* threshold line */}
        <line x1="480" y1="60" x2="480" y2="440" stroke="#fd4869" strokeWidth="3" strokeDasharray="10 8" />
        <text x="480" y="45" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">threshold</text>
        <text x="270" y="420" textAnchor="middle" fontSize="22" fill="#6b7280">setup + investment</text>
        <text x="720" y="150" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">productive</text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Ramp + Revelio Labs looked at 20,000 companies
  <DualImageSlide
    key="hook"
    left={{ src: `${LIB}/ramp-logo.png`, alt: "Ramp logo" }}
    right={{ src: `${LIB}/ramp-ai-jobs-study.png`, alt: "Ramp's study on AI and jobs" }}
  />,

  // 2 — Everyone assumes more AI means fewer people
  <TextSlide key="fear">
    More AI = <HL>fewer jobs</HL>?
  </TextSlide>,

  // 3 — Split 20,000 companies 3 ways
  <TextSlide key="buckets">
    <span>
      20,000 companies, <HL>split 3 ways</HL>
    </span>
  </TextSlide>,

  // 4 — Adopters grew headcount 10.2%
  <ImageSlide key="graph" src={`${LIB}/ramp-headcount-study-graph.png`} alt="Headcount growth by AI adoption intensity" />,

  // 5 — Gains came entirely from high-intensity adopters
  <ImageSlide key="graph-zoom" src={`${LIB}/ramp-headcount-study-graph-zoomed.png`} alt="Headcount growth concentrated in high-intensity adopters" />,

  // 6 — Entry-level jumped 12%
  <PointSlide key="entry" number="12%" emoji="🚀">
    Entry-level headcount jumped at <HL>top AI spenders</HL>
  </PointSlide>,

  // 7 — A friend runs a $100M company
  <TextSlide key="friend">
    <span>A friend runs a <HL>$100M company</HL>.</span>
    <span>He&apos;s lived this</span>
  </TextSlide>,

  // 8 — There's a threshold you have to cross
  <JCurveSvg key="jcurve" />,

  // 9 — Cross it and people get more valuable
  <TextSlide key="chasm">
    Cross the <HL>chasm</HL>
  </TextSlide>,

  // 10 — The catch: gains aren't evenly spread
  <TextSlide key="catch">
    bigger · eng-heavy · <HL>VC-backed</HL> · faster
  </TextSlide>,

  // 11 — Correlation isn't causation
  <TextSlide key="correlation">
    Correlation ≠ causation, <HL>but…</HL>
  </TextSlide>,

  // 12 — Takeaway
  <TextSlide key="takeaway" display>
    AI <HL>grows</HL> instead of shrinks your headcount
  </TextSlide>,

  // 13 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for the study"
    preview={`${LIB}/ramp-ai-jobs-study.png`}
    previewAlt="Ramp's study on AI and jobs"
  />,
];

export default function AiUsageHeadcountDeckPage() {
  return <Deck slides={slides} />;
}
