/**
 * Episode persistence, IndexedDB only.
 *
 * Episodes are multi-megabyte MP3 blobs, so `localStorage` (a ~5MB string
 * quota) is not an option — one twenty-minute episode would blow it. IndexedDB
 * stores Blobs by reference on disk, so listing the library does not pull every
 * episode into memory, and a generated episode survives a refresh and an
 * offline flight.
 *
 * Hand-rolled rather than pulling in `idb`: this is one object store with five
 * operations, and the callback-to-promise shim is the whole library.
 */

const DB_NAME = "personal-podcast";
const DB_VERSION = 1;
const STORE = "episodes";

export type Episode = {
  id: string;
  title: string;
  /** Epoch ms. */
  createdAt: number;
  voiceId: string | null;
  voiceName: string;
  durationSec: number;
  sizeBytes: number;
  /** Playback position, so a run picks up where the last one stopped. */
  positionSec: number;
  blob: Blob;
};

/** Everything about an episode except the audio itself. */
export type EpisodeMeta = Omit<Episode, "blob">;

let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Safari in private mode, and any browser with site data blocked, throws on
 * access rather than returning null. Callers use this to degrade to
 * "generate and download, but no library" instead of crashing the page.
 */
export function isEpisodeStorageAvailable(): boolean {
  try {
    return typeof indexedDB !== "undefined" && indexedDB !== null;
  } catch {
    return false;
  }
}

function openDatabase(): Promise<IDBDatabase> {
  dbPromise ??= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "id" });
        store.createIndex("createdAt", "createdAt");
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    // Another tab is holding an old version open. Surfacing this beats hanging.
    request.onblocked = () => reject(new Error("Storage is busy in another tab."));
  }).catch((error) => {
    dbPromise = null;
    throw error;
  });
  return dbPromise;
}

function runTransaction<T>(
  mode: IDBTransactionMode,
  work: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDatabase().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(STORE, mode);
        const request = work(transaction.objectStore(STORE));
        // Resolve on transaction completion, not request success: for writes,
        // success fires before the data is actually durable.
        transaction.oncomplete = () => resolve(request.result);
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error);
      }),
  );
}

export async function listEpisodes(): Promise<Episode[]> {
  const episodes = await runTransaction<Episode[]>("readonly", (store) =>
    store.getAll() as IDBRequest<Episode[]>,
  );
  return episodes.sort((a, b) => b.createdAt - a.createdAt);
}

export function getEpisode(id: string): Promise<Episode | undefined> {
  return runTransaction<Episode | undefined>("readonly", (store) =>
    store.get(id) as IDBRequest<Episode | undefined>,
  );
}

export function putEpisode(episode: Episode): Promise<unknown> {
  return runTransaction("readwrite", (store) => store.put(episode));
}

export function deleteEpisode(id: string): Promise<unknown> {
  return runTransaction("readwrite", (store) => store.delete(id));
}

/**
 * Read-modify-write in one transaction. Used for renames and for saving
 * playback position, which fires often enough that a lost update would be
 * noticeable as the scrubber jumping backwards.
 */
export async function updateEpisode(
  id: string,
  patch: Partial<Omit<Episode, "id" | "blob">>,
): Promise<void> {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE, "readwrite");
    const store = transaction.objectStore(STORE);
    const read = store.get(id);
    read.onsuccess = () => {
      const existing = read.result as Episode | undefined;
      if (existing) store.put({ ...existing, ...patch });
    };
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

/** Approximate on-disk usage, for the "using X MB" line in the library. */
export function totalBytes(episodes: Pick<Episode, "sizeBytes">[]): number {
  return episodes.reduce((sum, episode) => sum + episode.sizeBytes, 0);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Duration from an MP3 Blob, by letting the browser decode its metadata.
 *
 * The chunks are stitched at a pinned constant bitrate precisely so this
 * returns a real number — a variable-bitrate concatenation would report
 * Infinity here and give the player an unusable scrubber.
 */
export function readAudioDuration(blob: Blob): Promise<number> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const audio = new Audio();
    const finish = (value: number) => {
      URL.revokeObjectURL(url);
      resolve(Number.isFinite(value) && value > 0 ? value : 0);
    };
    audio.preload = "metadata";
    audio.onloadedmetadata = () => finish(audio.duration);
    audio.onerror = () => finish(0);
    audio.src = url;
  });
}
