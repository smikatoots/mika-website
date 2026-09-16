import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import { DualImageSlide, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Company Brain" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Some of the smartest people in AI like Andrej Karpathy or the CEO of YCombinator are all using AI this one way. And you can do it, too.
  <Fragment key="karpathy-garry">
    <DualImageSlide
      left={{ src: `${LIB}/andrej-karpathy.jpg`, alt: "Andrej Karpathy" }}
      right={{ src: `${LIB}/garry-tan.jpeg`, alt: "Garry Tan, CEO of Y Combinator" }}
    />
    <Notes>
      Some of the smartest people in AI like Andrej Karpathy or the CEO of Y
      Combinator are all using AI this one way. And you can do it, too.
    </Notes>
  </Fragment>,

  // 2 — Most people use AI to avoid thinking, hence this AI brainrot problem. But the smartest folks are using AI to ENHANCE their already existing thinking. And here's how it works.
  <Fragment key="brainrot">
    <ImageSlide src={`${LIB}/brainrot.png`} alt="A melting brain surrounded by error windows" />
    <Notes>
      Most people use AI to avoid thinking, hence this AI brainrot problem. But
      the smartest folks are using AI to ENHANCE their already existing
      thinking. And here&apos;s how it works.
    </Notes>
  </Fragment>,

  // 3 — The method they draw from is one called Elaborative Encoding, a memory technique that connects new information to things you already know.
  <Fragment key="elaborative-encoding">
    <TextSlide display>
      Elaborative
      <br />
      encoding
    </TextSlide>
    <Notes>
      The method they draw from is one called Elaborative Encoding, which is a
      memory technique that connects new information to things you already know
      to help you remember it better.
    </Notes>
  </Fragment>,

  // 4 — Which is really for you if you're kind of like me who reads a bunch of stuff and forgets it after. The cool part is it does that automatically and helps you see connections you might not otherwise have made yourself.
  <Fragment key="reads-and-forgets">
    <ImageSlide
      src={`${LIB}/how-to-books.jpg`}
      alt="A wall of how-to book covers"
    />
    <Notes>
      Which is really for you if you&apos;re kind of like me who reads a bunch
      of stuff and forgets it after. The cool part about this method is that it
      does that automatically and helps you see connections that you might not
      otherwise have made yourself.
    </Notes>
  </Fragment>,

  // 5 — They do this using a second brain: articles, podcasts, book notes, your life and lessons. An AI agent reads all of it and finds the connections, contradictions, and threads.
  <Fragment key="second-brain-graph">
    <ImageSlide
      src={`${LIB}/company-brain-knowledge-graph-my-agent.png`}
      alt="A knowledge graph of hundreds of connected notes, with one cluster circled and labelled My agent"
    />
    <Notes>
      They do this using a second brain, which is essentially a collection of
      all the articles, podcasts, book notes, or just more context and info
      about your life and your lessons that you store in your second brain. An
      AI agent reads all of this, and instead of just summarizing it, it
      actually finds the connections, the contradictions, and other threads
      across all of these sources.
    </Notes>
  </Fragment>,

  // 6 — I've used this so AI remembers who I am, and so I can log the lessons from my startup and creator business.
  <Fragment key="mika-and-nick">
    <ImageSlide
      src={`${LIB}/nuggets-of-lessons-notion.png`}
      alt="Mika's Notion database called Nuggets of Lessons, with entries tagged user research, productivity, communication, life principles and negotiation"
    />
    <Notes>
      I&apos;ve used this for making sure AI remembers who I am when I&apos;m
      asking it for help, but also so I can log the lessons I learn from my
      startup and creator business — and it helps me remember it automatically.
    </Notes>
  </Fragment>,

  // 7 — I wrote a comprehensive guide on how to get started and how to upgrade your second brain. Comment what you'd like to use it for below and I'll send it over.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="BRAIN"
      sub="for the second brain guide"
    />
    <Notes>
      I wrote a comprehensive guide on how to get started and how to upgrade
      your second brain. Comment what you&apos;d like to use it for below and
      I&apos;ll send it over.
    </Notes>
  </Fragment>,
];

export default function CompanyBrainDeckPage() {
  return <Deck slides={slides} />;
}
