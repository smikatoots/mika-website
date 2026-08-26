/**
 * Slide-level configuration.
 *
 * Backgrounds, transitions, and auto-animate are reveal.js features that live
 * on the `<section>` element, which `Deck.tsx` owns — a template rendered
 * *inside* the section can't reach them. So a slide can be either:
 *
 *   - a `ReactNode`, the plain case, which is every deck built so far, or
 *   - a `DeckSlide` object, which carries section-level settings alongside its
 *     content.
 *
 * Both forms can be mixed freely in one `slides` array.
 */

/** How reveal.js moves between two slides. */
export type DeckTransition =
  | "none"
  | "fade"
  | "slide"
  | "convex"
  | "concave"
  | "zoom";

/**
 * A full-bleed slide background. Set exactly one source (`color`, `gradient`,
 * `image`, `video`, or `iframe`); the rest are modifiers.
 *
 * A background replaces the need for a layout: an image-only slide is better
 * expressed as a background than as an `ImageSlide`, because the image then
 * covers the whole canvas with no letterboxing and can cross-fade to the next.
 */
export type DeckBackground = {
  /** Any CSS color. */
  color?: string;
  /** Any CSS gradient, e.g. `linear-gradient(...)`. */
  gradient?: string;
  /** Image URL, e.g. `/decks/_library/thing.jpg`. */
  image?: string;
  /** Video URL, or several comma-separated. Muted and looped by default. */
  video?: string;
  /** Embeds a live web page behind the slide. */
  iframe?: string;

  /** `cover` (default), `contain`, or an explicit size. */
  size?: string;
  /** `center` (default) or any CSS background-position. */
  position?: string;
  /** 0–1. Dim a photo so type stays legible over it. */
  opacity?: number;
  /** Video only. Both default to true: a deck background should not surprise
   *  you with sound, and browsers block unmuted autoplay anyway. */
  loop?: boolean;
  muted?: boolean;
  /** Iframe only. Lets you click into the embedded page. */
  interactive?: boolean;

  /** How this background arrives. Overrides the deck-wide default. */
  transition?: DeckTransition;
};

export type DeckSlide = {
  content: React.ReactNode;
  background?: DeckBackground;
  /**
   * Morph matching elements from the previous slide instead of cutting to
   * this one. Set it on **both** slides of the pair. Elements are matched by
   * their text, or explicitly with a `data-id`.
   */
  autoAnimate?: boolean;
  /** How this slide arrives. Overrides the deck-wide default. */
  transition?: DeckTransition;
};

export type SlideInput = React.ReactNode | DeckSlide;

function isDeckSlide(slide: SlideInput): slide is DeckSlide {
  return (
    typeof slide === "object" &&
    slide !== null &&
    !Array.isArray(slide) &&
    "content" in slide
  );
}

/**
 * Turn a slide into the `<section>` attributes reveal.js reads, plus its
 * content. Everything reveal needs is a `data-*` attribute, so this is a
 * straight mapping with defaults applied.
 */
export function toSectionProps(slide: SlideInput): {
  content: React.ReactNode;
  attrs: Record<string, string>;
} {
  if (!isDeckSlide(slide)) return { content: slide, attrs: {} };

  const attrs: Record<string, string> = {};
  const { background: bg, autoAnimate, transition } = slide;

  if (autoAnimate) attrs["data-auto-animate"] = "";
  if (transition) attrs["data-transition"] = transition;

  if (bg) {
    if (bg.color) attrs["data-background-color"] = bg.color;
    if (bg.gradient) attrs["data-background-gradient"] = bg.gradient;
    if (bg.image) attrs["data-background-image"] = bg.image;
    if (bg.iframe) attrs["data-background-iframe"] = bg.iframe;

    if (bg.video) {
      attrs["data-background-video"] = bg.video;
      // Default to muted and looping. An unmuted autoplay is blocked by the
      // browser, and a background that plays once then freezes mid-frame is
      // worse than one that loops quietly under a retake.
      if (bg.muted !== false) attrs["data-background-video-muted"] = "";
      if (bg.loop !== false) attrs["data-background-video-loop"] = "";
    }

    if (bg.size) attrs["data-background-size"] = bg.size;
    if (bg.position) attrs["data-background-position"] = bg.position;
    if (bg.opacity !== undefined)
      attrs["data-background-opacity"] = String(bg.opacity);
    if (bg.interactive) attrs["data-background-interactive"] = "";
    if (bg.transition) attrs["data-background-transition"] = bg.transition;
  }

  return { content: slide.content, attrs };
}
