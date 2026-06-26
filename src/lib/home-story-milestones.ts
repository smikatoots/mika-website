export type StoryMilestone = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /** Phrases in `body` to render in bold (matched in order). */
  highlights: string[];
  image: string;
  imageAlt: string;
};

const PLACEHOLDER = "/story-timeline/placeholder.svg";

/** Chronological story beats — add or edit entries here. */
export const storyMilestones: StoryMilestone[] = [
  {
    id: "origins",
    eyebrow: "Where it started",
    title: "Origins",
    body: "I grew up in Manila as a science nerd with big dreams. I earned a spot at Philippine Science High School, the most competitive science school in the country. My classmates came from all over the country, different backgrounds, all of them sharp. Being around that group shifted something in me. It was the first time I believed I could get somewhere bigger.",
    highlights: [
      "science nerd with big dreams",
      "Philippine Science High School",
      "I could get somewhere bigger",
    ],
    image: "/decks/_library/timeline-origins.jpeg",
    imageAlt: "Childhood in Manila and Philippine Science High School",
  },
  {
    id: "scholarship",
    eyebrow: "The door that opened everything",
    title: "The Scholarship",
    body: "I got a full ride to Wesleyan University through the Freeman Asian Scholarship. Otherwise, I wasn't going. I was a kid from Manila with big dreams and no money to back them. Someone bet on me anyway. That's why I care so much about education access. I know exactly what it's like to need that bet.",
    highlights: ["full ride to Wesleyan University", "Someone bet on me anyway", "need that bet"],
    image: "/decks/_library/timeline-scholarship.jpeg",
    imageAlt: "Freeman Asian Scholarship and leaving home for Wesleyan",
  },
  {
    id: "creating-path",
    eyebrow: "No door? Build one.",
    title: "Creating the Path",
    body: "I was determined to make it to Silicon Valley. Wesleyan just didn't have a roadmap for that. There were no tech clubs, no design courses, no pipeline to the Valley. So I built the tech organization from scratch and taught design and engineering classes myself. That work landed me my first Silicon Valley internship. I was going to find a way in regardless.",
    highlights: [
      "make it to Silicon Valley",
      "built the tech organization from scratch",
      "find a way in regardless",
    ],
    image: "/decks/_library/timeline-creating-the-path.jpeg",
    imageAlt: "Building the tech org and teaching design at Wesleyan",
  },
  {
    id: "breaking-in",
    eyebrow: "The hard way in",
    title: "Breaking In",
    body: 'No network. No tech feeder school. Visa on the line. I still made it. I got into Silicon Valley through the Kleiner Perkins Fellowship. I started at Ripcord as one of their first PMs, then had 30 days to find a new job when my visa status changed. I landed at LinkedIn and eventually led products on the jobs team, including the purple "I\'m Hiring" ring you\'ve probably seen on profiles.',
    highlights: [
      "No network. No tech feeder school. Visa on the line.",
      "Kleiner Perkins Fellowship",
      'purple "I\'m Hiring" ring',
    ],
    image: "/decks/_library/timeline-breaking-in.jpeg",
    imageAlt: "Kleiner Perkins Fellowship and early Silicon Valley career",
  },
  {
    id: "wake-up-call",
    eyebrow: "When the dream doesn't fit",
    title: "The Wake-Up Call",
    body: "I had made it. And I realized I didn't want it. LinkedIn was the dream job on paper: big title, prestigious company, job security. But I was building products for internal metrics and executive approvals, not for users. Every decision that mattered went somewhere above me. I had spent years fighting to get to that level, and once I was there, the decisions still weren't mine to make.",
    highlights: [
      "I realized I didn't want it",
      "not for users",
      "weren't mine to make",
    ],
    image: "/about-assets/007.jpg",
    imageAlt: "Quiet candid portrait",
  },
  {
    id: "founder-life",
    eyebrow: "All in",
    title: "The Founder Life",
    body: "Forbes. TechCrunch. Live TV. $100M. I was living it. I co-founded Parallax, a stablecoin payments startup, and in under a year we hit $100M in transaction volume, raised $5M from Dragonfly and General Catalyst, and built a team of 15 across 8 countries. I landed on Forbes 30 Under 30 and Tatler Gen.T. Got on live TV for the first time. Twice. I was learning more that year than I had in the previous five. Founding a company is the hardest thing I've ever done. I was proud of all of it.",
    highlights: [
      "$100M in transaction volume",
      "Forbes 30 Under 30",
      "hardest thing I've ever done",
    ],
    image: "/decks/_library/timeline-founder-life.jpeg",
    imageAlt: "Parallax founder era — Forbes, funding, and live TV",
  },
  {
    id: "exit",
    eyebrow: "A $3B exit and a hard truth",
    title: "The Exit",
    body: "We sold to a $3 billion company. And I had been running on empty. Parallax was acquired by Phantom, one of the biggest crypto wallets in the world! But looking back, I had been quietly burning out for a long time. Not from the big founder decisions. From the work nobody warns you about: compliance paperwork, vendor shopping, admin grunt work, risk management. None of it was why I started a company. All of it wore me down.",
    highlights: [
      "$3 billion company",
      "quietly burning out",
      "All of it wore me down",
    ],
    image: "/press/covers/phantom-acquires-parallax-0.png",
    imageAlt: "Parallax acquisition by Phantom announcement",
  },
  {
    id: "the-break",
    eyebrow: "What the break taught me",
    title: "The Break",
    body: "After the exit, I took a breath, worked with a coach, reflected on my priorities. I also got married to Nick! And somewhere in that quiet, I found AI on my sabbatical. My first thought: I wish I'd had this at my first startup. I kept thinking about everything that had drained me at Parallax. The compliance, the admin, the tasks I dreaded. AI could have handled most of it. AI is one of the most direct paths to getting your time (& life) back. I wanted to build with it & I wanted to help more people see what I was seeing.",
    highlights: [
      "got married to Nick",
      "found AI on my sabbatical",
      "getting your time (& life) back",
    ],
    image: "/decks/_library/timeline-break.jpeg",
    imageAlt: "Sabbatical, marriage, and discovering AI after the exit",
  },
  {
    id: "building-on-our-terms",
    eyebrow: "Building on our terms",
    title: "Building on Our Terms",
    body: "Now it's me, my husband, and AI. No VC, no hamster wheel, no one else's scoreboard. Nick and I started King's Cross Labs to build AI products for growth & marketing teams, our way. I also teach AI on Instagram and TikTok because I know what it's like to need a door opened. We believe two founders and AI agents can get to million-dollar outcomes, and we're building the proof in public. This time, I'm building the company I always wanted: ambitious, free, and fully ours.",
    highlights: [
      "No VC, no hamster wheel, no one else's scoreboard",
      "King's Cross Labs",
      "ambitious, free, and fully ours",
    ],
    image: "/decks/_library/timeline-terms.jpg",
    imageAlt: "King's Cross Labs and building on their own terms",
  },
];

export const storyMilestonePlaceholder = PLACEHOLDER;
