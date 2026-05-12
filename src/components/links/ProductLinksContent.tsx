"use client";

import type { ReactNode } from "react";
import posthog from "posthog-js";

import { siteLink } from "@/lib/ui/site-styles";

/**
 * Referral / affiliate URLs. Granola + Wispr Flow match mikareyes.com AI guides;
 * others from the Notion Links page:
 * https://www.notion.so/smikatoots/Product-Links-6a8f47cf73da4fd1b0245355198ce13a
 */
const U = {
  capitalVentureX: "https://capital.one/3nffNQa",
  chaseFreedomUnlimited: "https://www.referyourchasecard.com/18/X49W5WBKFC",
  m1Finance: "https://m1.finance/jvVekGKC2na-",
  monarchMoney: "https://www.monarchmoney.com/referral/pulm2hd82n",
  facetWealth: "https://facetwealth.referralrock.com/l/1MIKAELAREY71/",
  etrade: "https://refer.etrade.net/ncruz",
  coinbase: "https://www.coinbase.com/join/reyes_73f",
  cadence: "https://share.keepyourcadence.com/mikaela72",
  remento: "https://to.remento.co/dfb2a7f429551f8723b01210b3a17c78",
  notion: "https://notion.so/",
  superSo: "https://app.super.so/signup?ref=coyiuh",
  /** Notion stores http (not https) for this link. */
  substack: "http://mikareyes.substack.com/",
  linkedHelper: "https://www.linkedhelper.com/",
  phantombuster: "https://phantombuster.com/",
  deel: "https://get.deel.com/mbs491remo80",
  ramp: "https://ramp.com/?rc=32UCQH&referral_location=login",
  gusto: "https://gusto.com/r/mika07e8",
  /**
   * In Notion, "Glimpse" points at an in-page block anchor. Same public page + block id.
   */
  glimpse:
    "https://www.notion.so/smikatoots/Product-Links-6a8f47cf73da4fd1b0245355198ce13a#459b66c7fdc84647874ce49582bf6c9d",
  mercury: "https://mercury.com/r/parallax-labs",
  cometeer: "https://cometeer.com/get-started?code=T7shdZ",
  seated: "https://seated.app.link/wWbtCgatjhb",
  /** Label in Notion is "Studio"; href is Monthly (per Notion). */
  studio: "https://monthly.com/stevie-mackey-singing?friend=mika-reyes",
  cora: "https://cora.computer/?ref=wEZMc0H1",
  glowbar: "https://blvd.app/@glowbar/refer/MIKAELA-717659",
  granola: "https://join.granola.ai/t/vhhbzajvu7",
  wisprFlow: "https://wisprflow.ai/r?MIKAELA1",
} as const;

/** Product / brand name (bold + underlined). */
function PLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={`font-semibold ${siteLink}`}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() =>
        posthog.capture("referral_link_clicked", {
          href,
          label: typeof children === "string" ? children : undefined,
          link_type: "product",
        })
      }
    >
      {children}
    </a>
  );
}

/** Secondary link in body copy (e.g. "my link", "referral link"). */
function ILink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={siteLink}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() =>
        posthog.capture("referral_link_clicked", {
          href,
          label: typeof children === "string" ? children : undefined,
          link_type: "inline",
        })
      }
    >
      {children}
    </a>
  );
}

function LinkCard({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-lg border border-zinc-200 bg-zinc-50/80 px-4 py-3.5">
      <span className="shrink-0 text-lg leading-6" aria-hidden>
        {icon}
      </span>
      <div className="min-w-0 flex-1 text-[0.95rem] leading-relaxed text-zinc-800">
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-zinc-200 pt-10 first:border-t-0 first:pt-0">
      <div className="grid gap-6 md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] md:items-start md:gap-10 lg:gap-14">
        <h2 className="text-base font-bold tracking-tight text-zinc-950 md:pt-0.5">
          {title}
        </h2>
        <div className="space-y-3">{children}</div>
      </div>
    </section>
  );
}

export function ProductLinksContent() {
  return (
    <article className="space-y-10">
      <Section title="AI">
        <LinkCard icon="🤖">
          <PLink href={U.granola}>Granola</PLink>
          {" — "}
          AI meeting notes with no bot on the call. Two free months of Granola
          Business when you sign up with my{" "}
          <ILink href={U.granola}>referral link</ILink>.
        </LinkCard>
        <LinkCard icon="🤖">
          <PLink href={U.wisprFlow}>Wispr Flow</PLink>
          {" — "}
          voice dictation into any text field. One free month of Pro with my{" "}
          <ILink href={U.wisprFlow}>referral link</ILink>.
        </LinkCard>
        <LinkCard icon="🤖">
          <PLink href={U.cora}>Cora</PLink>
          {" — "}email productivity! Honestly, love it so much
        </LinkCard>
      </Section>

      <Section title="Finance Stack">
        <LinkCard icon="💳">
          <PLink href={U.capitalVentureX}>Capital Venture X</PLink>
          {" — "}
          I use this now over Chase Sapphire Reserve because the annual fee is
          cheaper BUT with the same benefits! Use my{" "}
          <ILink href={U.capitalVentureX}>referral link</ILink> pls!
        </LinkCard>
        <LinkCard icon="💳">
          <PLink href={U.chaseFreedomUnlimited}>Chase Freedom Unlimited</PLink>
          {" — "}
          free, great cashbacks that you can pair with Chase Sapphire cards; get
          a bonus if you use my{" "}
          <ILink href={U.chaseFreedomUnlimited}>referral link</ILink>!
        </LinkCard>
        <LinkCard icon="💳">
          <PLink href={U.m1Finance}>M1 Finance</PLink>
          {" — "}Roboadvisor
        </LinkCard>
        <LinkCard icon="💳">
          <PLink href={U.monarchMoney}>Monarch Money</PLink>
          {" — "}budgeting app (I&apos;ve replaced my spreadsheets!)
        </LinkCard>
        <LinkCard icon="💳">
          <PLink href={U.facetWealth}>FacetWealth</PLink>
          {" — "}
          financial planning services that are fiduciary guaranteed (meaning they
          are legally obligated to support your best financial interests, not the
          companies&apos;)
        </LinkCard>
        <LinkCard icon="💳">
          <PLink href={U.etrade}>Etrade</PLink>
          {" — "}best UI for investments and trades
        </LinkCard>
        <LinkCard icon="💳">
          <PLink href={U.coinbase}>Coinbase</PLink>
          {" — "}get $10 of free Bitcoin!
        </LinkCard>
      </Section>

      <Section title="Physical Products">
        <LinkCard icon="🛍️">
          <PLink href={U.cadence}>Cadence</PLink>
          {" — "}best travel buddy ever. Get $15 off your first order with my{" "}
          <ILink href={U.cadence}>link</ILink>!
        </LinkCard>
        <LinkCard icon="🛍️">
          <PLink href={U.remento}>Remento</PLink>
          {" — "}
          I&apos;m using this to send weekly prompts to my parents &amp; have
          their stories AI-crafted and compiled into a beautiful book. Get $15 off
          your purchase with <ILink href={U.remento}>my link</ILink>!
        </LinkCard>
      </Section>

      <Section title="Work Stack">
        <LinkCard icon="💼">
          <PLink href={U.notion}>Notion</PLink>
          {" — "}where I built this website, and where my second brain lives
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.superSo}>Super.so</PLink>
          {" — "}
          the platform that transforms this Notion page into a website
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.substack}>Substack</PLink>
          {" — "}the home of my newsletter
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.linkedHelper}>LinkedHelper</PLink>
          {" — "}outbound LinkedIn automation tool
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.phantombuster}>Phantombuster</PLink>
          {" — "}
          outbound automation for various social media and other sites
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.deel}>Deel</PLink>
          {" — "}
          hire international contractors compliantly. my affiliate link so you
          can also earn some perks!
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.ramp}>Ramp</PLink>
          {" — "}
          expense management system for your business or startup. Get $500 from
          our referral code
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.gusto}>Gusto</PLink>
          {" — "}super simple HR management platform
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.glimpse}>Glimpse</PLink>
          {" — "}
          know what&apos;s trendy before it&apos;s trendy. Packed with clear
          insights about future trends from Google &amp; Amazon searches &amp;
          more.
        </LinkCard>
        <LinkCard icon="💼">
          <PLink href={U.mercury}>Mercury</PLink>
          {" — "}best biz bank account ever
        </LinkCard>
      </Section>

      <Section title="Food & Drinks">
        <LinkCard icon="🍎">
          <PLink href={U.cometeer}>Cometeer</PLink>
          {" — "}
          THE 👏 BEST 👏 COFFEE 👏 EVER 👏 — you won&apos;t regret it. Get $25 off
          your first 32 cups (A STEAL?!) with my <ILink href={U.cometeer}>link</ILink>!
        </LinkCard>
        <LinkCard icon="🍎">
          <PLink href={U.seated}>Seated</PLink>
          {" — "}
          get free $$$ when you book a reservation through the app! Use this{" "}
          <ILink href={U.seated}>link</ILink> to get $15 bonus on your first
          meal
        </LinkCard>
      </Section>

      <Section title="Learning">
        <LinkCard icon="📔">
          <PLink href={U.studio}>Studio</PLink>
          {" — "}
          learn a new creative thing, with a peer group, and an expert, all in
          one month
        </LinkCard>
      </Section>

      <Section title="Services">
        <LinkCard icon="🍄">
          <PLink href={U.glowbar}>Glowbar</PLink>
          {" — "}fast facials in the U.S.
        </LinkCard>
      </Section>
    </article>
  );
}
