import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "Ponytail — Cut Token Spend by 53%" };

const LIB = "/decks/_library";

// The little ladder Ponytail walks before it writes any code.
function DecisionLadder() {
  const rungs = ["Does it already exist?", "Is it built in?", "Can it be one line?"];
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-6 p-8 sm:gap-7">
      {rungs.map((r, i) => (
        <div
          key={r}
          className="deck-pop flex w-full max-w-4xl items-center gap-6 rounded-2xl border-2 border-zinc-900 px-10 py-7"
          style={{ animationDelay: `${0.1 + i * 0.14}s` }}
        >
          <span className="deck-accent text-5xl font-extrabold sm:text-6xl">{i + 1}</span>
          <span className={`text-4xl font-bold text-zinc-900 sm:text-6xl ${headingBase}`}>{r}</span>
        </div>
      ))}
      <div
        className="deck-pop mt-3 rounded-2xl bg-zinc-900 px-10 py-6 font-mono text-4xl text-white sm:text-5xl"
        style={{ animationDelay: "0.6s" }}
      >
        → ship one line
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Hook: the viral Ponytail repo
  <ImageSlide key="repo-history" src={`${LIB}/ponytail-github-history.svg`} alt="Ponytail GitHub star history" />,

  // 2 — Install once, runs every session
  <ImageSlide key="repo" src={`${LIB}/ponytail-github.png`} alt="Ponytail GitHub repo" />,

  // 3 — Without Ponytail: 190 lines
  <ImageSlide key="before" src={`${LIB}/countdown-timer.gif`} alt="A countdown timer" caption="190 lines" />,

  // 4 — With Ponytail: 13 lines
  <ImageSlide key="after" src={`${LIB}/ponytail-github.png`} alt="Ponytail result" caption="13 lines" />,

  // 5 — The rule: stop reinventing
  <DecisionLadder key="ladder" />,

  // 6 — The benchmark
  <TextSlide key="benchmark">
    <span>
      Costs dropped <HL>53%</HL>.
    </span>
    <span>
      Sessions ran <HL>71% faster</HL>.
    </span>
  </TextSlide>,

  // 7 — Bigger model, bigger savings
  <TextSlide key="bigger">
    <span>
      Bigger model → <HL>bigger savings</HL>.
    </span>
  </TextSlide>,

  // 8 — Works everywhere
  <ImageSlide key="everywhere" src={`${LIB}/coding-agents-in-one.jpg`} alt="Works with every coding agent" />,

  // 9 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Ponytail install preview"
    previewSide="left"
  />,
];

export default function PonytailDeckPage() {
  return <Deck slides={slides} />;
}
