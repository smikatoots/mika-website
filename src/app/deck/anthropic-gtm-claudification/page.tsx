import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import { HL, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = {
  title: "Anthropic's GTM Claudification role",
};

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — Anthropic put a stupid title on a $405K job that could become standard at every company.
  // The title is coral-redacted on purpose: the open loop stays shut until
  // slide 6, where the same posting is shown with the word revealed.
  <Fragment key="redacted-title">
    <ImageSlide
      src={`${LIB}/gtm-claudification-title-redacted.png`}
      alt="Anthropic job posting header: Staff AI Engineer, GTM — with the last word redacted. Remote-Friendly (Travel-Required), San Francisco, CA, Seattle, WA."
    />
    <Notes>
      Anthropic put a stupid title on a $405K job that could become standard at
      every company.
    </Notes>
  </Fragment>,

  // 2 — Anthropic wants this person to build agents across inbound, outbound, and pipeline management, then tie their actions to revenue.
  <Fragment key="gtm-stack">
    <ImageSlide
      src={`${LIB}/scattered-sales-tools.webp`}
      alt="A grid of go-to-market tool logos: HubSpot, Zapier, Salesforce, Clay, Pipedrive, and Coda."
    />
    <Notes>
      Anthropic wants this person to build agents across inbound, outbound, and
      pipeline management, then tie their actions to revenue.
    </Notes>
  </Fragment>,

  // 3 — What makes this role interesting is that ONE AI-native operator can now connect work that used to stop at departmental boundaries, then prove what drove revenue.
  <Fragment key="one-operator">
    <ImageSlide
      src={`${LIB}/wsj-million-dollar-one-employee.png`}
      alt="Wall Street Journal headline: The Rise of Million-Dollar Companies With Just One Employee."
      framed
    />
    <Notes>
      What makes this role interesting is that ONE AI-native operator can now
      connect work that used to stop at departmental boundaries, then prove what
      drove revenue.
    </Notes>
  </Fragment>,

  // 4 — I worked in product at LinkedIn and we had whole roles and departments doing all these separate jobs.
  <Fragment key="linkedin-team">
    <ImageSlide
      src={`${LIB}/mika-linkedin-era.png`}
      alt="A Zoom grid of Mika's LinkedIn team, everyone on a #TEAMHIRING background."
    />
    <Notes>
      I worked in product at LinkedIn and we had whole roles and departments
      doing all these separate jobs.
    </Notes>
  </Fragment>,

  // 5 — Now, with AI, this type of role not only becomes more valuable but also more possible to do, even if it crosses the intersection of multiple departments. Someone who can connect them becomes much more powerful.
  <Fragment key="role-reprices">
    <ImageSlide
      src={`${LIB}/ai-lab-700k-marketing-role.png`}
      alt="Entrepreneur headline: Netflix and OpenAI Are Paying Up to $775,000 For This In-Demand Job — No Coding Experience Required."
      framed
    />
    <Notes>
      Now, with AI, this type of role not only becomes more valuable but also
      more possible to do, even if it crosses the intersection of multiple
      departments. Someone who can connect them becomes much more powerful.
    </Notes>
  </Fragment>,

  // 6 — The title is GTM Claudification, and the work is already happening inside its sales team. AI handles the repetitive execution. The person designs the system, keeps humans in control, and measures whether it produces revenue.
  // The payoff for slide 1: same posting, title revealed.
  <Fragment key="claudification-reveal">
    <ImageSlide
      src={`${LIB}/gtm-claudification-job-post.png`}
      alt="Anthropic job posting: AI Engineer, GTM Claudification. About the role, with a highlighted line — you will build the agents and AI systems that run Anthropic's own go-to-market work."
      framed
    />
    <Notes>
      The title is GTM Claudification, and the work is already happening inside
      its sales team. AI handles the repetitive execution. The person designs
      the system, keeps humans in control, and measures whether it produces
      revenue.
    </Notes>
  </Fragment>,

  // 7 — Do you think every company will hire this role? Tell me in the comments. And follow as I share the future of jobs & opportunities in the age of AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Will every company hire this role?"
      headline={
        <>
          Follow for the <HL>future of jobs</HL> in the age of AI.
        </>
      }
      headlinePlain
      size="mlg"
    />
    <Notes>
      Do you think every company will hire this role? Tell me in the comments.
      And follow as I share the future of jobs and opportunities in the age of
      AI.
    </Notes>
  </Fragment>,
];

export default function AnthropicGtmClaudificationDeckPage() {
  return <Deck slides={slides} />;
}
