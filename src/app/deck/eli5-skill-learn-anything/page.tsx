import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes, StepsBuildSlide } from "@/components/deck/reveal-parts";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "The ELI5 skill Anthropic uses to learn anything",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Contrary to popular belief, not all AI use cases lead to brainrot: a leader at Anthropic says they use this skill a lot in the company to learn anything.
  <Fragment key="brainrot">
    <ImageSlide
      src={`${LIB}/brainrot.png`}
      alt="A melting cartoon brain surrounded by anxious emoji, error windows and a devil face — AI brainrot"
    />
    <Notes>
      Contrary to popular belief, not all AI use cases lead to brainrot: a
      leader at Anthropic says they use this skill a lot in the company to learn
      anything.
    </Notes>
  </Fragment>,

  // 2 — It's called ELI5 and you type slash-eli5, then whatever you want explained.
  <Fragment key="command">
    <ImageSlide
      src={`${LIB}/anthropic-eli5-skill-command-llms.png`}
      alt="The Claude Code prompt box with the command /eli5 LLMs typed into it"
    />
    <Notes>
      It&apos;s called ELI5 and you type slash-eli5, then whatever you want
      explained.
    </Notes>
  </Fragment>,

  // 3 — Claude breaks it down like you know nothing, mostly pictures, barely any text.
  // TODO: swap for background video eli5-skill-learn-anything-llm-scroll-a.mp4
  // once the ELI5 artifact-scroll recording is in _library.
  <Fragment key="mostly-pictures">
    <TextSlide display>
      VISUAL <HL>LEARNING</HL>
    </TextSlide>
    <Notes>
      Claude breaks it down like you know nothing, mostly pictures, barely any
      text.
    </Notes>
  </Fragment>,

  // 4 — Thariq, who works on Claude Code at Anthropic, says people there have been using it A LOT to simplify complex concepts.
  <Fragment key="thariq">
    <ImageSlide
      src={`${LIB}/anthropic-eli5-skill-thariq-post.png`}
      alt="A post from Thariq at Anthropic describing the ELI5 skill people there have been using a lot, with an example artifact of robot diagrams"
    />
    <Notes>
      Thariq, who works on Claude Code at Anthropic, says people there have been
      using it A LOT to simplify complex concepts.
    </Notes>
  </Fragment>,

  // 5 — The ones they actually run: "how does this module work," "why did we make this tradeoff," "what caused this incident."
  <Fragment key="the-prompts">
    <StepsBuildSlide
      steps={[
        <Fragment key="module">
          <A>/eli5</A> how does this module work
        </Fragment>,
        <Fragment key="tradeoff">
          <A>/eli5</A> why did we make this tradeoff
        </Fragment>,
        <Fragment key="incident">
          <A>/eli5</A> what caused this incident
        </Fragment>,
      ]}
    />
    <Notes>
      The ones they actually run: &quot;how does this module work,&quot; &quot;why
      did we make this tradeoff,&quot; &quot;what caused this incident.&quot;
    </Notes>
  </Fragment>,

  // 6 — Now I tried it, and I'll be honest with you, it really does simplify hard.
  // TODO: swap for background video eli5-skill-learn-anything-llm-scroll-b.mp4
  // once the ELI5 artifact-scroll recording is in _library.
  <Fragment key="simplify-hard">
    <TextSlide display>
      <HL>very simple</HL>…
    </TextSlide>
    <Notes>
      Now I tried it, and I&apos;ll be honest with you, it really does simplify
      hard.
    </Notes>
  </Fragment>,

  // 7 — Sometimes it strips a topic down so far it comes out a little too simple.
  // TODO: swap for background video eli5-skill-learn-anything-llm-scroll-c.mp4
  // once the ELI5 artifact-scroll recording is in _library.
  <Fragment key="too-simple">
    <TextSlide display>
      … <HL>TOO simple</HL>
    </TextSlide>
    <Notes>
      Sometimes it strips a topic down so far it comes out a little too simple.
    </Notes>
  </Fragment>,

  // 8 — But if that's what makes a technical thing finally click for a beginner, the big visuals and the simple model are worth it.
  <Fragment key="very-simply">
    <TextSlide>
      Good for breaking down complex topics <HL>VERY simply</HL>
    </TextSlide>
    <Notes>
      But if that&apos;s what makes a technical thing finally click for a
      beginner, the big visuals and the simple model are worth it.
    </Notes>
  </Fragment>,

  // 9 — Comment MIKA and I'll send you exactly how to install it.
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" />
    <Notes>
      Comment MIKA and I&apos;ll send you exactly how to install it.
    </Notes>
  </Fragment>,
];

export default function Eli5SkillLearnAnythingDeckPage() {
  return <Deck slides={slides} />;
}
