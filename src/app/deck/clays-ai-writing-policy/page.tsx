import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Clay's AI Writing Policy" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — If you're an ambitious marketer using AI every day, this $3B company's writing policy might make you rethink what "good work" looks like.
  <ImageSlide key="clay-logo" src={`${LIB}/clay-logo.png`} alt="Clay" />,

  // 2 — The company is Clay, and AI writing was creating a new problem.
  <ImageSlide
    key="overview"
    src={`${LIB}/clays-ai-writing-policy-overview.png`}
    alt="Clay's AI writing policy"
  />,

  // 3 — And it struck a nerve: 9,939 reactions, 590 comments, 719 reposts.
  <ImageSlide
    key="engagement"
    src={`${LIB}/clay-writing-policy-viral.png`}
    alt="LinkedIn post engagement: 9,946 reactions, 590 comments, 719 reposts"
    framed
  />,

  // 4 — I've seen how this plays out in big companies as someone who's previously worked at LinkedIn.
  <ImageSlide key="linkedin" src={`${LIB}/mika-linkedin-hero.png`} alt="Mika at LinkedIn" />,

  // 5 — Here are Clay's four rules for fixing it.
  <TextSlide key="four-rules">
    Clay&apos;s <HL>4 writing rules</HL>
  </TextSlide>,

  // 6 — First, stand behind every sentence. "AI wrote it" isn't an answer.
  <ImageSlide
    key="rule-1"
    src={`${LIB}/clays-ai-writing-policy-rule-1-stand-behind-every-sentence.png`}
    alt="Rule 1: stand behind every sentence"
    caption="Stand behind every sentence"
  />,

  // 7 — Second, writing is thinking. Don't outsource the part that shapes your ideas.
  <ImageSlide
    key="rule-2"
    src={`${LIB}/clays-ai-writing-policy-rule-2-writing-is-thinking.png`}
    alt="Rule 2: writing is thinking"
    caption="Writing is thinking"
  />,

  // 8 — Third, spend more time writing than your readers spend reading.
  <ImageSlide
    key="rule-3"
    src={`${LIB}/clays-ai-writing-policy-rule-3-author-time-over-reader-time.png`}
    alt="Rule 3: author time over reader time"
    caption="Spend more time writing"
  />,

  // 9 — Fourth, longer isn't better. Cut until every sentence earns its place.
  <ImageSlide
    key="rule-4"
    src={`${LIB}/clays-ai-writing-policy-rule-4-longer-is-not-better.png`}
    alt="Rule 4: longer isn't better"
    caption="Longer isn't better"
  />,

  // 10 — The test is simple: did AI help you communicate your thinking, or replace it?
  <TextSlide key="test">
    <HL>Communicate</HL> your thinking, or <HL>replace</HL> it?
  </TextSlide>,

  // 11 — Share this with the other people on your team.
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        What do you think? <HL>Share this</HL> with your team
      </>
    }
    headlinePlain
    size="sm"
    preview={`${LIB}/clays-ai-writing-policy-overview.png`}
    previewAlt="Clay's AI writing policy"
  />,
];

export default function ClaysAiWritingPolicyDeckPage() {
  return <Deck slides={slides} />;
}
