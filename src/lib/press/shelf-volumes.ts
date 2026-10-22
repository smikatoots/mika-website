import { readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { PressManifestEntry } from "./types";

/**
 * The /press shelf groups every clipping into a handful of bound volumes.
 * Each volume is a book on the 3D shelf; each clipping is one spread inside it
 * (cover screenshot on the left page, headline and description on the right).
 *
 * Colours are BRAND.md accents and neutrals only. Keep aqua and green apart in
 * the order: the shelf wraps, so the last volume sits next to the first.
 */
type VolumeSpec = {
  id: string;
  title: string;
  discipline: string;
  note: string;
  deck: string;
  color: string;
  /** Type and motif colour on the cover: ink on accents, white on dark cloth. */
  foil: string;
  motif: "sparkle" | "burst" | "arc" | "rings" | "triangle" | "zigzag";
  slugs: string[];
};

const VOLUMES: VolumeSpec[] = [
  {
    id: "forbes",
    title: "Forbes 30 Under 30",
    discipline: "Asia 2024 · Finance & VC",
    note: "The list and the coverage.",
    deck: "Named to Forbes 30 Under 30 Asia 2024 in Finance and Venture Capital for building Parallax, plus the outlets in the Philippines that covered it.",
    color: "#FACF5A",
    foil: "#000000",
    motif: "burst",
    slugs: [
      "forbes-30-under-30-finance-venture-capital-forbes",
      "meet-the-30-under-30-fintech-entrepreneurs-facilitating-access-to-capital-forbes",
      "seven-filipinos-in-the-ninth-edition-of-forbes-30-under-30-asia-business-world",
      "ez-mil-lumpia-queen-5-other-pinoys-make-it-to-forbes-asia-30-under-30-list-abs-cbn",
      "meet-the-filipinos-in-forbes-30-under-30-2024-list-rappler",
      "abi-marquez-arshie-larga-ez-mil-take-spot-on-forbes-30-under-30-asia-2024-list-when-in-manila",
      "lumpia-queen-arshie-larga-ez-mil-4-other-pinoys-make-waves-in-forbes-30-under-30-asia-2024-list-ptv-news",
    ],
  },
  {
    id: "parallax",
    title: "Parallax, my first startup",
    discipline: "Launch to acquisition",
    note: "From launch day to getting acquired.",
    deck: "Parallax, the cross-border stablecoin payments company I co-founded and ran as CEO: the launch coverage, founder features, a podcast on stablecoins, and Phantom's post on the acquisition.",
    color: "#2F2C29",
    foil: "#FFFFFF",
    motif: "arc",
    slugs: [
      "phantom-acquires-parallax",
      "parallax-on-techcrunch",
      "parallax-launch-on-yahoo",
      "parallax-launch-on-tech-in-asia",
      "parallax-launch-on-e27",
      "launching-parallax-twitter",
      "launching-parallax-linkedin",
      "circle-founder-story-mika-from-parallax",
      "backscoop-founder-feature",
      "stay-stable-podcast",
    ],
  },
  {
    id: "fun-features",
    title: "Fun Features",
    discipline: "Press, podcasts & talks",
    note: "The Wall Street Journal, podcasts, livestreams, and talks.",
    deck: "The Wall Street Journal on the AI health dashboard and running coach I built, the early days at Kumu, a livestream with Cloudflare's COO, and a talk for Filipino founders at the Philippine Consulate in New York.",
    color: "#49BEB7",
    foil: "#000000",
    motif: "rings",
    slugs: [
      "wsj-the-datamaxxers-feeding-their-every-health-move-to-ai",
      "kumu-kwentuhan-the-making-of-an-app-early-days-at-kumu",
      "kumu-kwentuhan-the-women-of-kumu",
      "unconventionally-breaking-into-tech-and-impacting-society-by-mika-reyes-pm-linkedin",
      "yes-we-can-with-cloudflaretv-hosted-by-michelle-zatlyn-coo-of-cloudflare",
      "linkedin-product-manager-mika-reyes-on-leaving-home-and-dreaming-big",
      "speaker-nyc-philippine-consulate",
    ],
  },
  {
    id: "fellowships",
    title: "Tech Fellowships & Communities",
    discipline: "Fellowships & community",
    note: "The programs and communities that opened doors.",
    deck: "Wesleyan's note on my two tech fellowships, the Kleiner Perkins Fellows, and the South Park Commons community.",
    color: "#B23E3E",
    foil: "#FFFFFF",
    motif: "triangle",
    slugs: [
      "reyes-17-earns-2-tech-fellowships",
      "meet-the-kleiner-perkins-fellows",
      "the-southpark-commons-community",
    ],
  },
  {
    id: "product-years",
    title: "Product Years",
    discipline: "LinkedIn & product craft",
    note: "How I got into product, and what I learned there.",
    deck: "Interviews, podcasts and courses from my years as a product manager at LinkedIn: how I landed the job, launching big, hairy projects, and practical lessons for breaking into product.",
    color: "#6FD098",
    foil: "#000000",
    motif: "zigzag",
    slugs: [
      "hackernoon-how-mika-reyes-got-her-job-at-linkedin-as-a-product-manager",
      "hustleshare-podcast-mika-reyes-the-hustle-of-a-product-manager",
      "product-ph-getting-your-foot-in-the-product-world-with-mika-reyes",
      "women-in-product-on-linkedin-launching-big-hairy-projects",
      "product-alliance-course",
      "swarm-w-product-managers-what-it-takes-to-become-a-product-manager",
      "wi-tech-feature-mika-reyes",
      "women-of-silicon-valley-mika-reyes",
    ],
  },
];

/** Clippings that stay published at /press/<slug> but are left off the list. */
const HIDDEN_SLUGS = new Set(["my-youtube-channel"]);

/** Catch-all for clippings synced from Notion that no volume claims yet. */
const OVERFLOW_VOLUME: Omit<VolumeSpec, "slugs"> = {
  id: "more",
  title: "More",
  discipline: "Recently added",
  note: "New clippings, waiting for a volume.",
  deck: "Coverage added since the shelf was last arranged.",
  color: "#D9CFC2",
  foil: "#000000",
  motif: "sparkle",
};

/* Book proportions vary a little so the shelf reads as real books, not a row
   of identical boxes. Same ranges as the source scene. */
const PROPORTIONS = [
  { width: 1.02, height: 1.58, depth: 0.26 },
  { width: 1.1, height: 1.46, depth: 0.29 },
  { width: 0.96, height: 1.6, depth: 0.27 },
  { width: 1.08, height: 1.66, depth: 0.25 },
  { width: 1.0, height: 1.5, depth: 0.24 },
  { width: 1.12, height: 1.62, depth: 0.28 },
  { width: 0.94, height: 1.54, depth: 0.23 },
];

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const OUTLETS_BY_HOST: Record<string, string> = {
  "wsj.com": "The Wall Street Journal",
  "phantom.com": "Phantom",
  "open.spotify.com": "Spotify",
  "anchor.fm": "Where Women Belong",
  "forbes.com": "Forbes",
  "techcrunch.com": "TechCrunch",
  "yahoo.com": "Yahoo!",
  "techinasia.com": "Tech in Asia",
  "e27.co": "e27",
  "twitter.com": "X (Twitter)",
  "linkedin.com": "LinkedIn",
  "productalliance.com": "Product Alliance",
  "wi-tech.org": "Wi-Tech",
  "womenofsiliconvalley.org": "Women of Silicon Valley",
  "newsletter.blogs.wesleyan.edu": "Wesleyan University",
  "youtube.com": "YouTube",
  "hackernoon.com": "HackerNoon",
  "southparkcommons.com": "South Park Commons",
  "fellows.kleinerperkins.com": "Kleiner Perkins",
  "swarm.work": "Swarm",
  "backscoop.com": "Backscoop",
};

export type ShelfItem = {
  slug: string;
  title: string;
  outlet: string;
  format: string;
  description: string;
  cover: string | null;
  href: string;
};

export type ShelfVolume = {
  id: string;
  title: string;
  roman: string;
  discipline: string;
  note: string;
  deck: string;
  color: string;
  foil: string;
  motif: VolumeSpec["motif"];
  width: number;
  height: number;
  depth: number;
  seed: number;
  formats: string;
  outlets: string;
  items: ShelfItem[];
};

function hostOf(url: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function outletFor(entry: PressManifestEntry): string {
  const fromTitle = entry.title.match(/\(([^()]+)\)\s*$/);
  // "(Twitter)" in older Notion titles and twitter.com links are one outlet.
  if (fromTitle) return fromTitle[1].trim() === "Twitter" ? OUTLETS_BY_HOST["twitter.com"] : fromTitle[1].trim();
  const host = hostOf(entry.url);
  const match = Object.keys(OUTLETS_BY_HOST).find(
    (key) => host === key || host.endsWith(`.${key}`),
  );
  return match ? OUTLETS_BY_HOST[match] : host || "Press";
}

function formatFor(url: string | null): string {
  const host = hostOf(url);
  if (host.includes("spotify") || host.includes("anchor.fm")) return "Podcast";
  if (host.includes("youtube")) return "Video";
  if (host.includes("linkedin") || host.includes("twitter")) return "Post";
  return "Article";
}

/** "Headline (Outlet)" reads twice once the outlet has its own label. */
function cleanTitle(title: string): string {
  return title.replace(/\s*\([^()]+\)\s*$/, "").trim();
}

async function descriptionFor(slug: string): Promise<string> {
  try {
    const raw = await readFile(
      path.join(process.cwd(), "content/press", `${slug}.mdx`),
      "utf-8",
    );
    const { data } = matter(raw);
    return typeof data.description === "string" ? data.description : "";
  } catch {
    return "";
  }
}

function summarise(values: string[], limit = 4): string {
  const unique = [...new Set(values)];
  if (unique.length <= limit) return unique.join(" · ");
  return `${unique.slice(0, limit).join(" · ")} + ${unique.length - limit} more`;
}

export async function buildPressShelf(
  entries: PressManifestEntry[],
): Promise<ShelfVolume[]> {
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const claimed = new Set(VOLUMES.flatMap((volume) => volume.slugs));
  const overflow = entries
    .filter((entry) => !claimed.has(entry.slug) && !HIDDEN_SLUGS.has(entry.slug))
    .map((entry) => entry.slug);

  const specs: VolumeSpec[] = overflow.length
    ? [...VOLUMES, { ...OVERFLOW_VOLUME, slugs: overflow }]
    : VOLUMES;

  const volumes = await Promise.all(
    specs.map(async (spec) => {
      const items = await Promise.all(
        spec.slugs
          .map((slug) => bySlug.get(slug))
          .filter((entry): entry is PressManifestEntry => Boolean(entry))
          .map(async (entry) => ({
            slug: entry.slug,
            title: cleanTitle(entry.title),
            outlet: outletFor(entry),
            format: formatFor(entry.url),
            description: await descriptionFor(entry.slug),
            cover: entry.cover,
            href: `/press/${entry.slug}`,
          })),
      );
      return { spec, items };
    }),
  );

  return volumes
    .filter(({ items }) => items.length > 0)
    .map(({ spec, items }, index) => ({
      id: spec.id,
      title: spec.title,
      roman: ROMAN[index] ?? String(index + 1),
      discipline: spec.discipline,
      note: spec.note,
      deck: spec.deck,
      color: spec.color,
      foil: spec.foil,
      motif: spec.motif,
      ...PROPORTIONS[index % PROPORTIONS.length],
      seed: (index + 1) * 11,
      formats: summarise(items.map((item) => item.format)),
      outlets: summarise(items.map((item) => item.outlet)),
      items,
    }));
}
