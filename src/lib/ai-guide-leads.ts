import "server-only";

import { neon } from "@neondatabase/serverless";

let tableReady: Promise<void> | undefined;

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured");
  return databaseUrl;
}

export async function saveAiGuideLead({
  email,
  guideSlug,
}: {
  email: string;
  guideSlug: string;
}) {
  const sql = neon(getDatabaseUrl());

  tableReady ??= sql`
    CREATE TABLE IF NOT EXISTS ai_guide_leads (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      guide_slug TEXT NOT NULL,
      captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `.then(() => undefined).catch((error) => {
    tableReady = undefined;
    throw error;
  });

  await tableReady;
  await sql`
    INSERT INTO ai_guide_leads (email, guide_slug)
    VALUES (${email}, ${guideSlug})
  `;
}
