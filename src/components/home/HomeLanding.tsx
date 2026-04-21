import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomeCtaGrid } from "@/components/home/HomeCtaGrid";
import { homeBioLinks } from "@/lib/home-bio-links";
import { siteLink, textBody } from "@/lib/ui/site-styles";

function BioLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={siteLink}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={siteLink}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function HomeLanding() {
  const p = homeBioLinks.press;
  const a = homeBioLinks.awards;

  return (
    <main className="mx-auto max-w-3xl px-6 py-14 md:px-10 md:py-20">
      <header className="text-center">
        <div className="mb-4 flex justify-center">
          <Image
            src="/mika-reyes-logo.png"
            alt="Mika Reyes logo: circular black and white m monogram"
            width={64}
            height={64}
            className="h-16 w-16"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          Mika Reyes
        </h1>
      </header>

      <div className={`mt-8 space-y-5 ${textBody}`}>
        <p>
          <strong className="font-semibold text-zinc-950">Now:</strong>{" "}
          Building AI products at{" "}
          <BioLink href={homeBioLinks.kingsCrossLabs}>
            King&apos;s Cross Labs
          </BioLink>
          . Creating on <BioLink href={homeBioLinks.tiktok}>TikTok</BioLink>{" "}
          &amp;{" "}
          <BioLink href={homeBioLinks.instagram}>Instagram</BioLink> helping
          people uplevel with AI. Also doing{" "}
          <BioLink href={homeBioLinks.lelandCoach}>
            1:1 coaching on careers &amp; AI
          </BioLink>
          .
        </p>
        <p>
          <strong className="font-semibold text-zinc-950">Prior:</strong>{" "}
          Co-founder &amp; CEO of{" "}
          <BioLink href={homeBioLinks.parallax}>Parallax</BioLink>, a
          venture-backed stablecoin payments startup. Raised ~$5M, scaled the
          company to +$X00M in {'<'}1y in volume, before a successful exit.
          Also: product lead @{" "}
          <BioLink href={homeBioLinks.linkedin}>LinkedIn</BioLink>,{" "}
          <BioLink href={homeBioLinks.kumu}>Kumu.ph</BioLink>,{" "}
          <BioLink href={homeBioLinks.medgrocer}>MedGrocer</BioLink>,{" "}
          <BioLink href={homeBioLinks.ripcord}>Ripcord</BioLink>.
        </p>
        <p>
          <strong className="font-semibold text-zinc-950">Featured on:</strong>{" "}
          <BioLink href={p.techcrunch}>TechCrunch</BioLink>,{" "}
          <BioLink href={p.yahoo}>Yahoo!</BioLink>,{" "}
          <BioLink href={p.techInAsia}>Tech in Asia</BioLink>,{" "}
          <BioLink href={p.inquirer}>Inquirer</BioLink>,{" "}
          <BioLink href={p.forbes}>Forbes</BioLink>
        </p>
        <p>
          <strong className="font-semibold text-zinc-950">
            Awards &amp; Fellowships:
          </strong>{" "}
          <BioLink href={a.forbes30}>Forbes 30 Under 30</BioLink>,{" "}
          <BioLink href={a.tatler}>Tatler Gen.T Leader of Tomorrow</BioLink>,{" "}
          <BioLink href={a.kleinerPerkins}>Kleiner Perkins Fellow</BioLink>,{" "}
          <BioLink href={a.spc}>SPC Founder Fellow</BioLink>.
        </p>
      </div>

      <HomeCtaGrid />
    </main>
  );
}
