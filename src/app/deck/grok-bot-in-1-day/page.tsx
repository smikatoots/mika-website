import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import type { SlideInput } from "@/components/deck/deck-slide";
import { A, ImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "How to Get Started with Grok Bot in 1 Day",
};

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — Did you know your AI agents can talk to each other in a group chat?
  <Fragment key="group-chat">
    <ImageSlide
      src={`${LIB}/grok-bot-landing-page.png`}
      alt="Grok Bot landing page showing a sidebar of named agents — Chief, Sales Outbound, Inbox Manager, Account Manager, Talent Scout — passing messages to each other"
    />
    <Notes>
      Did you know your AI agents can talk to each other in a group chat?
    </Notes>
  </Fragment>,

  // 2 — I'm Mika Reyes. I'm an ex-LinkedIn founder of an AI startup. I raised $5M and sold my first one.
  <Fragment key="credibility">
    <ImageSlide
      src={`${LIB}/mika-linkedin-hero.png`}
      alt="Mika Reyes' LinkedIn profile: Founder & CEO, Forbes 30 Under 30, Tatler GenT, KP Fellow"
    />
    <Notes>
      I&apos;m Mika Reyes. I&apos;m an ex-LinkedIn founder of an AI startup. I
      raised $5M and sold my first one.
    </Notes>
  </Fragment>,

  // 3 — Grok Bot is sweeping the internet because it feels like what OpenClaw should have been if it were designed for normal people. Here are the 5 things to know so you can get inspired & be setup for success.
  <Fragment key="vs-openclaw">
    <ImageSlide src={`${LIB}/openclaw-logo.png`} alt="OpenClaw" />
    <Notes>
      Grok Bot is sweeping the internet because it feels like what OpenClaw
      should have been if it were designed for normal people. Here are the 5
      things to know so you can get inspired and be set up for success.
    </Notes>
  </Fragment>,

  // 4 — I personally resisted using YET ANOTHER AI agent tool. Then the FOMO got me, I tried it, and honestly, I quite like it BECAUSE there isn't as much to setup compared to OpenClaw.
  <Fragment key="resisted">
    <ImageSlide
      src={`${LIB}/skeptic.gif`}
      alt="A skeptical side-eye look"
    />
    <Notes>
      I personally resisted using yet another AI agent tool. Then the FOMO got
      me, I tried it, and honestly, I quite like it because there isn&apos;t as
      much to set up compared to OpenClaw.
    </Notes>
  </Fragment>,

  // 5 — So once you've downloaded Grok Bot on your desktop and phone, do these five things.
  <Fragment key="download">
    <ImageSlide
      src={`${LIB}/grok-bot-installer.png`}
      alt="The Grok Bot macOS installer: drag the Grok Bot icon into the Applications folder"
    />
    <Notes>
      So once you&apos;ve downloaded Grok Bot on your desktop and phone, do
      these five things.
    </Notes>
  </Fragment>,

  // 6 — First, create a chief of staff agent. It manages your other AI employees and can spawn specialists for different jobs.
  <Fragment key="chief-of-staff">
    <ImageSlide
      src={`${LIB}/grok-bot-chief-of-staff-chat.png`}
      alt="A Chief of Staff agent chat in Grok Bot, with its own screen and a daily routine listed on the right"
      caption={
        <>
          Create a <A>chief of staff</A>
        </>
      }
    />
    <Notes>
      First, create a chief of staff agent. It manages your other AI employees
      and can spawn specialists for different jobs.
    </Notes>
  </Fragment>,

  // 7 — Second, understand fundamentally that each agent has its own computer and screen, so it can browse websites, click things, and execute tasks for you. Once you understand that, you'll have a better idea of what agents to create.
  <Fragment key="own-computer">
    <ImageSlide
      src={`${LIB}/grok-bot-agent-own-computer.png`}
      alt="A Grok Bot agent driving its own Chrome browser window on its own screen"
      caption={
        <>
          Each agent has its <A>own computer</A>
        </>
      }
    />
    <Notes>
      Second, understand fundamentally that each agent has its own computer and
      screen, so it can browse websites, click things, and execute tasks for
      you. Once you understand that, you&apos;ll have a better idea of what
      agents to create.
    </Notes>
  </Fragment>,

  // 8 — Third, browse the marketplace for agent templates published by other power users. I love that Grok makes it easy to publish your own templates for others to see.
  <Fragment key="marketplace">
    <ImageSlide
      src={`${LIB}/ai-systems-ahead-of-99-grokbot-dr-eggbot.png`}
      alt="A published Grok Bot template in the marketplace: dr eggbot by Lauren Tan, which designs high-quality Grok Bots"
      caption={
        <>
          Browse the <A>marketplace</A>
        </>
      }
    />
    <Notes>
      Third, browse the marketplace for agent templates published by other power
      users. I love that Grok makes it easy to publish your own templates for
      others to see.
    </Notes>
  </Fragment>,

  // 9 — Fourth, connect the apps and plugins you want your agents to use and ask it to give you suggestions on what other tasks to hand over to it.
  <Fragment key="plugins">
    <ImageSlide
      src={`${LIB}/grok-bot-plugins.png`}
      alt="The Grok Bot plugins panel with Gmail, Google Calendar, Google Drive and Granola available to add"
      caption={
        <>
          Connect your <A>apps and plugins</A>
        </>
      }
    />
    <Notes>
      Fourth, connect the apps and plugins you want your agents to use and ask
      it to give you suggestions on what other tasks to hand over to it.
    </Notes>
  </Fragment>,

  // 10 — Fifth, set up routines based on what you browse online regularly already. Mine regularly checks the Dancing with the Stars website so I can grab tickets when they come out.
  <Fragment key="routines">
    <ImageSlide
      src={`${LIB}/grok-bot-routine-setup.png`}
      alt="A Grok Bot routine editor: a daily goals and todos routine that runs every day at 8:59 AM, with its run history"
      caption={
        <>
          Set up <A>routines</A>
        </>
      }
    />
    <Notes>
      Fifth, set up routines based on what you browse online regularly already.
      Mine regularly checks the Dancing with the Stars website so I can grab
      tickets when they come out.
    </Notes>
  </Fragment>,

  // 11 — Comment Mika for my guide, and tell me what you'd want your AI employees to handle first.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for my Grok Bot setup guide"
    />
    <Notes>
      Comment Mika for my guide, and tell me what you&apos;d want your AI
      employees to handle first.
    </Notes>
  </Fragment>,
];

export default function GrokBotInOneDayDeckPage() {
  return <Deck slides={slides} />;
}
