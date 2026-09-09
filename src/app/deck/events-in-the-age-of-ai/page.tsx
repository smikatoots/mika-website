import { Fragment } from "react";
import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, ImageSlide, DualImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType } from "@/components/deck/deck-styles";

export const metadata: Metadata = {
  title: "Events in the Age of AI",
};

const LIB = "/decks/_library";

/** Shared SVG type treatment — the deck typeface, never a hardcoded family. */
const DECK_FONT = "var(--font-deck)";
const INK = "var(--deck-ink)";
const ACCENT = "var(--deck-accent)";
const MUTED = "#52525B";
const RULE = "#E4E4E7";

/**
 * Slide 3 visual — the registration-screening funnel.
 *
 * A stack of incoming registrations feeds one "AI agent" review box, which
 * sorts them into the coral approved group (serious about content, serious
 * about AI) and a smaller filtered-out group. The coral group is the only
 * accent on the slide: being screened *in* is the point of the diagram.
 */
function RegistrationScreeningSvg() {
  const rows = [56, 126, 196, 266, 336];
  return (
    <svg
      viewBox="0 0 1200 460"
      className="h-[21rem] w-auto max-w-[84rem]"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={DECK_FONT}
      role="img"
      aria-label="A stack of event registrations feeding an AI agent review box, which sorts them into a coral approved group labelled serious about content and serious about AI, and a smaller filtered-out group."
    >
      {/* Incoming registrations */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <text
          x={175}
          y={36}
          textAnchor="middle"
          fill={MUTED}
          fontSize={26}
          fontWeight={700}
          letterSpacing="3"
        >
          REGISTRATIONS
        </text>
        {rows.map((y) => (
          <g key={y}>
            <rect
              x={30}
              y={y}
              width={290}
              height={56}
              rx={16}
              fill="#FFFFFF"
              stroke={RULE}
              strokeWidth={4}
            />
            <circle cx={68} cy={y + 28} r={16} fill={RULE} />
            <rect x={98} y={y + 18} width={180} height={20} rx={10} fill={RULE} />
          </g>
        ))}
      </g>

      {/* Registrations into the reviewer */}
      <g className="deck-fade" style={{ animationDelay: "0.15s" }}>
        <line x1={332} y1={225} x2={358} y2={225} stroke={INK} strokeWidth={5} strokeLinecap="round" />
        <polygon points="356,213 376,225 356,237" fill={INK} />
      </g>

      {/* The reviewer */}
      <g className="deck-fade" style={{ animationDelay: "0.2s" }}>
        <rect
          x={380}
          y={140}
          width={300}
          height={170}
          rx={24}
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth={5}
        />
        <text
          x={530}
          y={215}
          textAnchor="middle"
          fill={INK}
          fontSize={48}
          fontWeight={800}
          letterSpacing="-0.02em"
        >
          AI agent
        </text>
        <text x={530} y={258} textAnchor="middle" fill={MUTED} fontSize={24}>
          screens every one
        </text>
      </g>

      {/* Sorted in */}
      <g className="deck-fade" style={{ animationDelay: "0.3s" }}>
        <path
          d="M 690 200 C 730 200, 742 170, 772 170"
          fill="none"
          stroke={INK}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <polygon points="772,158 792,170 772,182" fill={INK} />
      </g>

      {/* The approved group — the one accent on this slide */}
      <g className="deck-fade" style={{ animationDelay: "0.36s" }}>
        <rect x={800} y={20} width={380} height={300} rx={24} fill={ACCENT} />
        {[78, 130, 182].map((cy) => (
          <g key={cy}>
            <circle cx={848} cy={cy} r={15} fill="#FFFFFF" />
            <rect x={878} y={cy - 13} width={200} height={26} rx={13} fill="#FFFFFF" opacity={0.7} />
          </g>
        ))}
        <text
          x={990}
          y={250}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={30}
          fontWeight={800}
          letterSpacing="-0.02em"
        >
          serious about content
        </text>
        <text
          x={990}
          y={292}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={30}
          fontWeight={800}
          letterSpacing="-0.02em"
        >
          serious about AI
        </text>
      </g>

      {/* Sorted out */}
      <g className="deck-fade" style={{ animationDelay: "0.4s" }}>
        <path
          d="M 690 252 C 734 252, 776 395, 812 395"
          fill="none"
          stroke={RULE}
          strokeWidth={5}
          strokeLinecap="round"
        />
        <polygon points="812,383 832,395 812,407" fill={RULE} />
        <rect
          x={840}
          y={350}
          width={300}
          height={90}
          rx={20}
          fill="#FFFFFF"
          stroke={RULE}
          strokeWidth={4}
        />
        <circle cx={886} cy={395} r={15} fill={RULE} />
        <text x={918} y={406} fill={MUTED} fontSize={28} fontWeight={700}>
          filtered out
        </text>
      </g>
    </svg>
  );
}

/**
 * Slide 4 visual — the takeaway website.
 *
 * A browser window whose content reads as the goal itself: a headline row, the
 * numbered step blocks, and a coral outcome badge carrying the promise the
 * event was built around.
 */
function TakeawaySiteSvg() {
  const blocks = [110, 450, 790];
  return (
    <svg
      viewBox="0 0 1200 460"
      className="h-[21rem] w-auto max-w-[84rem]"
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={DECK_FONT}
      role="img"
      aria-label="A browser window showing a takeaway website: a headline row, three numbered step blocks, and a coral badge reading everyone leaves with an actionable AI agent."
    >
      {/* Browser window */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <rect
          x={60}
          y={20}
          width={1080}
          height={420}
          rx={26}
          fill="#FFFFFF"
          stroke={INK}
          strokeWidth={5}
        />
        <line x1={60} y1={90} x2={1140} y2={90} stroke={INK} strokeWidth={5} />
        <circle cx={110} cy={55} r={11} fill={RULE} />
        <circle cx={150} cy={55} r={11} fill={RULE} />
        <circle cx={190} cy={55} r={11} fill={RULE} />
        <rect x={240} y={40} width={420} height={30} rx={15} fill={RULE} />
      </g>

      {/* Headline row */}
      <g className="deck-fade" style={{ animationDelay: "0.15s" }}>
        <rect x={110} y={120} width={560} height={34} rx={10} fill={INK} />
        <rect x={110} y={166} width={380} height={18} rx={9} fill={RULE} />
      </g>

      {/* Step blocks */}
      <g className="deck-fade" style={{ animationDelay: "0.24s" }}>
        {blocks.map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y={205}
              width={300}
              height={125}
              rx={18}
              fill="#FFFFFF"
              stroke={RULE}
              strokeWidth={4}
            />
            <circle cx={x + 46} cy={267} r={20} fill={INK} />
            <text
              x={x + 46}
              y={276}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize={24}
              fontWeight={800}
            >
              {i + 1}
            </text>
            <rect x={x + 82} y={254} width={180} height={16} rx={8} fill={RULE} />
            <rect x={x + 82} y={282} width={130} height={16} rx={8} fill={RULE} />
          </g>
        ))}
      </g>

      {/* The outcome — the one accent on this slide */}
      <g className="deck-fade" style={{ animationDelay: "0.34s" }}>
        <rect x={110} y={350} width={980} height={70} rx={20} fill={ACCENT} />
        <text
          x={600}
          y={397}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize={34}
          fontWeight={800}
          letterSpacing="-0.02em"
        >
          everyone leaves with an actionable AI agent
        </text>
      </g>
    </svg>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Gary Vee says AI causes an explosion in real, in-person events.
  <Fragment key="gary-vee">
    <DualImageSlide
      left={{
        src: `${LIB}/events-in-the-age-of-ai-gary-vee-tbpn-analog-explosion.png`,
        alt: "Gary Vee on TBPN saying the analog, in-person world is about to explode",
      }}
      right={{
        src: `${LIB}/events-in-the-age-of-ai-gary-vee-real-life-post.png`,
        alt: "Gary Vee post about real life and in-person experiences mattering more",
      }}
      balancedHeight
    />
    <Notes>
      Gary Vee says AI is about to cause an explosion in real, in-person events,
      not kill them. I just ran one that got 500 signups, and here are the 3
      things that decide if people actually come back.
    </Notes>
  </Fragment>,

  // 2 — Claude community ambassador: CMO dinners and 100+ person workshops.
  <Fragment key="claude-workshop">
    <ImageSlide
      src={`${LIB}/claude-workshop.jpeg`}
      alt="Mika running a packed Claude workshop for founders and builders"
    />
    <Notes>
      I&apos;m a Claude community ambassador here in New York, and I&apos;ve
      also run intimate dinners for CMOs and top leaders, and 100-plus person
      workshops for founders and builders.
    </Notes>
  </Fragment>,

  // 3 — First, curation: an AI agent screened every registration.
  // TODO: swap in the real registration-screening screenshot once Mika adds
  // `events-in-the-age-of-ai-registration-screening.png` to
  // public/decks/_library/ — then this becomes:
  //   <ImageSlide
  //     caption="First, curation."
  //     src={`${LIB}/events-in-the-age-of-ai-registration-screening.png`}
  //     alt="..."
  //   />
  <Fragment key="curation">
    <CoverSlide title="First, curation." diagram={<RegistrationScreeningSvg />} />
    <Notes>
      First, curation. An AI agent screened every registration for people
      serious about content and serious about AI. So everyone in the room
      already had something in common, and actually engaged with the material.
    </Notes>
  </Fragment>,

  // 4 — Second, a clear goal, backed by a takeaway website.
  // TODO: swap in the real takeaway-site screenshot once Mika adds
  // `events-in-the-age-of-ai-takeaway-website.png` to
  // public/decks/_library/ — then this becomes:
  //   <ImageSlide
  //     caption="Second, a clear goal."
  //     src={`${LIB}/events-in-the-age-of-ai-takeaway-website.png`}
  //     alt="..."
  //   />
  <Fragment key="clear-goal">
    <CoverSlide title="Second, a clear goal." diagram={<TakeawaySiteSvg />} />
    <Notes>
      Second, a clear goal, stated on the event page, in the intro, and in the
      material itself. Ours: everyone leaves with an actionable AI agent, backed
      by a takeaway website so nobody fell behind.
    </Notes>
  </Fragment>,

  // 5 — Third, the right setup: Luma, takeaway sites, projector, mic, speakers.
  <Fragment key="setup">
    <ImageSlide
      caption="Third, the right setup."
      captionSize={deckType.statementSm}
      src={`${LIB}/luma-tastemakers-homepage.png`}
      alt="A Luma event page — the setup behind the event"
    />
    <Notes>
      Third, the right setup: Luma for the page, vibe-coded takeaway sites, a
      projector, mic, and speakers. Next time: more outlets, a better chair
      layout, and stronger Wi-Fi.
    </Notes>
  </Fragment>,

  // 6 — Comment EVENT for the next invite.
  <Fragment key="cta">
    <CtaSlide prompt="Want the next invite?" headline="Comment EVENT" size="md" />
    <Notes>
      I&apos;m running more of these in New York. Comment &quot;event&quot; and
      I&apos;ll add you to the list, maybe online soon too.
    </Notes>
  </Fragment>,
];

export default function EventsInTheAgeOfAiDeckPage() {
  return <Deck slides={slides} />;
}
