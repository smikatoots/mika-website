export type TriviaCard = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  imageSrc: string;
};

export type MessagePart = {
  id: string;
  text: string;
  rotate: number;
  color: string;
};

/** Trivia cards — each correct answer unlocks the next sticky note. */
export const TRIVIA_CARDS: TriviaCard[] = [
  {
    id: "q1",
    question: "Where did Mika first meet Mario?",
    options: [
      "Greenbelt restaurant",
      "Shangri-la restaurant",
      "Greenhills restaurant",
      "Wesleyan restaurant",
    ],
    correctIndex: 0,
    imageSrc: "/j-and-mario/card-1.svg",
  },
  {
    id: "q2",
    question: "What's the 1st board game Nick played with Mario",
    options: ["Wingspan", "Catan", "Ticket to Ride", "Monopoly Deal"],
    correctIndex: 1,
    imageSrc: "/j-and-mario/card-2.svg",
  },
  {
    id: "q3",
    question: "What city J and Mika first meet?",
    options: ["Makati", "Middletown", "Greenhills", "New York"],
    correctIndex: 2,
    imageSrc: "/j-and-mario/card-3.svg",
  },
  {
    id: "q4",
    question:
      "What were Mario’s “selling points” for joining 231 Pine? (more fun if J answers this lol)",
    options: [
      "Cooking skills",
      "Weed + car",
      "Coffee + photos",
      "Wine & food taste",
    ],
    correctIndex: 1,
    imageSrc: "/j-and-mario/card-4.svg",
  },
  {
    id: "q5",
    question: "What was the name of our favorite trivia person @ Fred's?",
    options: ["Sebastian", "Oliver", "Andrew", "Santi"],
    correctIndex: 0,
    imageSrc: "/j-and-mario/card-5.svg",
  },
  {
    id: "q6",
    question: "What was the first photo sent in jammin' about?",
    options: [
      "Wonder discount",
      "Kpop concert tickets",
      "Pic from a hangout",
      "Wingspan game",
    ],
    correctIndex: 0,
    imageSrc: "/j-and-mario/card-6.svg",
  },
];

export const MESSAGE_PARTS: MessagePart[] = [
  {
    id: "m1",
    rotate: -3.5,
    color: "#FFE566",
    text: `We have been waiting for this day for SO LONG! So excited to celebrate two of our best friends here in New York.`,
  },
  {
    id: "m2",
    rotate: 2.5,
    color: "#FFB4D9",
    text: `Janelle, so many people have already talked about how you’re such a bright light in people’s lives, ours included. Whenever I’m around you, I can trust that I’ll be leaving happier than I came. Whenever life throws a curveball at you, whether a visa showdown requiring you to take community college classes or a public health challenge in the middle of the worst pandemic, you find the bright light in everything & come out of it even stronger. There’s so much evidence of you inspiring others to reach greater heights and I’m lucky to witness and also feel inspired to be the best I can be. I’m so glad you moved to New York! Confession: when I personally first moved to New York, I particularly was gunning to try to be friends with YOU. We’d already met here and there through Mario and I just knew that I wanted to be around your orbit for longer. Like not just FRIEND, I wanted to be your close friend (LOL embarrassing). Goal achieved though lol!!! And I’m SO SO GLAD you moved and that I got to know you these past few years through trivia, watching solar eclipses, Wingspan, murder mystery themed parties, dinners, brunches and all the big and small moments.`,
  },
  {
    id: "m3",
    rotate: -1.8,
    color: "#7CFFB2",
    text: `Mario, I still remember the first time I met you! It was at a restaurant in Greenbelt in the summer when the alums met the incoming frosh. We said hi and I think shook hands & you were perhaps quite shy so came off as stoic. I remember thinking “oh, this guy seems serious.” Boy was I wrong! Throughout college, you and Carlo were my little brothers. And while you came a year after I was already supposedly settled at Wes, you still got me out of ruts of sadness and homesickness while so far away. In you, I found a sense of familiarity and family that made being so far away from my physical home bearable. And it was so fun actually physically being in a home together my last year of college! I am so happy I rallied for you to be a part of the 231 Pine fam. That house wouldn’t have been as memorable without you in it (plus your weed + car, which were your selling points of course!!) We made so many memories in that apartment (from referencing each other as different pokemons to just having so many avocados in our windowsills to throwing wild(?) parties to the post-class quiet moments at the orange-walled living room). I still remember one of the last days of senior week when we all huddled at I think Caren’s or Gaby’s bed and it hit us that this was going to be one of the last few moments we’d all be all together like that & everything was going to change. We all just started bawling. And yes while things have changed over time, I’m so so so so glad I can still call you one of my closest friends all these years!`,
  },
  {
    id: "m4",
    rotate: 3.2,
    color: "#A8C8FF",
    text: `J and Mars, you’re both some of our bestest friends and best couple friends here in New York. Thank you for being a part of some of our biggest milestones in life like our engagement, learning early on about our secret marriage hehe and as a significant part of the ceremony in our wedding. We’re so happy to celebrate YOUR big milestone as NEWLYWEDS!`,
  },
  {
    id: "m5",
    rotate: -2.4,
    color: "#FFC9A3",
    text: `Now as per ritual, of course the married couple must impart some married life knowledge to the newlyweds. The honest realization is that married life, especially if you’ve already been living together, is much the same. You’ll find that most of the everyday is similar, with the added memory of one of the most important days of your life to look back on. But the one subtle thing that does evolve (and I still can’t quite put my finger on it) is you might find your love for each other grows even more. For some reason even after technically Nick and I have been married for 6 years (lol), there have been moments after our “social” wedding where I think “hmm, why do I feel like my love for him has grown!” It happens randomly! I find it to be an odd feeling because it doesn’t rationally make sense that a singular day should change how we feel about each other. But I guess love is anything but a rational feeling. I hope and know you’ll find the same growing love for each other. It might even grow exponentially stronger because the tax-savings add a bonus on top.`,
  },
  {
    id: "m6",
    rotate: 1.6,
    color: "#E0C4FF",
    text: `We’re both so excited to celebrate you! And I cannot wait for even more trivia (WINS?!?!?!??!?!), board game nights, perhaps some travel and trips?!, movies, Kpop concerts, and milestones with you both.`,
  },
];

/** First sticky is visible immediately; the rest unlock with correct trivia. */
export const INITIAL_REVEALED_COUNT = 1;

export const PASSWORD = "jammin";
export const STORAGE_KEY = "j-and-mario-unlocked";

/** Memory photos shown in an infinite stack after trivia is complete. */
export const MEMORY_PHOTOS = Array.from({ length: 30 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `photo-${n}`,
    src: `/j-and-mario/photos/${n}.png`,
    alt: `Memory ${i + 1}`,
  };
});
