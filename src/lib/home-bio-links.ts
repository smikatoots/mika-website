/**
 * Home bio links. Paths starting with `/` are in-app routes (same slugs as mikareyes.com).
 */
export const homeBioLinks = {
  kingsCrossLabs: "https://kingscrosslabs.com",
  parallax: "https://withparallax.com",
  tiktok: "https://www.tiktok.com/@its.mikareyes",
  instagram: "https://www.instagram.com/its.mikareyes/",
  /** Personal profile (content, AI guides). Distinct from `linkedin` (company product URL in bio timeline). */
  linkedinProfile: "https://www.linkedin.com/in/itsmikareyes",
  linkedin: "https://www.linkedin.com/company/linkedin/",
  kumu: "https://kumu.ph",
  medgrocer: "https://www.medgrocer.com",
  ripcord: "https://ripcord.com",
  press: {
    techcrunch: "/press/parallax-on-techcrunch",
    yahoo: "/press/parallax-launch-on-yahoo",
    techInAsia: "/press/parallax-launch-on-tech-in-asia",
    inquirer: "/press",
    forbes: "/press/forbes-30-under-30-finance-venture-capital-forbes",
  },
  awards: {
    forbes30: "/press/forbes-30-under-30-finance-venture-capital-forbes",
    tatler: "https://www.tatlerasia.com/",
    kleinerPerkins: "/meet-the-kleiner-perkins-fellows",
    spc: "/the-southpark-commons-community",
  },
} as const;
