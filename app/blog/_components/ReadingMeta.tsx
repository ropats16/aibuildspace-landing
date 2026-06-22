type ReadingMetaProps = {
  date: string;
  minutes: number;
};

/**
 * Byline: "By Rohit", formatted date, and reading-time estimate.
 * Separated by middots. Muted small text.
 */
export function ReadingMeta({ date, minutes }: ReadingMetaProps) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));

  return (
    <p
      className="text-sm text-muted flex flex-wrap items-center gap-x-1.5 gap-y-0.5"
      aria-label={`By Rohit, published ${formatted}, ${minutes} minute read`}
    >
      <span>By Rohit</span>
      <span aria-hidden="true" className="text-border">
        &middot;
      </span>
      <time dateTime={date}>{formatted}</time>
      <span aria-hidden="true" className="text-border">
        &middot;
      </span>
      <span>{minutes} min read</span>
    </p>
  );
}
