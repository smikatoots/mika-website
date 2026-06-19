import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, DualImageSlide, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "Kickbacks.ai — Earn While Claude Is Thinking",
};

const LIB = "/decks/_library";

function VideoSlide({
  src,
  caption,
}: {
  src: string;
  caption?: React.ReactNode;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-2 px-6 py-10 sm:gap-3 sm:px-12 sm:py-12">
      {caption ? (
        <h2
          className={`deck-rise text-center ${headingBase} ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {caption}
        </h2>
      ) : null}
      <div className="relative flex max-h-[70vh] w-full items-center justify-center">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-[70vh] max-w-full object-contain"
        />
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Get paid while Claude is "thinking"
  <VideoSlide
    key="hook"
    src={`${LIB}/claude-thinking-line.mov`}
    caption={
      <>
        Get paid while Claude is <A>&ldquo;thinking&rdquo;</A>
      </>
    }
  />,

  // 2 — It's called Kickbacks…
  <ImageSlide
    key="kickbacks-intro"
    src={`${LIB}/kickbacks-homepage.png`}
    alt="Kickbacks.ai homepage"
    caption={
      <>
        <A>Kickbacks</A> turns dead seconds into money
      </>
    }
  />,

  // 3 — That little status line…
  <VideoSlide
    key="thinking-line"
    src={`${LIB}/claude-thinking-line.mov`}
    caption={
      <>
        That <A>&ldquo;thinking&rdquo;</A> line is empty real estate
      </>
    }
  />,

  // 4 — Kickbacks puts an ad on that line…
  <VideoSlide key="ad-on-line" src={`${LIB}/kickbacks-ad-on-thinking-line.mov`} />,

  // 5 — Setup is one line…
  <ImageSlide
    key="one-line-setup"
    src={`${LIB}/kickbacks-one-line-setup.png`}
    alt="Kickbacks one-line install setup"
  />,

  // 6 — So while Claude works, you earn.
  <DualImageSlide
    key="earn-while-works"
    compactCaption
    left={{
      src: `${LIB}/claude-logo.png`,
      alt: "Claude logo",
    }}
    right={{
      src: `${LIB}/money-in-your-pocket.jpeg`,
      alt: "Money in your pocket",
    }}
    caption={
      <>
        While Claude <A>works</A>, you <A>earn</A>
      </>
    }
  />,

  // 7 — Kickbacks is one of the first of a brand new category…
  <ImageSlide
    key="new-category"
    src={`${LIB}/kickbacks-homepage.png`}
    alt="Kickbacks.ai homepage"
    caption={
      <>
        A <A>new category</A> of AI-era earning
      </>
    }
  />,

  // 8 — Comment MIKA…
  <CtaSlide
    key="cta"
    sub="I'll send the link and my guide."
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="AI guides preview"
  />,
];

export default function KickbacksEarnWhileWaitingDeckPage() {
  return <Deck slides={slides} />;
}
