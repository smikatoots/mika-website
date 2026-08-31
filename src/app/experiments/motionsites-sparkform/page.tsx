import type { Metadata } from "next";

import { SparkformHero } from "./SparkformHero";
import { SparkformMarquee } from "./SparkformMarquee";
import "./sparkform.css";

export const dynamic = "force-static";

// No canonical: `src/app/experiments/layout.tsx` marks this whole segment
// noindex, which is what the SEO source policy requires instead.
export const metadata: Metadata = {
  title: "Sparkform",
};

export default function SparkformPage() {
  return (
    <main className="sparkform w-full">
      <SparkformHero />
      <SparkformMarquee />
    </main>
  );
}
