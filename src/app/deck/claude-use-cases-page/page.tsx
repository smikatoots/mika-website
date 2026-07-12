import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "The Claude Use Cases Page" };

const filterSteps: React.ReactNode[] = [
  <>
    The <HL>Use Cases page</HL> — a live library of real examples.
  </>,
  <>
    Filter by <HL>industry</HL>.
  </>,
  <>
    Filter by <HL>feature</HL>.
  </>,
];

const slides: React.ReactNode[] = [
  // 1 — There's a free page Anthropic built that shows what you can do with Claude
  //     (fallback: claude-use-cases-hero.png missing → title-only cover)
  <CoverSlide
    key="cover"
    title={
      <>
        There&apos;s a <HL>free page</HL> Anthropic built that shows you exactly
        what you can do with Claude — and <HL>barely anyone knows</HL> it exists.
      </>
    }
  />,

  // 2 — A free resource straight from Claude, so why not use it
  <TextSlide key="free-resource">
    A <HL>free resource</HL>, straight from Claude — so <HL>why not use it</HL>?
  </TextSlide>,

  // 3 — It's called the Use Cases page, a live library of real examples
  //     (fallback: claude-use-cases-grid.png missing → steps without visual)
  <StepsSlide key="step-library" steps={filterSteps} current={0} />,

  // 4 — Filter it by industry
  //     (fallback: claude-use-cases-industry-filter.png missing → steps without visual)
  <StepsSlide key="step-industry" steps={filterSteps} current={1} />,

  // 5 — Filter it by feature
  //     (fallback: claude-use-cases-feature-filter.png missing → steps without visual)
  <StepsSlide key="step-feature" steps={filterSteps} current={2} />,

  // 6 — Comment MIKA & I'll send you the link
  //     (fallback: preview claude-use-cases-hero.png missing → text-only CTA)
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
