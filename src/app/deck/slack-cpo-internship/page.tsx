import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { A, DualImageSlide, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Ex Slack CPO Applying for an Internship",
};

const LIB = "/decks/_library";

function GifSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <div className="relative w-full flex-1">
        <Image src={src} alt={alt} fill unoptimized sizes="100vw" className="object-contain" />
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Visual + spoken hook
  <ImageSlide
    key="hook"
    src={`${LIB}/april-underwood-intern-tweet.png`}
    alt="April Underwood internship tweet"
  />,

  // 2 — Context
  <ImageSlide
    key="context"
    src={`${LIB}/ctos-joining-anthropic.png`}
    alt="CTOs joining Anthropic"
  />,

  // 3 — April Underwood
  <ImageSlide
    key="april"
    src={`${LIB}/april-underwood-linkedin.png`}
    alt="April Underwood LinkedIn"
    caption={
      <>
        <A>April Underwood</A>, ex-Slack CPO, VC
      </>
    }
    framed
  />,

  // 4 — Instagram & Workday CTOs at Anthropic
  <DualImageSlide
    key="anthropic-hires"
    left={{ src: `${LIB}/workday-cto-anthropic.png`, alt: "Workday ex-CTO joining Anthropic" }}
    right={{ src: `${LIB}/instagram-cto-anthropic.png`, alt: "Instagram CTO joining Anthropic" }}
    balancedHeight
  />,

  // 5 — Walking into IC roles
  <GifSlide key="ic-roles" src={`${LIB}/throwing-money.gif`} alt="Throwing money" />,

  // 6 — Why — frontier
  <ImageSlide
    key="frontier"
    src={`${LIB}/ai-lab-logos.png`}
    alt="AI lab logos"
  />,

  // 7 — Building is fun / you can too
  <GifSlide key="build-mode" src={`${LIB}/lets-build.gif`} alt="Let's build" />,

  // 8 — CTA
  <CtaSlide
    key="cta"
    sub="and I'll send you my guides so you can get started."
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="AI getting started guides"
    previewPlain
  />,
];

export default function SlackCpoInternshipDeckPage() {
  return <Deck slides={slides} />;
}
