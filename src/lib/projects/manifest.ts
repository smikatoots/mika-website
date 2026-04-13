import { cache } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { ProjectsManifest } from "./types";

const loadProjectsManifestCached = cache(
  async (): Promise<ProjectsManifest> => {
    try {
      const p = path.join(process.cwd(), "content/projects/manifest.json");
      const raw = await readFile(p, "utf-8");
      const data = JSON.parse(raw) as ProjectsManifest;
      if (!data.projects || !Array.isArray(data.projects)) {
        return { generatedAt: "", projects: [] };
      }
      return data;
    } catch {
      return { generatedAt: "", projects: [] };
    }
  },
);

export async function loadProjectsManifest(): Promise<ProjectsManifest> {
  return loadProjectsManifestCached();
}
