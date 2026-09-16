import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, HL, ImageSlide } from "@/components/deck/slide-parts";
import { ListSlide, Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = { title: "AI Marketing Engineers" };

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — Greg Isenberg has over 700,000 followers and says a specific type of marketer will make $1M a year.
  <Fragment key="greg-isenberg">
    <ImageSlide
      src={`${LIB}/greg-isenberg.png`}
      alt="Greg Isenberg's verified YouTube channel: @GregIsenberg, 710K subscribers, 816 videos"
    />
    <Notes>
      Greg Isenberg has over 700,000 followers on X, and says that a SPECIFIC
      type of marketer will make $1 million a year. But most marketers
      haven&apos;t even heard the job title yet.
    </Notes>
  </Fragment>,

  // 2 — My cofounder and I are building to $1M with two people, and I'm acting as this person.
  <Fragment key="two-people">
    <DualImageSlide
      left={{
        src: `${LIB}/mika-and-nick.jpeg`,
        alt: "Mika and her cofounder Nick, the two-person team behind King's Cross Labs",
      }}
      right={{
        src: `${LIB}/wsj-million-dollar-one-employee.png`,
        alt: "Wall Street Journal headline: The rise of million-dollar companies with just one employee",
      }}
    />
    <Notes>
      My cofounder and I are building a startup to $1 million with just two
      people and I&apos;m acting as this person, tasked to eventually set up all
      our marketing and content workflows as SYSTEMS just like an engineer
      would. And we&apos;re not the only ones thinking this way.
    </Notes>
  </Fragment>,

  // 3 — Coding agents push the cost of product creation toward zero, so value shifts to distribution.
  <Fragment key="coding-agents">
    <ImageSlide
      src={`${LIB}/coding-agents-in-one.jpg`}
      alt="Four coding agents side by side: Cursor, Claude Code, Windsurf and Antigravity"
    />
    <Notes>
      Coding agents are pushing the cost and value of product creation toward
      zero. That shifts value to distribution and marketing. Marketers who build
      compounding systems and real differentiation become more valuable and
      command higher salaries.
    </Notes>
  </Fragment>,

  // 4 — Marketing's most valuable role keeps changing: story, channels, loops, now agents.
  <Fragment key="eras">
    <ListSlide
      heading="The most valuable marketer"
      ordered
      reveal
      items={[
        "Storyteller",
        "Digital marketer",
        "Growth hacker",
        <HL key="engineer">Marketing engineer</HL>,
      ]}
    />
    <Notes>
      Marketing&apos;s most valuable role keeps changing. First it was
      storytelling, then digital channels, then growth loops. Now it&apos;s
      building the agents that run the system.
    </Notes>
  </Fragment>,

  // 5 — He calls it a marketing engineer: someone who builds AI agents that systemize marketing.
  <Fragment key="marketing-engineer">
    <ImageSlide
      src={`${LIB}/marketing-engineer-job-board.png`}
      alt="The Marketing Engineering Job Board, listing Marketing Engineer roles at Profound, NVIDIA, Harvey and Legora paying $127K to $339K a year"
    />
    <Notes>
      He calls it a marketing engineer: someone who builds AI agents that
      systemize marketing workflows. And this term is getting more and more
      popular in tech circles.
    </Notes>
  </Fragment>,

  // 6 — If you want to grow your salary, learn GitHub and think like an engineer.
  <Fragment key="learn-github">
    <ImageSlide
      src={`${LIB}/watch-video-skill-github-repo.png`}
      alt="A GitHub repository page showing branches, commits and a file tree"
    />
    <Notes>
      So if you work in growth and marketing who wants to grow their salary,
      it&apos;s time to learn Github and think more like an engineer in this AI
      age.
    </Notes>
  </Fragment>,

  // 7 — CTA: is marketing engineer the next million-dollar role?
  <Fragment key="cta">
    <CtaSlide prompt="Is this the next" headline="$1M role?" />
    <Notes>
      Do you think marketing engineer is the next million-dollar role? Tell me
      below. Follow to build a time-rich life with AI.
    </Notes>
  </Fragment>,
];

export default function AiMarketingEngineersDeckPage() {
  return <Deck slides={slides} />;
}
