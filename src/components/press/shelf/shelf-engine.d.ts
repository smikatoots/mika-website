import type { ShelfVolume } from "@/lib/press/shelf-volumes";

/** Mounts the 3D press shelf into `root` and returns its teardown. */
export function mountPressShelf(root: HTMLElement, volumes: ShelfVolume[]): () => void;
