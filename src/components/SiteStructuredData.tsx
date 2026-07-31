import { homeBioLinks } from "@/lib/home-bio-links";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export function SiteStructuredData() {
  const headshotUrl = `${SITE_URL}/mika-reyes.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Mika Reyes",
        url: SITE_URL,
        jobTitle: SITE_TAGLINE,
        description:
          "Co-founder of King's Cross Labs, previously co-founder and CEO of Parallax (acquired by Phantom), former LinkedIn product manager, and Forbes 30 Under 30 honoree.",
        image: headshotUrl,
        sameAs: [
          homeBioLinks.linkedinProfile,
          homeBioLinks.instagram,
          homeBioLinks.tiktok,
          "https://twitter.com/__mikareyes",
        ],
        knowsAbout: [
          "AI",
          "AI Tools",
          "Claude",
          "ChatGPT",
          "Entrepreneurship",
          "Startups",
          "Product management",
          "Artificial Intelligence",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
