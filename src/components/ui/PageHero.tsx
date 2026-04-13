import type { ReactNode } from "react";

import { textH1 } from "@/lib/ui/site-styles";

export function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <h1 className={textH1}>{title}</h1>
      {subtitle ? (
        <div className="mt-4 text-base leading-relaxed text-zinc-600">
          {subtitle}
        </div>
      ) : null}
    </header>
  );
}
