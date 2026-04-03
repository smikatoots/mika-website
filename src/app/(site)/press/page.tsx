import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Press",
  description: "Press and media",
};

export default function PressPage() {
  return <PlaceholderPage title="Press" />;
}
