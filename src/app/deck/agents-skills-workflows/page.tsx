import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { Notes } from "@/components/deck/reveal-parts";

export const metadata: Metadata = {
  title: "Agents vs Skills vs Workflows",
};

const LIB = "/decks/_library";

/** Shared SVG type treatment — the deck typeface, never a hardcoded family. */
const DECK_FONT = "var(--font-deck)";
const INK = "var(--deck-ink)";
const ACCENT = "var(--deck-accent)";
const MUTED = "#52525B";
const RULE = "#E4E4E7";

/**
 * Slide 3 — Workflow.
 * A recipe card on the left ("same steps, same order"), then the fixed
 * three-step chain transcript → script → caption. The coral is rationed to the
 * arrows: the chain *is* the point of the diagram.
 */
function RecipeChainSvg() {
  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="A recipe card labelled 'same steps, same order' feeding a fixed three-step chain: transcript, then script, then caption."
    >
      {/* Recipe card */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <rect x="40" y="45" width="300" height="300" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <line x1="40" y1="112" x2="340" y2="112" stroke={INK} strokeWidth="5" />
        <text
          x="190"
          y="90"
          textAnchor="middle"
          fill={INK}
          fontSize="36"
          fontWeight="800"
          letterSpacing="3"
          fontFamily={DECK_FONT}
        >
          RECIPE
        </text>

        <circle cx="82" cy="158" r="9" fill={MUTED} />
        <rect x="104" y="150" width="210" height="16" rx="8" fill={RULE} />
        <circle cx="82" cy="204" r="9" fill={MUTED} />
        <rect x="104" y="196" width="210" height="16" rx="8" fill={RULE} />
        <circle cx="82" cy="250" r="9" fill={MUTED} />
        <rect x="104" y="242" width="210" height="16" rx="8" fill={RULE} />

        <text x="190" y="292" textAnchor="middle" fill={MUTED} fontSize="25" fontFamily={DECK_FONT}>
          Same steps.
        </text>
        <text x="190" y="324" textAnchor="middle" fill={MUTED} fontSize="25" fontFamily={DECK_FONT}>
          Same order.
        </text>
      </g>

      {/* Card → chain connector */}
      <g className="deck-fade" style={{ animationDelay: "0.2s" }}>
        <line x1="352" y1="195" x2="399" y2="195" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        <polygon points="399,184 415,195 399,206" fill={ACCENT} />
      </g>

      {/* Step 1 — transcript */}
      <g className="deck-fade" style={{ animationDelay: "0.3s" }}>
        <rect x="425" y="149" width="205" height="92" rx="46" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <text x="527" y="208" textAnchor="middle" fill={INK} fontSize="32" fontWeight="800" fontFamily={DECK_FONT}>
          transcript
        </text>
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.4s" }}>
        <line x1="640" y1="195" x2="674" y2="195" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        <polygon points="674,184 690,195 674,206" fill={ACCENT} />
      </g>

      {/* Step 2 — script */}
      <g className="deck-fade" style={{ animationDelay: "0.5s" }}>
        <rect x="696" y="149" width="205" height="92" rx="46" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <text x="798" y="208" textAnchor="middle" fill={INK} fontSize="32" fontWeight="800" fontFamily={DECK_FONT}>
          script
        </text>
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.6s" }}>
        <line x1="911" y1="195" x2="945" y2="195" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" />
        <polygon points="945,184 961,195 945,206" fill={ACCENT} />
      </g>

      {/* Step 3 — caption */}
      <g className="deck-fade" style={{ animationDelay: "0.7s" }}>
        <rect x="967" y="149" width="205" height="92" rx="46" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <text x="1069" y="208" textAnchor="middle" fill={INK} fontSize="32" fontWeight="800" fontFamily={DECK_FONT}>
          caption
        </text>
      </g>
    </svg>
  );
}

/**
 * Slide 4 — Skill.
 * One knife (the Humanizer skill) branching to two different bodies of text.
 * Same job, different material. Coral is rationed to the two branches.
 */
function KnifeBranchSvg() {
  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="A chef's knife labelled Humanizer, branching to two panels: scripts and emails."
    >
      {/* Knife — one technique */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <rect x="60" y="170" width="125" height="64" rx="24" fill={INK} />
        <rect x="178" y="164" width="16" height="76" rx="6" fill={INK} />
        <path d="M194 168 L392 194 Q408 200 392 208 Q300 236 194 240 Z" fill={MUTED} />
        <text x="230" y="302" textAnchor="middle" fill={INK} fontSize="32" fontWeight="800" fontFamily={DECK_FONT}>
          Humanizer
        </text>
      </g>

      {/* Branch up — scripts */}
      <g className="deck-fade" style={{ animationDelay: "0.25s" }}>
        <path
          d="M418 190 C 520 186, 560 126, 676 120"
          fill="none"
          stroke={ACCENT}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="676,109 700,120 676,131" fill={ACCENT} />
      </g>

      {/* Branch down — emails */}
      <g className="deck-fade" style={{ animationDelay: "0.35s" }}>
        <path
          d="M418 218 C 520 222, 560 282, 676 288"
          fill="none"
          stroke={ACCENT}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <polygon points="676,277 700,288 676,299" fill={ACCENT} />
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.45s" }}>
        <rect x="706" y="62" width="440" height="116" rx="24" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <text x="926" y="136" textAnchor="middle" fill={INK} fontSize="44" fontWeight="800" fontFamily={DECK_FONT}>
          scripts
        </text>
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.55s" }}>
        <rect x="706" y="230" width="440" height="116" rx="24" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <text x="926" y="304" textAnchor="middle" fill={INK} fontSize="44" fontWeight="800" fontFamily={DECK_FONT}>
          emails
        </text>
      </g>
    </svg>
  );
}

/**
 * Slide 5 — Agent.
 * One goal on the left, three candidate routes fanning out. Two stay dashed and
 * muted; the one the agent picks is the single coral element on the slide.
 */
function GoalPathsSvg() {
  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="One goal node fanning out to three candidate routes — search ads, retargeting and lookalikes — with retargeting picked."
    >
      {/* The goal */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <rect x="40" y="145" width="300" height="110" rx="26" fill={INK} />
        <text x="190" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="42" fontWeight="800" fontFamily={DECK_FONT}>
          One goal
        </text>
      </g>

      {/* Candidate route — not taken */}
      <g className="deck-fade" style={{ animationDelay: "0.25s" }}>
        <path
          d="M348 190 C 470 180, 540 96, 740 92"
          fill="none"
          stroke={MUTED}
          strokeWidth="5"
          strokeDasharray="14 12"
          strokeLinecap="round"
        />
        <polygon points="740,81 760,92 740,103" fill={MUTED} />
        <rect x="766" y="40" width="380" height="104" rx="24" fill="#FFFFFF" stroke={RULE} strokeWidth="4" />
        <text x="956" y="105" textAnchor="middle" fill={MUTED} fontSize="36" fontWeight="800" fontFamily={DECK_FONT}>
          Search ads
        </text>
      </g>

      {/* Candidate route — not taken */}
      <g className="deck-fade" style={{ animationDelay: "0.35s" }}>
        <path
          d="M348 210 C 470 220, 540 304, 740 308"
          fill="none"
          stroke={MUTED}
          strokeWidth="5"
          strokeDasharray="14 12"
          strokeLinecap="round"
        />
        <polygon points="740,297 760,308 740,319" fill={MUTED} />
        <rect x="766" y="256" width="380" height="104" rx="24" fill="#FFFFFF" stroke={RULE} strokeWidth="4" />
        <text x="956" y="321" textAnchor="middle" fill={MUTED} fontSize="36" fontWeight="800" fontFamily={DECK_FONT}>
          Lookalikes
        </text>
      </g>

      {/* The route it picks */}
      <g className="deck-fade" style={{ animationDelay: "0.5s" }}>
        <line x1="348" y1="200" x2="740" y2="200" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
        <polygon points="740,189 762,200 740,211" fill={ACCENT} />
        <rect x="766" y="148" width="380" height="104" rx="24" fill="#FFFFFF" stroke={ACCENT} strokeWidth="6" />
        <text x="956" y="213" textAnchor="middle" fill={INK} fontSize="36" fontWeight="800" fontFamily={DECK_FONT}>
          Retargeting
        </text>
      </g>
    </svg>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Most people using AI couldn't actually tell you the difference between an agent, a skill, and a workflow.
  <Fragment key="confusion">
    <TextSlide>
      <HL>Agent</HL> vs. <HL delay={0.12}>skill</HL> vs.{" "}
      <HL delay={0.24}>workflow</HL>
    </TextSlide>
    <Notes>
      Most people using AI couldn&apos;t actually tell you the difference between an agent, a
      skill, and a workflow. Let me explain all three as simply as I can.
    </Notes>
  </Fragment>,

  // 2 — I taught AI to a class with 1000 signups and I find that analogies are helpful.
  <Fragment key="class">
    <ImageSlide
      src={`${LIB}/agents-skills-workflows-class-photo.png`}
      alt="Mika with a packed room of students at the end of an AI class"
    />
    <Notes>
      I taught AI to a class with 1000 signups, and I find that analogies are helpful.
    </Notes>
  </Fragment>,

  // 3 — A workflow is the recipe. Same steps, same order, every time. Mine goes transcript, script, caption.
  <Fragment key="workflow">
    <CoverSlide title="Workflow = the recipe." diagram={<RecipeChainSvg />} />
    <Notes>
      Think of a kitchen. A workflow is the recipe — same steps, same order, every time. Mine
      goes transcript, script, caption.
    </Notes>
  </Fragment>,

  // 4 — A skill is a technique the chef already knows. One job, one command, many use cases.
  <Fragment key="skill">
    <CoverSlide
      title="Skill = a technique the chef knows."
      diagram={<KnifeBranchSvg />}
    />
    <Notes>
      A skill is a technique the chef already knows — one job, one command, applied across a
      variety of use cases. My humanizer skill humanizes AI text. Same job, different bodies of
      text: my scripts, or my emails.
    </Notes>
  </Fragment>,

  // 5 — An agent is the chef. You give it one goal and it picks the steps.
  <Fragment key="agent">
    <CoverSlide title="Agent = the chef." diagram={<GoalPathsSvg />} />
    <Notes>
      An agent is the chef. You give it one goal and it picks the steps from the context it has.
      A paid ads agent knows it has to create ads while spending the least money — you let it
      run and it decides how.
    </Notes>
  </Fragment>,

  // 6 — Comment MIKA for my full guide.
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for the full guide" />
    <Notes>
      Comment MIKA for my full guide, and let me know if you have other questions about any of
      the three concepts.
    </Notes>
  </Fragment>,
];

export default function AgentsSkillsWorkflowsDeckPage() {
  return <Deck slides={slides} />;
}
