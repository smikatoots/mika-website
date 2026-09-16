import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import type { SlideInput } from "@/components/deck/deck-slide";
import { A, DualImageSlide, ImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Get Claude to Reflect: The 10-Second Habit That Compounds",
};

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — Hook: the most useful Claude habit is also the easiest to skip.
  <Fragment key="hook">
    <ImageSlide
      src={`${LIB}/growth-loop.png`}
      alt="The Growth Loop: input feeds action, action feeds output, output feeds back into input"
    />
    <Notes>
      The most useful Claude habit is also the easiest to skip. It makes Claude
      smarter every time you use it, and it only takes 10 seconds.
    </Notes>
  </Fragment>,

  // 2 — Same system Boris Cherny and Andrej Karpathy advocate for, in the thinking behind Loops.
  <Fragment key="loops-authority">
    <DualImageSlide
      left={{
        src: `${LIB}/boris-cherny.jpeg`,
        alt: "Boris Cherny, the creator of Claude Code",
      }}
      right={{
        src: `${LIB}/andrej-karpathy.jpg`,
        alt: "Andrej Karpathy, former head of AI at Tesla and founding member of OpenAI",
      }}
    />
    <Notes>
      This is a similar system to what the founder of Claude Code, Boris Cherny,
      and Andrej Karpathy advocate for in the thinking behind using loops.
    </Notes>
  </Fragment>,

  // 3 — Every session is rife with memory about you, but you can't fully control it and it goes away.
  <Fragment key="memory-goes-away">
    <ImageSlide
      src={`${LIB}/reflect-prompt.png`}
      alt="The reflect prompt: asking Claude to dig through the conversation history and build a profile from evidence, covering identity, context, preferences, decisions and people, then save it to memory and to a markdown file"
    />
    <Notes>
      Every session you have with AI is rife with memory and history about you —
      your preferences, your background. But you can&apos;t fully control
      Claude&apos;s memory, and it sometimes goes away for future sessions.
      Here&apos;s how to fix it.
    </Notes>
  </Fragment>,

  // 4 — First, paste a prompt asking Claude to reflect on your session and save it into memory.
  <Fragment key="reflect-prompt">
    <ImageSlide
      src={`${LIB}/slash-memory.gif`}
      alt="Joy from Inside Out with the caption CORE MEMORY UNLOCKING"
      maxWidth="max-w-3xl"
    />
    <Notes>
      First, paste a prompt that asks Claude to reflect on your session, so it
      digs through your chat, lists all the information in your conversations,
      and saves it into memory. You can copy my prompt at the end. But it&apos;s
      annoying to repeat yourself every time.
    </Notes>
  </Fragment>,

  // 5 — Step two: turn the prompt into a skill called "reflect".
  <Fragment key="turn-into-skill">
    <ImageSlide
      src={`${LIB}/humanize-ai-text-skill-folder-structure.png`}
      alt="A skill folder structure: a folder containing SKILL.md and examples.md"
      caption={
        <>
          Turn it into a <A>skill</A>
        </>
      }
    />
    <Notes>
      So step two is turning this into a skill. Literally just tell it
      &ldquo;please turn this prompt into a skill&rdquo; and call it
      &ldquo;reflect.&rdquo;
    </Notes>
  </Fragment>,

  // 6 — Third, advanced: save it into your AI second brain so Claude makes connections.
  <Fragment key="second-brain">
    <ImageSlide
      src={`${LIB}/company-brain-knowledge-graph-my-agent.png`}
      alt="A knowledge graph of hundreds of connected notes, with one dense purple cluster circled and labelled My agent"
      caption={
        <>
          Save it to your <A>second brain</A>
        </>
      }
    />
    <Notes>
      Third, and as an advanced option, you can also save this information in
      your AI second brain that Claude reads through, which helps it make
      connections across all the context you&apos;ve saved.
    </Notes>
  </Fragment>,

  // 7 — It's a loop because it compounds: every session makes the next prompt better.
  <Fragment key="compounding-loop">
    <ImageSlide
      src={`${LIB}/andrew-ng-3-loops-1.jpeg`}
      alt="A diagram of three chained feedback loops, each feeding the next over minutes, hours and days"
    />
    <Notes>
      It&apos;s a loop because it compounds growth. For every prompt or session,
      you make your system — and therefore every new prompt — better over time.
    </Notes>
  </Fragment>,

  // 8 — CTA: comment MIKA for the second brain guide.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for the second brain guide"
    />
    <Notes>
      I wrote a whole guide about how to create your own second brain and how to
      build this kind of system. Comment MIKA below and I&apos;ll send it over!
    </Notes>
  </Fragment>,
];

export default function GetClaudeToReflectDeckPage() {
  return <Deck slides={slides} />;
}
