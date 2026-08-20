import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { CoverSlide, HL, ImageSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "BRAND.md — One File, Consistent Design" };

const LIB = "/decks/_library";

const INK = "#111827";
const ACCENT = "#fd4869";
const GREY = "#d4d4d8";
const FONT = "var(--font-bricolage), system-ui, sans-serif";

/**
 * 4 — "File anatomy" card: BRAND.md with five rows, each label on the left and
 * a proof-chip on the right.
 */
function FileAnatomySvg() {
  const rows: { label: string; chip: React.ReactNode }[] = [
    {
      label: "Voice",
      chip: (
        <>
          <rect x="640" y="148" width="180" height="52" rx="18" fill="#fff" stroke={INK} strokeWidth="4" />
          <path d="M668 200 L660 218 L690 200 Z" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <line x1="660" y1="166" x2="790" y2="166" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
          <line x1="660" y1="184" x2="750" y2="184" stroke={GREY} strokeWidth="7" strokeLinecap="round" />
        </>
      ),
    },
    {
      label: "Colors",
      chip: (
        <>
          {[ACCENT, INK, "#f4f1ea", "#9ca3af"].map((fill, i) => (
            <rect
              key={fill}
              x={606 + i * 62}
              y="251"
              width="52"
              height="52"
              rx="14"
              fill={fill}
              stroke={INK}
              strokeWidth="3"
            />
          ))}
        </>
      ),
    },
    {
      label: "Fonts",
      chip: (
        <>
          <text x="680" y="394" textAnchor="middle" fontSize="58" fontWeight="800" fill={INK}>
            Aa
          </text>
          <text x="790" y="394" textAnchor="middle" fontSize="58" fontWeight="300" fill="#9ca3af">
            Aa
          </text>
        </>
      ),
    },
    {
      label: "Website",
      chip: (
        <>
          <rect x="670" y="442" width="170" height="62" rx="10" fill="#fff" stroke={INK} strokeWidth="3.5" />
          <line x1="670" y1="459" x2="840" y2="459" stroke={INK} strokeWidth="3" />
          <rect x="684" y="470" width="44" height="24" rx="5" fill={ACCENT} />
          <line x1="742" y1="473" x2="826" y2="473" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
          <line x1="742" y1="483" x2="826" y2="483" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
          <line x1="742" y1="493" x2="796" y2="493" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
        </>
      ),
    },
    {
      label: "Decks",
      chip: (
        <>
          <rect x="686" y="534" width="160" height="58" rx="8" fill="#fff" stroke={GREY} strokeWidth="3" />
          <rect x="670" y="546" width="160" height="58" rx="8" fill="#fff" stroke={INK} strokeWidth="3.5" />
          <rect x="684" y="558" width="64" height="10" rx="5" fill={ACCENT} />
          <line x1="684" y1="578" x2="816" y2="578" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
          <line x1="684" y1="591" x2="772" y2="591" stroke={GREY} strokeWidth="5" strokeLinecap="round" />
        </>
      ),
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 900 640"
        className="h-auto max-h-full w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={FONT}
        role="img"
        aria-label="A BRAND.md file holding voice, colors, fonts, website and deck rules"
      >
        <rect x="30" y="20" width="840" height="600" rx="28" fill="#fff" stroke={INK} strokeWidth="4" />

        {/* Header: the filename */}
        <g className="deck-fade">
          <path
            d="M66 50 H100 L118 68 V112 H66 Z"
            fill="#fff"
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path d="M100 50 V68 H118" fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <text x="140" y="98" fontSize="48" fontWeight="800" fill={INK}>
            BRAND
            <tspan fill={ACCENT}>.md</tspan>
          </text>
        </g>
        <line x1="30" y1="130" x2="870" y2="130" stroke={INK} strokeWidth="4" />

        {rows.map((row, i) => {
          const top = 130 + i * 98;
          return (
            <g key={row.label} className="deck-fade" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              {i > 0 ? <line x1="30" y1={top} x2="870" y2={top} stroke={GREY} strokeWidth="2" /> : null}
              <text x="72" y={top + 61} fontSize="36" fontWeight="700" fill={INK}>
                {row.label}
              </text>
              {row.chip}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** 7 — Researches → Interviews you → Writes the file. */
function ResearchFlowSvg() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 1200 330"
        className="h-auto max-h-full w-full max-w-6xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={FONT}
        role="img"
        aria-label="The plugin researches competitors, interviews you, then writes the BRAND.md file"
      >
        {/* 1 — Researches */}
        <g className="deck-fade">
          {[62, 152, 242].map((x) => (
            <g key={x}>
              <rect x={x} y="80" width="76" height="96" rx="10" fill="#f4f4f5" stroke={GREY} strokeWidth="3" />
              <rect x={x + 14} y="96" width="48" height="10" rx="5" fill={GREY} />
              <line x1={x + 14} y1="126" x2={x + 62} y2="126" stroke="#e4e4e7" strokeWidth="6" strokeLinecap="round" />
              <line x1={x + 14} y1="144" x2={x + 50} y2="144" stroke="#e4e4e7" strokeWidth="6" strokeLinecap="round" />
            </g>
          ))}
          <circle cx="225" cy="140" r="50" fill="#fff" fillOpacity="0.6" stroke={ACCENT} strokeWidth="8" />
          <line x1="261" y1="176" x2="296" y2="211" stroke={ACCENT} strokeWidth="12" strokeLinecap="round" />
          <text x="190" y="292" textAnchor="middle" fontSize="36" fontWeight="800" fill={INK}>
            Researches
          </text>
        </g>

        {/* arrow 1 */}
        <g className="deck-fade" style={{ animationDelay: "0.2s" }}>
          <line x1="362" y1="140" x2="412" y2="140" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
          <path d="M432 140 L410 127 L410 153 Z" fill={ACCENT} />
        </g>

        {/* 2 — Interviews you */}
        <g className="deck-fade" style={{ animationDelay: "0.32s" }}>
          <rect x="445" y="60" width="170" height="70" rx="24" fill="#fff" stroke={INK} strokeWidth="4" />
          <path d="M478 130 L468 160 L514 130 Z" fill="#fff" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
          <line x1="467" y1="86" x2="593" y2="86" stroke={GREY} strokeWidth="7" strokeLinecap="round" />
          <line x1="467" y1="108" x2="558" y2="108" stroke={GREY} strokeWidth="7" strokeLinecap="round" />

          <rect x="590" y="145" width="170" height="70" rx="24" fill="#fff" stroke={ACCENT} strokeWidth="4" />
          <path d="M727 215 L737 245 L691 215 Z" fill="#fff" stroke={ACCENT} strokeWidth="4" strokeLinejoin="round" />
          <line x1="612" y1="171" x2="738" y2="171" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="7" strokeLinecap="round" />
          <line x1="612" y1="193" x2="703" y2="193" stroke={ACCENT} strokeOpacity="0.4" strokeWidth="7" strokeLinecap="round" />
          <text x="600" y="292" textAnchor="middle" fontSize="36" fontWeight="800" fill={INK}>
            Interviews you
          </text>
        </g>

        {/* arrow 2 */}
        <g className="deck-fade" style={{ animationDelay: "0.5s" }}>
          <line x1="782" y1="140" x2="832" y2="140" stroke={ACCENT} strokeWidth="8" strokeLinecap="round" />
          <path d="M852 140 L830 127 L830 153 Z" fill={ACCENT} />
        </g>

        {/* 3 — Writes the file */}
        <g className="deck-fade" style={{ animationDelay: "0.62s" }}>
          <path
            d="M920 50 H1046 L1080 84 V232 H920 Z"
            fill="#fff"
            stroke={INK}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M1046 50 V84 H1080" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <text x="1000" y="128" textAnchor="middle" fontSize="26" fontWeight="800" fill={INK}>
            BRAND
            <tspan fill={ACCENT}>.md</tspan>
          </text>
          <line x1="944" y1="162" x2="1056" y2="162" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
          <line x1="944" y1="188" x2="1056" y2="188" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
          <line x1="944" y1="214" x2="1004" y2="214" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
          <text x="1000" y="292" textAnchor="middle" fontSize="36" fontWeight="800" fill={INK}>
            Writes the file
          </text>
        </g>
      </svg>
    </div>
  );
}

/** 8 — One BRAND.md dropping into website/, decks/, content/. */
function DropIntoFoldersSvg() {
  const folders: { cx: number; label: string }[] = [
    { cx: 170, label: "website/" },
    { cx: 500, label: "decks/" },
    { cx: 830, label: "content/" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg
        viewBox="0 0 1000 570"
        className="h-auto max-h-full w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily={FONT}
        role="img"
        aria-label="One BRAND.md file dropped into the website, decks and content folders"
      >
        {/* The source file */}
        <g className="deck-fade">
          <path
            d="M410 20 H545 L585 60 V195 H410 Z"
            fill="#fff"
            stroke={INK}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path d="M545 20 V60 H585" fill="none" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <text x="497" y="108" textAnchor="middle" fontSize="30" fontWeight="800" fill={INK}>
            BRAND
            <tspan fill={ACCENT}>.md</tspan>
          </text>
          <line x1="437" y1="142" x2="560" y2="142" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
          <line x1="437" y1="167" x2="520" y2="167" stroke={GREY} strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* Connectors */}
        <g className="deck-fade" style={{ animationDelay: "0.2s" }} fill="none">
          <path
            d="M497 198 V240 Q497 262 475 262 H192 Q170 258 170 280 V306"
            stroke={ACCENT}
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path d="M500 198 V306" stroke={ACCENT} strokeWidth="5" strokeLinecap="round" />
          <path
            d="M497 198 V240 Q497 262 519 262 H808 Q830 258 830 280 V306"
            stroke={ACCENT}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {folders.map((f) => (
            <path key={f.cx} d={`M${f.cx} 324 L${f.cx - 12} 302 L${f.cx + 12} 302 Z`} fill={ACCENT} />
          ))}
        </g>

        {/* Folders, each with a faint copy of the file inside */}
        {folders.map((f, i) => (
          <g key={f.label} className="deck-fade" style={{ animationDelay: `${0.36 + i * 0.12}s` }}>
            <path
              d={`M${f.cx - 125} 470 V 358 H${f.cx - 45} L${f.cx - 20} 383 H${f.cx + 125} V 470 Z`}
              fill="#fff"
              stroke={INK}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <g opacity="0.7">
              <path
                d={`M${f.cx - 38} 336 H${f.cx + 8} L${f.cx + 38} 366 V 460 H${f.cx - 38} Z`}
                fill="#fff1f3"
                stroke={ACCENT}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d={`M${f.cx + 8} 336 V 366 H${f.cx + 38}`}
                fill="none"
                stroke={ACCENT}
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <line
                x1={f.cx - 22}
                y1="386"
                x2={f.cx + 22}
                y2="386"
                stroke={ACCENT}
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
            <path
              d={`M${f.cx - 132} 400 H${f.cx + 132} L${f.cx + 118} 478 H${f.cx - 118} Z`}
              fill="#fafafa"
              stroke={INK}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <text
              x={f.cx}
              y="530"
              textAnchor="middle"
              fontSize="34"
              fontWeight="800"
              fill={INK}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {f.label.replace("/", "")}
              <tspan fill={ACCENT}>/</tspan>
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const slides: React.ReactNode[] = [
  // 1 — If your AI graphics look like five different companies, you're missing one tiny file
  <ImageSlide
    key="clash"
    src={`${LIB}/clashing-design.jpeg`}
    alt="Six clashing graphic design covers in different styles"
  />,

  // 2 — The file is called a BRAND.md
  <ImageSlide key="brand-md" src={`${LIB}/brand-md.png`} alt="A BRAND.md file" />,

  // 3 — Nick and I built three things and all three looked like three companies
  <ImageSlide key="mika-nick" src={`${LIB}/mika-and-nick.jpeg`} alt="Mika and Nick" />,

  // 4 — A BRAND.md holds your brand in one place: voice, colors, fonts, site, decks
  <CoverSlide key="anatomy" diagram={<FileAnatomySvg />} />,

  // 5 — Claude reads it before it designs anything
  <TextSlide key="reads-first">
    <span>
      Claude reads it <HL>before</HL> it designs anything.
    </span>
  </TextSlide>,

  // 6 — There's a plugin that does the whole thing: add, install, run
  <ImageSlide
    key="setup"
    src={`${LIB}/brand-md-setup-steps.png`}
    alt="Three commands: add the marketplace, install the plugin, run it"
  />,

  // 7 — It researches competitors, interviews you, then writes the file
  <CoverSlide key="flow" diagram={<ResearchFlowSvg />} />,

  // 8 — Drop it into your website, decks, and content folders
  <CoverSlide key="folders" diagram={<DropIntoFoldersSvg />} />,

  // 9 — CTA
  <CtaSlide
    key="cta"
    prompt="comment"
    headline="MIKA"
    sub="for my guide & tell me what you'd use it for!"
    subSize="sm"
    size="md"
    preview={`${LIB}/ai-guides-preview.png`}
    previewAlt="Mika's AI guides"
  />,
];

export default function BrandMdConsistentDesignDeckPage() {
  return <Deck slides={slides} />;
}
