import { BackLink } from "@/components/ui/BackLink";
import { PageHero } from "@/components/ui/PageHero";
import { mainProse, textBody } from "@/lib/ui/site-styles";

export function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <main className={mainProse}>
      <div className="mb-8">
        <BackLink href="/" label="Home" />
      </div>
      <PageHero title={title} />
      <p className={`mt-8 ${textBody} text-zinc-600`}>
        {description ??
          "We’re building this page next. Check back soon, or edit it in the codebase under src/app/(site)."}
      </p>
    </main>
  );
}
