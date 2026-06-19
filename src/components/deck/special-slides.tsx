import Image from "next/image";

import { deckType, headingBase } from "./deck-styles";
import { A, CoverSlide } from "./slide-parts";

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
        <text x="400" y="405" textAnchor="middle" fill="#9b3024" fontSize="30" fontWeight="800" fontFamily="var(--font-bricolage)">
          Doomporn
        </text>
        <text x="400" y="435" textAnchor="middle" fill="#9b3024" fontSize="18" fontStyle="italic" fontFamily="var(--font-bricolage)">
          Macro noise
        </text>
      </g>

      {/* Middle tier — Efficiency Theater */}
      <g className="deck-tier" style={{ animationDelay: "0.35s" }}>
        <polygon points="304.5,190 495.5,190 587.7,335 212.3,335" fill="#dccada" />
        <text x="400" y="258" textAnchor="middle" fill="#6b2d5c" fontSize="26" fontWeight="800" fontFamily="var(--font-bricolage)">
          AI-native Efficiency Theater
        </text>
        <text x="400" y="286" textAnchor="middle" fill="#6b2d5c" fontSize="17" fontStyle="italic" fontFamily="var(--font-bricolage)">
          Company noise
        </text>
      </g>

      {/* Top tier — Productivity Kabuki */}
      <g className="deck-tier" style={{ animationDelay: "0.55s" }}>
        <polygon points="400,40 495.5,190 304.5,190" fill="#f3e2bf" />
        <text x="400" y="135" textAnchor="middle" fill="#b5742a" fontSize="20" fontWeight="800" fontFamily="var(--font-bricolage)">
          AI Productivity Kabuki
        </text>
        <text x="400" y="160" textAnchor="middle" fill="#b5742a" fontSize="15" fontStyle="italic" fontFamily="var(--font-bricolage)">
          Individual noise
        </text>
      </g>
    </svg>
  );
}

/** Cover slide — title on top, pyramid below. */
export function PyramidSlide() {
  return (
    <CoverSlide
      title={
        <>
          The AI <A>Bullshit</A> Trinity
        </>
      }
      diagram={<PyramidSvg className="w-full max-w-3xl" />}
    />
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
}) {
  const text = (
    <div
      className={`flex flex-col ${
        preview
          ? "max-w-xl items-center text-center md:items-start md:text-left"
          : "max-w-4xl items-center text-center"
      }`}
    >
      <p
        className={`deck-rise font-bold text-zinc-950 ${deckType.statement}`}
        style={{ animationDelay: "0.05s" }}
      >
        {prompt}
      </p>
      <div
        className={`deck-cta-pulse my-5 rounded-2xl bg-[var(--deck-accent)] px-9 py-4 font-extrabold tracking-tight text-white shadow-[0_18px_50px_-12px_rgba(253,72,105,0.6)] ${deckType.display}`}
        style={{ animationDelay: "0.15s" }}
      >
        {headline}
      </div>
      {sub ? (
        <p
          className={`deck-rise ${headingBase} ${deckType.statement}`}
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-8 px-8 py-10 md:flex-row md:gap-14 md:px-16">
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
