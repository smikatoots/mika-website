import type { Metadata } from "next";
import { Inter } from "next/font/google";

// reveal.css must come first: it is the engine's layout. `reveal-theme.css`
// is our own theme and overrides it. Never add a stock reveal theme here —
// the two would fight over the same `--r-*` variables.
import "reveal.js/reveal.css";
import "./reveal-theme.css";
import "./deck.css";

// The deck's typeface. Named `--font-deck` rather than `--font-inter` so the
// surface can be re-typed later without touching every slide. Variable font,
// so every weight in the scale comes from one file.
const deckFont = Inter({
  variable: "--font-deck",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  // Presentation decks are a content-creation tool, not pages meant to be
  // indexed or discovered through search.
  robots: { index: false, follow: false },
};

export default function DeckLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${deckFont.variable} deck-root fixed inset-0 bg-white`}>
      {children}
    </div>
  );
}
