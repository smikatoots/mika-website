import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";

import { Ga4TrackedAnchor } from "@/components/analytics/Ga4TrackedLink";

import { CopyPrompt } from "./copy-prompt";

const title = "Claude Content Workshop";
const description =
  "August 20 Paper demo — download Paper, connect the MCP, and build an Instagram carousel with Claude.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export const dynamic = "force-static";

const PAPER_DOWNLOAD = "https://paper.design/downloads";
const PAPER_MCP = "https://paper.design/docs/mcp";
const SUBSTACK_URL =
  "https://mikareyes.substack.com/?utm_source=nyc_event_aug20";
const WHATSAPP_URL =
  "https://chat.whatsapp.com/DT6jHoR2NJf2lt9Z2YcKZx?mode=gi_t";
const LUMA_URL = "https://luma.com/tastemakers-nyc";
const AJ_IG_URL = "https://instagram.com/thevibefounder";
const MIKA_IG_URL = "https://instagram.com/its.mikareyes";

const brandPrompt =
  "Import my attached brand guidelines into Paper as a theme.";

const titleSlidePrompt = `Using the Paper MCP, generate an Instagram carousel slide that has the following text.

Header: How to Create Instagram Carousels with Paper and Claude
Subheader: From a rough idea to finished slides, in minutes
Pill with my Instagram handle: @its.mikareyes`;

const photoPrompt =
  "Use the photo highlighted and add it to the background of the screen that I selected. Move around the text so that the face of the person in the photo is not covered.";

const iteratePrompt =
  "For the selected page/carousel on Paper, can you give me three different iterations of that page? I want you to still use the photo and the text, but you can change the design and the layout. I want to see different versions to see what I like in terms of style. Still use my brand guidelines.";

const secondaryButtonStyle: CSSProperties = {
  background: "var(--mr-paper)",
  color: "var(--mr-ink)",
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-sm)",
  fontWeight: "var(--mr-weight-semi)",
  padding: "13px 24px",
  borderRadius: "var(--mr-radius-pill)",
  border: "1.5px solid var(--mr-line)",
};

function StepLabel({ n, name }: { n?: string; name: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span
        className="h-3.5 w-0.5 shrink-0 rounded-full bg-[var(--mr-watermelon)]"
        aria-hidden
      />
      <span
        className="text-[length:var(--mr-text-eyebrow)] font-bold uppercase tracking-[0.14em] text-[var(--mr-watermelon)]"
        style={{ fontFamily: "var(--mr-font-body)" }}
      >
        {n ? `${n} · ${name}` : name}
      </span>
    </div>
  );
}

function Step({
  n,
  name,
  headline,
  body,
  children,
}: {
  n?: string;
  name: string;
  headline: ReactNode;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-10 border-t border-[var(--mr-line)] py-16 md:grid-cols-[minmax(0,38%)_minmax(0,1fr)] md:gap-16 lg:gap-20">
      <div>
        <StepLabel n={n} name={name} />
        <h2
          className="text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.05] tracking-[-0.02em] text-[var(--mr-ink)]"
          style={{ fontFamily: "var(--mr-font-display)" }}
        >
          {headline}
        </h2>
        <p
          className="mt-4 max-w-sm text-[length:var(--mr-text-body)] leading-relaxed text-[var(--mr-charcoal)]"
          style={{ fontFamily: "var(--mr-font-body)" }}
        >
          {body}
        </p>
      </div>
      <div>{children}</div>
    </section>
  );
}

function LinkCard({
  label,
  title: cardTitle,
  body,
  href,
  cta,
  photo,
}: {
  label: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  photo?: { src: string; alt: string };
}) {
  return (
    <div
      className="flex h-full flex-col border border-[var(--mr-line)] bg-white p-6"
      style={{
        borderRadius: "var(--mr-radius-card)",
        boxShadow: "var(--mr-shadow-card)",
      }}
    >
      <p
        className="text-[length:var(--mr-text-eyebrow)] font-bold uppercase tracking-[0.14em] text-[var(--mr-watermelon)]"
        style={{ fontFamily: "var(--mr-font-body)" }}
      >
        {label}
      </p>
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          width={80}
          height={80}
          className="mt-4 size-20 rounded-full object-cover"
        />
      ) : null}
      <h3
        className="mt-3 text-[length:var(--mr-text-h3)] font-bold leading-tight tracking-[-0.01em] text-[var(--mr-ink)]"
        style={{ fontFamily: "var(--mr-font-display)" }}
      >
        {cardTitle}
      </h3>
      <p
        className="mt-3 mb-6 flex-1 text-[length:var(--mr-text-sm)] leading-relaxed text-[var(--mr-charcoal)]"
        style={{ fontFamily: "var(--mr-font-body)" }}
      >
        {body}
      </p>
      <Ga4TrackedAnchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-pressable mt-auto inline-flex items-center justify-center no-underline"
        style={secondaryButtonStyle}
        ga4EventName="outbound_click"
        ga4Params={{
          cta_label: cta,
          cta_location: "claude_workshop_aug20",
          destination_url: href,
          link_type: "workshop_resource",
        }}
      >
        {cta} →
      </Ga4TrackedAnchor>
    </div>
  );
}

export default function ClaudeWorkshopAug20Page() {
  return (
    <div
      className="min-h-dvh"
      style={{
        background: "var(--mr-paper)",
        color: "var(--mr-ink)",
        fontFamily: "var(--mr-font-body)",
      }}
    >
      <main className="mx-auto w-full max-w-[1120px] px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
        <header className="pb-12 md:pb-16">
          <h1
            className="text-[clamp(40px,6vw,72px)] font-bold leading-[0.95] tracking-[-0.03em] text-[var(--mr-ink)]"
            style={{ fontFamily: "var(--mr-font-display)" }}
          >
            Claude Content Workshop
          </h1>
          <p
            className="mt-5 text-[clamp(18px,2.2vw,24px)] leading-snug text-[var(--mr-charcoal)]"
            style={{ fontFamily: "var(--mr-font-body)" }}
          >
            August 20
          </p>
        </header>

        <h2
          className="pb-8 text-[clamp(40px,5.5vw,64px)] font-bold leading-[0.95] tracking-[-0.03em] text-[var(--mr-ink)] md:pb-10"
          style={{ fontFamily: "var(--mr-font-display)" }}
        >
          Paper Demo
        </h2>

        <Step
          n="1"
          name="Download"
          headline="Download Paper and connect the MCP"
          body="Two things before we start designing. Install the app, then hook it up to Claude."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <LinkCard
              label="Required"
              title="Paper Desktop"
              body="Download the app. Opening a file starts the MCP server in the background."
              href={PAPER_DOWNLOAD}
              cta="Download Paper"
            />
            <LinkCard
              label="Required"
              title="Paper MCP"
              body="Connect Paper to Claude so it can read and write your designs."
              href={PAPER_MCP}
              cta="Connect the MCP"
            />
          </div>
        </Step>

        <Step
          n="2"
          name="Brand"
          headline={
            <>
              <span className="block text-[0.62em] font-semibold tracking-[-0.01em] text-[var(--mr-muted)] line-through decoration-[1.5px]">
                Put your brand guidelines into Paper
              </span>
              Choose a theme color
            </>
          }
          body="Attach your brand file in Claude, then paste this prompt so Paper can turn it into a theme."
        >
          <CopyPrompt text={brandPrompt} copyable={false} struck />
        </Step>

        <Step
          n="3"
          name="Title slide"
          headline="Generate a title slide"
          body="We'll start with the cover. Paste this into Claude with Paper connected."
        >
          <CopyPrompt text={titleSlidePrompt} />
        </Step>

        <Step
          n="4"
          name="Photo"
          headline="Find a photo and set it as the background"
          body="Highlight the photo and your title slide, then paste this prompt."
        >
          <CopyPrompt text={photoPrompt} />
        </Step>

        <Step
          n="5"
          name="Iterate"
          headline="Three different iterations"
          body="Keep the photo and the text. Change the design so you can pick a style."
        >
          <CopyPrompt text={iteratePrompt} />
        </Step>

        <h2
          className="pt-8 pb-8 text-[clamp(40px,5.5vw,64px)] font-bold leading-[0.95] tracking-[-0.03em] text-[var(--mr-ink)] md:pt-10 md:pb-10"
          style={{ fontFamily: "var(--mr-font-display)" }}
        >
          More resources
        </h2>

        <Step
          name="Resources"
          headline="More AI & content resources?"
          body="Follow my Substack. Next post is about all my content creation skills, systems, and how I got started to 20k followers."
        >
          <div
            className="border border-[var(--mr-line)] bg-white p-6"
            style={{
              borderRadius: "var(--mr-radius-card)",
              boxShadow: "var(--mr-shadow-card)",
            }}
          >
            <p
              className="text-[length:var(--mr-text-eyebrow)] font-bold uppercase tracking-[0.14em] text-[var(--mr-watermelon)]"
              style={{ fontFamily: "var(--mr-font-body)" }}
            >
              Substack
            </p>
            <h3
              className="mt-3 text-[length:var(--mr-text-h3)] font-bold leading-tight tracking-[-0.01em] text-[var(--mr-ink)]"
              style={{ fontFamily: "var(--mr-font-display)" }}
            >
              mikareyes.substack.com
            </h3>
            <Ga4TrackedAnchor
              href={SUBSTACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-pressable mt-6 inline-flex items-center justify-center no-underline"
              style={secondaryButtonStyle}
              ga4EventName="outbound_click"
              ga4Params={{
                cta_label: "Follow on Substack",
                cta_location: "claude_workshop_aug20",
                destination_url: SUBSTACK_URL,
                link_type: "workshop_resource",
              }}
            >
              Follow on Substack →
            </Ga4TrackedAnchor>
          </div>
        </Step>

        <Step
          name="Stay connected"
          headline="Keep in touch"
          body="Join the New York group. Follow Aj and Mika for more simple AI lessons and events."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <LinkCard
              label="New York"
              title="WhatsApp group"
              body="Meet people from tonight and hear about the next New York event."
              href={WHATSAPP_URL}
              cta="Join the WhatsApp group"
            />
            <LinkCard
              label="Events"
              title="Subscribe for events"
              body="Get invited to the next Tastemakers NYC gathering."
              href={LUMA_URL}
              cta="Subscribe for events"
            />
            <LinkCard
              label="Host"
              title="Aj Yadav"
              body="Simple AI lessons and new builds."
              href={AJ_IG_URL}
              cta="Follow @thevibefounder"
              photo={{
                src: "/claude-workshop-aug20/aj-yadav.png",
                alt: "Aj Yadav",
              }}
            />
            <LinkCard
              label="Host"
              title="Mika Reyes"
              body="AI tutorials and events in New York."
              href={MIKA_IG_URL}
              cta="Follow @its.mikareyes"
              photo={{
                src: "/claude-workshop-aug20/mika-reyes.png",
                alt: "Mika Reyes",
              }}
            />
          </div>
        </Step>
      </main>
    </div>
  );
}
