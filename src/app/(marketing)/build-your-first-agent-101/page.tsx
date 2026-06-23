import type { Metadata } from "next";

import { BuildYourFirstAgentLanding } from "@/components/courses/BuildYourFirstAgentLanding";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";

const title = "Build Your First Agent 101";
const description =
  "Self-paced course for non-technical builders. Ship a working AI agent with context files, skills, and tool connections — was $499 live, now $37.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: buildOpenGraph({ title, description }),
  twitter: buildTwitter({ title, description }),
};

export default function BuildYourFirstAgentPage() {
  return <BuildYourFirstAgentLanding />;
}
