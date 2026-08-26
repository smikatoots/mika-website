"use client";

import { useState, type ReactNode } from "react";

type DemographicSlice = {
  label: string;
  percent: number;
};

/** Categorical data palette. Brand Coral leads; the rest are chart-only hues
 *  chosen for separability, not brand colors. See DESIGN.md > Colors. */
const PIE_COLORS = [
  "#E8425A",
  "#2563eb",
  "#f59e0b",
  "#10b981",
  "#8b5cf6",
  "#06b6d4",
  "#94a3b8",
] as const;

const SIZE = 176;
const CENTER = SIZE / 2;
const RADIUS = 68;
const INNER_LABEL_RADIUS = 40;

function slicesWithOther(slices: DemographicSlice[]): DemographicSlice[] {
  const total = slices.reduce((sum, slice) => sum + slice.percent, 0);
  if (total >= 99.95) {
    return slices;
  }
  return [
    ...slices,
    { label: "Other", percent: Math.round((100 - total) * 10) / 10 },
  ];
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDegrees: number,
) {
  const radians = ((angleDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeSlicePath(
  startAngle: number,
  endAngle: number,
  radius: number,
): string {
  const start = polarToCartesian(CENTER, CENTER, radius, endAngle);
  const end = polarToCartesian(CENTER, CENTER, radius, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${CENTER} ${CENTER}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function DemographicPieChart({
  title,
  slices,
  note,
}: {
  title: string;
  slices: DemographicSlice[];
  note: ReactNode;
}) {
  const chartSlices = slicesWithOther(slices);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const arcs = chartSlices.map((slice, index) => {
    const startAngle = chartSlices
      .slice(0, index)
      .reduce((sum, s) => sum + (s.percent / 100) * 360, 0);
    const endAngle = startAngle + (slice.percent / 100) * 360;
    return {
      ...slice,
      index,
      startAngle,
      endAngle,
      color: PIE_COLORS[index % PIE_COLORS.length],
      path: describeSlicePath(startAngle, endAngle, RADIUS),
    };
  });

  const isDimmed = (index: number) =>
    hoveredIndex !== null && hoveredIndex !== index;

  const isHighlighted = (index: number) => hoveredIndex === index;

  const highlightSlice = (index: number) => setHoveredIndex(index);
  const clearHighlight = () => setHoveredIndex(null);

  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-base font-semibold text-zinc-950 sm:text-lg">{title}</h3>
      <div className="mt-6 flex flex-1 flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="mx-auto shrink-0 touch-manipulation sm:mx-0"
          role="img"
          aria-label={`${title} breakdown pie chart`}
          onMouseLeave={clearHighlight}
        >
          {arcs.map((arc) => (
            <path
              key={arc.label}
              d={arc.path}
              fill={arc.color}
              stroke="#ffffff"
              strokeWidth={2}
              className="cursor-pointer transition-[opacity,transform] duration-150"
              style={{
                opacity: isDimmed(arc.index) ? 0.35 : 1,
                transform: isHighlighted(arc.index)
                  ? `scale(1.04)`
                  : "scale(1)",
                transformOrigin: `${CENTER}px ${CENTER}px`,
              }}
              onMouseEnter={() => highlightSlice(arc.index)}
              onTouchStart={() => highlightSlice(arc.index)}
            />
          ))}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_LABEL_RADIUS}
            fill="#ffffff"
          />
          <text
            x={CENTER}
            y={CENTER}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#71717a"
            fontSize={10}
            fontWeight={500}
          >
            {title}
          </text>
        </svg>
        <ul
          className="w-full min-w-0 space-y-2 sm:max-w-[240px]"
          onMouseLeave={clearHighlight}
          onTouchEnd={clearHighlight}
        >
          {arcs.map((arc) => (
            <li
              key={arc.label}
              className={`flex cursor-default items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm transition-colors sm:gap-3 sm:py-1.5 ${
                isHighlighted(arc.index)
                  ? "bg-zinc-100 ring-2 ring-zinc-300"
                  : isDimmed(arc.index)
                    ? "opacity-50"
                    : ""
              }`}
              onMouseEnter={() => highlightSlice(arc.index)}
              onTouchStart={() => highlightSlice(arc.index)}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span
                  className={`h-3.5 w-3.5 shrink-0 rounded-full transition-transform ${
                    isHighlighted(arc.index) ? "scale-125 ring-2 ring-zinc-300" : ""
                  }`}
                  style={{ backgroundColor: arc.color }}
                  aria-hidden
                />
                <span className="break-words text-zinc-700">{arc.label}</span>
              </span>
              <span className="shrink-0 font-medium tabular-nums text-zinc-950">
                {arc.percent}%
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 text-sm leading-relaxed text-zinc-600">{note}</div>
    </div>
  );
}
