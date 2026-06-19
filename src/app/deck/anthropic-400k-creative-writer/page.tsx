import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "Anthropic Is Paying $400K for a Creative Writer",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Anthropic just posted a $400K job…
  <ImageSlide
    key="hook"
    src={`${LIB}/anthropic-salary-400k.png`}
    alt="Anthropic job posting showing $400K salary"
  />,

  // 2 — Liberal arts majors and non-technical folks…
  <ImageSlide
    key="job-headline"
    src={`${LIB}/anthropic-400k-job-headline.png`}
    alt="Anthropic Head of Copy job headline"
  />,

  // 3 — So think about who Anthropic is…
  <ImageSlide
    key="claude"
    src={`${LIB}/claude-logo.png`}
    alt="Claude logo"
  />,

  // 4 — For three years everyone said the same thing…
  <ImageSlide
    key="writers-first"
    src={`${LIB}/headline-jobs.png`}
    alt="Headlines about AI replacing writers"
    caption={
      <>
        &ldquo;Writers are <A>first to go</A>&rdquo;
      </>
    }
  />,

  // 5 — And yet here's Anthropic… paying up to $400,000…
  <ImageSlide
    key="salary"
    src={`${LIB}/anthropic-salary-400k.png`}
    alt="Anthropic job posting showing up to $400,000 salary"
  />,

  // 6 — The role? Head of Copy and Content…
  <ImageSlide
    key="role"
    src={`${LIB}/anthropic-head-of-copy-and-content.png`}
    alt="Anthropic Head of Copy and Content role"
  />,

  // 7 — But not to crank out words… taste and judgment…
  <ImageSlide
    key="jd-1"
    src={`${LIB}/anthropic-head-of-copy-and-content-jd-1.png`}
    alt="Anthropic job description excerpt on taste and judgment"
  />,

  // 8 — The job description says it straight…
  <ImageSlide
    key="jd-2"
    src={`${LIB}/anthropic-head-of-copy-and-content-jd-2.png`}
    alt="Anthropic job description connective tissue quote"
  />,

  // 9 — And this is for everyone who studied English…
  <TextSlide key="taste" display>
    <HL>Taste</HL> is the most expensive skill
  </TextSlide>,

  // 10 — Comment MIKA and I'll send you the job post.
  <CtaSlide
    key="cta"
    sub="I'll send you the job post."
    preview={`${LIB}/anthropic-head-of-copy-and-content.png`}
    previewAlt="Anthropic Head of Copy and Content job posting"
    previewPlain
    previewLarge
  />,
];

export default function Anthropic400kCreativeWriterDeckPage() {
  return <Deck slides={slides} />;
}
