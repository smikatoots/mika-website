import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Freedom is the best game to play in the AI era" };

const LIB = "/decks/_library";

const ACCENT = "#fd4869";

// The Stripe wordmark, used as the source badge on the hook slide.
// Official high-res brand wordmark (webp).
function StripeLogo() {
  return (
    <div className="deck-pop flex h-full w-full items-end justify-center p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${LIB}/stripe-logo.webp`}
        alt="Stripe"
        className="h-auto w-full max-w-[560px]"
      />
    </div>
  );
}

// Slide 3 — the tradeoff I was living: two games, you pick one.
// Left = the status game I was winning but never wanted (muted, ink).
// Right = the freedom game I actually wanted (salmon, glowing).
function TwoGamesTradeoff() {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 900 510"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {/* left card: the status game (was winning, never wanted) */}
        <g opacity={0.62}>
          <rect x={10} y={20} width={400} height={470} rx={32} fill="#f4f4f5" stroke="#111111" strokeWidth={3} />
          <text x={210} y={118} textAnchor="middle" fontSize={38} fill="#8a8a8a">was winning</text>
          <text x={210} y={205} textAnchor="middle" fontSize={70} fontWeight={800} fill="#111111">STATUS</text>
          <text x={210} y={282} textAnchor="middle" fontSize={70} fontWeight={800} fill="#111111">GAME</text>
          <text x={210} y={362} textAnchor="middle" fontSize={42} fill="#5a5a5a">prestige</text>
          <text x={210} y={410} textAnchor="middle" fontSize={42} fill="#5a5a5a">titles</text>
          <text x={210} y={458} textAnchor="middle" fontSize={42} fill="#5a5a5a">the rankings</text>
        </g>

        {/* right card: the freedom game (actually wanted) */}
        <rect x={490} y={20} width={400} height={470} rx={32} fill="#ffffff" stroke={ACCENT} strokeWidth={6} />
        <text x={690} y={118} textAnchor="middle" fontSize={38} fontWeight={700} fill={ACCENT}>actually wanted</text>
        <text x={690} y={205} textAnchor="middle" fontSize={70} fontWeight={800} fill={ACCENT}>FREEDOM</text>
        <text x={690} y={282} textAnchor="middle" fontSize={70} fontWeight={800} fill={ACCENT}>GAME</text>
        <text x={690} y={362} textAnchor="middle" fontSize={42} fill="#111111">your time</text>
        <text x={690} y={410} textAnchor="middle" fontSize={42} fill="#111111">your calls</text>
        <text x={690} y={458} textAnchor="middle" fontSize={42} fill="#111111">total agency</text>

        {/* vs divider */}
        <circle cx={450} cy={255} r={50} fill="#111111" />
        <text x={450} y={255} textAnchor="middle" dominantBaseline="central" fontSize={36} fontWeight={700} fill="#ffffff">vs</text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — Stripe data just showed AI deleted the tradeoff between ambition and freedom.
  <CoverSlide
    key="hook"
    title={<>ambition 🤝 freedom</>}
    diagram={<StripeLogo />}
  />,

  // 2 — For years I chased the most ambitious path: PM at LinkedIn, then VC-backed founder. Burnt out twice.
  <ImageSlide
    key="forbes"
    src={`${LIB}/timeline-founder-life.jpeg`}
    alt="Mika's Forbes 30 Under 30 profile — Cofounder, Parallax"
  />,

  // 3 — I was winning the status game I never wanted; the one I wanted was the freedom game.
  <CoverSlide key="two-games" diagram={<TwoGamesTradeoff />} />,

  // 4 — In the age of AI, the freedom game is no longer the opposite of big, ambitious dreams.
  <TextSlide key="have-both" display>
    ambition 🤝 freedom
  </TextSlide>,

  // 5 — Stripe: solo founders crossing $1M with a handful of AI agents — "The age of the solopreneur."
  <ImageSlide
    key="stripe-article"
    src={`${LIB}/stripe-age-of-solopreneur-article.png`}
    alt="Stripe Economics article: The age of the solopreneur — more solo founders, growing faster, powered by AI"
  />,

  // 6 — The number of solo operators more than doubled what it was two years ago.
  <ImageSlide
    key="index-chart"
    src={`${LIB}/stripe-solopreneur-index-chart.png`}
    alt="Index of Stripe solopreneurs: share of solopreneurs by income threshold rising sharply since 2019"
  />,

  // 7 — Close to three times as many solopreneurs crossed $5M and $10M in revenue.
  <ImageSlide
    key="doubled-tripled"
    src={`${LIB}/wsj-solopreneurs-doubled-tripled.png`}
    alt="WSJ: Stripe Data — $1M solopreneurs doubled, $10M cohort nearly tripled"
  />,

  // 8 — WSJ featured 3 entrepreneurs making over $1M with just 1 full-time employee, because of AI tools.
  <ImageSlide
    key="one-employee"
    src={`${LIB}/wsj-million-dollar-one-employee.png`}
    alt="Wall Street Journal: The Rise of Million-Dollar Companies With Just One Employee"
  />,

  // 9 — Now there's evidence AI is making the freedom game the more ambitious one to play.
  <TextSlide key="payoff" display>
    The <HL>freedom game</HL> is now the ambitious one.
  </TextSlide>,

  // 10 — CTA: I wrote about the 6 career games + linked the Stripe article. Comment MIKA for the full post.
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL>
      </>
    }
    headlinePlain
    size="mlg"
    subSize="sm"
    sub="for the 6 career games + the Stripe article"
    preview={`${LIB}/six-career-games.png`}
    previewAlt="The Six Career Games value slide"
    previewPlain
    previewLarge
  />,
];

export default function FreedomGameDeckPage() {
  return <Deck slides={slides} />;
}
