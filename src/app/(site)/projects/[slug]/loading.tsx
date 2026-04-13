import { mainProse } from "@/lib/ui/site-styles";

export default function LoadingProjectPost() {
  return (
    <article className={mainProse}>
      <div className="h-5 w-20 rounded bg-zinc-100" />
      <div className="mt-6 h-10 w-2/3 rounded bg-zinc-100" />
      <div className="mt-3 h-5 w-28 rounded bg-zinc-100" />
      <div className="mt-4 flex gap-2">
        <div className="h-7 w-16 rounded-full bg-zinc-100" />
        <div className="h-7 w-20 rounded-full bg-zinc-100" />
      </div>
      <div className="mt-10 space-y-4">
        <div className="h-4 w-full rounded bg-zinc-100" />
        <div className="h-4 w-10/12 rounded bg-zinc-100" />
        <div className="h-4 w-8/12 rounded bg-zinc-100" />
      </div>
    </article>
  );
}
