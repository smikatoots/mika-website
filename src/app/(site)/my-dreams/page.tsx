import type { Metadata } from "next";

import { DreamsPageContent } from "@/components/dreams/DreamsPageContent";
import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainProse } from "@/lib/ui/site-styles";

export const metadata: Metadata = {
  title: "Dreams",
  description:
    "Dreams and goals — some deep, some vanity; dreams nonetheless.",
  openGraph: { title: "Dreams" },
};

export default function MyDreamsPage() {
  return (
    <main className={mainProse}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero title="Dreams" />
      <div className="mt-10">
        <DreamsPageContent />
      </div>
    </main>
  );
}
