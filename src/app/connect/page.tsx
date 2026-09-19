import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";

const title = "Connect with Mika Reyes";
const description = "Scan to follow Mika Reyes on LinkedIn and Instagram.";

export const metadata: Metadata = {
  title,
  description,
  // A hand-out page for in-person scanning, not a page meant to be found
  // through search. Same reasoning as the presentation decks.
  robots: { index: false, follow: false },
};

// The 2026 identity's values, pinned locally because this page lives on `main`
// while that token set still lives on the `new-design` branch. Roles and names
// match that branch exactly, so when it lands this block is a no-op and can be
// deleted — the page will already be reading the right values. `--font-satoshi`
// comes from this route's own layout for the same reason.
const newDesign = {
  "--mr-bg": "#F1E8DE", // linen, the page ground
  "--mr-paper": "#FBF8F5", // one tonal step up, for cards
  "--mr-ink": "#000000",
  "--mr-muted": "#6E655C",
  "--mr-border-ink": "#000000", // the structural hairline
  "--mr-radius-card": "5px",
  "--mr-font-display":
    "var(--font-satoshi), ui-sans-serif, system-ui, sans-serif",
} as CSSProperties;

type Profile = {
  label: string;
  handle: string;
  url: string;
  qr: string;
};

const profiles: Profile[] = [
  {
    label: "LinkedIn",
    handle: "in/itsmikareyes",
    url: "https://www.linkedin.com/in/itsmikareyes/",
    qr: "/connect/qr-linkedin.svg",
  },
  {
    label: "Instagram",
    handle: "@its.mikareyes",
    url: "https://www.instagram.com/its.mikareyes",
    qr: "/connect/qr-instagram.svg",
  },
];

export default function ConnectPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-4 py-6 md:px-10 md:py-10"
      style={{ ...newDesign, background: "var(--mr-bg)" }}
    >
      <div className="w-full max-w-sm md:max-w-3xl">
        <h1
          className="text-center"
          style={{
            fontFamily: "var(--mr-font-display)",
            fontSize: "clamp(28px, 7vw, 44px)",
            fontWeight: 700,
            fontSynthesis: "none",
            lineHeight: 1.02,
            letterSpacing: "-0.034em",
            color: "var(--mr-ink)",
          }}
        >
          Mika Reyes
        </h1>

        <div className="mt-4 grid gap-3 md:mt-6 md:grid-cols-2 md:gap-5">
          {profiles.map((profile) => (
            <a
              key={profile.label}
              href={profile.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mr-pressable block text-center"
              style={{
                background: "var(--mr-paper)",
                border: "1px solid var(--mr-border-ink)",
                borderRadius: "var(--mr-radius-card)",
                padding: "12px",
                textDecoration: "none",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--mr-font-display)",
                  fontSize: "20px",
                  fontWeight: 700,
                  fontSynthesis: "none",
                  lineHeight: 1.25,
                  letterSpacing: "-0.04em",
                  color: "var(--mr-ink)",
                }}
              >
                {profile.label}
              </p>
              <div className="mx-auto mt-1 w-full max-w-[min(272px,72vw)] md:max-w-[320px]">
                <Image
                  src={profile.qr}
                  alt={`QR code linking to Mika Reyes on ${profile.label}`}
                  width={320}
                  height={320}
                  className="h-auto w-full"
                  unoptimized
                  priority
                />
              </div>
              <p
                className="mt-1"
                style={{
                  fontFamily: "var(--mr-font-body)",
                  fontSize: "15px",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "var(--mr-muted)",
                }}
              >
                {profile.handle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
