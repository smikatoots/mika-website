import type { Metadata } from "next";
import localFont from "next/font/local";

import "./new-design.css";

// Satoshi (Indian Type Foundry, via Fontshare) is the prototype's display
// face. Only the 400 weight is shipped: the reference system builds every
// bit of hierarchy from scale and tracking, so having no bold available is
// the point, not an oversight.
//
// Not an approved website typeface in BRAND.md — this is a prototype route
// only. Promoting this direction means adding Satoshi to BRAND.md first.
const satoshi = localFont({
  src: "./fonts/Satoshi-Regular.woff2",
  weight: "400",
  style: "normal",
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
