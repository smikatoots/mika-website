import type { Metadata } from "next";

import { MediaKitPageContent } from "@/components/media-kit/MediaKitPageContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Creator Media Kit",
  description: "Mika Reyes — creator media kit for brand partnerships.",
};

export default function MediaKitPage() {
  return <MediaKitPageContent />;
}
