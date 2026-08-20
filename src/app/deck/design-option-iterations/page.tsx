import type { Metadata } from "next";
import Image from "next/image";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, StepsSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Ask AI for 10 designs before you choose one" };

const LIB = "/decks/_library";

const ACCENT = "#fd4869";
const INK = "#111111";
const GREY = "#e4e4e7";
const GREY_DARK = "#c7c7cc";
const MUTED = "#a1a1aa";
const SVG_FONT = "var(--font-bricolage), system-ui, sans-serif";
const MONO_FONT = "ui-monospace, SFMono-Regular, Menlo, monospace";

/** Small white check mark, centered on (cx, cy). */
function Check({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <path
      d={`M ${cx - 9 * scale} ${cy + 0.5 * scale} l ${6 * scale} ${7 * scale} l ${12 * scale} ${-14 * scale}`}
      fill="none"
      stroke="#ffffff"
      strokeWidth={4 * scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

/**
 * Slide 3 — you already write ten headlines, so why one graphic?
 * Left column "WORDS": ten stacked grey headline bars, one salmon with a check
 * badge. A salmon `=` in the middle. Right column "GRAPHICS": a 2×5 grid of ten
 * grey thumbnails, one salmon with a check inside. Same count, same treatment.
 */
function WordsEqualGraphics() {
  const barWidths = [300, 262, 286, 240, 300, 274, 250, 292, 266, 280];
  const SALMON_BAR = 4;
  const SALMON_THUMB = 7; // row 3, right column

  return (
    <div className="flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1000 400"
        className="h-auto w-full max-w-6xl"
        style={{ maxHeight: "48vh" }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={SVG_FONT}
        role="img"
        aria-label="Ten headline options on the left equals ten graphic options on the right — one of each picked out in salmon with a check."
      >
        {/* ── WORDS ────────────────────────────────────────────────── */}
        <text x={30} y={30} fontSize={26} fontWeight={700} letterSpacing={3} fill={MUTED}>
          WORDS
        </text>
        {barWidths.map((w, i) => {
          const y = 58 + i * 32;
          const salmon = i === SALMON_BAR;
          return (
            <g key={`bar-${i}`} className="deck-fade" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
              <rect x={30} y={y} width={w} height={20} rx={10} fill={salmon ? ACCENT : GREY} />
              {salmon ? (
                <>
                  <circle cx={356} cy={y + 10} r={17} fill={ACCENT} />
                  <Check cx={356} cy={y + 10} />
                </>
              ) : null}
            </g>
          );
        })}

        {/* ── equals ───────────────────────────────────────────────── */}
        <text
          x={462}
          y={200}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={128}
          fontWeight={800}
          fill={ACCENT}
          className="deck-pop"
          style={{ animationDelay: "0.55s" }}
        >
          =
        </text>

        {/* ── GRAPHICS ─────────────────────────────────────────────── */}
        <text x={560} y={30} fontSize={26} fontWeight={700} letterSpacing={3} fill={MUTED}>
          GRAPHICS
        </text>
        {Array.from({ length: 10 }, (_, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const x = 560 + col * 185;
          const y = 58 + row * 62;
          const salmon = i === SALMON_THUMB;
          return (
            <g key={`thumb-${i}`} className="deck-fade" style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
              <rect x={x} y={y} width={165} height={52} rx={10} fill={salmon ? ACCENT : GREY} />
              {salmon ? (
                <Check cx={x + 82} cy={y + 26} scale={1.35} />
              ) : (
                <>
                  {/* faint thumbnail glyph: a sun and a hill */}
                  <circle cx={x + 40} cy={y + 20} r={7} fill={GREY_DARK} />
                  <path d={`M ${x + 22} ${y + 40} l 26 -18 l 20 18 Z`} fill={GREY_DARK} />
                  <path d={`M ${x + 62} ${y + 40} l 22 -14 l 20 14 Z`} fill={GREY_DARK} />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Slide 4 visual — the brand file itself: a document card with a `brand.md`
 * filename tab, four colour swatches (one salmon), an "Aa" type specimen with
 * the font name, and the one-line feel.
 */
function BrandFileCard() {
  const swatches = [INK, ACCENT, "#d4d4d8", "#f4f4f5"];

  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 440 560"
        className="h-auto w-full max-w-[26rem]"
        style={{ maxHeight: "68vh" }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={SVG_FONT}
        role="img"
        aria-label="A brand.md file holding four brand colours, a type specimen, and the feel of the brand."
      >
        {/* card */}
        <rect x={40} y={70} width={360} height={450} rx={20} fill="#ffffff" stroke={INK} strokeWidth={3} />
        {/* filename tab */}
        <rect x={40} y={26} width={196} height={52} rx={12} fill={INK} />
        <rect x={43} y={68} width={190} height={12} fill={INK} />
        <text x={138} y={53} textAnchor="middle" dominantBaseline="central" fontSize={26} fontWeight={700} fill="#ffffff" fontFamily={MONO_FONT}>
          brand.md
        </text>

        {/* colours */}
        {swatches.map((c, i) => (
          <rect
            key={c}
            x={72 + i * 78}
            y={112}
            width={62}
            height={62}
            rx={12}
            fill={c}
            stroke={GREY}
            strokeWidth={2}
          />
        ))}

        {/* type specimen */}
        <text x={220} y={300} textAnchor="middle" dominantBaseline="central" fontSize={140} fontWeight={800} fill={INK}>
          Aa
        </text>
        <text x={220} y={378} textAnchor="middle" fontSize={24} fontWeight={600} fill={MUTED}>
          Bricolage Grotesque
        </text>

        <line x1={72} y1={412} x2={368} y2={412} stroke={GREY} strokeWidth={2} />

        {/* the feel */}
        <text x={72} y={462} fontSize={26} fill={MUTED}>
          feel:{" "}
          <tspan fill={INK} fontWeight={700}>
            warm · clean · bold
          </tspan>
        </text>
      </svg>
    </div>
  );
}

/** Slide 5 visual — the Paper logo. */
function PaperLogoVisual() {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <Image
        src={`${LIB}/paper-log.avif`}
        alt="Paper"
        width={1080}
        height={659}
        className="h-auto w-full max-w-[30rem]"
      />
    </div>
  );
}

/**
 * Slide 6 visual — the prompt, verbatim, in a chat-input card with a salmon
 * left border. "10 different options" carries the accent.
 */
function PromptCard() {
  const lines: React.ReactNode[] = [
    "I'm building graphics for",
    "my business. Here's the",
    "text and photo that I",
    "want to use. Use my brand",
    "guidelines to come up with",
    <tspan key="accent" fill={ACCENT} fontWeight={800}>
      10 different options
    </tspan>,
    "I can choose from.",
  ];

  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 560 520"
        className="h-auto w-full max-w-[43rem]"
        style={{ maxHeight: "72vh" }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={SVG_FONT}
        role="img"
        aria-label="Prompt: I'm building graphics for my business. Here's the text and photo that I want to use. Use my brand guidelines to come up with 10 different options I can choose from."
      >
        <defs>
          <clipPath id="prompt-card-clip">
            <rect x={20} y={20} width={520} height={460} rx={28} />
          </clipPath>
        </defs>

        <g clipPath="url(#prompt-card-clip)">
          <rect x={20} y={20} width={520} height={460} fill="#ffffff" />
          <rect x={20} y={20} width={14} height={460} fill={ACCENT} />
        </g>
        <rect x={20} y={20} width={520} height={460} rx={28} fill="none" stroke={GREY} strokeWidth={2} />

        {lines.map((line, i) => (
          <text key={i} x={62} y={92 + i * 50} fontSize={32} fill={INK}>
            {line}
          </text>
        ))}

        {/* send button */}
        <circle cx={492} cy={436} r={26} fill={ACCENT} />
        <path
          d="M 492 449 L 492 423 M 481 434 L 492 423 L 503 434"
          fill="none"
          stroke="#ffffff"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Slide 8 — stop rewriting the prompt. Left: a long grey prompt block with a
 * circular "rewrite" arrow looping over it. A salmon arrow across. Right: one
 * salmon command pill.
 */
function PromptToSkill() {
  return (
    <div className="flex w-full items-center justify-center p-2">
      <svg
        viewBox="0 0 1000 300"
        className="h-auto w-full max-w-6xl"
        style={{ maxHeight: "44vh" }}
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={SVG_FONT}
        role="img"
        aria-label="A long prompt you rewrite every time becomes one slash design-options command."
      >
        {/* the prompt block you keep rewriting */}
        <g className="deck-fade">
          <rect x={45} y={60} width={350} height={180} rx={16} fill="#f4f4f5" stroke={GREY} strokeWidth={2} />
          {[294, 256, 282, 240, 204].map((w, i) => (
            <rect key={i} x={73} y={86 + i * 30} width={w} height={14} rx={7} fill={GREY_DARK} />
          ))}
        </g>

        {/* the rewrite loop */}
        <g className="deck-fade" style={{ animationDelay: "0.25s" }}>
          <path
            d="M 322.5 33.1 A 205 135 0 1 1 149.9 23.1"
            fill="none"
            stroke={MUTED}
            strokeWidth={5}
            strokeLinecap="round"
          />
          <polygon points="0,0 -22,-11 -22,11" fill={MUTED} transform="translate(149.9 23.1) rotate(-13.5)" />
        </g>

        {/* becomes */}
        <g className="deck-pop" style={{ animationDelay: "0.5s" }}>
          <line x1={452} y1={150} x2={556} y2={150} stroke={ACCENT} strokeWidth={9} strokeLinecap="round" />
          <polygon points="582,150 550,132 550,168" fill={ACCENT} />
        </g>

        {/* one command */}
        <g className="deck-pop" style={{ animationDelay: "0.7s" }}>
          <rect x={590} y={108} width={390} height={84} rx={42} fill={ACCENT} />
          <text
            x={785}
            y={150}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={38}
            fontWeight={700}
            fill="#ffffff"
            fontFamily={MONO_FONT}
          >
            /design-options
          </text>
        </g>
      </svg>
    </div>
  );
}

const steps = ["Make a brand.md", "Upload it to Paper", "Drop in the prompt"];

const slides: React.ReactNode[] = [
  // 1 — The best creative marketers and designers I know ask AI for 10 designs before they choose one. Here's the simple Paper workflow that turns one idea into a real creative review.
  <ImageSlide
    key="ten-directions-hook"
    src={`${LIB}/paper-design-directions.png`}
    maxWidth="max-w-6xl"
    alt="Ten different design directions generated in Paper from one idea"
  />,

  // 2 — When I was a PM at LinkedIn launching the "I'm Hiring" profile ring, design never walked into review with one mock…
  <ImageSlide
    key="linkedin-era"
    src={`${LIB}/mika-linkedin-era.png`}
    alt="Mika with the LinkedIn #TEAMHIRING team on a Zoom grid during the I'm Hiring ring launch"
  />,

  // 3 — You already do this with words. You'd never write one headline and ship it. You write ten and pick.
  <CoverSlide
    key="ten-headlines"
    title={
      <>
        Ten headlines. Why not <HL>ten graphics</HL>?
      </>
    }
    diagram={<WordsEqualGraphics />}
  />,

  // 4 — First, make a brand file. A simple brand.md with your colors, your fonts, and the feel you're going for.
  <StepsSlide key="step-brand-file" steps={steps} current={0} visual={<BrandFileCard />} />,

  // 5 — Upload it to Paper, or Claude Design if that's what you already have open.
  <StepsSlide key="step-upload" steps={steps} current={1} visual={<PaperLogoVisual />} />,

  // 6 — Then drop in a prompt that looks like this.
  <StepsSlide key="step-prompt" steps={steps} current={2} visual={<PromptCard />} />,

  // 7 — About five minutes later you're looking at ten directions instead of one. Pick your favorite, then ask for five more.
  <ImageSlide
    key="ten-directions-payoff"
    src={`${LIB}/paper-design-directions.png`}
    maxWidth="max-w-6xl"
    alt="Ten different design directions generated in Paper from one idea"
  />,

  // 8 — And if you're doing this every week, save the whole thing as a skill. Then it's one command.
  <CoverSlide
    key="make-it-a-skill"
    title={
      <>
        Doing it weekly? Make it a <HL>skill</HL>.
      </>
    }
    diagram={<PromptToSkill />}
  />,

  // 9 — Comment MIKA for my full guide and tell me what you'd use this for.
  <CtaSlide
    key="cta"
    prompt="Comment"
    headline="MIKA"
    sub="And tell me what you'd use this for"
    size="md"
    subSize="sm"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Mika's AI guides"
  />,
];

export default function DesignOptionIterationsDeckPage() {
  return <Deck slides={slides} />;
}
