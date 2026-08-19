import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { buildAiGuideEmail } from "@/lib/ai-guide-email";
import { saveAiGuideLead } from "@/lib/ai-guide-leads";
import { loadAllAiGuideIndexEntries } from "@/lib/ai-guides/load-guides";
import { getPostHogClient } from "@/lib/posthog-server";
import { SITE_URL } from "@/lib/site";

const requestSchema = z.object({
  email: z.string().trim().email().max(320),
  guideSlug: z.string().trim().min(1).max(200),
});

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export async function POST(request: Request) {
  let email = "";
  let guideSlug = "";

  try {
    const parsed = requestSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    ({ email, guideSlug } = parsed.data);
    email = email.toLowerCase();

    const guides = await loadAllAiGuideIndexEntries();
    const guide = guides.find((entry) => entry.slug === guideSlug);
    if (!guide) {
      return NextResponse.json({ error: "Guide not found." }, { status: 404 });
    }

    await saveAiGuideLead({ email, guideSlug });

    const resend = new Resend(requiredEnv("RESEND_API_KEY"));
    const guideUrl = `${SITE_URL}/ai/${guideSlug}`;
    const sentEmail = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL?.trim() ||
        "Mika Reyes <guides@updates.mikareyes.com>",
      to: email,
      replyTo:
        process.env.RESEND_REPLY_TO_EMAIL?.trim() ||
        "mika@kingscrosslabs.com",
      ...buildAiGuideEmail({ guideTitle: guide.title, guideUrl }),
    });
    if (sentEmail.error) throw new Error(sentEmail.error.message);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("AI guide email capture failed", error);

    if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) {
      const posthog = getPostHogClient();
      posthog.captureException(error, email || "anonymous", {
        guide_slug: guideSlug || "unknown",
        route: "/api/ai-guide-email",
      });
      await posthog.shutdown();
    }

    return NextResponse.json(
      { error: "Could not send the guide. Please try again." },
      { status: 500 },
    );
  }
}
