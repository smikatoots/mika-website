import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, ImageSlide, TextSlide, HL } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Andrew Ng's 3 Loops" };

const LIB = "/decks/_library";

// 1 — Three authorities side by side: Andrew Ng, Boris Cherny, Peter Steinberger.
function TripleImageSlide() {
  const cells = [
    { src: `${LIB}/andrew-ng.jpeg`, alt: "Andrew Ng" },
    { src: `${LIB}/boris-cherny.jpeg`, alt: "Boris Cherny, creator of Claude Code" },
    { src: `${LIB}/peter-steinberger.jpg`, alt: "Peter Steinberger, creator of OpenClaw" },
  ];
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-3 sm:p-5">
      <div className="grid h-full w-full max-w-7xl grid-cols-3 items-center gap-3 sm:gap-5">
        {cells.map((c, i) => (
          <div
            key={c.src}
            className="deck-pop relative aspect-[3/4] max-h-[88vh] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.3)]"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <Image src={c.src} alt={c.alt} fill sizes="(max-width: 768px) 32vw, 24rem" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Andrew Ng joined the founders of Claude Code and OpenClaw
  <TripleImageSlide key="trio" />,

  // 2 — In The Batch, he broke down the three loops
  <DualImageSlide
    key="batch"
    left={{ src: `${LIB}/andrew-ng-the-batch.png`, alt: "Andrew Ng's post in The Batch" }}
    right={{ src: `${LIB}/andrew-ng-3-loops-1.jpeg`, alt: "Andrew Ng's three loops" }}
  />,

  // 3 — The coding loop
  <ImageSlide key="loop2" src={`${LIB}/andrew-ng-3-loops-2.jpeg`} alt="The coding loop" />,

  // 4 — The feedback loop
  <ImageSlide key="loop3" src={`${LIB}/andrew-ng-3-loops-3.jpeg`} alt="The feedback loop" />,

  // 5 — The external loop
  <ImageSlide key="loop4" src={`${LIB}/andrew-ng-3-loops-4.jpeg`} alt="The external loop" />,

  // 6 — Engineers are becoming part product manager
  <TextSlide key="pm" display>
    Engineers are becoming <HL>part PM</HL>
  </TextSlide>,

  // 7 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for Andrew Ng's post"
    preview={`${LIB}/andrew-ng-the-batch.png`}
    previewAlt="Andrew Ng's post in The Batch"
  />,
];

export default function ThreeLoopsDeckPage() {
  return <Deck slides={slides} />;
}
