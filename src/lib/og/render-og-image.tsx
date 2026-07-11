import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/** Shared 1200×630 Open Graph card, rendered in the site's cream + coral palette. */
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

// Palette pulled from globals.css tokens.
const CREAM = "#F7F4EF";
const INK = "#111111";
const CORAL = "#E8425A";
const MUTED = "#6B6B6B";
const BORDER = "#E4E0D8";

const FRAME = 16; // coral border thickness on all four sides

// Fonts + logo are read once per server process, not per request.
const loadAssets = (() => {
  let promise: Promise<{
    bold: Buffer;
    extrabold: Buffer;
    logoSrc: string;
  }> | null = null;
  return () => {
    if (!promise) {
      const fontDir = join(process.cwd(), "assets/fonts");
      promise = Promise.all([
        readFile(join(fontDir, "BricolageGrotesque-700.ttf")),
        readFile(join(fontDir, "BricolageGrotesque-800.ttf")),
        readFile(join(process.cwd(), "public/mika-reyes-logo.png"), "base64"),
      ]).then(([bold, extrabold, logo]) => ({
        bold,
        extrabold,
        logoSrc: `data:image/png;base64,${logo}`,
      }));
    }
    return promise;
  };
})();

/** Longer titles step down in size so they stay on ~3 lines. */
function titleFontSize(title: string): number {
  const len = title.length;
  if (len > 95) return 54;
  if (len > 70) return 62;
  if (len > 45) return 74;
  return 86;
}

type OgImageOptions = {
  /** Small uppercase category label above the title, e.g. "AI Guide". */
  eyebrow: string;
  /** The page title — the hero of the card. */
  title: string;
};

export async function renderOgImage({ eyebrow, title }: OgImageOptions) {
  const { bold, extrabold, logoSrc } = await loadAssets();

  return new ImageResponse(
    (
      // Coral frame: outer coral, inner cream inset by the frame thickness.
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: CORAL,
          padding: FRAME,
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: CREAM,
            padding: "60px 72px",
          }}
        >
          {/* Top row: eyebrow + logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: CORAL,
              }}
            >
              {eyebrow}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={72} height={72} alt="" />
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize(title),
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              color: INK,
            }}
          >
            {title}
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 26,
              borderTop: `2px solid ${BORDER}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 14,
                  background: CORAL,
                  marginRight: 16,
                  display: "flex",
                }}
              />
              <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: INK }}>
                Mika Reyes
              </div>
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: MUTED }}>
              mikareyes.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage Grotesque", data: bold, style: "normal", weight: 700 },
        { name: "Bricolage Grotesque", data: extrabold, style: "normal", weight: 800 },
      ],
    },
  );
}
