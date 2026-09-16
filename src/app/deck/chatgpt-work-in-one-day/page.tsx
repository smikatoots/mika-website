import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { deckType } from "@/components/deck/deck-styles";
import { Notes } from "@/components/deck/reveal-parts";
import { A, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "5 Things to Setup ChatGPT Work in One Day",
};

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Here's how to set up ChatGPT Work in one day. If you're new, it might feel super overwhelming, so let me show you how you get started so you can make the most use of the product.
  <Fragment key="hook">
    <ImageSlide
      src={`${LIB}/chatgpt-work.webp`}
      alt="The ChatGPT Work wordmark on a blue gradient"
    />
    <Notes>
      Here&apos;s how to set up ChatGPT Work in one day. If you&apos;re new, it
      might feel super overwhelming, so let me show you how you get started so
      you can make the most use of the product.
    </Notes>
  </Fragment>,

  // 2 — If you're new, it might feel super overwhelming.
  <Fragment key="overwhelmed">
    {/* 383x291 source — capped so a small meme GIF isn't blown up across the
        1440x810 canvas. */}
    <ImageSlide
      src={`${LIB}/overwhelmed.gif`}
      alt="Jimmy Fallon, captioned 'cause I was just like"
      maxWidth="max-w-3xl"
    />
    <Notes>
      If you&apos;re new, it might feel super overwhelming — so let me show you
      how to get started so you can make the most use of the product.
    </Notes>
  </Fragment>,

  // 3 — (the desktop app itself, on its own slide)
  <Fragment key="desktop-app-shot">
    <ImageSlide
      src={`${LIB}/chatgpt-work-project-picker.png`}
      alt="The ChatGPT desktop app asking 'What should we work on?', with the company-brain local folder and Plugins attached below the chat bar"
    />
    <Notes>
      This is the desktop app — note the local folder and the plugins attached
      right under the chat bar. That is what the browser version can&apos;t do.
    </Notes>
  </Fragment>,

  // 4 — First, download the actual ChatGPT desktop app. Don't use chatgpt.com. The desktop app executes work across your tools, works in your local folders and files. On the browser you're just chatting with it.
  <Fragment key="desktop-app">
    <TextSlide number="01">
      Download the <HL>desktop app</HL>
    </TextSlide>
    <Notes>
      Okay, first, you want to download the actual ChatGPT desktop app.
      Don&apos;t use chatgpt.com. The reason for this is that the ChatGPT
      desktop app actually executes work across your tools, works in your local
      folders and files on your desktop, and on your actual computer. With
      ChatGPT on the browser, you&apos;re just chatting with it versus doing
      stuff with it.
    </Notes>
  </Fragment>,

  // 5 — Once you're set up, create a project folder. Two ways: make a new folder on your desktop and select it in the chat, or click "New Project" in the chatbar and select that folder.
  <Fragment key="project-folder">
    <ImageSlide
      src={`${LIB}/chatgpt-work-new-folder-desktop.png`}
      alt="macOS Finder on the Desktop with the right-click menu open and New Folder highlighted"
      captionSize={deckType.statementSm}
      caption={
        <>
          2 · Create a <A>project folder</A>
        </>
      }
    />
    <Notes>
      Once you&apos;re set up, create a project folder. You can do this in two
      ways. One: create a new folder on your desktop, then select it in the
      chat, choose the dropdown on ChatGPT, and select it in the chat. Two:
      click &ldquo;New Project&rdquo; in the chatbar and select that folder.
    </Notes>
  </Fragment>,

  // 6 — You can save certain projects under that project folder so your AI has memory across that project from past conversations, and can save new information in that same folder.
  <Fragment key="project-memory">
    <ImageSlide
      src={`${LIB}/slash-memory.gif`}
      alt="Core memory unlocking"
      caption={
        <>
          It keeps <A>memory</A> across the project
        </>
      }
    />
    <Notes>
      You can save certain projects under that project folder so that your AI
      has memory across that project from past conversations and can save new
      information in that same project folder as well.
    </Notes>
  </Fragment>,

  // 7 — Next, go to Plugins, Integrations, then Plugins, and connect the tools you already use: Slack, Notion, meeting notes, your calendar, your Gmail. ChatGPT has a whole marketplace you can search via their directory.
  <Fragment key="plugins">
    <ImageSlide
      src={`${LIB}/chatgpt-work-plugins.png`}
      alt="The ChatGPT Plugins settings page listing Slack, Notion, Granola, Google Calendar and Gmail all toggled on, with a Browse directory button"
      captionSize={deckType.statementSm}
      caption={
        <>
          3 · Connect your <A>tools</A>
        </>
      }
    />
    <Notes>
      Next, you&apos;re going to want to go to Plugins, Integrations, and then
      Plugins, and connect all the different tools that you&apos;re already
      using, like Slack, Notion, meeting notes, your calendar, your Gmail. This
      is so your ChatGPT both gets memory and reads from these tools, but also
      executes tasks across all the tools you&apos;re already using. ChatGPT has
      a whole marketplace of tools you can search through via their directory.
    </Notes>
  </Fragment>,

  // 8 — Next, create a scheduled task. Every Wednesday I ask the agent to audit my website. Or ask it for a daily brief off your emails and calendar.
  <Fragment key="scheduled-task">
    <ImageSlide
      src={`${LIB}/chatgpt-work-scheduled-tasks.png`}
      alt="ChatGPT Scheduled tasks panel showing 'Mika Website Growth Audit' every Wednesday at 8:00 AM and 'Weekend AI Read' on Saturdays"
      captionSize={deckType.statementSm}
      caption={
        <>
          4 · Create a <A>scheduled task</A>
        </>
      }
    />
    <Notes>
      Next, create a scheduled task. For example, every Wednesday, I ask the
      agent to look at my website and tell me ways I can do an audit on my
      website. Or you can ask it to give you a daily brief, looking at your
      emails and calendar to tell you what to focus on that day.
    </Notes>
  </Fragment>,

  // 9 — Lastly, create an interactive dashboard or visualization. On Claude it's a live artifact; on ChatGPT it builds it with sites. I made a visualization of who was attending my recent event, and a live health dashboard.
  <Fragment key="dashboard">
    <ImageSlide
      src={`${LIB}/chatgpt-work-audience-dashboard.png`}
      alt="An audience intelligence dashboard: 'Who's coming to Claude for Content Creation?' with 121 approved guests, 98% using Claude weekly or daily, 37 founders and owners, 73 who want brand design systems"
      captionSize={deckType.statementSm}
      caption={
        <>
          5 · Build a <A>live dashboard</A>
        </>
      }
    />
    <Notes>
      Lastly, create an interactive dashboard or visualization. On Claude, this
      is like a live artifact. On ChatGPT, it&apos;ll create it using sites. For
      example, I asked it to create a visualization of who was attending my
      recent event. I&apos;ve also created my own live health dashboard to
      monitor my health metrics weekly.
    </Notes>
  </Fragment>,

  // 10 — CTA: If you want a guide going through all of these, comment Mika below and I'll send it over.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="for the full setup guide"
    />
    <Notes>
      If you want a guide going through all of these, comment Mika below and
      I&apos;ll send it over.
    </Notes>
  </Fragment>,
];

export default function Page() {
  return <Deck slides={slides} />;
}
