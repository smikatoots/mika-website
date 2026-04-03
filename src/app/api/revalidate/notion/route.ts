import { createHmac, timingSafeEqual } from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { notionEnv } from "@/lib/notion/config";
import {
  isPageInBlogDatabase,
  normalizeNotionId,
  retrievePageMeta,
} from "@/lib/notion/posts";

export const runtime = "nodejs";

const webhookPayloadSchema = z
  .object({
    verification_token: z.string().optional(),
    type: z.string().optional(),
    entity: z
      .object({
        id: z.string(),
        type: z.string(),
      })
      .optional(),
  })
  .passthrough();

function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
  const secret = notionEnv.verificationToken;
  if (!secret || !signatureHeader) {
    return false;
  }
  const expected = `sha256=${createHmac("sha256", secret).update(rawBody).digest("hex")}`;
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
  } catch {
    return false;
  }
}

function revalidateAllContent() {
  revalidateTag("posts", { expire: 0 });
  revalidateTag("home", { expire: 0 });
  revalidateTag("about", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  let parsed: z.infer<typeof webhookPayloadSchema>;
  try {
    parsed = webhookPayloadSchema.parse(JSON.parse(rawBody));
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (parsed.verification_token && !parsed.type) {
    return NextResponse.json({ ok: true });
  }

  const sig = request.headers.get("x-notion-signature");
  if (!notionEnv.verificationToken) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { message: "NOTION_WEBHOOK_VERIFICATION_TOKEN is not configured" },
        { status: 500 },
      );
    }
    console.warn(
      "NOTION_WEBHOOK_VERIFICATION_TOKEN is unset; webhook signatures are not verified.",
    );
  } else if (!verifySignature(rawBody, sig)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const eventType = parsed.type ?? "";
  const entity = parsed.entity;

  if (
    entity?.type === "page" &&
    entity.id &&
    (eventType.startsWith("page.") || eventType === "")
  ) {
    try {
      const homeId = notionEnv.homePageId;
      if (
        homeId &&
        normalizeNotionId(entity.id) === normalizeNotionId(homeId)
      ) {
        revalidatePath("/");
        revalidateTag("home", { expire: 0 });
      }
      const aboutId = notionEnv.aboutPageId;
      if (
        aboutId &&
        normalizeNotionId(entity.id) === normalizeNotionId(aboutId)
      ) {
        revalidatePath("/about");
        revalidateTag("about", { expire: 0 });
      }
      const inDb = await isPageInBlogDatabase(entity.id);
      if (inDb) {
        const meta = await retrievePageMeta(entity.id);
        if (meta?.publicPath) {
          revalidatePath(`/${meta.publicPath}`);
          revalidateTag(`post:${meta.publicPath}`, { expire: 0 });
        }
      }
    } catch {
      // ignore
    }
    revalidateAllContent();
    return NextResponse.json({ revalidated: true });
  }

  if (
    eventType.startsWith("database.") ||
    eventType.startsWith("data_source.")
  ) {
    revalidateAllContent();
    return NextResponse.json({ revalidated: true });
  }

  revalidateAllContent();
  return NextResponse.json({ ok: true });
}
