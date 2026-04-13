import type { MDXComponents } from "mdx/types";

import { siteLink } from "@/lib/ui/site-styles";

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
  p: (props) => (
    <p className="mb-5 leading-relaxed text-zinc-800" {...props} />
  ),
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
      className="my-4 border-l-4 border-teal-500 pl-4 italic text-zinc-600"
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const inline = !className;
    if (inline) {
      return (
        <code
          className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em] text-zinc-900 ring-1 ring-zinc-200/80"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`text-sm text-zinc-900 ${className ?? ""}`} {...props}>
        {children}
      </code>
    );
  },
  pre: (props) => (
    <pre className="my-4 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-900">
      {props.children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-zinc-200" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 max-h-[480px] w-full rounded-lg border border-zinc-200 object-contain"
      alt={props.alt ?? ""}
      {...props}
    />
  ),
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
