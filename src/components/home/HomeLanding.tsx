import type { ReactNode } from "react";
import Link from "next/link";

import { HomeCtaGrid } from "@/components/home/HomeCtaGrid";
import { homeBioLinks } from "@/lib/home-bio-links";

const navLinkClass =
  "block py-1.5 text-zinc-900 underline decoration-zinc-400 underline-offset-[5px] transition-colors hover:decoration-zinc-900";

const extLinkClass =
  "text-zinc-900 underline decoration-zinc-400 underline-offset-[3px] transition-colors hover:decoration-zinc-900";

const navItems = [
  { href: "/about", label: "About", icon: "👤" },
  { href: "/blog", label: "Blog", icon: "✏️" },
  { href: "/links", label: "Product links", icon: "🔗" },
  { href: "/more", label: "Projects", icon: "💼" },
  { href: "/press", label: "Press", icon: "📰" },
  { href: "/guestbook", label: "Guestbook", icon: "✒️" },
  { href: "/my-dreams", label: "Dreams", icon: "💭" },
] as const;

function BioLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={extLinkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={extLinkClass}
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
    <main className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-20">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
        Mika Reyes
      </h1>

      <div className="mt-8 grid items-start gap-12 md:mt-10 md:grid-cols-2 md:gap-x-20 lg:gap-x-28">
        <nav aria-label="Site sections" className="min-w-0 space-y-0.5">
          {navItems.map(({ href, label, icon }) => (
            <Link key={href} href={href} className={navLinkClass}>
              <span className="mr-2 select-none" aria-hidden>
                {icon}
              </span>
              {label}
            </Link>
          ))}
        </nav>

        <div className="min-w-0 space-y-5 text-[1.05rem] leading-[1.65] text-zinc-800">
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
      </div>

      <HomeCtaGrid />
    </main>
  );
}
