import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

import { SeriesCoverSlide } from "../_shared/series";

export const metadata: Metadata = { title: "Women Are Opting Out of AI" };

const LIB = "/decks/_library";

const ACCENT = "#fd4869";

// Two overlapping outlined circles; the intersection is filled salmon with BOTH in white.
function QuestionUseVenn() {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 560 460"
        className="h-auto w-full max-w-2xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="Two overlapping circles: question it and use it, overlapping at both"
      >
        <defs>
          <clipPath id="wooa-venn-left">
            <circle cx={215} cy={200} r={150} />
          </clipPath>
        </defs>
        {/* filled lens = intersection */}
        <circle cx={345} cy={200} r={150} fill={ACCENT} clipPath="url(#wooa-venn-left)" />
        {/* outlines */}
        <circle cx={215} cy={200} r={150} fill="none" stroke={ACCENT} strokeWidth={8} />
        <circle cx={345} cy={200} r={150} fill="none" stroke={ACCENT} strokeWidth={8} />
        {/* intersection label */}
        <text
          x={280}
          y={200}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={44}
          fontWeight={700}
          letterSpacing={1}
          fill="#ffffff"
        >
          BOTH
        </text>
        {/* labels beneath each circle */}
        <text
          x={150}
          y={412}
          textAnchor="middle"
          fontSize={38}
          fontWeight={700}
          letterSpacing={1}
          fill="#000000"
        >
          QUESTION IT
        </text>
        <text
          x={430}
          y={412}
          textAnchor="middle"
          fontSize={38}
          fontWeight={700}
          letterSpacing={1}
          fill="#000000"
        >
          USE IT
        </text>
      </svg>
    </div>
  );
}

// Struck-through old question on top, salmon arrow down, better question in an outlined box.
function BetterQuestionSvg() {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 820 460"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label="Crossed out: why don't women understand AI. Instead: what needs to change about AI so more women say yes?"
      >
        {/* old question, struck through */}
        <text
          x={410}
          y={62}
          textAnchor="middle"
          fontSize={46}
          fontWeight={700}
          fill="#000000"
        >
          Why don&apos;t women understand AI?
        </text>
        <line
          x1={70}
          y1={50}
          x2={750}
          y2={50}
          stroke={ACCENT}
          strokeWidth={12}
          strokeLinecap="round"
        />

        {/* arrow down */}
        <line
          x1={410}
          y1={122}
          x2={410}
          y2={210}
          stroke={ACCENT}
          strokeWidth={12}
          strokeLinecap="round"
        />
        <path d="M 410 246 L 380 200 L 440 200 Z" fill={ACCENT} />

        {/* new question in an outlined box */}
        <rect
          x={40}
          y={282}
          width={740}
          height={148}
          rx={32}
          fill="none"
          stroke={ACCENT}
          strokeWidth={8}
        />
        <text
          x={410}
          y={342}
          textAnchor="middle"
          fontSize={46}
          fontWeight={700}
          fill="#000000"
        >
          What needs to change about AI
        </text>
        <text
          x={410}
          y={400}
          textAnchor="middle"
          fontSize={46}
          fontWeight={700}
          fill="#000000"
        >
          so more women say yes?
        </text>
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — HBS found that women adopt AI at a 25% lower rate than men & some people think it's because women just don't understand AI.
  <ImageSlide
    key="hbs"
    src={`${LIB}/harvard-business-school-logo.png`}
    alt="Harvard Business School logo"
  />,

  // 2 — I hate the lazy explanation because to me it sounds like this: "ladida i'm a silly girl, ai so scary and technical i don't understand it so i won't use it."
  <ImageSlide key="silly-girl" src={`${LIB}/silly-girl.jpeg`} alt="Silly girl meme" />,

  // 3 — This is Episode 3 of Women & AI.
  <SeriesCoverSlide key="cover" episode={3} description="Why women opt out" />,

  // 4 — The convenient excuse is that women just need more confidence and training. False.
  <TextSlide key="just-need">Women just need to ____. False.</TextSlide>,

  // 5 — When Reese Witherspoon encouraged women to learn AI, her comments filled with backlash about what AI is doing to artists, jobs, and the environment.
  <ImageSlide
    key="reese"
    src={`${LIB}/reese-witherspoon.webp`}
    alt="Reese Witherspoon post about women learning AI"
  />,

  // 6 — Women specifically have legitimate reasons to be skeptical beyond the reasons i already talked about:
  <TextSlide key="legitimate">
    Women have <HL>legitimate</HL> reasons to be skeptical
  </TextSlide>,

  // 7 — around 90% of deepfake pornography targets women,
  <TextSlide key="deepfake">
    <HL>90%</HL> of deepfake porn targets women
  </TextSlide>,

  // 8 — artists and creators have had their work and likeness used without permission or compensation, and
  <TextSlide key="artists">artists &amp; creators (majority women)</TextSlide>,

  // 9 — women are nearly twice as likely to work in jobs with the highest exposure to AI.
  <TextSlide key="exposed">
    women <HL>2x</HL> more exposed
  </TextSlide>,

  // 10 — Some women aren't failing to catch up. They're making an informed choice not to participate in technology they do not trust. Women or men shouldn't have to choose between criticizing AI and participating in it.
  <TextSlide key="opting-out">
    Women are rightfully <HL>opting out.</HL>
  </TextSlide>,

  // 11 — We should be able to question how it's built while still learning to use it, shape it, and benefit from it.
  <CoverSlide key="venn" diagram={<QuestionUseVenn />} />,

  // 12 — So instead of asking, "Why don't women understand AI?" we should ask, "What needs to change about AI to make more women want to say yes?"
  <CoverSlide key="better-question" diagram={<BetterQuestionSvg />} />,

  // 13 — That said, there are still real consequences of opting out.
  <ImageSlide key="quite-a-gap" src={`${LIB}/quite-a-gap.gif`} alt="Quite a gap" />,

  // 14 — In the next episode I talk about one such consequence so follow for more.
  <CtaSlide
    key="cta"
    prompt={null}
    size="md"
    headlinePlain
    headline={
      <>
        <HL>Follow</HL> for Episode 4 — the cost of opting out
      </>
    }
    preview={`${LIB}/women-and-ai-article-preview.webp`}
    previewAlt="Women and AI article preview"
  />,
];

export default function WomenOptingOutOfAiDeckPage() {
  return <Deck slides={slides} />;
}
