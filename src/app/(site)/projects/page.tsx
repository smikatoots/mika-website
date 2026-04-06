import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { loadProjectsManifest } from "@/lib/projects/manifest";
import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainWide } from "@/lib/ui/site-styles";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Side projects, templates, games, and experiments — past and present.",
  openGraph: { title: "Projects" },
};

export default async function ProjectsIndexPage() {
  const { projects } = await loadProjectsManifest();

  return (
    <main className={mainWide}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero
        emoji="💼"
        title="Projects"
        subtitle={
          <>
            My <em>many</em> fun <em>side</em> projects (&amp; still quite a bit
            missing from my past life!)
          </>
        }
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </main>
  );
}
