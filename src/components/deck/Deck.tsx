"use client";

import { useEffect, useRef } from "react";

import { toSectionProps, type SlideInput } from "./deck-slide";

type DeckProps = {
  /**
   * Each entry is either plain content, or a `DeckSlide` object carrying
   * section-level settings — background, transition, auto-animate. The two
   * forms mix freely; see `deck-slide.ts`.
   */
  slides: SlideInput[];
  /**
   * The logical canvas every slide is designed against. Reveal scales this to
   * fit whatever window it's in, so a slide looks identical at any size and can
   * never clip.
   *
   * 1440x810 is deliberate: it matches the viewport these decks were designed
   * on, so the locked type scale keeps the exact proportions it already had.
   * Raising it would shrink every headline relative to the frame. 16:9, which
   * is what gets recorded.
   */
  width?: number;
  height?: number;
};

/** The slice of the Reveal API this component holds onto. */
type RevealDeck = { destroy: () => void };

/**
 * Full-screen presentation deck, powered by reveal.js.
 *
 * Reveal owns the slide DOM once it initializes, so this component renders the
 * required `.reveal > .slides > section` markup and hands it over. Slides are
 * static content, which is the easy case: nothing re-renders underneath Reveal
 * after mount.
 *
 * What Reveal gives us that the previous hand-rolled shell did not:
 *  - **Speaker notes** — `S` opens a second window with notes, the next slide,
 *    and a timer. Add them with `<aside className="notes">…</aside>`.
 *  - **Fragments** — reveal parts of one slide in sequence instead of
 *    duplicating a whole slide per step.
 *  - **Overview** — `Esc` shows every slide at once.
 *  - **Scaling** — slides live on a fixed canvas and are scaled to fit, so a
 *    long line can no longer overflow the window.
 *  - **PDF export** — append `?print-pdf` to the URL and print.
 *
 * Navigation: arrows, space, `Esc` overview, `S` notes, `F` fullscreen, `.`
 * pause. The current slide lives in the URL hash (`#/3`).
 */
export function Deck({ slides, width = 1440, height = 810 }: DeckProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<RevealDeck | null>(null);

  useEffect(() => {
    let cancelled = false;

    // reveal.js and its plugins touch `document` at module scope, so importing
    // them at the top of the file crashes the server render. Loading them here
    // keeps them out of the server bundle entirely.
    void (async () => {
      const [{ default: Reveal }, { default: RevealNotes }, { default: RevealZoom }] =
        await Promise.all([
          import("reveal.js"),
          import("reveal.js/plugin/notes"),
          import("reveal.js/plugin/zoom"),
        ]);

      const root = rootRef.current;
      if (cancelled || !root || deckRef.current) return;

      const deck = new Reveal(root, {
        width,
        height,
        // The templates fill the slide themselves and are full-bleed by design,
        // so Reveal must not reserve a margin around them.
        margin: 0,
        minScale: 0.2,
        maxScale: 4,
        // Slides handle their own vertical centering with flexbox. Letting
        // Reveal center them as well fights the templates.
        center: false,
        hash: true,
        controls: true,
        controlsTutorial: false,
        progress: true,
        slideNumber: "c/t",
        transition: "slide",
        transitionSpeed: "fast",
        backgroundTransition: "fade",
        overview: true,
        touch: true,
        plugins: [RevealNotes, RevealZoom],
      });

      deckRef.current = deck as RevealDeck;
      await deck.initialize();

      // Replay the `deck-*` entrance animations each time a slide is reached.
      // Without this they run once at load, while every slide is still hidden,
      // so navigating to slide 6 would show it already settled. Filming means
      // stepping back and forth over the same slide, and a retake has to look
      // identical to the take before it.
      const replayEntrance = (slide?: Element | null) => {
        if (!(slide instanceof HTMLElement)) return;
        slide.classList.add("deck-replay");
        // Reading a layout property forces the style change to flush, which is
        // what actually restarts the animations.
        void slide.offsetHeight;
        slide.classList.remove("deck-replay");
      };

      deck.on("slidechanged", (event) => {
        replayEntrance((event as { currentSlide?: Element }).currentSlide);
      });
    })();

    return () => {
      cancelled = true;
      try {
        deckRef.current?.destroy();
      } catch {
        // Reveal throws if it never finished initializing. Nothing to clean up.
      }
      deckRef.current = null;
    };
  }, [width, height]);

  return (
    <div className="reveal" ref={rootRef}>
      <div className="slides">
        {slides.map((slide, index) => {
          const { content, attrs } = toSectionProps(slide);
          return (
            <section key={index} {...attrs}>
              {content}
            </section>
          );
        })}
      </div>
    </div>
  );
}
