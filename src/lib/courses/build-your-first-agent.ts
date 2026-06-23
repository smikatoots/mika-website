/** Member enrollment on King's Cross Labs. */
export const BUILD_YOUR_FIRST_AGENT_CHECKOUT_URL =
  "https://www.kingscrosslabs.com/resources/master-claude-guide/";

export const BUILD_YOUR_FIRST_AGENT_ORIGINAL_PRICE = 499;
export const BUILD_YOUR_FIRST_AGENT_PRICE = 37;

export const buildYourFirstAgentModules = [
  {
    num: "01",
    title: "Agent vs. chat",
    description:
      "What an agent actually is, when you need one, and why “just ask ChatGPT” keeps giving you generic output.",
  },
  {
    num: "02",
    title: "Give your agent a brain",
    description:
      "Context files, project memory, and the setup that turns a blank model into something that knows your work.",
  },
  {
    num: "03",
    title: "Skills & instructions",
    description:
      "Reusable skills so your agent follows your voice, your rules, and your workflows — every time.",
  },
  {
    num: "04",
    title: "Connect real tools (MCPs)",
    description:
      "Plug into the apps you already use so your agent can read, write, and act — not just draft text.",
  },
  {
    num: "05",
    title: "Build your first agent",
    description:
      "Hands-on build: go from idea to a working agent you can run on real tasks by the end of the course.",
  },
  {
    num: "06",
    title: "Scale to a small agent team",
    description:
      "Orchestrate multiple agents with clear roles, handoffs, and guardrails — without writing code.",
  },
] as const;

export const buildYourFirstAgentValueStack = [
  { item: "6-module self-paced curriculum", value: 297 },
  { item: "Step-by-step agent build walkthroughs", value: 149 },
  { item: "Templates: context files, skills & prompts", value: 97 },
  { item: "Office-hours replays from the live cohort", value: 79 },
  { item: "Lifetime access + future updates", value: 49 },
] as const;

export const buildYourFirstAgentTestimonials = [
  {
    quote:
      "I went from copying prompts into ChatGPT to running an agent that drafts my weekly updates in my voice. Took one weekend.",
    name: "Operator, Series A startup",
    role: "Head of Marketing",
  },
  {
    quote:
      "Finally understood what people mean by 'agentic AI.' I built something useful without touching Python.",
    name: "Non-technical founder",
    role: "SaaS, 12-person team",
  },
  {
    quote:
      "Worth more than the live price tag. The self-paced version let me pause, rebuild, and actually ship.",
    name: "Course alum",
    role: "Former $499 cohort student",
  },
] as const;

export const buildYourFirstAgentFaqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. This course is built for non-technical founders, operators, and marketers who want a working agent — not a computer science degree.",
  },
  {
    question: "How is this different from your free AI guides?",
    answer:
      "The guides teach one tactic at a time. This course walks you through a full build — context, skills, tools, and a shipped agent — in order, with templates you can reuse.",
  },
  {
    question: "Why was this $499 before?",
    answer:
      "It launched as a live cohort with direct access, live builds, and peer accountability. Students paid $499 and shipped real agents. We turned the core curriculum into self-paced so more people can get the same outcome at a fraction of the cost.",
  },
  {
    question: "How long does it take?",
    answer:
      "Most students finish in a focused weekend or spread across a week of evenings. Go at your own pace — you keep lifetime access.",
  },
  {
    question: "What tools do I need?",
    answer:
      "A Claude or similar AI subscription is enough to start. We cover which setups make sense for non-technical builders and what to add as you scale.",
  },
] as const;
