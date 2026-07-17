import type { Metadata } from "next";

import { EventsPageContent } from "@/components/events/EventsPageContent";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";

const title = "Events";
const description =
  "Host an event in New York with Mika — put your company in front of decision-makers at high-growth, early-stage tech companies.";
const canonical = canonicalUrl("/events");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

export default function EventsPage() {
  return <EventsPageContent />;
}
