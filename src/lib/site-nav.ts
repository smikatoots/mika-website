/** Primary nav (header). */
export const siteNavItems = [
  { href: "/about", label: "About", icon: "👤" },
  { href: "/ai", label: "AI", icon: "🤖" },
  { href: "/blog", label: "Blog", icon: "✏️" },
  { href: "/links", label: "Links", icon: "🔗" },
  { href: "/projects", label: "Projects", icon: "💼" },
  { href: "/press", label: "Press", icon: "📰" },
  { href: "/my-dreams", label: "Dreams", icon: "💭" },
] as const;

/** Indexed static routes not shown in header nav. */
export const siteRoutesNotInNav = [
  { href: "/media-kit", label: "Media Kit" },
] as const;
