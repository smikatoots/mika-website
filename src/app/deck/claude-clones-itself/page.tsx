import type { Metadata } from "next";

import { Deck } from "@/components/deck/Deck";
import type { SlideInput } from "@/components/deck/deck-slide";
import { HL, ImageSlide } from "@/components/deck/slide-parts";
import { ListSlide, Notes, OverlaySlide } from "@/components/deck/reveal-parts";
import { CtaSlide } from "@/components/deck/special-slides";

export const metadata: Metadata = { title: "Claude Can Clone Itself to Catch Mistakes" };

const LIB = "/decks/_library";

/**
 * A canvas-filling swarm of robots that keeps re-popping while the slide is up.
 *
 * 21 emoji on a 7x3 grid, each one offset on the shared `deck-loop-pop` cycle so
 * they cascade across the grid rather than pulsing in unison. Sized in fixed px
 * because the slide canvas is a fixed 1440x810 that Reveal scales — `vw`/`vh`
 * would key off the window and fight that scaling.
 */
function RobotSwarm() {
  const robots = Array.from({ length: 21 });

  return (
    <div className="grid h-full w-full grid-cols-7 place-items-center px-10 py-8">
      {robots.map((_, i) => (
        <span
          key={i}
          className="deck-loop-pop text-[120px] leading-none"
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          🤖
        </span>
      ))}
    </div>
  );
}

const slides: SlideInput[] = [
  // 1 — Can you trust Claude to double check its own work? Unfortunately, no. Well, the fix is
  //     surprisingly simple and I'll share how.
  {
    content: (
      <>
        <RobotSwarm />
        <Notes>
          Can you trust Claude to double check its own work? Unfortunately, no. Well, the fix is
          surprisingly simple and I&apos;ll share how.
        </Notes>
      </>
    ),
  },

  // 2 — So the problem is when you ask Claude to check itself in the same chat, it's already pretty
  //     biased with the memory and history from that chat. Meaning, if it made a mistake, it has the
  //     same information that gave you that mistake in the first place.
  {
    content: (
      <>
        <ImageSlide
          src={`${LIB}/ai-agreeable-than-human.png`}
          alt="Study finding: the models endorsed the user 49% more often than humans"
        />
        <Notes>
          So the problem is when you ask Claude to check itself in the same chat, it&apos;s already
          pretty biased with the memory and history from that chat. Meaning, if it made a mistake,
          it has the same information that gave you that mistake in the first place.
        </Notes>
      </>
    ),
  },

  // 3 — It's like asking the same biased person the same question hoping for a different answer but
  //     getting the same one every time.
  {
    background: { image: `${LIB}/tunnel-vision.gif`, opacity: 0.55 },
    content: (
      <>
        <OverlaySlide>
          Same chat = <HL>tunnel vision</HL>
        </OverlaySlide>
        <Notes>
          It&apos;s like asking the same biased person the same question hoping for a different
          answer but getting the same one every time.
        </Notes>
      </>
    ),
  },

  // 4 — Instead, you want an unbiased AI to do the checking and review. You do that by spawning
  //     sub-agents which creates a separate chat with no memory or history that looks at the answer
  //     with fresh eyes.
  {
    content: (
      <>
        <ImageSlide
          src={`${LIB}/subagents-background-task.png`}
          alt="Spawned subagents running as separate background tasks"
          caption="Spawn subagents"
        />
        <Notes>
          Instead, you want an unbiased AI to do the checking and review. You do that by spawning
          sub-agents, which creates a separate chat with no memory or history that looks at the
          answer with fresh eyes.
        </Notes>
      </>
    ),
  },

  // 5 — And how you do this is by literally prompting AI to spawn a subagent to do the review like a
  //     coworker that reviews your work. You can even create multiple subagents that have different
  //     perspectives... like a coworker that's an expert in the topic or a skeptical one.
  {
    content: (
      <>
        <ListSlide
          ordered
          reveal={false}
          items={[
            "Skeptical coworker",
            "Expert from the space",
            "Fresh knowledge",
          ]}
        />
        <Notes>
          And how you do this is by literally prompting AI to spawn a subagent to do the review,
          like a coworker that reviews your work. You can even create multiple subagents that have
          different perspectives that help you improve your work from different lenses, like a
          coworker that&apos;s an expert in the topic or a skeptical one.
        </Notes>
      </>
    ),
  },

  // 6 — If you want a guide on how to create these different types of subagents that make your work
  //     better, comment MIKA and I'll send it over!
  {
    content: (
      <>
        <CtaSlide prompt="Comment" headline="MIKA" sub="for my guide on subagents" />
        <Notes>
          If you want a guide on how to create these different types of subagents that make your
          work better, comment MIKA and I&apos;ll send it over!
        </Notes>
      </>
    ),
  },
];

export default function ClaudeClonesItselfDeckPage() {
  return <Deck slides={slides} />;
}
