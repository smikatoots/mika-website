import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "The Claude Use Cases Page" };

const LIB = "/decks/_library";

/** Full-slide autoplaying muted video loop (optional caption on top). */
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
      <div className="relative flex max-h-[80vh] w-full flex-1 items-center justify-center">
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}

const filtersSrc = `${LIB}/claude-use-cases-filters.mov`;

const slides: React.ReactNode[] = [
  // 1 — Homepage video (no text)
  <VideoSlide key="cover" src={`${LIB}/claude-use-cases-homepage.mov`} />,

  // 2 — A FREE resource from Anthropic
  <TextSlide key="free-resource">
    A <HL>FREE</HL> resource from Anthropic
  </TextSlide>,

  // 3 — The Use Cases page (filters video)
  <VideoSlide
    key="step-library"
    src={filtersSrc}
    caption={
      <>
        The <HL>Use Cases page</HL>
      </>
    }
  />,

  // 4 — Filter by industry (filters video)
  <VideoSlide
    key="step-industry"
    src={filtersSrc}
    caption={
      <>
        Filter by <HL>industry</HL>.
      </>
    }
  />,

  // 5 — Filter by feature (filters video)
  <VideoSlide
    key="step-feature"
    src={filtersSrc}
    caption={
      <>
        Filter by <HL>feature</HL>.
      </>
    }
  />,

  // 6 — Comment MIKA & I'll send you the link
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="and I'll send you the link to the page."
  />,
];

export default function ClaudeUseCasesPageDeck() {
  return <Deck slides={slides} />;
}
