import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

import { SeriesCoverSlide } from "../_shared/series";

export const metadata: Metadata = { title: "The AI Era Belongs to Women — Episode 2" };

const LIB = "/decks/_library";

/**
 * A four-row stat board: the percentage sits in a narrow salmon column on the
 * left, its label runs wide on the right. Rows stagger in one after another.
 */
function StatBoard({ rows }: { rows: { value: string; label: string }[] }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-8 sm:px-16">
      <dl className="grid w-full max-w-6xl grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-baseline gap-x-8 gap-y-3 sm:gap-x-14 sm:gap-y-5">
        {rows.map(({ value, label }, i) => (
          <Fragment key={value + label}>
            <dt
              className="deck-rise deck-accent text-right text-7xl leading-[1.02] font-extrabold tracking-tight sm:text-8xl"
              style={{ animationDelay: `${0.12 + i * 0.12}s` }}
            >
              {value}
            </dt>
            <dd
              className="deck-rise text-5xl leading-[1.06] font-extrabold tracking-tight text-balance text-zinc-950 sm:text-6xl"
              style={{ animationDelay: `${0.18 + i * 0.12}s` }}
            >
              {label}
            </dd>
          </Fragment>
        ))}
      </dl>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Social media makes it look like women are losing in AI. But these stats are more hopeful.
  <TextSlide key="women-vs-men">% women vs. men</TextSlide>,

  // 2 — This is Episode 2 of Women and AI. Here are three reasons women are positioned to be the AI economy's biggest winners.
  <SeriesCoverSlide key="cover" episode={2} description="Why women should win" />,

  // 3+4 — Distribution and entrepreneurship, merged onto one stat board: the
  // percentages read down the left, their labels sit wide on the right.
  <StatBoard
    key="stats"
    rows={[
      { value: "68%", label: "creators" },
      { value: "77%", label: "monetizing creators" },
      { value: "47%", label: "new GenZ business owners" },
      { value: "30%", label: "more timerich freedom" },
    ]}
  />,

  // 5 — Third, human skills. AI raises the value of empathy, storytelling, taste, judgment, and relationships. Study after study show that women score higher in traits like empathy, interpersonal relationships and emotional intelligence.
  <TextSlide key="human-skills">empathy, storytelling, taste, judgment, relationships</TextSlide>,

  // 6 — We see companies paying for this with AI labs & tech companies paying up to 700k for marketing or storytelling roles.
  <ImageSlide
    key="ai-lab-700k"
    src={`${LIB}/ai-lab-700k-marketing-role.png`}
    alt="AI lab marketing role paying up to $700k"
  />,

  // 7 — However, if women are so well positioned to win in the AI economy, here's one problem: we're still pretty underrepresented in AI overall.
  <TextSlide key="question-marks">???</TextSlide>,

  // 8 — Episode 3 is about that gap and why many women are opting out. Spoiler: it isn't our ability. Follow for the next episode.
  <CtaSlide
    key="cta"
    size="md"
    prompt={null}
    headlinePlain
    headline="Follow for Episode 3: why are women opting out?"
    preview={`${LIB}/women-and-ai-article-preview.webp`}
    previewAlt="Women and AI article preview"
  />,
];

export default function WomenWinAiStatsDeckPage() {
  return <Deck slides={slides} />;
}
