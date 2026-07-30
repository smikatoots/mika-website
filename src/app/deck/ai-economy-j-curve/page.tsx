import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, HL, ImageSlide, PointSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "The AI Economy J-Curve" };

const LIB = "/decks/_library";

// 5 — Most companies are still stuck in the messy part of the J-curve.
function JCurveStuckSvg() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-4 text-center ${headingBase} ${deckType.statement}`}>
        Most companies are stuck in the <HL>messy part</HL>.
      </span>
      <svg
        viewBox="0 0 1000 500"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {/* axes */}
        <line x1="90" y1="60" x2="90" y2="440" stroke="#111" strokeWidth="3" />
        <line x1="90" y1="440" x2="940" y2="440" stroke="#111" strokeWidth="3" />
        {/* axis labels */}
        <text x="515" y="482" textAnchor="middle" fontSize="24" fontWeight="700" fill="#6b7280">
          Time
        </text>
        <text x="42" y="250" textAnchor="middle" fontSize="24" fontWeight="700" fill="#6b7280" transform="rotate(-90 42 250)">
          Productivity
        </text>
        {/* J-curve: dips then climbs */}
        <path
          d="M130 210 C 260 300, 370 380, 470 388 C 640 398, 780 250, 910 90"
          fill="none"
          stroke="#111"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* connector from label to the trough dot */}
        <line x1="315" y1="300" x2="452" y2="378" stroke="#fd4869" strokeWidth="2" strokeDasharray="6 6" />
        {/* pulsing salmon dot in the trough */}
        <circle cx="470" cy="388" r="14" fill="none" stroke="#fd4869" strokeWidth="3">
          <animate attributeName="r" values="14;30;14" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="470" cy="388" r="12" fill="#fd4869" />
        {/* label */}
        <text x="300" y="288" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">
          Most companies
        </text>
        <text x="300" y="316" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">
          are here
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — NYT admitted top economists agree on only 1 thing: we're in the J-shaped pattern of innovation.
  <ImageSlide
    key="nyt"
    src={`${LIB}/nyt-ai-economy-headline-2.png`}
    alt="NYT: A.I. Is Reshaping the Economy. Good Luck Measuring How."
  />,

  // 2 — Contradicting headlines: one says AI is wiping out jobs, another says AI-heavy companies hire fastest.
  <DualImageSlide
    key="contradiction"
    left={{ src: `${LIB}/headline-ai-killing-jobs.png`, alt: "Headline: AI is killing jobs" }}
    right={{ src: `${LIB}/ramp-ai-jobs-study.png`, alt: "Ramp study: AI adopters hiring fastest" }}
  />,

  // 3 — Even top economists can't agree: same data, opposite conclusions.
  <ImageSlide key="disagree" src={`${LIB}/trickle-down-economics.gif`} alt="economists disagree" />,

  // 4 — The one thing they agree on: the J-curve. Output dips first, then climbs.
  <ImageSlide key="jcurve-img" src={`${LIB}/j-curve.jpeg`} alt="The J-curve" />,

  // 5 — You've seen it: months of fumbling, then it clicks. Most are still in the messy part.
  <JCurveStuckSvg key="jcurve-stuck" />,

  // 6 — Take every headline with a grain of salt: hidden incentives, no hard data yet.
  <PointSlide key="salt" emoji="🧂">
    Take every headline with a <HL>grain of salt</HL>.
  </PointSlide>,

  // 7 — Real gains compound: pick one workflow and go deep now for a compounding head start.
  <PointSlide key="workflow" emoji="📈">
    Pick one workflow and <HL>go deep</HL> now.
  </PointSlide>,

  // 8 — CTA
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL>
      </>
    }
    headlinePlain
    size="mlg"
    subSize="sm"
    sub="for my guides to getting started with AI"
    preview={`${LIB}/nyt-ai-economy-headline-2.png`}
    previewAlt="NYT AI economy article"
    previewPlain
    previewLarge
  />,
];

export default function AiEconomyJCurveDeckPage() {
  return <Deck slides={slides} />;
}
