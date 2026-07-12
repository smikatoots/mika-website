import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import { HL, StepsSlide, TextSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "The Meta AI Muse Privacy Setting to Turn Off" };

// Giant emoji used as a step's right-side visual (fallback while the ig-* screenshots are missing).
function BigEmoji({ children }: { children: React.ReactNode }) {
  return (
    <div className="deck-pop flex h-full w-full items-center justify-center">
      <span className="text-[9rem] leading-none sm:text-[13rem]">{children}</span>
    </div>
  );
}

// 1 — Custom SVG: your PUBLIC photo → AI → a fake video of you, happening WITHOUT consent.
// public profile photo (left) → arrow → AI gear/spark (center) → arrow (with a red dashed
// no-consent slash over a lock) → fake-video/face icon (right).
function PhotoToVideoSvg() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-6 sm:p-10">
      <svg
        viewBox="0 0 1000 470"
        className="h-auto w-full max-w-5xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        <defs>
          <marker id="museArrow" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#111" />
          </marker>
        </defs>

        {/* title */}
        <text x="500" y="46" textAnchor="middle" fontSize="30" fontWeight="800" fill="#111">
          Your public photo → AI → a video you never made
        </text>

        {/* panel 1 — public profile photo */}
        <circle cx="150" cy="230" r="62" fill="#f4f4f5" stroke="#111" strokeWidth="3" />
        <circle cx="150" cy="210" r="23" fill="#111" />
        <path d="M110 274 C110 226 190 226 190 274 Z" fill="#111" />
        {/* public globe badge */}
        <circle cx="198" cy="272" r="22" fill="#fd4869" stroke="#fff" strokeWidth="3" />
        <circle cx="198" cy="272" r="13" fill="none" stroke="#fff" strokeWidth="2" />
        <line x1="185" y1="272" x2="211" y2="272" stroke="#fff" strokeWidth="2" />
        <path d="M198 259 C205 266 205 278 198 285 C191 278 191 266 198 259" fill="none" stroke="#fff" strokeWidth="2" />
        <text x="150" y="348" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111">
          public photo
        </text>

        {/* arrow 1 */}
        <line x1="235" y1="230" x2="352" y2="230" stroke="#111" strokeWidth="4" markerEnd="url(#museArrow)" />

        {/* panel 2 — AI gear + spark */}
        <circle cx="470" cy="230" r="58" fill="#111" />
        <text x="470" y="244" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff">
          AI
        </text>
        <path
          d="M527 178 l7 16 16 7 -16 7 -7 16 -7 -16 -16 -7 16 -7 z"
          fill="#fd4869"
        />
        <text x="470" y="348" textAnchor="middle" fontSize="24" fontWeight="700" fill="#111">
          generates
        </text>

        {/* arrow 2 (AI → video), with no-consent mark sitting on it */}
        <line x1="548" y1="230" x2="782" y2="230" stroke="#111" strokeWidth="4" markerEnd="url(#museArrow)" />
        {/* no-consent: lock + red dashed ring + slash */}
        <rect x="649" y="224" width="32" height="26" rx="5" fill="#fff" stroke="#111" strokeWidth="3" />
        <path d="M657 224 v-8 a8 8 0 0 1 16 0 v8" fill="none" stroke="#111" strokeWidth="3" />
        <circle cx="665" cy="230" r="36" fill="none" stroke="#fd4869" strokeWidth="4" strokeDasharray="6 5" />
        <line x1="640" y1="256" x2="690" y2="204" stroke="#fd4869" strokeWidth="5" strokeLinecap="round" />
        <text x="665" y="316" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">
          no consent
        </text>

        {/* panel 3 — fake video of you */}
        <rect x="810" y="158" width="150" height="150" rx="18" fill="#111" />
        <circle cx="885" cy="212" r="24" fill="#f4f4f5" />
        <path d="M843 300 C843 250 927 250 927 300 Z" fill="#f4f4f5" />
        {/* play badge */}
        <circle cx="948" cy="166" r="20" fill="#fd4869" stroke="#fff" strokeWidth="3" />
        <path d="M942 157 L942 175 L958 166 Z" fill="#fff" />
        <text x="885" y="348" textAnchor="middle" fontSize="24" fontWeight="700" fill="#fd4869">
          fake video of you
        </text>
      </svg>
    </div>
  );
}

// 5 — Custom SVG: toggle OFF now, but anything already made stays up.
// clock "now" (urgency) + OFF toggle at top → down arrow → stack of 3 thumbnails "stays up".
function ToggleStaysUpSvg() {
  return (
    <div className="deck-fade flex h-full w-full items-center justify-center p-6 sm:p-10">
      <svg
        viewBox="0 0 900 620"
        className="h-auto w-full max-w-3xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
      >
        {/* clock — urgency */}
        <circle cx="250" cy="96" r="30" fill="none" stroke="#fd4869" strokeWidth="5" />
        <line x1="250" y1="96" x2="250" y2="76" stroke="#fd4869" strokeWidth="4" strokeLinecap="round" />
        <line x1="250" y1="96" x2="266" y2="96" stroke="#fd4869" strokeWidth="4" strokeLinecap="round" />
        <text x="250" y="156" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fd4869">
          now
        </text>

        {/* toggle flipped OFF */}
        <rect x="378" y="64" width="150" height="64" rx="32" fill="#d4d4d8" stroke="#111" strokeWidth="3" />
        <circle cx="412" cy="96" r="26" fill="#fff" stroke="#111" strokeWidth="3" />
        <text x="612" y="108" textAnchor="middle" fontSize="34" fontWeight="800" fill="#111">
          OFF
        </text>

        {/* down arrow */}
        <line x1="450" y1="184" x2="450" y2="250" stroke="#111" strokeWidth="6" strokeLinecap="round" />
        <path d="M430 246 L450 272 L470 246 Z" fill="#111" />

        {/* stack of 3 thumbnails — already made */}
        <rect x="470" y="292" width="190" height="140" rx="16" fill="#f4f4f5" stroke="#111" strokeWidth="3" />
        <rect x="420" y="312" width="190" height="140" rx="16" fill="#fafafa" stroke="#111" strokeWidth="3" />
        <rect x="370" y="332" width="190" height="140" rx="16" fill="#fff" stroke="#111" strokeWidth="3" />
        {/* play glyph on front thumbnail */}
        <path d="M448 380 L448 424 L486 402 Z" fill="#fd4869" />

        {/* labels */}
        <text x="450" y="528" textAnchor="middle" fontSize="30" fontWeight="800" fill="#111">
          already made
        </text>
        <text x="450" y="574" textAnchor="middle" fontSize="36" fontWeight="800" fill="#fd4869">
          stays up
        </text>
      </svg>
    </div>
  );
}

const igSteps: React.ReactNode[] = [
  "Settings",
  "Sharing and Reuse",
  "Allow People to Create With and Reuse Your Content",
  "Turn off for Posts and Reels",
];

const slides: React.ReactNode[] = [
  // 1 — Spoken hook: someone can take your public photos and generate a fake video of you.
  <PhotoToVideoSvg key="hook" />,

  // 2 — Context: I post about AI a lot, but I believe in responsible AI.
  <TextSlide key="responsible" display>
    I love AI — but <HL>responsibly</HL>.
  </TextSlide>,

  // 3 — Meta launched the Muse Image program; it lets others generate AI content of you.
  // FALLBACK: `meta-muse-announcement` screenshot is missing from _library, so this ships as a
  // text statement instead of a broken ImageSlide. Swap to <ImageSlide caption=...> once added.
  <TextSlide key="muse" display>
    Meta&rsquo;s new <HL>Muse Image</HL> can generate AI content of you.
  </TextSlide>,

  // 4 — Nobody asks permission. Public account = already opted in.
  <TextSlide key="opted-in" display>
    Public account? You&rsquo;re already <HL>opted in</HL>.
  </TextSlide>,

  // 5 — Turn it off today, but anything already made stays up. So turn it off now.
  <ToggleStaysUpSvg key="stays-up" />,

  // 6 — Steps: Settings → Sharing and Reuse → Allow People to Create... → turn off Posts & Reels.
  // FALLBACK: ig-settings-menu, ig-sharing-reuse, ig-allow-people-create, ig-toggle-off-posts-reels
  // are all missing from _library, so each step uses an emoji visual. Swap in the screenshots when added.
  <StepsSlide key="step-settings" steps={igSteps} current={0} visual={<BigEmoji>⚙️</BigEmoji>} />,
  <StepsSlide key="step-sharing" steps={igSteps} current={1} visual={<BigEmoji>🔁</BigEmoji>} />,
  <StepsSlide key="step-allow" steps={igSteps} current={2} visual={<BigEmoji>👥</BigEmoji>} />,
  <StepsSlide key="step-off" steps={igSteps} current={3} visual={<BigEmoji>📴</BigEmoji>} />,

  // 7 — CTA: follow for more safe AI tips, share with a friend.
  <CtaSlide
    key="cta"
    prompt="Follow for more"
    headline="safe AI tips"
    sub="Share this with a friend."
  />,
];

export default function MetaAiMusePrivacyDeckPage() {
  return <Deck slides={slides} />;
}
