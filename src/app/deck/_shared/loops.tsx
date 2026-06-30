import Image from "next/image";

import { deckType, headingBase } from "@/components/deck/deck-styles";

const LIB = "/decks/_library";

/**
 * Shared slides for the 4-part LOOPS series (CON-295/296/297/298).
 * Server components — animation is CSS-only via the deck-* classes.
 */

// Opening credibility grid: Claude + OpenClaw logos (top), the two founders
// who said they stopped prompting (bottom).
export function LoopsQuad() {
  const cells = [
    { src: `${LIB}/claude-logo.png`, alt: "Claude logo", contain: true },
    { src: `${LIB}/openclaw-logo.png`, alt: "OpenClaw logo", contain: true },
    { src: `${LIB}/peter-steinberger.jpg`, alt: "Peter Steinberger, creator of OpenClaw", contain: false },
    { src: `${LIB}/boris-cherny.jpeg`, alt: "Boris Cherny, creator of Claude Code", contain: false },
  ];
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-5 sm:gap-8">
        {cells.map((c, i) => (
          <div
            key={c.src}
            className="deck-pop relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_18px_50px_-20px_rgba(0,0,0,0.3)]"
            style={{ animationDelay: `${0.1 + i * 0.1}s` }}
          >
            <Image
              src={c.src}
              alt={c.alt}
              fill
              sizes="(max-width: 768px) 45vw, 20rem"
              className={c.contain ? "object-contain p-8 sm:p-12" : "object-cover"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Big "LOOPS" wordmark in salmon with a small "part N" kicker beneath.
export function LoopsTitle({ part }: { part: number }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-4 px-8">
      <span className={`deck-pop deck-accent ${headingBase} ${deckType.display}`}>LOOPS</span>
      <span
        className={`deck-rise uppercase tracking-[0.15em] text-zinc-500 ${headingBase} ${deckType.statement}`}
        style={{ animationDelay: "0.2s" }}
      >
        part {part}
      </span>
    </div>
  );
}

// CON-297 hook: left = prompt→reply dead-ending in a grey ❌; right = the same
// loop that feeds reply back into prompt, in salmon, ending in a ✅.
export function LoopHookSlide() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-6">
      <svg
        viewBox="0 0 1000 560"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <marker id="greyArrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#9ca3af" />
          </marker>
          <marker id="salmonArrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#fd4869" />
          </marker>
        </defs>

        {/* LEFT — prompting, grey, dead end */}
        <g fill="none" stroke="#9ca3af" strokeWidth="3">
          <rect x="120" y="60" width="240" height="86" rx="18" />
          <rect x="120" y="236" width="240" height="86" rx="18" />
          <line x1="240" y1="146" x2="240" y2="232" markerEnd="url(#greyArrow)" />
        </g>
        <text x="240" y="113" textAnchor="middle" fontSize="34" fontWeight="700" fill="#9ca3af">Prompt</text>
        <text x="240" y="289" textAnchor="middle" fontSize="34" fontWeight="700" fill="#9ca3af">Reply</text>
        <text x="240" y="455" textAnchor="middle" fontSize="110">❌</text>

        {/* RIGHT — looping, salmon */}
        <g fill="none" stroke="#fd4869" strokeWidth="3">
          <rect x="640" y="60" width="240" height="86" rx="18" />
          <rect x="640" y="236" width="240" height="86" rx="18" />
          <line x1="760" y1="146" x2="760" y2="232" markerEnd="url(#salmonArrow)" />
          <path d="M640 279 C 548 279, 548 103, 636 103" markerEnd="url(#salmonArrow)" />
        </g>
        <text x="760" y="113" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fd4869">Prompt</text>
        <text x="760" y="289" textAnchor="middle" fontSize="34" fontWeight="700" fill="#fd4869">Reply</text>
        <text x="760" y="455" textAnchor="middle" fontSize="110">✅</text>
      </svg>
    </div>
  );
}

// Giant emoji used as the right-side visual of the loop-parts Steps sequence.
export function BigEmoji({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center">
      <span className="text-[9rem] leading-none sm:text-[13rem]">{children}</span>
    </div>
  );
}

// CON-297 research example: without a loop you get broken/invented citations;
// with a loop, every source is validated.
export function ResearchBeforeAfter() {
  const cards = [
    { label: "No loop", color: "#9ca3af", mark: "✕", lines: ["[1] source ✕", "[2] source ✕", "[3] source ✕"] },
    { label: "Loop", color: "#fd4869", mark: "✓", lines: ["[1] source ✓", "[2] source ✓", "[3] source ✓"] },
  ];
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center gap-6 p-6 sm:gap-10 sm:p-10">
      {cards.map((c, i) => (
        <div
          key={c.label}
          className="deck-pop flex w-full max-w-md flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-8 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] sm:p-11"
          style={{ animationDelay: `${0.1 + i * 0.12}s` }}
        >
          <span
            className={`uppercase tracking-[0.2em] ${headingBase} ${deckType.statement}`}
            style={{ color: c.color }}
          >
            {c.label}
          </span>
          {c.lines.map((l) => (
            <span key={l} className="font-mono text-3xl font-bold sm:text-4xl" style={{ color: c.color }}>
              {l}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
