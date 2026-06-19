import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { deckType } from "@/components/deck/deck-styles";
import { A, HL, ImageSlide, PointSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "OpenClaw vs Hermes vs Paperclip",
};

const LIB = "/decks/_library";

/** A single wordmark logo, sized large. */
function VsLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-28 w-60 flex-none sm:h-44 sm:w-96">
      <Image src={src} alt={alt} fill sizes="24rem" className="object-contain" />
    </div>
  );
}

/** The three tools as big wordmarks in a row with bold "vs." between each. */
function VsLogosSlide() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center px-8 py-12">
      <div className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-10 sm:gap-x-12">
        <span className="deck-pop" style={{ animationDelay: "0.05s" }}>
          <VsLogo src={`${LIB}/openclaw-logo.png`} alt="OpenClaw logo" />
        </span>
        <span
          className={`deck-pop deck-accent font-extrabold tracking-tight ${deckType.statement}`}
          style={{ animationDelay: "0.15s" }}
        >
          vs.
        </span>
        <span className="deck-pop" style={{ animationDelay: "0.25s" }}>
          <VsLogo src={`${LIB}/hermes-logo.svg`} alt="Hermes logo" />
        </span>
        <span
          className={`deck-pop deck-accent font-extrabold tracking-tight ${deckType.statement}`}
          style={{ animationDelay: "0.35s" }}
        >
          vs.
        </span>
        <span className="deck-pop" style={{ animationDelay: "0.45s" }}>
          <VsLogo src={`${LIB}/paperclip-logo.png`} alt="Paperclip logo" />
        </span>
      </div>
    </div>
  );
}

/**
 * The three logos revealed one at a time (OpenClaw → Hermes → Paperclip) so
 * Mika can talk through which one fits which need. Render one slide per step,
 * incrementing `current`.
 */
function LogoRevealSlide({ current }: { current: number }) {
  const logos = [
    { src: `${LIB}/openclaw-logo.png`, alt: "OpenClaw logo" },
    { src: `${LIB}/hermes-logo.svg`, alt: "Hermes logo" },
    { src: `${LIB}/paperclip-logo.png`, alt: "Paperclip logo" },
  ];
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-x-10 gap-y-8 px-8 py-12 sm:gap-x-16">
      {logos.map((logo, i) => {
        const reached = i <= current;
        const isNew = i === current;
        return (
          <div
            key={logo.src}
            className={`relative h-24 w-52 flex-none sm:h-36 sm:w-80 ${
              reached ? (isNew ? "deck-pop" : "") : "opacity-10"
            }`}
            style={isNew ? { animationDelay: "0.05s" } : undefined}
          >
            <Image src={logo.src} alt={logo.alt} fill sizes="20rem" className="object-contain" />
          </div>
        );
      })}
    </div>
  );
}

/**
 * One entry per spoken beat. Order matters — Mika advances with the arrow keys
 * while recording.
 */
const slides: React.ReactNode[] = [
  // 1 — "OpenClaw vs Hermes vs Paperclip."
  <VsLogosSlide key="vs-logos" />,

  // 2 — "What's the difference?"
  <TextSlide key="difference" display>
    What&rsquo;s the <HL>difference?</HL>
  </TextSlide>,

  // 3 — "First, OpenClaw is channel coverage."
  <PointSlide key="openclaw-point" number="01" emoji="🦀">
    OpenClaw = <HL delay={0.4}>channel coverage</HL>
  </PointSlide>,

  // 4 — "One assistant across roughly 25 apps."
  <ImageSlide
    key="messaging-apps"
    src={`${LIB}/messaging-app-logos.webp`}
    alt="Logos of WhatsApp, Slack, Telegram, iMessage and other messaging apps."
    caption={
      <>
        One assistant across <A>~25 apps</A>
      </>
    }
  />,

  // 5 — "Second, Hermes learns and loops."
  <PointSlide key="hermes-point" number="02" emoji="🪽">
    Hermes = <HL delay={0.4}>learns &amp; loops</HL>
  </PointSlide>,

  // 6 — "It remembers across sessions." (image only)
  <ImageSlide
    key="hermes-memory"
    src={`${LIB}/hermes-agent-memory.webp`}
    alt="Hermes agent keeping persistent memory across sessions."
  />,

  // 7 — "Third, Paperclip is an agent manager."
  <PointSlide key="paperclip-point" number="03" emoji="📎">
    Paperclip = <HL delay={0.4}>agent manager</HL>
  </PointSlide>,

  // 8 — "Agents are employees. Paperclip is the company."
  <TextSlide key="company">
    Agents = employees.
    <br />
    Paperclip = <HL delay={0.5}>the company</HL>.
  </TextSlide>,

  // 9 — "Don't set up all three."
  <TextSlide key="dont-all-three">
    Don&rsquo;t set up{" "}
    <span className="line-through decoration-[var(--deck-accent)] decoration-4">
      all three
    </span>
    .
  </TextSlide>,

  // 10 — "Living in your messages? OpenClaw."
  <LogoRevealSlide key="reveal-0" current={0} />,

  // 11 — "A long project to remember? Hermes."
  <LogoRevealSlide key="reveal-1" current={1} />,

  // 12 — "Juggling several agents? Paperclip."
  <LogoRevealSlide key="reveal-2" current={2} />,

  // 13 — CTA
  <CtaSlide key="cta" sub="for my guide on these tools." />,
];

export default function OpenClawHermesPaperclipDeckPage() {
  return <Deck slides={slides} />;
}
