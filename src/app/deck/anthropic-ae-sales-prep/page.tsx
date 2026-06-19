import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import {
  A,
  DualImageSlide,
  HL,
  ImageSlide,
  PointSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How Anthropic's AE Uses Claude to Sell Claude",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — "This is Britney Tong, a Growth AE at Anthropic."
  <DualImageSlide
    key="britney-intro"
    left={{
      src: `${LIB}/brittney-tong-linkedin.png`,
      alt: "Britney Tong's LinkedIn — Growth Account Executive at Anthropic",
    }}
    right={{
      src: `${LIB}/brittney-tong-video.png`,
      alt: "Britney Tong on camera explaining her workflow",
    }}
  />,

  // 2 — "She has 2 Claude skills you can steal."
  <TextSlide key="two-skills">
    <HL>2 Claude Skills</HL> you can <HL delay={0.4}>steal</HL>.
  </TextSlide>,

  // 3 — "Before: prep took hours across six tools."
  <ImageSlide
    key="before"
    src={`${LIB}/scattered-sales-tools.webp`}
    alt="Scattered Salesforce, Slack, Gmail and other tool logos"
    caption={
      <>
        Before: hours across <A>6 tools</A>
      </>
    }
  />,

  // 4 — "Now Claude does it in minutes."
  <ImageSlide
    key="now-claude"
    src={`${LIB}/claude-logo.png`}
    alt="The Claude logo"
    caption={
      <>
        Now Claude does it in <A>minutes</A>
      </>
    }
  />,

  // 5 — "Skill one: demo-account-intel."
  <PointSlide key="skill-1" number="01" emoji="🔎">
    <HL delay={0.4}>demo-account-intel</HL>
  </PointSlide>,

  // 6 — "Type slash, name the account." (image only)
  <ImageSlide
    key="builder-command"
    src={`${LIB}/demo-account-builder-command.png`}
    alt="The demo-account-builder slash command running in Cowork"
  />,

  // 7 — "It generates a full account brief." (image only)
  <ImageSlide
    key="brief-output"
    src={`${LIB}/account-brief-output.png`}
    alt="Generated account brief output"
  />,

  // 8 — "Spend, stakeholders, risk signals." (image only)
  <ImageSlide
    key="brief-output-more"
    src={`${LIB}/account-brief-output-more.png`}
    alt="More of the account brief output"
  />,

  // 9 — "Skill two: demo-call-transcript."
  <PointSlide key="skill-2" number="02" emoji="📝">
    <HL delay={0.4}>demo-call-transcript</HL>
  </PointSlide>,

  // 10 — "After the call, type slash." (image only)
  <ImageSlide
    key="transcript-command"
    src={`${LIB}/demo-call-transcript-command.png`}
    alt="The demo-call-transcript slash command"
  />,

  // 11 — "It pulls your action items." (image only)
  <ImageSlide
    key="action-items"
    src={`${LIB}/brittney-action-items.png`}
    alt="Generated personal action items"
  />,

  // 12 — "And a Slack recap that waits for approval." (image only)
  <ImageSlide
    key="slack-approval"
    src={`${LIB}/brittney-slack-approval.png`}
    alt="Internal Slack recap awaiting send approval"
  />,

  // 13 — "And you write zero code to build them." (image only)
  <ImageSlide
    key="zero-code"
    src={`${LIB}/cowork-skill-creation.png`}
    alt="Building a skill in a Cowork session from plain text"
  />,

  // 14 — "30 minutes of prep, down to two per call."
  <TextSlide key="time-saved" display>
    30 min → <HL delay={0.4}>2 min</HL> per call.
  </TextSlide>,

  // 15 — CTA
  <CtaSlide
    key="cta"
    sub="for the exact setup for both skills."
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Preview of Mika's AI guides"
  />,
];

export default function AnthropicAeSalesPrepDeckPage() {
  return <Deck slides={slides} />;
}
