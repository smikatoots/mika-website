import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { DemographicPieChart } from "@/components/media-kit/DemographicPieChart";
import { homeBioLinks } from "@/lib/home-bio-links";
import { siteLink } from "@/lib/ui/site-styles";

const CONTACT_EMAIL = "partner@mikareyes.com";
const INSTAGRAM_HANDLE = "@its.mikareyes";
const STATS_AS_OF = "May 21, 2026";
const PROFILE_IMAGE = "/media-kit/mika-reyes.png";

const textEmphasis = "font-semibold text-zinc-950";

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className ?? siteLink}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </p>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={
        className ??
        "mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl md:text-4xl"
      }
    >
      {children}
    </h2>
  );
}

function MetricCard({
  label,
  hint,
  value,
}: {
  label: string;
  hint?: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <p className="text-2xl font-semibold tracking-tight text-accent sm:text-3xl md:text-4xl">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-zinc-950">{label}</p>
      {hint ? <p className="mt-1 text-sm text-zinc-500">{hint}</p> : null}
    </div>
  );
}

function FitCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm font-medium text-zinc-200">
      {children}
    </div>
  );
}

function DeliverableCard({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-700 bg-zinc-900/50 p-5">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  );
}

function CredentialBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex max-w-full rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-800 sm:px-4 sm:text-sm">
      {children}
    </span>
  );
}

const headerLinkClass =
  "font-medium text-white underline decoration-white/40 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/60";

export function MediaKitPageContent() {
  return (
    <div className="pb-20">
      <header className="border-b border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between md:py-12">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Mika Reyes
            </h1>
            <p className="mt-4 text-[10px] font-semibold uppercase leading-relaxed tracking-[0.15em] text-accent sm:text-xs sm:tracking-[0.2em]">
              AI Education for Founders, Operators &amp; Professionals 25–54
            </p>
            <p className="mt-4 text-base leading-relaxed text-zinc-200">
              I teach non-technical founders, business owners, and career
              professionals how to use AI to get ahead in their careers, get
              time back, and stay relevant in the AI age.
            </p>
          </div>
          <div className="min-w-0 shrink-0 text-sm text-zinc-300 md:text-right">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center md:justify-end">
              <ExternalLink href={homeBioLinks.instagram} className={headerLinkClass}>
                Instagram {INSTAGRAM_HANDLE}
              </ExternalLink>
              <span className="hidden text-zinc-600 sm:inline" aria-hidden>
                ·
              </span>
              <a href={`mailto:${CONTACT_EMAIL}`} className={headerLinkClass}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              Last updated {STATS_AS_OF}. All metrics reflect the past 30 days.
            </p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,260px)_1fr] md:items-start md:gap-14">
          <div className="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm md:mx-0 md:max-w-none">
            <div className="aspect-[3/4] w-full overflow-hidden">
              <Image
                src={PROFILE_IMAGE}
                alt="Mika Reyes"
                width={747}
                height={1024}
                className="h-full w-full object-cover object-center"
                priority
                sizes="(max-width: 768px) 100vw, 260px"
              />
            </div>
          </div>
          <div>
            <SectionEyebrow>The Opportunity</SectionEyebrow>
            <SectionTitle>The AI audience brands keep missing</SectionTitle>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700 sm:text-[1.05rem]">
              <p>
                Almost every AI creator on Instagram is a man talking to other
                men about code. That&apos;s not who actually buys AI tools,
                productivity software, and online education at scale. It&apos;s
                not my audience either.{" "}
                <strong className="font-medium text-zinc-950">
                  71% of my followers are women, 81% are between 25 and 54
                </strong>
                , and most of them are operators, founders, and professionals
                who are paying customers of the products you sell. It&apos;s one
                of the highest-intent, hardest-to-reach segments in the AI
                niche, and most brands aren&apos;t reaching it.
              </p>
              <p>
                They also don&apos;t just scroll.{" "}
                <strong className="font-medium text-zinc-950">
                  94.7% of my reach is non-followers
                </strong>
                , so content keeps spreading past my own audience. Engagement
                runs about{" "}
                <strong className="font-medium text-zinc-950">
                  7x the IG industry average
                </strong>
                . When I recommend an actually relevant &amp; useful tool, people
                want to use it.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3">
          <MetricCard
            value="10.3%"
            label="Engagement Rate"
            hint="~7x IG industry avg"
          />
          <MetricCard
            value="461K+"
            label="Monthly Views"
            hint="Instagram, last 30 days"
          />
          <MetricCard
            value="94.7%"
            label="Non-Follower Reach"
            hint="Content spreads organically"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
        <SectionEyebrow>Platform Stats</SectionEyebrow>
        <p className="mt-4 w-full text-base leading-relaxed text-zinc-700 sm:text-[1.05rem]">
          Backed by a decade in tech: ex-LinkedIn product, ex-CEO of Parallax
          ($100M+ in stablecoin transaction volume, acquired by Phantom, $3B),
          Forbes 30 Under 30.
        </p>

        <div className="mt-8 grid w-full gap-6 lg:grid-cols-3 lg:items-stretch">
          <div className="flex flex-col gap-4 lg:col-span-1">
            <MetricCard value="461K+" label="Views / Month" />
            <MetricCard value="9,414" label="Total Followers" />
            <MetricCard value="10.3%" label="Engagement Rate" />
          </div>

          <div className="flex min-w-0 flex-col rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 sm:p-6 md:p-8 lg:col-span-2">
            <h3 className="text-base font-semibold text-zinc-950 sm:text-lg">
              Instagram ({INSTAGRAM_HANDLE})
            </h3>
            <div className="mt-2 -mx-1 flex-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:px-0">
              <table className="mt-4 w-full min-w-[260px] text-left text-xs sm:min-w-[280px] sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500">
                  <th className="pb-3 pr-4 font-medium">Metric</th>
                  <th className="pb-3 font-medium">Last 30 Days</th>
                </tr>
              </thead>
              <tbody className="text-zinc-800">
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Followers</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    9,414
                  </td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Views</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    461,427
                  </td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Accounts Reached</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    278,889
                  </td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Non-Follower Reach</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    94.7%
                  </td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Interactions</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    26,579+
                  </td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Engagement Rate</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    10.3%
                  </td>
                </tr>
                <tr className="border-b border-zinc-100">
                  <td className="py-3 pr-4 text-zinc-600">Story Views</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    2,610
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-zinc-600">New Followers (30d)</td>
                  <td className="py-3 font-medium tabular-nums text-zinc-950">
                    +5,000+
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50/60">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:py-16">
          <SectionEyebrow>Audience Demographics</SectionEyebrow>

          <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2">
            <DemographicPieChart
              title="Gender"
              slices={[
                { label: "Women", percent: 71.1 },
                { label: "Men", percent: 28.9 },
              ]}
              note={
                <>
                  My audience is{" "}
                  <strong className={textEmphasis}>
                    majority &amp; uniquely women
                  </strong>
                  . Both genders who follow are{" "}
                  <strong className={textEmphasis}>
                    motivated professionals
                  </strong>{" "}
                  actively looking for{" "}
                  <strong className={textEmphasis}>
                    AI tools, education &amp; workflows
                  </strong>
                  .
                </>
              }
            />
            <DemographicPieChart
              title="Age"
              slices={[
                { label: "25–34", percent: 44.9 },
                { label: "35–44", percent: 25.3 },
                { label: "45–54", percent: 11.3 },
                { label: "18–24", percent: 9.1 },
              ]}
              note={
                <>
                  <strong className={textEmphasis}>81.5%</strong> of my audience
                  is <strong className={textEmphasis}>25 to 54</strong>.{" "}
                  <strong className={textEmphasis}>
                    Peak career and earning years
                  </strong>
                  , and the demographic most willing to pay for{" "}
                  <strong className={textEmphasis}>
                    tools that save time and create leverage
                  </strong>
                  .
                </>
              }
            />
            <DemographicPieChart
              title="Top Countries"
              slices={[
                { label: "United States", percent: 67.2 },
                { label: "Canada", percent: 6 },
                { label: "India", percent: 3.8 },
                { label: "Singapore", percent: 3.3 },
              ]}
              note={
                <>
                  <strong className={textEmphasis}>Two-thirds US-based</strong>,
                  which is the market most{" "}
                  <strong className={textEmphasis}>
                    US-based SaaS, AI, and education brands
                  </strong>{" "}
                  are actually trying to reach.
                </>
              }
            />
            <DemographicPieChart
              title="Top Cities"
              slices={[
                { label: "New York", percent: 6.8 },
                { label: "Singapore", percent: 3.3 },
                { label: "San Francisco", percent: 2.1 },
                { label: "Los Angeles", percent: 2 },
              ]}
              note={
                <>
                  Concentrated in{" "}
                  <strong className={textEmphasis}>
                    major US tech and finance hubs
                  </strong>
                  , where{" "}
                  <strong className={textEmphasis}>
                    decision-makers and early adopters
                  </strong>{" "}
                  live.
                </>
              }
            />
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16">
          <SectionEyebrow>About</SectionEyebrow>
          <div className="mt-6 grid w-full grid-cols-1 gap-6 text-base leading-relaxed text-zinc-700 sm:gap-8 sm:text-[1.05rem] lg:grid-cols-2 lg:gap-10">
            <p>
              I spent{" "}
              <strong className={textEmphasis}>a decade in tech</strong> before
              becoming a creator.{" "}
              <strong className={textEmphasis}>Product lead at</strong>{" "}
              <ExternalLink href={homeBioLinks.linkedin}>LinkedIn</ExternalLink>
              , where I launched the{" "}
              <strong className={textEmphasis}>
                &quot;I&apos;m Hiring&quot; ring
              </strong>
              . Then{" "}
              <strong className={textEmphasis}>
                co-founder and CEO of{" "}
              </strong>
              <ExternalLink href={homeBioLinks.parallax}>Parallax</ExternalLink>
              , one of the earliest global stablecoin payments products. We raised{" "}
              <strong className={textEmphasis}>about $5M</strong> from{" "}
              <strong className={textEmphasis}>
                Dragonfly and General Catalyst
              </strong>
              , scaled to{" "}
              <strong className={textEmphasis}>$100M+</strong> in transaction
              volume in{" "}
              <strong className={textEmphasis}>under a year</strong>, and were
              acquired by{" "}
              <strong className={textEmphasis}>Phantom, a $3B crypto wallet</strong>
              .
            </p>
            <p>
              After the exit, I rebuilt around a different question: what&apos;s
              the point of building if you don&apos;t have time for the life
              you&apos;re building it for? I now use{" "}
              <strong className={textEmphasis}>AI every day</strong> to run a
              company, create content, and stay{" "}
              <strong className={textEmphasis}>time-rich</strong>. My content
              shows the{" "}
              <strong className={textEmphasis}>actual workflows</strong>.
            </p>
          </div>
          <div className="mt-8 flex w-full flex-wrap gap-3">
            <CredentialBadge>Ex-LinkedIn</CredentialBadge>
            <CredentialBadge>Ex-Parallax (Founder/CEO, acquired)</CredentialBadge>
            <CredentialBadge>Forbes 30 Under 30</CredentialBadge>
            <CredentialBadge>Tatler Gen.T</CredentialBadge>
            <CredentialBadge>Phi Beta Kappa</CredentialBadge>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:px-8 md:py-16">
          <SectionEyebrow>Partnerships</SectionEyebrow>
          <p className="mt-4 w-full max-w-none text-base leading-relaxed text-zinc-300 sm:text-[1.05rem]">
            <strong className="font-semibold text-white">
              You work directly with me.
            </strong>{" "}
            No agency, no manager in between. I&apos;m hands-on, fast to work
            with, and I only post about products I&apos;d genuinely use myself.{" "}
            <strong className="font-semibold text-white">
              That filter is what makes a partnership here actually convert.
            </strong>
          </p>

          <h3 className="mt-12 w-full text-xl font-semibold text-white">
            Best fit for
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <FitCard>AI tools and platforms</FitCard>
            <FitCard>Productivity and workflow software</FitCard>
            <FitCard>SaaS and B2B tech</FitCard>
            <FitCard>Online education and courses</FitCard>
            <FitCard>Business and founder tools</FitCard>
            <FitCard>
              Professional development and upskilling
            </FitCard>
          </div>

          <h3 className="mt-12 w-full text-xl font-semibold text-white">
            Package types
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DeliverableCard
              title="Dedicated Reel"
              description="Full Reel featuring your product."
            />
            <DeliverableCard
              title="Integrated Mention"
              description="Organic placement inside an educational Reel."
            />
            <DeliverableCard
              title="IG Carousel"
              description="Multi-slide deep dive."
            />
            <DeliverableCard
              title="Multi-Post Series"
              description="Bundled Reels and Carousels."
            />
            <DeliverableCard
              title="Speaking / Workshops"
              description={
                <>
                  Including my technical co-founder via{" "}
                  <ExternalLink
                    href={homeBioLinks.kingsCrossLabs}
                    className="text-zinc-300 underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/60"
                  >
                    kingscrosslabs.com
                  </ExternalLink>
                  .
                </>
              }
            />
          </div>

          <p className="mt-10 text-center text-lg font-medium text-white">
            Rates available upon request.
          </p>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Bundles convert best. Multi-post series drive significantly more
            results for the brand than one-offs because my audience needs to see
            a tool used in a few different contexts before they buy.
          </p>
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center sm:px-6 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Mika Reyes
          </p>
          <h2 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
            Let&apos;s work together
          </h2>
          <p className="mt-6 flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-2 sm:gap-y-1 md:text-base">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-zinc-300 underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/60"
            >
              {CONTACT_EMAIL}
            </a>
            <span className="hidden text-zinc-600 sm:inline" aria-hidden>
              ·
            </span>
            <ExternalLink
              href={homeBioLinks.instagram}
              className="font-medium text-zinc-300 underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/60"
            >
              {INSTAGRAM_HANDLE}
            </ExternalLink>
            <span className="hidden text-zinc-600 sm:inline" aria-hidden>
              ·
            </span>
            <Link
              href="https://mikareyes.com"
              className="font-medium text-zinc-300 underline decoration-zinc-500 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent/60"
            >
              mikareyes.com
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
