import Link from "next/link";

import { siteLink } from "@/lib/ui/site-styles";

export function DreamsPageContent() {
  return (
    <div className="space-y-8 text-[1.05rem] leading-relaxed text-zinc-800">
      <p className="text-lg text-zinc-600">
        Some deep, some vanity; dreams nonetheless.
      </p>

      <ol className="list-decimal space-y-4 pl-6 marker:text-zinc-500">
        <li className="pl-1">
          Create meaningful impact for underrepresented groups in tech.
        </li>
        <li className="pl-1">
          Have two homes: one in the Philippines &amp; another in North America.
        </li>
        <li className="pl-1">
          Start and run a beach resort 🌺 OR a board game cafe OR coffee shop
          ☕ OR dance studio.
        </li>
        <li className="pl-1">Pay for a trip for my parents.</li>
        <li className="pl-1">
          Achieve the time freedom to learn and dive deep into anything I want.
        </li>
        <li className="pl-1">
          Buy several investment properties{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em] text-zinc-900 ring-1 ring-zinc-200/80">
            in progress, have 2!
          </code>
          . Read lessons here:{" "}
          <Link href="/blog/my-real-estate-journey" className={siteLink}>
            My Real Estate Journey
          </Link>
          .
        </li>
        <li className="pl-1">Be on the cover of a magazine.</li>
        <li className="pl-1">Write a book.</li>
        <li className="pl-1">Live near my family and loved ones.</li>
      </ol>

      <div className="space-y-3 pt-2">
        <details className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <summary className="cursor-pointer font-medium text-zinc-900">
            ✅ Apply tech in a meaningful way, ideally addressing needs in
            global, emerging markets
          </summary>
          <p className="mt-3 pl-0.5 text-zinc-600">
            Via{" "}
            <a
              href="https://parallax.com"
              className={siteLink}
              rel="noopener noreferrer"
              target="_blank"
            >
              Parallax!
            </a>
          </p>
        </details>
        <details className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <summary className="cursor-pointer font-medium text-zinc-900">
            ✅ Teach a class
          </summary>
          <p className="mt-3 pl-0.5 text-zinc-600">
            (taught 2 classes while at Wesleyan on tech, product &amp; design)
          </p>
        </details>
      </div>
    </div>
  );
}
