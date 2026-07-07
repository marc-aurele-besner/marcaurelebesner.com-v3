import { isPresentLabel, toIsoMonthOrYear } from "@/utils/date";

interface DateRangeProps {
  /** Human-friendly start label, e.g. "Apr 2024" or "2022". */
  startDate: string;
  /** Human-friendly end label, e.g. "Jun 2025", "2022", or "Present". */
  endDate: string;
  /**
   * Optional separator. Defaults to " - " (with surrounding spaces).
   */
  separator?: string;
  /** Optional className passed to the wrapping element. */
  className?: string;
}

/**
 * Renders a date range as human-friendly text wrapped in semantic
 * `<time datetime="…">` elements. Falls back to plain text if the label
 * does not parse to ISO month/year.
 */
export default function DateRange({
  startDate,
  endDate,
  separator = " - ",
  className,
}: DateRangeProps) {
  const startIso = toIsoMonthOrYear(startDate);
  const endIso = isPresentLabel(endDate) ? null : toIsoMonthOrYear(endDate);

  return (
    <span className={className}>
      {startIso ? (
        <time dateTime={startIso}>{startDate}</time>
      ) : (
        <span>{startDate}</span>
      )}
      {separator}
      {endIso ? (
        <time dateTime={endIso}>{endDate}</time>
      ) : isPresentLabel(endDate) ? (
        <time>{endDate}</time>
      ) : (
        <span>{endDate}</span>
      )}
    </span>
  );
}
