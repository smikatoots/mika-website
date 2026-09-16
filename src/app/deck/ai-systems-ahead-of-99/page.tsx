import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes, OverlaySlide } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = {
  title: "The AI systems that put you ahead of 99% of the world",
};

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — The fastest way to get ahead of 99% of the world is to start building AI
  //     systems, not just prompts & skills. Here are 3 ways to build leverage and
  //     become time-rich, and the last one is the most powerful.
  {
    background: { image: `${LIB}/human-evolution.gif`, size: "cover", opacity: 0.4 },
    content: (
      <Fragment key="hook">
        <OverlaySlide>
          <HL>SYSTEMS</HL> &gt; PROMPTS
        </OverlaySlide>
        <Notes>
          The fastest way to get ahead of 99% of the world is to start building AI systems, not just
          prompts and skills. Here are 3 disgustingly good ways to do that to build leverage and
          become time-rich — and the last one is the most powerful one.
        </Notes>
      </Fragment>
    ),
  },

  // 2 — Number one, create recurring self-improving systems so you're compounding your
  //     growth over time. Every week I have a skill on Claude that looks at ALL my skills
  //     and tells me if they need updating based on how I've used them.
  <Fragment key="self-improving">
    <TextSlide number="01">
      Systems that <HL>upgrade themselves</HL>
    </TextSlide>
    <Notes>
      Number one, create recurring self-improving systems so you&apos;re compounding your growth
      over time. For example, every week I have a skill on Claude that looks at ALL of my skills and
      tells me if they need updating based on how I&apos;ve used — or not used — those skills.
    </Notes>
  </Fragment>,

  // 3 — Or one of the most famous bots on Grokbot is a bot that creates new or improves
  //     other bots based on behavior.
  <Fragment key="grokbot">
    <ImageSlide
      src={`${LIB}/ai-systems-ahead-of-99-grokbot-dr-eggbot.png`}
      alt="The dr eggbot Grok bot profile by Lauren Tan, described as designing high-quality Grok Bots by asking a few preference questions and then creating them with CreateAgent"
    />
    <Notes>
      Or one of the most famous bots on Grokbot is a bot that creates new bots — or improves other
      bots — based on behavior.
    </Notes>
  </Fragment>,

  // 4 — Number three, build an AI skill, which is really a one-line command that replaces
  //     repetitive work you do every day or week, so you spend less time on it with better quality.
  <Fragment key="ai-skill">
    <TextSlide number="02">
      One command replaces the <HL>work you repeat</HL>
    </TextSlide>
    <Notes>
      Number two, build an AI skill — which is really a one-line command that replaces repetitive
      work you do every single day or week, so you spend less and less time on it, with better
      quality.
    </Notes>
  </Fragment>,

  // 5 — For example, I have skills that help me at every part of my content creation workflow.
  <Fragment key="my-skills">
    <ImageSlide
      src={`${LIB}/ai-systems-ahead-of-99-ai-skills-list.png`}
      alt="Mika's list of AI skills, agents and tools: Notion for her content calendar, /spy for outlier videos, /generate-ig-ideas for mining meeting notes and Slack, /last30days for what people are saying across Reddit and X, /council for arguing an idea from five angles, and apify as the scraper behind /spy"
    />
    <Notes>
      For example, I have skills that help me at every single part of my content creation workflow —
      finding ideas, studying outliers, pressure-testing a take before I commit to it.
    </Notes>
  </Fragment>,

  // 6 — And lastly, build an AI second brain. The smartest people don't use AI to replace
  //     their thinking but to enhance it.
  <Fragment key="second-brain">
    <TextSlide number="03">
      Build an <HL>AI second brain</HL>
    </TextSlide>
    <Notes>
      And lastly, build an AI second brain. The smartest people don&apos;t use AI to replace their
      thinking — they use it to enhance it. You feed it everything about you, and all the articles,
      notes and podcasts you like, and it makes connections across those sources so you get
      disgustingly smarter, much faster.
    </Notes>
  </Fragment>,

  // 7 — (the second brain itself, on its own slide before the CTA)
  <Fragment key="second-brain-graph">
    <ImageSlide
      src={`${LIB}/company-brain-knowledge-graph-my-agent.png`}
      alt="A knowledge graph of hundreds of connected nodes, with one dense purple cluster circled in coral and labelled My agent"
    />
    <Notes>
      This is what a second brain actually looks like — every source you have
      fed it, connected.
    </Notes>
  </Fragment>,

  // 8 — I built a comprehensive guide sharing my second brain and how to build AND upgrade
  //     your own. Comment MIKA and I'll send it over.
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for my second brain guide" />
    <Notes>
      I built a comprehensive guide sharing my second brain and how to build AND upgrade your own.
      Comment MIKA and I&apos;ll send it over.
    </Notes>
  </Fragment>,
];

export default function AiSystemsAheadOf99DeckPage() {
  return <Deck slides={slides} />;
}
