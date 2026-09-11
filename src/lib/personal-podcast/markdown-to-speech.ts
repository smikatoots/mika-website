/**
 * Markdown/plain text -> something worth listening to.
 *
 * A text-to-speech engine reads what you give it literally, so raw Markdown
 * comes out as "hash hash Getting Started" and a code fence becomes ninety
 * seconds of punctuation. This module strips the syntax and keeps the prose.
 *
 * Deliberately regex-based rather than AST-based: the output is speech, not
 * HTML, so structural fidelity does not matter — only the words and the pauses
 * between them. That makes a full Markdown parser (and the dependency it drags
 * in) the wrong trade for maybe eighty lines of replacements.
 */

/** Words per minute a typical listener is comfortable with at 1x speed. */
const WORDS_PER_MINUTE = 150;

/** Fish Audio bills per 1,000 UTF-8 bytes. */
const USD_PER_1K_BYTES = 0.015;

/**
 * Target characters per request. Roughly two minutes of audio, which keeps a
 * single generation comfortably inside the route handler's 60s budget while
 * still being long enough that the voice keeps its prosody across sentences.
 */
export const TARGET_CHUNK_CHARS = 1_800;

/** Never exceed this in one request, even if a single sentence is longer. */
const MAX_CHUNK_CHARS = 2_400;

/**
 * Headings become their own sentence so the voice drops pitch and pauses,
 * the way a narrator would at a section break. Without the trailing period
 * the engine runs the heading straight into the first sentence beneath it.
 */
function headingToSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  return /[.!?:;]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

export function markdownToSpeech(input: string): string {
  let text = input.replace(/^﻿/, "").replace(/\r\n?/g, "\n");

  // Front matter first — it is metadata, never meant to be read aloud.
  text = text.replace(/^---\n[\s\S]*?\n---\n/, "");

  // Fenced code before anything else, so no later rule sees its contents.
  text = text.replace(/^[ \t]*(```|~~~)[^\n]*\n[\s\S]*?^[ \t]*\1[^\n]*$/gm, "");
  // An unterminated fence swallows the rest of the document rather than
  // leaking raw code into the audio.
  text = text.replace(/^[ \t]*(```|~~~)[^\n]*\n[\s\S]*$/m, "");

  // HTML comments, then tags. <br> becomes a break, everything else vanishes.
  text = text.replace(/<!--[\s\S]*?-->/g, "");
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/?[a-z][^>]*>/gi, "");

  // Images carry no spoken value; alt text read aloud sounds like an error.
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  text = text.replace(/!\[[^\]]*\]\[[^\]]*\]/g, "");

  // Links keep their label and drop the URL. Nobody wants a URL read to them.
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");
  text = text.replace(/^\[[^\]]+\]:\s*\S+.*$/gm, ""); // link reference definitions
  text = text.replace(/<(https?:\/\/[^>]+)>/g, "");

  // Footnote markers and definitions.
  text = text.replace(/\[\^[^\]]+\]:?/g, "");

  // Inline code keeps the identifier, loses the backticks.
  text = text.replace(/`{1,3}([^`\n]+)`{1,3}/g, "$1");

  // Horizontal rules.
  text = text.replace(/^[ \t]*([-*_])(?:[ \t]*\1){2,}[ \t]*$/gm, "");

  // Tables: drop the alignment row, read cells as a comma-separated list.
  text = text.replace(/^[ \t]*\|?[ \t]*:?-{2,}:?[ \t]*(\|[ \t]*:?-{2,}:?[ \t]*)*\|?[ \t]*$/gm, "");
  text = text.replace(/^[ \t]*\|(.+)\|[ \t]*$/gm, (_match, row: string) =>
    headingToSentence(
      row
        .split("|")
        .map((cell) => cell.trim())
        .filter(Boolean)
        .join(", "),
    ),
  );

  // Headings -> standalone sentences with breathing room either side.
  text = text.replace(/^[ \t]{0,3}#{1,6}[ \t]+(.+?)[ \t]*#*[ \t]*$/gm, (_m, heading: string) =>
    `\n${headingToSentence(heading)}\n`,
  );
  // Setext headings (underlined with === or ---).
  text = text.replace(/^(.+)\n[=-]{3,}[ \t]*$/gm, (_m, heading: string) =>
    `\n${headingToSentence(heading)}\n`,
  );

  // Blockquote markers, list bullets, numbered list markers, task boxes.
  text = text.replace(/^[ \t]*>[ \t]?/gm, "");
  text = text.replace(/^[ \t]*[-*+][ \t]+(?:\[[ xX]\][ \t]+)?/gm, "");
  text = text.replace(/^[ \t]*\d+[.)][ \t]+/gm, "");

  // Emphasis, strikethrough, highlight.
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?;:]|$)/g, "$1$2");
  text = text.replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,!?;:]|$)/g, "$1$2");
  text = text.replace(/~~([^~]+)~~/g, "$1");
  text = text.replace(/==([^=]+)==/g, "$1");

  // Leftover escapes: \* -> *
  text = text.replace(/\\([\\`*_{}[\]()#+\-.!>])/g, "$1");

  // Tidy up after the removals above. Deleting an image or a bare URL leaves
  // the punctuation that followed it stranded ("and an ." / "( )"), and a
  // stranded period is a full stop the voice actually pauses on.
  text = text.replace(/\(\s*\)/g, "");
  text = text.replace(/[ \t]+([.,;:!?])/g, "$1");
  text = text.replace(/([.,;:!?])\1{2,}/g, "$1");

  // Whitespace normalisation. Blank lines survive as paragraph breaks because
  // the chunker splits on them and the engine pauses at them.
  text = text
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    // A line reduced to nothing but punctuation is debris from a removal.
    .map((line) => (/^[\s.,;:!?()\[\]{}'"-]*$/.test(line) ? "" : line))
    .join("\n");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

/** Split a long paragraph at sentence boundaries. */
function splitSentences(paragraph: string): string[] {
  const parts = paragraph.match(/[^.!?]+(?:[.!?]+["')\]]*|\s*$)/g);
  return parts ? parts.map((s) => s.trim()).filter(Boolean) : [paragraph];
}

/** Last resort for a single sentence longer than the hard cap. */
function splitOnWords(sentence: string, limit: number): string[] {
  const words = sentence.split(" ");
  const out: string[] = [];
  let current = "";
  for (const word of words) {
    if (current && current.length + 1 + word.length > limit) {
      out.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) out.push(current);
  return out;
}

/**
 * Break speakable text into request-sized pieces, preferring paragraph breaks,
 * then sentence breaks, then (never, in practice) word boundaries. Splitting
 * mid-sentence is audible — the voice restarts its intonation — so the whole
 * point is to fall back as rarely as possible.
 */
export function chunkForSpeech(
  text: string,
  targetChars: number = TARGET_CHUNK_CHARS,
): string[] {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const pieces: string[] = [];
  for (const paragraph of paragraphs) {
    if (paragraph.length <= targetChars) {
      pieces.push(paragraph);
      continue;
    }
    for (const sentence of splitSentences(paragraph)) {
      if (sentence.length <= MAX_CHUNK_CHARS) pieces.push(sentence);
      else pieces.push(...splitOnWords(sentence, targetChars));
    }
  }

  // Pack consecutive pieces back up to the target so we make as few requests
  // as possible — each request is a network round trip and a chance to fail.
  const chunks: string[] = [];
  let current = "";
  for (const piece of pieces) {
    const joined = current ? `${current}\n\n${piece}` : piece;
    if (current && joined.length > targetChars) {
      chunks.push(current);
      current = piece;
    } else {
      current = joined;
    }
  }
  if (current.trim()) chunks.push(current);

  return chunks;
}

export type TextStats = {
  characters: number;
  /** Fish Audio bills UTF-8 bytes, which exceeds character count for non-ASCII. */
  bytes: number;
  words: number;
  /** Estimated listen time in minutes at 1x. */
  minutes: number;
  estimatedCostUsd: number;
  chunkCount: number;
};

export function textStats(
  text: string,
  targetChars: number = TARGET_CHUNK_CHARS,
): TextStats {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const bytes = new TextEncoder().encode(trimmed).length;
  return {
    characters: trimmed.length,
    bytes,
    words,
    minutes: words / WORDS_PER_MINUTE,
    estimatedCostUsd: (bytes / 1000) * USD_PER_1K_BYTES,
    chunkCount: trimmed ? chunkForSpeech(trimmed, targetChars).length : 0,
  };
}

/** "4 min" / "1 hr 12 min" — for listen-time labels. */
export function formatMinutes(minutes: number): string {
  const total = Math.max(1, Math.round(minutes));
  if (total < 60) return `${total} min`;
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

/** "0:00" / "1:04:09" — for the player's clock. */
export function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const secs = whole % 60;
  const paddedSecs = String(secs).padStart(2, "0");
  if (hours) return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSecs}`;
  return `${minutes}:${paddedSecs}`;
}

/** Under a cent reads as "less than $0.01" rather than "$0.00" (which looks free). */
export function formatCost(usd: number): string {
  if (usd <= 0) return "$0.00";
  if (usd < 0.01) return "less than $0.01";
  return `$${usd.toFixed(2)}`;
}

/** A filename or first heading makes a better episode title than "Untitled". */
export function deriveTitle(fileName: string, speechText: string): string {
  const fromFile = fileName.replace(/\.(md|markdown|txt|text)$/i, "").trim();
  if (fromFile) {
    return fromFile.replace(/[-_]+/g, " ").replace(/\s+/g, " ").slice(0, 120);
  }
  const firstLine = speechText.split("\n").find((line) => line.trim());
  return firstLine ? firstLine.trim().slice(0, 120) : "Untitled episode";
}
