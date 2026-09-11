import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes } from "@/components/deck/reveal-parts";
import {
  CoverSlide,
  HL,
  ImageSlide,
  TextSlide,
} from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = {
  title: "MDP over MVP",
};

const LIB = "/decks/_library";

const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const MUTED = "#8E8E96";

/**
 * The deck's thesis in one picture: the ghosted, struck-out MVP on the left,
 * a coral arrow, and the MDP on the right.
 */
function MdpOverMvpSvg() {
  return (
    <svg
      viewBox="0 0 1200 260"
      className="deck-pop h-auto w-full max-w-6xl"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="var(--font-bricolage), system-ui, sans-serif"
      role="img"
      aria-label="The minimum viable product struck out and replaced by the minimum distributable product."
    >
      {/* MVP — ghosted and struck out */}
      <rect
        x={30}
        y={40}
        width={430}
        height={180}
        rx={28}
        fill="#ffffff"
        stroke={MUTED}
        strokeWidth={2}
      />
      <text
        x={245}
        y={105}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={62}
        fontWeight={800}
        fill={MUTED}
      >
        MVP
      </text>
      <line
        x1={168}
        y1={105}
        x2={322}
        y2={105}
        stroke={MUTED}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <text
        x={245}
        y={170}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
        fontWeight={600}
        fill={MUTED}
      >
        minimum viable product
      </text>

      {/* Coral arrow */}
      <line
        x1={495}
        y1={130}
        x2={592}
        y2={130}
        stroke={ACCENT}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path d="M586 104 L630 130 L586 156 Z" fill={ACCENT} />

      {/* MDP — the replacement */}
      <rect
        x={660}
        y={40}
        width={510}
        height={180}
        rx={28}
        fill="#ffffff"
        stroke={ACCENT}
        strokeWidth={5}
      />
      <text
        x={915}
        y={105}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={66}
        fontWeight={800}
        fill={INK}
      >
        MDP
      </text>
      <text
        x={915}
        y={170}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={24}
        fontWeight={600}
        fill={ACCENT}
      >
        minimum distributable product
      </text>

    </svg>
  );
}

const slides: React.ReactNode[] = [
  // 1 — I raised $5M from VCs. In the AI age, I learned they care less about your MVP and more about a new acronym that many founders need in their pitch.
  <Fragment key="park-bench">
    <ImageSlide
      src={`${LIB}/mdp-over-mvp-mika-park-bench.png`}
      alt="Mika sitting on a park bench"
    />
    <Notes>
      I raised $5M from VCs. In the AI age, I learned they care less about your
      MVP and more about a new acronym that many founders need in their pitch.
    </Notes>
  </Fragment>,

  // 2 — Building a working product is easier now with tools like Claude and Cursor. So VCs don't care about that shit. The harder thing these days is how you grab attention for your product.
  <Fragment key="build-tools">
    <ImageSlide
      src={`${LIB}/claude-logo.png`}
      alt="The Claude logo"
      maxWidth="max-w-2xl"
    />
    <Notes>
      Building a working product is easier now with tools like Claude and
      Cursor. So VCs don&apos;t care about that shit. The harder thing these days
      is how you grab attention for your product.
    </Notes>
  </Fragment>,

  // 3 — So now they care about your MDP. MDP means minimum distributable product. It's something you've built a prototype for but more importantly you've proven how you can actually get it in front of customers.
  <Fragment key="mdp">
    <CoverSlide
      title={
        <>
          Minimum <HL>Distributable</HL> Product
        </>
      }
      diagram={<MdpOverMvpSvg />}
    />
    <Notes>
      So now they care about your MDP. MDP means minimum distributable product.
      It&apos;s something you&apos;ve built a prototype for but more importantly
      you&apos;ve proven how you can actually get it in front of customers.
    </Notes>
  </Fragment>,

  // 4 — Maybe you have 100k followers on Instagram and they converted.
  <Fragment key="ig">
    <TextSlide>
      IG <HL>100k</HL> profile
    </TextSlide>
    <Notes>Maybe you have 100k followers on Instagram and they converted.</Notes>
  </Fragment>,

  // 5 — Maybe you have super fucking good SEO growing 100% week over week
  <Fragment key="seo">
    <TextSlide>
      SEO traffic <HL>100% growth</HL>
    </TextSlide>
    <Notes>
      Maybe you have super fucking good SEO growing 100% week over week.
    </Notes>
  </Fragment>,

  // 6 — Maybe you run a 12,000-person community for RevOps leaders, and 18% joined your AI tool's waitlist.
  <Fragment key="community">
    <TextSlide>
      <HL>12,000-member</HL> community
    </TextSlide>
    <Notes>
      Maybe you run a 12,000-person community for RevOps leaders, and 18% joined
      your AI tool&apos;s waitlist.
    </Notes>
  </Fragment>,

  // 7 — Maybe your free Chrome extension for immigration lawyers has 40,000 weekly users you can convert into paid customers.
  <Fragment key="users">
    <TextSlide>
      <HL>40,000+</HL> users
    </TextSlide>
    <Notes>
      Maybe your free Chrome extension for immigration lawyers has 40,000 weekly
      users you can convert into paid customers.
    </Notes>
  </Fragment>,

  // 8 — Now if you are raising venture capital, make sure extremely intentional about why you're doing it and not just doing it because of the prestige because you can also bootstrap a business.
  <Fragment key="intentional">
    <TextSlide>
      Be <HL>intentional</HL> about VC vs. bootstrap
    </TextSlide>
    <Notes>
      Now if you are raising venture capital, make sure extremely intentional
      about why you&apos;re doing it and not just doing it because of the
      prestige because you can also bootstrap a business.
    </Notes>
  </Fragment>,

  // 9 — But if you are raising, know that the bar is much higher.
  <Fragment key="bar">
    <TextSlide>
      Fundraising? <HL>Bar is higher!</HL>
    </TextSlide>
    <Notes>But if you are raising, know that the bar is much higher.</Notes>
  </Fragment>,

  // 10 — And if I can help as someone who's raised funding before let me know what your product is in the comments and lets brainstorm some MDPs together.
  <Fragment key="cta">
    <CtaSlide
      prompt={null}
      headline={
        <>
          What&apos;s your <HL>MDP</HL>?
        </>
      }
      headlinePlain
    />
    <Notes>
      And if I can help as someone who&apos;s raised funding before let me know
      what your product is in the comments and lets brainstorm some MDPs
      together.
    </Notes>
  </Fragment>,
];

export default function MdpOverMvpDeckPage() {
  return <Deck slides={slides} />;
}
