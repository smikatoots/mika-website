import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Job Titles Are Dead" };

const LIB = "/decks/_library";

const ACCENT = "#fd4869";

// Big emoji visual, sized to fill a StepsSlide's right-hand well.
function EmojiVisual({ emoji }: { emoji: string }) {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <span className="text-[10rem] leading-none sm:text-[16rem]" aria-hidden>
        {emoji}
      </span>
    </div>
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
  "The prototyper",
  "The builder",
  "The sweeper",
  "The grower",
  "The maintainer",
];

const roleEmojis = ["⚙️", "🔨", "🧹", "🌱", "🫀"];

const slides: React.ReactNode[] = [
  // 1 — The guy who built Claude Code just said job titles are basically dead.
  <ImageSlide
    key="cherny"
    src={`${LIB}/boris-cherny.jpeg`}
    alt="Boris Cherny, creator of Claude Code"
  />,

  // 2 — The prototyper, testing brand new ideas.
  <StepsSlide key="prototyper" steps={roles} current={0} visual={<EmojiVisual emoji={roleEmojis[0]} />} />,

  // 3 — The builder, shipping them.
  <StepsSlide key="builder" steps={roles} current={1} visual={<EmojiVisual emoji={roleEmojis[1]} />} />,

  // 4 — The sweeper, cleaning up the mess once it's live.
  <StepsSlide key="sweeper" steps={roles} current={2} visual={<EmojiVisual emoji={roleEmojis[2]} />} />,

  // 5 — The grower, bringing in the users.
  <StepsSlide key="grower" steps={roles} current={3} visual={<EmojiVisual emoji={roleEmojis[3]} />} />,

  // 6 — The maintainer, keeping the whole thing alive.
  <StepsSlide key="maintainer" steps={roles} current={4} visual={<EmojiVisual emoji={roleEmojis[4]} />} />,

  // 7 — A hybrid of skills gives you an advantage.
  <CoverSlide
    key="hybrid"
    title={
      <>
        A hybrid skillset is your <HL>advantage</HL>.
      </>
    }
    diagram={<HybridVenn />}
  />,

  // 8 — Go deep, apply your AI skills, be the expert in that domain.
  <TextSlide key="expert" display>
    Be the <HL>expert</HL> in your domain.
  </TextSlide>,

  // 9 — Comment MIKA and I'll share a list of free AI resources.
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for AI resources!" />,
];

export default function JobTitlesAreDeadDeckPage() {
  return <Deck slides={slides} />;
}
