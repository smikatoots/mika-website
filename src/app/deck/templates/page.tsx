import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  CoverSlide,
  DualImageSlide,
  HL,
  ImageSlide,
  PointSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide, PyramidSlide, PyramidSvg } from "@/components/deck/special-slides";
import {
  Appear,
  BuildStatementSlide,
  FitTextSlide,
  ListSlide,
  Notes,
  OverlaySlide,
  TableSlide,
} from "@/components/deck/reveal-parts";
import type { SlideInput } from "@/components/deck/deck-slide";
import { deckType } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "Deck templates",
};

const LIB = "/decks/_library";

/** Small corner tag naming the template being shown. */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute left-5 top-5 z-20">
      <span className={`rounded-full bg-zinc-900 px-4 py-1.5 font-mono uppercase tracking-wider text-white ${deckType.meta} !text-white`}>
        {children}
      </span>
    </div>
  );
}

function Example({
  name,
  children,
}: {
  name: string;
  /** Optional: a background-only slide has a tag and nothing else. */
  children?: React.ReactNode;
}) {
  return (
    <div className="relative h-full w-full">
      <Tag>{name}</Tag>
      {children}
    </div>
  );
}

const slides: SlideInput[] = [
  <Example key="c1" name="Diagram">
    <CoverSlide diagram={<PyramidSvg className="w-full max-w-3xl" />} />
  </Example>,

  <Example key="c3" name="Diagram + text">
    <PyramidSlide />
  </Example>,

  <Example key="t2" name="Statement">
    <TextSlide>
      So what do you <HL delay={0.4}>do</HL> about it?
    </TextSlide>
  </Example>,

  <Example key="t3" name="Point (emoji)">
    <PointSlide emoji="✅">
      Name it to <HL delay={0.4}>neutralize</HL> it.
    </PointSlide>
  </Example>,

  <Example key="t4" name="Header + image">
    <ImageSlide
      src={`${LIB}/doomscrolling.jpg`}
      alt="Example full-bleed image."
      caption={
        <>
          Noise #1 · <A>Doomporn</A>
        </>
      }
    />
  </Example>,

  <Example key="img" name="Image">
    <ImageSlide src={`${LIB}/doomscrolling.jpg`} alt="Example full-bleed image, no header." />
  </Example>,

  <Example key="t6" name="Header + 2 images">
    <DualImageSlide
      left={{ src: `${LIB}/block_layoff.png`, alt: "Left image." }}
      right={{ src: `${LIB}/block_layoff_stock_up.jpeg`, alt: "Right image." }}
      caption={
        <>
          Cut the team → stock goes <A>up</A>
        </>
      }
    />
  </Example>,

  // ── Reveal-native templates ──────────────────────────────────────────
  // These build on one slide instead of one slide per beat. Click through
  // them rather than skipping past.
  <Example key="build-statement" name="Statement · two beats">
    <BuildStatementSlide
      setup="You don't need a bigger team."
      payoff="You need a better loop."
    />
    <Notes>The payoff lands on the click, not with the slide.</Notes>
  </Example>,

  <Example key="appear-inline" name="Appear · inline reveal">
    <TextSlide>
      Here&apos;s the AI move.{" "}
      {/* `HL` is nowrap by design, so it takes one or two words. Wrapping a
          whole clause in it forces a single unbreakable line that runs off the
          slide. Highlight the word, not the sentence. */}
      <Appear effect="fade-up">
        Here&apos;s the <HL>time</HL> it buys you.
      </Appear>
    </TextSlide>
  </Example>,

  // ── Fit-to-slide type ────────────────────────────────────────────────
  <Example key="fit-short" name="Fit text · short line">
    <FitTextSlide>Time-rich.</FitTextSlide>
    <Notes>
      Same template as the next slide. The text sizes itself — nothing here
      picks a font size.
    </Notes>
  </Example>,

  <Example key="fit-long" name="Fit text · long line">
    <FitTextSlide>You don&apos;t need to be a developer.</FitTextSlide>
  </Example>,

  // ── Lists ────────────────────────────────────────────────────────────
  <Example key="list-bullets" name="List · bullets, revealed">
    <ListSlide
      heading={
        <>
          What actually <A>moved</A> the needle
        </>
      }
      items={["Cut the tool count", "One workflow, all week", "Ship it badly first"]}
    />
  </Example>,

  <Example key="list-ordered" name="List · numbered, revealed">
    <ListSlide
      ordered
      items={["Pick one real workflow", "Go deep for a week", "Teach it back"]}
    />
  </Example>,

  // ── Table ────────────────────────────────────────────────────────────
  <Example key="table" name="Table · comparison">
    <TableSlide
      heading={
        <>
          The <A>security</A> game vs the <A>freedom</A> game
        </>
      }
      reveal
      columns={["", "Security", "Freedom"]}
      rows={[
        ["Pays in", "Salary", "Optionality"],
        ["Costs you", "Your hours", "Certainty"],
        ["Ends at", "A title", "A life"],
      ]}
    />
  </Example>,

  // ── Backgrounds ──────────────────────────────────────────────────────
  // These are DeckSlide objects, not bare nodes: a background lives on the
  // <section>, which only the Deck shell can reach.
  {
    background: { image: `${LIB}/doomscrolling.jpg` },
    content: <Example key="bg-image-only" name="Background · image only" />,
  },

  {
    background: { image: `${LIB}/layoffs.jpg`, opacity: 0.55 },
    content: (
      <Example key="bg-image-text" name="Background · image + text">
        <OverlaySlide>
          Cut the team. <br /> Stock goes up.
        </OverlaySlide>
      </Example>
    ),
  },

  {
    background: { color: "#142A2A" },
    content: (
      <Example key="bg-color" name="Background · solid color">
        <OverlaySlide scrim={false}>Nobody is coming to save your calendar.</OverlaySlide>
      </Example>
    ),
  },

  {
    background: {
      gradient: "linear-gradient(135deg, #FF5959 0%, #0E8C8C 100%)",
      transition: "fade",
    },
    content: (
      <Example key="bg-gradient" name="Background · gradient + fade">
        <OverlaySlide scrim={false}>Ambition and freedom.</OverlaySlide>
      </Example>
    ),
  },

  // ── Auto-animate ─────────────────────────────────────────────────────
  // The pair morphs: matching elements tween between the two slides instead
  // of cutting. Set `autoAnimate` on BOTH.
  {
    autoAnimate: true,
    content: (
      <Example key="auto-1" name="Auto-animate · before">
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <span
            data-id="stat"
            className={`font-extrabold tracking-[var(--deck-tracking)] text-[var(--deck-ink)] ${deckType.statement}`}
          >
            3 hrs
          </span>
          <span className="text-4xl text-zinc-500">every single week</span>
        </div>
      </Example>
    ),
  },

  {
    autoAnimate: true,
    content: (
      <Example key="auto-2" name="Auto-animate · after">
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <span
            data-id="stat"
            className="deck-accent text-[11rem] font-extrabold tracking-[var(--deck-tracking)]"
          >
            20 min
          </span>
          <span className="text-4xl text-zinc-500">same job, one prompt</span>
        </div>
      </Example>
    ),
  },

  // One CTA template: text only. The text + image variant was dropped from the
  // options. `CtaSlide`'s `preview` prop still works because 28 already-filmed
  // decks pass it, but nothing new should use it.
  <Example key="cta2" name="CTA · text only">
    <CtaSlide sub="and I'll send you the full post." />
  </Example>,
];

export default function DeckTemplatesGalleryPage() {
  return <Deck slides={slides} />;
}
