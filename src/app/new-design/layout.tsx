import type { Metadata } from "next";
import localFont from "next/font/local";

import "./new-design.css";

// Satoshi (Indian Type Foundry, via Fontshare) is the prototype's display
// face, set semibold per Mika's direction.
//
// The family has no true 600: it runs 300/400/500/700/900. Both neighbours
// are shipped so the choice stays open — CSS weight matching resolves a
// requested 600 to Bold (700), and dropping `--nd-display-weight` to 500
// switches every heading to Medium in one edit.
//
// Not an approved website typeface in BRAND.md — this is a prototype route
// only. Promoting this direction means adding Satoshi to BRAND.md first.
const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--nd-font-satoshi",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  // Design prototype. Not a public page — never index it, and never add it to
  // the sitemap. See SEO.md.
  robots: { index: false, follow: false },
  title: "New design prototype",
};

export default function NewDesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={`${satoshi.variable} nd-root`}>{children}</div>;
}
