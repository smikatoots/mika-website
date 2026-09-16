import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "I Built Google Docs for Claude and Codex" };

const LIB = "/decks/_library";

/** Full-slide autoplaying muted video loop. Mirrors ImageSlide's image-only shape
 *  so the video and image beats read as one set. */
function VideoSlide({ src, maxWidth }: { src: string; maxWidth?: string }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center px-6 py-10 sm:px-12 sm:py-12">
      <div className="relative flex max-h-[80vh] w-full flex-1 items-center justify-center">
        <video
          src={src}
          data-autoplay
          autoPlay
          loop
          muted
          playsInline
          className={`max-h-[80vh] w-full rounded-2xl object-contain shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)] ${maxWidth ?? ""}`}
        />
      </div>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — I can see your docs are written by AI and so can everyone else. Here's a skill I use everyday so I can revise my AI drafts just like a Google Doc.
  <Fragment key="github-stars">
    <ImageSlide
      src={`${LIB}/human-review-github-stars.png`}
      alt="The Human Review GitHub repo with 1.3k stars and 101 forks, described as a visual tool to edit HTML and Markdown files and leave comments like a Google Doc"
    />
    <Notes>
      I can see your docs are written by AI and so can everyone else. Here&apos;s a skill I use
      everyday so I can revise my AI drafts just like a Google Doc.
    </Notes>
  </Fragment>,

  // 2 — I'm Mika Reyes. Ex-LinkedIn, founder of an AI startup, raised $5M and sold my first one. I edit A LOT of docs with AI.
  <Fragment key="credibility">
    <ImageSlide
      src={`${LIB}/mika-linkedin-hero.png`}
      alt="Mika Reyes' LinkedIn profile, Founder and CEO, with a banner of Forbes 30 Under 30, Tatler Gen.T, TechCrunch and Tech in Asia press logos"
    />
    <Notes>
      I&apos;m Mika Reyes. I&apos;m an ex-LinkedIn founder of an AI startup. I raised $5M and sold
      my first one. And as a founder and creator, I edit A LOT of docs with AI — PRDs, scripts, my
      Substack.
    </Notes>
  </Fragment>,

  // 3 — I keep saying "edit this one specific line" and it edits THE ENTIRE THING instead.
  <Fragment key="the-pain">
    <ImageSlide
      src={`${LIB}/human-review-chat-instructions.png`}
      alt="A Claude Code prompt box with a line-level edit request typed into it, above a diff badge reading plus 349, minus 10"
    />
    <Notes>
      But I have to keep saying &quot;edit this one specific line&quot; that I then copy-paste, and
      it ends up editing THE ENTIRE THING instead. I wanted a Google Doc-like experience for editing
      HTML and markdown files.
    </Notes>
  </Fragment>,

  // 4 — My friend Peter Yang built a free tool called Human Review.
  <Fragment key="human-review">
    <ImageSlide
      src={`${LIB}/human-review-readme.png`}
      alt="The Human Review project page: edit HTML and Markdown files directly, leave comments like a Google Doc, and send all your feedback to your AI agent at once"
    />
    <Notes>
      Luckily my friend Peter Yang built a free tool called Human Review that lets you edit directly
      on Claude or Codex.
    </Notes>
  </Fragment>,

  // 5a — It'll spin up a page where you can highlight text or images and leave a comment.
  <Fragment key="invoke">
    {/* 372x124 source — capped at 2x so it reads on video without turning to mush. */}
    <VideoSlide src={`${LIB}/human-review-invoke.mp4`} maxWidth="max-w-[744px]" />
    <Notes>
      It&apos;ll spin up a page where you can highlight text or images and leave a comment.
    </Notes>
  </Fragment>,

  // 5b — Just like Figma or a Google Doc. Hit send, every edit and comment goes to your agent in one batch, it updates the file and reloads.
  <Fragment key="comments-send">
    <VideoSlide src={`${LIB}/human-review-comments-send.mp4`} />
    <Notes>
      Just like a Figma or Google Doc. Hit send, and every edit and comment goes to your agent in one
      batch. It updates the file and reloads so you can review it again right away. It&apos;s the
      exact workflow I use now for my PRDs and my Substack drafts.
    </Notes>
  </Fragment>,

  // 6 — CTA
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for my guide" />
    <Notes>
      Comment MIKA for my guide, and tell me the first doc you&apos;d send through this.
    </Notes>
  </Fragment>,
];

export default function HumanReviewDeckPage() {
  return <Deck slides={slides} />;
}
