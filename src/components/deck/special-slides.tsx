import Image from "next/image";

import { deckType, headingBase } from "./deck-styles";

/** The "AI Bullshit Trinity" pyramid as SVG. */
export function PyramidSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      role="img"
      aria-label="The AI Bullshit Trinity pyramid: Doomporn at the base, AI-native Efficiency Theater in the middle, AI Productivity Kabuki at the top."
    >
      {/* Bottom tier — Doomporn */}
      <g className="deck-tier" style={{ animationDelay: "0.15s" }}>
        <polygon points="212.3,335 587.7,335 680,480 120,480" fill="#efc9c4" />
        <text x="400" y="405" textAnchor="middle" fill="#9b3024" fontSize="38" fontWeight="800" fontFamily="var(--font-bricolage)">
          Doomporn
        </text>
        <text x="400" y="435" textAnchor="middle" fill="#9b3024" fontSize="24" fontStyle="italic" fontFamily="var(--font-bricolage)">
          Macro noise
        </text>
      </g>

      {/* Middle tier — Efficiency Theater */}
      <g className="deck-tier" style={{ animationDelay: "0.35s" }}>
        <polygon points="304.5,190 495.5,190 587.7,335 212.3,335" fill="#dccada" />
        <text x="400" y="258" textAnchor="middle" fill="#6b2d5c" fontSize="34" fontWeight="800" fontFamily="var(--font-bricolage)">
          AI-native Efficiency Theater
        </text>
        <text x="400" y="286" textAnchor="middle" fill="#6b2d5c" fontSize="23" fontStyle="italic" fontFamily="var(--font-bricolage)">
          Company noise
        </text>
      </g>

      {/* Top tier — Productivity Kabuki */}
      <g className="deck-tier" style={{ animationDelay: "0.55s" }}>
        <polygon points="400,40 495.5,190 304.5,190" fill="#f3e2bf" />
        <text x="400" y="135" textAnchor="middle" fill="#b5742a" fontSize="28" fontWeight="800" fontFamily="var(--font-bricolage)">
          AI Productivity Kabuki
        </text>
        <text x="400" y="160" textAnchor="middle" fill="#b5742a" fontSize="21" fontStyle="italic" fontFamily="var(--font-bricolage)">
          Individual noise
        </text>
      </g>
    </svg>
  );
}

/** Cover slide — pyramid only, centered. */
export function PyramidSlide() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center px-4 py-4">
      <PyramidSvg className="h-[min(94vh,58rem)] w-auto max-w-[96vw]" />
    </div>
  );
}

/**
 * Final call-to-action slide. Two shapes:
 *  - text only  → centered, fills the slide
 *  - text + image → text on one side, a `preview` image on the other
 */
export function CtaSlide({
  prompt = "Comment",
  headline = "MIKA",
  sub,
  preview,
  previewAlt = "",
  previewPlain = false,
  previewLarge = false,
  previewSide = "right",
  size = "lg",
}: {
  prompt?: React.ReactNode;
  headline?: React.ReactNode;
  sub?: React.ReactNode;
  /** Optional preview image src. When omitted, the slide is centered text-only. */
  preview?: string;
  previewAlt?: string;
  /** Drop the card frame around the preview image. */
  previewPlain?: boolean;
  /** Give the preview more horizontal room (pairs well with previewPlain). */
  previewLarge?: boolean;
  /** Which side the preview image sits on (desktop). */
  previewSide?: "left" | "right";
  /** Type scale — `sm` for image-heavy slides, `md` in between, `lg` default. */
  size?: "sm" | "md" | "lg";
}) {
  const promptSize =
    size === "sm" ? "text-5xl sm:text-6xl" : size === "md" ? "text-6xl sm:text-7xl" : deckType.statement;
  const headlineSize =
    size === "sm" ? "text-6xl sm:text-7xl" : size === "md" ? "text-7xl sm:text-8xl" : deckType.display;
  const subSize =
    size === "sm" ? "text-5xl sm:text-6xl" : size === "md" ? "text-6xl sm:text-7xl" : deckType.statement;
  const headlinePad =
    size === "sm" ? "my-4 px-7 py-3" : size === "md" ? "my-4 px-8 py-3.5" : "my-5 px-9 py-4";

  const text = (
    <div
      className={`flex flex-col ${
        preview
          ? "max-w-xl items-center text-center md:items-start md:text-left"
          : "max-w-4xl items-center text-center"
      }`}
    >
      {prompt ? (
        <p
          className={`deck-rise font-bold text-zinc-950 ${promptSize}`}
          style={{ animationDelay: "0.05s" }}
        >
          {prompt}
        </p>
      ) : null}
      <div
        className={`deck-cta-pulse ${headlinePad} max-w-full text-balance break-words text-center leading-[1.04] rounded-2xl bg-[var(--deck-accent)] font-extrabold tracking-tight text-white shadow-[0_18px_50px_-12px_rgba(253,72,105,0.6)] ${headlineSize}`}
        style={{ animationDelay: "0.15s" }}
      >
        {headline}
      </div>
      {sub ? (
        <p
          className={`deck-rise ${headingBase} ${subSize}`}
          style={{ animationDelay: "0.4s" }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );

  if (!preview) {
    return (
      <div className="flex h-full w-full items-center justify-center px-8 py-10">
        {text}
      </div>
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10 md:gap-14 md:px-16 ${
        previewSide === "left" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {text}
      <div
        className={
          previewPlain
            ? `deck-pop relative w-full ${
                previewLarge
                  ? "h-[min(72vh,40rem)] md:max-w-3xl md:flex-[1.2]"
                  : "h-[min(65vh,32rem)] max-w-xl"
              }`
            : `deck-pop relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.35)]${
                previewLarge ? " md:max-w-lg" : ""
              }`
        }
        style={{ animationDelay: "0.3s" }}
      >
        <Image
          src={preview}
          alt={previewAlt}
          fill
          priority
          sizes="(max-width: 768px) 90vw, 28rem"
          className="object-contain"
        />
      </div>
    </div>
  );
}
