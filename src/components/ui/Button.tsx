import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { InternalLink } from "./InternalLink";
import {
  buttonStyle,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyle";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: never;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
    /** Set for links leaving the site; adds target and rel. */
    external?: boolean;
  };

/**
 * The site's button. See `DESIGN.md` > Components.
 *
 * Renders a `<button>`, an `<a>`, or an `InternalLink` depending on `href` and
 * `external`, so one definition covers every call site. `mr-pressable` is
 * applied automatically — the press is part of the component.
 *
 * For a call site that must keep its own element (an `<a>` with GA tracking, a
 * third-party wrapper), import `buttonStyle` directly and spread it into
 * `style` instead. Both routes share the same definition.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    variant = "primary",
    size = "lg",
    fullWidth = false,
    className,
    ...rest
  } = props;

  const style = buttonStyle({ variant, size, fullWidth });
  const cls = className ? `mr-pressable ${className}` : "mr-pressable";

  if ("href" in rest && rest.href) {
    const { href, external, ...anchorProps } =
      rest as ComponentPropsWithoutRef<"a"> & {
        href: string;
        external?: boolean;
      };

    if (external) {
      return (
        <a
          {...anchorProps}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          style={style}
        >
          {children}
        </a>
      );
    }

    return (
      <InternalLink {...anchorProps} href={href} className={cls} style={style}>
        {children}
      </InternalLink>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button {...buttonProps} className={cls} style={style}>
      {children}
    </button>
  );
}
