import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects",
};

export default function ProjectsPage() {
  return <PlaceholderPage title="Projects" />;
}
