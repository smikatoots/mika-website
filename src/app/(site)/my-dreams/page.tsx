import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Dreams",
  description: "Dreams",
};

export default function MyDreamsPage() {
  return <PlaceholderPage title="Dreams" />;
}
