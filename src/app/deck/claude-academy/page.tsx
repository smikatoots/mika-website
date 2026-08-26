import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Claude Academy" };

const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — Anthropic just dropped 387 free AI courses and live webinars. But 375 of them might waste your time. Here's the three I'd start with.
  <TextSlide key="hook">
    <HL>387</HL> courses. <HL delay={0.12}>3</HL> that matter.
  </TextSlide>,

  // 2 — It's called Claude Academy, it's free, and it just got a big upgrade. It's also completely overwhelming.
  <ImageSlide
    key="homepage"
    src={`${LIB}/claude-academy-homepage.png`}
    alt="Welcome to Claude Academy"
  />,

  // 3 — I have a whole page of AI links I swore I'd get to. Nick and I run our company with two people, so I don't get to study things, I get to pick one and use it Monday.
  <ImageSlide key="mika-and-nick" src={`${LIB}/mika-and-nick.jpeg`} alt="Mika and Nick" />,

  // 4 — Before any course, the thing I'd actually put on my calendar is the live webinars if you can make it. You can ask Anthropic's own team your questions in real time.
  <ImageSlide
    key="webinars"
    src={`${LIB}/claude-academy-webinars.png`}
    alt="Upcoming live webinars on Claude Academy"
  />,

  // 5 — First, AI Fluency Framework and Foundations. It's the base layer, how to think with AI. You can also do the AI fluency one for your specific role.
  <ImageSlide
    key="fluency-courses"
    src={`${LIB}/claude-academy-fluency-courses.png`}
    alt="AI Fluency course list on Claude Academy"
  />,

  // 6 — Second, pick one tool and go deep. Claude Code if you lean slightly more technical or advanced with AI, and Claude Cowork if you're not.
  <ImageSlide
    key="cowork-vs-code"
    src={`${LIB}/claude-academy-cowork-vs-code.png`}
    alt="Claude Cowork and Claude Code courses side by side"
  />,

  // 7 — Third, go to All Resources, click Use Cases, and filter to your role. Marketing courses go from 387 down to about 12.
  <ImageSlide
    key="role-filter"
    src={`${LIB}/claude-academy-role-filter.png`}
    alt="Filtering Claude Academy use cases by role"
  />,

  // 8 — Comment MIKA for the guide and link to Claude Academy & tell me what other questions you have about Claude so I can help you out.
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="for guide + lmk any other questions!"
  />,
];

export default function ClaudeAcademyDeckPage() {
  return <Deck slides={slides} />;
}
