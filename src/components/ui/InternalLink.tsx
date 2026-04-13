import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type InternalLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof LinkProps> & {
    children: ReactNode;
  };

/**
 * Default to non-eager prefetching so dense link lists don't trigger a burst
 * of route/data fetches on first paint.
 */
export function InternalLink({
  prefetch = false,
  children,
  ...props
}: InternalLinkProps) {
  return (
    <Link prefetch={prefetch} {...props}>
      {children}
    </Link>
  );
}
