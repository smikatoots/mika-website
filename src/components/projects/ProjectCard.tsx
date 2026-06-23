import Image from "next/image";

import type { ProjectManifestEntry } from "@/lib/projects/types";

import { GalleryCard } from "@/components/ui/GalleryCard";

import { projectTagClass } from "./project-tag-styles";

function displayUrl(raw: string | null): string {
  if (!raw) return "";
  const u = raw.trim();
  if (!u) return "";
  const withProto = /^https?:\/\//i.test(u) ? u : `https://${u}`;
  try {
    const parsed = new URL(withProto);
    return (parsed.hostname + parsed.pathname).replace(/\/$/, "");
  } catch {
    return u.slice(0, 48);
  }
}

export function ProjectCard({ project }: { project: ProjectManifestEntry }) {
  const href = `/projects/${project.slug}`;
  const urlLine = displayUrl(project.url);

  const media = project.cover ? (
    <Image
      src={project.cover}
      alt={project.title}
      fill
      className="object-cover transition duration-300 group-hover:scale-[1.02]"
      sizes="(max-width: 768px) 100vw, 33vw"
      unoptimized
    />
  ) : (
    <div className="flex h-full items-center justify-center text-4xl text-zinc-300">
      💼
    </div>
  );

  return (
    <GalleryCard href={href} media={media}>
      <h2
        className="leading-snug"
        style={{
          fontFamily: "var(--mr-font-display)",
          fontSize: "var(--mr-text-sm)",
          fontWeight: "var(--mr-weight-display)",
          color: "var(--mr-ink)",
        }}
      >
        {project.title}
      </h2>
      {urlLine ? (
        <p
          className="truncate"
          title={project.url ?? ""}
          style={{ fontSize: "var(--mr-text-xs)", color: "var(--mr-muted)" }}
        >
          {urlLine}
        </p>
      ) : null}
      {project.tags.length > 0 ? (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((t) => (
            <span key={t.name} className={projectTagClass(t.color)}>
              {t.name}
            </span>
          ))}
        </div>
      ) : null}
    </GalleryCard>
  );
}
