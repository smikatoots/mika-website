import type { Metadata } from "next";

import "./new-design.css";

export const metadata: Metadata = {
  // Design prototype. Not a public page — never index it, and never add it to
  // the sitemap. See SEO.md.
  robots: { index: false, follow: false },
  title: "New design prototype",
};

export default function NewDesignLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="nd-root">{children}</div>;
}
