import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { renderProjectMdx } from "@/components/projects/render-project-mdx";
import { projectTagClass } from "@/components/projects/project-tag-styles";
import { loadProjectsManifest } from "@/lib/projects/manifest";
import type { ProjectFrontmatter } from "@/lib/projects/types";
import { loadProjectMdxPost } from "@/lib/projects/load-mdx";
import { BackLink } from "@/components/ui/BackLink";
import { mainProse, textMuted } from "@/lib/ui/site-styles";

type Props = { params: Promise<{ slug: string }> };

function externalHref(raw: string | null): string | null {
  if (!raw?.trim()) return null;
  const u = raw.trim();
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

const extCtaClass =
  "inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-teal-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50/80";

export async function generateStaticParams() {
  const { projects } = await loadProjectsManifest();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadProjectMdxPost(slug);
  if (!loaded) return { title: "Not found" };
  const { data } = matter(loaded.source);
  const fm = data as ProjectFrontmatter;
  return {
    title: fm.title,
    description: fm.title,
    openGraph: { title: fm.title },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await loadProjectMdxPost(slug);
  if (!loaded) notFound();

  const { data } = matter(loaded.source);
  const fm = data as ProjectFrontmatter;
  const { content } = await renderProjectMdx(loaded.source);
  const ext = externalHref(fm.url);

  return (
    <article className={mainProse}>
      <BackLink href="/projects" label="Projects" />

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl">
          {fm.title}
        </h1>
        {fm.launchDate ? (
          <p className={`mt-2 ${textMuted}`}>Launch {fm.launchDate}</p>
        ) : null}
        {fm.tags?.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {fm.tags.map((t) => (
              <li key={t.name}>
                <span className={projectTagClass(t.color)}>{t.name}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {ext ? (
          <p className="mt-6">
            <a
              href={ext}
              className={extCtaClass}
              rel="noopener noreferrer"
              target="_blank"
            >
              Open project →
            </a>
          </p>
        ) : null}
      </header>

      <div className="mt-10">{content}</div>
    </article>
  );
}
