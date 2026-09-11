import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { DualImageSlide, HL, ImageSlide, S, TextSlide } from "@/components/deck/slide-parts";
import { Notes, StepsBuildSlide } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "The AI-Era Job Nobody Saw Coming: Travel Advisor",
};

const LIB = "/decks/_library";

/**
 * A sized, framed box so an `Image` with `fill` works as a `StepsBuildSlide`
 * right-side visual. Portrait crop, `object-contain` so the burned-in captions
 * on the source clips stay readable.
 */
function StepVisual({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]">
      <Image src={src} alt={alt} fill sizes="32rem" className="object-contain" />
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — LinkedIn published one of the fastest-growing jobs 2 years in a row,
  //     with the top folks getting paid $800k a year.
  <Fragment key="liv-hook">
    <DualImageSlide
      left={{
        src: `${LIB}/ai-era-job-travel-advisor-liv-400k-client-call.png`,
        alt: "A travel advisor poolside on the phone, captioned: calling my client's dad to ask if she can take a $400k trip with her friends — all in we're looking at like $410,000",
      }}
      right={{
        src: `${LIB}/ai-era-job-travel-advisor-liv-miami-hotel-rolls-royce.png`,
        alt: "A travel advisor on a lounger in Miami, captioned: pageant queen crashes into client's Rolls Royce at Miami hotel",
      }}
    />
    <Notes>
      {
        "LinkedIn published one of the fastest-growing jobs 2 years in a row, with the top folks getting paid $800k a year and you might already be qualified for it."
      }
    </Notes>
  </Fragment>,

  // 2 — It's not AI, it's not sales, it doesn't need a degree or a portfolio
  //     and it's not even in tech.
  <Fragment key="not-tech">
    <TextSlide>
      Not AI. Not sales. <HL>Not even tech.</HL>
    </TextSlide>
    <Notes>
      {
        "It's not AI, it's not sales, it doesn't need a degree or a portfolio and it's not even in tech!!!"
      }
    </Notes>
  </Fragment>,

  // 3 — It's a travel advisor or agent. Like literally planning trips for
  //     other people.
  <Fragment key="linkedin-jobs-on-rise">
    <ImageSlide
      src={`${LIB}/ai-era-job-travel-advisor-linkedin-jobs-on-rise.png`}
      alt="LinkedIn Jobs on the Rise: #18 Travel advisors — also known as travel agents. Most jobs in New York City, Miami, Los Angeles."
      framed
    />
    <Notes>
      {"It's a travel advisor or agent! Like literally planning trips for other people."}
    </Notes>
  </Fragment>,

  // 4 — Travel agent jobs dropped almost 70% between 2000 and 2021.
  <Fragment key="dropped-70">
    <TextSlide>
      Travel agent jobs dropped <HL>~70%</HL>
    </TextSlide>
    <Notes>
      {
        "Everyone assumed reviews and AI killed travel agents and for some good reason. Travel agent jobs dropped almost 70% between 2000 and 2021 with the rise of just searching travels yourself on the Internet."
      }
    </Notes>
  </Fragment>,

  // 5 — But the Bureau of Labor Statistics now projects 20% growth through 2031.
  <Fragment key="bls-growth">
    <TextSlide>
      Bureau of Labor Statistics: <HL>20% growth</HL>
    </TextSlide>
    <Notes>
      {
        "But the Bureau of Labor Statistics now projects 20% growth through 2031. That's four times the average job."
      }
    </Notes>
  </Fragment>,

  // 6 — In the AI age and post-COVID, more people want better experiences and
  //     a real person handling it.
  <Fragment key="wsj-headline">
    <ImageSlide
      src={`${LIB}/ai-era-job-travel-advisor-wsj-headline.png`}
      alt="Wall Street Journal headline: Who Needs a Travel Agent in the Digital Age? Apparently, More People Than Ever"
      framed
    />
    <Notes>
      {
        "Turns out in the AI age and post-COVID when we're stuck to our screens and talking to AI all day, more people want BETTER experiences and a real person handling it."
      }
    </Notes>
  </Fragment>,

  // 7 — An AI agent can tell you what's nearby and what it costs but not
  //     whether the experience is actually worth it.
  <Fragment key="ai-cant-judge">
    <TextSlide>
      AI: what&apos;s nearby + what it costs. <HL>NOT what&apos;s worth it.</HL>
    </TextSlide>
    <Notes>
      {
        "An AI agent can tell you what's nearby and what it costs but not whether the experience is actually worth it."
      }
    </Notes>
  </Fragment>,

  // 8 — AI takes the admin work off a travel agent's plate, so what's left is
  //     the human touch.
  <Fragment key="human-part">
    <TextSlide display>
      AI takes <S>admin</S>
    </TextSlide>
    <Notes>
      {
        "And AI is accelerating this job because it takes the admin work off a travel agents plate, so what's left is the human touch."
      }
    </Notes>
  </Fragment>,

  // 9 — Why I like this opportunity: it pays well, it's time-rich, flexible
  //     schedule, and you get paid to travel and vet the spots yourself.
  <Fragment key="why-i-like-it">
    <StepsBuildSlide
      steps={["Pays well", "Flexible schedule", "Paid to travel and vet the spots"]}
      visuals={[
        <StepVisual
          key="pays-well"
          src={`${LIB}/ai-era-job-travel-advisor-liv-400k-client-call.png`}
          alt="A travel advisor on a client call about a $410,000 trip"
        />,
        // Step 2 has no photo of its own — a calendar carries "flexible
        // schedule" on its own and keeps the visual column from going blank.
        <div
          key="flexible-schedule"
          className="flex h-full w-full items-center justify-center text-[16rem] leading-none"
          role="img"
          aria-label="Calendar"
        >
          🗓️
        </div>,
        <StepVisual
          key="paid-to-travel"
          src={`${LIB}/ai-era-job-travel-advisor-liv-miami-hotel-rolls-royce.png`}
          alt="A travel advisor working poolside at a Miami hotel"
        />,
      ]}
    />
    <Notes>
      {
        "The real reason I like this opportunity: it pays well and it's time-rich. Flexible schedule, and you get paid to travel and vet the spots yourself. If you're already the Type A planner of your friend group, it's time to shine."
      }
    </Notes>
  </Fragment>,

  // 10 — What do you think? Overlooked form of entrepreneurship?
  //      Follow to build a time-rich life with AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Overlooked form of entrepreneurship?"
      headline={
        <>
          Follow to build a <HL>time-rich</HL> life with AI.
        </>
      }
      headlinePlain
      size="mlg"
    />
    <Notes>
      {
        "What do you think? Overlooked form of entrepreneurship? Let me know below. Follow to build a time-rich life with AI."
      }
    </Notes>
  </Fragment>,
];

export default function AiEraJobTravelAdvisorDeckPage() {
  return <Deck slides={slides} />;
}
