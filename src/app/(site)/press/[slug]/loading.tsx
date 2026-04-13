import { mainProse } from "@/lib/ui/site-styles";

export default function LoadingPressPost() {
  return (
    <article className={mainProse}>
      <div className="h-5 w-16 rounded bg-zinc-100" />
      <div className="mt-6 h-10 w-2/3 rounded bg-zinc-100" />
      <div className="mt-3 h-5 w-36 rounded bg-zinc-100" />
      <div className="mt-6 h-10 w-44 rounded bg-zinc-100" />
      <div className="mt-10 space-y-4">
        <div className="h-4 w-full rounded bg-zinc-100" />
        <div className="h-4 w-11/12 rounded bg-zinc-100" />
        <div className="h-4 w-9/12 rounded bg-zinc-100" />
      </div>
    </article>
  );
}
