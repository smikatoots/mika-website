import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "I use a /watch-video skill to watch videos for me",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const SECONDARY = "#52525B";
const OUTLINE = "#E4E4E7";
const SURFACE = "#EFEFF1";
const DECK_FONT = "var(--font-deck), system-ui, sans-serif";

/** Full-bleed wrapper for the two custom SVG slides. */
function DiagramSlide({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------- */

const GRID_COLS = [48, 390, 732, 1074];
const GRID_ROWS = [40, 291, 542];
const CARD_W = 318;
const THUMB_H = 179;

const DURATIONS = [
  "24:11",
  "1:02:44",
  "18:07",
  "47:32",
  "9:15",
  "1:14:20",
  "32:58",
  "12:41",
  "58:03",
  "21:36",
  "1:07:12",
  "45:09",
];

/** One YouTube-style thumbnail card: thumb, play button, duration, two title lines. */
function VideoCard({
  index,
  duration,
  isNew = false,
}: {
  index: number;
  duration: string;
  isNew?: boolean;
}) {
  const x = GRID_COLS[index % 4];
  const y = GRID_ROWS[Math.floor(index / 4)];
  const cx = x + CARD_W / 2;
  const cy = y + THUMB_H / 2;
  const lineY = y + THUMB_H + 24;
  const w1 = 196 + ((index * 23) % 84);
  const w2 = 112 + ((index * 37) % 62);

  return (
    <g
      className="deck-pop"
      style={{
        animationDelay: `${isNew ? 0.52 : index * 0.03}s`,
        transformBox: "fill-box",
        transformOrigin: "center",
      }}
    >
      <rect
        x={x}
        y={y}
        width={CARD_W}
        height={THUMB_H}
        rx={14}
        fill={SURFACE}
        stroke={ACCENT}
        strokeWidth={isNew ? 5 : 3}
      />
      <circle cx={cx} cy={cy} r={30} fill={ACCENT} />
      <path
        d={`M ${cx - 9} ${cy - 14} L ${cx + 15} ${cy} L ${cx - 9} ${cy + 14} Z`}
        fill="#FFFFFF"
      />
      <rect
        x={x + CARD_W - 90}
        y={y + THUMB_H - 42}
        width={76}
        height={30}
        rx={6}
        fill={INK}
        opacity={0.78}
      />
      <text
        x={x + CARD_W - 52}
        y={y + THUMB_H - 21}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={20}
        fontWeight={700}
        fill="#FFFFFF"
      >
        {duration}
      </text>
      <rect x={x} y={lineY} width={w1} height={12} rx={6} fill={OUTLINE} />
      <rect x={x} y={lineY + 22} width={w2} height={12} rx={6} fill={OUTLINE} />
    </g>
  );
}

/**
 * Slide 1 — a full-screen grid of YouTube thumbnails. Eleven pop in, the last
 * slot sits empty as a dashed outline, then a new video pops in and fills it.
 */
function YouTubeBacklogGrid() {
  const newIndex = DURATIONS.length - 1;

  return (
    <svg
      viewBox="0 0 1440 810"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={DECK_FONT}
      role="img"
      aria-label="A grid of saved video thumbnails, with one new video popping in to fill the last empty slot."
    >
      <rect
        x={GRID_COLS[newIndex % 4]}
        y={GRID_ROWS[Math.floor(newIndex / 4)]}
        width={CARD_W}
        height={THUMB_H}
        rx={14}
        fill="none"
        stroke={ACCENT}
        strokeWidth={3}
        strokeDasharray="14 12"
      />
      {DURATIONS.map((duration, index) => (
        <VideoCard
          key={duration}
          index={index}
          duration={duration}
          isNew={index === newIndex}
        />
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------- */

const FRAME_X = [776, 976, 1176];
const CUT_X = [969, 1169];
const READS = ["cuts", "pacing", "on-screen text"];

/**
 * Slide 4 — transcript-only lines on the left, a filmstrip with coral cut
 * marks on the right.
 */
function FramesNotTranscript() {
  return (
    <svg
      viewBox="0 0 1440 810"
      className="h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={DECK_FONT}
      role="img"
      aria-label="Transcript-only lines of text on the left versus a filmstrip with cut marks on the right, reading cuts, pacing and on-screen text."
    >
      {/* Transcript only */}
      <text x={70} y={170} fontSize={44} fontWeight={700} fill={SECONDARY}>
        TRANSCRIPT
      </text>
      <rect
        x={70}
        y={215}
        width={570}
        height={430}
        rx={24}
        fill="#FFFFFF"
        stroke={OUTLINE}
        strokeWidth={2}
      />
      {[420, 490, 360, 470, 300, 440, 380].map((width, index) => (
        <rect
          key={width}
          x={110}
          y={270 + index * 52}
          width={width}
          height={16}
          rx={8}
          fill={OUTLINE}
        />
      ))}

      <line x1={700} y1={150} x2={700} y2={680} stroke={OUTLINE} strokeWidth={2} />

      {/* Frames */}
      <text x={760} y={170} fontSize={44} fontWeight={700} fill={INK}>
        FRAMES
      </text>
      <rect x={760} y={215} width={620} height={250} rx={10} fill={INK} />
      {Array.from({ length: 14 }, (_, index) => 778 + index * 41).map((x) => (
        <g key={x}>
          <rect x={x} y={228} width={18} height={14} rx={3} fill="#FFFFFF" opacity={0.85} />
          <rect x={x} y={438} width={18} height={14} rx={3} fill="#FFFFFF" opacity={0.85} />
        </g>
      ))}
      {FRAME_X.map((x) => (
        <g key={x}>
          <rect x={x} y={255} width={186} height={170} rx={6} fill={SURFACE} />
          <path
            d={`M ${x + 84} 326 L ${x + 108} 340 L ${x + 84} 354 Z`}
            fill={INK}
            opacity={0.22}
          />
        </g>
      ))}

      <g
        className="deck-pop"
        style={{
          animationDelay: "0.5s",
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      >
        {CUT_X.map((x) => (
          <g key={x}>
            <line x1={x} y1={200} x2={x} y2={488} stroke={ACCENT} strokeWidth={5} />
            <path d={`M ${x - 15} 186 L ${x + 15} 186 L ${x} 212 Z`} fill={ACCENT} />
          </g>
        ))}
      </g>

      {READS.map((label, index) => (
        <g
          key={label}
          className="deck-rise"
          style={{ animationDelay: `${0.15 + index * 0.1}s` }}
        >
          <circle cx={772} cy={540 + index * 62 - 14} r={8} fill={INK} />
          <text x={800} y={540 + index * 62} fontSize={46} fontWeight={700} fill={INK}>
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------------- */

const slides: React.ReactNode[] = [
  // 1 — If you have 100 videos saved that you're never going to watch, make Claude watch them for you instead.
  <DiagramSlide key="backlog-grid">
    <YouTubeBacklogGrid />
    <Notes>
      If you have 100 videos saved that you&apos;re never going to watch, make
      Claude watch them for you instead. It doesn&apos;t just summarize the
      transcript, it tells me exactly why the thing worked.
    </Notes>
  </DiagramSlide>,

  // 2 — I study other creators' videos, but it takes SO LONG to watch it all.
  <Fragment key="clairevo">
    <ImageSlide
      src={`${LIB}/watch-video-skill-youtube-clairevo.png`}
      alt="A How I AI YouTube video with Claire Vo open in the browser"
    />
    <Notes>
      I study other creators&apos; videos to get better at my own. I also love a
      good how-to YouTube video to learn about AI. But it takes SO LONG to
      actually watch through everything I want.
    </Notes>
  </Fragment>,

  // 3 — Free "watch-video" skill, ~1,300 users, off GitHub — /watch-video [link].
  <Fragment key="mascot">
    <ImageSlide
      src={`${LIB}/watch-video-skill-mascot.png`}
      alt="Pixel-art mascot on a rug in front of a TV saying it can watch videos and listen to speech too"
    />
    <Notes>
      So I use this free skill called watch-video that about 1,300 people are
      already using. You download it off GitHub, then type slash watch-video and
      paste any link.
    </Notes>
  </Fragment>,

  // 4 — It doesn't just read the transcript. It reads the frames — cuts, pacing, text on screen.
  <DiagramSlide key="frames">
    <FramesNotTranscript />
    <Notes>
      It doesn&apos;t just read the transcript. This one reads the frames, so it
      sees the cuts, the pacing, the text on screen.
    </Notes>
  </DiagramSlide>,

  // 5 — Ask for hooks, or a full infographic from the video.
  <Fragment key="github">
    <ImageSlide
      src={`${LIB}/watch-video-skill-github-repo.png`}
      alt="The claude-video-vision repository on GitHub"
    />
    <Notes>
      I can ask things like &quot;what are the spoken and visual hooks?&quot; Or
      I can ask it to create an infographic for me based on the video when
      I&apos;m learning something new.
    </Notes>
  </Fragment>,

  // 6 — And it only takes about 5 minutes end to end.
  <Fragment key="five-minutes">
    <TextSlide>
      Just <HL>5 minutes</HL> end to end
    </TextSlide>
    <Notes>
      And it only takes about 5 minutes and a few tokens to run end to end.
    </Notes>
  </Fragment>,

  // 7 — Comment MIKA for the links + guide.
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for the links + guide" />
    <Notes>
      Comment MIKA for the links to the skills and my step-by-step guide, and
      let me know what kinds of videos you&apos;d like to use this for.
    </Notes>
  </Fragment>,
];

export default function WatchVideoSkillDeckPage() {
  return <Deck slides={slides} />;
}
