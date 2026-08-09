import type { Metadata } from "next";
import { Caveat, Inter, Nunito } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700", "800"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "J & Mario",
  description: "A private wedding card for Janelle and Mario.",
  robots: { index: false, follow: false },
};

export default function JAndMarioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${inter.variable} ${nunito.variable} ${caveat.variable} min-h-dvh`}
    >
      {children}
    </div>
  );
}
