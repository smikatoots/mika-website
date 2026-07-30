import type { Metadata } from "next";
import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide, PointSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Skills to study in the age of AI" };
const LIB = "/decks/_library";

const slides: React.ReactNode[] = [
  // 1 — The New York Times just published a list of skills AI can't touch and what classes to take to cultivate these skills.
  <ImageSlide
    key="nyt-major-in-human"
    src={`${LIB}/nyt-article-major-in-human.png`}
    alt="New York Times: major in being human / what to study in the age of AI"
  />,

  // 2 — If I were entering college again or raising kids in the age of AI, these are the skills to build so we're future-proof.
  <TextSlide key="future-proof" display>
    <span>
      <HL>Future-proof</HL> in the age of AI.
    </span>
  </TextSlide>,

  // 3 — They all ladder up to one thing: taste. Liberal arts classes build taste AI can't replace.
  <ImageSlide
    key="you-have-taste"
    src={`${LIB}/you-have-taste.gif`}
    alt="You have taste"
  />,

  // 4 — First, build a distinct voice.
  <PointSlide key="voice" emoji="🗣️">
    Build a distinct voice.
  </PointSlide>,

  // 5 — Second, develop a spiky point of view.
  <PointSlide key="spiky-pov" emoji="🌶️">
    Develop a spiky point of view.
  </PointSlide>,

  // 6 — Third, cultivate empathy.
  <PointSlide key="empathy" emoji="🫂">
    Cultivate empathy.
  </PointSlide>,

  // 7 — AI changed the game & is now rewarding the liberal arts majors like myself for it.
  <TextSlide key="liberal-arts-majors" display>
    <span>
      <HL>Liberal arts majors</HL> 🫡
    </span>
  </TextSlide>,

  // 8 — Follow me + comment MIKA for the essay.
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL> for the essay
      </>
    }
    headlinePlain
    size="mlg"
    textWide
    preview={`${LIB}/nyt-article-major-in-human.png`}
    previewAlt="NYT: major in being human"
  />,
];

export default function Page() {
  return <Deck slides={slides} />;
}
