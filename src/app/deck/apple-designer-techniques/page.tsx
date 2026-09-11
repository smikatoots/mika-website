import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import {
  BuildStatementSlide,
  Notes,
  StepsBuildSlide,
} from "@/components/deck/reveal-parts";
import { CoverSlide, HL, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "The Apple designer's 8 AI techniques",
};

const LIB = "/decks/_library";

/** Framed-media treatment from DESIGN.md: 1rem radius, the lift shadow, no
 *  decorative stroke. Shared by every visual in the techniques build. */
const FRAME = "rounded-2xl bg-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]";

/**
 * One screenshot sized to fit a `StepsBuildSlide` visual slot.
 *
 * The Lenny's shots run from 16:9 to a 3:1 band, so the frame hugs the image
 * rather than fixing an aspect ratio and letterboxing whatever doesn't match.
 * The cap is an explicit rem value, not `max-h-full`: a percentage max-height
 * resolves to nothing inside a shrink-to-fit chain, and the visual then
 * overflows the `r-stack` cell where the next step's white cover can't reach it.
 */
function StepVisual({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-auto max-h-[32rem] w-auto max-w-full ${FRAME}`}
      />
    </div>
  );
}

/**
 * Two shots stacked for the one step whose whole point is the contrast — four
 * near-identical pages above, four radically different ones below. Side by side
 * would halve each grid's width; stacked keeps them wide enough to read as
 * "same" vs "different" in the few seconds the step is on screen. No Before /
 * After labels: at `meta` size they would not survive a phone-sized playback,
 * and this system keeps `meta` off anything carrying the message.
 */
function StepVisualPair({
  before,
  after,
}: {
  before: { src: string; alt: string; width: number; height: number };
  after: { src: string; alt: string; width: number; height: number };
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      {[before, after].map((shot) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          className={`h-auto max-h-[15.5rem] w-auto max-w-full ${FRAME}`}
        />
      ))}
    </div>
  );
}

/**
 * The Apple mark, sized to the tallest it will go.
 *
 * Not a `background` image despite being the slide's only content: the
 * DESIGN.md rule that an image-only slide should be a background exists so
 * photographs fill the canvas edge to edge, and `cover` would crop a logo.
 * A mark needs its own silhouette intact and air around it, so it runs as a
 * `CoverSlide` diagram on the plain white ground instead.
 */
function AppleMark() {
  return (
    <Image
      src={`${LIB}/apple-logo.svg`}
      alt="Apple"
      width={814}
      height={1000}
      priority
      className="h-auto max-h-[60vh] w-auto"
    />
  );
}

const slides: React.ReactNode[] = [
  // 1 — Cold open on the Apple mark, before the tweet names him.
  <Fragment key="apple-mark">
    <CoverSlide diagram={<AppleMark />} />
    <Notes>Cold open — hold on the mark, then cut to the tweet.</Notes>
  </Fragment>,

  // 2 — This designer from Apple says most people are seeing just 1% of what AI can create.
  <Fragment key="tim-ferriss-tweet">
    <ImageSlide
      src={`${LIB}/apple-motion-designer-techniques-tim-ferriss-tweet.png`}
      alt="A Tim Ferriss tweet about Anshu, who led software engineering and design teams at Apple for 12 years, sharing techniques for getting more out of AI"
    />
    <Notes>
      This designer from Apple says most people are seeing just 1% of what AI
      can create. Instead, he has eight techniques designed to break AI out of
      safe, predictable mode. Tim Ferriss said these tips were the #1 link
      clicked on his newsletter.
    </Notes>
  </Fragment>,

  // 3 — AI models predict what typically comes next. Great design bends the rules.
  <Fragment key="opposite">
    <BuildStatementSlide
      setup="AI predicts what typically comes next."
      payoff={
        <>
          Great design does the <HL>opposite</HL>.
        </>
      }
    />
    <Notes>
      AI models predict what typically comes next. Great design bends the rules
      and makes memorable, unexpected choices. So the trick is to learn how to
      prompt it to bend the rules. Here are his techniques in rapid fire and at
      the end I&apos;ll tell you how you can dive deeper into each one.
    </Notes>
  </Fragment>,

  // 4 — The eight techniques, rapid fire. Each step carries the actual
  //     screenshot from the Lenny's Newsletter piece, so the claim and the
  //     evidence land together. Techniques 7 and 8 sit behind the paywall and
  //     have no shot of their own: 7 reuses the purple-gradient grid (the
  //     sameness IS the canonical AI tell) and 8 runs on a mark, not a
  //     fabricated screenshot.
  <Fragment key="eight-techniques">
    <StepsBuildSlide
      steps={[
        "Seed strings for variety",
        "Be far more ambitious",
        "Subagent feedback loops",
        "Image generation",
        "Video generation",
        "Cut what adds nothing",
        "Remove AI tells",
        "Rewrite copy by hand",
      ]}
      visuals={[
        <StepVisualPair
          key="seed"
          before={{
            src: `${LIB}/apple-motion-designer-seed-before.jpg`,
            alt: "Four AI-generated landing pages that all look the same: white cards, the same layout, the same purple gradient",
            width: 1456,
            height: 894,
          }}
          after={{
            src: `${LIB}/apple-motion-designer-seed-after.jpg`,
            alt: "Four AI-generated landing pages built with random seed strings, each in a completely different visual style: cream editorial, dark terminal, neon grid, and oversized sans",
            width: 1456,
            height: 876,
          }}
        />,
        <StepVisual
          key="ambitious"
          src={`${LIB}/apple-motion-designer-ambitious.jpg`}
          alt="A landing page from an ambitious prompt: an isometric 3D city rendered over a dark ground, headlined 'The city goes quiet at your door.'"
          width={640}
          height={360}
        />,
        <StepVisual
          key="subagents"
          src={`${LIB}/apple-motion-designer-subagents-pair.jpg`}
          alt="Before and after a subagent critique loop: a plain editorial landing page becomes a full almanac masthead with a dial and a day ledger"
          width={1456}
          height={480}
        />,
        <StepVisual
          key="image-gen"
          src={`${LIB}/apple-motion-designer-image-gen.jpg`}
          alt="The same almanac landing page before and after generated imagery: a flat cream page, then the same page over a generated mountain-at-dawn photograph"
          width={1456}
          height={399}
        />,
        <StepVisual
          key="video-gen"
          src={`${LIB}/apple-motion-designer-video-gen.jpg`}
          alt="A product page for a suitcase with a generated video of it opening, headlined 'Open in one clean motion.'"
          width={960}
          height={540}
        />,
        <StepVisual
          key="cut"
          src={`${LIB}/apple-motion-designer-cut-after.jpg`}
          alt="Two phone screens of a food journalling app after the clutter was cut: no macro chips, no progress bar, just the day's total and the food itself"
          width={1456}
          height={964}
        />,
        // No shot of its own — the AI-tells section is behind the Lenny's
        // paywall. The seed "before" grid is reused on purpose: four unrelated
        // products rendering the same purple gradient is the tell.
        <StepVisual
          key="ai-tells"
          src={`${LIB}/apple-motion-designer-seed-before.jpg`}
          alt="Four unrelated AI-generated products that all render the same purple gradient, the same card layout, and the same headline shape"
          width={1456}
          height={894}
        />,
        // Nothing from the article to show here, and a fabricated screenshot
        // would be worse than a mark. The pen carries the beat.
        <div
          key="rewrite-by-hand"
          className="flex h-full w-full items-center justify-center text-[16rem] leading-none"
          role="img"
          aria-label="Writing by hand"
        >
          ✍️
        </div>,
      ]}
    />
    <Notes>
      One. Use random seed strings to inject variety. Two. Be much more
      ambitious with your prompts. Three. Create positive feedback loops with
      subagents and don&apos;t take the first suggestion as gold. Four. Use
      image generation to enrich designs. Five. Use video generation as well.
      Six. Cut elements that don&apos;t add value. Seven. Remove AI tells.
      Eight. Rewrite copy by hand.
    </Notes>
  </Fragment>,

  // 5 — Comment MIKA for the full guide.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for the full guide"
      preview={`${LIB}/ai-guides-preview.png`}
      previewAlt="A preview of the AI guides on mikareyes.com"
    />
    <Notes>Comment MIKA for the full guide.</Notes>
  </Fragment>,
];

export default function Page() {
  return <Deck slides={slides} />;
}
