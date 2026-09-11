/**
 * Fish Audio client, split across two transports for one specific reason.
 *
 * Voice browsing talks to Fish directly from the browser: `api.fish.audio/model`
 * answers CORS preflights and needs no auth, so proxying it would only add a
 * hop.
 *
 * Speech generation cannot. `OPTIONS https://api.fish.audio/v1/tts` returns
 * 404 `no_route` — there is no preflight handler — and any request carrying an
 * `Authorization` header triggers a preflight by definition. So generation goes
 * through `/api/personal-podcast/tts`, a relay on this origin. See that route
 * for what it does and does not do with the key.
 */

/** Audio settings pinned so that separately generated chunks concatenate. */
export const AUDIO_FORMAT = "mp3" as const;
export const MP3_BITRATE = 128 as const;

export const TTS_MODELS = [
  {
    id: "s2.1-pro-free",
    label: "Free",
    blurb: "No cost. Best-effort speed, no uptime guarantee.",
  },
  {
    id: "s2.1-pro",
    label: "Paid",
    blurb: "About $0.015 per 1,000 characters. Faster and guaranteed.",
  },
] as const;

export type TtsModelId = (typeof TTS_MODELS)[number]["id"];
export const DEFAULT_MODEL: TtsModelId = "s2.1-pro-free";

/**
 * Fish's most-used voices are game announcers and film characters, which are
 * unlistenable across twenty minutes of an article. These are picked for
 * long-form reading — the thing this tool is actually for — and search is there
 * for everyone who wants something else.
 */
export const CURATED_VOICE_IDS = [
  "f6a19fe5ab494e1fa51bb1476d583a44", // Abby — US woman, audiobook
  "e686ae649ee44f219a108aacba206c1a", // calm storyteller male
  "c3958f083c2d407982263c77cfa831e3", // Documentary
  "30c0f62e3e6d45d88387d1b8f84e1685", // Liam — calm British
  "57785406027844b29b63a772a8477bc2", // Friendly podcast host (female)
  "63d5460e91e2411fa2e6bf95e7456f03", // Anchor News
] as const;

export type FishVoice = {
  id: string;
  title: string;
  /**
   * Presigned and valid for about an hour, so it is fetched fresh each session
   * and never persisted.
   */
  sampleUrl: string | null;
  tags: string[];
  languages: string[];
};

type FishModelResponse = {
  _id: string;
  title: string;
  tags?: string[];
  languages?: string[];
  samples?: { audio?: string }[];
};

function toVoice(model: FishModelResponse): FishVoice {
  return {
    id: model._id,
    title: model.title,
    sampleUrl: model.samples?.[0]?.audio ?? null,
    tags: model.tags ?? [],
    languages: model.languages ?? [],
  };
}

const FISH_API = "https://api.fish.audio";

export async function fetchVoice(
  id: string,
  signal?: AbortSignal,
): Promise<FishVoice | null> {
  const response = await fetch(`${FISH_API}/model/${id}`, { signal });
  if (!response.ok) return null;
  return toVoice((await response.json()) as FishModelResponse);
}

export async function fetchCuratedVoices(
  signal?: AbortSignal,
): Promise<FishVoice[]> {
  const results = await Promise.all(
    CURATED_VOICE_IDS.map((id) => fetchVoice(id, signal).catch(() => null)),
  );
  return results.filter((voice): voice is FishVoice => voice !== null);
}

export async function searchVoices(
  query: string,
  signal?: AbortSignal,
): Promise<FishVoice[]> {
  const params = new URLSearchParams({
    title: query,
    page_size: "12",
    sort_by: "task_count",
    visibility: "public",
  });
  const response = await fetch(`${FISH_API}/model?${params}`, { signal });
  if (!response.ok) throw new Error("Voice search is unavailable right now.");
  const data = (await response.json()) as { items?: FishModelResponse[] };
  return (data.items ?? []).map(toVoice);
}

/* ------------------------------------------------------------------ */
/* Generation                                                          */
/* ------------------------------------------------------------------ */

export type TtsErrorCode =
  | "invalid_key"
  | "payment_required"
  | "rate_limited"
  | "model_unavailable"
  | "upstream_error"
  | "network";

export class TtsError extends Error {
  code: TtsErrorCode;
  constructor(code: TtsErrorCode, message: string) {
    super(message);
    this.name = "TtsError";
    this.code = code;
  }
}

export type GenerateOptions = {
  apiKey: string;
  text: string;
  referenceId: string | null;
  model: TtsModelId;
  speed: number;
  signal?: AbortSignal;
};

/** One chunk of text -> one MP3 buffer, via the relay. */
export async function generateChunk({
  apiKey,
  text,
  referenceId,
  model,
  speed,
  signal,
}: GenerateOptions): Promise<ArrayBuffer> {
  let response: Response;
  try {
    response = await fetch("/api/personal-podcast/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey, text, referenceId, model, speed }),
      signal,
    });
  } catch (error) {
    if (signal?.aborted) throw error;
    throw new TtsError("network", "Lost connection. Check your network and retry.");
  }

  if (!response.ok) {
    const payload = (await response
      .json()
      .catch(() => ({}))) as { code?: TtsErrorCode; error?: string };
    throw new TtsError(
      payload.code ?? "upstream_error",
      payload.error ?? "Audio generation failed.",
    );
  }

  return response.arrayBuffer();
}

/** Errors worth a second attempt: transient upstream conditions, not bad input. */
const RETRYABLE: ReadonlySet<TtsErrorCode> = new Set([
  "rate_limited",
  "upstream_error",
  "network",
]);

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fish allows 5 concurrent requests on accounts under $100 lifetime spend.
 * Three leaves headroom for whatever else the key is being used for, and a
 * 429 storm costs more time than the parallelism saves.
 */
const MAX_CONCURRENCY = 3;

export type GenerationProgress = {
  completed: number;
  total: number;
};

/**
 * Generate every chunk and return the buffers in reading order.
 *
 * Order matters more than it looks: the buffers are concatenated into a single
 * MP3, so a race that returns chunk 7 before chunk 4 would silently produce an
 * episode that jumps around mid-sentence. Workers therefore claim indices and
 * write into a pre-sized array rather than pushing as they finish.
 */
export async function generateEpisode({
  chunks,
  apiKey,
  referenceId,
  model,
  speed,
  signal,
  onProgress,
  onChunk,
}: {
  chunks: string[];
  apiKey: string;
  referenceId: string | null;
  model: TtsModelId;
  speed: number;
  signal?: AbortSignal;
  onProgress?: (progress: GenerationProgress) => void;
  onChunk?: (index: number, buffer: ArrayBuffer) => void;
}): Promise<ArrayBuffer[]> {
  const buffers = new Array<ArrayBuffer | undefined>(chunks.length);
  let nextIndex = 0;
  let completed = 0;

  async function worker() {
    for (;;) {
      const index = nextIndex++;
      if (index >= chunks.length) return;
      if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

      let attempt = 0;
      for (;;) {
        try {
          const buffer = await generateChunk({
            apiKey,
            text: chunks[index],
            referenceId,
            model,
            speed,
            signal,
          });
          buffers[index] = buffer;
          completed += 1;
          onChunk?.(index, buffer);
          onProgress?.({ completed, total: chunks.length });
          break;
        } catch (error) {
          const retryable =
            error instanceof TtsError && RETRYABLE.has(error.code);
          if (!retryable || attempt >= 1 || signal?.aborted) throw error;
          attempt += 1;
          await delay(1_500);
        }
      }
    }
  }

  const workerCount = Math.min(MAX_CONCURRENCY, chunks.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  return buffers.filter((buffer): buffer is ArrayBuffer => buffer !== undefined);
}

/**
 * Stitch chunk buffers into one playable file.
 *
 * Every chunk is requested at a fixed 128kbps, so the frames share a header and
 * concatenate into a valid constant-bitrate MP3. That is what lets browsers and
 * podcast apps estimate the duration correctly; leaving the bitrate on default
 * would produce a file whose scrubber does not work.
 */
export function stitchMp3(buffers: ArrayBuffer[]): Blob {
  return new Blob(buffers, { type: "audio/mpeg" });
}
