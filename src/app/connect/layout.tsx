import localFont from "next/font/local";

// Satoshi (Indian Type Foundry, via Fontshare) — the display voice of the 2026
// identity. It is declared here rather than in the root layout because that
// identity still lives on the `new-design` branch: scoping it to this route
// means no other page on `main` pays for the font. The files are the same two
// cuts, byte for byte and at the same path, that the branch ships, so when it
// lands and moves the declaration up to the root layout, this file is the only
// thing to delete.
//
// The family has no true 600: the semibold the system asks for resolves to
// Bold. Only these two weights exist, which is what keeps hierarchy coming
// from size and tracking rather than from a heavier cut.
const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-satoshi",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
});

export default function ConnectLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className={satoshi.variable}>{children}</div>;
}
