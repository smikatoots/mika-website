/** Full site nav (footer and other full lists). */
export const siteNavItems = [
  { href: "/about", label: "About", icon: "👤" },
  { href: "/ai", label: "AI", icon: "🤖" },
  { href: "/blog", label: "Blog", icon: "✏️" },
  { href: "/links", label: "Links", icon: "🔗" },
  { href: "/projects", label: "Projects", icon: "💼" },
  { href: "/press", label: "Press", icon: "📰" },
  { href: "/my-dreams", label: "Dreams", icon: "💭" },
] as const;

type HeaderNavLink = { type: "link"; href: string; label: string };
type HeaderNavDropdown = { type: "learn-ai-dropdown" };

export const siteHeaderNavItems: ReadonlyArray<HeaderNavLink | HeaderNavDropdown> = [
  { type: "link", href: "/about", label: "About" },
  { type: "learn-ai-dropdown" },
  { type: "link", href: "/blog", label: "Blog" },
  { type: "link", href: "/links", label: "Links" },
  { type: "link", href: "/press", label: "Press" },
];

export const learnAiNavItems = [
  {
    href: "/build-your-first-agent-101",
    label: "Master Agentic AI",
    description:
      "Step by step guide to build your own custom AI agent in 1 day, designed for non-technical pros.",
    featured: true,
  },
  {
    href: "/ai",
    label: "AI Guides",
    description: "Free practical how-tos from my social content",
    featured: false,
  },
  {
    href: "/challenges",
    label: "AI Challenges",
    description: "Difficult skills I'm learning with AI as my only coach",
    featured: false,
  },
] as const;

/** Indexed static routes not shown in header nav. */
export const siteRoutesNotInNav = [
  { href: "/media-kit", label: "Media Kit" },
  { href: "/events", label: "Events" },
] as const;
