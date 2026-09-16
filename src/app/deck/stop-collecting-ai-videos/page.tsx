import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import type { SlideInput } from "@/components/deck/deck-slide";
import { A, HL, ImageSlide } from "@/components/deck/slide-parts";
import { Notes, OverlaySlide } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Stop Collecting AI Videos You Never Use",
};

const LIB = "/decks/_library";

/** Full-slide autoplaying muted video loop, letterboxed on the fixed 1440x810
 *  canvas. Height is capped in fixed px (not `vh`, which keys off the window
 *  and fights Reveal's scaling) so a vertical clip stays at or below its native
 *  size instead of being upscaled. */
function VideoSlide({ src }: { src: string }) {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center">
      <video
        src={src}
        data-autoplay
        autoPlay
        loop
        muted
        playsInline
        className="max-h-[720px] w-auto object-contain"
      />
    </div>
  );
}

const slides: SlideInput[] = [
  // 1 — Mark Zuckerberg and I launched something new for you if your Saves & Bookmarks folder is full of things you never actually do anything with.
  <Fragment key="hook">
    <ImageSlide
      src={`${LIB}/mark-zuckerberg.webp`}
      alt="Mark Zuckerberg, close-up, smiling"
    />
    <Notes>
      Mark Zuckerberg and I launched something new for you if your Saves &amp;
      Bookmarks folder is full of things you never actually do anything with.
    </Notes>
  </Fragment>,

  // 2 — Mine is full of AI tips and guides that I save and just forget to put on my todo list.
  <Fragment key="saves">
    <VideoSlide src={`${LIB}/saves-and-bookmarks.MP4`} />
    <Notes>
      Mine is full of AI tips and guides that I save and just forget to put on
      my todo list.
    </Notes>
  </Fragment>,

  // 3 — First: Muse, Meta's new AI agent, can read through your Instagram saves, so you can schedule a routine that emails them to you or adds each one to your to-do list.
  <Fragment key="muse-routine">
    <ImageSlide
      src={`${LIB}/muse-ai-logo.webp`}
      alt="Muse is your personal AI agent"
      caption={
        <>
          Muse reads your <A>Instagram saves</A>
        </>
      }
    />
    <Notes>
      First — Muse, Meta&apos;s new AI agent can now read through your Instagram
      saves. So now you can schedule a routine to collect these Instagram saves
      and do things like send it to your email or add each item to your to do
      list.
    </Notes>
  </Fragment>,

  // 4 — Second: every video has a free guide, and now you can email it to yourself so it's waiting on desktop when you're in work mode.
  <Fragment key="email-guide">
    <ImageSlide
      src={`${LIB}/stop-collecting-ai-videos-email-guide-form.png`}
      alt="Send this guide to yourself — email capture box on Mika's guide page with a Send me the guide button"
      caption={
        <>
          Email the guide to <A>yourself</A>
        </>
      }
    />
    <Notes>
      Second — in almost every single video that I make, I have a free guide
      that accompanies what I&apos;m talking about to help you implement it into
      your life. This one has one too. I know a lot of you are using your phone
      to view my guides so I made it easy for you to email yourself so
      you&apos;re reminded to work on it when on desktop and work mode.
    </Notes>
  </Fragment>,

  // 5 — Third: my website is now AI-agent friendly, so you can drop the link into Claude and have it turn the guide into a skill.
  <Fragment key="guide-to-skill">
    <ImageSlide
      src={`${LIB}/ai-guides-preview.png`}
      alt="Mika's AI guides library"
      caption={
        <>
          Turn any guide into a <A>skill</A>
        </>
      }
    />
    <Notes>
      Third — I made my website much more friendly to AI agents. So now you can
      take the link, drop it into Claude, and have Claude turn it into a skill
      for you in two seconds. Claude will take whatever&apos;s inside that guide
      and help you run through the installation commands and steps.
    </Notes>
  </Fragment>,

  // 6 — I know you guys are trying to actually use AI as much as possible, not just listen to me yap about it.
  {
    key: "practitioner",
    background: { image: `${LIB}/i-am-the-practitioner.gif`, opacity: 0.55 },
    content: (
      <Fragment>
        <OverlaySlide>
          <HL>Use</HL> the AI. Don&apos;t just save it.
        </OverlaySlide>
        <Notes>
          I know you guys are trying to actually use AI as much as possible, not
          just listen to me yap about it, so hopefully this makes it easier for
          you.
        </Notes>
      </Fragment>
    ),
  },

  // 7 — I made a guide for how to do this with my guides and how to use Meta's new AI agent. Comment MIKA for those guides!
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for both guides"
      preview={`${LIB}/ai-guides-preview.png`}
      previewAlt="Mika's AI Guides page, filtered by topic"
    />
    <Notes>
      I made a guide for how to do this with my guides and how to use
      Meta&apos;s new AI agent. Comment MIKA for those guides!
    </Notes>
  </Fragment>,
];

export default function StopCollectingAiVideosDeckPage() {
  return <Deck slides={slides} />;
}
