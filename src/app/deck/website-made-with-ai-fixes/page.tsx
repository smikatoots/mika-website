import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { deckType, headingBase } from "@/components/deck/deck-styles";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "I Can See Your Website Was Made With AI",
};

const LIB = "/decks/_library";

/**
 * Autoplaying muted loop with the same header treatment as `ImageSlide`'s
 * caption, so the video beat reads as part of the same set. Height is capped in
 * fixed px (not `vh`, which keys off the window and fights Reveal's scaling of
 * the fixed 1440x810 canvas).
 */
function VideoSlide({
  src,
  ariaLabel,
  caption,
}: {
  src: string;
  ariaLabel: string;
  caption?: React.ReactNode;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      {caption ? (
        <h2
          className={`deck-rise mb-5 text-center sm:mb-7 ${headingBase} ${deckType.statementSm}`}
        >
          {caption}
        </h2>
      ) : null}
      <video
        src={src}
        aria-label={ariaLabel}
        data-autoplay
        autoPlay
        loop
        muted
        playsInline
        className="max-h-[560px] w-auto rounded-lg object-contain"
      />
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — I can see your website was made with AI and so can everyone else. Let's fix it
  //     with these 4 websites and skills to make it look impeccably better.
  <Fragment key="ai-tells">
    <ImageSlide
      src={`${LIB}/website-made-with-ai-fixes-ai-tells-before-after.png`}
      alt="A before-and-after slider over an AI-generated landing page card, with callouts labelling the giveaways: AI kicker, italic serif, side-tab border, and AI beige"
    />
    <Notes>
      I can see your website was made with AI and so can everyone else.
      Let&apos;s fix it with these 4 websites and skills to make it look
      impeccably better. And the last one is the most insane one that I just
      discovered.
    </Notes>
  </Fragment>,

  // 2 — First is this website with an impeccable skill. It detects and removes AI slop
  //     from existing websites with just one command.
  <Fragment key="impeccable">
    <ImageSlide
      src={`${LIB}/website-made-with-ai-fixes-impeccable-detector.png`}
      alt="The Impeccable site: Detects and removes AI slop, with 61 checks and a detector toggle flagging AI beige, soft rounded cards, eyebrow chips, cards in cards and numbered section labels"
      captionSize={deckType.statementSm}
      caption="Impeccable"
    />
    <Notes>
      First is this website with an impeccable skill. It detects and removes AI
      slop from existing websites with just one command.
    </Notes>
  </Fragment>,

  // 3 — Second is Refero Design. It has a library of websites from companies like Apple
  //     or Mercury, and it gives design.md files that let you borrow their styles.
  <Fragment key="refero">
    <ImageSlide
      src={`${LIB}/website-made-with-ai-fixes-refero-styles.png`}
      alt="The Refero Styles library: cards for Apple, Origin Financial, Letters, Ui, Modal and Mercury, each with a one-line description of its visual style"
      captionSize={deckType.statementSm}
      caption="Refero"
    />
    <Notes>
      Second is Refero Design. It has a library of a bunch of different websites
      from companies like Apple or Mercury, and it gives design.md files that
      allow you to borrow the styles from these websites and make them your own.
    </Notes>
  </Fragment>,

  // 4 — Next is the taste skill, which also strips out AI slop as a frontend framework
  //     for AI agents.
  <Fragment key="taste-skill">
    <ImageSlide
      src={`${LIB}/website-made-with-ai-fixes-taste-skill.png`}
      alt="Taste Skill: the anti-slop frontend framework for AI agents, open-source skill files that stop Cursor, Claude Code, Codex, Gemini CLI, v0 and Lovable from generating generic frontends"
      captionSize={deckType.statementSm}
      caption="Taste"
    />
    <Notes>
      Next is the taste skill, which also strips out AI slop as a frontend
      framework for AI agents.
    </Notes>
  </Fragment>,

  // 5 — Lastly, there's ThreeUI with 160 3D components and landing pages. It's freakin'
  //     insane and SO COOL.
  <Fragment key="threeui">
    <VideoSlide
      src={`${LIB}/three-ui.mp4`}
      ariaLabel="A ThreeUI 3D component demo running in the browser"
      caption="ThreeUI"
    />
    <Notes>
      Lastly, there&apos;s ThreeUI with 160 3D components and landing pages.
      It&apos;s freakin&apos; insane and SO COOL.
    </Notes>
  </Fragment>,

  // 6 — Btw if you don't follow MengTo on Twitter, you should!
  <Fragment key="mengto">
    <ImageSlide
      src={`${LIB}/website-made-with-ai-fixes-mengto-handle.png`}
      alt="Meng To's verified Twitter identity: his avatar, his name with a blue check, and the handle @MengTo"
    />
    <Notes>Btw if you don&apos;t follow MengTo on Twitter, you should!</Notes>
  </Fragment>,

  // 7 — If you want links to all of these, comment MIKA and I'll send them over!
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for all 4 links" />
    <Notes>
      If you want links to all of these, comment MIKA and I&apos;ll send them
      over!
    </Notes>
  </Fragment>,
];

export default function WebsiteMadeWithAiFixesDeckPage() {
  return <Deck slides={slides} />;
}
