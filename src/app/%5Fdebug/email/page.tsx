import type { Metadata } from "next";

import { buildAiGuideEmail } from "@/lib/ai-guide-email";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI guide email preview",
  robots: { index: false, follow: false },
};

export default function EmailPreviewPage() {
  const email = buildAiGuideEmail({
    guideTitle: "How to use AI without adding more work to your day",
    guideUrl: `${SITE_URL}/ai/how-to-use-ai-without-adding-more-work`,
  });

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Debug preview
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              AI guide email
            </h1>
          </div>
          <p className="text-sm text-zinc-600">
            Subject: <strong>{email.subject}</strong>
          </p>
        </div>
        <iframe
          className="h-[760px] w-full rounded-2xl border border-zinc-300 bg-white shadow-sm"
          srcDoc={email.html}
          title="AI guide email preview"
        />
      </div>
    </main>
  );
}
