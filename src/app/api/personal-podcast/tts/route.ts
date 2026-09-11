import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Text-to-speech relay for /personal-podcast.
 *
 * This exists only because Fish Audio's TTS endpoint cannot be called from a
 * browser: `OPTIONS https://api.fish.audio/v1/tts` returns 404 `no_route`, so
 * the CORS preflight that an `Authorization` header forces will always fail.
 * Voice browsing still goes direct from the client — `api.fish.audio/model`
 * does answer preflights — so this route handles generation and nothing else.
 *
 * What it does: forward one chunk of text, stream the audio straight back.
 *
 * What it must never do: log, store, cache, or otherwise retain the caller's
 * API key or their text. The key belongs to the visitor, is held in their
 * browser, and passes through this function only in flight. The error path
 * below deliberately records a status code and nothing else — do not "improve"
 * it by adding the request body to the log line.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
/**
 * Chunks are sized at ~1,800 characters (≈2 minutes of audio) client-side, which
 * generates well inside this. The ceiling is here so a slow upstream fails
 * cleanly instead of being cut off by the platform default mid-stream.
 */
export const maxDuration = 60;

const requestSchema = z.object({
  apiKey: z.string().trim().min(8).max(256),
  // Generous relative to the client's own chunk size, but bounded: this is the
  // only thing standing between the relay and someone posting a novel.
  text: z.string().min(1).max(5000),
  referenceId: z.string().trim().max(128).nullable().optional(),
  model: z.enum(["s2.1-pro-free", "s2.1-pro"]),
  speed: z.number().min(0.5).max(2).optional(),
});

/**
 * Upstream failures the visitor can actually act on, named so the UI can say
 * "that key didn't work" instead of "something went wrong".
 */
function describeUpstream(status: number): { code: string; error: string } {
  if (status === 401 || status === 403) {
    return {
      code: "invalid_key",
      error: "Fish Audio rejected that API key. Check it and try again.",
    };
  }
  if (status === 402) {
    return {
      code: "payment_required",
      error: "That Fish Audio account is out of credit.",
    };
  }
  if (status === 429) {
    return {
      code: "rate_limited",
      error: "Fish Audio is rate-limiting this key. Give it a moment.",
    };
  }
  if (status === 404) {
    return {
      code: "model_unavailable",
      error: "That voice model is unavailable. Try another voice or model.",
    };
  }
  return {
    code: "upstream_error",
    error: "Fish Audio could not generate this section. Try again.",
  };
}

export async function POST(request: Request) {
  let upstreamStatus = 0;

  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { code: "bad_request", error: "That request wasn't valid." },
        { status: 400 },
      );
    }

    const { apiKey, text, referenceId, model, speed } = parsed.data;

    const upstream = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        model,
      },
      body: JSON.stringify({
        text,
        format: "mp3",
        // Pinned, not defaulted. Every chunk must share a bitrate or the
        // client's concatenation produces a file with an unusable duration.
        mp3_bitrate: 128,
        ...(referenceId ? { reference_id: referenceId } : {}),
        ...(speed && speed !== 1 ? { prosody: { speed } } : {}),
      }),
    });

    upstreamStatus = upstream.status;

    if (!upstream.ok || !upstream.body) {
      const described = describeUpstream(upstream.status);
      // Status only. The response body can echo request content back.
      console.error(
        `personal-podcast tts upstream ${upstream.status} (${described.code})`,
      );
      return NextResponse.json(described, {
        status: upstream.status === 429 ? 429 : 502,
      });
    }

    // Piped straight through: buffering the audio here would hold whole
    // episodes in function memory and add latency for no benefit.
    return new Response(upstream.body, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store, no-transform",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (error) {
    // Only the error's own name/message — never the request. A thrown fetch
    // error does not carry the body, but the parsed payload is in scope here,
    // so this stays deliberately narrow.
    console.error(
      "personal-podcast tts relay failed",
      upstreamStatus,
      error instanceof Error ? error.name : "unknown",
    );
    return NextResponse.json(
      { code: "upstream_error", error: "Audio generation failed. Try again." },
      { status: 502 },
    );
  }
}
