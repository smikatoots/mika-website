import type { Metadata } from "next";
import Link from "next/link";

import { deckType, headingBase } from "@/components/deck/deck-styles";
import { deckDates, decks } from "@/lib/decks";

export const metadata: Metadata = {
  title: "All decks",
};

export default function AllDecksPage() {
  return (
    <div className="h-full overflow-y-auto px-8 py-12 sm:px-16 sm:py-16">
      <h1 className={`${headingBase} ${deckType.statement} mb-10`}>All decks</h1>
      <div className="flex max-w-4xl flex-col gap-12 pb-16">
        {deckDates.map((date) => (
          <section key={date}>
            <h2
              className={`${headingBase} mb-4 text-xl font-bold uppercase tracking-[0.2em] text-zinc-400 sm:text-2xl`}
            >
              {date}
            </h2>
            <ul className="flex flex-col gap-3">
              {decks
                .filter((deck) => deck.date === date)
                .map((deck) => (
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
          </section>
        ))}
      </div>
    </div>
  );
}
