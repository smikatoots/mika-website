import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "IRL Experiences Pay a Premium" };

const LIB = "/decks/_library";

/**
 * Slide 1 — a 2×2 logo grid on white with thin dividers, one logo per quadrant:
 * Claude (Anthropic), OpenAI, NVIDIA, Notion. Real asset logos, so this is a
 * layout of image files (HTML grid + next/image) rather than a drawn diagram.
 * The grid fills most of the slide; the two top logos (Claude, OpenAI) get
 * tighter padding so they read biggest.
 */
function LogoQuadrantGrid() {
  const logos: { src: string; alt: string }[] = [
    { src: `${LIB}/claude-logo.png`, alt: "Anthropic (Claude)" },
    { src: `${LIB}/openai-logo.png`, alt: "OpenAI" },
    { src: `${LIB}/nvidia-logo.svg`, alt: "NVIDIA" },
    { src: `${LIB}/notion-logo.png`, alt: "Notion" },
  ];
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center px-3 py-4 sm:px-8 sm:py-8">
      <div className="grid aspect-square w-full max-w-6xl grid-cols-2 grid-rows-2 rounded-2xl bg-white">
        {logos.map((logo, i) => {
          const borderRight = i % 2 === 0 ? "border-r" : "";
          const borderBottom = i < 2 ? "border-b" : "";
          // Top row (Claude, OpenAI) gets tighter padding → bigger logos.
          const pad = i < 2 ? "p-5 sm:p-8" : "p-8 sm:p-14";
          return (
            <div
              key={logo.src}
              className={`relative flex items-center justify-center ${pad} border-zinc-200 ${borderRight} ${borderBottom}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  priority
                  sizes="(max-width: 768px) 45vw, 28rem"
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Slide 2 — three headline companies as a big, bold text list, one role per
 * line: company (left), job title (middle, muted), salary (right, salmon), with
 * a thin divider between rows. Bricolage font. Sized large so the 3-row list
 * fills the slide. Corgi/insurance is intentionally excluded (own image slide).
 */
function SalaryList() {
  const rows: { company: string; title: string; salary: string }[] = [
    { company: "Anthropic", title: "marketing events lead", salary: "$400K" },
    { company: "OpenAI", title: "enterprise field events lead", salary: "$250K" },
    { company: "NVIDIA", title: "developer community manager", salary: "$431K" },
  ];
  return (
    <div
      className="deck-fade flex h-full w-full items-center justify-center px-8 py-8 sm:px-16 sm:py-12"
      style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
    >
      <ul className="flex h-full w-full max-w-6xl flex-col justify-center">
        {rows.map((row) => (
          <li
            key={row.company}
            className="grid flex-1 grid-cols-[minmax(0,auto)_1fr_auto] items-baseline gap-x-4 sm:gap-x-8"
          >
            <span className="text-5xl font-extrabold tracking-tight text-zinc-950 sm:text-8xl">
              {row.company}
            </span>
            <span className="truncate text-2xl text-zinc-500 sm:text-4xl">
              {row.title}
            </span>
            <span className="deck-accent text-right text-5xl font-extrabold tracking-tight sm:text-8xl">
              {row.salary}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Slide 4 — the FULL company list as a text list, one role per line:
 * company (left, bold), job title (middle, muted), salary (right, salmon).
 * Same Bricolage styling as the slide-2 salary list, but compact so all 14
 * roles fit on one slide.
 */
function SalaryTitleList() {
  const rows: { company: string; title: string; salary: string }[] = [
    { company: "Anthropic", title: "marketing events lead", salary: "$400K" },
    { company: "OpenAI", title: "enterprise field events lead", salary: "$250K" },
    { company: "Andreessen Horowitz (a16z)", title: "events partner", salary: "$250K" },
    { company: "Gamma", title: "events lead", salary: "$252K" },
    { company: "NVIDIA", title: "developer community manager", salary: "$431K" },
    { company: "Harvey", title: "community manager", salary: "$239K" },
    { company: "Ramp", title: "event marketer", salary: "$223K" },
    { company: "Fluidstack", title: "events manager", salary: "$240K" },
    { company: "Agentio", title: "brand and events lead", salary: "$200K" },
    { company: "Listen Labs", title: "founding events lead", salary: "$200K" },
    { company: "Notion", title: "experience lead", salary: "$205K" },
    { company: "Rilla", title: "events marketer", salary: "$200K" },
    { company: "Column", title: "events experience lead", salary: "$200K" },
    { company: "Snowflake", title: "field marketing manager", salary: "$255K" },
  ];
  return (
    <div
      className="deck-fade flex h-full w-full items-center justify-center px-5 pb-16 pt-4 sm:px-14 sm:pb-20 sm:pt-6"
      style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
    >
      <ul className="flex h-full w-full max-w-6xl flex-col justify-center">
        {rows.map((row) => (
          <li
            key={row.company}
            className="grid flex-1 grid-cols-[minmax(0,auto)_1fr_auto] items-baseline gap-x-4 border-b border-zinc-200 last:border-b-0 sm:gap-x-8"
          >
            <span className="text-lg font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
              {row.company}
            </span>
            <span className="truncate text-base text-zinc-500 sm:text-xl">
              {row.title}
            </span>
            <span className="deck-accent text-right text-lg font-extrabold tracking-tight sm:text-3xl">
              {row.salary}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — This skill is paying up to $430k — Anthropic, OpenAI, NVIDIA, and more investing
  <LogoQuadrantGrid key="logo-grid" />,

  // 2 — Company-by-company: what these go-to-market / events roles pay
  <SalaryList key="salary-list" />,

  // 3 — Even an insurance company is hiring a Head of Cafe Expansion for $220k
  <ImageSlide
    key="corgi-cafe"
    src={`${LIB}/corgi-insurance-head-of-cafe.png`}
    alt="Corgi insurance hiring a Head of Cafe Expansion"
  />,

  // 4 — The real skill: creating real-world experiences that make people trust you
  <SalaryTitleList key="salary-title-list" />,

  // 5 — Even Gary Vee is betting the analog, real world is about to explode
  <ImageSlide
    key="gary-vee"
    src={`${LIB}/gary-vee-analog-tweet.png`}
    alt="Gary Vee: the analog / real world is about to explode"
  />,

  // 6 — Digital gets cheaper as AI floods the internet; a real room gets rarer
  <TextSlide key="scarcity">
    <span className="whitespace-nowrap text-7xl sm:text-[6.5rem]">
      <HL>digital</HL> = abundant &amp; cheaper
    </span>
    <span className="whitespace-nowrap text-7xl sm:text-[6.5rem]">
      <HL>IRL</HL> = rare &amp; worth more
    </span>
  </TextSlide>,

  // 7 — Bringing people together IRL is an edge in a saturated world
  <TextSlide key="irl-edge" display>
    IRL vibes is an edge.
  </TextSlide>,

  // 8 — Luma tastemakers: curated in-person events
  <ImageSlide
    key="luma"
    src={`${LIB}/luma-tastemakers.png`}
    alt="Luma tastemakers — curated in-person events"
  />,

  // 9 — Comment MIKA for the list of companies and what they pay
  <CtaSlide
    key="cta"
    prompt={null}
    headline={
      <>
        Comment <HL>MIKA</HL> to subscribe to my events
      </>
    }
    headlinePlain
    textWide
    size="mlg"
  />,
];

export default function IrlExperiencesPayPremiumDeckPage() {
  return <Deck slides={slides} />;
}
