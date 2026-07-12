import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  CoverSlide,
  HL,
  ImageSlide,
  StepsSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Job Titles Are Dead" };

const LIB = "/decks/_library";

const ACCENT = "#fd4869";
const GREY = "#d4d4d8";
const DARK = "#52525b";

// Shared frame: centers a custom SVG icon on the right side of a StepsSlide.
function IconFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 440 440"
        className="h-auto w-full max-w-md"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {children}
      </svg>
    </div>
  );
}

// 💡 Prototyper — lightbulb outline with dashed idea-rays radiating outward.
function PrototyperIcon() {
  return (
    <IconFrame>
      {/* idea rays */}
      <g
        stroke={ACCENT}
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray="2 16"
        fill="none"
      >
        <line x1={220} y1={92} x2={220} y2={48} />
        <line x1={150} y1={118} x2={118} y2={86} />
        <line x1={290} y1={118} x2={322} y2={86} />
      </g>
      {/* bulb glass */}
      <circle cx={220} cy={200} r={86} fill="none" stroke={ACCENT} strokeWidth={12} />
      {/* filament */}
      <path
        d="M196 205 Q220 172 244 205"
        fill="none"
        stroke={ACCENT}
        strokeWidth={8}
        strokeLinecap="round"
      />
      {/* screw base */}
      <g fill={ACCENT}>
        <rect x={186} y={284} width={68} height={15} rx={5} />
        <rect x={192} y={304} width={56} height={13} rx={5} />
        <rect x={200} y={322} width={40} height={13} rx={6} />
      </g>
    </IconFrame>
  );
}

// 🔨 Builder — mallet striking a stack of blocks assembling upward.
function BuilderIcon() {
  return (
    <IconFrame>
      {/* ascending blocks */}
      <rect x={80} y={300} width={92} height={72} rx={12} fill="none" stroke={GREY} strokeWidth={11} />
      <rect x={150} y={232} width={92} height={72} rx={12} fill="none" stroke={GREY} strokeWidth={11} />
      <rect x={220} y={164} width={92} height={72} rx={12} fill={ACCENT} />
      {/* mallet */}
      <rect x={252} y={92} width={116} height={44} rx={10} fill={ACCENT} />
      <rect x={297} y={128} width={26} height={70} rx={11} fill={DARK} />
    </IconFrame>
  );
}

// 🧹 Sweeper — broom gathering scattered scraps into a neat pile.
function SweeperIcon() {
  return (
    <IconFrame>
      {/* scattered scraps */}
      <g fill={GREY}>
        <circle cx={96} cy={352} r={9} />
        <circle cx={128} cy={330} r={7} />
        <circle cx={150} cy={356} r={6} />
      </g>
      {/* neat pile */}
      <path d="M78 372 Q110 320 156 372 Z" fill={GREY} />
      {/* broom handle */}
      <rect
        x={306}
        y={70}
        width={16}
        height={210}
        rx={8}
        fill={DARK}
        transform="rotate(34 314 175)"
      />
      {/* broom bristles */}
      <path d="M214 236 L296 292 L246 356 L168 306 Z" fill={ACCENT} />
      <g stroke="#ffffff" strokeWidth={4} strokeLinecap="round" opacity={0.6}>
        <line x1={210} y1={286} x2={230} y2={316} />
        <line x1={228} y1={276} x2={248} y2={306} />
        <line x1={246} y1={266} x2={266} y2={296} />
      </g>
    </IconFrame>
  );
}

// 🌱 Grower — sprout with an upward arrow and multiplying user-dots.
function GrowerIcon() {
  return (
    <IconFrame>
      {/* ground line */}
      <line x1={70} y1={352} x2={250} y2={352} stroke={GREY} strokeWidth={10} strokeLinecap="round" />
      {/* stem */}
      <path d="M150 352 V214" fill="none" stroke={ACCENT} strokeWidth={12} strokeLinecap="round" />
      {/* leaves */}
      <path d="M150 250 Q104 234 92 190 Q140 196 150 250 Z" fill={ACCENT} />
      <path d="M150 232 Q196 216 208 172 Q160 178 150 232 Z" fill={ACCENT} />
      {/* upward arrow */}
      <g stroke={DARK} strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <line x1={150} y1={210} x2={150} y2={150} />
        <path d="M124 174 L150 146 L176 174" />
      </g>
      {/* multiplying user-dots */}
      <g fill={ACCENT}>
        <g transform="translate(290 300)">
          <circle cx={0} cy={0} r={14} />
          <path d="M-22 40 A22 22 0 0 1 22 40 Z" />
        </g>
        <g transform="translate(340 268)">
          <circle cx={0} cy={0} r={17} />
          <path d="M-26 48 A26 26 0 0 1 26 48 Z" />
        </g>
        <g transform="translate(300 218)">
          <circle cx={0} cy={0} r={20} />
          <path d="M-30 56 A30 30 0 0 1 30 56 Z" />
        </g>
      </g>
    </IconFrame>
  );
}

// ⚙️ Maintainer — shield outline with a steady heartbeat pulse running through.
function MaintainerIcon() {
  return (
    <IconFrame>
      <path
        d="M220 78 L336 122 V232 C336 306 284 356 220 386 C156 356 104 306 104 232 V122 Z"
        fill="none"
        stroke={ACCENT}
        strokeWidth={13}
        strokeLinejoin="round"
      />
      <path
        d="M126 236 H176 L198 198 L224 292 L250 236 H314"
        fill="none"
        stroke={ACCENT}
        strokeWidth={11}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconFrame>
  );
}

// Two overlapping circles; the intersection is filled salmon with a star badge.
function HybridVenn() {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 520 420"
        className="h-auto w-full max-w-2xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <clipPath id="venn-left">
            <circle cx={195} cy={200} r={140} />
          </clipPath>
        </defs>
        {/* filled lens = intersection */}
        <circle cx={325} cy={200} r={140} fill={ACCENT} clipPath="url(#venn-left)" />
        {/* outlines */}
        <circle cx={195} cy={200} r={140} fill="none" stroke={ACCENT} strokeWidth={8} />
        <circle cx={325} cy={200} r={140} fill="none" stroke={ACCENT} strokeWidth={8} />
        {/* labels */}
        <text x={120} y={210} textAnchor="middle" fontSize={34} fontWeight={800} fill="#18181b">
          Marketer
        </text>
        <text x={400} y={192} textAnchor="middle" fontSize={34} fontWeight={800} fill="#18181b">
          Codes /
        </text>
        <text x={400} y={230} textAnchor="middle" fontSize={34} fontWeight={800} fill="#18181b">
          AI
        </text>
        {/* star badge */}
        <text
          x={260}
          y={200}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={62}
          fill="#ffffff"
        >
          ★
        </text>
      </svg>
    </div>
  );
}

const roles = [
  "The prototyper — testing new ideas.",
  "The builder — shipping them.",
  "The sweeper — cleaning up the mess.",
  "The grower — bringing in the users.",
  "The maintainer — keeping it alive.",
];

const slides: React.ReactNode[] = [
  // 1 — The guy who built Claude Code just said job titles are basically dead.
  // (fallback: bcherny-tweet.png missing → boris-cherny.jpeg, photo of the creator)
  <ImageSlide
    key="cherny"
    src={`${LIB}/boris-cherny.jpeg`}
    alt="Boris Cherny, creator of Claude Code"
    caption={
      <>
        Claude Code&apos;s creator says job titles are <A>dead</A>.
      </>
    }
  />,

  // 2 — This came straight from watching his own team at Anthropic build Claude Code.
  // (fallback: claude-code-product.png missing → clear-command.png, Claude Code terminal)
  <ImageSlide
    key="claude-code"
    src={`${LIB}/clear-command.png`}
    alt="Claude Code terminal product screenshot"
    caption={
      <>
        Straight from the <A>Claude Code</A> team.
      </>
    }
  />,

  // 3 — The prototyper, testing brand new ideas.
  <StepsSlide key="prototyper" steps={roles} current={0} visual={<PrototyperIcon />} />,

  // 4 — The builder, shipping them.
  <StepsSlide key="builder" steps={roles} current={1} visual={<BuilderIcon />} />,

  // 5 — The sweeper, cleaning up the mess once it's live.
  <StepsSlide key="sweeper" steps={roles} current={2} visual={<SweeperIcon />} />,

  // 6 — The grower, bringing in the users.
  <StepsSlide key="grower" steps={roles} current={3} visual={<GrowerIcon />} />,

  // 7 — The maintainer, keeping the whole thing alive.
  <StepsSlide key="maintainer" steps={roles} current={4} visual={<MaintainerIcon />} />,

  // 8 — A hybrid of skills gives you an advantage.
  <CoverSlide
    key="hybrid"
    title={
      <>
        A hybrid skillset is your <HL>advantage</HL>.
      </>
    }
    diagram={<HybridVenn />}
  />,

  // 9 — Go deep, apply your AI skills, be the expert in that domain.
  <TextSlide key="expert" display>
    Be the <HL>expert</HL> in your domain.
  </TextSlide>,

  // 10 — Comment MIKA and I'll share a list of free AI resources.
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="I'll send you free AI starter resources."
  />,
];

export default function JobTitlesAreDeadDeckPage() {
  return <Deck slides={slides} />;
}
