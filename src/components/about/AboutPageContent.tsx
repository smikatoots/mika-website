import type { ReactNode } from "react";
import Link from "next/link";

import { BackLink } from "@/components/ui/BackLink";
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

/** Emphasis in the “currently” list — matches global `--accent` (e.g. #fd4869). */
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
    <article className="mx-auto max-w-3xl px-6 py-14 md:max-w-4xl md:px-10 md:py-20">
      <BackLink href="/" label="Home" />

      <header className="mt-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl">
          About
        </h1>
      </header>

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
                  . Want to increase website conversions autonomously? Check out{" "}
                  <ALink href="https://askleda.com">askleda.com</ALink> and get a
                  site audit!
                </li>
                <li>
                  Teaching AI to 25K+ ambitious founders &amp; professionals on{" "}
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

      <section className="mt-12 space-y-4">
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
            towards wedding planning.
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
  );
}
