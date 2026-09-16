import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import { DualImageSlide, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Get Claude to Self-Improve Every Week",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — The most useful AI habit is also the easiest to skip. It makes Claude or ChatGPT smarter every time you use it and only takes 10 seconds.
  <Fragment key="hook">
    <ImageSlide
      src={`${LIB}/growth-loop.png`}
      alt="The Growth Loop: input feeds action, action feeds output, output feeds back into input"
    />
    <Notes>
      The most useful AI habit is also the easiest to skip. It makes Claude or ChatGPT smarter every
      time you use it, and it only takes 10 seconds.
    </Notes>
  </Fragment>,

  // 2 — This is a similar system to what the founder of Claude Code Boris Cherny and Andrej Karpathy advocate for in the thinking behind using Loops.
  <Fragment key="boris-karpathy">
    <DualImageSlide
      left={{
        src: `${LIB}/boris-cherny.jpeg`,
        alt: "Boris Cherny, the creator of Claude Code",
      }}
      right={{
        src: `${LIB}/andrej-karpathy.jpg`,
        alt: "Andrej Karpathy, former director of AI at Tesla and founding member of OpenAI",
      }}
    />
    <Notes>
      This is a similar system to what the founder of Claude Code, Boris Cherny, and Andrej Karpathy
      both advocate for — the thinking behind using loops.
    </Notes>
  </Fragment>,

  // 3 — Ok so the problem is you're creating new sessions with Claude every day, all rife with information about you, or context pulled from your meeting notes, emails and documents.
  <Fragment key="context-piles-up">
    <ImageSlide
      src={`${LIB}/claude-context-window.png`}
      alt="A Claude context window meter filling up — 86.5k of 1.0M tokens used — above the 5-hour and weekly plan usage bars"
    />
    <Notes>
      Okay, so the problem: you&apos;re creating new sessions with Claude every single day. All these
      sessions are rife with information about you, or context pulled from your meeting notes,
      emails and documents.
    </Notes>
  </Fragment>,

  // 4 — Claude is also building up a log of all the types of repetitive tasks you're asking it to do.
  <Fragment key="repetitive-tasks">
    <ImageSlide
      src={`${LIB}/cowork-skill-creation.png`}
      alt="A Claude prompt box reading: Help me create a skill for premeeting account intel and account post-meeting recaps"
    />
    <Notes>
      Claude is also building up a log of all the types of repetitive tasks you&apos;re asking it to
      do — the same request, over and over, week after week.
    </Notes>
  </Fragment>,

  // 5 — Given all this context build up and repetitive patterns, you want to ask Claude for patterns it sees and how it can improve its skills and build on your second brain.
  <Fragment key="second-brain">
    <ImageSlide
      src={`${LIB}/company-brain-knowledge-graph-my-agent.png`}
      alt="A knowledge-graph of hundreds of connected notes with one dense cluster circled and labeled 'My agent'"
    />
    <Notes>
      Given all that context build-up and all those repetitive patterns, you want to ask Claude for
      the patterns it sees, how it can improve its own skills, and what to add to your second brain
      so it keeps getting more context about you.
    </Notes>
  </Fragment>,

  // 6 — How you're going to do this: first create a scheduled routine.
  <Fragment key="scheduled-routine">
    <ImageSlide
      src={`${LIB}/claude-cowork.png`}
      alt="The Claude home screen with a Scheduled section listing a saved routine below the prompt box"
    />
    <Notes>
      Here&apos;s how you do it. First, create a scheduled routine.
    </Notes>
  </Fragment>,

  // 7 — Then paste in this starter prompt or a version of it. It analyzes what you do repetitively and suggests reusable skills + what to update in your company brain.
  <Fragment key="starter-prompt">
    <ImageSlide
      src={`${LIB}/claude-self-improve-weekly-routine-prompt.png`}
      alt="An Edit routine dialog named 'Weekly skills discovery' with instructions to review Linear, Notion, Slack, Gmail and session history from the past 7 days for repeatable work that should become reusable skills, triggered every Sunday at 5:00 AM EDT"
    />
    <Notes>
      Then paste in this starter prompt, or a version of it. It&apos;s meant to run an analysis of
      everything you do repetitively across your Claude chats and across all your apps, then suggest
      how that turns into reusable skills — and what information to update in your company brain.
    </Notes>
  </Fragment>,

  // 8 — Then every week, watch it send you a message with an audit and suggestions about how your AI systems can improve.
  <Fragment key="weekly-audit">
    <ImageSlide
      src={`${LIB}/5-things-you-did-this-week.gif`}
      alt="Someone in a powdered wig writing in a giant book, captioned 'List 5 things you did this week'"
    />
    <Notes>
      Then every week, watch it send you a message with an audit and suggestions on how your AI
      systems can improve.
    </Notes>
  </Fragment>,

  // 9 — I have a full guide about this AND how to create your own AI second brain. Comment MIKA and I'll send it over.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for the full guide"
      preview={`${LIB}/ai-guides-preview.png`}
      previewAlt="The AI Guides page on mikareyes.com"
    />
    <Notes>
      I have a full guide about this, and about how to create your own AI second brain so your
      systems compound, build leverage, and help you become time-rich. Comment MIKA and I&apos;ll
      send it over.
    </Notes>
  </Fragment>,
];

export default function ClaudeSelfImproveWeeklyDeckPage() {
  return <Deck slides={slides} />;
}
