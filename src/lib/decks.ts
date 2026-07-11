/**
 * The template deck is pinned to the top of `/deck/all` for easy linking,
 * rather than grouped under a date like the content decks below.
 */
export const templateDeck = {
  slug: "templates",
  title: "Deck templates",
} as const;

/** Registry of presentation decks. Add a new entry when creating `/deck/<slug>`. */
export const decks = [
  {
    slug: "loops-part-1-first-loop",
    title: "Loops, Part 1 — Build Your First Loop",
    date: "June 28",
  },
  {
    slug: "loops-part-2-five-pieces",
    title: "Loops, Part 2 — The Five Pieces",
    date: "June 28",
  },
  {
    slug: "loops-part-3-evolution",
    title: "Loops, Part 3 — The Evolution",
    date: "June 28",
  },
  {
    slug: "loops-part-4-examples",
    title: "Loops, Part 4 — Six Real Loops",
    date: "June 28",
  },
  {
    slug: "claude-code-commands-1",
    title: "Claude Code Commands, Part 1",
    date: "June 28",
  },
  {
    slug: "claude-code-commands-2",
    title: "Claude Code Commands, Part 2",
    date: "June 28",
  },
  {
    slug: "claude-code-commands-3",
    title: "Claude Code Commands, Part 3",
    date: "June 28",
  },
  {
    slug: "stanford-storm-method",
    title: "Stanford's STORM Method",
    date: "June 28",
  },
  {
    slug: "ponytail-plugin",
    title: "Ponytail — Cut Token Spend by 53%",
    date: "June 28",
  },
  {
    slug: "fable-5-prompting-playbook",
    title: "Anthropic's Fable 5 Prompting Playbook",
    date: "July 6",
  },
  {
    slug: "claude-gets-dumber-canary",
    title: "Claude Gets Dumber — The Canary Rule",
    date: "July 6",
  },
  {
    slug: "llms-but-brainrot-gen-z",
    title: "LLMs but Brainrot: Gen Z",
    date: "July 6",
  },
  {
    slug: "fable-before-july-8",
    title: "Fable-Worthy Use Cases Before July 8",
    date: "July 6",
  },
  {
    slug: "tim-ferriss-ai-nonfiction",
    title: "Has AI Killed Tim Ferriss's Books?",
    date: "July 6",
  },
  {
    slug: "what-are-subagents",
    title: "What Are Subagents?",
    date: "July 6",
  },
  {
    slug: "claude-concepts-cheat-sheet",
    title: "The Claude Jargon Cheat Sheet",
    date: "July 6",
  },
  {
    slug: "ai-acronyms",
    title: "AI Acronyms You Should Know",
    date: "July 6",
  },
  {
    slug: "ai-usage-headcount",
    title: "More AI = Fewer Jobs? Debunked",
    date: "July 6",
  },
  {
    slug: "three-loops-andrew-ng",
    title: "Andrew Ng's 3 Loops",
    date: "July 6",
  },
  {
    slug: "keep-fable-brain",
    title: "Keep Fable's Brain After You Lose Access",
    date: "July 6",
  },
] as const;

export type DeckSlug = (typeof decks)[number]["slug"];

/** Deck dates, newest first — drives the grouping on /deck/all. */
export const deckDates = ["July 6", "June 28"] as const;
