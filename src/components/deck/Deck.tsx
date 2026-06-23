"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type DeckProps = {
  slides: React.ReactNode[];
};

/**
 * Full-screen, keyboard- and click-navigable presentation deck.
 * One slide is shown at a time. The slide stage is remounted with a fresh
 * `key` on every change so the entrance animations replay.
 */
/** Read the `?slide=` query param (1-based) as a 0-based index. */
function slideParamToIndex(total: number): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("slide");
  if (raw === null) return null;
  const n = Number.parseInt(raw, 10);
  if (Number.isNaN(n)) return null;
  return Math.min(Math.max(n - 1, 0), total - 1);
}

export function Deck({ slides }: DeckProps) {
  const total = slides.length;
  // Initialize from the URL so a deep link like `?slide=3` opens on that slide.
  const [index, setIndex] = useState(() => slideParamToIndex(total) ?? 0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex((current) => {
        const target = current + next;
        if (target < 0 || target > total - 1) return current;
        return target;
      });
    },
    [total],
  );

  const goTo = useCallback((target: number) => setIndex(target), []);

  // Keep the URL in sync with the current slide (1-based), without scrolling or
  // pushing history entries — each slide is reachable/shareable as `?slide=N`.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("slide", String(index + 1));
    window.history.replaceState(window.history.state, "", url);
  }, [index]);

  // Sync when the user navigates with the browser back/forward buttons.
  useEffect(() => {
    const onPop = () => {
      const fromUrl = slideParamToIndex(total);
      if (fromUrl !== null) setIndex(fromUrl);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [total]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Home") {
        goTo(0);
      } else if (event.key === "End") {
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goTo, total]);

  const atStart = index === 0;
  const atEnd = index === total - 1;

  return (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {/* Slide stage */}
      <div
        key={index}
        className="flex h-full w-full items-center justify-center"
      >
        {slides[index]}
      </div>

      {/* Click zones for advancing without aiming at the arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        disabled={atStart}
        className="absolute left-0 top-0 h-full w-[18%] cursor-w-resize disabled:cursor-default"
      />
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        disabled={atEnd}
        className="absolute right-0 top-0 h-full w-[18%] cursor-e-resize disabled:cursor-default"
      />

      {/* Arrow controls + slide counter, stacked at the bottom center */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex flex-col items-center gap-2">
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          disabled={atStart}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm backdrop-blur transition hover:border-[var(--deck-accent)] hover:text-[var(--deck-accent)] disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:text-zinc-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Progress dots */}
        <div className="pointer-events-auto flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-2 rounded-full transition-all"
              style={{
                width: i === index ? 22 : 8,
                background: i === index ? "var(--deck-accent)" : "#d4d4d8",
              }}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          disabled={atEnd}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 shadow-sm backdrop-blur transition hover:border-[var(--deck-accent)] hover:text-[var(--deck-accent)] disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:text-zinc-700"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

        {/* Slide counter — directly below the indicators so you can see
            which slide you're on and how many there are. */}
        <div className="font-mono text-xs tracking-wide text-zinc-400">
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}
