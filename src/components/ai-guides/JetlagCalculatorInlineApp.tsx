"use client";

import { useEffect, useRef, useState } from "react";

type AdjustmentMode = "before-flight" | "after-arrival";
type Goal =
  | "functional-asap"
  | "sleep-first-night"
  | "avoid-daytime-sleepiness"
  | "adjust-gently"
  | "optimize-performance";

type JetlagFormData = {
  departureCity: string;
  arrivalCity: string;
  departureDateTime: string;
  arrivalDateTime: string;
  layovers: string;
  usualSleepTime: string;
  usualWakeTime: string;
  adjustmentMode: AdjustmentMode;
  goal: Goal;
  constraints: string;
};

type Recommendation = {
  direction: "eastward" | "westward" | "mostly north/south";
  zonesCrossed: number;
  severity: "low" | "moderate" | "high";
  focus: string;
  bodyClockShift: string;
  calendar: Array<{
    dayLabel: string;
    localZone: string;
    items: string[];
  }>;
  flightTimeline: string[];
  firstDays: string[];
  doAvoid: Array<{ do: string; avoid: string; why: string }>;
  caveats: string[];
};

const FLAMINGO_BG = "bg-[#fff1f6]";
const FLAMINGO_BORDER = "border-[#fc8eac]";
const FLAMINGO_ACCENT = "text-[#ad1457]";
const FLAMINGO_BUTTON = "bg-[#fc8eac] hover:bg-[#fb7aa1]";

const DEFAULT_FORM: JetlagFormData = {
  departureCity: "",
  arrivalCity: "",
  departureDateTime: "",
  arrivalDateTime: "",
  layovers: "",
  usualSleepTime: "23:00",
  usualWakeTime: "07:00",
  adjustmentMode: "before-flight",
  goal: "functional-asap",
  constraints: "",
};

const GOAL_FOCUS: Record<Goal, string> = {
  "functional-asap": "feel functional as fast as possible",
  "sleep-first-night": "sleep well on the first destination night",
  "avoid-daytime-sleepiness": "reduce daytime sleepiness and protect focus",
  "adjust-gently": "shift your body clock with a gentler pace",
  "optimize-performance": "optimize energy and performance in the first 72 hours",
};

function estimateDirection(
  departureCity: string,
  arrivalCity: string,
): Recommendation["direction"] {
  const route = `${departureCity} ${arrivalCity}`.toLowerCase();
  const hasNy = route.includes("new york") || route.includes("nyc");
  const hasPh =
    route.includes("manila") ||
    route.includes("philippines") ||
    route.includes("cebu");

  if (hasNy && hasPh) return "eastward";

  return "mostly north/south";
}

function estimateZonesCrossed(
  departureDateTime: string,
  arrivalDateTime: string,
): number {
  if (!departureDateTime || !arrivalDateTime) return 6;
  const dep = new Date(departureDateTime);
  const arr = new Date(arrivalDateTime);
  if (Number.isNaN(dep.getTime()) || Number.isNaN(arr.getTime())) return 6;
  const hours = Math.abs(arr.getTime() - dep.getTime()) / (1000 * 60 * 60);
  const estimated = Math.round(hours / 2.5);
  return Math.max(1, Math.min(12, estimated));
}

function estimateSeverity(
  zonesCrossed: number,
  direction: Recommendation["direction"],
  adjustmentMode: AdjustmentMode,
): Recommendation["severity"] {
  const eastwardPenalty = direction === "eastward" ? 1 : 0;
  const noPreAdjustPenalty = adjustmentMode === "after-arrival" ? 1 : 0;
  const score = zonesCrossed + eastwardPenalty + noPreAdjustPenalty;

  if (score <= 4) return "low";
  if (score <= 8) return "moderate";
  return "high";
}

function toTitleCase(value: string): string {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildRecommendation(form: JetlagFormData): Recommendation {
  const direction = estimateDirection(form.departureCity, form.arrivalCity);
  const zonesCrossed = estimateZonesCrossed(
    form.departureDateTime,
    form.arrivalDateTime,
  );
  const severity = estimateSeverity(zonesCrossed, direction, form.adjustmentMode);

  const shiftDirection = direction === "eastward" ? "earlier" : "later";
  const bodyClockShift = `Shift your body clock ${shiftDirection} by about ${Math.max(2, Math.round(
    zonesCrossed / 2,
  ))} to ${zonesCrossed} hours.`;

  return {
    direction,
    zonesCrossed,
    severity,
    focus: GOAL_FOCUS[form.goal],
    bodyClockShift,
    calendar: [
      {
        dayLabel: "3 days before departure",
        localZone: form.departureCity || "origin local time",
        items: [
          `Move bedtime and wake time 30 to 45 minutes ${shiftDirection}.`,
          "Get 20 to 30 minutes of outdoor light after waking.",
          "Keep caffeine to morning and early afternoon only.",
        ],
      },
      {
        dayLabel: "1 day before departure",
        localZone: form.departureCity || "origin local time",
        items: [
          "Pack sleep kit: eye mask, earplugs, neck pillow, and water bottle.",
          "Stop caffeine at least 8 hours before planned sleep.",
          "Eat dinner a little closer to destination dinner timing.",
        ],
      },
      {
        dayLabel: "Flight day",
        localZone: "in-flight / destination local time",
        items: [
          "Set your phone/watch to destination time after boarding.",
          "Hydrate every 60 to 90 minutes and stretch every 90 to 120 minutes.",
          "Use eye mask and earplugs during your destination sleep window.",
        ],
      },
      {
        dayLabel: "Arrival day",
        localZone: form.arrivalCity || "destination local time",
        items: [
          "Get bright outdoor light in the destination morning or early afternoon.",
          "Keep naps short: 20 to 30 minutes max before mid-afternoon.",
          "Aim for a consistent local bedtime, even if sleep is light.",
        ],
      },
      {
        dayLabel: "Day 1 to 3 after arrival",
        localZone: form.arrivalCity || "destination local time",
        items: [
          "Anchor wake time, meal timing, and movement at the same times daily.",
          "Avoid bright screens in the last 60 to 90 minutes before bed.",
          "Use caffeine strategically and stop by early afternoon.",
        ],
      },
    ],
    flightTimeline: [
      "Set watch/phone to destination time after takeoff.",
      "Prioritize sleep during destination nighttime blocks.",
      "Choose lighter meals and hydrate often.",
      "Avoid alcohol if your goal is faster adjustment.",
      "Walk or stretch every 90 to 120 minutes.",
    ],
    firstDays: [
      "Wake at a fixed local time, even after poor sleep.",
      "Get outside in the first hour after waking when possible.",
      "Use a short nap only if needed, then get back to schedule.",
    ],
    doAvoid: [
      {
        do: "Get outdoor light after waking",
        avoid: "Long late naps",
        why: "Light anchors your circadian rhythm and protects nighttime sleep.",
      },
      {
        do: "Hydrate consistently",
        avoid: "Using alcohol as a sleep strategy",
        why: "Hydration helps alertness while alcohol fragments sleep quality.",
      },
      {
        do: "Stop caffeine in early afternoon",
        avoid: "Caffeine too close to bedtime",
        why: "Caffeine half-life can delay sleep onset by hours.",
      },
    ],
    caveats: [
      `Optimized for: ${GOAL_FOCUS[form.goal]}.`,
      "Assumes no diagnosed sleep disorder and no urgent medical constraints.",
      "For melatonin, sleep meds, pregnancy, or chronic illness, check with a healthcare professional.",
    ],
  };
}

function Label({ children }: { children: string }) {
  return (
    <label className="mb-2 block text-sm font-medium text-zinc-700">
      {children}
    </label>
  );
}

export function JetlagCalculatorInlineApp() {
  const [form, setForm] = useState<JetlagFormData>(DEFAULT_FORM);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isLocked = recommendation !== null;
  const hasRequiredFields =
    form.departureCity.trim() !== "" &&
    form.arrivalCity.trim() !== "" &&
    form.departureDateTime.trim() !== "" &&
    form.arrivalDateTime.trim() !== "" &&
    form.usualSleepTime.trim() !== "" &&
    form.usualWakeTime.trim() !== "";

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function updateField<K extends keyof JetlagFormData>(
    key: K,
    value: JetlagFormData[K],
  ) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleGenerate() {
    if (isGenerating || isLocked || !hasRequiredFields) return;
    setIsGenerating(true);
    const nextRecommendation = buildRecommendation(form);
    timerRef.current = setTimeout(() => {
      setRecommendation(nextRecommendation);
      setIsGenerating(false);
      timerRef.current = null;
    }, 5000);
  }

  return (
    <section
      className={`not-prose my-8 rounded-2xl border p-6 shadow-sm ${FLAMINGO_BORDER} ${FLAMINGO_BG}`}
    >
      <div className="mb-5">
        <h3 className="text-2xl font-semibold text-zinc-900">Jetlag Calculator</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">
          For illustrative purposes only.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Departure country/city</Label>
          <input
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            placeholder="New York, USA"
            value={form.departureCity}
            disabled={isLocked}
            onChange={(event) => updateField("departureCity", event.target.value)}
          />
        </div>
        <div>
          <Label>Arrival country/city</Label>
          <input
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            placeholder="Manila, Philippines"
            value={form.arrivalCity}
            disabled={isLocked}
            onChange={(event) => updateField("arrivalCity", event.target.value)}
          />
        </div>
        <div>
          <Label>Departure date and local time</Label>
          <input
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            type="datetime-local"
            value={form.departureDateTime}
            disabled={isLocked}
            onChange={(event) =>
              updateField("departureDateTime", event.target.value)
            }
          />
        </div>
        <div>
          <Label>Arrival date and local time</Label>
          <input
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            type="datetime-local"
            value={form.arrivalDateTime}
            disabled={isLocked}
            onChange={(event) => updateField("arrivalDateTime", event.target.value)}
          />
        </div>
        <div>
          <Label>Layovers (optional)</Label>
          <input
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            placeholder="Tokyo (2h)"
            value={form.layovers}
            disabled={isLocked}
            onChange={(event) => updateField("layovers", event.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Usual sleep time</Label>
            <input
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
              type="time"
              value={form.usualSleepTime}
              disabled={isLocked}
              onChange={(event) => updateField("usualSleepTime", event.target.value)}
            />
          </div>
          <div>
            <Label>Usual wake time</Label>
            <input
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
              type="time"
              value={form.usualWakeTime}
              disabled={isLocked}
              onChange={(event) => updateField("usualWakeTime", event.target.value)}
            />
          </div>
        </div>
        <div>
          <Label>When do you want to start adjusting?</Label>
          <select
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            value={form.adjustmentMode}
            disabled={isLocked}
            onChange={(event) =>
              updateField("adjustmentMode", event.target.value as AdjustmentMode)
            }
          >
            <option value="before-flight">Before the flight</option>
            <option value="after-arrival">Only after arrival</option>
          </select>
        </div>
        <div>
          <Label>Main goal</Label>
          <select
            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
            value={form.goal}
            disabled={isLocked}
            onChange={(event) => updateField("goal", event.target.value as Goal)}
          >
            <option value="functional-asap">Feel functional ASAP</option>
            <option value="sleep-first-night">Sleep well first night</option>
            <option value="avoid-daytime-sleepiness">
              Avoid daytime sleepiness
            </option>
            <option value="adjust-gently">Adjust gently</option>
            <option value="optimize-performance">Optimize performance</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <Label>Constraints or special context</Label>
        <textarea
          className="min-h-[96px] w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900"
          placeholder="Caffeine sensitivity, melatonin preference, red-eye flight, work meetings, kids, meal preferences..."
          value={form.constraints}
          disabled={isLocked}
          onChange={(event) => updateField("constraints", event.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-zinc-900 transition ${FLAMINGO_BUTTON}`}
          type="button"
          disabled={isGenerating || isLocked || !hasRequiredFields}
          onClick={handleGenerate}
        >
          {isGenerating ? "Thinking..." : "Generate my plan"}
        </button>
        <button
          className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          type="button"
          onClick={() => {
            if (timerRef.current !== null) {
              clearTimeout(timerRef.current);
              timerRef.current = null;
            }
            setForm(DEFAULT_FORM);
            setRecommendation(null);
            setIsGenerating(false);
          }}
        >
          Reset
        </button>
      </div>

      {isGenerating ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center gap-3 text-sm text-zinc-700">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-700" />
            <span>Thinking through your jet lag plan...</span>
          </div>
        </div>
      ) : null}

      {recommendation ? (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-4">
          <h4 className="text-lg font-semibold text-zinc-900">
            Personalized recommendation
          </h4>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
              <strong>Direction:</strong>{" "}
              {toTitleCase(recommendation.direction)}
            </p>
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
              <strong>Time zones crossed:</strong> {recommendation.zonesCrossed}
            </p>
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
              <strong>Severity:</strong>{" "}
              <span className={`font-semibold ${FLAMINGO_ACCENT}`}>
                {toTitleCase(recommendation.severity)}
              </span>
            </p>
            <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-800">
              <strong>Goal focus:</strong> {recommendation.focus}
            </p>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-zinc-700">
            <strong>Body clock shift needed:</strong> {recommendation.bodyClockShift}
          </p>

          <h5 className="mt-4 text-base font-semibold text-zinc-900">
            Jet lag calendar
          </h5>
          <div className="mt-2 space-y-3">
            {recommendation.calendar.map((day) => (
              <div
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-3"
                key={day.dayLabel}
              >
                <p className="text-sm font-semibold text-zinc-900">
                  {day.dayLabel}
                </p>
                <p className="text-xs text-zinc-600">{day.localZone}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                  {day.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h5 className="mt-4 text-base font-semibold text-zinc-900">
            Flight timeline
          </h5>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            {recommendation.flightTimeline.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h5 className="mt-4 text-base font-semibold text-zinc-900">
            First 2 to 3 days after arrival
          </h5>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            {recommendation.firstDays.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h5 className="mt-4 text-base font-semibold text-zinc-900">
            Quick do / avoid
          </h5>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm text-zinc-800">
              <thead>
                <tr>
                  <th className="border border-zinc-200 bg-zinc-100 px-3 py-2 font-semibold text-zinc-950">
                    Do
                  </th>
                  <th className="border border-zinc-200 bg-zinc-100 px-3 py-2 font-semibold text-zinc-950">
                    Avoid
                  </th>
                  <th className="border border-zinc-200 bg-zinc-100 px-3 py-2 font-semibold text-zinc-950">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {recommendation.doAvoid.map((row) => (
                  <tr key={`${row.do}-${row.avoid}`}>
                    <td className="border border-zinc-200 px-3 py-2">{row.do}</td>
                    <td className="border border-zinc-200 px-3 py-2">{row.avoid}</td>
                    <td className="border border-zinc-200 px-3 py-2">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h5 className="mt-4 text-base font-semibold text-zinc-900">
            Preferences, assumptions, and caveats
          </h5>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
            {recommendation.caveats.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
