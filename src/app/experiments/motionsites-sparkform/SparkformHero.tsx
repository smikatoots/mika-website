"use client";

import { useEffect, useRef, useState } from "react";

const TITLE = "TIME-RICH";

/**
 * The stripes stacked behind the display word, rendered back → front and
 * pushed down by `offset` px so they peek out from under the letters. The
 * middle one is painted in the ground colour on purpose: it cuts the stripe in
 * two rather than adding a third band. Purely decorative — the readable word is
 * the white `<h1>` these sit behind.
 */
const TITLE_STRIPES = [
  { color: "var(--sf-ink)", offset: 36 },
  { color: "var(--sf-ground)", offset: 24 },
  { color: "var(--sf-coral)", offset: 12 },
] as const;

/**
 * Source is lowercase; the columns uppercase it in CSS.
 *
 * The two columns stage the brand's synthesizing phrase — "ambition and freedom
 * were never the trade you were told they were" — with the figure standing
 * between them. Left is the old chain ambition used to drag behind it, right is
 * what it drags now. Naming the grind is not endorsing it: see BRAND.md >
 * Anti-References, which rejects hustle aesthetics and suffering-as-virtue.
 *
 * Eight characters is the ceiling at this type size; past that a word runs far
 * enough under the figure to stop being readable.
 */
const LEFT_WORDS = ["ambition", "burnout", "hustle", "grind"];
const RIGHT_WORDS = ["agents", "systems", "freedom", "thrive"];

const MOBILE_BREAKPOINT = 768;

/**
 * Horizontal start offset for word `index`, in px, before the scroll-driven
 * slide inward. Desktop: 60 / 100 / 140 / 180. Mobile halves every value.
 */
function startOffset(index: number, scaleFactor: number): number {
  return (60 + index * 40) * scaleFactor;
}

export function SparkformHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;

      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

      const rect = section.getBoundingClientRect();
      // The sticky child is one viewport tall inside a 120vh section, so the
      // pinned range is the 20vh of travel the section has left over.
      const range = section.offsetHeight - window.innerHeight;
      if (range <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(1, Math.max(0, -rect.top / range)));
    };

    // Coalesce bursts of scroll events into one measurement per frame.
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Mobile halves both the word travel and the stripe offsets.
  const scaleFactor = isMobile ? 0.5 : 1;
  // Words start far apart and dim, then slide in and resolve as you scroll.
  const wordOpacity = 0.35 + progress * 0.65;
  const slide = 1 - progress;

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "120vh", backgroundColor: "var(--sf-ground)" }}
    >
      {/* ── Sticky typography (behind the figure) ─────────────────────────── */}
      {/* `overflow-hidden` lives on the sticky box itself, never on an ancestor
          of it: an ancestor would make the pin stick to that box instead of the
          viewport. Once pinned this box IS the viewport, so clipping here cuts
          the outward-slid words and the `bottom: -8vh` overhang exactly where
          the screen edge is. */}
      <div className="sticky top-0 z-[5] h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex items-start justify-center pt-[2vh] md:pt-[3vh]">
          {/* Nine characters rather than the reference's six, so the
              viewport-width step is 19vw instead of 30vw to keep the word on
              one line. The floor is tuned to fill a 375px phone edge to edge. */}
          <div
            className="relative select-none"
            style={{ fontSize: "clamp(5rem, 19vw, 17rem)" }}
          >
            {TITLE_STRIPES.map((stripe) => (
              <span
                key={stripe.color}
                aria-hidden
                className="sparkform-title absolute inset-0 block"
                style={{
                  color: stripe.color,
                  transform: `translateY(${stripe.offset * scaleFactor}px)`,
                }}
              >
                {TITLE}
              </span>
            ))}
            {/* In flow, so it is what gives the stack its box. */}
            <h1
              className="sparkform-title relative"
              style={{ color: "var(--sf-white)" }}
            >
              {TITLE}
            </h1>
          </div>
        </div>

        {/* ── Side word columns ──────────────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 flex items-end justify-between px-[3vw] md:px-[6vw]"
          style={{ bottom: "-8vh" }}
        >
          <div className="flex flex-col gap-1 md:gap-2">
            {LEFT_WORDS.map((word, index) => (
              <span
                key={word}
                className="sparkform-word select-none uppercase text-white/80"
                style={{
                  fontSize: "clamp(1.6rem, 7vw, 9rem)",
                  opacity: wordOpacity,
                  transform: `translateX(${-startOffset(index, scaleFactor) * slide}px)`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-end gap-1 md:gap-2">
            {RIGHT_WORDS.map((word, index) => (
              <span
                key={word}
                className="sparkform-word select-none text-right uppercase text-white/80"
                style={{
                  fontSize: "clamp(1.6rem, 7vw, 9rem)",
                  opacity: wordOpacity,
                  transform: `translateX(${startOffset(index, scaleFactor) * slide}px)`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── The figure, in front of the title ──────────────────────────────── */}
      {/* Sibling of the sticky box, so its clipping cannot affect the pin. The
          figure is taller than the section and bottom-anchored, so this keeps
          its overhang from spilling onto the marquee below. */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/experiments/mika-cutout.webp"
          alt="Mika Reyes"
          className="sparkform-figure absolute bottom-0 left-1/2 block w-auto max-w-none -translate-x-1/2"
        />
      </div>
    </section>
  );
}
