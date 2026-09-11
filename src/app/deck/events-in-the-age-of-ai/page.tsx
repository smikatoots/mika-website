import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = { title: "Events in the Age of AI" };

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — Gary Vee says AI is about to cause an explosion in real, in-person events, not kill them.
  // Image-only: the burned-in "EXPLOSION OF ANALOG" caption already says the
  // line, so type over it was redundant — and the scrim it needed was washing
  // the photo out.
  <Fragment key="gary-vee">
    <ImageSlide
      src={`${LIB}/events-in-the-age-of-ai-gary-vee-tbpn-analog-explosion.png`}
      alt="Gary Vee live on TBPN, with the on-screen caption: explosion of analog"
    />
    <Notes>
      Gary Vee says AI is about to cause an explosion in real, in-person events,
      not kill them. I just ran one that got 500 signups, and here are the 3
      things that decide if people actually come back.
    </Notes>
  </Fragment>,

  // 2 — Claude community ambassador: intimate CMO dinners + 100-plus person founder workshops.
  <Fragment key="dinners-workshops">
    <DualImageSlide
      left={{
        src: `${LIB}/events-in-the-age-of-ai-dinner-table.png`,
        alt: "An intimate dinner table set for CMOs and senior leaders",
      }}
      right={{
        src: `${LIB}/claude-workshop.jpeg`,
        alt: "A packed Claude workshop room of founders and builders",
      }}
    />
    <Notes>
      I&apos;m a Claude community ambassador here in New York, and I&apos;ve
      also run intimate dinners for CMOs and top leaders, and 100-plus person
      workshops for founders and builders.
    </Notes>
  </Fragment>,

  // 3 — First, curation. An AI agent screened every registration.
  <Fragment key="curation">
    <ImageSlide
      caption="Used AI agents to curate the right people"
      src={`${LIB}/ai-agent.webp`}
      alt="An AI agent screening every event registration"
    />
    <Notes>
      First, curation. An AI agent screened every registration for people
      serious about content and serious about AI. So everyone in the room
      already had something in common, and actually engaged with the material.
    </Notes>
  </Fragment>,

  // 4 — Second, a clear goal: everyone leaves with an actionable AI agent.
  // TODO: swap for background video events-in-the-age-of-ai-takeaway-site.mov once it's in _library
  <Fragment key="clear-goal">
    <TextSlide>
      Everyone leaves with <HL>an actual AI agent</HL>
    </TextSlide>
    <Notes>
      Second, a clear goal, stated on the event page, in the intro, and in the
      material itself. Ours: everyone leaves with an actionable AI agent, backed
      by a takeaway website so nobody fell behind.
    </Notes>
  </Fragment>,

  // 5 — Third, the right setup: Luma page, takeaway sites, projector, mic, speakers.
  <Fragment key="setup">
    <ImageSlide
      caption="Use the right tooling & spaces"
      src={`${LIB}/luma-tastemakers-homepage.png`}
      alt="The Luma event page for the Tastemakers event"
    />
    <Notes>
      Third, the right setup: Luma for the page, vibe-coded takeaway sites, a
      projector, mic, and speakers. Next time: more outlets, a better chair
      layout, and stronger Wi-Fi.
    </Notes>
  </Fragment>,

  // 6 — Comment "event" and I'll add you to the list.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="event"
      preview={`${LIB}/luma-tastemakers.png`}
      previewAlt="The Luma Tastemakers event listing"
    />
    <Notes>
      I&apos;m running more of these in New York. Comment &quot;event&quot; and
      I&apos;ll add you to the list, maybe online soon too.
    </Notes>
  </Fragment>,
];

export default function EventsInTheAgeOfAiDeckPage() {
  return <Deck slides={slides} />;
}
