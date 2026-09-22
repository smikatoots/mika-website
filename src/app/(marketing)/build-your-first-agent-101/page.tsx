import type { Metadata } from "next";

import { FaqStructuredData } from "@/components/ai-guides/FaqStructuredData";
import { BuildYourFirstAgentLanding } from "@/components/courses/BuildYourFirstAgentLanding";
import { CourseStructuredData } from "@/components/courses/CourseStructuredData";
import {
  BUILD_YOUR_FIRST_AGENT_PRICE,
  buildYourFirstAgentFaqs,
  buildYourFirstAgentInstructors,
} from "@/lib/courses/build-your-first-agent";
import { buildOpenGraph, buildTwitter, canonicalUrl } from "@/lib/site-metadata";

const title = "Build Your First Agent 101";
const description =
  "Build your own AI agent in 1 day — skip 6 months of trial & error. Self-paced: context files, skills, MCPs, and a working agent for your role.";
const canonical = canonicalUrl("/build-your-first-agent-101");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOpenGraph({ title, description, url: canonical }),
  twitter: buildTwitter({ title, description }),
};

export default function BuildYourFirstAgentPage() {
  return (
    <>
      <CourseStructuredData
        name={title}
        description={description}
        url={canonical}
        price={BUILD_YOUR_FIRST_AGENT_PRICE}
        instructors={buildYourFirstAgentInstructors}
      />
      <FaqStructuredData items={[...buildYourFirstAgentFaqs]} />
      <BuildYourFirstAgentLanding />
    </>
  );
}
