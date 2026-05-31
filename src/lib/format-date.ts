type DateFormatStyle = "long" | "short";

const LONG_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

const SHORT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
  timeZone: "UTC",
};

/** Parse bare YYYY-MM-DD as UTC so SSR and client render the same calendar day. */
export function formatSiteDate(
  date: string,
  style: DateFormatStyle = "long",
): string {
  const normalized = /^\d{4}-\d{2}-\d{2}$/u.test(date)
    ? `${date}T00:00:00Z`
    : date;

  return new Date(normalized).toLocaleDateString(
    "en-US",
    style === "short" ? SHORT_OPTIONS : LONG_OPTIONS,
  );
}
