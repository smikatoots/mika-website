import type { Metadata } from "next";
import Link from "next/link";

import { deckType, headingBase } from "@/components/deck/deck-styles";
import { decks } from "@/lib/decks";

export const metadata: Metadata = {
  title: "All decks",
};

export default function AllDecksPage() {
  return (
    <div className="h-full overflow-y-auto px-8 py-12 sm:px-16 sm:py-16">
      <h1 className={`${headingBase} ${deckType.statement} mb-10`}>All decks</h1>
      <ul className="flex max-w-4xl flex-col gap-3 pb-16">
        {decks.map((deck) => (
          <li key={deck.slug}>
            <Link
              href={`/deck/${deck.slug}`}
              className="group flex flex-col gap-1 rounded-2xl border border-zinc-200 px-6 py-5 transition-colors hover:border-[var(--deck-accent)] hover:bg-zinc-50"
            >
              <span
                className={`${headingBase} text-2xl sm:text-3xl group-hover:text-[var(--deck-accent)]`}
              >
                {deck.title}
              </span>
              <span className="font-mono text-sm text-zinc-400">/deck/{deck.slug}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
