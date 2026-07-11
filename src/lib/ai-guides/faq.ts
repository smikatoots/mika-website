import type { AiGuideFaqItem } from "./types";

/**
 * Coerce a raw frontmatter `faq` value into clean {question, answer} pairs.
 * compileMDX casts frontmatter without validating it, so treat the input as
 * untrusted: drop anything that isn't a pair of non-empty strings.
 */
export function normalizeAiGuideFaq(value: unknown): AiGuideFaqItem[] {
  if (!Array.isArray(value)) return [];
  const items: AiGuideFaqItem[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const rec = raw as Record<string, unknown>;
    const question =
      typeof rec.question === "string" ? rec.question.trim() : "";
    const answer = typeof rec.answer === "string" ? rec.answer.trim() : "";
    if (question && answer) items.push({ question, answer });
  }
  return items;
}
