import { InternalLink } from "@/components/ui/InternalLink";

export function AiGuideComingSoonBlock({
  description,
}: {
  description: string;
}) {
  return (
    <div className="mt-10 space-y-8">
      <p className="text-lg leading-relaxed text-zinc-700">{description}</p>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-8 text-center">
        <p className="text-base font-medium text-zinc-900">
          This video &amp; guide is coming soon!
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          I&apos;m still filming and writing the deep-dive for this one. Start
          with{" "}
          <InternalLink
            href="/ai/ai-wedding-planning-part-1"
            className="font-medium text-accent"
          >
            Part 1 of AI Wedding Planning
          </InternalLink>{" "}
          while you wait.
        </p>
      </div>
    </div>
  );
}
