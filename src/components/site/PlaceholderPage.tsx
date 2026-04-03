import Link from "next/link";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:px-8">
      <Link
        href="/"
        className="text-sm font-medium text-teal-400 hover:underline"
      >
        ← Home
      </Link>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-50">
        {title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-zinc-400">
        {description ??
          "We’re building this page next. Check back soon, or edit it in the codebase under src/app/(site)."}
      </p>
    </main>
  );
}
