import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { TextSlide, HL } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "The Claude Jargon Cheat Sheet" };

// 1 — All 7 terms scattered across the page (word-cloud), looping.
function ScatteredTerms() {
  const terms = [
    { t: "PLUGINS", left: "8%", top: "12%", size: "6rem", rot: -8, accent: true },
    { t: "ROUTINES", left: "54%", top: "9%", size: "5rem", rot: 6, accent: false },
    { t: "SKILLS", left: "10%", top: "38%", size: "6.5rem", rot: 4, accent: false },
    { t: "COMMANDS", left: "50%", top: "36%", size: "5.2rem", rot: -5, accent: true },
    { t: "ARTIFACTS", left: "13%", top: "64%", size: "5.4rem", rot: 7, accent: false },
    { t: "CONNECTORS", left: "48%", top: "62%", size: "5.6rem", rot: -6, accent: false },
    { t: "PROJECTS", left: "28%", top: "82%", size: "5rem", rot: 3, accent: true },
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
  // 1 — I made a cheat sheet for all 7 Claude features
  <ScatteredTerms key="terms" />,

  // 2 — Most people use maybe 10% of Claude
  <TextSlide key="ten" emoji="🤷">
    Most people use <HL>10%</HL> of Claude
  </TextSlide>,

  // 3 — Plugins
  <TextSlide key="plugins" emoji="🧩">
    <span>
      <HL>Plugins</HL>: a whole department in one install
    </span>
  </TextSlide>,

  // 4 — Scheduled routines
  <TextSlide key="routines" emoji="⏰">
    <span>
      <HL>Scheduled routines</HL>: set once, runs itself
    </span>
  </TextSlide>,

  // 5 — Skills
  <TextSlide key="skills" emoji="🎓">
    <span>
      <HL>Skills</HL>: train once, never forgets
    </span>
  </TextSlide>,

  // 6 — Commands
  <TextSlide key="commands" emoji="⌨️">
    <span>
      <HL>Commands</HL>: one word, whole process
    </span>
  </TextSlide>,

  // 7 — Artifacts
  <TextSlide key="artifacts" emoji="📄">
    <span>
      <HL>Artifacts</HL>: the thing Claude makes, edit it live
    </span>
  </TextSlide>,

  // 8 — Connectors
  <TextSlide key="connectors" emoji="🔌">
    <span>
      <HL>Connectors</HL>: plug into your apps
    </span>
  </TextSlide>,

  // 9 — Projects
  <TextSlide key="projects" emoji="🗂️">
    <span>
      <HL>Projects</HL>: one workspace, nothing gets lost
    </span>
  </TextSlide>,

  // 10 — CTA
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for the full cheat sheet on all 7" />,
];

export default function ClaudeConceptsDeckPage() {
  return <Deck slides={slides} />;
}
