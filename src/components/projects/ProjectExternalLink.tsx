"use client";

import posthog from "posthog-js";

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
      onClick={() =>
        posthog.capture("project_external_link_clicked", { href, title })
      }
    >
      Open project →
    </a>
  );
}
