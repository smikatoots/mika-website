import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  DualImageSlide,
  HL,
  ImageSlide,
  PointSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide, PyramidSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "The AI Bullshit Trinity",
};

const LIB = "/decks/_library";

/**
 * One entry per spoken beat in the script (each "|" segment). Order matters —
 * Mika advances with the arrow keys / on-screen arrows while recording.
 */
const slides: React.ReactNode[] = [
  // 1 — "This is the AI bullshit trinity,"
  <PyramidSlide key="pyramid" />,

  // 2 — "a term coined by my friend Rohan Rajiv, a director of product at LinkedIn."
  <ImageSlide
    key="rohan"
    framed
    src={`${LIB}/rohan-linkedin.png`}
    alt="Rohan Rajiv's LinkedIn profile, showing his Senior Director of Product role at LinkedIn."
    caption={
      <>
        Coined by <A>Rohan Rajiv</A>
      </>
    }
  />,

  // 3 — "The people scaring you about AI are the ones profiting off of it..."
  <ImageSlide
    key="puppet"
    src={`${LIB}/puppet-strings.jpg`}
    alt="A puppeteer's hands working marionette strings."
    caption={
      <>
        They scare you because they <A>profit</A>
      </>
    }
  />,

  // 4 — "First is doomporn..."
  <ImageSlide
    key="doomporn"
    src={`${LIB}/doomscrolling.jpg`}
    alt="A person anxiously scrolling scary headlines on a phone."
    caption={
      <>
        Noise #1 · <A>Doomporn</A>
      </>
    }
  />,

  // 5 — "like the 'half of entry-level jobs gone in five years' headlines."
  <ImageSlide
    key="headline"
    src={`${LIB}/headline-jobs.png`}
    alt="News headline: half of entry-level jobs gone in five years."
  />,

  // 6 — "The loudest voices pushing it are the big AI labs..."
  <ImageSlide
    key="labs"
    src={`${LIB}/ai-lab-logos.png`}
    alt="Logos of the major AI labs."
    caption={
      <>
        The loudest voices sell the <A>fear</A>
      </>
    }
  />,

  // 7 — "Second is efficiency theater..."
  <ImageSlide
    key="theater"
    src={`${LIB}/block_layoff.png`}
    alt="A post announcing layoffs framed as an AI efficiency move."
    caption={
      <>
        Noise #2 · <A>Efficiency Theater</A>
      </>
    }
  />,

  // 8 — "A company cuts a third of its team... and the stock goes up..."
  <DualImageSlide
    key="layoffs-stock"
    left={{ src: `${LIB}/block_layoff.png`, alt: "A post announcing layoffs." }}
    right={{
      src: `${LIB}/block_layoff_stock_up.jpeg`,
      alt: "The company's stock price rising after the layoffs.",
    }}
    caption={
      <>
        Cut the team → stock goes <A>up</A>
      </>
    }
  />,

  // 9 — "Third is productivity kabuki..."
  <ImageSlide
    key="kabuki"
    src={`${LIB}/kabuki.jpg`}
    alt="A kabuki actor in a dramatic stage pose."
    caption={
      <>
        Noise #3 · <A>Productivity Kabuki</A>
      </>
    }
    credit="Ichikawa Danjūrō VIII as Sukeroku · public domain (Wikimedia Commons)"
  />,

  // 10 — "Every new model breakdown... mostly there to make you feel behind."
  <ImageSlide
    key="behind"
    src={`${LIB}/hamster-wheel.webp`}
    alt="A hamster running on a wheel, going nowhere."
    caption={
      <>
        Built to make you feel <A>behind</A>
      </>
    }
  />,

  // 11 — "So given this, well what should you do about it:"
  <TextSlide key="what-to-do">
    So what do you <HL delay={0.4}>do</HL> about it?
  </TextSlide>,

  // 12 — "one: Name it to neutralize it..."
  <PointSlide key="name-it" number="01" emoji="✅">
    Name it to <HL delay={0.4}>neutralize</HL> it.
  </PointSlide>,

  // 13 — "two: Play offense... Pick one thing..."
  <PointSlide key="offense" number="02" emoji="🎯">
    Play <HL delay={0.4}>offense</HL>. Pick <HL delay={0.6}>one thing</HL>.
  </PointSlide>,

  // 14 — "The people pulling ahead aren't the ones who can name the most tools..."
  <TextSlide key="winners" emoji="🏆">
    Winners <HL delay={0.45}>solve problems</HL>, not collect tools.
  </TextSlide>,

  // 15 — CTA
  <CtaSlide
    key="cta"
    sub="and I'll send you Rohan's post."
    preview={`${LIB}/rohan_post_preview.png`}
    previewAlt="Preview of Rohan Rajiv's post about the AI Bullshit Trinity."
  />,
];

export default function AiBullshitTrinityDeckPage() {
  return <Deck slides={slides} />;
}
