import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Mark Cuban: don't study computer science. Study this instead",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const SECONDARY = "#52525B";
const OUTLINE = "#E4E4E7";
const DECK_FONT = "var(--font-deck), system-ui, sans-serif";

/**
 * Slide 4 visual — a 2x2 split screen of the four Silicon Valley philosophy
 * majors. Image-only by design: the spoken line names each of them, so the
 * slide carries the faces and nothing else.
 */
function FourUpSlide({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  return (
    <div className="deck-fade grid h-full w-full grid-cols-2 grid-rows-2 gap-1 bg-white">
      {images.map((image) => (
        <div key={image.src} className="relative min-h-0 w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Slide 6 visual — a see-saw. Technical execution sits light and outlined on
 * the raised left arm; judgment sits heavy and coral on the lowered right arm,
 * so the tilt does the arguing instead of a sentence.
 *
 * Geometry is explicit: the beam runs (179,349) → (942,511), the fulcrum apex
 * sits on its midpoint (560.5, 430), and each weight is rotated 12° about its
 * own end point so it rests flush on the beam.
 */
function JudgmentOutweighsSvg() {
  return (
    <div className="deck-pop flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1120 640"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="A see-saw tipped down on the judgment side, outweighing technical execution on the raised side."
      >
        {/* Ground */}
        <line
          x1={420}
          y1={578}
          x2={700}
          y2={578}
          stroke={INK}
          strokeWidth={10}
          strokeLinecap="round"
        />

        {/* Fulcrum */}
        <path d="M560.5 430 L488 570 L633 570 Z" fill={INK} />

        {/* Beam */}
        <line
          x1={179}
          y1={349}
          x2={942}
          y2={511}
          stroke={INK}
          strokeWidth={18}
          strokeLinecap="round"
        />

        {/* Left weight — technical execution, raised and light */}
        <g transform="rotate(12 179 349)">
          <rect
            x={29}
            y={254}
            width={300}
            height={95}
            rx={16}
            fill="#FFFFFF"
            stroke={OUTLINE}
            strokeWidth={4}
          />
          <text
            x={179}
            y={301}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={48}
            fontWeight={800}
            letterSpacing="-0.02em"
            fill={SECONDARY}
          >
            EXECUTION
          </text>
        </g>

        {/* Right weight — judgment, lowered and heavy */}
        <g transform="rotate(12 942 511)">
          <rect
            x={802}
            y={371}
            width={280}
            height={140}
            rx={16}
            fill={ACCENT}
          />
          <text
            x={942}
            y={441}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={48}
            fontWeight={800}
            letterSpacing="-0.02em"
            fill="#FFFFFF"
          >
            JUDGMENT
          </text>
        </g>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — The billionaire Shark Tank shark Mark Cuban says that the skill that protects you in the age of AI isn't coding.
  <Fragment key="mark-cuban">
    <ImageSlide
      src={`${LIB}/mark-cuban.png`}
      alt="Mark Cuban seated on the Shark Tank set"
    />
    <Notes>
      The billionaire Shark Tank shark Mark Cuban says that the skill that
      protects you in the age of AI isn&apos;t coding.
    </Notes>
  </Fragment>,

  // 2 — His exact prediction, back in 2017: in ten years, a philosophy degree will be worth more than a programming degree.
  <Fragment key="cnbc-headline">
    <ImageSlide
      src={`${LIB}/mark-cuban-philosophy-cnbc-headline.png`}
      alt="CNBC headline: Mark Cuban says studying philosophy may soon be worth more than computer science — here's why"
      framed
    />
    <Notes>
      His exact prediction, back in 2017: in ten years, a philosophy degree will
      be worth more than a programming degree.
    </Notes>
  </Fragment>,

  // 3 — Everyone hears philosophy and they think "ah unemployable degree" but quite the contrary.
  <Fragment key="unemployable">
    <TextSlide>Philosophy = Unemployable degree?</TextSlide>
    <Notes>
      Everyone hears philosophy and they think &ldquo;ah unemployable
      degree&rdquo; but quite the contrary.
    </Notes>
  </Fragment>,

  // 4 — In fact, here are some of the most famous people in Silicon Valley that had a philosophy degree. Reid Hoffman, founder of LinkedIn, Stewart Butterfield, founder of Slack, Carly Fiorina, former CEO of Hewlett Packard, Paul Graham, the co-founder of Y Combinator.
  <Fragment key="philosophy-majors">
    <FourUpSlide
      images={[
        {
          src: `${LIB}/mark-cuban-philosophy-reid-hoffman.png`,
          alt: "Reid Hoffman, founder of LinkedIn",
        },
        {
          src: `${LIB}/mark-cuban-philosophy-stewart-butterfield.png`,
          alt: "Stewart Butterfield, founder of Slack",
        },
        {
          src: `${LIB}/mark-cuban-philosophy-carly-fiorina.png`,
          alt: "Carly Fiorina, former CEO of Hewlett Packard",
        },
        {
          src: `${LIB}/mark-cuban-philosophy-paul-graham.png`,
          alt: "Paul Graham, co-founder of Y Combinator",
        },
      ]}
    />
    <Notes>
      In fact, here are some of the most famous people in Silicon Valley that
      had a philosophy degree. Reid Hoffman, founder of LinkedIn, Stewart
      Butterfield, founder of Slack, Carly Fiorina, former CEO of Hewlett
      Packard, Paul Graham, the co-founder of Y Combinator.
    </Notes>
  </Fragment>,

  // 5 — I studied at a liberal arts school, and I still ended up running a payments startup with engineers. My job was deciding what we built and why, not writing the code, and turns out Mark Cuban argues that's the more important thing to focus on.
  <Fragment key="deciding-what">
    <TextSlide>Deciding WHAT to code</TextSlide>
    <Notes>
      I studied at a liberal arts school, and I still ended up running a
      payments startup with engineers. My job was deciding what we built and
      why, not writing the code, and turns out Mark Cuban argues that&apos;s the
      more important thing to focus on.
    </Notes>
  </Fragment>,

  // 6 — His argument is that philosophy, among other degrees teaches you how to argue about what's worth doing, helps you form strong opinions and build your own judgment, which outbids technical execution skills in the AI economy.
  <Fragment key="judgment-outweighs">
    <JudgmentOutweighsSvg />
    <Notes>
      His argument is that philosophy, among other degrees teaches you how to
      argue about what&apos;s worth doing, helps you form strong opinions and
      build your own judgment, which outbids technical execution skills in the
      AI economy.
    </Notes>
  </Fragment>,

  // 7 — Do you agree? Let me know what you think in the comments and follow to build a time-rich career & life on your own terms with AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Do you agree?"
      headline="FOLLOW"
      sub="for a time-rich career & life with AI."
    />
    <Notes>
      Do you agree? Let me know what you think in the comments and follow to
      build a time-rich career and life on your own terms with AI.
    </Notes>
  </Fragment>,
];

export default function MarkCubanPhilosophyDeckPage() {
  return <Deck slides={slides} />;
}
