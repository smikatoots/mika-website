/** Registry of presentation decks. Add a new entry when creating `/deck/<slug>`. */
export const decks = [
  {
    slug: "ai-bullshit-trinity",
    title: "The AI Bullshit Trinity",
  },
  {
    slug: "ai-leaders-walking-back-jobs",
    title: "AI Leaders Are Walking Back Their Job Apocalypse Prophecies",
  },
  {
    slug: "anthropic-400k-creative-writer",
    title: "Anthropic Is Paying $400K for a Creative Writer",
  },
  {
    slug: "anthropic-ae-sales-prep",
    title: "How Anthropic's AE Uses Claude to Sell Claude",
  },
  {
    slug: "claude-code-session-shortcuts",
    title: "Claude Code Session Shortcuts",
  },
  {
    slug: "claude-corps-fellowship",
    title: "How to Stand Out in the Claude Corps Fellowship",
  },
  {
    slug: "claude-effort-levels",
    title: "Claude Effort Levels",
  },
  {
    slug: "friends-ai-meeting",
    title: "Monthly Friends & AI Meeting Agenda",
  },
  {
    slug: "kickbacks-earn-while-waiting",
    title: "Kickbacks.ai — Earn While Claude Is Thinking",
  },
  {
    slug: "llm-council-karpathy",
    title: "LLM Council — Karpathy's Fix for Claude the Yes-Man",
  },
  {
    slug: "openai-860k-ai-pm",
    title: "OpenAI's $860K AI Product Manager Role",
  },
  {
    slug: "openclaw-hermes-paperclip",
    title: "OpenClaw vs Hermes vs Paperclip",
  },
  {
    slug: "polsia-one-person-business",
    title: "How One Founder Runs a $6M Company With Zero Employees",
  },
  {
    slug: "slack-cpo-internship",
    title: "Ex Slack CPO Applying for an Internship",
  },
  {
    slug: "stanford-ai-at-home",
    title: "Stanford: AI's Biggest Productivity Boost Is Happening at Home",
  },
  {
    slug: "templates",
    title: "Deck templates",
  },
  {
    slug: "vc-ceos-hiring-same-person",
    title: "VC CEOs Are Hiring the Same Person",
  },
  {
    slug: "yc-batch-trends",
    title: "YC P26 Batch Trends",
  },
] as const;

export type DeckSlug = (typeof decks)[number]["slug"];
