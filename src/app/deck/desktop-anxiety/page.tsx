import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "How I fixed my desktop anxiety with Claude",
};

// ─── Missing-image fallbacks ─────────────────────────────────────────────────
// None of the referenced `_library` screenshots exist yet. Rather than ship a
// broken <img>, each slot renders an on-brand SVG placeholder labelled with the
// filename Mika should drop into public/decks/_library/. Swap these for the real
// templates (DualImageSlide / ImageSlide) once the screenshots are added.

function MissingShot({ label }: { label: string }) {
  return (
    <div className="relative flex w-full items-center justify-center">
      <svg
        viewBox="0 0 640 440"
        className="h-auto w-full max-w-2xl"
        role="img"
        aria-label={`Placeholder for ${label}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="8"
          y="8"
          width="624"
          height="424"
          rx="28"
          fill="#fff5f6"
          stroke="var(--deck-accent)"
          strokeWidth="3"
          strokeDasharray="11 11"
        />
        {/* photo glyph */}
        <rect
          x="238"
          y="118"
          width="164"
          height="128"
          rx="14"
          fill="none"
          stroke="var(--deck-accent)"
          strokeWidth="5"
        />
        <circle cx="284" cy="160" r="15" fill="var(--deck-accent)" />
        <path
          d="M246 240 L300 186 L336 224 L360 200 L394 240 Z"
          fill="var(--deck-accent)"
          opacity="0.85"
        />
        {/* filename */}
        <text
          x="320"
          y="312"
          textAnchor="middle"
          fontFamily="var(--font-bricolage), system-ui, sans-serif"
          fontSize="30"
          fontWeight="700"
          fill="#27272a"
        >
          {label}
        </text>
        <text
          x="320"
          y="352"
          textAnchor="middle"
          fontFamily="var(--font-bricolage), system-ui, sans-serif"
          fontSize="20"
          fontWeight="600"
          fill="var(--deck-accent)"
        >
          add to /decks/_library
        </text>
      </svg>
    </div>
  );
}

/** Image-only DualImageSlide stand-in — two placeholder tiles side by side. */
function MissingDualSlide({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-8 sm:flex-row sm:gap-8 sm:px-10 sm:py-10">
      <div className="flex w-full items-center justify-center sm:flex-1">
        <MissingShot label={left} />
      </div>
      <div className="flex w-full items-center justify-center sm:flex-1">
        <MissingShot label={right} />
      </div>
    </div>
  );
}

/** ImageSlide-with-header stand-in — caption header on top, placeholder below. */
function MissingImageSlide({
  caption,
  label,
}: {
  caption: React.ReactNode;
  label: string;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <h2
        className={`deck-rise mb-5 text-center sm:mb-7 ${headingBase} ${deckType.statement}`}
        style={{ animationDelay: "0.05s" }}
      >
        {caption}
      </h2>
      <div className="flex w-full flex-1 items-center justify-center">
        <MissingShot label={label} />
      </div>
    </div>
  );
}

// ─── Slides ──────────────────────────────────────────────────────────────────

const stepLabels: React.ReactNode[] = [
  "Start in Claude Cowork (or Code)",
  "Choose your project folder",
  "Give it the organizing prompt",
  "Claude analyzes & finds duplicates",
  "Five folders, everything sorted",
  "Same for Downloads",
];

const slides: React.ReactNode[] = [
  // 1 — This is how I got my desktop from this to this
  <MissingDualSlide
    key="desktop-before-after"
    left="desktop-before.png"
    right="desktop-after.png"
  />,

  // 2 — and my downloads from this to this using Claude
  <MissingDualSlide
    key="downloads-before-after"
    left="downloads-before.png"
    right="downloads-after.png"
  />,

  // 3 — Just looking at my desktop was giving me so much anxiety
  <TextSlide key="anxiety" emoji="😩">
    My desktop gave me so much <HL>anxiety</HL>.
  </TextSlide>,

  // 4 — My personal first AHA moment. Just like magic!
  <TextSlide key="aha" emoji="✨">
    My first real <HL>AHA</HL> moment. Pure <HL>magic</HL>.
  </TextSlide>,

  // 5 — By the way, I'm Mika
  <MissingImageSlide
    key="mika"
    caption={
      <>
        I&apos;m <A>Mika</A> — AI for founders, building a time-rich life.
      </>
    }
    label="mika-headshot.jpg"
  />,

  // 6 — Claude helps me become more time-rich with this workflow
  <TextSlide key="time-rich" emoji="⏳">
    Claude makes me <HL>time-rich</HL>, not time-poor.
  </TextSlide>,

  // 7 — Start in Claude Cowork (or Code)
  <StepsSlide
    key="step-cowork"
    steps={stepLabels}
    current={0}
    visual={<MissingShot label="claude-cowork-code-tools.png" />}
  />,

  // 8 — Choose your project folder
  <StepsSlide
    key="step-folder"
    steps={stepLabels}
    current={1}
    visual={<MissingShot label="cowork-project-folder-screenshot.png" />}
  />,

  // 9 — Give it the organizing prompt
  <StepsSlide
    key="step-prompt"
    steps={stepLabels}
    current={2}
    visual={<MissingShot label="organize-prompt-screenshot.png" />}
  />,

  // 10 — Claude analyzes & finds duplicates
  <StepsSlide
    key="step-analyze"
    steps={stepLabels}
    current={3}
    visual={<MissingShot label="claude-analysis-screenshot.png" />}
  />,

  // 11 — Five folders, everything sorted (reuse desktop-after.png)
  <StepsSlide
    key="step-folders"
    steps={stepLabels}
    current={4}
    visual={<MissingShot label="desktop-after.png" />}
  />,

  // 12 — Same for Downloads (reuse downloads-after.png)
  <StepsSlide
    key="step-downloads"
    steps={stepLabels}
    current={5}
    visual={<MissingShot label="downloads-after.png" />}
  />,

  // 13 — Want my prompts? CTA
  <CtaSlide
    key="cta"
    prompt={null}
    headline="Want my prompts?"
    sub={
      <>
        Follow &amp; comment <HL>MIKA</HL> below.
      </>
    }
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
