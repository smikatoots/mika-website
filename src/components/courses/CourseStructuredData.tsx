import { SITE_URL } from "@/lib/site";

type CourseInstructor = {
  name: string;
};

type CourseStructuredDataProps = {
  name: string;
  description: string;
  /** Absolute canonical URL of the course page. */
  url: string;
  /** Course price. Coerced to a string per schema.org Offer conventions. */
  price: number | string;
  priceCurrency?: string;
  instructors: readonly CourseInstructor[];
};

/**
 * Emits Course + Offer JSON-LD for a paid course landing page, so Google rich
 * results and AI answer engines can extract price, format, and instructor
 * facts. Deliberately omits `aggregateRating` — there's no real review data
 * to back one, and a fabricated rating would violate Google's structured
 * data guidelines.
 */
export function CourseStructuredData({
  name,
  description,
  url,
  price,
  priceCurrency = "USD",
  instructors,
}: CourseStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Mika Reyes",
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: String(price),
      priceCurrency,
      availability: "https://schema.org/InStock",
      url,
    },
    instructor: instructors.map((instructor) => ({
      "@type": "Person",
      name: instructor.name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
