import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  HL,
  ImageSlide,
  PointSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Claude Corps Fellowship — Part 2",
};

const LIB = "/decks/_library";

/**
 * 4 fellowship logos in a clean 2×2 grid — no borders, no frames, just logos
 * on white with generous spacing.
 */
function FellowshipLogosGrid() {
  const logos = [
    { src: `${LIB}/f30u30-logo.png`, alt: "Forbes 30 Under 30 logo" },
    { src: `${LIB}/spc-fellowship-logo.jpg`, alt: "South Park Commons logo" },
    { src: `${LIB}/kleiner-perkins-logo.png`, alt: "Kleiner Perkins logo" },
    { src: `${LIB}/freeman-logo.png`, alt: "Freeman scholarship logo" },
  ];
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center bg-white px-10 py-12 sm:px-16 sm:py-16">
      <div className="grid w-full max-w-4xl grid-cols-2 gap-10 sm:gap-14">
        {logos.map((logo, i) => (
          <div
            key={logo.src}
            className="deck-pop relative flex items-center justify-center"
            style={{
              animationDelay: `${0.08 + i * 0.1}s`,
              height: "clamp(160px, 28vw, 280px)",
            }}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 40vw, 22rem"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** One entry per spoken beat. Order matches approved slide plan. */
const slides: React.ReactNode[] = [
  // 1 — cover
  <ImageSlide key="cover" src={`${LIB}/claude-corps-hero.webp`} alt="Claude Corps Fellowship" />,

  // 2 — four fellowship logos, clean 2×2 grid
  <FellowshipLogosGrid key="fellowship-logos" />,

  // 3 — "3 more tips to stand out"
  <TextSlide key="3-more-tips">
    <HL>3 more</HL> tips to stand out
  </TextSlide>,

  // 4 — Tip 1: lean into what makes you different
  <PointSlide key="lean-different" number="" emoji="🧬">
    Lean into what makes you <HL delay={0.4}>different</HL>
  </PointSlide>,

  // 5 — doctor-with-patient image
  <ImageSlide
    key="doctor-patient"
    src={`${LIB}/doctor-with-patient.jpg`}
    alt="Doctor with patient — your background is your edge."
  />,

  // 6 — nonprofits image with caption header
  <ImageSlide
    key="nonprofits"
    src={`${LIB}/claude-corps-nonprofits.png`}
    alt="Claude Corps nonprofit partners."
    caption={
      <>
        2. Pick your <A>nonprofit first</A>, work backwards
      </>
    }
  />,

  // 7 — "fellow 🤝 hosts"
  <TextSlide key="fellow-hosts" display>
    fellow<br />🤝<br />hosts
  </TextSlide>,

  // 8 — Tip 3: fast learner is your edge
  <PointSlide key="fast-learner" number="" emoji="⚡">
    <HL>Fast learner</HL> is your edge, not a disclaimer
  </PointSlide>,

  // 9 — flash speed meme
  <ImageSlide
    key="flash-speed"
    src={`${LIB}/flash-speed-meme.gif`}
    alt="Flash speed meme — fast learner energy."
  />,

  // 10 — CTA
  <CtaSlide
    key="cta"
    prompt="Want 4 more tips?"
    headline={<span className="whitespace-nowrap">Follow + comment MIKA</span>}
    size="md"
  />,
];

export default function ClaudeCorpsPart2Page() {
  return <Deck slides={slides} />;
}
