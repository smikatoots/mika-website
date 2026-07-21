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
    body: "I grew up in Manila with big dreams. I earned a spot at Philippine Science High School, the most competitive science school in the country (aka nerd city 🤓). My classmates came from many walks of life, all over the country. And a lot of them were so much smarter than me!! It was inspiring but also taught me to dream BIG, even at a young age.",
    highlights: [
      "Philippine Science High School",
      "dream BIG",
      "many walks of life",
    ],
    image: "/story-timeline/timeline-origins.jpeg",
    imageAlt: "Childhood in Manila and Philippine Science High School",
  },
  {
    id: "scholarship",
    eyebrow: "The door that opened everything",
    title: "The Scholarship",
    body: "Dreaming big paid off, baby! I got a full ride to Wesleyan University through the Freeman Asian Scholarship! Without this scholarship, I would absolutely not have been able to study abroad. I'm so grateful to have quality-tier & FREE education since high school. I appreciate how education opens doors & desire to give back in a similar way.",
    highlights: [
      "full ride to Wesleyan University",
      "Freeman Asian Scholarship",
      "education opens doors",
    ],
    image: "/story-timeline/timeline-scholarship.jpeg",
    imageAlt: "Freeman Asian Scholarship and leaving home for Wesleyan",
  },
  {
    id: "creating-path",
    eyebrow: "No door? Build one.",
    title: "Creating the Path",
    body: "In college, I eventually decided tech was the industry I wanted to be in. I was determined to make it to ✨ Silicon Valley ✨ Wesleyan just didn't have a roadmap for that (as a liberal arts school). So I built a tech organization from scratch, planned excursions to the Bay Area & taught product, design & eng classes myself. That work landed me my first internships & my first tech job! *squeal*",
    highlights: [
      "✨ Silicon Valley ✨",
      "built a tech organization from scratch",
      "first tech job",
    ],
    image: "/story-timeline/timeline-creating-the-path.jpeg",
    imageAlt: "Building the tech org and teaching design at Wesleyan",
  },
  {
    id: "breaking-in",
    eyebrow: "The hard way in",
    title: "Breaking In",
    body: 'Many things were stacked against me: international visa, woman in male-dominated industry, no tech feeder school, no network. But many-a-hustling after, I made it!! I got my 1st tech job through the prestigious Kleiner Perkins Fellowship.\n\nBut #visaproblems were neverending. Eventually, I had to leave & had 30 days to find a new job when my visa status changed. I thankfully landed at LinkedIn and eventually led products on the jobs team, including the purple "I\'m Hiring" ring you\'ve probably seen on profiles',
    highlights: [
      "stacked against me",
      "Kleiner Perkins Fellowship",
      'purple "I\'m Hiring" ring',
    ],
    image: "/story-timeline/timeline-breaking-in.jpeg",
    imageAlt: "Kleiner Perkins Fellowship and early Silicon Valley career",
  },
  {
    id: "wake-up-call",
    eyebrow: "When the dream doesn't fit",
    title: "The Wake-Up Call",
    body: 'LinkedIn was the 🌈 dream job on paper: big title (in product, no less!), prestigious company, job security, AMAZING benefits. But I was building products for internal metrics & executive approvals. Every decision required 42 approvals & 56 emails back & forth. I still worked SO HARD thinking "so many people would LOVE my job... i need to be grateful"... eventually burnt out. 🥵 I realized it just wasn\'t the dream I always imagined.',
    highlights: [
      "dream job on paper",
      "42 approvals",
      "wasn't the dream I always imagined",
    ],
    image: "/about-assets/007.jpg",
    imageAlt: "Quiet candid portrait",
  },
  {
    id: "founder-life",
    eyebrow: "All in",
    title: "The Founder Life",
    body: "So I decided to quit & start my founder phase! Founding a company is the HARDEST thing I've ever done!! Respect to all the founders out there.\n\nAfter meandering in the idea maze (it takes longer than ya think!), I co-founded Parallax, a stablecoin payments startup, and in under a year we hit $100M in transaction volume, raised $5M from Dragonfly and General Catalyst, and built a team of 15 across 8 countries. I landed on Forbes 30 Under 30 and Tatler Gen.T, got featured on TechCrunch & other media outlets, went on live TV for the first time. A lot of things looked awesome...",
    highlights: [
      "HARDEST thing I've ever done",
      "$100M in transaction volume",
      "Forbes 30 Under 30",
    ],
    image: "/story-timeline/timeline-founder-life.jpeg",
    imageAlt: "Parallax founder era — Forbes, funding, and live TV",
  },
  {
    id: "exit",
    eyebrow: "A 2nd hard truth",
    title: "The Exit",
    body: "We eventually sold to a $3B company, one of the biggest in the industry! But looking back, I had been quietly burning out AGAIN. 🥵 The day to day just ended up not being my cup of tea: compliance paperwork, vendor shopping, admin grunt work, risk management, fundraising. I'd also lost the freedom I left corporate for in the first place. Now, instead of pandering to execs, I pandered to investors. None of it was why I started a company (I love talking to users, growth, marketing, product & design). All of it wore me down.",
    highlights: [
      "$3B company",
      "quietly burning out AGAIN",
      "All of it wore me down",
    ],
    image: "/press/covers/phantom-acquires-parallax-0.png",
    imageAlt: "Parallax acquisition by Phantom announcement",
  },
  {
    id: "the-break",
    eyebrow: "What the break taught me",
    title: "The Break",
    body: "After the exit, I took a breath, worked with a coach & reflected on my life (#quarterlifecrisis) I also got married to Nick! And somewhere in that quiet, I realized:\n\n1. I care about autonomy, freedom & building a time-rich life. I'd burned out the 1st time pandering to execs, and again pandering to VCs.\n\n2. I dove deep into AI & wish I'd had this at my 1st startup. AI could've handled many tasks I dreaded. AI is one of the most direct paths to getting your time (& life) back. I wanted to build with it & help more people see what I was seeing.",
    highlights: [
      "got married to Nick",
      "autonomy, freedom & building a time-rich life",
      "getting your time (& life) back",
    ],
    image: "/story-timeline/timeline-break.jpeg",
    imageAlt: "Sabbatical, marriage, and discovering AI after the exit",
  },
  {
    id: "building-on-our-terms",
    eyebrow: "The new journey",
    title: "Building on Our Terms",
    body: "I'm trying something new & doing it with my husband as a co-founder! Nick & I are building an AI company on our own terms, optimizing for time-rich freedom (no more burning out!) I'm the growth & marketing founder (again) and we're building for growth & marketing teams so naturally I am nerding out about all of that! We're in the early days but have big dreams 🚀\n\nI'm also sharing everything I know about AI, because I know how education (especially about this amazing & crazy tech) opens doors.\n\nI hope you'll join me in my journey 🙂",
    highlights: [
      "on our own terms",
      "time-rich freedom",
      "big dreams",
    ],
    image: "/story-timeline/timeline-terms.jpg",
    imageAlt: "King's Cross Labs and building on their own terms",
  },
];

export const storyMilestonePlaceholder = PLACEHOLDER;
