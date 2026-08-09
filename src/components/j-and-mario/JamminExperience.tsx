"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FormEvent,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "gsap";

import Stack from "./Stack";
import StickerPeel from "./StickerPeel";
import TiltedCard from "./TiltedCard";
import {
  INITIAL_REVEALED_COUNT,
  MEMORY_PHOTOS,
  MESSAGE_PARTS,
  PASSWORD,
  STORAGE_KEY,
  TRIVIA_CARDS,
  type TriviaCard,
} from "./content";
import "./jammin.css";

type Phase = "password" | "instructions" | "play";

const UNLOCK_EVENT = "jammin-unlock";

const DESK_STICKERS = [
  {
    id: "s2",
    src: "/j-and-mario/stickers/jammin-logo.png",
    width: 280,
    rotate: -8,
    peelDirection: 0,
    peelBackHoverPct: 0,
    noteIndex: 0, // yellow
  },
  {
    id: "s6",
    src: "/j-and-mario/stickers/cutout-5.png",
    width: 175,
    rotate: 5,
    peelDirection: 154,
    peelBackHoverPct: 15,
    noteIndex: 1, // pink
  },
  {
    id: "s4",
    src: "/j-and-mario/stickers/cutout-3.png",
    width: 250,
    rotate: 3,
    peelDirection: 154,
    peelBackHoverPct: 15,
    noteIndex: 2, // green
  },
  {
    id: "s3",
    src: "/j-and-mario/stickers/cutout-2.png",
    width: 240,
    rotate: 6,
    peelDirection: 154,
    peelBackHoverPct: 15,
    noteIndex: 3, // blue
  },
  {
    id: "s5",
    src: "/j-and-mario/stickers/cutout-4.png",
    width: 175,
    rotate: 7,
    peelDirection: 154,
    peelBackHoverPct: 15,
    noteIndex: 4, // orange
  },
  {
    id: "s1",
    src: "/j-and-mario/stickers/cutout-1.png",
    width: 235,
    rotate: -5,
    peelDirection: 154,
    peelBackHoverPct: 15,
    noteIndex: 5, // purple
  },
] as const;

function subscribeUnlocked(onStoreChange: () => void) {
  window.addEventListener(UNLOCK_EVENT, onStoreChange);
  return () => window.removeEventListener(UNLOCK_EVENT, onStoreChange);
}

function getUnlockedSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function getUnlockedServerSnapshot() {
  return false;
}

function persistUnlock() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(UNLOCK_EVENT));
}

function CardOverlay({
  question,
  options,
  correctIndex,
  interactive,
  canAdvance,
  showWrongFeedback,
  onAnswer,
  onNextClick,
}: {
  question: string;
  options: string[];
  correctIndex: number;
  interactive: boolean;
  canAdvance: boolean;
  showWrongFeedback: boolean;
  onAnswer: (optionIndex: number) => void;
  onNextClick: () => void;
}) {
  return (
    <div
      className={`jammin-card-overlay${interactive ? " is-interactive" : ""}`}
    >
      <p className="jammin-question-text">{question}</p>
      {interactive && (
        <div
          className="jammin-answers"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {options.map((option, index) => {
            const isCorrect = index === correctIndex;
            const locked = canAdvance;
            return (
              <button
                key={option}
                type="button"
                className={`jammin-answer-btn${
                  locked && isCorrect ? " is-correct" : ""
                }${locked ? " is-locked" : ""}`}
                // Keep pointer events so clicks don't fall through to the stack.
                aria-disabled={locked}
                tabIndex={locked ? -1 : 0}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (locked) return;
                  onAnswer(index);
                }}
              >
                <span className="jammin-answer-label">{option}</span>
                {locked && isCorrect ? (
                  <span className="jammin-answer-star" aria-label="correct">
                    ⭐
                  </span>
                ) : null}
              </button>
            );
          })}
          {canAdvance && (
            <button
              type="button"
              className="jammin-next-btn"
              onClick={(e) => {
                e.stopPropagation();
                onNextClick();
              }}
            >
              Next card →
            </button>
          )}
          <p
            className={`jammin-feedback${showWrongFeedback ? " is-wrong" : ""}`}
            role="status"
            aria-hidden={!showWrongFeedback}
          >
            {showWrongFeedback ? "Nope — try another answer." : "\u00a0"}
          </p>
        </div>
      )}
    </div>
  );
}

function StickyNote({
  text,
  color,
  rotate,
  revealed,
}: {
  text: string;
  color: string;
  rotate: number;
  revealed: boolean;
  index: number;
}) {
  return (
    <motion.article
      className={`jammin-sticky ${revealed ? "is-revealed" : "is-hidden"}`}
      style={
        {
          "--sticky-color": color,
          "--sticky-rotate": `${rotate}deg`,
        } as CSSProperties
      }
      initial={false}
      animate={
        revealed
          ? { opacity: 1, scale: 1 }
          : { opacity: 0.72, scale: 0.99 }
      }
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <div className="jammin-sticky-body">
        {revealed ? (
          <p className="jammin-sticky-text">{text}</p>
        ) : (
          <p className="jammin-sticky-placeholder">
            Answer a trivia card to reveal…
          </p>
        )}
      </div>
    </motion.article>
  );
}

function MessageEasterEgg({ onRevealAll }: { onRevealAll: () => void }) {
  return (
    <button
      type="button"
      className="jammin-message-egg"
      onClick={onRevealAll}
      aria-label="Reveal entire message"
    >
      message
    </button>
  );
}

function FinaleCard() {
  return (
    <div className="jammin-finale-card" aria-live="polite">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/j-and-mario/card-1.svg"
        alt=""
        className="jammin-finale-bg"
        draggable={false}
      />
      <div className="jammin-finale-copy">
        <p>congrats!</p>
        <p>we love you!</p>
        <p className="jammin-finale-signoff">♥️ mika &amp; nick</p>
      </div>
    </div>
  );
}

function MemoryPhotoStack() {
  const photoCards = useMemo(
    () =>
      MEMORY_PHOTOS.map((photo) => (
        // Stack needs plain img nodes for drag; next/image is awkward inside motion layers.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={photo.id}
          src={photo.src}
          alt={photo.alt}
          className="jammin-memory-photo"
        />
      )),
    [],
  );

  return (
    <div className="jammin-stack-wrap jammin-memory-wrap">
      <Stack
        cards={photoCards}
        randomRotation
        sensitivity={100}
        sendToBackOnClick
        interactionLocked={false}
        animationConfig={{ stiffness: 240, damping: 24 }}
      />
    </div>
  );
}

function DeskStickers({
  boundsRef,
  stickiesRef,
}: {
  boundsRef: RefObject<HTMLElement | null>;
  stickiesRef: RefObject<HTMLElement | null>;
}) {
  const homeRef = useRef<HTMLDivElement>(null);
  const placedRef = useRef(false);
  const [zById, setZById] = useState<Record<string, number>>(() =>
    Object.fromEntries(DESK_STICKERS.map((s, i) => [s.id, i + 1])),
  );

  const bringToFront = useCallback((id: string) => {
    setZById((prev) => {
      const max = Math.max(0, ...Object.values(prev));
      if (prev[id] === max) return prev;
      return { ...prev, [id]: max + 1 };
    });
  }, []);

  const placeStickersInNotes = useCallback(() => {
    const home = homeRef.current;
    const stickies = stickiesRef.current;
    if (!home || !stickies) return false;

    const notes = stickies.querySelectorAll<HTMLElement>(".jammin-sticky");
    if (notes.length < DESK_STICKERS.length) return false;

    let allReady = true;

    for (const sticker of DESK_STICKERS) {
      const el = home.querySelector<HTMLElement>(
        `[data-sticker-id="${sticker.id}"]`,
      );
      const note = notes[sticker.noteIndex];
      if (!el || !note) {
        allReady = false;
        continue;
      }

      const imgs = el.querySelectorAll("img");
      for (const img of imgs) {
        if (!img.complete || img.naturalWidth === 0) {
          allReady = false;
        }
      }

      const noteRect = note.getBoundingClientRect();
      // Keep each sticker inside its sticky cell (notes are ~square).
      const fit = Math.max(
        96,
        Math.min(sticker.width, noteRect.width * 0.78, noteRect.height * 0.78),
      );
      el.style.setProperty("--sticker-width", `${Math.round(fit)}px`);

      const elRect = el.getBoundingClientRect();
      if (elRect.width < 8 || elRect.height < 8) {
        allReady = false;
        continue;
      }

      const curX = Number(gsap.getProperty(el, "x")) || 0;
      const curY = Number(gsap.getProperty(el, "y")) || 0;
      const elCenterX = elRect.left + elRect.width / 2;
      const elCenterY = elRect.top + elRect.height / 2;
      const noteCenterX = noteRect.left + noteRect.width / 2;
      const noteCenterY = noteRect.top + noteRect.height / 2;

      gsap.set(el, {
        x: curX + (noteCenterX - elCenterX),
        y: curY + (noteCenterY - elCenterY),
      });
    }

    return allReady;
  }, [stickiesRef]);

  useEffect(() => {
    if (placedRef.current) return;

    let cancelled = false;
    let tries = 0;
    let timer = 0;

    const attempt = () => {
      if (cancelled || placedRef.current) return;
      if (placeStickersInNotes()) {
        placedRef.current = true;
        return;
      }
      tries += 1;
      if (tries < 40) {
        timer = window.setTimeout(attempt, 50);
      }
    };

    // Run after StickerPeel's own mount effects (initialPosition + Draggable).
    timer = window.setTimeout(attempt, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [placeStickersInNotes]);

  return (
    <div className="jammin-sticker-home" ref={homeRef}>
      {DESK_STICKERS.map((sticker) => (
        <StickerPeel
          key={sticker.id}
          stickerId={sticker.id}
          imageSrc={sticker.src}
          width={sticker.width}
          rotate={sticker.rotate}
          peelDirection={sticker.peelDirection}
          peelBackHoverPct={sticker.peelBackHoverPct}
          peelBackActivePct={0}
          shadowIntensity={0.45}
          lightingIntensity={0.03}
          initialPosition={{ x: 0, y: 0 }}
          boundsRef={boundsRef}
          zIndex={40 + (zById[sticker.id] ?? 1)}
          onBringToFront={() => bringToFront(sticker.id)}
        />
      ))}
    </div>
  );
}

function DeskBoard({
  blurred,
  remaining,
  current,
  revealedCount,
  feedback,
  canAdvance,
  interactionLocked,
  advanceToken,
  onAnswer,
  onAdvanceFromStack,
  onNextClick,
  onRevealAll,
}: {
  blurred?: boolean;
  remaining: TriviaCard[];
  current: TriviaCard | null;
  revealedCount: number;
  feedback: "wrong" | null;
  canAdvance: boolean;
  interactionLocked: boolean;
  advanceToken: number;
  onAnswer: (optionIndex: number) => void;
  onAdvanceFromStack: () => void;
  onNextClick: () => void;
  onRevealAll: () => void;
}) {
  const deskRef = useRef<HTMLDivElement>(null);
  const stickiesRef = useRef<HTMLDivElement>(null);
  const stackCards = useMemo(
    () =>
      remaining.map((card) => {
        const isCurrent = current?.id === card.id;
        return (
          <div key={card.id} className="jammin-stack-card">
            <TiltedCard
              imageSrc={card.imageSrc}
              altText={`Trivia card: ${card.question}`}
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.04}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent
              overlayContent={
                <CardOverlay
                  question={card.question}
                  options={card.options}
                  correctIndex={card.correctIndex}
                  interactive={isCurrent}
                  canAdvance={isCurrent && canAdvance}
                  showWrongFeedback={isCurrent && feedback === "wrong"}
                  onAnswer={onAnswer}
                  onNextClick={onNextClick}
                />
              }
            />
          </div>
        );
      }),
    [remaining, current, canAdvance, feedback, onAnswer, onNextClick],
  );

  return (
    <div
      ref={deskRef}
      className={`jammin-desk ${blurred ? "is-blurred" : ""}`}
      aria-hidden={blurred}
    >
      <div className="jammin-desk-grain" />
      <div className="jammin-panes">
        <section className="jammin-pane jammin-pane-left">
          <div className="jammin-pane-label">trivia cards</div>

          <div className="jammin-stack-stage">
            <div className="jammin-stack-wrap">
              {remaining.length > 0 ? (
                <Stack
                  cards={stackCards}
                  randomRotation
                  sensitivity={120}
                  sendToBackOnClick={canAdvance}
                  interactionLocked={interactionLocked}
                  advanceToken={advanceToken}
                  onCardAdvanced={onAdvanceFromStack}
                  animationConfig={{ stiffness: 240, damping: 24 }}
                />
              ) : (
                <FinaleCard />
              )}
            </div>
          </div>

          <div className="jammin-polaroid-section">
            <div className="jammin-pane-label jammin-polaroid-sign">
              polaroid mems
            </div>
            <MemoryPhotoStack />
          </div>
        </section>

        <section className="jammin-pane jammin-pane-right">
          <div className="jammin-pane-label">
            secret <MessageEasterEgg onRevealAll={onRevealAll} />
          </div>
          <div className="jammin-messages-stage">
            <div className="jammin-stickies" ref={stickiesRef}>
              {MESSAGE_PARTS.map((part, index) => (
                <StickyNote
                  key={part.id}
                  index={index}
                  text={part.text}
                  color={part.color}
                  rotate={part.rotate}
                  revealed={index < revealedCount}
                />
              ))}
            </div>
            <div className="jammin-sticker-section">
              <DeskStickers boundsRef={deskRef} stickiesRef={stickiesRef} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function JamminExperience() {
  const unlocked = useSyncExternalStore(
    subscribeUnlocked,
    getUnlockedSnapshot,
    getUnlockedServerSnapshot,
  );
  const [playing, setPlaying] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  // Stack puts the last array item on top — reverse so Q1 is first.
  const [remaining, setRemaining] = useState<TriviaCard[]>(() =>
    [...TRIVIA_CARDS].reverse(),
  );
  const [revealedCount, setRevealedCount] = useState(INITIAL_REVEALED_COUNT);
  const [feedback, setFeedback] = useState<"wrong" | null>(null);
  const [canAdvance, setCanAdvance] = useState(false);
  const [advanceToken, setAdvanceToken] = useState(0);
  const advancingRef = useRef(false);
  const answerLockRef = useRef(false);

  const phase: Phase = !unlocked
    ? "password"
    : playing
      ? "play"
      : "instructions";

  const current = remaining.length ? remaining[remaining.length - 1] : null;
  const interactionLocked = !canAdvance;

  const handlePassword = (e: FormEvent) => {
    e.preventDefault();
    const value = passwordInput.trim().toLowerCase();
    if (value === PASSWORD) {
      setPasswordError(false);
      persistUnlock();
      return;
    }
    setPasswordError(true);
  };

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (!current || canAdvance || answerLockRef.current) return;
      if (optionIndex === current.correctIndex) {
        answerLockRef.current = true;
        setFeedback(null);
        setCanAdvance(true);
        setRevealedCount((c) => Math.min(MESSAGE_PARTS.length, c + 1));
      } else {
        setFeedback("wrong");
        window.setTimeout(() => setFeedback(null), 1200);
      }
    },
    [canAdvance, current],
  );

  const handleRevealAll = useCallback(() => {
    setRevealedCount(MESSAGE_PARTS.length);
  }, []);

  const finishAdvance = useCallback(() => {
    if (!canAdvance || advancingRef.current || !current) return;
    const idToRemove = current.id;

    advancingRef.current = true;
    setCanAdvance(false);
    setFeedback(null);
    // Remove in the same turn as send-to-back so the stack never
    // remounts / snaps the answered card back to the front.
    setRemaining((prev) => prev.filter((card) => card.id !== idToRemove));
    answerLockRef.current = false;
    advancingRef.current = false;
  }, [canAdvance, current]);

  const handleNextClick = useCallback(() => {
    if (!canAdvance || advancingRef.current) return;
    setAdvanceToken((t) => t + 1);
  }, [canAdvance]);

  if (phase === "password") {
    return (
      <div className="jammin-root">
        <div className="jammin-password">
          <div className="jammin-password-card">
            <p className="jammin-eyebrow">private card</p>
            <h1>J &amp; Mario</h1>
            <p className="jammin-clue">
              Clue: <em>name of our group chat</em>
            </p>
            <form onSubmit={handlePassword} className="jammin-password-form">
              <input
                type="password"
                autoComplete="off"
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="enter password"
                aria-label="Password"
              />
              <button type="submit">Unlock</button>
            </form>
            {passwordError && (
              <p className="jammin-password-error">
                Hmm, not that one. Try again.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jammin-root">
      <DeskBoard
        blurred={phase === "instructions"}
        remaining={remaining}
        current={current}
        revealedCount={revealedCount}
        feedback={feedback}
        canAdvance={canAdvance}
        interactionLocked={interactionLocked}
        advanceToken={advanceToken}
        onAnswer={handleAnswer}
        onAdvanceFromStack={finishAdvance}
        onNextClick={handleNextClick}
        onRevealAll={handleRevealAll}
      />

      <AnimatePresence>
        {phase === "instructions" && (
          <motion.div
            className="jammin-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="jammin-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="jammin-modal-title"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <h1 id="jammin-modal-title">happy wedding, j &amp; mario!</h1>
              <p className="jammin-modal-body">
                there is a hidden message on the right side panel. the first
                note is already waiting for you. to reveal the rest (+ an extra
                bonus!), you must answer the trivia cards correctly (y&apos;all
                know we love a good game).
                <br />
                <br />
                good luck! we love you both!
              </p>
              <p className="jammin-modal-signoff">love, mika &amp; nick</p>
              <div className="jammin-modal-actions">
                <button
                  type="button"
                  className="jammin-cta"
                  onClick={() => setPlaying(true)}
                >
                  let’s play!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
