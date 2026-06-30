import { deckType, headingBase } from "@/components/deck/deck-styles";

// Center-aligned stack of command names that pop in one after another — the
// hook slide for the Claude Code Commands decks (CON-287/289/294).
export function PepperedCommands({ commands }: { commands: string[] }) {
  return (
    <div className="deck-fade flex h-full w-full flex-col items-center justify-center gap-4 px-8 sm:gap-6">
      {commands.map((cmd, i) => (
        <span
          key={cmd}
          className={`deck-pop whitespace-nowrap text-center font-mono font-extrabold ${headingBase} ${deckType.statement} ${i % 2 === 0 ? "deck-accent" : "text-zinc-900"}`}
          style={{ animationDelay: `${0.15 + i * 0.35}s` }}
        >
          {cmd}
        </span>
      ))}
    </div>
  );
}
