import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { A, DualImageSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "AI Made the Safest Career Game the Riskiest" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — hook: the new job security is NOT your prestige resume
  <TextSlide key="hook" display>
    <span className="line-through">Your current job</span> ≠ <HL>job security</HL>
  </TextSlide>,

  // 2 — if you're in a corporate job unsure about your role, here's how to think about it
  <TextSlide key="context">
    Corporate job, unsure where you stand? <HL>Read this.</HL>
  </TextSlide>,

  // 3 — I was at LinkedIn: steady paycheck, recognizable name, prestige credentials
  <ImageSlide
    key="linkedin-era"
    src={`${LIB}/mika-linkedin-era.png`}
    alt="Mika on a LinkedIn team call, #TEAMHIRING backgrounds"
  />,

  // 4 — that secure, golden path doesn't look so secure anymore
  <TextSlide key="golden" display>
    ✨ <span className="line-through">golden path</span> ✨
  </TextSlide>,

  // 5 — reason 1: the corporate job itself keeps changing (layoffs blamed on AI)
  <ImageSlide
    key="reason1"
    src={`${LIB}/techcrunch-blame-ai-layoffs.png`}
    alt="TechCrunch: Monday.com is the latest tech company to blame AI for layoffs — here are 20 others"
    caption={
      <>
        Reason 1: the job keeps <A>changing</A>
      </>
    }
  />,

  // 6 — reason 2: the leaders are guessing (token leaderboard fired its top user)
  <DualImageSlide
    key="reason2"
    caption={
      <>
        Reason 2: the leaders are <A>guessing</A>
      </>
    }
    left={{
      src: `${LIB}/amazon-scraps-ai-leaderboard.png`,
      alt: "Amazon scraps AI leaderboard to stop workers boosting usage scores",
    }}
    right={{
      src: `${LIB}/reuters-ai-hidden-price-tag.png`,
      alt: "Thomson Reuters: AI's hidden price tag — millions spent, returns still a mystery",
    }}
  />,

  // 7 — reason 3: plenty of big companies block AI at work completely
  <ImageSlide
    key="reason3"
    src={`${LIB}/companies-banning-chatgpt.png`}
    alt="Companies Banning ChatGPT (2026): The Enterprise Security List"
    caption={
      <>
        Reason 3: some <A>block AI</A> entirely
      </>
    }
  />,

  // 8 — security stopped meaning a job title; it means owning your leverage
  <TextSlide key="leverage" display>
    <HL>Leverage</HL> = Security
  </TextSlide>,

  // 9 — way 1: get SO good with AI inside your role, be the operator everyone leans on
  <ImageSlide
    key="way1"
    src={`${LIB}/i-am-the-practitioner.gif`}
    alt="I am the practitioner"
    caption={
      <>
        Way 1: be the <A>AI operator</A>
      </>
    }
  />,

  // 10 — way 2: build your own personal brand so it speaks for itself
  <ImageSlide
    key="way2"
    src={`${LIB}/mika-linkedin-hero.png`}
    alt="Mika's LinkedIn profile with press features and 11K+ followers"
    caption={
      <>
        Way 2: build <A>your brand</A>
      </>
    }
  />,

  // 11 — way 3: bet on yourself / join a more AI-native team
  <ImageSlide
    key="way3"
    src={`${LIB}/lets-build.gif`}
    alt="Let's build"
    caption={
      <>
        Way 3: <A>bet on yourself</A>
      </>
    }
  />,

  // 12 — CTA: comment MIKA
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" />,
];

export default function JobSecurityAiDeckPage() {
  return <Deck slides={slides} />;
}
