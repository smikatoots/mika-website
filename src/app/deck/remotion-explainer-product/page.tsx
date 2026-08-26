import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, ImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Remotion Explainer Video — Explain a New Product",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const MUTED = "#71717A";
const MUTED_LINE = "#E4E4E7";
const FONT = "var(--font-deck), var(--font-bricolage), system-ui, sans-serif";

function SvgFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-2">
      {children}
    </div>
  );
}
/**
 * Slide 4 — you give it one thing. A browser URL bar on top, an arrow down,
 * and a coral play-triangle badge underneath: link in, video out.
 */
function LinkToVideoSvg() {
  return (
    <SvgFrame>
      <svg
        viewBox="0 0 1120 620"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={FONT}
      >
        {/* URL bar */}
        <g className="deck-rise">
          <rect
            x={110}
            y={70}
            width={900}
            height={132}
            rx={66}
            fill="#FFFFFF"
            stroke={INK}
            strokeWidth={5}
          />
          {/* padlock glyph */}
          <rect
            x={176}
            y={130}
            width={44}
            height={34}
            rx={8}
            fill={MUTED}
          />
          <path
            d="M186 130 v-14 a12 12 0 0 1 24 0 v14"
            fill="none"
            stroke={MUTED}
            strokeWidth={8}
            strokeLinecap="round"
          />
          <text
            x={264}
            y={153}
            fill={INK}
            fontSize={54}
            fontWeight={700}
            letterSpacing="-0.02em"
          >
            https://your-product.com
          </text>
        </g>

        {/* Arrow down */}
        <g className="deck-pop" style={{ animationDelay: "0.3s" }}>
          <line
            x1={560}
            y1={232}
            x2={560}
            y2={312}
            stroke={INK}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <polygon points="542,312 560,348 578,312" fill={INK} />
        </g>

        {/* Play badge */}
        <g className="deck-rise" style={{ animationDelay: "0.46s" }}>
          <rect
            x={400}
            y={376}
            width={320}
            height={196}
            rx={40}
            fill={ACCENT}
          />
          <polygon points="530,438 616,474 530,510" fill="#FFFFFF" />
        </g>
      </svg>
    </SvgFrame>
  );
}

/**
 * Slide 7 — everything after is taste. Two labelled sliders (animation speed,
 * font size) over a coral refresh loop: nudge the dials, re-render in minutes.
 */
function TasteDialsSvg() {
  const sliders = [
    { label: "ANIMATION SPEED", y: 110, knob: 700 },
    { label: "FONT SIZE", y: 300, knob: 880 },
  ];

  return (
    <SvgFrame>
      <svg
        viewBox="0 0 1120 470"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={FONT}
      >
        {sliders.map((slider, index) => (
          <g
            key={slider.label}
            className="deck-rise"
            style={{ animationDelay: `${0.1 + index * 0.16}s` }}
          >
            <text
              x={120}
              y={slider.y}
              fill={MUTED}
              fontSize={34}
              fontWeight={700}
              letterSpacing="0.14em"
            >
              {slider.label}
            </text>
            <line
              x1={120}
              y1={slider.y + 66}
              x2={1000}
              y2={slider.y + 66}
              stroke={MUTED_LINE}
              strokeWidth={20}
              strokeLinecap="round"
            />
            <line
              x1={120}
              y1={slider.y + 66}
              x2={slider.knob}
              y2={slider.y + 66}
              stroke={INK}
              strokeWidth={20}
              strokeLinecap="round"
            />
            <circle
              cx={slider.knob}
              cy={slider.y + 66}
              r={38}
              fill="#FFFFFF"
              stroke={INK}
              strokeWidth={10}
            />
          </g>
        ))}
      </svg>
    </SvgFrame>
  );
}

/**
 * Slide 8 — three versions in an afternoon. Two muted cards fanned behind a
 * coral front card carrying the checkmark: build them all, pick the winner.
 */
function FannedStoryCardsSvg() {
  const backs = [
    { x: 250, y: 150, rotate: -13, label: "V1" },
    { x: 435, y: 128, rotate: -6, label: "V2" },
  ];

  return (
    <SvgFrame>
      <svg
        viewBox="0 0 1120 620"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={FONT}
      >
        {backs.map((card, index) => (
          <g
            key={card.label}
            className="deck-cycle-rise"
            style={{ animationDelay: `${0.08 + index * 0.14}s` }}
          >
          <g
            transform={`rotate(${card.rotate} ${card.x + 155} ${card.y + 190})`}
          >
            <rect
              x={card.x}
              y={card.y}
              width={310}
              height={380}
              rx={30}
              fill="#FFFFFF"
              stroke={MUTED_LINE}
              strokeWidth={5}
            />
            <text
              x={card.x + 155}
              y={card.y + 218}
              textAnchor="middle"
              fill={MUTED}
              fontSize={92}
              fontWeight={800}
              letterSpacing="-0.03em"
            >
              {card.label}
            </text>
          </g>
          </g>
        ))}

        {/* The winner */}
        <g className="deck-cycle-pop" style={{ animationDelay: "0.4s" }}>
        <g transform="rotate(5 795 300)">
          <rect
            x={640}
            y={110}
            width={310}
            height={380}
            rx={30}
            fill={ACCENT}
          />
          <text
            x={795}
            y={268}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize={92}
            fontWeight={800}
            letterSpacing="-0.03em"
          >
            V3
          </text>
          <polyline
            points="740,352 782,394 858,318"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={22}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        </g>
      </svg>
    </SvgFrame>
  );
}

/**
 * A single full-bleed video, autoplaying on loop and muted so it starts without
 * interaction. Mirrors ImageSlide's unframed layout — next/image can't render
 * an mp4, so the deck needs its own element here.
 */
function VideoSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <div className="relative flex w-full flex-1 items-center justify-center">
        <video
          src={src}
          aria-label={alt}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — If you've ever waited three weeks for a product demo video, there's a Claude plugin that renders the whole thing in five minutes.
  <Fragment key="weeks-to-minutes">
    <VideoSlide
      src={`${LIB}/granola-meetings-explainer-4x.mp4`}
      alt="The generated Granola explainer video playing"
    />
    <Notes>
      If you&apos;ve ever waited three weeks for a product demo video,
      there&apos;s a Claude plugin that renders the whole thing in five minutes.
    </Notes>
  </Fragment>,

  // 2 — Every time we launched something, the choice was paying a motion designer four thousand dollars or waiting weeks for one video.
  <Fragment key="salary-band">
    <ImageSlide
      src={`${LIB}/remotion-explainer-product-motion-designer-salary-band.png`}
      alt="US motion designer pay bands: $5,300 to $7,200 per month on average, broken down by junior, mid-level, and senior"
    />
    <Notes>
      I wish I&apos;d had this at my first startup. Every time we launched
      something, the choice was paying a motion designer four thousand dollars
      or waiting weeks for one video.
    </Notes>
  </Fragment>,

  // 3 — So first I added the Remotion plugin inside Codex but you can use Claude Code too.
  <Fragment key="install-screens">
    <DualImageSlide
      left={{
        src: `${LIB}/remotion-explainer-product-codex-plugin-install.png`,
        alt: "The Codex plugins screen with 'remotion' searched and an Install button next to the Remotion plugin",
      }}
      right={{
        src: `${LIB}/remotion-explainer-product-claude-code-plugin-install.png`,
        alt: "The Claude Code plugin directory showing the Remotion plugin ready to add",
      }}
    />
    <Notes>
      So first I added the Remotion plugin inside Codex but you can use Claude
      Code too.
    </Notes>
  </Fragment>,

  // 4 — Then I gave it one thing just a website link! It can also be your blog link where you announce your product, with product screenshots.
  <Fragment key="link-to-video">
    <LinkToVideoSvg />
    <Notes>
      Then I gave it one thing just a website link! It can also be your blog
      link where you announce your product, with product screenshots.
    </Notes>
  </Fragment>,

  // 5 — I used Granola's website, which is my AI meeting notetaker as an example.
  <Fragment key="typed-prompt">
    <ImageSlide
      src={`${LIB}/remotion-explainer-product-typed-prompt.png`}
      alt="The Remotion prompt typed into Codex, asking for a video explaining Granola for older folks new to AI"
    />
    <Notes>
      I used Granola&apos;s website, which is my AI meeting notetaker as an
      example.
    </Notes>
  </Fragment>,

  // 6 — It scrapes the website link and animates the entire explainer in five minutes. It'll run for a bit so let 'em cook!
  <Fragment key="render-result">
    <ImageSlide
      src={`${LIB}/remotion-explainer-product-render-result.png`}
      alt="Remotion's result after six minutes: a rendered 52-second, 720p Granola explainer video with the files it edited"
    />
    <Notes>
      It scrapes the website link and animates the entire explainer in five
      minutes. It&apos;ll run for a bit so let &apos;em cook!
    </Notes>
  </Fragment>,

  // 7 — Everything after that is taste. You can ask for slower animations and bigger fonts, and it re-renders in minutes.
  <Fragment key="taste-dials">
    <TasteDialsSvg />
    <Notes>
      Everything after that is taste. You can ask for slower animations and
      bigger fonts, and it re-renders in minutes.
    </Notes>
  </Fragment>,

  // 8 — So instead of one video you waited a month for, you can build three versions of your story in an afternoon and pick the one that works best.
  <Fragment key="story-versions">
    <FannedStoryCardsSvg />
    <Notes>
      So instead of one video you waited a month for, you can build three
      versions of your story in an afternoon and pick the one that works best.
    </Notes>
  </Fragment>,

  // 9 — Comment MIKA for my step by step guide and tell me what you'd use this for!
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for the step-by-step guide."
    />
    <Notes>
      Comment MIKA for my step by step guide and tell me what you&apos;d use
      this for!
    </Notes>
  </Fragment>,
];

export default function Page() {
  return <Deck slides={slides} />;
}
