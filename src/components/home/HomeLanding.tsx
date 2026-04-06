import type { ReactNode } from "react";
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
      <h1 className="text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
        Mika Reyes
      </h1>

      <div className={`mt-8 space-y-5 ${textBody}`}>
        <p>
          As co-founder &amp; CEO of{" "}
          <BioLink href={homeBioLinks.parallax}>Parallax</BioLink>, a
          venture-backed stablecoin payments startup, I raised ~$5M, scaled the
          company to +$X00M in &lt;1y in volume, before a successful exit.
        </p>
        <p>
          <strong className="font-semibold text-zinc-950">Nowadays:</strong>{" "}
          creating on <BioLink href={homeBioLinks.tiktok}>Tiktok</BioLink>{" "}
          &amp; <BioLink href={homeBioLinks.instagram}>Instagram</BioLink>{" "}
          helping people build wealth, freedom &amp; time-rich lives.
        </p>
        <p>
          <strong className="font-semibold text-zinc-950">Soon:</strong> a new
          startup! 🙂 Stay tuned.
        </p>
        <p>
          <strong className="font-semibold text-zinc-950">Prior:</strong>{" "}
          product lead @ <BioLink href={homeBioLinks.linkedin}>LinkedIn</BioLink>
          , <BioLink href={homeBioLinks.kumu}>Kumu.ph</BioLink>,{" "}
          <BioLink href={homeBioLinks.medgrocer}>MedGrocer</BioLink>,{" "}
          <BioLink href={homeBioLinks.ripcord}>Ripcord</BioLink>
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
