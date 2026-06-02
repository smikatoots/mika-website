import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderProjectMdx } from "@/components/projects/render-project-mdx";
import { projectTagClass } from "@/components/projects/project-tag-styles";
import { loadProjectsManifest } from "@/lib/projects/manifest";
import { loadProjectMdxPost } from "@/lib/projects/load-mdx";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import { BackLink } from "@/components/ui/BackLink";
import { ProjectExternalLink } from "@/components/projects/ProjectExternalLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

function externalHref(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const u = raw.trim();
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export async function generateStaticParams() {
  const { projects } = await loadProjectsManifest();
  return projects.map((p) => ({ slug: p.slug }));
}

const getProjectPost = cache(async (slug: string) => {
  const loaded = await loadProjectMdxPost(slug);
  if (!loaded) {
    return null;
  }

  const { content, frontmatter } = await renderProjectMdx(loaded.source);
  return { content, frontmatter };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectPost(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.title,
    openGraph: buildOpenGraph({ title: project.frontmatter.title }),
    twitter: buildTwitter({ title: project.frontmatter.title }),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectPost(slug);
  if (!project) notFound();

  const ext = externalHref(project.frontmatter.url);

  return (
    <article className={mainProse}>
      <BackLink href="/projects" label="Projects" />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
          {project.frontmatter.title}
        </h1>
        {project.frontmatter.launchDate ? (
          <p className={`mt-2 ${textMuted}`}>
            Launch {project.frontmatter.launchDate}
          </p>
        ) : null}
        {project.frontmatter.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.frontmatter.tags.map((t) => (
              <li key={t.name}>
                <span className={projectTagClass(t.color)}>{t.name}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {ext ? (
          <p className="mt-6">
            <ProjectExternalLink
              href={ext}
              title={project.frontmatter.title}
            />
          </p>
        ) : null}
      </header>

      <div className="mt-10">{project.content}</div>
    </article>
  );
}
