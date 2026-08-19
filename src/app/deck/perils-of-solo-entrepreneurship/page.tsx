import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";

export const metadata: Metadata = { title: "The perils of solo entrepreneurship" };

const LIB = "/decks/_library";

const ACCENT = "#fd4869";
const INK = "#111111";

/**
 * Slide 5 — "get other founders in your orbit".
 * A filled black YOU node dead center, two concentric dashed salmon orbit
 * rings around it, and 5 salmon founder dots sitting on the rings at staggered
 * angles, each with a short white label pill. Pills are white-filled so they
 * cleanly mask the dashed ring where they cross it. Dots pop in one by one.
 */
function FounderOrbit() {
  // Each entry: dot position (on a ring) + its label pill rect, hand-placed so
  // nothing collides with the YOU node or with another pill.
  const nodes: {
    label: string;
    cx: number;
    cy: number;
    pill: { x: number; y: number; w: number };
  }[] = [
    // inner ring, left
    { label: "cofounder", cx: 331, cy: 237, pill: { x: 148, y: 214, w: 165 } },
    // inner ring, right
    { label: "group chat", cx: 669, cy: 303, pill: { x: 687, y: 280, w: 179 } },
    // outer ring, top-left
    { label: "mastermind", cx: 387, cy: 101, pill: { x: 298, y: 37, w: 179 } },
    // outer ring, top-right
    { label: "SPC", cx: 733, cy: 143, pill: { x: 751, y: 120, w: 79 } },
    // outer ring, bottom
    {
      label: "the one you text at 11pm",
      cx: 557,
      cy: 447,
      pill: { x: 368, y: 465, w: 379 },
    },
  ];

  const PILL_H = 46;

  return (
    <div className="flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1000 540"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="You at the center of two orbit rings carrying five other founders: cofounder, group chat, mastermind, SPC, and the one you text at 11pm"
      >
        {/* the two orbit rings */}
        <g className="deck-fade" fill="none" stroke={ACCENT} strokeLinecap="round">
          <ellipse cx={500} cy={270} rx={180} ry={96} strokeWidth={3} strokeDasharray="10 12" opacity={0.75} />
          <ellipse cx={500} cy={270} rx={330} ry={180} strokeWidth={3} strokeDasharray="10 12" opacity={0.55} />
        </g>

        {/* YOU — dead center */}
        <g className="deck-pop">
          <circle cx={500} cy={270} r={58} fill={INK} />
          <text
            x={500}
            y={270}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={30}
            fontWeight={800}
            letterSpacing={1}
            fill="#ffffff"
          >
            YOU
          </text>
        </g>

        {/* the founders on the rings, popping in one by one */}
        {nodes.map((node, i) => (
          <g
            key={node.label}
            className="deck-pop"
            style={{ animationDelay: `${0.35 + i * 0.28}s` }}
          >
            <rect
              x={node.pill.x}
              y={node.pill.y}
              width={node.pill.w}
              height={PILL_H}
              rx={23}
              fill="#ffffff"
              stroke={ACCENT}
              strokeWidth={2.5}
            />
            <text
              x={node.pill.x + node.pill.w / 2}
              y={node.pill.y + PILL_H / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={26}
              fontWeight={600}
              fill={INK}
            >
              {node.label}
            </text>
            <circle cx={node.cx} cy={node.cy} r={13} fill={ACCENT} stroke="#ffffff" strokeWidth={4} />
          </g>
        ))}
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Sam Altman said one person will soon build a billion-dollar company but there's a sad reality these articles are leaving behind.
  <ImageSlide
    key="sam-altman"
    src={`${LIB}/sam-altman-billion-dollar-solo.png`}
    alt="Sam Altman predicting a one-person billion-dollar company"
  />,

  // 2 — The Atlantic put it best. For a lot of adults, the office is the last real community that you have.
  <ImageSlide
    key="atlantic"
    src={`${LIB}/atlantic-office-last-community.png`}
    alt="The Atlantic: for many adults the office is the last real community they have"
  />,

  // 3 — But founding is already really lonely, and now doing it with nobody has become the flex.
  <ImageSlide
    key="empty-office"
    src={`${LIB}/empty-office-one-person.jpeg`}
    alt="One person alone in an empty office"
  />,

  // 4 — Candidly i've contributed to the headlines, but while I still do believe it's the best time to bet on yourself, i'm not saying you should do it ALONE forever.
  <ImageSlide
    key="best-time"
    src={`${LIB}/best-time-millionaire-alone.png`}
    alt="Mika's own post: it's the best time to bet on yourself and become a millionaire"
  />,

  // 5 — So if you're going to bet on yourself, my #1 piece of advice whether you have a cofounder or building as a solo operator is to get other founders in your orbit!
  <CoverSlide
    key="orbit"
    title={
      <>
        Get other founders in your <HL>orbit</HL>
      </>
    }
    diagram={<FounderOrbit />}
  />,

  // 6 — Only other founders can ACTUALLY understand what you're going through, no one else.
  <TextSlide key="only-founders" display>
    Only <HL>other founders</HL> actually get it.
  </TextSlide>,

  // 7 — Mine come from South Park Commons and I've made my own group chats and masterminds with founders I admire.
  <ImageSlide
    key="spc"
    src={`${LIB}/spc-fellowship-logo.jpg`}
    alt="South Park Commons Founder Fellowship"
  />,

  // 8 — What do you think of these AI company headlines? Follow for more to stay ahead with AI. Good luck!
  <TextSlide key="cta">What do you think? Follow to stay ahead with AI</TextSlide>,
];

export default function Page() {
  return <Deck slides={slides} />;
}
