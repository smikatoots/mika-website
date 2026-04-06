/** Notion multi_select colors → Tailwind (light UI cards). */
export function projectTagClass(color: string): string {
  const base = "rounded-full border px-2.5 py-0.5 text-xs font-medium";
  const map: Record<string, string> = {
    default: "border-zinc-200 bg-zinc-100 text-zinc-800",
    gray: "border-zinc-200 bg-zinc-100 text-zinc-800",
    brown: "border-amber-200 bg-amber-50 text-amber-950",
    orange: "border-orange-200 bg-orange-50 text-orange-950",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-950",
    green: "border-emerald-200 bg-emerald-50 text-emerald-950",
    blue: "border-blue-200 bg-blue-50 text-blue-950",
    purple: "border-purple-200 bg-purple-50 text-purple-950",
    pink: "border-pink-200 bg-pink-50 text-pink-950",
    red: "border-red-200 bg-red-50 text-red-950",
  };
  return `${base} ${map[color] ?? map.default}`;
}
