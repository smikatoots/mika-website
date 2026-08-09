"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import {
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import "./Stack.css";

type CardRotateProps = {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
};

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function finishSendToBack() {
    x.set(0);
    y.set(0);
    onSendToBack();
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      finishSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="card-rotate-disabled" style={{ x: 0, y: 0 }}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export type StackProps = {
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
  /** When true, drag + click-to-advance are disabled. */
  interactionLocked?: boolean;
  /** Increment to send the top card behind the stack. */
  advanceToken?: number;
  onCardAdvanced?: () => void;
};

type StackCard = { id: string; content: ReactNode; rotation: number };

function cardKey(content: ReactNode, index: number): string {
  if (isValidElement(content) && content.key != null) {
    return String(content.key);
  }
  return `card-${index + 1}`;
}

function buildStack(cards: ReactNode[], randomRotation: boolean): StackCard[] {
  return cards.map((content, index) => ({
    id: cardKey(content, index),
    content,
    rotation: randomRotation ? Math.random() * 10 - 5 : 0,
  }));
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 22 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  interactionLocked = false,
  advanceToken = 0,
  onCardAdvanced,
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState<StackCard[]>(() =>
    buildStack(cards, randomRotation),
  );
  const lastAdvanceToken = useRef(advanceToken);
  const onCardAdvancedRef = useRef(onCardAdvanced);
  const cardsSignature = cards.map((c, i) => cardKey(c, i)).join("|");
  // Always read latest card nodes from props so overlay/state updates
  // (e.g. correct-answer lock) don't require remounting the stack.
  const contentById = new Map(
    cards.map((content, i) => [cardKey(content, i), content]),
  );

  useEffect(() => {
    onCardAdvancedRef.current = onCardAdvanced;
  }, [onCardAdvanced]);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`);
    const sync = () => setIsMobile(media.matches);
    media.addEventListener("change", sync);
    const frame = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", sync);
    };
  }, [mobileBreakpoint]);

  // Keep stack in sync when the card set changes, preserving order/rotations
  // for cards that remain (so send-to-back stays smooth).
  useEffect(() => {
    setStack((prev) => {
      const nextCards = cards;
      if (!nextCards.length) return [];

      const nextKeys = nextCards.map((c, i) => cardKey(c, i));
      const nextKeySet = new Set(nextKeys);
      const rotationById = new Map(prev.map((c) => [c.id, c.rotation]));
      const nextContentById = new Map(
        nextCards.map((content, i) => [cardKey(content, i), content]),
      );

      const survivors = prev.filter((c) => nextKeySet.has(c.id));
      const survivorIds = new Set(survivors.map((c) => c.id));
      const additions = nextKeys
        .filter((id) => !survivorIds.has(id))
        .map((id) => ({
          id,
          content: nextContentById.get(id)!,
          rotation: randomRotation ? Math.random() * 10 - 5 : 0,
        }));

      const merged = [...survivors, ...additions].map((c) => ({
        id: c.id,
        content: nextContentById.get(c.id) ?? c.content,
        rotation: rotationById.get(c.id) ?? c.rotation,
      }));

      if (!survivors.length) {
        return buildStack(nextCards, randomRotation);
      }
      return merged;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- signature tracks card identity
  }, [cardsSignature, randomRotation]);

  const shouldDisableDrag =
    interactionLocked || (mobileClickOnly && isMobile);
  const shouldEnableClick =
    !interactionLocked && (sendToBackOnClick || (mobileClickOnly && isMobile));

  const sendToBack = (id: string) => {
    setStack((prev) => {
      const newStack = [...prev];
      const index = newStack.findIndex((card) => card.id === id);
      if (index === -1) return prev;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
    onCardAdvancedRef.current?.();
  };

  useEffect(() => {
    if (advanceToken === lastAdvanceToken.current) return;
    lastAdvanceToken.current = advanceToken;
    if (advanceToken <= 0) return;
    setStack((prev) => {
      if (!prev.length) return prev;
      const newStack = [...prev];
      const card = newStack.pop();
      if (!card) return prev;
      newStack.unshift(card);
      return newStack;
    });
    onCardAdvancedRef.current?.();
  }, [advanceToken]);

  useEffect(() => {
    if (!autoplay || stack.length <= 1 || isPaused || interactionLocked) {
      return;
    }
    const interval = setInterval(() => {
      setStack((prev) => {
        if (!prev.length) return prev;
        const newStack = [...prev];
        const card = newStack.pop();
        if (!card) return prev;
        newStack.unshift(card);
        return newStack;
      });
      onCardAdvancedRef.current?.();
    }, autoplayDelay);
    return () => clearInterval(interval);
  }, [
    autoplay,
    autoplayDelay,
    stack.length,
    isPaused,
    interactionLocked,
  ]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => (
        <CardRotate
          key={card.id}
          onSendToBack={() => sendToBack(card.id)}
          sensitivity={sensitivity}
          disableDrag={shouldDisableDrag}
        >
          <motion.div
            className="card"
            onClick={() => shouldEnableClick && sendToBack(card.id)}
            animate={{
              rotateZ: (stack.length - index - 1) * 4 + card.rotation,
              scale: 1 + index * 0.06 - stack.length * 0.06,
              transformOrigin: "90% 90%",
            }}
            initial={false}
            transition={{
              type: "spring",
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping,
            }}
          >
            {contentById.get(card.id) ?? card.content}
          </motion.div>
        </CardRotate>
      ))}
    </div>
  );
}
