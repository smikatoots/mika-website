import { Fragment } from "react";
import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "LinkedIn's Chief Economist on the Most Valuable Skill in the AI Age",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — LinkedIn's Chief Economic Opportunity Officer says the most valuable
  //     skill in the AI age isn't coding, and it isn't prompting. It's this
  //     instead, and 70% of executives already agree with him.
  <Fragment key="aneesh">
    <ImageSlide
      src={`${LIB}/linkedin-economist-skill-aneesh-raman.png`}
      alt="Aneesh Raman, LinkedIn's Chief Economic Opportunity Officer"
    />
    <Notes>
      LinkedIn&apos;s Chief Economic Opportunity Officer says the most valuable
      skill in the AI age isn&apos;t coding, and it isn&apos;t prompting.
      It&apos;s this instead, and 70% of executives already agree with him.
    </Notes>
  </Fragment>,

  // 2 — His name is Aneesh Raman, and he wrote this in the New York Times.
  <Fragment key="nyt">
    <ImageSlide
      src={`${LIB}/linkedin-economist-skill-nyt-headline.png`}
      alt="New York Times opinion guest essay: When Your Technical Skills Are Eclipsed, Your Humanity Will Matter More Than Ever"
    />
    <Notes>
      His name is Aneesh Raman, and he wrote this in the New York Times.
    </Notes>
  </Fragment>,

  // 3 — I was a product lead at LinkedIn.
  //     Plan called for `linkedin-logo` "(library)" — no such file exists in
  //     public/decks/_library. Falls back per the image ladder to the real
  //     Mika-at-LinkedIn receipt (tier 2 credibility beats a tier 3 logo).
  <Fragment key="linkedin-era">
    <ImageSlide
      src={`${LIB}/mika-linkedin-era.png`}
      alt="Mika on a LinkedIn team call, #TEAMHIRING backgrounds"
    />
    <Notes>I was a product lead at LinkedIn.</Notes>
  </Fragment>,

  // 4 — And we watch data on a billion people's jobs, titles and skills change
  //     in real time.
  //     Same missing `linkedin-logo` fallback: a real LinkedIn profile is the
  //     most literal stand-in for jobs / titles / skills data, and keeps this
  //     beat visually distinct from slide 3.
  <Fragment key="linkedin-data">
    <ImageSlide
      src={`${LIB}/mika-linkedin-hero.png`}
      alt="A LinkedIn profile showing job title, headline, followers and connections"
    />
    <Notes>
      And we watch data on a billion people&apos;s jobs, titles and skills
      change in real time.
    </Notes>
  </Fragment>,

  // 5 — Aneesh says that: 70% of executives on LinkedIn value soft skills more
  //     than technical skills in the AI era.
  <Fragment key="seventy">
    <TextSlide>
      <HL>70%</HL> execs value soft over technical skills
    </TextSlide>
    <Notes>
      Aneesh says that 70% of executives on LinkedIn value soft skills more than
      technical skills in the AI era.
    </Notes>
  </Fragment>,

  // 6 — 78% of America's ten biggest-employing jobs rate uniquely human skills
  //     as important. Things like negotiating, motivating a team, building
  //     relationships.
  <Fragment key="seventy-eight">
    <TextSlide>
      <HL>78%</HL> value negotiating, motivating, relationships
    </TextSlide>
    <Notes>
      78% of America&apos;s ten biggest-employing jobs rate uniquely human
      skills as important. Things like negotiating, motivating a team, building
      relationships.
    </Notes>
  </Fragment>,

  // 7 — The most valuable skill in the AI era according to LinkedIn is
  //     communication. Which makes sense, because prompting is just
  //     communication.
  <Fragment key="communication">
    <TextSlide>
      <span className="block">#1 SKILL:</span>
      <HL>COMMUNICATION</HL>
    </TextSlide>
    <Notes>
      The most valuable skill in the AI era according to LinkedIn is
      communication. Which makes sense, because prompting is just communication.
      If you can&apos;t explain what you want to a person, you can&apos;t explain
      it to Claude either.
    </Notes>
  </Fragment>,

  // 8 — Aneesh calls it the shift from a knowledge economy to a relationship
  //     economy. Muscle, then brains, then people.
  <Fragment key="economy-shift">
    <TextSlide display>💪 → 🧠 → 🤝</TextSlide>
    <Notes>
      Aneesh calls it the shift from a knowledge economy to a relationship
      economy. Jobs used to run on muscle in the industrial revolution, then on
      brains in the knowledge economy. The next ones run on people.
    </Notes>
  </Fragment>,

  // 9 — So if you're the humanities degree holder or English major or
  //     non-technical one in the room, you're not behind.
  <Fragment key="humanities">
    <TextSlide>humanities &amp; english majors 💸</TextSlide>
    <Notes>
      So if you&apos;re the humanities degree holder or English major or
      non-technical one in the room, you&apos;re not behind. You&apos;ve been
      building the expensive skill this whole time.
    </Notes>
  </Fragment>,

  // 10 — Let me know what you think in the comments and follow to build a
  //      time-rich career & life on your own terms with AI.
  <Fragment key="cta">
    <CtaSlide
      prompt="Follow for a"
      headline="TIME RICH"
      sub="career & life with AI"
    />
    <Notes>
      Let me know what you think in the comments and follow to build a time-rich
      career and life on your own terms with AI.
    </Notes>
  </Fragment>,
];

export default function LinkedinEconomistSkillDeckPage() {
  return <Deck slides={slides} />;
}
