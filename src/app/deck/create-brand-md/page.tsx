import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CtaSlide } from "@/components/deck/special-slides";
import { deckType, headingBase } from "@/components/deck/deck-styles";

export const metadata: Metadata = { title: "How to Create a BRAND.md File" };

function Frame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`deck-fade flex h-full w-full items-center justify-center px-6 py-16 sm:px-12 ${className}`}>{children}</div>;
}

function Pill({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <span className="deck-pop rounded-full border-2 border-zinc-900 bg-white px-5 py-2 text-xl font-extrabold text-zinc-900 shadow-sm sm:text-3xl" style={{ animationDelay: `${delay}s` }}>{children}</span>;
}

function ProblemSlide() {
  const outputs = ["Landing page", "Pitch deck", "Instagram post"];
  return (
    <Frame className="flex-col gap-8 text-center">
      <h1 className={`deck-rise max-w-6xl ${headingBase} ${deckType.statement}`}>Your AI designs look like <span className="deck-accent">3 different companies</span></h1>
      <div className="flex flex-wrap justify-center gap-4">
        {outputs.map((output, index) => <div key={output} className="brand-float" style={{ animationDelay: `${index * 0.28}s` }}><Pill delay={0.22 + index * 0.13}>{output}</Pill></div>)}
      </div>
      <p className="deck-rise text-2xl font-bold text-zinc-500 sm:text-4xl" style={{ animationDelay: "0.68s" }}>Because every prompt starts from zero.</p>
    </Frame>
  );
}

function SourceOfTruthSlide() {
  const things = ["voice", "colors", "fonts", "feel"];
  return (
    <Frame>
      <div className="flex w-full max-w-6xl flex-col items-center gap-7 text-center">
        <p className={`deck-rise ${headingBase} text-4xl sm:text-6xl`}>Give every tool one file to read first.</p>
        <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-center">
          <div className="brand-breathe rounded-[2rem] border-[3px] border-zinc-900 bg-white px-10 py-8" style={{ animationDelay: "0.16s" }}>
            <div className="font-mono text-5xl font-black text-zinc-950 sm:text-7xl">BRAND<span className="deck-accent">.md</span></div>
            <div className="mt-3 font-mono text-lg text-zinc-500">your source of truth</div>
          </div>
          <span className="brand-arrow-nudge text-6xl font-black text-[var(--deck-accent)]" style={{ animationDelay: "0.36s" }}>→</span>
          <div className="grid grid-cols-2 gap-3">
            {things.map((thing, index) => <Pill key={thing} delay={0.48 + index * 0.1}>{thing}</Pill>)}
          </div>
        </div>
      </div>
    </Frame>
  );
}

function AnatomySlide() {
  const sections = [
    ["---", "name: Studio Vale\ntagline: Objects for slow mornings\nversion: 1"],
    ["# Strategy", "Who we serve + what we stand for"],
    ["# Promise", "The feeling every design should create"],
    ["# Guardrails", "What we never say or make"],
  ];
  return (
    <Frame>
      <div className="flex w-full max-w-5xl flex-col gap-5">
        <h1 className={`deck-rise text-center ${headingBase} text-4xl sm:text-6xl`}>What goes in it?</h1>
        <div className="relative overflow-hidden rounded-3xl border-2 border-zinc-900 bg-zinc-950 p-5 font-mono shadow-[10px_10px_0_0_#fd4869] sm:p-8">
          <div className="brand-scan-line" aria-hidden />
          {sections.map(([label, copy], index) => <div key={label} className="deck-rise border-b border-zinc-700 py-3 last:border-0" style={{ animationDelay: `${0.17 + index * 0.13}s` }}><div className="text-xl font-bold text-pink-300 sm:text-3xl">{label}</div><div className="whitespace-pre-line pt-1 text-base leading-relaxed text-zinc-300 sm:text-xl">{copy}</div></div>)}
        </div>
      </div>
    </Frame>
  );
}

function GuardrailSlide() {
  return (
    <Frame className="flex-col gap-8 text-center">
      <div className="brand-wiggle text-7xl sm:text-9xl" aria-hidden>🚧</div>
      <h1 className={`deck-rise max-w-5xl ${headingBase} ${deckType.statement}`}>Write rules for a <span className="deck-accent">machine</span>, not a mood board.</h1>
      <div className="deck-pop max-w-4xl rounded-3xl border-2 border-zinc-900 bg-pink-50 px-7 py-5 font-mono text-2xl font-bold leading-snug text-zinc-900 sm:text-4xl" style={{ animationDelay: "0.38s" }}>&quot;if it sounds like marketing, rewrite it.<span className="brand-cursor text-[var(--deck-accent)]">▌</span>&quot;</div>
      <p className="deck-rise text-2xl font-bold text-zinc-500 sm:text-4xl" style={{ animationDelay: "0.56s" }}>Blunt + specific beats vague adjectives.</p>
    </Frame>
  );
}

function SetupSlide() {
  const commands = [
    ["1", "Add the marketplace", "/plugin marketplace add caiopizzol/brand.md"],
    ["2", "Install the plugin", "/plugin install brand-md@brand-md"],
    ["3", "Run the interview", "/brand-md:brand"],
  ];
  return <Frame><div className="w-full max-w-6xl"><h1 className={`deck-rise mb-8 text-center ${headingBase} text-4xl sm:text-6xl`}>Generate a first draft in <span className="deck-accent">3 commands</span></h1><div className="grid gap-4 md:grid-cols-3">{commands.map(([number, label, command], index) => <div key={number} className="brand-float" style={{ animationDelay: `${index * 0.24}s` }}><div className="deck-pop rounded-3xl border-2 border-zinc-900 bg-white p-5 shadow-[6px_6px_0_0_#fd4869]" style={{ animationDelay: `${0.2 + index * 0.14}s` }}><div className="font-mono text-3xl font-black text-[var(--deck-accent)]">{number}</div><div className="mt-2 text-2xl font-extrabold text-zinc-950">{label}</div><code className="brand-file-glow mt-4 block break-all rounded-xl p-3 text-sm leading-relaxed text-pink-200">{command}</code></div></div>)}</div></div></Frame>;
}

function InterviewSlide() {
  const nodes = ["Research competitors", "Ask about your brand", "Generate BRAND.md", "Edit what feels wrong"];
  return <Frame><div className="flex w-full max-w-6xl flex-col items-center gap-7"><h1 className={`deck-rise text-center ${headingBase} text-4xl sm:text-6xl`}>The plugin does the tedious part.<br /><span className="deck-accent">You supply the truth.</span></h1><div className="flex flex-wrap items-center justify-center gap-3">{nodes.map((node, index) => <div key={node} className="flex items-center gap-3"><Pill delay={0.2 + index * 0.15}>{node}</Pill>{index < nodes.length - 1 ? <span className="brand-arrow-nudge text-4xl font-black text-[var(--deck-accent)]" style={{ animationDelay: `${index * 0.2}s` }}>→</span> : null}</div>)}</div></div></Frame>;
}

function WhereItLivesSlide() {
  const folders = ["Website project", "Deck folder", "Content folder"];
  return <Frame><div className="flex w-full max-w-6xl flex-col items-center gap-8"><h1 className={`deck-rise text-center ${headingBase} text-4xl sm:text-6xl`}>Put it wherever your AI is working.</h1><div className="grid w-full gap-5 md:grid-cols-3">{folders.map((folder, index) => <div key={folder} className="deck-pop flex min-h-48 flex-col justify-between rounded-3xl border-2 border-zinc-900 bg-zinc-50 p-6" style={{ animationDelay: `${0.2 + index * 0.14}s` }}><span className="brand-float w-fit text-5xl" style={{ animationDelay: `${index * 0.24}s` }} aria-hidden>📁</span><div><div className="text-2xl font-extrabold sm:text-3xl">{folder}</div><div className="brand-file-glow mt-3 rounded-lg px-3 py-2 font-mono text-lg text-pink-200">BRAND.md</div></div></div>)}</div><p className="deck-rise text-center text-2xl font-bold text-zinc-500 sm:text-3xl" style={{ animationDelay: "0.72s" }}>One file in another folder is invisible to the project Claude has open.</p></div></Frame>;
}

function PayoffSlide() {
  const outputs = ["site", "decks", "carousels"];
  return <Frame><div className="flex w-full max-w-6xl flex-col items-center gap-9 text-center"><h1 className={`deck-rise ${headingBase} ${deckType.statement}`}>One setup.<br />Every design task gets <span className="deck-accent">shorter.</span></h1><div className="flex flex-wrap items-center justify-center gap-4"><div className="brand-breathe rounded-2xl bg-zinc-950 px-6 py-4 font-mono text-3xl font-black text-white">BRAND.md</div><span className="brand-arrow-nudge text-5xl font-black text-[var(--deck-accent)]">→</span>{outputs.map((output, index) => <div key={output} className="brand-float" style={{ animationDelay: `${index * 0.25}s` }}><Pill delay={0.46 + index * 0.12}>{output}</Pill></div>)}</div><p className="deck-rise max-w-4xl text-2xl font-bold text-zinc-500 sm:text-4xl" style={{ animationDelay: "0.86s" }}>Stop restating your brand in every prompt.</p></div></Frame>;
}

const slides: React.ReactNode[] = [
  <ProblemSlide key="problem" />,
  <SourceOfTruthSlide key="source" />,
  <AnatomySlide key="anatomy" />,
  <GuardrailSlide key="guardrails" />,
  <SetupSlide key="setup" />,
  <InterviewSlide key="interview" />,
  <WhereItLivesSlide key="where" />,
  <PayoffSlide key="payoff" />,
  <CtaSlide key="cta" prompt="Comment" headline="BRAND" sub="for the BRAND.md guide" />,
];

export default function CreateBrandMdDeckPage() {
  return <Deck slides={slides} />;
}
