import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import {
  A,
  CoverSlide,
  DualImageSlide,
  HL,
  ImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = { title: "Why fintechs are hiring creators" };

const LIB = "/decks/_library";

/**
 * The four creators, as four photographs and nothing else.
 *
 * Not a drawn diagram: it is the four avatars Mika put under "For the deck →
 * first slide" on the Notion page, cropped to circles and laid out 2x2. Sizes
 * are fixed px because the slide canvas is a fixed 1440x810 that Reveal scales
 * — `vh` would key off the window instead and fight that scaling.
 */
function CreatorGrid() {
  const faces = [
    { src: `${LIB}/fintech-creators-vivian-tu.png`, alt: "Vivian Tu, Your Rich BFF" },
    { src: `${LIB}/fintech-creators-natalie-avatar.png`, alt: "Corporate Natalie" },
    { src: `${LIB}/fintech-creators-catgpt.png`, alt: "Cat Goetze, CatGPT" },
    { src: `${LIB}/fintech-creators-bhaumik.png`, alt: "Bhaumik Patel" },
  ];

  return (
    <div className="grid grid-cols-2 gap-8">
      {faces.map((face) => (
        <Image
          key={face.src}
          src={face.src}
          alt={face.alt}
          width={340}
          height={340}
          priority
          className="h-[340px] w-[340px] rounded-full object-cover"
        />
      ))}
    </div>
  );
}

const slides: SlideInput[] = [
  // 1 — What do these 4 creators ALL have in common? The short answer has
  //     everything and nothing to do with AI.
  <Fragment key="four-creators">
    <CoverSlide diagram={<CreatorGrid />} />
    <Notes>
      What do these 4 creators ALL have in common? The short answer has
      everything and nothing to do with AI.
    </Notes>
  </Fragment>,

  // 2 — SoFi brought on Your Rich BFF as Financial Advisor.
  <Fragment key="vivian-sofi">
    <ImageSlide
      src={`${LIB}/fintech-creators-vivian-sofi-article.png`}
      alt="Headline: How Vivian Tu went from creator to SoFi's chief of financial empowerment"
    />
    <Notes>SoFi brought on Your Rich BFF as Financial Advisor.</Notes>
  </Fragment>,

  // 3 — And Corporate Natalie as "Career Coach".
  <Fragment key="natalie-sofi">
    <ImageSlide
      src={`${LIB}/fintech-creators-natalie-sofi-post.png`}
      alt="Corporate Natalie's post: 2019 graduating from Notre Dame with no idea what she was passionate about, 2026 back on campus as SoFi's Career Coach"
    />
    <Notes>And Corporate Natalie as &ldquo;Career Coach.&rdquo;</Notes>
  </Fragment>,

  // 4 — Smooth Media, a creator management company, made CatGPT an advisor.
  <Fragment key="catgpt-smooth">
    <ImageSlide
      src={`${LIB}/fintech-creators-catgpt-smooth-linkedin.png`}
      alt="Cat Goetze's LinkedIn post announcing she is strategic advisor to Smooth Media, linking an Axios story: CatGPT creator becomes part-owner of Smooth Media"
      framed
    />
    <Notes>
      Smooth Media, a creator management company, made CatGPT an advisor — and
      the Axios headline says part-owner.
    </Notes>
  </Fragment>,

  // 5 — Clay, fresh off a $115M raise at a $7.1B valuation, has a Creator in
  //     Residence and a Head of Narratives.
  <Fragment key="bhaumik-clay">
    <ImageSlide
      src={`${LIB}/fintech-creators-bhaumik-clay-tweet.png`}
      alt="Bhaumik Patel's post: started a job as a creator-in-residence at Clay"
      caption={
        <>
          <A>$115M</A> raise · <A>$7.1B</A> valuation
        </>
      }
      framed
    />
    <Notes>
      Clay, fresh off a $115M raise at a $7.1B valuation, has a Creator in
      Residence and a Head of Narratives.
    </Notes>
  </Fragment>,

  // 6 — The answer is these creators were all hired by companies like SoFi,
  //     Smooth Media, and Clay making the same bet but not necessarily in the
  //     AI space.
  <Fragment key="same-bet">
    <TextSlide>
      Different companies. The <HL>exact same bet</HL>.
    </TextSlide>
    <Notes>
      The answer is these creators were all hired by companies like SoFi, Smooth
      Media, and Clay making the same bet — but not necessarily in the AI space.
    </Notes>
  </Fragment>,

  // 7 — Instead, they acknowledge that AI makes products easier to build.
  //     Differentiation now comes from memorable stories and trusted
  //     distribution. And they can get that by hiring badass creators.
  <Fragment key="easier-to-build">
    <ImageSlide
      src={`${LIB}/wsj-solopreneurs-doubled-tripled.png`}
      alt="WSJ headline: Stripe Data — $1M solopreneurs doubled, $10M cohort nearly tripled"
      framed
    />
    <Notes>
      They acknowledge that AI makes products easier to build. Differentiation
      now comes from memorable stories and trusted distribution — and they can
      get that by hiring badass creators.
    </Notes>
  </Fragment>,

  // 8 — A career hill I will die on is that you DO NOT get rich, and especially
  //     not time rich, with a high salary alone.
  <Fragment key="salary-alone">
    <ImageSlide
      src={`${LIB}/openai-860k-salary.png`}
      alt="An OpenAI offer listing: $860K total per year"
      caption={
        <>
          A huge salary. Still not <A>time-rich</A>.
        </>
      }
    />
    <Notes>
      A career hill I will die on: you do not get rich, and especially not
      time-rich, on a high salary alone. It might even make you poor, because
      you&apos;re stuck not knowing the value of equity and ownership — which
      not a lot of people value.
    </Notes>
  </Fragment>,

  // 9 — I didn't build my personal brand with the first startup I raised for
  //     and sold, and I'm no longer making that mistake.
  <Fragment key="startup-one-vs-two">
    <DualImageSlide
      left={{
        src: `${LIB}/timeline-founder-life.jpeg`,
        alt: "Mika's Forbes 30 Under 30 Asia profile: Cofounder, Parallax",
      }}
      right={{
        src: `${LIB}/mika-and-nick.jpeg`,
        alt: "Mika and Nick, co-founders of King's Cross Labs",
      }}
    />
    <Notes>
      I didn&apos;t build my personal brand with the first startup I raised for
      and sold, and I&apos;m no longer making that mistake — because the proof
      is right there that a personal brand is tied to building a better
      business. Creators bring both, which is why their roles now include
      titles, advisory seats, and most importantly equity that helps them become
      time-rich.
    </Notes>
  </Fragment>,

  // 10 — CTA: Do you think every company will eventually hire a creator?
  <Fragment key="cta">
    {/* Full-width question, no preview: the two-column prompt + preview layout
        squeezes a question this long into a narrow column and breaks it
        mid-word. */}
    <CtaSlide
      prompt="Will every company hire a creator?"
      headline={null}
      headlinePlain
    />
    <Notes>
      Do you think every company will eventually hire a creator? I love to talk
      about the ownership economy as a creator and founder living this life in
      the age of AI — so follow for more.
    </Notes>
  </Fragment>,
];

export default function Page() {
  return <Deck slides={slides} />;
}
