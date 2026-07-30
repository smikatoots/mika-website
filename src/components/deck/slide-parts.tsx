import Image from "next/image";

import { deckType, headingBase } from "./deck-styles";

/** A salmon-highlighted run of words inside a text slide. */
export function HL({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span
      className="deck-accent deck-underline-word font-extrabold"
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}

/** Inline salmon accent for slide headers (no underline sweep — cleaner big). */
export function A({ children }: { children: React.ReactNode }) {
  return <span className="deck-accent">{children}</span>;
}

/**
 * Cover slide with three shapes:
 *  - title only        → big Display statement, centered
 *  - diagram only      → the diagram, centered
 *  - title + diagram   → title at the top, diagram below
 */
export function CoverSlide({
  title,
  diagram,
}: {
  title?: React.ReactNode;
  diagram?: React.ReactNode;
}) {
  if (title && diagram) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-8 py-12 sm:gap-5">
        <h1 className={`deck-rise text-center ${headingBase} ${deckType.statement}`}>
          {title}
        </h1>
        <div className="deck-fade flex w-full items-start justify-center">
          {diagram}
        </div>
      </div>
    );
  }
  if (title) {
    return (
      <div className="flex h-full w-full items-center justify-center px-8 text-center">
        <h1 className={`deck-rise max-w-6xl ${headingBase} ${deckType.display}`}>
          {title}
        </h1>
      </div>
    );
  }
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center px-8 py-12">
      {diagram}
    </div>
  );
}

/**
 * Big black-on-white statement slide. Optional `emoji` is the hero visual above
 * the headline; optional `number` is a big accent step marker. No sub-text or
 * kickers by design — the type scale only allows headline + meta.
 */
export function TextSlide({
  children,
  number,
  emoji,
  display,
}: {
  children: React.ReactNode;
  number?: string;
  emoji?: string;
  /** Use the larger Display size (for very short hero statements). */
  display?: boolean;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center sm:px-16">
      {emoji ? (
        <div
          className="deck-pop mb-8 w-full text-center text-8xl leading-none sm:text-[9rem]"
          style={{ animationDelay: "0.05s" }}
          aria-hidden
        >
          {emoji}
        </div>
      ) : null}
      {number ? (
        <div
          className={`deck-pop deck-accent mb-4 font-mono font-bold tracking-widest ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {number}
        </div>
      ) : null}
      <h1
        className={`deck-rise flex w-full max-w-6xl flex-col items-center text-center ${headingBase} ${display ? deckType.display : deckType.statement}`}
        style={{ animationDelay: "0.12s" }}
      >
        {children}
      </h1>
    </div>
  );
}

/**
 * A numbered "point" slide — big emoji, accent step number, and a headline.
 * Shared by the solution steps so they read as a matched set.
 */
export function PointSlide({
  number,
  emoji,
  children,
}: {
  /** Optional accent step marker. Omit for an emoji + headline point with no badge. */
  number?: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
      <div
        className="deck-pop mb-8 text-8xl leading-none sm:text-[9rem]"
        style={{ animationDelay: "0.05s" }}
        aria-hidden
      >
        {emoji}
      </div>
      <div
        className="deck-rise flex max-w-5xl flex-wrap items-baseline justify-center gap-x-5 gap-y-2"
        style={{ animationDelay: "0.18s" }}
      >
        {number ? (
          <span className={`deck-accent font-mono font-bold ${deckType.statement}`}>
            {number}
          </span>
        ) : null}
        <h1 className={`${headingBase} ${deckType.statement}`}>{children}</h1>
      </div>
    </div>
  );
}

/**
 * Image slide: an optional big header at the top, then the image below it.
 * `framed` constrains the image to a centered card — rounded corners + a soft
 * drop shadow (no border) lift it off the white slide (for screenshots /
 * portraits) while still filling most of the slide; otherwise it fills the
 * space edge-to-edge.
 */
export function ImageSlide({
  src,
  alt,
  caption,
  credit,
  framed,
  maxWidth,
}: {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  credit?: string;
  framed?: boolean;
  /** Cap the (unframed) image width — e.g. "max-w-sm" — and center it. Use for
   *  small / low-res images that would pixelate when stretched full-bleed. */
  maxWidth?: string;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      {caption ? (
        <h2
          className={`deck-rise mb-5 text-center sm:mb-7 ${headingBase} ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {caption}
        </h2>
      ) : null}
      <div
        className={
          framed
            ? "relative w-full max-w-4xl flex-1 overflow-hidden rounded-2xl bg-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
            : `relative w-full flex-1${maxWidth ? ` ${maxWidth} mx-auto` : ""}`
        }
      >
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-contain" />
      </div>
      {credit ? (
        <div className={`mt-3 text-center leading-tight ${deckType.meta}`}>{credit}</div>
      ) : null}
    </div>
  );
}

/**
 * Two images side by side (stacked on narrow screens) under a shared header —
 * to juxtapose a cause/effect or before/after.
 */
export function DualImageSlide({
  left,
  right,
  caption,
  compactCaption = false,
  balancedHeight = false,
  stacked = false,
  rightScale = 1,
}: {
  left: { src: string; alt: string };
  right: { src: string; alt: string };
  caption?: React.ReactNode;
  /** Tighter gap between caption and images. */
  compactCaption?: boolean;
  /** Fixed-height image wells so portraits align. */
  balancedHeight?: boolean;
  /** Stack images vertically and split the slide height evenly. */
  stacked?: boolean;
  /** Scale the right image down (e.g. 0.85) within its well. */
  rightScale?: number;
}) {
  const captionGap = compactCaption ? "gap-2 sm:gap-3" : "";
  const captionMargin = compactCaption ? "mb-0" : "mb-5 sm:mb-7";
  const imageRowClass = stacked
    ? "flex min-h-0 w-full flex-1 flex-col items-stretch justify-center gap-2 sm:gap-3"
    : balancedHeight
      ? "flex h-[min(82vh,56rem)] w-full flex-1 flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-6"
      : `flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8 ${
          compactCaption ? "max-h-[70vh]" : "flex-1"
        }`;
  const imageWell = stacked
    ? "relative min-h-0 w-full flex-1"
    : balancedHeight
      ? "relative min-h-0 w-full flex-1 sm:h-full"
      : "relative h-full w-full sm:flex-1";
  const imageSizes = stacked ? "100vw" : "50vw";

  return (
    <div
      className={`deck-fade flex h-full w-full flex-col items-center ${
        stacked
          ? "justify-stretch px-4 py-4 sm:px-6 sm:py-5"
          : "justify-center px-6 py-8 sm:px-10 sm:py-10"
      } ${captionGap}`}
    >
      {caption ? (
        <h2
          className={`deck-rise text-center ${captionMargin} ${headingBase} ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {caption}
        </h2>
      ) : null}
      <div className={imageRowClass}>
        <div className={imageWell}>
          <Image src={left.src} alt={left.alt} fill sizes={imageSizes} className="object-contain" />
        </div>
        <div className={imageWell}>
          {rightScale < 1 ? (
            <div
              className="relative mx-auto h-full w-full"
              style={{ transform: `scale(${rightScale})` }}
            >
              <Image src={right.src} alt={right.alt} fill sizes={imageSizes} className="object-contain" />
            </div>
          ) : (
            <Image src={right.src} alt={right.alt} fill sizes={imageSizes} className="object-contain" />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Progressive steps slide. The whole roadmap (1, 2, 3 … N) sits on the left and
 * the count is always visible, but each step's text is only revealed once it's
 * reached — earlier steps stay, upcoming ones are just a dimmed number. A
 * supporting visual (unique per step) fills the right. Render one of these per
 * step (incrementing `current`) so the list reveals as you talk.
 */
export function StepsSlide({
  steps,
  current,
  visual,
}: {
  steps: React.ReactNode[];
  current: number;
  visual?: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-8 py-12 md:flex-row md:gap-10 md:px-14">
      <div className="flex w-full justify-center md:w-auto md:flex-none md:justify-end">
        <ol className="flex flex-col justify-center gap-6">
          {steps.map((label, i) => {
          const reached = i <= current;
          const active = i === current;
          const done = i < current;
          return (
            <li
              key={i}
              className={`flex items-center gap-5 ${active ? "deck-rise" : ""}`}
              style={active ? { animationDelay: "0.1s" } : undefined}
            >
              <span
                className={`flex h-20 w-20 flex-none items-center justify-center rounded-full font-mono text-4xl font-bold sm:h-24 sm:w-24 sm:text-5xl ${
                  active
                    ? "bg-[var(--deck-accent)] text-white"
                    : done
                      ? "bg-zinc-900 text-white"
                      : "border-2 border-zinc-400 text-zinc-600"
                }`}
              >
                {i + 1}
              </span>
              {/* Always render the label to reserve a stable box width, so the
                  steps box doesn't shift as later (longer) steps reveal.
                  Sized just under `statement` so it reads nearly as big as
                  a Text + Image header. */}
              <span
                className={`whitespace-nowrap text-7xl font-extrabold leading-[1.05] tracking-tight text-zinc-950 sm:text-8xl ${
                  reached ? "" : "invisible"
                }`}
                aria-hidden={!reached}
              >
                {label}
              </span>
            </li>
          );
        })}
        </ol>
      </div>

      {visual ? (
        <div
          key={current}
          className="deck-pop relative flex w-full items-center justify-center md:w-[44rem] md:flex-none"
        >
          {visual}
        </div>
      ) : null}
    </div>
  );
}
