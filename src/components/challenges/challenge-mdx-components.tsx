import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { blogMdxComponents } from "@/components/blog/blog-mdx-components";
import { ImageColumns } from "@/components/challenges/ImageColumns";

function ChallengeDetails({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"details">) {
  return (
    <details
      className={`group mt-10 first:mt-0${className ? ` ${className}` : ""}`}
      {...props}
    >
      {children}
    </details>
  );
}

function ChallengeSummary({
  children,
  ...props
}: ComponentPropsWithoutRef<"summary">) {
  return (
    <summary
      className="flex cursor-pointer list-none items-center justify-between gap-3 text-2xl font-semibold tracking-tight text-zinc-950 marker:content-none md:text-3xl [&::-webkit-details-marker]:hidden"
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="shrink-0 text-sm text-zinc-400 transition-transform duration-200 group-open:rotate-180"
      >
        ▾
      </span>
    </summary>
  );
}

export const challengeMdxComponents: MDXComponents = {
  ...blogMdxComponents,
  details: ChallengeDetails,
  summary: ChallengeSummary,
  ImageColumns,
};
