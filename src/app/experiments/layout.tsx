import type { Metadata } from "next";

export const metadata: Metadata = {
  // Experiments are visual scratch space — recreations, motion studies, layout
  // tests. They are not part of the site's public surface and must never be
  // indexed. This is also what satisfies the canonical-metadata policy in
  // `SEO.md` for every page under `/experiments`.
  robots: { index: false, follow: false },
};

export default function ExperimentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
