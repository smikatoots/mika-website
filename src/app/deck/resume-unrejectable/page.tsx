import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Your resume, unrejectable" };

const LIB = "/decks/_library";

const accent = "#fd4869";
const grey = "#d4d4d8";
const ink = "#18181b";
const slate = "#71717a";

// The 3 prompts, revealed one at a time (StepsSlide increments `current`).
const promptSteps: React.ReactNode[] = [
  "The Roaster",
  "The Revamper",
  "The Interviewer",
];

// Slide 3 visual — a resume page on the left with a scanning beam sweeping
// across it, keyword rows lighting up salmon, a magnifier riding the beam, and
// a circular match-score badge ("72%") on the right.
function RoasterScan() {
  const rows = [
    { y: 168, w: 300, hot: false },
    { y: 214, w: 250, hot: true },
    { y: 260, w: 330, hot: false },
    { y: 306, w: 180, hot: true },
    { y: 352, w: 320, hot: false },
    { y: 398, w: 220, hot: true },
    { y: 444, w: 300, hot: false },
    { y: 490, w: 260, hot: false },
  ];
  const beamX = 300;
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1030 640"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {/* resume page */}
        <rect x="90" y="80" width="440" height="500" rx="18" fill="#ffffff" stroke="#e4e4e7" strokeWidth="3" />
        {/* name / header block */}
        <rect x="130" y="120" width="220" height="26" rx="13" fill={ink} />
        {rows.map((r) => (
          <rect key={r.y} x="130" y={r.y} width={r.w} height="18" rx="9" fill={r.hot ? accent : grey} />
        ))}

        {/* scanning beam */}
        <defs>
          <linearGradient id="roast-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={accent} stopOpacity="0" />
            <stop offset="0.5" stopColor={accent} stopOpacity="0.22" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <g>
          <rect x={beamX} y="80" width="86" height="500" fill="url(#roast-beam)" />
          <rect x={beamX + 40} y="80" width="6" height="500" rx="3" fill={accent} />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-150 0; 150 0; -150 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>
        {/* magnifier riding the beam */}
        <g>
          <circle cx={beamX + 43} cy="330" r="52" fill="#ffffff" stroke={accent} strokeWidth="12" />
          <circle cx={beamX + 43} cy="330" r="30" fill={accent} fillOpacity="0.12" />
          <line x1={beamX + 82} y1="368" x2={beamX + 128} y2="414" stroke={accent} strokeWidth="16" strokeLinecap="round" />
          <animateTransform
            attributeName="transform"
            type="translate"
            values="-150 0; 150 0; -150 0"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>

        {/* match-score badge */}
        <circle cx="800" cy="300" r="132" fill="#ffffff" stroke="#f4f4f5" strokeWidth="20" />
        <circle
          cx="800"
          cy="300"
          r="132"
          fill="none"
          stroke={accent}
          strokeWidth="20"
          strokeLinecap="round"
          strokeDasharray="597 829"
          transform="rotate(-90 800 300)"
        />
        <text x="800" y="312" textAnchor="middle" fontSize="96" fontWeight="800" fill={accent}>
          72%
        </text>
        <text x="800" y="470" textAnchor="middle" fontSize="40" fontWeight="700" fill={slate} letterSpacing="6">
          MATCH
        </text>
      </svg>
    </div>
  );
}

// Slide 4 visual — three stacked pills (Accomplished X → measured by Y → by
// doing Z) linked top-to-bottom by a dotted salmon arrow.
function XyzStack() {
  const pills = [
    { y: 20, lead: "Accomplished ", token: "X" },
    { y: 340, lead: "measured by ", token: "Y" },
    { y: 660, lead: "by doing ", token: "Z" },
  ];
  const pillW = 680;
  const pillH = 150;
  const cx = 515;
  const x = cx - pillW / 2;
  // Leave a wide gap between each pill's bottom and the next pill's top so the
  // dotted connector's arrowhead lands in open space (not tucked under a pill).
  const gapPad = 52;
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1030 830"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <marker id="xyz-arrow" markerWidth="14" markerHeight="14" refX="6" refY="7" orient="auto">
            <path d="M1 1 L13 7 L1 13 Z" fill={accent} />
          </marker>
        </defs>

        {/* dotted connectors between pills */}
        <line
          x1={cx}
          y1={pills[0].y + pillH + 6}
          x2={cx}
          y2={pills[1].y - gapPad}
          stroke={accent}
          strokeWidth="7"
          strokeDasharray="2 20"
          strokeLinecap="round"
          markerEnd="url(#xyz-arrow)"
        />
        <line
          x1={cx}
          y1={pills[1].y + pillH + 6}
          x2={cx}
          y2={pills[2].y - gapPad}
          stroke={accent}
          strokeWidth="7"
          strokeDasharray="2 20"
          strokeLinecap="round"
          markerEnd="url(#xyz-arrow)"
        />

        {pills.map((p) => (
          <g key={p.token}>
            <rect x={x} y={p.y} width={pillW} height={pillH} rx={pillH / 2} fill="#ffffff" stroke={accent} strokeWidth="5" />
            <text x={cx} y={p.y + pillH / 2 + 24} textAnchor="middle" fontSize="70" fontWeight="800" fill={ink}>
              {p.lead}
              <tspan fill={accent}>{p.token}</tspan>
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// Slide 5 visual — a chat bubble holding a mic on the left, five numbered
// question bubbles stacked on the right.
function InterviewerBubbles() {
  const nums = [1, 2, 3, 4, 5];
  const startY = 90;
  const stepY = 96;
  const circleX = 690;
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1030 640"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {/* speech bubble (nudged right to close the gap with the questions) */}
        <g transform="translate(80 0)">
          <rect x="70" y="150" width="340" height="300" rx="48" fill={accent} />
          <path d="M150 448 L150 540 L230 448 Z" fill={accent} />
          {/* mic inside the bubble */}
          <rect x="212" y="212" width="56" height="120" rx="28" fill="#ffffff" />
          <path d="M186 300 a54 54 0 0 0 108 0" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
          <line x1="240" y1="354" x2="240" y2="392" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
          <line x1="206" y1="392" x2="274" y2="392" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
        </g>

        {/* five numbered question bubbles (nudged left to close the gap) */}
        <g transform="translate(-110 0)">
          {nums.map((n, i) => {
            const cy = startY + i * stepY + 40;
            return (
              <g key={n}>
                <circle cx={circleX} cy={cy} r="42" fill="#ffffff" stroke={accent} strokeWidth="5" />
                <text x={circleX} y={cy + 18} textAnchor="middle" fontSize="46" fontWeight="800" fill={accent}>
                  {n}
                </text>
                <rect x={circleX + 66} y={cy - 16} width={220 - i * 18} height="32" rx="16" fill={grey} />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Hook: I worked at LinkedIn, here's why you're getting ghosted
  // (library `mika-linkedin.jpg` not present → falls back to the real
  //  `mika-linkedin-hero.png` Mika-at-LinkedIn photo, per the ladder).
  <ImageSlide
    key="linkedin"
    src={`${LIB}/mika-linkedin-hero.png`}
    alt="Mika at LinkedIn"
  />,

  // 2 — 3 prompts
  <TextSlide key="three-prompts" display>
    3 <HL>prompts</HL>
  </TextSlide>,

  // 3 — The Roaster: scores you + surfaces missing keywords
  <StepsSlide key="roaster" steps={promptSteps} current={0} visual={<RoasterScan />} />,

  // 4 — The Revamper: rewrites bullets as X, measured by Y, by doing Z
  <StepsSlide key="revamper" steps={promptSteps} current={1} visual={<XyzStack />} />,

  // 5 — The Interviewer: the 5 questions a recruiter would ask
  <StepsSlide key="interviewer" steps={promptSteps} current={2} visual={<InterviewerBubbles />} />,

  // 6 — CTA: Comment MIKA for the guide + tell me your role
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="and I'll send you the guide."
  />,
];

export default function ResumeUnrejectableDeckPage() {
  return <Deck slides={slides} />;
}
