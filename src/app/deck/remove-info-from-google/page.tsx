import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Remove Your Info From Google" };

const svgFont = "var(--font-bricolage), system-ui, sans-serif";

/* 1 — Cover diagram: an ID card in the middle with every website circle wired
   back to it by a dotted line and struck through with a red X (all deleted). */
function WebsiteScatterSvg({ className }: { className?: string }) {
  const cx = 400;
  const cy = 220;
  const sites: [number, number][] = [
    [110, 90], [220, 58], [340, 46], [470, 50], [590, 70], [692, 118],
    [150, 190], [702, 208], [720, 300], [120, 300], [200, 372],
    [330, 402], [470, 404], [600, 384], [690, 348], [560, 300], [258, 300],
    [250, 150], [560, 150], [300, 332], [530, 252], [176, 242],
  ];
  return (
    <svg
      viewBox="0 0 800 440"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily={svgFont}
    >
      {/* dotted connectors from every site back to the ID card */}
      {sites.map(([x, y], i) => (
        <line
          key={`c${i}`}
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke="#fd4869"
          strokeWidth="2"
          strokeDasharray="3 6"
          opacity="0.5"
        />
      ))}

      {/* website circles, each struck out with a red X */}
      {sites.map(([x, y], i) => (
        <g key={`s${i}`} className="deck-pop" style={{ animationDelay: `${0.04 * i}s` }}>
          <circle cx={x} cy={y} r="16" fill="#fff" stroke="#e5e7eb" strokeWidth="2" />
          <path
            d={`M${x - 7} ${y - 7} L${x + 7} ${y + 7} M${x + 7} ${y - 7} L${x - 7} ${y + 7}`}
            stroke="#fd4869"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* the ID card, drawn on top so connectors tuck behind it */}
      <g>
        <rect x={cx - 72} y={cy - 52} width="144" height="104" rx="14" fill="#fff" stroke="#111" strokeWidth="3" />
        <circle cx={cx - 40} cy={cy - 12} r="15" fill="#111" />
        <path d={`M${cx - 62} ${cy + 34} a22 22 0 0 1 44 0 z`} fill="#111" />
        <rect x={cx - 8} y={cy - 22} width="64" height="10" rx="5" fill="#111" />
        <rect x={cx - 8} y={cy - 2} width="52" height="8" rx="4" fill="#cbd5e1" />
        <rect x={cx - 8} y={cy + 16} width="58" height="8" rx="4" fill="#cbd5e1" />
      </g>
    </svg>
  );
}

/* Shared portrait frame so every Steps visual sits in a matching card. */
function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-pop flex aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.3)]">
      {children}
    </div>
  );
}

/* 3 (fallback) — Search yourself: an email breach-check, standing in for the
   missing haveibeenpwned-screenshot.png. */
function BreachCheckSvg() {
  return (
    <svg viewBox="0 0 360 460" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg" fontFamily={svgFont}>
      {/* envelope */}
      <rect x="110" y="42" width="140" height="94" rx="12" fill="#fff" stroke="#111" strokeWidth="3" />
      <path d="M112 54 L180 104 L248 54" fill="none" stroke="#111" strokeWidth="3" strokeLinejoin="round" />

      {/* search input pill */}
      <rect x="34" y="190" width="292" height="58" rx="29" fill="#f4f4f5" stroke="#111" strokeWidth="2.5" />
      <text x="66" y="227" fontSize="21" fill="#6b7280">name@email.com</text>
      <circle cx="286" cy="219" r="13" fill="none" stroke="#111" strokeWidth="3" />
      <line x1="296" y1="229" x2="308" y2="241" stroke="#111" strokeWidth="3" strokeLinecap="round" />

      {/* breach result badge */}
      <g className="deck-pop" style={{ animationDelay: "0.15s" }}>
        <rect x="52" y="300" width="256" height="118" rx="18" fill="#fd4869" />
        <text x="180" y="344" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">Found in</text>
        <text x="180" y="392" textAnchor="middle" fontSize="40" fontWeight="800" fill="#fff">12 breaches</text>
      </g>
    </svg>
  );
}

/* 4 — Write the opt-out request: a letter with a pen mid-stroke and a salmon
   legal-stamp badge in the corner. */
function OptOutLetterSvg() {
  const grayLine = (y: number, w: number) => (
    <rect x="95" y={y} width={w} height="9" rx="4.5" fill="#d4d4d8" />
  );
  return (
    <svg viewBox="0 0 360 460" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg" fontFamily={svgFont}>
      {/* document */}
      <rect x="70" y="56" width="200" height="284" rx="12" fill="#fff" stroke="#111" strokeWidth="3" />
      {grayLine(100, 150)}
      {grayLine(126, 150)}
      {grayLine(152, 130)}
      {grayLine(178, 150)}
      {/* current line being written — salmon, partial */}
      <rect x="95" y="206" width="92" height="9" rx="4.5" fill="#fd4869" />
      {grayLine(258, 150)}
      {grayLine(284, 110)}

      {/* pen mid-stroke, nib at the end of the salmon line */}
      <g transform="rotate(36 196 210)">
        <rect x="188" y="96" width="16" height="96" rx="4" fill="#111" />
        <rect x="188" y="88" width="16" height="12" rx="3" fill="#fd4869" />
        <polygon points="188,192 204,192 196,214" fill="#111" />
        <polygon points="193,206 199,206 196,214" fill="#fff" />
      </g>

      {/* legal-stamp badge */}
      <g transform="rotate(-12 258 306)">
        <circle cx="258" cy="306" r="38" fill="#fd4869" />
        <circle cx="258" cy="306" r="31" fill="none" stroke="#fff" strokeWidth="2" />
        <path d="M242 306 l11 12 l21 -26" fill="none" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* 5 — Actually opt out: an agent (robot + gear), enlarged and centered. */
function AgentSubmitSvg() {
  return (
    <svg viewBox="0 0 360 460" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg" fontFamily={svgFont}>
      <g transform="translate(-74 32) scale(2.2)">
        {/* robot antenna + head */}
        <line x1="85" y1="52" x2="85" y2="74" stroke="#111" strokeWidth="3" />
        <circle cx="85" cy="46" r="6" fill="#fd4869" />
        <rect x="45" y="74" width="80" height="66" rx="14" fill="#111" />
        <circle cx="68" cy="106" r="9" fill="#fff" />
        <circle cx="102" cy="106" r="9" fill="#fff" />
        <circle cx="68" cy="106" r="4" fill="#fd4869" />
        <circle cx="102" cy="106" r="4" fill="#fd4869" />

        {/* gear beside the robot */}
        <g transform="translate(158 96)">
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x="-4" y="-27" width="8" height="12" rx="2" fill="#9ca3af" transform={`rotate(${i * 45})`} />
          ))}
          <circle r="18" fill="#9ca3af" />
          <circle r="8" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}

/* 6 — Make it a routine: a big calendar with one checked day. */
function RoutineSvg() {
  return (
    <svg viewBox="0 0 360 460" className="h-auto w-full" xmlns="http://www.w3.org/2000/svg" fontFamily={svgFont}>
      {/* calendar body */}
      <rect x="60" y="150" width="240" height="230" rx="18" fill="#fff" stroke="#111" strokeWidth="4" />
      {/* header band */}
      <path d="M60 206 V168 a18 18 0 0 1 18 -18 H282 a18 18 0 0 1 18 18 V206 Z" fill="#111" />
      {/* binder rings */}
      <rect x="104" y="130" width="15" height="38" rx="7" fill="#111" />
      <rect x="241" y="130" width="15" height="38" rx="7" fill="#111" />

      {/* date dots — one salmon "checked" day */}
      {[250, 300, 350].map((y) =>
        [120, 180, 240].map((x) => {
          const active = x === 180 && y === 300;
          return (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="18" fill={active ? "#fd4869" : "#e5e7eb"} />
              {active ? (
                <path d="M169 300 l7 9 l15 -17" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              ) : null}
            </g>
          );
        }),
      )}
    </svg>
  );
}

const stepLabels = [
  "Search yourself.",
  "Write the opt-out request.",
  "Actually opt out.",
  "Make it a routine.",
];

const stepVisuals: React.ReactNode[] = [
  <StepCard key="v0"><BreachCheckSvg /></StepCard>,
  <StepCard key="v1"><OptOutLetterSvg /></StepCard>,
  <StepCard key="v2"><AgentSubmitSvg /></StepCard>,
  <StepCard key="v3"><RoutineSvg /></StepCard>,
];

const slides: React.ReactNode[] = [
  // 1 — Your name, phone number, and home address are on 200+ websites; I used
  // Claude to find and delete every one exposing mine.
  <CoverSlide
    key="cover"
    title={
      <>
        <HL>200+ websites</HL> have your info right now.
      </>
    }
    diagram={<WebsiteScatterSvg className="w-full max-w-4xl" />}
  />,

  // 2 — Data brokers scrape this info and sell it to anyone who'll pay.
  <TextSlide key="brokers" emoji="🕵️">
    <HL>Data brokers</HL> sell your info to buyers.
  </TextSlide>,

  // 3 — First, search yourself (Google, broker sites, haveibeenpwned) → one list.
  <StepsSlide key="s1" steps={stepLabels} current={0} visual={stepVisuals[0]} />,

  // 4 — Second, have Claude draft a CCPA opt-out letter for each site.
  <StepsSlide key="s2" steps={stepLabels} current={1} visual={stepVisuals[1]} />,

  // 5 — Third, actually opt out — yourself, or let Claude agent mode submit them.
  <StepsSlide key="s3" steps={stepLabels} current={2} visual={stepVisuals[2]} />,

  // 6 — Fourth, make it a routine: Claude checks back monthly until confirmed.
  <StepsSlide key="s4" steps={stepLabels} current={3} visual={stepVisuals[3]} />,

  // 7 — Comment MIKA for my guide; share the tip with a friend.
  <CtaSlide key="cta" prompt="Comment" headline="MIKA" sub="for my guide & share this tip with a friend." />,
];

export default function RemoveInfoFromGoogleDeckPage() {
  return <Deck slides={slides} />;
}
