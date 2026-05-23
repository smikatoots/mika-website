import type { ReactNode } from "react";

export function DemographicRanking({
  title,
  items,
  note,
}: {
  title: string;
  items: string[];
  note: ReactNode;
}) {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold text-zinc-950 sm:text-lg">{title}</h3>
      <ol className="mt-6 space-y-3">
        {items.map((city, index) => (
          <li
            key={city}
            className="flex items-center gap-4 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3"
          >
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold tabular-nums text-accent"
              aria-hidden
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium text-zinc-950 sm:text-base">
              {city}
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6 text-sm leading-relaxed text-zinc-600">{note}</div>
    </div>
  );
}
