"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { trackGa4Event, type Ga4EventParams } from "@/lib/analytics/ga4";

type AnalyticsProps = {
  ga4EventName: string;
  ga4Params: Ga4EventParams;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

type Ga4TrackedAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> &
  AnalyticsProps & {
    href: string;
    children: ReactNode;
  };

export function Ga4TrackedAnchor({
  ga4EventName,
  ga4Params,
  onClick,
  children,
  ...props
}: Ga4TrackedAnchorProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    trackGa4Event(ga4EventName, ga4Params);
  }

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}

type Ga4TrackedInternalLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "onClick"> &
  AnalyticsProps & {
    children: ReactNode;
  };

export function Ga4TrackedInternalLink({
  ga4EventName,
  ga4Params,
  onClick,
  prefetch = false,
  children,
  ...props
}: Ga4TrackedInternalLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    trackGa4Event(ga4EventName, ga4Params);
  }

  return (
    <Link prefetch={prefetch} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
