import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  CoverSlide,
  DualImageSlide,
  HL,
  ImageSlide,
  PointSlide,
  StepsSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide, PyramidSlide, PyramidSvg } from "@/components/deck/special-slides";
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

function Example({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <Tag>{name}</Tag>
      {children}
    </div>
  );
}

/** A big sized box so an Image with `fill` works as a Steps right-side visual. */
function FramedVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]">
      <Image src={src} alt={alt} fill sizes="32rem" className="object-cover" />
    </div>
  );
}

const stepLabels = [
  "Pick one real workflow",
  "Go deep for a week",
  "Ship something real",
  "Teach it back",
];

// One unique supporting image per step.
const stepVisuals = [
  <FramedVisual key="v0" src={`${LIB}/doomscrolling.jpg`} alt="Visual for step 1." />,
  <FramedVisual key="v1" src={`${LIB}/hamster-wheel.webp`} alt="Visual for step 2." />,
  <FramedVisual key="v2" src={`${LIB}/layoffs.jpg`} alt="Visual for step 3." />,
  <FramedVisual key="v3" src={`${LIB}/ai-lab-logos.png`} alt="Visual for step 4." />,
];

const slides: React.ReactNode[] = [
  <Example key="c1" name="Diagram">
    <CoverSlide diagram={<PyramidSvg className="w-full max-w-3xl" />} />
  </Example>,

  <Example key="c3" name="Diagram + text">
    <PyramidSlide />
  </Example>,

  <Example key="t2" name="Statement">
    <TextSlide display>
      So what do you <HL delay={0.4}>do</HL> about it?
    </TextSlide>
  </Example>,

  <Example key="t3" name="Point (emoji + number)">
    <PointSlide number="01" emoji="✅">
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

  // Steps — first the bare roadmap (no step reached, no visual), then one frame
  // per step as the list reveals progressively.
  <Example key="s0" name="Steps · 0 of 4">
    <StepsSlide steps={stepLabels} current={-1} />
  </Example>,
  <Example key="s1" name="Steps · 1 of 4">
    <StepsSlide steps={stepLabels} current={0} visual={stepVisuals[0]} />
  </Example>,
  <Example key="s2" name="Steps · 2 of 4">
    <StepsSlide steps={stepLabels} current={1} visual={stepVisuals[1]} />
  </Example>,
  <Example key="s3" name="Steps · 3 of 4">
    <StepsSlide steps={stepLabels} current={2} visual={stepVisuals[2]} />
  </Example>,
  <Example key="s4" name="Steps · 4 of 4">
    <StepsSlide steps={stepLabels} current={3} visual={stepVisuals[3]} />
  </Example>,

  <Example key="cta1" name="CTA · text + image">
    <CtaSlide
      sub="and I'll send you Rohan's post."
      preview={`${LIB}/rohan_post_preview.png`}
      previewAlt="Preview of Rohan Rajiv's post."
    />
  </Example>,

  <Example key="cta2" name="CTA · text only">
    <CtaSlide sub="and I'll send you the full post." />
  </Example>,
];

export default function DeckTemplatesGalleryPage() {
  return <Deck slides={slides} />;
}
