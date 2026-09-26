import type { Metadata } from "next";

import { EventsPageContent } from "@/components/events/EventsPageContent";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";

const title = "Sponsor an Event";
const description =
  "Sponsor a Time Rich Club event: hands-on AI workshops and intimate socials in New York for founders, creators, builders and growth operators.";
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
