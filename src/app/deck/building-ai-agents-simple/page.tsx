import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { deckType } from "@/components/deck/deck-styles";
import type { SlideInput } from "@/components/deck/deck-slide";
import { A, ImageSlide } from "@/components/deck/slide-parts";
import { ListSlide, Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Building AI Agents Is Stupidly Simple",
};

const LIB = "/decks/_library";

/**
 * Two stacked screenshots, each hairline-bordered so they read as separate
 * pictures rather than one continuous image.
 *
 * Co-located rather than a `DualImageSlide` prop: that template has no border
 * option and only scales its right image, and this slide needs the top one
 * scaled instead. Widths are fixed px because the canvas is a fixed 1440x810
 * that Reveal scales — `vw`/`vh` would key off the window and fight that.
 */
function BorderedStack({
  top,
  bottom,
  topWidth,
  bottomWidth,
}: {
  top: { src: string; alt: string };
  bottom: { src: string; alt: string };
  topWidth: number;
  bottomWidth: number;
}) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-6">
      {[
        { ...top, width: topWidth },
        { ...bottom, width: bottomWidth },
      ].map((img) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          style={{ width: `${img.width}px` }}
          className="h-auto rounded-lg border border-zinc-300"
        />
      ))}
    </div>
  );
}

const slides: SlideInput[] = [
  // 1 — I taught a class with 1000 signups on how to Build an AI Agent & they all came out saying, wow that was simpler than i thought.
  <Fragment key="class-proof">
    <BorderedStack
      top={{
        src: `${LIB}/building-ai-agents-simple-testimonial.png`,
        alt: "Five-star review: Awesome course on building agents and using Claude Code in general! Mika & Nick were awesome. — Ethan, COO at MOKA, Cohort 1",
      }}
      topWidth={1080}
      bottom={{
        src: `${LIB}/building-ai-agents-simple-1273-students.png`,
        alt: "Course lesson share bar showing 1,273 students enrolled",
      }}
      bottomWidth={1080}
    />
    <Notes>
      I taught a class with 1000 signups on how to build an AI agent, and they
      all came out saying, wow, that was simpler than I thought.
    </Notes>
  </Fragment>,

  // 2 — Let me help break down with analogies and in the simplest terms so you can see how easy it is too. The foundations are really not as complicated as all these AI gurus tell you.
  <Fragment key="workshop-goals">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-workshop-goals.png`}
      alt="Recording of Mika's workshop on the Goals slide: after this workshop you should have the building blocks for how to create your own agent, with a You get an AI agent meme"
    />
    <Notes>
      Let me break it down with analogies and in the simplest terms so you can
      see how easy it is too. The foundations are really not as complicated as
      all these AI gurus tell you.
    </Notes>
  </Fragment>,

  // 3 — You want to think of an AI agent as this really smart new hire that is working towards one goal. This employee knows all languages, it can follow instructions fairly well and can handle a wide variety of tasks.
  <Fragment key="smart-new-hire">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-claude-new-hire.png`}
      alt="Meme: Claude = the smart, new personal assistant hire, sitting at a desk covered in monitors, sticky notes and a six-page memo"
    />
    <Notes>
      You want to think of an AI agent as this really smart new hire that is
      working toward one goal. This employee knows all languages, it can follow
      instructions fairly well, and it can handle a wide variety of tasks.
    </Notes>
  </Fragment>,

  // 3b — But like any employee, you need to onboard them, give them context, tools and direction. You do that by offering your agent 3 things.
  <Fragment key="three-things">
    <ListSlide
      ordered
      heading={
        <>
          Give your agent <A>3 things</A>
        </>
      }
      items={["A brain", "Skills", "Tools"]}
    />
    <Notes>
      But like any employee, you need to onboard them — give them context, tools
      and direction. You do that by offering your agent three things.
    </Notes>
  </Fragment>,

  // 4 — First you give it a brain so it has context about your goals and about you and the business.
  <Fragment key="brain">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-agent-brain-graph.png`}
      alt="A dense network graph of connected nodes with one purple cluster circled in coral and labelled My agent"
      caption={
        <>
          Context = <A>Brain</A>
        </>
      }
    />
    <Notes>
      First you give it a brain, so it has context about your goals, about you,
      and about the business.
    </Notes>
  </Fragment>,

  // 5 — This brain is really just context files and folders of markdown files that have certain instructions including its north star goals, info about a company, or info about who you are and how you like to work. It's like onboarding a new hire.
  <Fragment key="context-files">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-onboarding-context.png`}
      alt="Onboarding card — office tour, important people to know, how the company works, how I like to work — labelled Context files and folders"
      maxWidth="max-w-xl"
      captionSize={deckType.statementSm}
      caption={
        <>
          Context = <A>Brain</A>
        </>
      }
    />
    <Notes>
      This brain is really just context files and folders of markdown files with
      instructions — its north star goals, info about the company, or info about
      who you are and how you like to work. It&apos;s like onboarding a new
      hire.
    </Notes>
  </Fragment>,

  // 6 — Second, you give them skills, which are repeated workflows that you turn and package into a skill so the AI follows those instructions.
  <Fragment key="skills">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-teach-skills.png`}
      alt="Teach them skills card — SOPs, processes and procedures, learn how to do a new task and get better over time — labelled Skills"
      maxWidth="max-w-xl"
      captionSize={deckType.statementSm}
      caption={
        <>
          <A>Skills</A>
        </>
      }
    />
    <Notes>
      Second, you give them skills — repeated workflows that you package into a
      skill so the AI follows those instructions.
    </Notes>
  </Fragment>,

  // 7 — It's like a standard operating procedure that you give to your employees.
  <Fragment key="sop">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-sop-spreadsheet.png`}
      alt="A Standard Operating Procedure spreadsheet listing numbered steps for a production process"
      caption={
        <>
          <A>Skills</A>
        </>
      }
    />
    <Notes>
      It&apos;s like a standard operating procedure that you give to your
      employees.
    </Notes>
  </Fragment>,

  // 8 — And lastly, you connect them to different tools that you already use so it can interact and actually execute things in these tools. This is through tech called an MCP but you can just call them connectors on Claude.
  <Fragment key="mcp-connectors">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-mcp-connectors.png`}
      alt="Claude Code at the centre of a hand-drawn hub, connected by MCP spokes to Gmail, Google Calendar, Granola, Instacart, Notion, Slack, Resy, Spotify, Uber and Canva"
      caption={
        <>
          <A>Tools</A>
        </>
      }
    />
    <Notes>
      And lastly, you connect them to the different tools you already use, so it
      can interact and actually execute things in those tools. This is through
      tech called an MCP, but you can just call them connectors on Claude.
    </Notes>
  </Fragment>,

  // 9 — It's like giving your new employee its own accounts in the software your company use.
  <Fragment key="own-accounts">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-apps-tools-mcps.png`}
      alt="Apps and tools card — give new hire subscriptions to tools and apps, use apps to do their work faster and better — labelled MCPs"
      maxWidth="max-w-xl"
      captionSize={deckType.statementSm}
      caption={
        <>
          <A>Tools</A>
        </>
      }
    />
    <Notes>
      It&apos;s like giving your new employee its own accounts in the software
      your company uses.
    </Notes>
  </Fragment>,

  // 10 — For example you might have an ads agent. I give it its goal through context files to grow revenue as efficiently as possible via ads. Then I give it a skill to tell it how i'm already doing google ads. And then I connect it to my Google Ads account on Claude so it can actually execute it for me.
  <Fragment key="ads-agent">
    <ListSlide
      ordered
      heading={
        <>
          Example: an <A>ads agent</A>
        </>
      }
      items={[
        "Brain → grow revenue via ads",
        "Skill → how I run Google Ads",
        "Tool → my Google Ads account",
      ]}
    />
    <Notes>
      For example, you might have an ads agent. I give it its goal through
      context files — grow revenue as efficiently as possible via ads. Then I
      give it a skill that tells it how I&apos;m already doing Google Ads. And
      then I connect it to my Google Ads account on Claude so it can actually
      execute for me.
    </Notes>
  </Fragment>,

  // 11 — AI agents are significantly less complicated once you have these 3 foundations.
  <Fragment key="foundations-recap">
    <ImageSlide
      src={`${LIB}/building-ai-agents-simple-agent-workflow.png`}
      alt="Agent workflow diagram: start, read CLAUDE.md context, read user prompt, thinking, branching to a skill with steps, to MCP connections for Gmail, Calendar and Slack, and to doing tasks or responding to the user"
      maxWidth="max-w-5xl"
    />
    <Notes>
      AI agents are significantly less complicated once you have these three
      foundations.
    </Notes>
  </Fragment>,

  // 12 — I have whole guide, with starter prompts and sets of videos that walk through exactly how you can create your own AI agent in one day. Comment MIKA and i'll send it over.
  <Fragment key="cta">
    <CtaSlide
      preview={`${LIB}/building-ai-agents-simple-course-landing.png`}
      previewAlt="Master agentic AI as a non-technical pro — build your own custom AI agent in 1 day in a self-paced course"
      previewSide="bottom"
      previewPlain
      previewLarge
      size="md"
    />
    <Notes>
      I have a whole guide, with starter prompts and a set of videos that walk
      through exactly how you can create your own AI agent in one day. Comment
      MIKA and I&apos;ll send it over.
    </Notes>
  </Fragment>,
];

export default function Page() {
  return <Deck slides={slides} />;
}
