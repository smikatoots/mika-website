import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import type { PageLinkContext } from "@/lib/notion/page-links";
import type { BlockTree } from "@/lib/notion/blocks";
import type { NotionSurface } from "@/lib/notion/surface";
import { siteLink } from "@/lib/ui/site-styles";

import { RichText } from "./RichText";

/** Last N blocks if they are all callouts and N ≥ 3 — rendered as a CTA grid on home. */
function partitionTrailingCallouts(blocks: BlockTree[]): {
  leading: BlockTree[];
  trailing: BlockTree[];
} {
  let i = blocks.length;
  while (i > 0 && blocks[i - 1]?.type === "callout") i -= 1;
  const trailing = blocks.slice(i);
  const leading = blocks.slice(0, i);
  if (trailing.length >= 3) {
    return { leading, trailing };
  }
  return { leading: blocks, trailing: [] };
}

/** Blocks before the first column row = hero (logo + title), left-aligned. Rest goes below columns. */
function partitionHomeLayout(blocks: BlockTree[]): {
  hero: BlockTree[];
  columnList: BlockTree | null;
  rest: BlockTree[];
} {
  const idx = blocks.findIndex((b) => b.type === "column_list");
  if (idx === -1) {
    return { hero: [], columnList: null, rest: blocks };
  }
  return {
    hero: blocks.slice(0, idx),
    columnList: blocks[idx]!,
    rest: blocks.slice(idx + 1),
  };
}

function InternalOrExternal({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={className}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Groups consecutive `numbered_list_item` blocks into a real `<ol>` (Notion order preserved). */
function renderBlockSequence(
  blocks: BlockTree[],
  links: PageLinkContext,
  surface: NotionSurface,
  isTopLevel: boolean,
): ReactNode[] {
  const out: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i]!;
    if (b.type === "numbered_list_item") {
      const run: BlockTree[] = [];
      let j = i;
      while (j < blocks.length && blocks[j]!.type === "numbered_list_item") {
        run.push(blocks[j]!);
        j += 1;
      }
      const olText =
        "list-decimal space-y-3 pl-6 leading-relaxed text-zinc-800 marker:text-zinc-500";
      out.push(
        <ol key={run[0]!.id} className={`my-1 ${olText}`}>
          {run.map((item) => {
            if (item.type !== "numbered_list_item") return null;
            return (
              <li key={item.id} className="pl-1">
                <RichText
                  items={item.numbered_list_item.rich_text}
                  surface={surface}
                />
                <BlockChildren
                  blocks={item.children}
                  links={links}
                  surface={surface}
                />
              </li>
            );
          })}
        </ol>,
      );
      i = j;
    } else {
      out.push(
        <NotionBlock
          key={b.id}
          block={b}
          links={links}
          surface={surface}
          blockIndex={i}
          isTopLevel={isTopLevel}
        />,
      );
      i += 1;
    }
  }
  return out;
}

function BlockChildren({
  blocks,
  links,
  surface,
}: {
  blocks: BlockTree[];
  links: PageLinkContext;
  surface: NotionSurface;
}) {
  if (!blocks.length) return null;
  const borderClass = "border-zinc-200";
  return (
    <div className={`mt-2 space-y-2 border-l ${borderClass} pl-4`}>
      {renderBlockSequence(blocks, links, surface, false)}
    </div>
  );
}

export function NotionBlocks({
  blocks,
  links,
  surface = "default",
}: {
  blocks: BlockTree[];
  links: PageLinkContext;
  surface?: NotionSurface;
}) {
  const rootGap = "space-y-4 md:space-y-5";

  if (surface === "home") {
    const { hero, columnList, rest } = partitionHomeLayout(blocks);
    const { leading, trailing } = partitionTrailingCallouts(rest);
    const afterHeroOffset = hero.length;
    const afterColumnsOffset = afterHeroOffset + (columnList ? 1 : 0);

    const trailingGrid =
      trailing.length > 0 ? (
        <div
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5 md:mt-16"
          aria-label="Quick links"
          role="navigation"
        >
          {trailing.map((b, i) => (
            <NotionBlock
              key={b.id}
              block={b}
              links={links}
              surface={surface}
              blockIndex={afterColumnsOffset + leading.length + i}
              isTopLevel
              ctaGridCell
            />
          ))}
        </div>
      ) : null;

    const leadingBlock = (b: BlockTree, i: number) => (
      <NotionBlock
        key={b.id}
        block={b}
        links={links}
        surface={surface}
        blockIndex={afterColumnsOffset + i}
        isTopLevel
      />
    );

    const leadingWrapClass =
      columnList && leading.length > 0
        ? `${rootGap} mt-10 md:mt-12`
        : rootGap;

    return (
      <>
        {hero.length > 0 ? (
          <header className="mb-10 flex flex-col items-start gap-3 text-left md:mb-14 md:gap-4">
            {hero.map((b, i) => (
              <NotionBlock
                key={b.id}
                block={b}
                links={links}
                surface={surface}
                blockIndex={i}
                isTopLevel
              />
            ))}
          </header>
        ) : null}
        {columnList ? (
          <NotionBlock
            block={columnList}
            links={links}
            surface={surface}
            blockIndex={afterHeroOffset}
            isTopLevel
          />
        ) : null}
        {leading.length > 0 ? (
          <div className={leadingWrapClass}>{leading.map(leadingBlock)}</div>
        ) : null}
        {trailingGrid}
      </>
    );
  }

  return (
    <div className={rootGap}>
      {renderBlockSequence(blocks, links, surface, true)}
    </div>
  );
}

function NotionBlock({
  block,
  links,
  surface,
  blockIndex,
  isTopLevel = false,
  ctaGridCell = false,
}: {
  block: BlockTree;
  links: PageLinkContext;
  surface: NotionSurface;
  blockIndex: number;
  isTopLevel?: boolean;
  ctaGridCell?: boolean;
}) {
  const t = block.type;
  const rt = surface;

  if (t === "paragraph") {
    const pClass = "leading-relaxed text-zinc-800";
    return (
      <p className={pClass}>
        <RichText items={block.paragraph.rich_text} surface={rt} />
        <BlockChildren blocks={block.children} links={links} surface={surface} />
      </p>
    );
  }

  if (t === "heading_1") {
    const homeHero =
      surface === "home"
        ? "mt-1 mb-1 text-4xl font-bold tracking-tight text-zinc-950 md:text-5xl"
        : "mt-10 mb-3 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl";
    return (
      <h2 className={homeHero}>
        <RichText items={block.heading_1.rich_text} surface={rt} />
      </h2>
    );
  }

  if (t === "heading_2") {
    const cls = "mt-8 mb-2 text-xl font-semibold tracking-tight text-zinc-950";
    return (
      <h3 className={cls}>
        <RichText items={block.heading_2.rich_text} surface={rt} />
      </h3>
    );
  }

  if (t === "heading_3") {
    const cls = "mt-6 mb-2 text-lg font-semibold text-zinc-950";
    return (
      <h4 className={cls}>
        <RichText items={block.heading_3.rich_text} surface={rt} />
      </h4>
    );
  }

  if (t === "heading_4") {
    const cls = "mt-5 mb-2 text-base font-semibold text-zinc-900";
    return (
      <h5 className={cls}>
        <RichText items={block.heading_4.rich_text} surface={rt} />
      </h5>
    );
  }

  if (t === "bulleted_list_item") {
    const textCls = "text-zinc-800";
    const bulletCls = "text-zinc-500";
    return (
      <div className={`flex gap-2 ${textCls}`}>
        <span className={`select-none ${bulletCls}`} aria-hidden>
          •
        </span>
        <div className="min-w-0 flex-1">
          <RichText items={block.bulleted_list_item.rich_text} surface={rt} />
          <BlockChildren
            blocks={block.children}
            links={links}
            surface={surface}
          />
        </div>
      </div>
    );
  }

  if (t === "numbered_list_item") {
    const textCls = "text-zinc-800";
    return (
      <div className={`flex gap-2 ${textCls}`}>
        <span className="w-6 shrink-0 text-right text-zinc-500" aria-hidden>
          ◦
        </span>
        <div className="min-w-0 flex-1">
          <RichText items={block.numbered_list_item.rich_text} surface={rt} />
          <BlockChildren
            blocks={block.children}
            links={links}
            surface={surface}
          />
        </div>
      </div>
    );
  }

  if (t === "to_do") {
    const checked = block.to_do.checked;
    const textCls = "text-zinc-800";
    return (
      <div className={`flex gap-2 ${textCls}`}>
        <span aria-hidden className="select-none text-zinc-500">
          {checked ? "☑" : "☐"}
        </span>
        <span className={checked ? "line-through opacity-60" : ""}>
          <RichText items={block.to_do.rich_text} surface={rt} />
        </span>
        <BlockChildren
          blocks={block.children}
          links={links}
          surface={surface}
        />
      </div>
    );
  }

  if (t === "toggle") {
    return (
      <details className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
        <summary className="cursor-pointer font-medium text-zinc-900">
          <RichText items={block.toggle.rich_text} surface={rt} />
        </summary>
        <div className="mt-2">
          <BlockChildren
            blocks={block.children}
            links={links}
            surface={surface}
          />
        </div>
      </details>
    );
  }

  if (t === "quote") {
    return (
      <blockquote className="border-l-4 border-teal-500 pl-4 italic text-zinc-600">
        <RichText items={block.quote.rich_text} surface={rt} />
        <BlockChildren
          blocks={block.children}
          links={links}
          surface={surface}
        />
      </blockquote>
    );
  }

  if (t === "divider") {
    return <hr className="my-8 border-zinc-200" />;
  }

  if (t === "code") {
    return (
      <pre className="my-4 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-900">
        <code>
          <RichText items={block.code.rich_text} surface={rt} />
        </code>
      </pre>
    );
  }

  if (t === "callout") {
    if (surface === "home") {
      const cell =
        "flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3.5 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50/80";
      return (
        <div
          className={
            ctaGridCell ? `h-full min-h-[3.25rem] ${cell}` : `my-3 ${cell}`
          }
        >
          {block.callout.icon?.type === "emoji" ? (
            <span className="shrink-0 text-xl" aria-hidden>
              {block.callout.icon.emoji}
            </span>
          ) : (
            <span className="shrink-0 text-zinc-500" aria-hidden>
              ◆
            </span>
          )}
          <div className="min-w-0 flex-1 font-medium text-zinc-900">
            <RichText items={block.callout.rich_text} surface={rt} />
            <BlockChildren
              blocks={block.children}
              links={links}
              surface={surface}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="my-4 flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
        {block.callout.icon?.type === "emoji" ? (
          <span className="text-xl" aria-hidden>
            {block.callout.icon.emoji}
          </span>
        ) : (
          <span className="shrink-0 text-zinc-500" aria-hidden>
            ◆
          </span>
        )}
        <div className="min-w-0 flex-1 text-zinc-800">
          <RichText items={block.callout.rich_text} surface={rt} />
          <BlockChildren
            blocks={block.children}
            links={links}
            surface={surface}
          />
        </div>
      </div>
    );
  }

  if (t === "image") {
    const src =
      block.image.type === "external"
        ? block.image.external.url
        : block.image.file.url;
    const caption = block.image.caption;
    const avatarLike =
      surface === "home" && isTopLevel && blockIndex === 0;
    const rounded = avatarLike
      ? "rounded-full border-2 border-zinc-300 bg-white"
      : "rounded-lg border border-zinc-200";
    return (
      <figure
        className={
          avatarLike ? "my-5 flex justify-start" : "my-6"
        }
      >
        <Image
          src={src}
          alt={caption.map((c) => c.plain_text).join("") || ""}
          width={avatarLike ? 160 : 1200}
          height={avatarLike ? 160 : 630}
          className={`h-auto max-w-full object-cover ${rounded} ${avatarLike ? "h-36 w-36 md:h-44 md:w-44" : ""}`}
          unoptimized
        />
        {caption.length > 0 ? (
          <figcaption
            className={
              surface === "home"
                ? "mt-2 text-left text-sm text-zinc-500"
                : "mt-2 text-center text-sm text-zinc-600"
            }
          >
            <RichText items={caption} surface={rt} />
          </figcaption>
        ) : null}
      </figure>
    );
  }

  if (t === "bookmark") {
    const url = block.bookmark.url;
    return (
      <a
        href={url}
        className={`my-4 block rounded-xl border border-zinc-200 bg-white p-4 ${siteLink} hover:border-zinc-300 hover:bg-zinc-50`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {url}
        {block.bookmark.caption.length > 0 ? (
          <div className="mt-1 text-sm text-zinc-500">
            <RichText items={block.bookmark.caption} surface={rt} />
          </div>
        ) : null}
      </a>
    );
  }

  if (t === "video") {
    const url =
      block.video.type === "external"
        ? block.video.external.url
        : block.video.file.url;
    return (
      <div className="my-4 aspect-video w-full overflow-hidden rounded-lg border border-zinc-200">
        <iframe
          title="Video"
          src={url}
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    );
  }

  if (t === "embed") {
    return (
      <a
        href={block.embed.url}
        className={`my-4 block ${siteLink}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {block.embed.url}
      </a>
    );
  }

  if (t === "column_list") {
    const grid =
      surface === "home"
        ? "my-8 grid items-start gap-12 md:my-10 md:grid-cols-2 md:gap-x-20 lg:gap-x-28 lg:gap-y-2"
        : "my-8 grid items-start gap-8 md:grid-cols-2 md:gap-x-12";
    return (
      <div className={grid}>
        {block.children.map((b, j) => (
          <NotionBlock
            key={b.id}
            block={b}
            links={links}
            surface={surface}
            blockIndex={j}
            isTopLevel={false}
          />
        ))}
      </div>
    );
  }

  if (t === "column") {
    return (
      <div className="min-w-0 space-y-2 md:space-y-3">
        <BlockChildren blocks={block.children} links={links} surface={surface} />
      </div>
    );
  }

  if (t === "child_page") {
    const href = links.hrefForPageId(block.id);
    const label =
      block.child_page.title ||
      links.labelForPageId(block.id) ||
      "Page";
    if (surface === "home") {
      return (
        <div className="my-0.5">
          <InternalOrExternal
            href={href}
            className="block py-1.5 text-zinc-900 underline decoration-zinc-400 underline-offset-[5px] transition-colors hover:decoration-zinc-900"
          >
            {label}
          </InternalOrExternal>
          <BlockChildren
            blocks={block.children}
            links={links}
            surface={surface}
          />
        </div>
      );
    }
    return (
      <div className="my-2">
        <InternalOrExternal
          href={href}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          <span aria-hidden className="text-zinc-500">
            📄
          </span>
          {label}
        </InternalOrExternal>
        <BlockChildren
          blocks={block.children}
          links={links}
          surface={surface}
        />
      </div>
    );
  }

  if (t === "child_database") {
    const href = links.hrefForPageId(block.id);
    const label = block.child_database.title || "Database";
    if (surface === "home") {
      return (
        <div className="my-0.5">
          <InternalOrExternal
            href={href}
            className="block py-1.5 text-zinc-900 underline decoration-zinc-400 underline-offset-[5px] hover:decoration-zinc-900"
          >
            {label}
          </InternalOrExternal>
        </div>
      );
    }
    return (
      <div className="my-2">
        <InternalOrExternal
          href={href}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
        >
          <span aria-hidden className="text-zinc-500">
            🗂
          </span>
          {label}
        </InternalOrExternal>
      </div>
    );
  }

  if (t === "link_to_page") {
    const ltp = block.link_to_page;
    if (ltp.type === "page_id") {
      const href = links.hrefForPageId(ltp.page_id);
      const label =
        links.labelForPageId(ltp.page_id) ?? "Linked page";
      const cls =
        surface === "home"
          ? "font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-[5px] hover:decoration-zinc-900"
          : siteLink;
      return (
        <div className={surface === "home" ? "my-0.5" : "my-2"}>
          <InternalOrExternal href={href} className={cls}>
            {label}
          </InternalOrExternal>
        </div>
      );
    }
    if (ltp.type === "database_id") {
      const blogLink =
        surface === "home"
          ? "font-medium text-teal-700 underline underline-offset-2 hover:text-teal-900"
          : siteLink;
      return (
        <div
          className={
            surface === "home" ? "my-2 text-sm text-zinc-600" : "my-2 text-sm text-zinc-600"
          }
        >
          <Link href="/blog" className={blogLink}>
            View blog database →
          </Link>
        </div>
      );
    }
    return null;
  }

  if (t === "table") {
    return (
      <div className="my-4 overflow-x-auto">
        <BlockChildren
          blocks={block.children}
          links={links}
          surface={surface}
        />
      </div>
    );
  }

  if (t === "table_row") {
    const rowBorder = "border-zinc-200";
    const cellText = "text-zinc-800";
    return (
      <div className={`flex gap-4 border-b ${rowBorder} py-2`}>
        {block.table_row.cells.map((cell, i) => (
          <div key={i} className={`min-w-0 flex-1 text-sm ${cellText}`}>
            <RichText items={cell} surface={rt} />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
