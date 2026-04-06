import type { ReactNode } from "react";

import { textH1 } from "@/lib/ui/site-styles";

export function PageHero({
  emoji,
  title,
  subtitle,
}: {
  emoji?: string;
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {emoji ? (
        <p className="text-4xl" aria-hidden>
          {emoji}
        </p>
      ) : null}
      <h1 className={emoji ? `mt-2 ${textH1}` : textH1}>{title}</h1>
      {subtitle ? (
        <div className="mt-4 text-base leading-relaxed text-zinc-600">
          {subtitle}
        </div>
      ) : null}
    </header>
  );
}
