"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Text scaled to the widest it can be without overflowing its slide.
 *
 * reveal.js ships an `r-fit-text` class for this, but it only runs from its
 * content-load and print paths, which don't fire for statically-rendered React
 * slides — the class lands in the DOM and nothing ever measures it. So the fit
 * is done here instead. The behaviour and the bounds match reveal's own
 * (`minSize: 24`, `maxSize: canvas height * 0.8`).
 *
 * This makes the locked type scale a **ceiling rather than a fixed size**: a
 * short line goes as large as the slide allows, a long one settles smaller, and
 * neither can clip. Use it where the copy length varies; use `TextSlide` when
 * you want every slide in a run to share one size.
 *
 * **One line only** — fitting requires `nowrap`, so this cannot wrap. For two
 * lines, stack two of these.
 */
export function FitText({
  children,
  className = "",
  min = 24,
  max = 648,
}: {
  children: React.ReactNode;
  className?: string;
  /** Floor, in px on the 1440x810 canvas. */
  min?: number;
  /** Ceiling, in px. Defaults to reveal's own: 80% of canvas height. */
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const fit = useCallback(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const available = parent.clientWidth;
    if (available === 0) return; // Slide isn't laid out yet.

    // Width scales linearly with font-size for a single unwrapped line, so
    // measuring once at a known size gives the ratio directly. A second pass
    // absorbs any rounding from the first.
    for (let pass = 0; pass < 2; pass += 1) {
      const current = Number.parseFloat(getComputedStyle(el).fontSize) || 100;
      const natural = el.scrollWidth;
      if (natural === 0) return;
      const next = Math.min(max, Math.max(min, (available / natural) * current));
      el.style.fontSize = `${next}px`;
    }
  }, [min, max]);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    // Seed a known size so the first measurement has something to scale from.
    el.style.fontSize = "100px";
    fit();

    // The parent goes from zero-width to full width when reveal shows the
    // slide, which is the moment the text can finally be measured. Observing
    // the box catches that, plus any window resize, without coupling to
    // reveal's own event names.
    const observer = new ResizeObserver(fit);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [fit]);

  return (
    // `inline-block`, not `block`: a block span stretches to its container, so
    // `scrollWidth` would report the container's width instead of the text's
    // natural width and the ratio would always come out as 1.
    <span
      ref={ref}
      className={`inline-block whitespace-nowrap ${className}`.trim()}
    >
      {children}
    </span>
  );
}
