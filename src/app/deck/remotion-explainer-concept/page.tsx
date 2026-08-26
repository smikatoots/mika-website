import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Remotion Explainer Video: explain a concept visually",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const DECK_FONT = "var(--font-deck), system-ui, sans-serif";

/**
 * Slide 6 visual — the taste loop: three outlined nodes arranged as a triangle
 * (Describe, Preview, Refine) joined by coral arrows that close back on
 * themselves, so the cycle reads as continuous rather than as three steps.
 */
function TasteLoop() {
  const nodes = [
    { label: "DESCRIBE", cx: 480, cy: 110 },
    { label: "PREVIEW", cx: 810, cy: 470 },
    { label: "REFINE", cx: 150, cy: 470 },
  ];

  return (
    <div className="deck-fade flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 960 580"
        className="h-auto w-full max-w-3xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="A loop: describe the video, preview it, refine it, and describe again."
      >
        <defs>
          <marker
            id="taste-loop-arrow"
            viewBox="0 0 12 12"
            refX={10}
            refY={6}
            markerWidth={7}
            markerHeight={7}
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 12 6 L 0 12 z" fill={ACCENT} />
          </marker>
        </defs>

        {/* Coral arcs, drawn first so the node plates sit on top of their ends. */}
        <g
          fill="none"
          stroke={ACCENT}
          strokeWidth={7}
          strokeLinecap="round"
          markerEnd="url(#taste-loop-arrow)"
        >
          <path
            className="deck-cycle-fade"
            style={{ animationDelay: "0.18s" }}
            d="M 640 175 Q 800 250 838 380"
          />
          <path
            className="deck-cycle-fade"
            style={{ animationDelay: "0.54s" }}
            d="M 660 500 Q 480 560 300 500"
          />
          <path
            className="deck-cycle-fade"
            style={{ animationDelay: "0.9s" }}
            d="M 122 380 Q 160 250 320 175"
          />
        </g>

        {nodes.map(({ label, cx, cy }, index) => (
          <g
            key={label}
            className="deck-cycle-pop"
            style={{ animationDelay: `${index * 0.36}s` }}
          >
            <rect
              x={cx - 150}
              y={cy - 55}
              width={300}
              height={110}
              rx={55}
              fill="#ffffff"
              stroke={INK}
              strokeWidth={3}
            />
            <text
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={40}
              fontWeight={700}
              letterSpacing={1}
              fill={INK}
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Slide 7 visual — three stacked pills naming other things worth explaining
 * with a generated video, each marked with a small coral dot.
 */
function UseCasePills() {
  const pills = ["PRODUCT LAUNCHES", "LEARNING SOMETHING NEW", "COMPOUND INTEREST"];

  return (
    <div className="deck-fade flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 960 580"
        className="h-auto w-full max-w-3xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="Three other use cases: product launches, learning something new, compound interest."
      >
        {pills.map((label, i) => {
          const y = 40 + i * 175;
          return (
            <g key={label}>
              <rect
                x={30}
                y={y}
                width={900}
                height={130}
                rx={65}
                fill="#ffffff"
                stroke={INK}
                strokeWidth={3}
              />
              <circle cx={110} cy={y + 65} r={16} fill={ACCENT} />
              <text
                x={170}
                y={y + 65}
                dominantBaseline="central"
                fontSize={44}
                fontWeight={700}
                letterSpacing={1}
                fill={INK}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * A single full-bleed video, autoplaying on loop and muted so it starts without
 * interaction. Mirrors ImageSlide's unframed layout — next/image can't render
 * an mp4, so the deck needs its own element here.
 */
function VideoSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <div className="relative flex w-full flex-1 items-center justify-center">
        <video
          src={src}
          aria-label={alt}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — My 60-year-old dad can now explain how LLMs work to his friends. Because I made him a concept video breaking the whole thing down.
  <VideoSlide
    key="explainer-video"
    src={`${LIB}/remotion-explainer-concept-llm-explainer-4x.mp4`}
    alt="The generated explainer video playing, showing how an LLM makes a response"
  />,

  // 2 — I've tried explaining what I actually do to my dad in the Philippines probably a dozen times over the phone. He's not technical. But he learns very well visually!
  <ImageSlide
    key="mika-and-dad"
    src={`${LIB}/mika-and-dad.jpeg`}
    alt="Mika and her dad"
  />,

  // 3 — So I stopped explaining it and built him a video instead. I created an actual animated explainer, showing the model picking one word, then the next, then the next, in real time.
  <VideoSlide
    key="explainer-video-again"
    src={`${LIB}/remotion-explainer-concept-llm-explainer-4x.mp4`}
    alt="The animated explainer showing the model choosing the next token"
  />,

  // 4 — I used Remotion inside Claude Code or Codex. It's a tool that builds videos out of code, and there's a plugin you install once.
  <ImageSlide
    key="codex-plugin-install"
    src={`${LIB}/remotion-explainer-concept-codex-plugin-install.png`}
    alt="Searching for the Remotion plugin in Codex and clicking Install"
  />,

  // 5 — I typed what type of video I wanted. Some people call this "Vibe directing" and Codex + Remotion built the animation in one-shot.
  <ImageSlide
    key="typed-prompt"
    src={`${LIB}/remotion-explainer-concept-typed-prompt.png`}
    alt="The typed prompt asking Remotion to explain how AI and LLMs work"
  />,

  // 6 — After this, your personal taste comes in and you can prompt the video to make it look better! I never even had to open a video editor!
  <TasteLoop key="taste-loop" />,

  // 7 — You can also create videos for product launches, learning something new, explaining financial concepts that require visuals like compound interest and so much more.
  <UseCasePills key="use-cases" />,

  // 8 — Comment MIKA below and I'll share my step by step guide. Follow to stay ahead with AI.
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for the step-by-step guide" />,
];

export default function RemotionExplainerConceptDeckPage() {
  return <Deck slides={slides} />;
}
