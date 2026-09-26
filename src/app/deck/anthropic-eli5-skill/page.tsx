import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, PointSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import { Notes } from "@/components/deck/reveal-parts";

export const metadata: Metadata = { title: "The ELI5 skill Anthropic uses" };

const LIB = "/decks/_library";

/** Shared SVG type treatment — the deck typeface, never a hardcoded family. */
const DECK_FONT = "var(--font-deck)";
const INK = "var(--deck-ink)";
const ACCENT = "var(--deck-accent)";
const MUTED = "#52525B";
const RULE = "#E4E4E7";

/**
 * Slide 3 — the picture-to-text ratio IS the point.
 *
 * TODO: swap this slide for the video `anthropic-eli5-skill-visual-explainer-demo.mov`
 * once Mika adds it to `public/decks/_library/`. It is NOT in the library yet, so this
 * SVG is the stand-in. When the .mov lands, replace this slide's entry in `slides` with
 * a background-video slide:
 *   { background: { video: `${LIB}/anthropic-eli5-skill-visual-explainer-demo.mov` },
 *     content: <CoverSlide title="Big pictures. Barely any text." /> }
 */
function ExplainerRatioSvg() {
  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="An ELI5 explainer output: one large picture panel showing dense text turning into a simple picture and then a lightbulb, with only two tiny lines of text beneath it."
    >
      {/* The picture — dominant, filling almost the whole frame */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <rect x="110" y="8" width="980" height="300" rx="30" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
      </g>

      {/* The hard thing — a slab of dense text */}
      <g className="deck-fade" style={{ animationDelay: "0.18s" }}>
        <rect x="175" y="78" width="210" height="160" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <rect x="205" y="110" width="150" height="12" rx="6" fill={RULE} />
        <rect x="205" y="134" width="150" height="12" rx="6" fill={RULE} />
        <rect x="205" y="158" width="150" height="12" rx="6" fill={RULE} />
        <rect x="205" y="182" width="150" height="12" rx="6" fill={RULE} />
        <rect x="205" y="206" width="96" height="12" rx="6" fill={RULE} />
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.3s" }}>
        <line x1="400" y1="158" x2="440" y2="158" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
        <polygon points="440,146 460,158 440,170" fill={ACCENT} />
      </g>

      {/* The key element — the picture Claude draws */}
      <g className="deck-fade" style={{ animationDelay: "0.42s" }}>
        <rect x="470" y="68" width="260" height="180" rx="26" fill={ACCENT} />
        <line x1="600" y1="120" x2="530" y2="196" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <line x1="600" y1="120" x2="670" y2="196" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <line x1="530" y1="196" x2="670" y2="196" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
        <circle cx="600" cy="120" r="24" fill="#FFFFFF" />
        <circle cx="530" cy="196" r="24" fill="#FFFFFF" />
        <circle cx="670" cy="196" r="24" fill="#FFFFFF" />
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.54s" }}>
        <line x1="745" y1="158" x2="785" y2="158" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
        <polygon points="785,146 805,158 785,170" fill={ACCENT} />
      </g>

      {/* It clicks */}
      <g className="deck-fade" style={{ animationDelay: "0.66s" }}>
        <rect x="815" y="78" width="210" height="160" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <circle cx="920" cy="152" r="38" fill="none" stroke={INK} strokeWidth="6" />
        <line x1="920" y1="94" x2="920" y2="74" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="920" y1="210" x2="920" y2="230" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="862" y1="152" x2="842" y2="152" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="978" y1="152" x2="998" y2="152" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="879" y1="111" x2="865" y2="97" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="961" y1="193" x2="975" y2="207" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="961" y1="111" x2="975" y2="97" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <line x1="879" y1="193" x2="865" y2="207" stroke={INK} strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* …and that is all the text you get */}
      <g className="deck-fade" style={{ animationDelay: "0.82s" }}>
        <text x="600" y="348" textAnchor="middle" fill={MUTED} fontSize="24" fontFamily={DECK_FONT}>
          It&apos;s like sorting toys into the right boxes.
        </text>
        <text x="600" y="382" textAnchor="middle" fill={MUTED} fontSize="24" fontFamily={DECK_FONT}>
          That&apos;s it.
        </text>
      </g>
    </svg>
  );
}

/** Slide 5 — the three prompts Anthropic actually runs, funnelled through /eli5. */
function ActualPromptsSvg() {
  const prompts = [
    { label: "how does this module work", y: 8 },
    { label: "why did we make this tradeoff", y: 153 },
    { label: "what caused this incident", y: 298 },
  ];

  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="Three prompt cards — how does this module work, why did we make this tradeoff, what caused this incident — feeding into one slash-eli5 command, which produces a single explainer output."
    >
      <defs>
        <marker id="eli5-arrow" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto">
          <polygon points="0,0 14,7 0,14" fill={ACCENT} />
        </marker>
      </defs>

      {/* The prompts they actually run */}
      {prompts.map(({ label, y }, i) => (
        <g key={label} className="deck-fade" style={{ animationDelay: `${0.05 + i * 0.12}s` }}>
          <rect x="10" y={y} width="420" height="94" rx="24" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <text
            x="220"
            y={y + 47}
            textAnchor="middle"
            dominantBaseline="central"
            fill={INK}
            fontSize="24"
            fontWeight="700"
            fontFamily={DECK_FONT}
          >
            {label}
          </text>
        </g>
      ))}

      {/* …all funnel into the one command */}
      <g className="deck-fade" style={{ animationDelay: "0.46s" }}>
        <path d="M436 55 C 478 55, 478 176, 508 186" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" markerEnd="url(#eli5-arrow)" />
        <path d="M436 200 L 508 200" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" markerEnd="url(#eli5-arrow)" />
        <path d="M436 345 C 478 345, 478 224, 508 214" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" markerEnd="url(#eli5-arrow)" />
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.58s" }}>
        <rect x="522" y="150" width="230" height="100" rx="50" fill={INK} />
        <text
          x="637"
          y="201"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#FFFFFF"
          fontSize="42"
          fontWeight="800"
          fontFamily={DECK_FONT}
        >
          /eli5
        </text>
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.7s" }}>
        <path d="M760 200 L 812 200" fill="none" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" markerEnd="url(#eli5-arrow)" />
      </g>

      {/* One explainer out the other end */}
      <g className="deck-fade" style={{ animationDelay: "0.82s" }}>
        <rect x="838" y="66" width="350" height="268" rx="28" fill="#FFFFFF" stroke={ACCENT} strokeWidth="6" />
        <rect x="874" y="112" width="110" height="76" rx="16" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <line x1="996" y1="150" x2="1018" y2="150" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" markerEnd="url(#eli5-arrow)" />
        <rect x="1042" y="112" width="110" height="76" rx="16" fill={ACCENT} />
        <rect x="884" y="226" width="258" height="14" rx="7" fill={RULE} />
        <rect x="884" y="258" width="176" height="14" rx="7" fill={RULE} />
        <text x="1013" y="308" textAnchor="middle" fill={MUTED} fontSize="24" fontFamily={DECK_FONT}>
          one explainer
        </text>
      </g>
    </svg>
  );
}

/** Slide 7 — the simplify slider pushed one notch past the sweet spot. */
function OverSimplifiedSvg() {
  const notches = [250, 462, 675, 887, 1100];

  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="A simplify slider pushed one notch past the sweet spot, with a dense technical model compressing into an overly simple childlike diagram."
    >
      <defs>
        <marker id="eli5-simplify-arrow" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto">
          <polygon points="0,0 14,7 0,14" fill={ACCENT} />
        </marker>
      </defs>

      {/* The slider */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <text x="40" y="72" fill={INK} fontSize="32" fontWeight="800" fontFamily={DECK_FONT}>
          simplify
        </text>
        <line x1="250" y1="60" x2="1100" y2="60" stroke={RULE} strokeWidth="10" strokeLinecap="round" />
        <line x1="250" y1="60" x2="1100" y2="60" stroke={ACCENT} strokeWidth="10" strokeLinecap="round" />
        {notches.slice(0, 4).map((x) => (
          <circle key={x} cx={x} cy="60" r="11" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        ))}
        <text x="675" y="106" textAnchor="middle" fill={MUTED} fontSize="22" fontFamily={DECK_FONT}>
          sweet spot
        </text>
      </g>

      {/* One notch too far */}
      <g className="deck-fade" style={{ animationDelay: "0.2s" }}>
        <circle cx="1100" cy="60" r="30" fill="none" stroke={ACCENT} strokeWidth="4" opacity="0.35" />
        <circle cx="1100" cy="60" r="20" fill={ACCENT} />
        <text x="1100" y="112" textAnchor="middle" fill={ACCENT} fontSize="26" fontWeight="800" fontFamily={DECK_FONT}>
          too far
        </text>
      </g>

      {/* The dense technical model */}
      <g className="deck-fade" style={{ animationDelay: "0.34s" }}>
        <rect x="60" y="170" width="380" height="200" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <path
          d="M120 220 L210 200 L300 236 L380 208 M120 220 L190 280 L300 236 M190 280 L270 330 L380 300 M300 236 L380 300 M120 290 L190 280 M120 290 L270 330"
          fill="none"
          stroke={MUTED}
          strokeWidth="3"
        />
        {[
          [120, 220],
          [210, 200],
          [300, 236],
          [380, 208],
          [190, 280],
          [120, 290],
          [270, 330],
          [380, 300],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill={INK} />
        ))}
      </g>

      {/* Compressed down */}
      <g className="deck-fade" style={{ animationDelay: "0.48s" }}>
        <path
          d="M470 186 L700 250 L700 300 L470 364 Z"
          fill={ACCENT}
          fillOpacity="0.14"
          stroke={ACCENT}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <line x1="712" y1="275" x2="740" y2="275" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" markerEnd="url(#eli5-simplify-arrow)" />
      </g>

      {/* …into something a bit too simple */}
      <g className="deck-fade" style={{ animationDelay: "0.62s" }}>
        <rect x="770" y="170" width="380" height="200" rx="22" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <line x1="930" y1="270" x2="1000" y2="270" stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <circle cx="880" cy="270" r="50" fill="none" stroke={INK} strokeWidth="8" />
        <rect x="1000" y="225" width="100" height="90" rx="14" fill="none" stroke={INK} strokeWidth="8" />
      </g>
    </svg>
  );
}

/** Slide 8 — the tangle resolving into one clean model, and the beginner getting it. */
function ItClicksSvg() {
  return (
    <svg
      viewBox="0 0 1200 400"
      className="h-[22rem] w-auto max-w-[84rem]"
      role="img"
      aria-label="Tangled gears and code symbols flowing into one large clean visual model, beside a beginner with a lightbulb switching on above their head."
    >
      <defs>
        <marker id="eli5-clicks-arrow" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto">
          <polygon points="0,0 14,7 0,14" fill={ACCENT} />
        </marker>
      </defs>

      {/* The tangle */}
      <g className="deck-fade" style={{ animationDelay: "0.05s" }}>
        <path
          d="M55 300 C 150 130, 210 350, 290 190 S 110 250, 200 110 S 260 300, 90 200"
          fill="none"
          stroke={RULE}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <g>
          <circle cx="120" cy="150" r="38" fill="none" stroke={MUTED} strokeWidth="7" />
          <circle cx="120" cy="150" r="13" fill={MUTED} />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="120"
              y1="150"
              x2="120"
              y2="98"
              stroke={MUTED}
              strokeWidth="9"
              strokeLinecap="round"
              transform={`rotate(${deg} 120 150)`}
            />
          ))}
          <circle cx="120" cy="150" r="30" fill="#FFFFFF" stroke={MUTED} strokeWidth="7" />
          <circle cx="120" cy="150" r="12" fill={MUTED} />
        </g>
        <g>
          <circle cx="232" cy="272" r="28" fill="none" stroke={MUTED} strokeWidth="6" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="232"
              y1="272"
              x2="232"
              y2="234"
              stroke={MUTED}
              strokeWidth="8"
              strokeLinecap="round"
              transform={`rotate(${deg} 232 272)`}
            />
          ))}
          <circle cx="232" cy="272" r="22" fill="#FFFFFF" stroke={MUTED} strokeWidth="6" />
          <circle cx="232" cy="272" r="9" fill={MUTED} />
        </g>
        <text x="248" y="126" fill={MUTED} fontSize="42" fontWeight="800" fontFamily={DECK_FONT}>
          {"{ }"}
        </text>
        <text x="42" y="332" fill={MUTED} fontSize="38" fontWeight="800" fontFamily={DECK_FONT}>
          {"</>"}
        </text>
      </g>

      {/* Flowing into one clean model */}
      <g className="deck-fade" style={{ animationDelay: "0.28s" }}>
        <line x1="330" y1="200" x2="386" y2="200" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" markerEnd="url(#eli5-clicks-arrow)" />
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.42s" }}>
        <rect x="420" y="60" width="380" height="280" rx="28" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <path d="M520 180 L 610 240 L 700 180" fill="none" stroke={ACCENT} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="460" y="110" width="120" height="72" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <rect x="640" y="110" width="120" height="72" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        <rect x="550" y="238" width="120" height="72" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
      </g>

      {/* The beginner, and the moment it lands */}
      <g className="deck-fade" style={{ animationDelay: "0.6s" }}>
        <circle cx="1000" cy="245" r="40" fill="none" stroke={INK} strokeWidth="7" />
        <path d="M1000 285 L 1000 345" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M948 308 L 1052 308" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
        <path d="M1000 345 L 966 392 M1000 345 L 1034 392" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" />
      </g>

      <g className="deck-fade" style={{ animationDelay: "0.76s" }}>
        <circle cx="1000" cy="120" r="38" fill={ACCENT} />
        <rect x="982" y="156" width="36" height="16" rx="8" fill={INK} />
        <rect x="986" y="176" width="28" height="12" rx="6" fill={INK} />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <line
            key={deg}
            x1="1000"
            y1="58"
            x2="1000"
            y2="38"
            stroke={ACCENT}
            strokeWidth="7"
            strokeLinecap="round"
            transform={`rotate(${deg} 1000 120)`}
          />
        ))}
      </g>
    </svg>
  );
}

const slides: React.ReactNode[] = [
  // 1 — A leader at Anthropic says they use this skill a lot in the company to learn anything.
  <Fragment key="thariq-post">
    <ImageSlide
      src={`${LIB}/anthropic-eli5-skill-thariq-post.png`}
      alt="Thariq's post introducing the ELI5 skill used at Anthropic, with a sample visual explainer."
    />
    <Notes>
      A leader at Anthropic says they use this skill a lot in the company to learn anything.
      It&apos;s called ELI5 and contrary to popular belief, not all AI use cases lead to
      brainrot.
    </Notes>
  </Fragment>,

  // 2 — You type slash-eli5, then whatever you want explained.
  <Fragment key="command">
    <ImageSlide
      src={`${LIB}/anthropic-eli5-skill-command-llms.png`}
      alt="The command /eli5 LLMs typed into Claude Code."
    />
    <Notes>You type slash-eli5, then whatever you want explained.</Notes>
  </Fragment>,

  // 3 — Claude breaks it down like you know nothing, mostly pictures, barely any text.
  // TODO: swap this slide for `anthropic-eli5-skill-visual-explainer-demo.mov` once Mika
  // adds it to `public/decks/_library/` — see ExplainerRatioSvg above for the replacement.
  <Fragment key="ratio">
    <CoverSlide title="Big pictures. Barely any text." diagram={<ExplainerRatioSvg />} />
    <Notes>Claude breaks it down like you know nothing, mostly pictures, barely any text.</Notes>
  </Fragment>,

  // 4 — Thariq, who works on Claude Code at Anthropic, says people there have been using it A LOT.
  <Fragment key="a-lot">
    <PointSlide number="01" emoji="🧠">
      Anthropic uses it A LOT to simplify complex concepts.
    </PointSlide>
    <Notes>
      Thariq, who works on Claude Code at Anthropic, says people there have been using it A LOT
      to simplify complex concepts.
    </Notes>
  </Fragment>,

  // 5 — The ones they actually run: how does this module work, why did we make this tradeoff, what caused this incident.
  <Fragment key="prompts">
    <CoverSlide title="What they actually run" diagram={<ActualPromptsSvg />} />
    <Notes>
      The ones they actually run: &ldquo;how does this module work,&rdquo; &ldquo;why did we
      make this tradeoff,&rdquo; &ldquo;what caused this incident.&rdquo;
    </Notes>
  </Fragment>,

  // 6 — Now I tried it, and I'll be honest with you, it really does simplify hard.
  <Fragment key="simplifies-hard">
    <TextSlide>
      It really does <HL>simplify hard</HL>.
    </TextSlide>
    <Notes>Now I tried it, and I&apos;ll be honest with you, it really does simplify hard.</Notes>
  </Fragment>,

  // 7 — Sometimes it strips a topic down so far it comes out a little too simple.
  <Fragment key="too-simple">
    <CoverSlide title="Sometimes it goes too simple." diagram={<OverSimplifiedSvg />} />
    <Notes>Sometimes it strips a topic down so far it comes out a little too simple.</Notes>
  </Fragment>,

  // 8 — But if that's what makes a technical thing finally click for a beginner, it's worth it.
  <Fragment key="it-clicks">
    <CoverSlide title="If it clicks, it's worth it." diagram={<ItClicksSvg />} />
    <Notes>
      But if that&apos;s what makes a technical thing finally click for a beginner, the big
      visuals and the simple model are worth it.
    </Notes>
  </Fragment>,

  // 9 — Comment MIKA and I'll send you exactly how to install it.
  <Fragment key="cta">
    <CtaSlide
      prompt="Comment"
      headline="MIKA"
      sub="and I'll send you exactly how to install it."
    />
    <Notes>Comment MIKA and I&apos;ll send you exactly how to install it.</Notes>
  </Fragment>,
];

export default function AnthropicEli5SkillDeckPage() {
  return <Deck slides={slides} />;
}
