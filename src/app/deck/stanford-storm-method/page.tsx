import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "Stanford's STORM Method" };

const LIB = "/decks/_library";

// Big STORM acronym with the full expansion beneath.
function StormTitle() {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-6 px-8 text-center">
      <span className={`deck-pop deck-accent ${headingBase} ${deckType.display}`}>S.T.O.R.M.</span>
      <span
        className={`deck-rise max-w-4xl text-2xl text-zinc-600 sm:text-4xl ${headingBase}`}
        style={{ animationDelay: "0.2s" }}
      >
        Synthesis of Topic Outlines through Retrieval and Multi-perspective Question Asking
      </span>
    </div>
  );
}

// Four prompts, left to right, with the time contrast underneath.
function StormFlow() {
  const steps = ["Scan", "Map", "Synthesis", "Peer-review"];
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-10 p-8">
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3 sm:gap-4">
            <span
              className="deck-pop rounded-2xl border-2 border-zinc-900 px-5 py-3 text-2xl font-extrabold text-zinc-900 sm:text-3xl"
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="deck-accent text-3xl font-extrabold sm:text-4xl">→</span>
            )}
          </div>
        ))}
      </div>
      <div className="deck-rise flex flex-col items-center gap-1" style={{ animationDelay: "0.6s" }}>
        <span className={`deck-accent ${headingBase} ${deckType.statement}`}>5 minutes</span>
        <span className={`text-3xl text-zinc-500 line-through sm:text-5xl ${headingBase}`}>40-60 hours by hand</span>
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Stanford
  <ImageSlide key="stanford" src={`${LIB}/stanford-logo.png`} alt="Stanford University logo" />,

  // 2 — One prompt = tunnel vision
  <ImageSlide key="tunnel" src={`${LIB}/tunnel-vision.gif`} alt="Tunnel vision" />,

  // 3 — What STORM stands for
  <StormTitle key="storm-title" />,

  // 4–8 — The five expert personas
  <ImageSlide key="practitioner" src={`${LIB}/i-am-the-practitioner.gif`} alt="The Practitioner" caption="Practitioner" />,
  <ImageSlide key="academic" src={`${LIB}/academic.gif`} alt="The Academic" caption="Academic" />,
  <ImageSlide key="skeptic" src={`${LIB}/skeptic.gif`} alt="The Skeptic" caption="Skeptic" />,
  <ImageSlide key="economist" src={`${LIB}/trickle-down-economics.gif`} alt="The Economist" caption="Economist" />,
  <ImageSlide key="historian" src={`${LIB}/history.gif`} alt="The Historian" caption="Historian" />,

  // 9 — The four-prompt workflow
  <StormFlow key="flow" />,

  // 10 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="STORM prompts preview"
    previewSide="left"
  />,
];

export default function StanfordStormDeckPage() {
  return <Deck slides={slides} />;
}
