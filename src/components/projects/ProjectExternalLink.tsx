"use client";

import posthog from "posthog-js";

import { trackGa4Event } from "@/lib/analytics/ga4";

const extCtaClass =
  "inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-accent shadow-sm transition hover:border-accent/30 hover:bg-accent/10";

export function ProjectExternalLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <a
      href={href}
      className={extCtaClass}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => {
        posthog.capture("project_external_link_clicked", { href, title });
        trackGa4Event("project_external_link_clicked", {
          cta_label: "Open project",
          cta_location: "project_detail",
          destination_url: href,
          link_type: "external_project",
          project_title: title,
        });
      }}
    >
      Open project →
    </a>
  );
}
