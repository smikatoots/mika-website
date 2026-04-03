import { Client } from "@notionhq/client";

import { notionEnv } from "./config";

let client: Client | null = null;

export function getNotionClient(): Client {
  if (!notionEnv.apiKey) {
    throw new Error("NOTION_API_KEY is not set.");
  }
  if (!client) {
    client = new Client({ auth: notionEnv.apiKey });
  }
  return client;
}
