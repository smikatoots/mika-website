import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import { HL, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = {
  title: "3 trends from YC's Summer 2026 batch",
};

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — YC's Summer 2026 batch points to three founder opportunities most AI builders are overlooking. One is hiding in work people still assume needs an entire department.
  // Full-bleed market map at full strength, no overlay type — the scrim the
  // type needed was what washed the image out.
  {
    background: {
      // The full market map is a 898x2000 poster — shown whole in a 16:9 frame
      // it shrinks to a ~360px column and every logo turns to mush, which reads
      // as "faded". This is the header + B2B block cropped out of it, so the
      // companies are actually legible on screen.
      image: `${LIB}/yc-summer-2026-trends-batch-map-b2b.png`,
      size: "contain",
    },
    content: (
      <Fragment key="market-map">
        <Notes>
          YC&apos;s Summer 2026 batch points to three founder opportunities most
          AI builders are overlooking. One is hiding in work people still assume
          needs an entire department.
        </Notes>
      </Fragment>
    ),
  },

  // 2 — So before I share the trends, here are the stats ahead of Demo Day, 52% of the batch is B2B. US-headquartered startups dropped from about 94% to 90%, and solo founders and tiny teams are WINNING. Some of them are even building hardware products which historically require large teams.
  <Fragment key="batch-stats">
    <TextSlide display>
      52% = <HL>B2B</HL>
    </TextSlide>
    <Notes>
      So before I share the trends, here are the stats ahead of Demo Day, 52% of
      the batch is B2B.
    </Notes>
  </Fragment>,

  // 2b — US-HQ share fell, and solo founders and tiny teams are winning.
  <Fragment key="batch-stats-solo">
    <TextSlide display>
      94% → 90% = <HL>solo</HL>
    </TextSlide>
    <Notes>
      US-headquartered startups dropped from about 94% to 90%, and solo founders
      and tiny teams are WINNING. Some of them are even building hardware
      products which historically require large teams.
    </Notes>
  </Fragment>,

  // 3 — And that's amazing because now tiny teams can build ambitious businesses. Now here are the top 3 trends from this batch.
  <Fragment key="tiny-teams">
    <TextSlide>
      Tiny teams → <HL>Ambitious businesses</HL>
    </TextSlide>
    <Notes>
      And that&apos;s amazing because now tiny teams can build ambitious
      businesses. Now here are the top 3 trends from this batch.
    </Notes>
  </Fragment>,

  // 4 — First, agent infrastructure. The previous batch focused on agent apps. This one is building what sits underneath them: context management, card payments, and password managers.
  <Fragment key="agent-infra">
    <TextSlide>
      1/ <HL>AGENT INFRA</HL>
    </TextSlide>
    <Notes>
      First, agent infrastructure. The previous batch focused on agent apps.
      This one is building what sits underneath them: context management, card
      payments, and password managers.
    </Notes>
  </Fragment>,

  // 5 — Second, there's a rise of vertical-specific "AI-native" professional services beyond accounting and law in areas like government affairs, McKinsey-style consultancies, radiology and clinical operations. The pattern is across regulated, white-collar industries with the most repetitive document and compliance work.
  <Fragment key="ai-professional-services">
    <TextSlide>
      2/ <HL>AI</HL> <HL>PROFESSIONAL</HL> <HL>SERVICES</HL>
    </TextSlide>
    <Notes>
      Second, there&apos;s a rise of vertical-specific &quot;AI-native&quot;
      professional services beyond accounting and law in areas like government
      affairs, McKinsey-style consultancies, radiology and clinical operations.
      The pattern is across regulated, white-collar industries with the most
      repetitive document and compliance work.
    </Notes>
  </Fragment>,

  // 6 — Third, agent-native back offices. Companies want to replace whole functions, from accounting firms to ERP implementation. The pitch has moved from an AI copilot to AI running the department.
  <Fragment key="agent-native-back-offices">
    <TextSlide>
      3/ <HL>AGENT-NATIVE</HL> <HL>BACK</HL> <HL>OFFICES</HL>
    </TextSlide>
    <Notes>
      Third, agent-native back offices. Companies want to replace whole
      functions, from accounting firms to ERP implementation. The pitch has
      moved from an AI copilot to AI running the department.
    </Notes>
  </Fragment>,

  // 7 — What do you think? Follow for more ways to build a time-rich life through AI, startups, and entrepreneurship.
  <Fragment key="cta">
    <CtaSlide
      prompt="Which trend would you build?"
      headline={null}
      headlinePlain
    />
    <Notes>
      What do you think? Follow for more ways to build a time-rich life through
      AI, startups, and entrepreneurship.
    </Notes>
  </Fragment>,
];

export default function YcSummer2026TrendsDeckPage() {
  return <Deck slides={slides} />;
}
