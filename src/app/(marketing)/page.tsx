import type { Metadata } from "next";

import { HomeLanding } from "@/components/home/HomeLanding";
import {
  buildOpenGraph,
  buildTwitter,
  canonicalUrl,
} from "@/lib/site-metadata";
import { SITE_NAME } from "@/lib/site";

const canonical = canonicalUrl("/");

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  alternates: { canonical },
  openGraph: buildOpenGraph({ title: SITE_NAME, url: canonical }),
  twitter: buildTwitter({ title: SITE_NAME }),
};

export default function HomePage() {
  return <HomeLanding />;
}
