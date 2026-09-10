import type { ReactNode } from "react";
import Link from "next/link";

import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import {
  ConfettiField,
  outsideEdge as outside,
  type ConfettiPlacement,
} from "@/components/ui/Confetti";
import { homeBioLinks } from "@/lib/home-bio-links";
import { siteLink } from "@/lib/ui/site-styles";

import { MyStoryTimeline } from "@/components/home/MyStoryTimeline";

import { AboutPhoto } from "./AboutPhoto";

function ALink({
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

const bioBoxClass =
  "flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm";

/** Emphasis in the “currently” list — resolves to the brand Coral via `--accent`. */
const aboutHighlight = "font-medium text-accent";

/** public/about-assets/ — profile, thumbnails ×4, feature, gallery rows, full-width */
const ABOUT_IMAGE_PATHS: readonly string[] = [
  "/about-assets/000.jpg",
  "/about-assets/001.jpg",
  "/about-assets/002.jpg",
  "/about-assets/003.jpg",
  "/about-assets/004.jpg",
  "/about-assets/005.jpg",
  "/about-assets/006.jpg",
  "/about-assets/007.jpg",
  "/about-assets/008.jpg",
  "/about-assets/009.jpg",
  "/about-assets/010.jpg",
  "/about-assets/011.jpg",
];

/* The about column is capped far narrower than the home page's, so its shapes
   anchor to its own edge — the wrapper below overrides `--mr-edge` and every
   placement follows. Narrow widths leave no gutter beside a single column, so
   those positions hug the page edge inside the article's own padding. */
const ABOUT_CONFETTI: ConfettiPlacement[] = [
  { shape: "sparkle", color: "var(--mr-coral)", size: 42, motion: "bob", duration: 5, at: { top: "4%", left: outside(16) }, narrow: { top: "10px", left: "-14px" } },
  { shape: "squiggle", color: "var(--mr-lime)", size: 88, rotate: 6, motion: "drift", duration: 11, delay: 0.6, at: { top: "17%", right: outside(14) }, narrow: { top: "16%", right: "-40px" } },
  { shape: "ring", color: "var(--mr-teal)", size: 54, motion: "sway", duration: 9, delay: 1.2, at: { top: "31%", left: outside(20) }, narrow: { top: "30%", left: "-22px" } },
  { shape: "burst", color: "var(--mr-sun-yellow)", size: 44, motion: "spin", duration: 22, at: { top: "45%", right: outside(22) }, narrow: { top: "44%", right: "-16px" } },
  { shape: "blob", color: "var(--mr-coral-soft)", size: 92, rotate: 14, motion: "drift", duration: 12.5, delay: 0.4, at: { top: "59%", left: outside(12) }, narrow: { top: "58%", left: "-42px" } },
  { shape: "capsule", color: "var(--mr-periwinkle)", size: 76, rotate: -12, motion: "twist", duration: 8, delay: 1.5, at: { top: "73%", right: outside(16) }, narrow: { top: "72%", right: "-34px" } },
  { shape: "dots", color: "var(--mr-teal)", size: 52, rotate: 8, motion: "shake", duration: 6.5, delay: 0.9, at: { top: "87%", left: outside(18) }, narrow: { top: "86%", left: "-20px" } },
  // Filling the gaps between the seven above, so the column reads as evenly
  // scattered rather than as one shape per screenful.
  { shape: "cross", color: "var(--mr-periwinkle)", size: 34, motion: "spin", duration: 24, delay: 0.2, at: { top: "10%", right: outside(24) }, narrow: { top: "9%", right: "-8px" } },
  { shape: "triangle", color: "var(--mr-sun-yellow)", size: 58, rotate: -12, motion: "twist", duration: 8.5, delay: 1.1, at: { top: "24%", left: outside(24) }, narrow: { top: "23%", left: "-26px" } },
  { shape: "arc", color: "var(--mr-lime)", size: 70, rotate: 16, motion: "bob", duration: 7, delay: 0.5, at: { top: "38%", right: outside(18) }, narrow: { top: "37%", right: "-30px" } },
  { shape: "zigzag", color: "var(--mr-coral)", size: 80, rotate: -6, motion: "twist", duration: 9.5, delay: 1.8, at: { top: "52%", left: outside(16) }, narrow: { top: "51%", left: "-36px" } },
  { shape: "sparkle", color: "var(--mr-teal)", size: 40, motion: "pulse", duration: 6, delay: 0.7, at: { top: "94%", right: outside(26) }, narrow: { top: "93%", right: "-12px" } },
];

export function AboutPageContent() {
  const [
    profileImg,
    t0,
    t1,
    t2,
    t3,
    featureImg,
    g0,
    g1,
    g2,
    g3,
    g4,
    g5,
  ] = ABOUT_IMAGE_PATHS;

  const thumbs = [t0, t1, t2, t3].filter(Boolean) as string[];
  const galleryTop = [g0, g1].filter(Boolean) as string[];
  const galleryMid = [g2, g3, g4].filter(Boolean) as string[];
  const galleryBottom = g5;

  const a = homeBioLinks.awards;

  return (
    <div
      style={{
        position: "relative",
        // Shapes track this column, not the site's wider one.
        ["--mr-edge" as string]: "max(24px, calc((100% - 896px) / 2 + 24px))",
        overflow: "hidden",
      }}
    >
      <ConfettiField items={ABOUT_CONFETTI} />

      <article className="relative mx-auto max-w-3xl px-6 py-14 md:max-w-4xl md:px-10 md:py-20">
      <BackLink href="/" label="Home" />

      {/* PageHero, not a hand-rolled heading — that is how this page ended up
          two sizes smaller than every index page. */}
      <div className="mt-8">
        <PageHero title="About" />
      </div>

      <section className="mt-12 grid gap-10 md:grid-cols-2 md:items-start md:gap-12">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-sm">
          {profileImg ? (
            <AboutPhoto
              src={profileImg}
              alt="Mika Reyes"
              className="aspect-[4/5] max-h-[420px] md:max-h-none"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
            />
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center bg-zinc-100 text-zinc-400">
              Profile photo
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-4 text-[1.05rem] leading-relaxed text-zinc-800">
          <p>
            <span aria-hidden>📍</span> Hi! I&apos;m <strong>Mika</strong>.
            I&apos;m currently:
          </p>
          <ul className="list-none space-y-2 pl-0">
            <li>
              in <span className={aboutHighlight}>New York</span>
            </li>
            <li>
              working on{" "}
              <ALink href={homeBioLinks.kingsCrossLabs}>
                <span className={aboutHighlight}>King&apos;s Cross Labs</span>
              </ALink>
            </li>
            <li>
              writing{" "}
              <span className={aboutHighlight}>
                AI tutorials for normal people
              </span>
            </li>
            <li>
              reading{" "}
              <span className={aboutHighlight}>The Art of Spending</span>
            </li>
            <li>
              creating{" "}
              <span className={aboutHighlight}>
                videos on{" "}
                <ALink href="https://instagram.com/its.mikareyes">
                  Instagram
                </ALink>
              </span>
            </li>
            <li>
              watching <span className={aboutHighlight}>The Pitt</span>
            </li>
            <li>
              listening to{" "}
              <span className={aboutHighlight}>
                my Wedding Dinner Playlist
              </span>
            </li>
            <li>
              addicted to <span className={aboutHighlight}>Claude!</span>
            </li>
          </ul>
          <p className="text-sm italic text-zinc-500">
            Last updated @ April 2, 2026
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold text-zinc-950">Bio</h2>
        <div className="mt-6 space-y-4">
          <div className={bioBoxClass}>
            <span className="text-xl" aria-hidden>
              🌸
            </span>
            <div className="min-w-0 space-y-2 text-zinc-800">
              <p>Currently:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Running an AI product studio for growth &amp; marketing teams
                  with my husband{" "}
                  <ALink href="https://www.linkedin.com/in/nicolasreyes26/">
                    Nick
                  </ALink>
                  . We&apos;re helping teams build products connected to social
                  media or ads platforms with one unified API. You can also
                  connect it to your AI agents via our MCP.{" "}
                  <ALink href="http://tryadeli.com/">Check out Adeli!</ALink>
                </li>
                <li>
                  Teaching AI to 35K+ ambitious founders, creators &amp;
                  professionals on{" "}
                  <ALink href={homeBioLinks.instagram}>Instagram</ALink>,{" "}
                  <ALink href={homeBioLinks.linkedinProfile}>LinkedIn</ALink>, and{" "}
                  <ALink href="https://maven.com/mika-reyes/master-claude-code-as-a-non-technical-pro">
                    Maven
                  </ALink>
                  .
                </li>
              </ul>
            </div>
          </div>

          <div className={bioBoxClass}>
            <span className="text-xl" aria-hidden>
              ✨
            </span>
            <div className="min-w-0 space-y-3 text-zinc-800">
              <p>
                Recently CEO and co-founder @ Parallax. Acquired by Phantom ($3B
                val acquirer, best crypto wallet).
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Led product vision and strategy, developing one of the
                  earliest stablecoin cross-border payments companies.
                </li>
                <li>Scaled the business to over $X00M+ in volume</li>
                <li>
                  Raised ~$5M in venture funding from top VCs, including
                  Dragonfly, General Catalyst &amp; more
                </li>
                <li>
                  Built and managed a cross-functional team of 10–15 team
                  members across 8 countries
                </li>
              </ul>
            </div>
          </div>

          <div className={bioBoxClass}>
            <span className="text-xl" aria-hidden>
              🏆
            </span>
            <p className="text-zinc-800">
              I&apos;m grateful to have been recognized by{" "}
              <ALink href={a.forbes30}>Forbes 30 Under 30</ALink>,{" "}
              <ALink href={a.tatler}>Tatler Gen.T Leader of Tomorrow</ALink>,{" "}
              <ALink href={a.kleinerPerkins}>Kleiner Perkins Fellowship</ALink>{" "}
              <ALink href={a.spc}>SPC Founder Fellowship</ALink>. I&apos;ve also
              been featured on{" "}
              <ALink href={homeBioLinks.press.forbes}>Forbes</ALink>,{" "}
              <ALink href={homeBioLinks.press.techcrunch}>TechCrunch</ALink>,{" "}
              <ALink href="https://www.businessinsider.com">
                BusinessInsider
              </ALink>
              , <ALink href={a.tatler}>Tatler</ALink> &amp; other publications.
            </p>
          </div>

          <div className={bioBoxClass}>
            <span className="text-xl" aria-hidden>
              💼
            </span>
            <p className="text-zinc-800">
              Previously product lead @{" "}
              <ALink href={homeBioLinks.linkedin}>LinkedIn</ALink>{" "}
              (if you see those purple &quot;Hiring&quot; rings on
              people&apos;s profiles, built that and more!),{" "}
              <ALink href={homeBioLinks.kumu}>Kumu</ALink>{" "}
              (led the team to product-market fit in the early days) &amp;{" "}
              <ALink href={homeBioLinks.ripcord}>Ripcord</ALink> through the{" "}
              <ALink href={a.kleinerPerkins}>KP Product Fellowship</ALink>. I
              started the Filipinos @ LinkedIn group &amp; was a Women in
              Product executive member.
            </p>
          </div>

          <div className={bioBoxClass}>
            <span className="text-xl" aria-hidden>
              🎓
            </span>
            <p className="text-zinc-800">
              My family and I have basically paid $0 in tuition for my high
              school and college as I&apos;m a proud Freeman Asian scholar and
              Philippine Science High School scholar. I graduated B.A.
              Economics, Psychology, Data Analysis from{" "}
              <ALink href="https://www.wesleyan.edu">Wesleyan University</ALink>,{" "}
              <em>Phi Beta Kappa</em> &amp; a <em>summa cum laude</em>.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-4">
        <div className={bioBoxClass}>
          <span className="text-xl leading-none" aria-hidden>
            🇵🇭
          </span>
          <p className="text-zinc-800">
            I&apos;m a fan of broadening access to opportunities in emerging
            markets like my home, the Philippines &amp; love to help ambitious
            people design careers (and lives) they actually want, not just what
            society tells them to.
          </p>
        </div>
        <div className={bioBoxClass}>
          <span className="text-xl" aria-hidden>
            ⚡
          </span>
          <p className="text-zinc-800">
            On the side, I like to work on fun projects like a{" "}
            <ALink href="/projects">virtual startup incubator for emerging markets</ALink>
            ,{" "}
            <ALink href="/links">
              the first playbook for launching NFTs
            </ALink>{" "}
            (as an NFT) &amp; launched{" "}
            <ALink href="/links">a fun social card game</ALink>. Nowadays,
            I&apos;m overloading on coffee &amp; funneling my type A energy
            towards{" "}
            <ALink href="https://instagram.com/its.mikareyes">
              growing my startup &amp; creator business
            </ALink>
            .
          </p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-bold text-zinc-950">Timeline</h2>
        <div className="mt-6 md:relative md:left-1/2 md:-ml-[50vw] md:w-screen md:max-w-[100vw]">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <MyStoryTimeline />
          </div>
        </div>
      </section>

      {thumbs.length > 0 || featureImg ? (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-zinc-950">Photos</h2>
          {thumbs.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {thumbs.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="aspect-square overflow-hidden rounded-lg border border-zinc-200"
                >
                  <AboutPhoto
                    src={src}
                    alt={`Mika Reyes photo ${i + 1}`}
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          ) : null}
          {featureImg ? (
            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 shadow-sm">
              <AboutPhoto
                src={featureImg}
                alt="Mika Reyes in the park"
                className="aspect-[21/9] max-h-[480px] md:aspect-video"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>
          ) : null}
        </section>
      ) : null}

      {galleryTop.length > 0 || galleryMid.length > 0 || galleryBottom ? (
        <section className="mt-12 space-y-3">
          {galleryTop.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {galleryTop.map((src, i) => (
                <div
                  key={`gt-${src}-${i}`}
                  className="overflow-hidden rounded-xl border border-zinc-200"
                >
                  <AboutPhoto
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="aspect-[4/3]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          ) : null}
          {galleryMid.length > 0 ? (
            <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2">
              {galleryMid.map((src, i) => (
                <div
                  key={`gm-${src}-${i}`}
                  className="aspect-square overflow-hidden rounded-lg border border-zinc-200"
                >
                  <AboutPhoto
                    src={src}
                    alt={`Gallery row ${i + 1}`}
                    sizes="(max-width: 768px) 33vw, 240px"
                  />
                </div>
              ))}
            </div>
          ) : null}
          {galleryBottom ? (
            <div className="overflow-hidden rounded-xl border border-zinc-200">
              <AboutPhoto
                src={galleryBottom}
                alt="Mika Reyes"
                className="aspect-[21/9] max-h-[520px]"
                sizes="100vw"
              />
            </div>
          ) : null}
        </section>
      ) : null}
      </article>
    </div>
  );
}
