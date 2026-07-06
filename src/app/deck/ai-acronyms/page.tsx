import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { TextSlide, PointSlide, HL } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "AI Acronyms You Should Know" };

// 1 — All 8 acronyms scattered across the page (word-cloud), looping.
function ScatteredAcronyms() {
  const terms = [
    { t: "GPT", left: "7%", top: "12%", size: "10rem", rot: -7, accent: true },
    { t: "LLM", left: "55%", top: "8%", size: "9rem", rot: 6, accent: false },
    { t: "API", left: "73%", top: "40%", size: "8.5rem", rot: -5, accent: true },
    { t: "CLI", left: "9%", top: "46%", size: "9rem", rot: 5, accent: false },
    { t: "GPU", left: "37%", top: "40%", size: "10rem", rot: 3, accent: false },
    { t: "AEO", left: "14%", top: "74%", size: "8.5rem", rot: -6, accent: true },
    { t: "AGI", left: "49%", top: "70%", size: "11rem", rot: 4, accent: false },
    { t: "RAG", left: "77%", top: "72%", size: "9rem", rot: -4, accent: false },
  ];
  return (
    <div className="deck-fade relative h-full w-full overflow-hidden">
      {terms.map((w, i) => (
        <div key={w.t} className="absolute" style={{ left: w.left, top: w.top, transform: `rotate(${w.rot}deg)` }}>
          <span
            className="deck-loop-pop font-extrabold leading-none"
            style={{ animationDelay: `${0.12 * i}s`, fontSize: w.size, color: w.accent ? "#fd4869" : "#111" }}
          >
            {w.t}
          </span>
        </div>
      ))}
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Ever nodded along to an AI acronym with zero clue?
  <ScatteredAcronyms key="terms" />,

  // 2 — Let's go term by term
  <TextSlide key="intro">
    <span>
      <HL>8 acronyms</HL>, made actually simple
    </span>
  </TextSlide>,

  // 3 — GPT
  <PointSlide key="gpt" number="GPT" emoji="🧠">
    Generative Pre-trained Transformer
  </PointSlide>,

  // 4 — LLM
  <PointSlide key="llm" number="LLM" emoji="📚">
    Large Language Model
  </PointSlide>,

  // 5 — API
  <PointSlide key="api" number="API" emoji="🔌">
    Application Programming Interface
  </PointSlide>,

  // 6 — CLI
  <PointSlide key="cli" number="CLI" emoji="⌨️">
    Command Line Interface
  </PointSlide>,

  // 7 — GPU
  <PointSlide key="gpu" number="GPU" emoji="🎮">
    Graphics Processing Unit
  </PointSlide>,

  // 8 — AEO
  <PointSlide key="aeo" number="AEO" emoji="🎯">
    Answer Engine Optimization
  </PointSlide>,

  // 9 — AGI
  <PointSlide key="agi" number="AGI" emoji="🏁">
    Artificial General Intelligence
  </PointSlide>,

  // 10 — RAG
  <PointSlide key="rag" number="RAG" emoji="📖">
    Retrieval Augmented Generation
  </PointSlide>,

  // 11 — CTA
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for the AI acronym cheat sheet" />,
];

export default function AiAcronymsDeckPage() {
  return <Deck slides={slides} />;
}
