import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import type { SlideInput } from "@/components/deck/deck-slide";
import { HL, ImageSlide } from "@/components/deck/slide-parts";
import {
  ListSlide,
  Notes,
  OverlaySlide,
} from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Email Written by AI — 4 Skills to Fix It",
};

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — I can see your email was written with AI and so can everyone else. Here are 4 AI skills to fix that.
  <Fragment key="cover">
    {/* Emoji-only cover: no words, two centred lines. Sized in fixed px (the
        canvas is a fixed 1440x810 that Reveal scales) rather than the type
        scale, which is tuned for text. */}
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-6 leading-none">
      <div className="text-[210px]">✉️ 🤖</div>
      <div className="text-[210px]">☠️☠️☠️</div>
    </div>
    <Notes>
      I can see your email was written with AI and so can everyone else. Here
      are 4 AI skills to fix that.
    </Notes>
  </Fragment>,

  // 2 — I'm Mika Reyes, an ex-LinkedIn founder of an AI startup. I raised $5M dollars and sold my first one.
  <Fragment key="credibility">
    <ImageSlide
      src={`${LIB}/mika-linkedin-hero.png`}
      alt="Mika Reyes' LinkedIn profile: Founder & CEO, Forbes 30 Under 30, Tatler GenT, KP Fellow"
    />
    <Notes>
      I&apos;m Mika Reyes, an ex-LinkedIn founder of an AI startup. I raised $5M
      dollars and sold my first one.
    </Notes>
  </Fragment>,

  // 3 — We've all seen the tells of a classic AI email, it's X not Y, perfectly written jargon, em dashes.
  <Fragment key="tells">
    <ListSlide
      heading={
        <>
          The <HL>tells</HL>
        </>
      }
      items={[
        <>It&apos;s not X, it&apos;s Y</>,
        <>Perfectly written jargon</>,
        <>Em dashes everywhere</>,
      ]}
      reveal
    />
    <Notes>
      We&apos;ve all seen the tells of a classic AI email, it&apos;s X not Y,
      perfectly written jargon, em dashes.
    </Notes>
  </Fragment>,

  // 4 — The fix isn't to stop using AI entirely because it can accelerate our workflows and make us timerich but to use it with a mix of the right human flavor, skills and judgment. I use these 4 AI workflows and skills to fix it.
  {
    key: "fix",
    background: { image: `${LIB}/human-vs-ai.gif`, opacity: 0.55 },
    content: (
      <Fragment>
        <OverlaySlide>
          Keep the AI. Add <HL>human judgment</HL>.
        </OverlaySlide>
        <Notes>
          The fix isn&apos;t to stop using AI entirely because it can accelerate
          our workflows and make us timerich but to use it with a mix of the
          right human flavor, skills and judgment. I use these 4 AI workflows
          and skills to fix it.
        </Notes>
      </Fragment>
    ),
  },

  // 5 — First, the humanizer skill. It specifically looks for the patterns in that Wikipedia page and removes all of them.
  <Fragment key="humanizer">
    <ImageSlide
      src={`${LIB}/humanize-ai-text-humanizer-skill.png`}
      alt="The Humanizer skill: Remove AI Writing Patterns, based on Wikipedia's Signs of AI writing page"
      caption={
        <>
          1 · <HL>Humanizer</HL>
        </>
      }
    />
    <Notes>
      First, the humanizer skill. It specifically looks for the patterns in that
      Wikipedia page and removes all of them.
    </Notes>
  </Fragment>,

  // 6 — Second, no AI slop from my friend Peter Yang. It removes AI patterns, but also preserves your natural voice.
  <Fragment key="no-ai-slop">
    <ImageSlide
      src={`${LIB}/you-have-taste.gif`}
      alt="Gilmore Girls: &quot;well, you have exquisite taste&quot;"
      caption={
        <>
          2 · <HL>No AI Slop</HL>
        </>
      }
    />
    <Notes>
      Second, no AI slop from my friend Peter Yang. It removes AI patterns, but
      also preserves your natural voice.
    </Notes>
  </Fragment>,

  // 7 — 3rd, also from Peter, human-review skill. You can review markdown files when reviewing first drafts just like a Google Doc.
  <Fragment key="human-review">
    <ImageSlide
      src={`${LIB}/human-review-chat-instructions.png`}
      alt="Human Review: leaving inline edits and comments on a draft, then sending them to the agent"
      caption={
        <>
          3 · <HL>Human Review</HL>
        </>
      }
    />
    <Notes>
      3rd, also from Peter, human-review skill. You can review markdown files
      when reviewing first drafts just like a Google Doc.
    </Notes>
  </Fragment>,

  // 8 — Fourth, content research writer. It does research to help you write better content and also maintains your voice in writing.
  <Fragment key="content-research-writer">
    <ImageSlide
      src={`${LIB}/academic.gif`}
      alt="Community: &quot;I am an academic&quot;"
      caption={
        <>
          4 · <HL>Content Research Writer</HL>
        </>
      }
    />
    <Notes>
      Fourth, content research writer. It does research to help you write better
      content and also maintains your voice in writing.
    </Notes>
  </Fragment>,

  // 9 — CTA
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for all 4 skills" />
    <Notes>
      Comment MIKA and I&apos;ll send you all 4 skills plus my step by step
      guide.
    </Notes>
  </Fragment>,
];

export default function EmailWrittenByAiDeckPage() {
  return <Deck slides={slides} />;
}
