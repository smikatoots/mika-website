import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Product links",
  description: "Product links",
};

export default function ProductLinksPage() {
  return <PlaceholderPage title="Product links" />;
}
