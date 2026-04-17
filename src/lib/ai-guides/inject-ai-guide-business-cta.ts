import matter from "gray-matter";

const CTA_BLOCK = "\n\n<AiGuideBusinessCtaBlock />\n\n";

function stripExistingBusinessCta(body: string): string {
  return body
    .replace(/\n*<AiGuideBusinessCtaBlock\s*\/>/g, "\n")
    .replace(/\n{3,}/g, "\n\n");
}

function findBusinessCtaInsertIndex(body: string): number {
  const additionalReading = body.match(/\n##\s+Additional Reading\b/im);
  if (additionalReading?.index !== undefined) {
    return additionalReading.index;
  }

  const relatedHeading = body.match(/\n##\s+Related\b/i);
  if (relatedHeading?.index !== undefined) {
    return relatedHeading.index;
  }

  const relatedGuidesList = body.match(
    /\n(?:---\s*\n+)?Here are some related guides to check out:\s*/i,
  );
  if (relatedGuidesList?.index !== undefined) {
    return relatedGuidesList.index;
  }

  const lastH2 = body.lastIndexOf("\n## ");
  if (lastH2 !== -1) {
    return lastH2;
  }

  return body.length;
}

/** Injects `AiGuideBusinessCtaBlock` once, before related-reading sections when detectable. */
export function injectAiGuideBusinessCtaSource(rawSource: string): string {
  const file = matter(rawSource);
  const body = stripExistingBusinessCta(file.content);
  const idx = findBusinessCtaInsertIndex(body);
  const newBody = `${body.slice(0, idx)}${CTA_BLOCK}${body.slice(idx)}`.trimEnd();
  return matter.stringify(`${newBody}\n`, file.data);
}
