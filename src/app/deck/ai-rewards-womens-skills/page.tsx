import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide, DualImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "AI Rewards Women's Skills" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — As an ambitious woman, you were likely told to be more man-like for your career: analytical, more technical, less emotional. But now, the skills we were told to tone down are the ones AI is rewarding.
  <ImageSlide key="badass-women" src={`${LIB}/badass-women.gif`} alt="badass women" />,

  // 2 — I'm a Filipina immigrant who hustled into Silicon Valley with no network, and I thought the way in was to be the most analytical person in every room.
  <ImageSlide key="filipino-jeep" src={`${LIB}/mika-with-a-filipino-jeep.jpeg`} alt="Mika with a Filipino jeepney" />,

  // 3 — So I optimized hard. Econ and data in school, then product roles, then CEO of startup in one of the most technical corners of tech. I kept sanding down the parts of me that were warm, empathetic or creative, because they felt unserious.
  <ImageSlide key="wesleyan" src={`${LIB}/wesleyan-college-graduation.jpg`} alt="Wesleyan college graduation" />,

  // 4 — Then AI got great at the all the analytical and technical work.
  <TextSlide key="ai-great-technical">AI = great at technical work</TextSlide>,

  // 5 — What it still can't do is cultivate taste or judgment, and empathize well with people. Knowing which idea is actually good. Feeling what a customer won't say out loud. In study after study, women score higher on empathy and emotional intelligence, so a lot of us were told to hide our biggest edge.
  <TextSlide key="ai-not-taste">AI = NOT great at taste</TextSlide>,

  // 6 — And the market is already paying for it. Events, community, and brand roles at AI companies are going for three to four hundred thousand dollars. The premium moved to the human skills.
  <DualImageSlide
    key="anthropic-role-salary"
    left={{ src: `${LIB}/anthropic-head-of-copy-and-content.png`, alt: "Anthropic Head of Copy and Content role" }}
    right={{ src: `${LIB}/anthropic-salary-400k.png`, alt: "Anthropic $400k salary" }}
  />,

  // 7 — First, stop apologizing for the soft skills and lead with them. Your judgment and taste are the product now.
  <ImageSlide
    key="you-have-taste"
    src={`${LIB}/you-have-taste.gif`}
    alt="you have taste"
    caption="Lead with your soft skills"
  />,

  // 8 — Second, let AI take the analytical grunt work, so you can go deeper on the human parts. The strategy, the relationships, the storytelling.
  <ImageSlide
    key="ai-agent"
    src={`${LIB}/ai-agent.webp`}
    alt="AI agent"
    caption="Let AI do the grunt work"
  />,

  // 9 — Third, build your own distribution. A unique voice and a loyal community or audience is an edge AI can't take from anyone.
  <ImageSlide
    key="mika-linkedin-hero"
    src={`${LIB}/mika-linkedin-hero.png`}
    alt="Mika LinkedIn hero"
    caption="Build your own distribution"
  />,

  // 10 — Follow if you're a woman looking to stay ahead in the age of AI.
  <CtaSlide
    key="cta"
    prompt=""
    headline={
      <>
        <HL>Follow</HL> to stay ahead in the age of AI
      </>
    }
    headlinePlain
  />,
];

export default function AiRewardsWomensSkillsDeckPage() {
  return <Deck slides={slides} />;
}
