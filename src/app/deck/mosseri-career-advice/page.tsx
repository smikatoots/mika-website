import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, PointSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "Mosseri's Career Advice for the AI Age" };

// 4 — Who wins depends on whether your strengths match what AI rewards.
function StrengthsSvg() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-4 text-center ${headingBase} ${deckType.statement}`}>
        Your <HL>strengths</HL> decide who <HL>wins</HL>.
      </span>
      <svg
        viewBox="0 0 1000 500"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <marker
            id="strength-head-grey"
            markerWidth="12"
            markerHeight="12"
            refX="8"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1 L11 6 L1 11 Z" fill="#9ca3af" />
          </marker>
          <marker
            id="strength-head-salmon"
            markerWidth="12"
            markerHeight="12"
            refX="8"
            refY="6"
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1 L11 6 L1 11 Z" fill="#fd4869" />
          </marker>
        </defs>

        {/* Shared starting point */}
        <circle cx="120" cy="250" r="12" fill="#111" />

        {/* Left arrow — curves downward, muted grey */}
        <path
          d="M132 254 C 330 300, 500 380, 690 420"
          fill="none"
          stroke="#9ca3af"
          strokeWidth="6"
          strokeLinecap="round"
          markerEnd="url(#strength-head-grey)"
        />
        <text x="720" y="432" fontSize="30" fontWeight="600" fill="#6b7280">
          Writing code
        </text>

        {/* Right arrow — curves upward, salmon accent */}
        <path
          d="M132 246 C 330 200, 500 130, 700 90"
          fill="none"
          stroke="#fd4869"
          strokeWidth="6"
          strokeLinecap="round"
          markerEnd="url(#strength-head-salmon)"
        />
        {/* Small upward trend mark at the tip */}
        <path
          d="M712 84 L742 54 M742 54 L742 78 M742 54 L718 54"
          fill="none"
          stroke="#fd4869"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="470" y="70" fontSize="32" fontWeight="800" fill="#fd4869">
          Judgment &amp; communication
        </text>
      </svg>
    </div>
  );
}

// 6 — Your edge is the intersection of two coveted skills.
function IntersectionSvg() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-6 text-center ${headingBase} ${deckType.statement}`}>
        Your edge is the <HL>intersection</HL>.
      </span>
      <svg
        viewBox="0 0 1000 520"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <clipPath id="intersection-left">
            <circle cx="400" cy="260" r="185" />
          </clipPath>
        </defs>

        {/* Two circles */}
        <circle cx="400" cy="260" r="185" fill="#ffffff" stroke="#fd4869" strokeWidth="4" />
        <circle cx="600" cy="260" r="185" fill="none" stroke="#fd4869" strokeWidth="4" />

        {/* Salmon-filled overlap (right circle clipped by left) */}
        <circle
          cx="600"
          cy="260"
          r="185"
          fill="#fd4869"
          clipPath="url(#intersection-left)"
        />

        {/* Outer labels */}
        <text x="300" y="272" textAnchor="middle" fontSize="40" fontWeight="800" fill="#111">
          Design
        </text>
        <text x="700" y="272" textAnchor="middle" fontSize="40" fontWeight="800" fill="#111">
          Data
        </text>

        {/* Overlap label */}
        <text x="500" y="248" textAnchor="middle" fontSize="30" fontWeight="800" fill="#ffffff">
          Product
        </text>
        <text x="500" y="286" textAnchor="middle" fontSize="30" fontWeight="800" fill="#ffffff">
          Staff
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Instagram's CEO Adam Mosseri just gave the best career advice for the AI age.
  //     (library image `adam-mosseri.jpg` missing → title-only cover fallback)
  <CoverSlide
    key="cover"
    title="Instagram's CEO Adam Mosseri just gave the best career advice for the AI age I've heard."
  />,

  // 2 — Cringe is the byproduct of success; he hires for willingness to put yourself out there.
  <PointSlide key="cringe" number="1" emoji="🙋">
    <HL>Cringe</HL> is the byproduct of <HL>success</HL>.
  </PointSlide>,

  // 3 — The best product leaders are curators, not visionaries.
  <PointSlide key="curators" number="2" emoji="🧭">
    Great leaders are <HL>curators</HL>, not <HL>visionaries</HL>.
  </PointSlide>,

  // 4 — Who wins depends on whether your strengths match what AI rewards.
  <StrengthsSvg key="strengths" />,

  // 5 — Taste is becoming the scarcest skill.
  //     (library image `designer-sketching.jpg` missing → statement fallback)
  <TextSlide key="taste">
    <HL>Taste</HL> is becoming the <HL>scarcest</HL> skill.
  </TextSlide>,

  // 6 — Your edge is the intersection of two coveted skills.
  <IntersectionSvg key="intersection" />,

  // 7 — Comment MIKA for the link; share this with a friend who needs it.
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for the link — share with a friend."
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
