import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { deckType, headingBase } from "@/components/deck/deck-styles";
import {
  CoverSlide,
  HL,
  ImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How to Humanize Your AI Text",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const MUTED = "#8E8E96";

/**
 * Step 3 visual — ChatGPT struck out, Codex promoted, Claude set aside.
 * Stands in for the ChatGPT/Codex/Claude logo lockup, which is not in the
 * library yet.
 */
function DraftingMoveVisual() {
  return (
    <div className="deck-pop flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 600 640"
        className="h-auto w-full max-w-lg"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="Drafting moved out of ChatGPT and into Codex; Claude still sounds like Claude."
      >
        {/* ChatGPT — struck out */}
        <rect
          x={40}
          y={20}
          width={520}
          height={140}
          rx={28}
          fill="#ffffff"
          stroke={MUTED}
          strokeWidth={2}
        />
        <text
          x={300}
          y={90}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={56}
          fontWeight={800}
          fill={MUTED}
        >
          ChatGPT
        </text>
        <line
          x1={130}
          y1={90}
          x2={470}
          y2={90}
          stroke={ACCENT}
          strokeWidth={7}
          strokeLinecap="round"
        />

        {/* Arrow down */}
        <line
          x1={300}
          y1={185}
          x2={300}
          y2={245}
          stroke={ACCENT}
          strokeWidth={8}
          strokeLinecap="round"
        />
        <path d="M280 235 L300 265 L320 235 Z" fill={ACCENT} />

        {/* Codex — the move */}
        <rect
          x={40}
          y={290}
          width={520}
          height={180}
          rx={28}
          fill="#ffffff"
          stroke={ACCENT}
          strokeWidth={5}
        />
        <text
          x={300}
          y={358}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={64}
          fontWeight={800}
          fill={INK}
        >
          Codex
        </text>
        <text
          x={300}
          y={420}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={32}
          fontWeight={600}
          fill={ACCENT}
        >
          GPT-5.6 Soul
        </text>

        {/* Claude — set aside */}
        <rect
          x={40}
          y={510}
          width={520}
          height={110}
          rx={28}
          fill="#ffffff"
          stroke={MUTED}
          strokeWidth={2}
          strokeDasharray="10 10"
        />
        <text
          x={300}
          y={548}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={40}
          fontWeight={800}
          fill={MUTED}
        >
          Claude
        </text>
        <text
          x={300}
          y={592}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={26}
          fontWeight={500}
          fill={MUTED}
        >
          still sounds like Claude
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — I write first drafts of my scripts, emails, and DMs with AI, saving me so much time and nobody can tell, because of 3 things I do that most people don't.
  <Fragment key="cover">
    <CoverSlide
      title={
        <>
          <HL>Good</HL> AI writing is possible
        </>
      }
    />
    <Notes>
      I write first drafts of my scripts, emails, and DMs with AI, saving me so
      much time and nobody can tell, because of 3 things I do that most people
      don&apos;t. The last one is the simplest but most unintuitive.
    </Notes>
  </Fragment>,

  // 2 — First, I run 2 skills on every draft. Humanizer and Peter Yang's No AI Slop.
  <Fragment key="humanizer">
    <ImageSlide
      src={`${LIB}/humanize-ai-text-humanizer-skill.png`}
      alt="The Humanizer skill: Remove AI Writing Patterns"
    />
    <Notes>
      First, I run 2 skills on every draft. One&apos;s called Humanizer, the
      other is my friend Peter Yang&apos;s No AI Slop skill. A skill is just a
      saved set of instructions the AI runs on command, and these ones strip the
      AI tells. Like when it writes &quot;it&apos;s not just a tool, it&apos;s a
      system.&quot;
    </Notes>
  </Fragment>,

  // 3 — 2nd, and this is the one people skip, I save my own writing as examples inside the skill folder.
  <Fragment key="examples">
    <ImageSlide
      src={`${LIB}/humanize-ai-text-skill-folder-structure.png`}
      alt="Skill folder structure: generate-x.md containing SKILL.md and examples.md"
      caption={
        <>
          Save your writing as <HL>examples</HL>
        </>
      }
      captionSize={deckType.statementSm}
      framed
    />
    <Notes>
      2nd, and this is the one people skip, I save my own writing as examples
      inside the skill folder. For example this is the structure of my skills
      that help me generate my script drafts. Now it copies me instead of
      guessing what I sound like.
    </Notes>
  </Fragment>,

  // 4 — 3rd, I moved my drafting out of ChatGPT and into Codex.
  <Fragment key="codex">
    <div className="flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <h2
        className={`deck-rise mb-5 text-center sm:mb-7 ${headingBase} ${deckType.statementSm}`}
        style={{ animationDelay: "0.05s" }}
      >
        Draft in <HL>Codex</HL>, not ChatGPT
      </h2>
      <DraftingMoveVisual />
    </div>
    <Notes>
      3rd, I moved my drafting out of ChatGPT and into Codex. GPT-5.6 Soul
      writes noticeably better. Claude still sounds like Claude by default.
    </Notes>
  </Fragment>,

  // 5 — None of this is writing talent. It's 3 settings, and most people never turn them on.
  <Fragment key="settings">
    <TextSlide>
      <HL>3 settings</HL>, not talent
    </TextSlide>
    <Notes>
      None of this is writing talent. It&apos;s 3 settings, and most people
      never turn them on.
    </Notes>
  </Fragment>,

  // 6 — Set them up right once and you get hours back every week so you stay timerich.
  <Fragment key="timerich">
    <TextSlide>
      <HL>Hours back</HL> every week
    </TextSlide>
    <Notes>
      Set them up right once and you get hours back every week so you stay
      timerich.
    </Notes>
  </Fragment>,

  // 7 — Comment MIKA for the links to the skills and my step by step guide.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for the links + guide"
    />
    <Notes>
      Comment MIKA for the links to the skills and my step by step guide and let
      me know what kinds of text you&apos;d like to use this for!
    </Notes>
  </Fragment>,
];

export default function HumanizeAiTextDeckPage() {
  return <Deck slides={slides} />;
}
