import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "How I fixed my desktop anxiety with Claude",
};

const LIB = "/decks/_library";

// ─── Co-located components ───────────────────────────────────────────────────

/** Text + video slide: an optional caption on top, an autoplaying muted loop
 *  below. Mirrors ImageSlide's shape so image and video steps read as a set. */
function VideoSlide({
  src,
  caption,
}: {
  src: string;
  caption?: React.ReactNode;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-3 px-6 py-10 sm:gap-5 sm:px-12 sm:py-12">
      {caption ? (
        <h2
          className={`deck-rise text-center ${headingBase} ${deckType.statement}`}
          style={{ animationDelay: "0.05s" }}
        >
          {caption}
        </h2>
      ) : null}
      <div className="relative flex max-h-[70vh] w-full flex-1 items-center justify-center">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}

// ─── Slides ──────────────────────────────────────────────────────────────────

const slides: React.ReactNode[] = [
  // 1 — This is how I got my downloads from this…
  <ImageSlide
    key="downloads-before"
    src={`${LIB}/desktop-anxiety-downloads.png`}
    alt="Cluttered, messy Downloads folder full of loose files"
  />,

  // 2 — …to this, using Claude
  <ImageSlide
    key="downloads-after"
    src={`${LIB}/desktop-anxiety-downloads-fixed.png`}
    alt="Organized Downloads folder after Claude sorted it into folders"
  />,

  // 3 — Just looking at my desktop was giving me so much anxiety
  <TextSlide key="anxiety" emoji="😩">
    My desktop gave me so much <HL>anxiety</HL>
  </TextSlide>,

  // 4 — My personal first AHA moment
  <TextSlide key="aha" emoji="✨">
    My first real <HL>AHA</HL> moment.
  </TextSlide>,

  // 5 — Hi, I'm Mika
  <ImageSlide
    key="mika"
    src={`${LIB}/mika-header.jpeg`}
    alt="Mika, camera-facing"
    caption={
      <>
        Hi I&apos;m <A>Mika</A>! 👋
      </>
    }
  />,

  // 6 — Time-rich workflows
  <TextSlide key="time-rich" emoji="⏳">
    <HL>time-rich</HL> workflows
  </TextSlide>,

  // 7 — Start in Claude Cowork (or Code)
  <ImageSlide
    key="step-cowork"
    src={`${LIB}/claude-cowork.png`}
    alt="Claude Cowork interface"
    caption="Start in Claude Cowork (or Code)"
  />,

  // 8 — Select the right project folder
  <VideoSlide
    key="step-folder"
    src={`${LIB}/desktop-anxiety-prompt.mov`}
    caption="Select the right project folder"
  />,

  // 9 — Give it your prompt
  <VideoSlide
    key="step-prompt"
    src={`${LIB}/desktop-anxiety-prompt.mov`}
    caption="Give it your prompt"
  />,

  // 10 — Let Claude cook
  <VideoSlide
    key="step-cook"
    src={`${LIB}/desktop-anxiety-wip.mov`}
    caption="Let Claude cook"
  />,

  // 11 — Review Claude's work
  <VideoSlide
    key="step-review"
    src={`${LIB}/desktop-anxiety-folders.mov`}
    caption="Review Claude's work"
  />,

  // 12 — Want my prompt? CTA
  <CtaSlide
    key="cta"
    prompt={null}
    headline="Want my prompt?"
    size="md"
    sub={
      <>
        Follow &amp; comment <HL>MIKA</HL> below.
      </>
    }
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
