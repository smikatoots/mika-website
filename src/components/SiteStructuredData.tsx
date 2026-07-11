import { homeBioLinks } from "@/lib/home-bio-links";
import { SITE_SEO_NAME, SITE_URL } from "@/lib/site";

export function SiteStructuredData() {
  const logoUrl = `${SITE_URL}/icon.png`;
  const headshotUrl = `${SITE_URL}/mika-reyes.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_SEO_NAME,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Mika Reyes",
        url: SITE_URL,
        jobTitle: "AI Founder & Creator",
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
          "AI tools",
          "Claude",
          "Product management",
          "Startups",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_SEO_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
        },
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
