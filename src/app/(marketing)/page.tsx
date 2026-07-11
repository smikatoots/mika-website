import type { Metadata } from "next";

import { HomeLanding } from "@/components/home/HomeLanding";
import { canonicalUrl } from "@/lib/site-metadata";

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl("/") },
};

export default function HomePage() {
  return <HomeLanding />;
}
