/** Registry of presentation decks. Add a new entry when creating `/deck/<slug>`. */
export const decks = [
  {
    slug: "ai-bullshit-trinity",
    title: "The AI Bullshit Trinity",
    date: "June 21",
  },
  {
    slug: "ai-leaders-walking-back-jobs",
    title: "AI Leaders Are Walking Back Their Job Apocalypse Prophecies",
    date: "June 21",
  },
  {
    slug: "anthropic-400k-creative-writer",
    title: "Anthropic Is Paying $400K for a Creative Writer",
    date: "June 21",
  },
  {
    slug: "anthropic-ae-sales-prep",
    title: "How Anthropic's AE Uses Claude to Sell Claude",
    date: "June 21",
  },
  {
    slug: "claude-code-session-shortcuts",
    title: "Claude Code Session Shortcuts",
    date: "June 21",
  },
  {
    slug: "claude-corps-fellowship",
    title: "How to Stand Out in the Claude Corps Fellowship",
    date: "June 21",
  },
  {
    slug: "claude-effort-levels",
    title: "Claude Effort Levels",
    date: "June 21",
  },
  {
    slug: "friends-ai-meeting",
    title: "Monthly Friends & AI Meeting Agenda",
    date: "June 21",
  },
  {
    slug: "kickbacks-earn-while-waiting",
    title: "Kickbacks.ai — Earn While Claude Is Thinking",
    date: "June 21",
  },
  {
    slug: "llm-council-karpathy",
    title: "LLM Council — Karpathy's Fix for Claude the Yes-Man",
    date: "June 21",
  },
  {
    slug: "openai-860k-ai-pm",
    title: "OpenAI's $860K AI Product Manager Role",
    date: "June 21",
  },
  {
    slug: "openclaw-hermes-paperclip",
    title: "OpenClaw vs Hermes vs Paperclip",
    date: "June 21",
  },
  {
    slug: "polsia-one-person-business",
    title: "How One Founder Runs a $6M Company With Zero Employees",
    date: "June 21",
  },
  {
    slug: "slack-cpo-internship",
    title: "Ex Slack CPO Applying for an Internship",
    date: "June 21",
  },
  {
    slug: "stanford-ai-at-home",
    title: "Stanford: AI's Biggest Productivity Boost Is Happening at Home",
    date: "June 21",
  },
  {
    slug: "templates",
    title: "Deck templates",
    date: "June 21",
  },
  {
    slug: "vc-ceos-hiring-same-person",
    title: "VC CEOs Are Hiring the Same Person",
    date: "June 21",
  },
  {
    slug: "yc-batch-trends",
    title: "YC P26 Batch Trends",
    date: "June 21",
  },
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
] as const;

export type DeckSlug = (typeof decks)[number]["slug"];

/** Deck dates, newest first — drives the grouping on /deck/all. */
export const deckDates = ["June 28", "June 21"] as const;
