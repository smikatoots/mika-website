import { readFile } from "node:fs/promises";
import path from "node:path";

import type { PressManifest } from "./types";

export async function loadPressManifest(): Promise<PressManifest> {
  try {
    const p = path.join(process.cwd(), "content/press/manifest.json");
    const raw = await readFile(p, "utf-8");
    const data = JSON.parse(raw) as PressManifest;
    if (!data.items || !Array.isArray(data.items)) {
      return { generatedAt: "", items: [] };
    }
    return data;
  } catch {
    return { generatedAt: "", items: [] };
  }
}
