import { Fragment } from "react";
import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, ImageSlide } from "@/components/deck/slide-parts";
import { Notes } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "AI era job: Travel Advisor" };

const LIB = "/decks/_library";

// Accent is ALWAYS the token — never a literal hex. `--deck-accent` mirrors the
// approved brand Coral, so a brand change flows through every diagram here.
const ACCENT = "var(--deck-accent)";
const INK = "#111111";
const SURFACE = "#F4F4F5";
const PAPER = "#FFFFFF";
const DECK_FONT = "var(--font-deck), system-ui, sans-serif";

/**
 * Slide 2 — the five things this job is NOT.
 *
 * Five large cards in a 3-over-2 grid, each struck through with a decisive
 * coral X. The only colour on the slide is the crossing-out itself.
 */
function NotTheseDiagram() {
  const cards = [
    { label: "AI", x: 110, y: 90 },
    { label: "Sales", x: 450, y: 90 },
    { label: "Degree", x: 790, y: 90 },
    { label: "Portfolio", x: 280, y: 350 },
    { label: "Tech", x: 620, y: 350 },
  ];

  return (
    <div className="deck-pop flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 620"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="Five cards labelled AI, Sales, Degree, Portfolio and Tech, each crossed out with a coral X."
      >
        {cards.map(({ label, x, y }) => (
          <g key={label}>
            <rect
              x={x}
              y={y}
              width={300}
              height={200}
              rx={28}
              fill={PAPER}
              stroke={INK}
              strokeWidth={4}
            />
            <text
              x={x + 150}
              y={y + 100}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={52}
              fontWeight={800}
              letterSpacing="-0.02em"
              fill={INK}
            >
              {label}
            </text>
            <line
              x1={x + 40}
              y1={y + 40}
              x2={x + 260}
              y2={y + 160}
              stroke={ACCENT}
              strokeWidth={16}
              strokeLinecap="round"
            />
            <line
              x1={x + 260}
              y1={y + 40}
              x2={x + 40}
              y2={y + 160}
              stroke={ACCENT}
              strokeWidth={16}
              strokeLinecap="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

/**
 * Slide 4 — the collapse.
 *
 * A line falling from 2000 to 2021, ending on a big coral −70%. The three
 * things that caused the fall — reviews, self-serve search, AI — sit as icons
 * along the descent.
 */
function JobsDeclineDiagram() {
  return (
    <div className="deck-fade flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 520"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="A line chart falling steeply from 2000 to 2021, annotated minus 70 percent, with review-star, search-bar and AI icons along the decline."
      >
        {/* Baseline */}
        <line
          x1={90}
          y1={430}
          x2={1110}
          y2={430}
          stroke={INK}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* The decline */}
        <path
          d="M110 70 C 320 100, 420 190, 560 250 S 900 360, 1080 400"
          fill="none"
          stroke={ACCENT}
          strokeWidth={14}
          strokeLinecap="round"
        />
        <circle cx={110} cy={70} r={14} fill={ACCENT} />
        <circle cx={1080} cy={400} r={14} fill={ACCENT} />

        {/* Year endpoints */}
        <text x={110} y={480} fontSize={34} fontWeight={800} fill={INK}>
          2000
        </text>
        <text
          x={1080}
          y={480}
          textAnchor="end"
          fontSize={34}
          fontWeight={800}
          fill={INK}
        >
          2021
        </text>

        {/* The number */}
        <text
          x={840}
          y={200}
          textAnchor="middle"
          fontSize={94}
          fontWeight={900}
          letterSpacing="-0.03em"
          fill={ACCENT}
        >
          −70%
        </text>

        {/* Reviews */}
        <g>
          <rect x={228} y={16} width={160} height={62} rx={16} fill={SURFACE} />
          <text
            x={308}
            y={48}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={30}
            fill={INK}
          >
            ★★★★★
          </text>
        </g>

        {/* Self-serve search */}
        <g>
          <rect x={442} y={146} width={202} height={64} rx={32} fill={SURFACE} />
          <circle
            cx={484}
            cy={175}
            r={16}
            fill="none"
            stroke={INK}
            strokeWidth={4}
          />
          <line
            x1={496}
            y1={188}
            x2={512}
            y2={202}
            stroke={INK}
            strokeWidth={4}
            strokeLinecap="round"
          />
          <line
            x1={534}
            y1={169}
            x2={618}
            y2={169}
            stroke={INK}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <line
            x1={534}
            y1={188}
            x2={592}
            y2={188}
            stroke={INK}
            strokeWidth={5}
            strokeLinecap="round"
          />
        </g>

        {/* AI */}
        <g>
          <circle cx={790} cy={262} r={44} fill={INK} />
          <text
            x={790}
            y={264}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={32}
            fontWeight={900}
            fill={PAPER}
          >
            AI
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Slide 5 — the turn.
 *
 * A stubby neutral bar for the average job next to a coral bar exactly four
 * times its height for travel advisors, with the multiple called out above.
 */
function GrowthComparisonDiagram() {
  return (
    <div className="deck-pop flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 520"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="A short grey bar for the average job beside a coral bar four times taller for travel advisors at 20 percent growth."
      >
        <text
          x={585}
          y={104}
          textAnchor="middle"
          fontSize={96}
          fontWeight={900}
          letterSpacing="-0.03em"
          fill={INK}
        >
          4×
        </text>

        {/* Baseline */}
        <line
          x1={150}
          y1={450}
          x2={1050}
          y2={450}
          stroke={INK}
          strokeWidth={4}
          strokeLinecap="round"
        />

        {/* Average job — 80 tall */}
        <rect x={250} y={370} width={240} height={80} rx={16} fill="#D4D4D8" />
        {/* Travel advisors — 320 tall, exactly 4x */}
        <rect x={680} y={130} width={240} height={320} rx={16} fill={ACCENT} />

        <text
          x={370}
          y={498}
          textAnchor="middle"
          fontSize={34}
          fontWeight={800}
          fill={INK}
        >
          Average job
        </text>
        <text
          x={800}
          y={498}
          textAnchor="middle"
          fontSize={34}
          fontWeight={800}
          fill={INK}
        >
          Travel advisors · 20%
        </text>
      </svg>
    </div>
  );
}

/**
 * Slide 7 — information vs judgment.
 *
 * Left: what an AI hands you — a list of facts. Right: the one question it
 * can't answer, ticked off in coral.
 */
function InformationVsJudgmentDiagram() {
  return (
    <div className="deck-fade flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 520"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="Split comparison. The AI panel lists Nearby and cost. The advisor panel answers is it worth it, with a coral checkmark."
      >
        {/* AI panel */}
        <rect
          x={40}
          y={30}
          width={520}
          height={460}
          rx={32}
          fill={SURFACE}
          stroke={INK}
          strokeWidth={4}
        />
        <circle cx={300} cy={125} r={54} fill={INK} />
        <text
          x={300}
          y={127}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={38}
          fontWeight={900}
          fill={PAPER}
        >
          AI
        </text>
        <text
          x={300}
          y={280}
          textAnchor="middle"
          fontSize={54}
          fontWeight={800}
          letterSpacing="-0.02em"
          fill={INK}
        >
          Nearby
        </text>
        <text
          x={300}
          y={380}
          textAnchor="middle"
          fontSize={54}
          fontWeight={800}
          letterSpacing="-0.02em"
          fill={INK}
        >
          $ Cost
        </text>

        {/* Advisor panel */}
        <rect
          x={640}
          y={30}
          width={520}
          height={460}
          rx={32}
          fill={PAPER}
          stroke={ACCENT}
          strokeWidth={7}
        />
        <circle cx={900} cy={140} r={60} fill={ACCENT} />
        <path
          d="M866 140 L890 166 L936 112"
          fill="none"
          stroke={PAPER}
          strokeWidth={14}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={900}
          y={330}
          textAnchor="middle"
          fontSize={72}
          fontWeight={900}
          letterSpacing="-0.03em"
          fill={INK}
        >
          Worth it?
        </text>
      </svg>
    </div>
  );
}

/**
 * Slide 8 — AI takes the admin, the human keeps the touch.
 *
 * Admin cards flow into a black AI box on the left; what comes out the other
 * side is the handshake.
 */
function AdminToTouchDiagram() {
  const tasks = [
    { label: "Booking", y: 60 },
    { label: "Email", y: 210 },
    { label: "Itinerary", y: 360 },
  ];

  return (
    <div className="deck-fade flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 520"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="Booking, email and itinerary cards flow into a black AI box; on the other side an advisor and client shake hands, labelled human touch."
      >
        <defs>
          <marker
            id="travel-advisor-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0 0 L10 5 L0 10 Z" fill={ACCENT} />
          </marker>
        </defs>

        {tasks.map(({ label, y }) => (
          <g key={label}>
            <rect
              x={30}
              y={y}
              width={250}
              height={100}
              rx={22}
              fill={SURFACE}
              stroke={INK}
              strokeWidth={3}
            />
            <text
              x={155}
              y={y + 52}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={36}
              fontWeight={800}
              fill={INK}
            >
              {label}
            </text>
            <line
              x1={292}
              y1={y + 50}
              x2={382}
              y2={y + 50}
              stroke={ACCENT}
              strokeWidth={7}
              strokeLinecap="round"
              markerEnd="url(#travel-advisor-arrow)"
            />
          </g>
        ))}

        {/* The AI box */}
        <rect x={400} y={140} width={200} height={240} rx={32} fill={INK} />
        <text
          x={500}
          y={262}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={76}
          fontWeight={900}
          fill={PAPER}
        >
          AI
        </text>

        <line
          x1={618}
          y1={260}
          x2={700}
          y2={260}
          stroke={ACCENT}
          strokeWidth={9}
          strokeLinecap="round"
          markerEnd="url(#travel-advisor-arrow)"
        />

        {/* The cleared side — advisor and client */}
        <rect
          x={715}
          y={70}
          width={450}
          height={380}
          rx={32}
          fill={PAPER}
          stroke={ACCENT}
          strokeWidth={7}
        />
        <circle cx={830} cy={180} r={34} fill={INK} />
        <path d="M786 272 v-16 a44 44 0 0 1 88 0 v16 z" fill={INK} />
        <circle cx={1050} cy={180} r={34} fill={INK} />
        <path d="M1006 272 v-16 a44 44 0 0 1 88 0 v16 z" fill={INK} />
        <path
          d="M866 254 Q900 302 928 292"
          fill="none"
          stroke={INK}
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d="M1014 254 Q980 302 952 292"
          fill="none"
          stroke={INK}
          strokeWidth={14}
          strokeLinecap="round"
        />
        <circle cx={940} cy={292} r={26} fill={ACCENT} />
        <text
          x={940}
          y={396}
          textAnchor="middle"
          fontSize={42}
          fontWeight={900}
          letterSpacing="-0.02em"
          fill={INK}
        >
          Human touch
        </text>
      </svg>
    </div>
  );
}

/**
 * Slide 9 — why the job is worth wanting.
 *
 * A calendar with almost nothing on it, a dotted flight path out of it, and
 * the places you get paid to go and check.
 */
function TimeRichDiagram() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dayX = days.map((_, i) => 74 + i * 63);
  const booked = new Set(["0-4", "1-1"]);

  return (
    <div className="deck-fade flex w-full items-center justify-center px-8">
      <svg
        viewBox="0 0 1200 560"
        className="h-auto w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={DECK_FONT}
        role="img"
        aria-label="A mostly empty weekly calendar labelled flexible schedule, a dotted plane route leading to mountain, city and beach destinations labelled paid to vet the spots, and a coral pill reading Type A planner."
      >
        {/* Calendar */}
        <rect
          x={40}
          y={40}
          width={460}
          height={330}
          rx={28}
          fill={PAPER}
          stroke={INK}
          strokeWidth={4}
        />
        <path
          d="M40 68 a28 28 0 0 1 28-28 h404 a28 28 0 0 1 28 28 v48 h-460 z"
          fill={SURFACE}
        />
        {days.map((day, i) => (
          <text
            key={`day-${day}-${dayX[i]}`}
            x={dayX[i]}
            y={92}
            textAnchor="middle"
            fontSize={30}
            fontWeight={800}
            fill={INK}
          >
            {day}
          </text>
        ))}
        {[0, 1, 2].map((row) =>
          dayX.map((cx, col) => (
            <rect
              key={`cell-${row}-${col}`}
              x={cx - 23}
              y={140 + row * 62}
              width={46}
              height={42}
              rx={10}
              fill={booked.has(`${row}-${col}`) ? ACCENT : SURFACE}
            />
          )),
        )}
        <text
          x={270}
          y={412}
          textAnchor="middle"
          fontSize={34}
          fontWeight={800}
          fill={INK}
        >
          Flexible schedule
        </text>

        {/* Type A planner */}
        <rect x={95} y={450} width={350} height={56} rx={28} fill={ACCENT} />
        <text
          x={270}
          y={479}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={30}
          fontWeight={900}
          fill={PAPER}
        >
          Type A planner
        </text>

        {/* The route out */}
        <path
          d="M510 210 C 620 60, 860 60, 1130 120"
          fill="none"
          stroke={ACCENT}
          strokeWidth={6}
          strokeDasharray="16 14"
          strokeLinecap="round"
        />
        <g transform="translate(796 56) rotate(6)">
          <path d="M0 22 L58 0 L38 22 L58 44 Z" fill={ACCENT} />
        </g>

        {/* Mountains */}
        <g>
          <rect
            x={545}
            y={175}
            width={185}
            height={135}
            rx={20}
            fill={SURFACE}
            stroke={INK}
            strokeWidth={3}
          />
          <circle cx={692} cy={212} r={17} fill={ACCENT} />
          <path
            d="M562 294 L612 232 L646 272 L678 240 L714 294 Z"
            fill={PAPER}
            stroke={INK}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </g>

        {/* City */}
        <g>
          <rect
            x={760}
            y={230}
            width={185}
            height={135}
            rx={20}
            fill={SURFACE}
            stroke={INK}
            strokeWidth={3}
          />
          <path
            d="M782 348 V300 H814 V348 M826 348 V274 H866 V348 M878 348 V312 H920 V348"
            fill={PAPER}
            stroke={INK}
            strokeWidth={4}
            strokeLinejoin="round"
          />
          <line
            x1={776}
            y1={348}
            x2={930}
            y2={348}
            stroke={INK}
            strokeWidth={4}
            strokeLinecap="round"
          />
        </g>

        {/* Beach */}
        <g>
          <rect
            x={975}
            y={175}
            width={185}
            height={135}
            rx={20}
            fill={SURFACE}
            stroke={INK}
            strokeWidth={3}
          />
          <circle cx={1122} cy={210} r={17} fill={ACCENT} />
          <path
            d="M992 268 Q1022 244 1052 268 T1112 268"
            fill="none"
            stroke={INK}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <path
            d="M992 294 Q1022 270 1052 294 T1112 294"
            fill="none"
            stroke={INK}
            strokeWidth={5}
            strokeLinecap="round"
          />
        </g>

        <text
          x={852}
          y={470}
          textAnchor="middle"
          fontSize={34}
          fontWeight={800}
          fill={INK}
        >
          Paid to vet the spots
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — LinkedIn published one of the fastest-growing jobs 2 years in a row, top folks paid $800k, and you might already be qualified.
  <Fragment key="hook">
    <ImageSlide
      src={`${LIB}/ai-era-job-travel-advisor-400k-client-trip.png`}
      alt="A woman travel advisor at her desk talking a client through a $400K trip."
    />
    <Notes>
      LinkedIn published one of the fastest-growing jobs 2 years in a row, with
      the top folks getting paid $800k a year and you might already be qualified
      for it.
    </Notes>
  </Fragment>,

  // 2 — It's not AI, it's not sales, it doesn't need a degree or a portfolio and it's not even in tech.
  <Fragment key="not-these">
    <CoverSlide diagram={<NotTheseDiagram />} />
    <Notes>
      It&apos;s not AI, it&apos;s not sales, it doesn&apos;t need a degree or a
      portfolio and it&apos;s not even in tech!!!
    </Notes>
  </Fragment>,

  // 3 — It's a travel advisor or agent. Like literally planning trips for other people.
  <Fragment key="reveal">
    <ImageSlide
      src={`${LIB}/ai-era-job-travel-advisor-400k-client-trip.png`}
      alt="A travel advisor planning a client's $400K trip."
      caption="It's a travel advisor."
    />
    <Notes>
      It&apos;s a travel advisor or agent! Like literally planning trips for
      other people.
    </Notes>
  </Fragment>,

  // 4 — Travel agent jobs dropped almost 70% between 2000 and 2021.
  <Fragment key="decline">
    <CoverSlide
      title="Jobs fell almost 70% in 2021"
      diagram={<JobsDeclineDiagram />}
    />
    <Notes>
      Everyone assumed reviews and AI killed travel agents and for some good
      reason. Travel agent jobs dropped almost 70% between 2000 and 2021 with the
      rise of just searching travels yourself on the Internet.
    </Notes>
  </Fragment>,

  // 5 — But the BLS now projects 20% growth through 2031. Four times the average job.
  <Fragment key="growth">
    <CoverSlide
      title="Now: 20% growth through 2031"
      diagram={<GrowthComparisonDiagram />}
    />
    <Notes>
      But the Bureau of Labor Statistics now projects 20% growth through 2031.
      That&apos;s four times the average job.
    </Notes>
  </Fragment>,

  // 6 — More people want better experiences and a real person handling it.
  <Fragment key="wsj">
    <ImageSlide
      src={`${LIB}/ai-era-job-travel-advisor-wsj-headline.png`}
      alt="Wall Street Journal headline: Who Needs a Travel Agent in the Digital Age? Apparently, More People Than Ever."
    />
    <Notes>
      Turns out in the AI age and post-COVID when we&apos;re stuck to our screens
      and talking to AI all day, more people want BETTER experiences and a real
      person handling it.
    </Notes>
  </Fragment>,

  // 7 — AI can tell you what's nearby and what it costs, but not whether it's worth it.
  <Fragment key="judgment">
    <CoverSlide
      title="Information isn't the same as judgment"
      diagram={<InformationVsJudgmentDiagram />}
    />
    <Notes>
      An AI agent can tell you what&apos;s nearby and what it costs but not
      whether the experience is actually worth it.
    </Notes>
  </Fragment>,

  // 8 — AI takes the admin work off the plate, so what's left is the human touch.
  <Fragment key="human-touch">
    <CoverSlide
      title="AI removes the admin. Humans deliver the touch."
      diagram={<AdminToTouchDiagram />}
    />
    <Notes>
      And AI is accelerating this job because it takes the admin work off a
      travel agents plate, so what&apos;s left is the human touch.
    </Notes>
  </Fragment>,

  // 9 — It pays well and it's time-rich: flexible schedule, paid to travel and vet the spots.
  <Fragment key="time-rich">
    <CoverSlide
      title="Well-paid. Flexible. Time-rich."
      diagram={<TimeRichDiagram />}
    />
    <Notes>
      The real reason I like this opportunity: it pays well and it&apos;s
      time-rich. Flexible schedule, and you get paid to travel and vet the spots
      yourself. If you&apos;re already the Type A planner of your friend group,
      it&apos;s time to shine.
    </Notes>
  </Fragment>,

  // 10 — What do you think? Is this an overlooked form of entrepreneurship?
  <Fragment key="cta">
    <CtaSlide
      prompt="What do you think?"
      headline="An overlooked form of entrepreneurship?"
      sub="Let me know below. Follow to build a time-rich life with AI."
    />
    <Notes>
      What do you think? Is this an overlooked form of entrepreneurship? Let me
      know below. Follow to build a time-rich life with AI.
    </Notes>
  </Fragment>,
];

export default function TravelAdvisorDeckPage() {
  return <Deck slides={slides} />;
}
