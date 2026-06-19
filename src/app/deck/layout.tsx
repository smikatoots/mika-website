import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

import "./deck.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <div className={`${bricolage.variable} deck-root fixed inset-0 bg-white`}>
      {children}
    </div>
  );
}
