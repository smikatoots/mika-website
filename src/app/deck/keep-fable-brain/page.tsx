import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Keep Fable's Brain After You Lose Access" };

const LIB = "/decks/_library";

// 2 — The analogy: a departing employee writes SOPs → those SOPs are skills.
// Person (quits) → arrow → SOP doc  =  .skill file (salmon).
function EmployeeToSkillsSvg() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-6 sm:p-10">
      <svg
        viewBox="0 0 1000 430"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <marker id="kfbArrow" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#111" />
          </marker>
        </defs>

        {/* title */}
        <text x="500" y="52" textAnchor="middle" fontSize="30" fontWeight="800" fill="#111">
          Before it leaves, it writes the manual
        </text>

        {/* panel 1 — departing employee */}
        <circle cx="150" cy="185" r="40" fill="#111" />
        <path d="M96 315 C96 248 204 248 204 315 Z" fill="#111" />
        <text x="150" y="368" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111">
          The genius quits
        </text>

        {/* arrow 1 */}
        <line x1="248" y1="240" x2="352" y2="240" stroke="#111" strokeWidth="4" markerEnd="url(#kfbArrow)" />

        {/* panel 2 — SOP doc */}
        <rect x="385" y="150" width="170" height="185" rx="16" fill="#fff" stroke="#111" strokeWidth="3" />
        <text x="470" y="205" textAnchor="middle" fontSize="34" fontWeight="800" fill="#111">
          SOP
        </text>
        <rect x="415" y="232" width="110" height="10" rx="5" fill="#d4d4d8" />
        <rect x="415" y="255" width="110" height="10" rx="5" fill="#d4d4d8" />
        <rect x="415" y="278" width="78" height="10" rx="5" fill="#d4d4d8" />
        <text x="470" y="372" textAnchor="middle" fontSize="22" fontWeight="700" fill="#111">
          written down
        </text>

        {/* equals */}
        <text x="622" y="262" textAnchor="middle" fontSize="72" fontWeight="800" fill="#111">
          =
        </text>

        {/* panel 3 — .skill file */}
        <rect x="705" y="150" width="170" height="185" rx="16" fill="#fd4869" />
        <text x="790" y="212" textAnchor="middle" fontSize="32" fontWeight="800" fill="#fff">
          .skill
        </text>
        <rect x="735" y="242" width="110" height="10" rx="5" fill="#ffffff" opacity="0.6" />
        <rect x="735" y="265" width="110" height="10" rx="5" fill="#ffffff" opacity="0.6" />
        <rect x="735" y="288" width="78" height="10" rx="5" fill="#ffffff" opacity="0.6" />
        <text x="790" y="372" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fd4869">
          you keep it
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Spoken hook: one day left with Fable, keep its brain after it leaves
  <ImageSlide key="fable-5" src={`${LIB}/fable-5.jpg`} alt="Fable 5 by Anthropic" />,

  // 2 — Context: a departing employee writes SOPs; those SOPs are skills
  <EmployeeToSkillsSvg key="analogy" />,

  // 3 — Step 1: ask Fable for a plan of your top 10 skills
  <TextSlide key="step-plan" emoji="🗺️">
    Ask Fable to <HL>plan</HL> your top 10 skills
  </TextSlide>,

  // 4 — Example: mine came back with an honest business advisor
  <TextSlide key="example">
    My favorite? An <HL>honest business advisor</HL>
  </TextSlide>,

  // 5 — Step 2: build all of them or just the highest-leverage ones
  <TextSlide key="step-build" emoji="🛠️">
    Build the <HL>highest-leverage</HL> ones
  </TextSlide>,

  // 6 — Step 3 (bonus): upgrade your CLAUDE.md / AGENTS.md brain
  <TextSlide key="step-brain" emoji="🧠">
    Upgrade your <HL>CLAUDE.md</HL> brain
  </TextSlide>,

  // 7 — Close: you lose Fable, but keep how it thinks
  <TextSlide key="close" display>
    You lose Fable. You keep <HL>how it thinks</HL>
  </TextSlide>,

  // 8 — CTA
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for the starter prompts"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Fable skills starter prompts guide"
  />,
];

export default function KeepFableBrainDeckPage() {
  return <Deck slides={slides} />;
}
