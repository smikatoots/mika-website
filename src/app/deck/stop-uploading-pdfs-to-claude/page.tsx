import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { ImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Stop Uploading PDFs to Claude" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — When you drop a PDF into Claude, you get charged twice, when it converts the PDF to an image and when it reads the text.
  <Fragment key="charged-twice">
    <ImageSlide src={`${LIB}/pdf-logo.jpg`} alt="The PDF logo" />
    <Notes>
      When you drop a PDF into Claude, you get charged twice — once when it converts the PDF to an
      image, and again when it reads the text.
    </Notes>
  </Fragment>,

  // 2 — So here are two fixes including a skill that Microsoft built.
  <Fragment key="microsoft">
    <ImageSlide src={`${LIB}/microsoft-logo.png`} alt="The Microsoft logo" />
    <Notes>So here are two fixes, including a skill that Microsoft built.</Notes>
  </Fragment>,

  // 3 — I'm Mika Reyes, an ex-LinkedIn founder of an AI startup. I've raised $5M and sold my first one.
  <Fragment key="credibility">
    <ImageSlide
      src={`${LIB}/mika-linkedin-hero.png`}
      alt="Mika Reyes' LinkedIn profile, Founder and CEO, with a banner of Forbes 30 Under 30, Tatler Gen.T, TechCrunch and Tech in Asia press logos"
    />
    <Notes>
      I&apos;m Mika Reyes, an ex-LinkedIn founder of an AI startup. I&apos;ve raised $5M and sold my
      first one. And I talk about practical tips, how to stay ahead, and entrepreneurship in the
      post-AI world.
    </Notes>
  </Fragment>,

  // 4 — You're charged about 1000-2000 tokens for each read. The fix is to convert it to markdown.
  <Fragment key="token-cost">
    <ImageSlide
      src={`${LIB}/claude-context-window.png`}
      alt="Claude's usage panel showing the context window at 86.5k of 1.0M tokens used, plus the 5-hour and weekly plan limits"
    />
    <Notes>
      So what happens with PDFs is you&apos;re charged about 1,000 to 2,000 tokens for each read. The
      fix is you want to convert it to markdown, which is a type of text that makes it easy for AI to
      read. A lot of people refer to these as &quot;.md&quot; files.
    </Notes>
  </Fragment>,

  // 5 — First way is to go to the CloudConvert website, drop in the PDF and receive a markdown file.
  <Fragment key="cloudconvert">
    <ImageSlide
      src={`${LIB}/stop-uploading-pdfs-to-claude-cloudconvert-pdf-to-md.png`}
      alt="The CloudConvert PDF to Markdown Converter page, showing a PDF file converting to an MD file and a Select File upload box"
    />
    <Notes>
      First way is to go to the CloudConvert website, drop in the PDF, and receive a markdown file.
      If you&apos;re doing this a LOT of times and want to do it programmatically, they even have an
      API for you to use.
    </Notes>
  </Fragment>,

  // 6 — Second you can do this with a skill on Claude from Microsoft called /markitdown.
  <Fragment key="markitdown">
    <ImageSlide
      src={`${LIB}/stop-uploading-pdfs-to-claude-markitdown-github.png`}
      alt="The microsoft/markitdown GitHub repo with 184k stars, described as a Python tool for converting files and office documents to Markdown"
    />
    <Notes>
      Second, you can also do this with a skill on Claude from Microsoft called slash markitdown,
      which converts it for you directly on Claude or ChatGPT.
    </Notes>
  </Fragment>,

  // 7 — If you want links to these and how to install, comment MIKA and I'll send it over.
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="MIKA" sub="for the links + install guide" />
    <Notes>
      If you want links to these and how to install them, comment MIKA and I&apos;ll send it over.
    </Notes>
  </Fragment>,
];

export default function StopUploadingPdfsToClaudeDeckPage() {
  return <Deck slides={slides} />;
}
