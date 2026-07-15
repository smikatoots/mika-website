import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "Mosseri's Career Advice for the AI Age" };

const LIB = "/decks/_library";

// 6 — Your edge is at the intersection of two coveted skills (Venn only, no inner labels).
function IntersectionSvg() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center p-6 sm:p-10">
      <span className={`deck-rise mb-6 text-center ${headingBase} ${deckType.statement}`}>
        Your edge is at the <HL>intersection</HL>.
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
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Adam Mosseri (image only, no text)
  <ImageSlide
    key="cover"
    src={`${LIB}/adam-mosseri.jpeg`}
    alt="Adam Mosseri, Instagram CEO"
  />,

  // 2 — Cringe is the byproduct of success
  <TextSlide key="cringe" emoji="🙋">
    <HL>Cringe</HL> is the byproduct of <HL>success</HL>
  </TextSlide>,

  // 3 — Leaders = curators > visionaries
  <TextSlide key="curators" emoji="🧭">
    Leaders = <HL>curators</HL> &gt; visionaries
  </TextSlide>,

  // 4 — Your strengths decide who wins (text only)
  <TextSlide key="strengths">
    Your <HL>strengths</HL> decide who <HL>wins</HL>
  </TextSlide>,

  // 5 — Taste is becoming the scarcest skill
  <TextSlide key="taste" emoji="🎨">
    <HL>Taste</HL> is becoming the <HL>scarcest</HL> skill.
  </TextSlide>,

  // 6 — Your edge is at the intersection (Venn only)
  <IntersectionSvg key="intersection" />,

  // 7 — Comment MIKA for the link; share the tips with a friend
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for the link. Share the tips with a friend."
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
