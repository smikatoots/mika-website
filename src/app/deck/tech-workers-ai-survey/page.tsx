import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide, PointSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "3 takeaways from the 2026 tech workers AI survey",
};

const LIB = "/decks/_library";

// ─── Co-located components ───────────────────────────────────────────────────

/** Video slide: an autoplaying muted loop that fills the slide (no caption).
 *  Mirrors ImageSlide's image-only shape so image and video slides read as a set. */
function VideoSlide({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <div className="relative flex w-full flex-1 items-center justify-center">
        <video
          src={src}
          aria-label={alt}
          autoPlay
          loop
          muted
          playsInline
          className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
        />
      </div>
    </div>
  );
}

// ─── Slides ──────────────────────────────────────────────────────────────────

const slides: React.ReactNode[] = [
  // 1 — A survey of tech workers showed AI has caused burnout to increase across tech EXCEPT for this one group. 3 takeaways.
  <ImageSlide
    key="survey-cover"
    src={`${LIB}/lennys-2026-tech-workers-survey.webp`}
    alt="Lenny's Newsletter: How tech workers are feeling in 2026"
  />,

  // 2 — First, the real fear from AI is not job loss.
  <PointSlide key="real-fear" emoji="😰">
    The real fear isn&apos;t <HL>job loss.</HL>
  </PointSlide>,

  // 3 — Only 22% worry about losing their job to AI.
  <TextSlide key="fear-job">
    <HL>22%</HL> fear losing job to AI
  </TextSlide>,

  // 4 — Meanwhile 51% are scared of doing more for the same pay.
  <ImageSlide
    key="fear-more-work"
    src={`${LIB}/lennys-overworked.webp`}
    alt="Lenny's survey: fear of being overworked for the same pay"
  />,

  // 5 — Second, burnout has increased from last year (45% → 56%).
  <ImageSlide
    key="burnout-rise"
    src={`${LIB}/lennys-burnout.webp`}
    alt="Lenny's survey: serious burnout rose year over year"
  />,

  // 6 — Third, not all groups are burning out — founders + small companies.
  <ImageSlide
    key="least-burnt-out"
    src={`${LIB}/lennys-small-company-happy.webp`}
    alt="Lenny's survey: founders and small-company workers are the least burnt out"
    caption="Least burnt out: founders + workers in small companies"
  />,

  // 7 — The reason isn't money. It's freedom and ownership. (looping video)
  <VideoSlide key="mika-speaking" src={`${LIB}/mika-speaking.mp4`} alt="Mika speaking" />,

  // 8 — Comment MIKA for a link to the survey.
  <CtaSlide
    key="cta"
    prompt=""
    headline={
      <>
        Follow + Comment <HL>MIKA</HL> for the link
      </>
    }
    headlinePlain
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
