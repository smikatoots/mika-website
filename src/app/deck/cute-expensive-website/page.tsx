import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { deckType } from "@/components/deck/deck-styles";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How to make your website look cute and expensive",
};

const LIB = "/decks/_library";

// ─── Co-located components ───────────────────────────────────────────────────

/** Two autoplaying muted loops side by side (no caption).
 *  Mirrors DualImageSlide's image-only shape so video and image slides read as a set. */
function DualVideoSlide({
  left,
  right,
}: {
  left: { src: string; alt: string };
  right: { src: string; alt: string };
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-8 sm:px-10 sm:py-10">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <div className="flex min-h-0 w-full items-center justify-center sm:h-full sm:flex-1">
          <video
            src={left.src}
            aria-label={left.alt}
            autoPlay
            loop
            muted
            playsInline
            className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
          />
        </div>
        <div className="flex min-h-0 w-full items-center justify-center sm:h-full sm:flex-1">
          <video
            src={right.src}
            aria-label={right.alt}
            autoPlay
            loop
            muted
            playsInline
            className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Slides ──────────────────────────────────────────────────────────────────

const slides: React.ReactNode[] = [
  // 1 — Here's how you can make your website look like THIS. Or THIS.
  <DualVideoSlide
    key="reference-sites"
    left={{ src: `${LIB}/duolingo-homepage.mp4`, alt: "Duolingo homepage" }}
    right={{ src: `${LIB}/family-homepage.mp4`, alt: "Family homepage" }}
  />,

  // 2 — At my first startup we paid a design agency ten thousand dollars just to redesign our website.
  <TextSlide key="ten-thousand" display>
    <span className="line-through decoration-[var(--deck-accent)] decoration-[0.08em]">
      $10,000
    </span>
  </TextSlide>,

  // 3 — First, make a brand and design MD files.
  <ImageSlide
    key="brand-md"
    src={`${LIB}/brand-md.png`}
    alt="A brand.md file holding colors, fonts, and voice"
    captionSize={deckType.statementSm}
    caption={
      <>
        Make your <A>brand + design</A> files
      </>
    }
  />,

  // 4 — Then go to Refero Design and find a website you actually like the look of.
  <ImageSlide
    key="refero"
    src={`${LIB}/refero-browse-grid.png`}
    alt="Refero Design browse grid of website screenshots"
    captionSize={deckType.statementSm}
    caption={
      <>
        Find a site you love on <A>Refero</A>
      </>
    }
  />,

  // 5 — Then get their design.md file and put it into your brand guidelines.
  <ImageSlide
    key="design-md"
    src={`${LIB}/duoling-design-md.png`}
    alt="Duolingo design.md file pasted into the brand guidelines"
    captionSize={deckType.statementSm}
    caption={
      <>
        Paste its <A>design.md</A>
      </>
    }
  />,

  // 6 — Then, when you ask Claude or Codex to make a new landing page, it reads that file first.
  <ImageSlide
    key="design-prompt"
    src={`${LIB}/design-prompt-on-claude.png`}
    alt="Prompting Claude to redesign the website using the design file"
    captionSize={deckType.statementSm}
    caption={
      <>
        Create your <A>website!</A>
      </>
    }
  />,

  // 7 — Comment MIKA for my full guide, and tell me what website you'd use this on!
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL> for the full guide
      </>
    }
    headlinePlain
    size="sm"
    sub="And tell me what website you'd use this on"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="mikareyes.com AI guides preview"
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
