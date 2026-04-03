import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/site/PlaceholderPage";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Guestbook",
};

export default function GuestbookPage() {
  return <PlaceholderPage title="Guestbook" />;
}
