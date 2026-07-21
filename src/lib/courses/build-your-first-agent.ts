/** Member enrollment on King's Cross Labs. */
export const BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL =
  "https://www.kingscrosslabs.com/resources/master-claude-guide/";

export const BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE = 499;
export const BUILD_YOUR_FIRST_AGENT_PRICE = 37;

export const buildYourFirstAgentPainPoints = [
  {
    title: "Overwhelming",
    body: "Where do you even start?",
  },
  {
    title: "Noisy",
    body: 'Every week there\'s a new tool, a new tutorial, a new "best prompt ever."',
  },
  {
    title: "Time-consuming",
    body: "Figuring it out alone burns nights you don't have.",
  },
  {
    title: "Frustrating",
    body: "You know Claude should be saving you hours. But it still doesn't quite get you.",
  },
] as const;

export const buildYourFirstAgentOutcomes = [
  "A working AI agent crafted for your specific role and workflows",
  "Your own CLAUDE.md and context files — the brain that makes Claude actually know you",
  "A custom skill built for your needs",
  "Connected tools or MCPs so your agent can act — not just draft text",
  "Frameworks and mental models to keep building on your own",
] as const;

export const buildYourFirstAgentModules = [
  {
    num: "01",
    title: "What we're building & intro to agents",
    description:
      "The architecture of an AI agent — what it does, how it works, and why this is different from ChatGPT or Claude.ai. Hands-on setup so you're ready to build.",
    bullets: [
      "Agent vs. chat: when you need a system, not a prompt",
      "Claude Code + Cowork setup for non-technical builders",
      "The roadmap for the rest of the course",
    ],
  },
  {
    num: "02",
    title: "Give your agent a brain",
    description:
      "Understand context files & folders. Craft your custom CLAUDE.md, USER.md, and VOICE.md so your agent already knows you before you say a word.",
    bullets: [
      "What context files & folders actually are",
      "Write CLAUDE.md, USER.md, and VOICE.md",
      "Build a folder structure that scales with you",
    ],
  },
  {
    num: "03",
    title: "Build a custom skill for your workflow",
    description:
      "Learn how skills work. Install a pre-built skill, then build your own — customized for your role. Turn a multi-step task into a single command.",
    bullets: [
      "What makes a good skill vs. a bloated prompt",
      "Install a starter skill, then customize it",
      "Know when (and how) to create the next one",
    ],
  },
  {
    num: "04",
    title: "Connect to apps & tools you already use",
    description:
      "Learn about MCPs. Connect Claude to email, calendar, Notion, Slack, and more — so your agent can read, act, and report.",
    bullets: [
      "What MCPs are (in plain English)",
      "Connect tools you already live in",
      "Go from text generation to real actions",
    ],
  },
  {
    num: "05",
    title: "Launch your first agent (or two)",
    description:
      "See how context files, skills, and MCPs work as one system. Build your custom agent and leave knowing how to build more yourself.",
    bullets: [
      "Put the building blocks together",
      "Ship an agent for your real workflows",
      "A clear path to keep leveling up",
    ],
  },
] as const;

export const buildYourFirstAgentIncluded = [
  {
    title: "Full self-paced curriculum",
    body: "The same build path from the live workshop — condensed so you can ship in a focused day (or spread across evenings).",
  },
  {
    title: "Build-with-me walkthroughs",
    body: "Step-by-step guidance with a starter kit, so you leave with a working agent custom to your needs — not a pile of notes.",
  },
  {
    title: "Templates & context starters",
    body: "CLAUDE.md, USER.md, VOICE.md, skills, and folder patterns you can reuse immediately.",
  },
  {
    title: "Lifetime access",
    body: "Go back to course content and recordings whenever you need to. Future updates included.",
  },
  {
    title: "Bonus resource unlock",
    body: "A paid digital resource we share is made free and available to students after you enroll.",
  },
  {
    title: "Prerequisites that are clear",
    body: "Claude Pro or Max + Claude Desktop — so you can follow along without guessing the stack.",
  },
] as const;

export const buildYourFirstAgentValueStack = [
  { item: "5-module self-paced agent curriculum", value: 297 },
  { item: "Build-with-me walkthroughs + starter kit", value: 149 },
  { item: "Templates: CLAUDE.md, skills & context files", value: 97 },
  { item: "Office-hours / workshop replays", value: 79 },
  { item: "Lifetime access + future updates", value: 49 },
] as const;

/** Screenshot slots for the social-proof scroller. */
export const buildYourFirstAgentProofShots = [
  {
    id: "norma",
    src: "/courses/build-your-first-agent/proof/norma.png",
    alt: "5-star review from Norma, Accounting Clerk at Ruiz & Company — Cohort 1",
    width: 1024,
    height: 246,
  },
  {
    id: "ethan",
    src: "/courses/build-your-first-agent/proof/ethan.png",
    alt: "5-star review from Ethan, COO at MOKA — Cohort 1",
    width: 1024,
    height: 253,
  },
  {
    id: "steve",
    src: "/courses/build-your-first-agent/proof/steve.png",
    alt: "5-star review from Steve, Founder at BSC — Cohort 1",
    width: 1024,
    height: 252,
  },
  {
    id: "ferrin",
    src: "/courses/build-your-first-agent/proof/ferrin.png",
    alt: "5-star review from Ferrin, Medical Director at Clinica Medica Familiar y Dental — Cohort 1",
    width: 1024,
    height: 210,
  },
  {
    id: "quinntin",
    src: "/courses/build-your-first-agent/proof/quinntin.png",
    alt: "5-star review from Quinntin, Head of Innovation at Clinica Medica Familiar — Cohort 1",
    width: 1024,
    height: 322,
  },
  {
    id: "janna",
    src: "/courses/build-your-first-agent/proof/janna.png",
    alt: "5-star review from Janna, coach and consultant — Cohort 2",
    width: 1024,
    height: 403,
  },
  {
    id: "pratik",
    src: "/courses/build-your-first-agent/proof/pratik.png",
    alt: "5-star review from Pratik, AI Product Lead at Citi Bank — Cohort 1",
    width: 1024,
    height: 209,
  },
] as const;

export const buildYourFirstAgentForYou = [
  "You're a founder, exec, or manager who wants to do the work of a 5-person team without the payroll",
  "You're a non-technical operator who knows AI can save 10+ hours a week — and you need a fast, high-quality way to uplevel",
  "You've been handed the AI mandate (or you're AI-curious) and don't know where to start",
  "You want a working agent for your role — not another passive webinar",
  "You're ready to do the hands-on builds, not just collect tips",
  "You want frameworks you can reuse to keep building agents on your own",
] as const;

export const buildYourFirstAgentNotForYou = [
  "You want a get-rich-quick AI prompt pack",
  "You want someone else to build every system for you",
  "You're looking for a coding bootcamp or ML theory deep-dive",
  "You're not willing to follow the build steps between modules",
  "You only want chat tips — not agents that connect to your tools",
  "You don't have (or won't get) Claude Pro/Max + Claude Desktop to follow along",
] as const;

export const buildYourFirstAgentInstructors = [
  {
    name: "Mikaela Reyes",
    shortName: "Mika",
    role: "Co-Founder @ King's Cross Labs",
    image: "/mika-reyes.jpg",
    initials: "MR",
    previous: [
      {
        name: "LinkedIn",
        logo: "/courses/build-your-first-agent/logos/linkedin.svg",
      },
      {
        name: "South Park Commons",
        logo: "/courses/build-your-first-agent/logos/south-park-commons.svg",
      },
      {
        name: "Microsoft",
        logo: "/courses/build-your-first-agent/logos/microsoft.svg",
      },
    ],
    bio: "I help founders, business owners, and marketing leaders use AI to accelerate their business and stay time-rich. I run King's Cross Labs with my husband Nick. We figure out how AI can accelerate and lessen the cost of your GTM workflows — and we run our own company on the same stack (Claude, agents, MCPs), so everything we teach is something we use daily. Raised $5M, founded and exited Parallax (fintech) to a $3B acquirer. Shipped products at Microsoft and LinkedIn. 20,000+ audience on Instagram and LinkedIn for practical AI.",
  },
  {
    name: "Nicolas Reyes",
    shortName: "Nick",
    role: "Co-Founder & CTO @ King's Cross Labs",
    image: null,
    initials: "NR",
    previous: [
      {
        name: "Google",
        logo: "/courses/build-your-first-agent/logos/google.svg",
      },
      {
        name: "Airbnb",
        logo: "/courses/build-your-first-agent/logos/airbnb.svg",
      },
      {
        name: "Phantom",
        logo: "/courses/build-your-first-agent/logos/phantom.svg",
      },
    ],
    bio: "Ten years ago I started at Google and Airbnb. More recently, I was at Phantom shipping the safety & authentication layer millions of users rely on. My focus has been security, infrastructure, and systems that run at scale. That's the lens I bring to AI: agent systems, MCPs, guardrails — the parts that make AI dependable enough to run a real business on. Mika and I run King's Cross Labs on the same stack we build for clients. Every tool and agent is battle-tested in our own company first.",
  },
] as const;

export const buildYourFirstAgentFaqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. This is a 101 hands-on build for non-technical founders, operators, and marketers. We sit on both sides of the table — technical and non-technical — and designed the path so you can ship without a CS degree.",
  },
  {
    question: "What do I need before I start?",
    answer:
      "A Claude Pro or Max subscription, and Claude Desktop downloaded — so you can access Claude Code (and Cowork) and follow the builds. We walk you through setup in module 01.",
  },
  {
    question: "How is this different from the live workshop?",
    answer:
      "The live workshop is a small, intimate day with Mika & Nick in the room. This is the abbreviated, self-paced version of that same curriculum — so you can build on your schedule, with templates and walkthroughs included, at a fraction of the live price.",
  },
  {
    question: "How long does it take?",
    answer:
      "The path is designed so you can learn more in one focused day than most people piece together over months of trial and error. Or spread it across evenings — you keep lifetime access.",
  },
  {
    question: "How is this different from your free AI guides?",
    answer:
      "The guides teach one tactic at a time. This course walks you through a full build — context, skills, tools, and a shipped agent — in order, with templates you can reuse.",
  },
  {
    question: "Why was the live version $499?",
    answer:
      "It launched as a live cohort with direct access, live builds, and peer accountability. Students paid $499 and shipped real agents. We turned the core curriculum into this self-paced resource so more people can get the same outcome without the cohort schedule.",
  },
] as const;
