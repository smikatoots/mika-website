/**
 * MDX treats `<` as the start of JSX. Prose like `<10th` or `<3` fails compile
 * ("Unexpected character `1` before name"). Replaces `<` + digit with `&lt;`
 * outside ``` fenced ``` blocks so output still renders as `<` in the browser.
 */

export function escapeLessThanBeforeDigitsForMdx(markdown: string): string {
  const lines = markdown.split("\n");
  let inFence = false;
  const out: string[] = [];

  for (const line of lines) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    out.push(line.replace(/<(\d)/g, "&lt;$1"));
  }

  return out.join("\n");
}
