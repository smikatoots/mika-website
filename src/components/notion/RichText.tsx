import type { RichTextItemResponse } from "@notionhq/client";
import type { ReactNode } from "react";
import { Fragment } from "react";

import type { NotionSurface } from "@/lib/notion/surface";

const linkClass: Record<NotionSurface, string> = {
  default:
    "text-teal-400 underline decoration-teal-500/50 underline-offset-[3px] hover:decoration-teal-300",
  home:
    "text-zinc-900 underline decoration-zinc-400 underline-offset-[3px] hover:decoration-zinc-900",
};

const codeClass: Record<NotionSurface, string> = {
  default: "rounded bg-zinc-800 px-1 py-0.5 text-[0.9em] text-zinc-200",
  home: "rounded bg-zinc-100 px-1 py-0.5 text-[0.9em] text-zinc-900 ring-1 ring-zinc-200/80",
};

/** Preserves Notion soft line breaks inside one rich_text run. */
function TextWithLineBreaks({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}

function RichTextFragment({
  fragment,
  surface,
}: {
  fragment: RichTextItemResponse;
  surface: NotionSurface;
}) {
  if (fragment.type !== "text") {
    return (
      <span className="text-zinc-500">
        [{fragment.type}]
      </span>
    );
  }
  const { content, link } = fragment.text;
  const { bold, italic, strikethrough, underline, code } = fragment.annotations;

  let node: ReactNode = <TextWithLineBreaks text={content} />;

  if (code) {
    node = (
      <code className={codeClass[surface]}>
        <TextWithLineBreaks text={content} />
      </code>
    );
  } else {
    if (bold) node = <strong>{node}</strong>;
    if (italic) node = <em>{node}</em>;
    if (strikethrough) node = <s>{node}</s>;
    if (underline) node = <u>{node}</u>;
  }

  if (link?.url) {
    node = (
      <a
        href={link.url}
        className={linkClass[surface]}
        rel="noopener noreferrer"
        target={link.url.startsWith("http") ? "_blank" : undefined}
      >
        {node}
      </a>
    );
  }

  return <>{node}</>;
}

export function RichText({
  items,
  surface = "default",
}: {
  items: RichTextItemResponse[];
  surface?: NotionSurface;
}) {
  if (!items.length) return null;
  return (
    <>
      {items.map((item, i) => (
        <RichTextFragment key={i} fragment={item} surface={surface} />
      ))}
    </>
  );
}
