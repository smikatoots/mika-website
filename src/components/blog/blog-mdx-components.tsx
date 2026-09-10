import type { MDXComponents } from "mdx/types";
import { Children, isValidElement, type ReactNode } from "react";

import { siteLink } from "@/lib/ui/site-styles";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { MdxImage } from "@/components/blog/MdxImage";
import { getPublicImageDimensions } from "@/lib/blog/image-dimensions";

type MdxImgProps = {
  src?: string;
  alt?: string;
  title?: string;
};

// Looks up precomputed intrinsic image dimensions so the client <img> can
// reserve its box and avoid layout shift.
function MdxImageWithDimensions({ src, ...rest }: MdxImgProps) {
  const dimensions = src ? getPublicImageDimensions(src) : null;
  return (
    <MdxImage
      src={src}
      {...rest}
      width={dimensions?.width}
      height={dimensions?.height}
    />
  );
}

function isImageOnlyParagraph(children: ReactNode): boolean {
  const meaningful = Children.toArray(children).filter((child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).trim().length > 0;
    }
    return isValidElement(child);
  });

  if (meaningful.length !== 1) {
    return false;
  }

  const only = meaningful[0];
  if (!isValidElement(only)) {
    return false;
  }

  const props = only.props as { src?: string };
  return typeof props.src === "string";
}

export const blogMdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="mt-10 text-3xl font-semibold tracking-tight text-zinc-950 first:mt-0 md:text-4xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 text-xl font-semibold tracking-tight text-zinc-950"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="mt-6 text-lg font-semibold text-zinc-900" {...props} />
  ),
  p: ({ children, ...props }) => {
    if (isImageOnlyParagraph(children)) {
      return <>{children}</>;
    }

    return (
      <p className="mb-5 leading-relaxed text-zinc-800" {...props}>
        {children}
      </p>
    );
  },
  a: (props) => <a className={siteLink} {...props} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-zinc-800" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-zinc-800" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 border-accent pl-4 italic text-zinc-600"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const inline = !className;
    if (inline) {
      return (
        <code
          className="rounded-[var(--mr-radius-card)] border border-[var(--mr-border)] bg-[var(--mr-sand)] px-1.5 py-0.5 text-[0.9em] text-[var(--mr-ink)]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className ?? ""} {...props}>
        {children}
      </code>
    );
  },
  pre: (props) => <CodeBlock>{props.children}</CodeBlock>,
  hr: () => <hr className="my-10 border-zinc-200" />,
  img: (props) => <MdxImageWithDimensions {...props} />,
  strong: (props) => (
    <strong className="font-semibold text-zinc-950" {...props} />
  ),
  em: (props) => <em className="italic" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm text-zinc-800"
        {...props}
      />
    </div>
  ),
  th: (props) => (
    <th
      className="border border-zinc-200 bg-zinc-100 px-3 py-2 font-semibold text-zinc-950"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-zinc-200 px-3 py-2" {...props} />
  ),
};
