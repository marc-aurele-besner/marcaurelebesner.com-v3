/**
 * Date helpers for semantic `<time datetime="…">` markup.
 *
 * The experience config stores human-friendly labels like "Apr 2024" or
 * "2022" (year-only). The helpers below normalize those labels to the
 * ISO-8601 month / year strings that crawlers prefer, while keeping the
 * original text untouched for display.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const MONTH_TO_NUMBER: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

/**
 * Convert a label like "Apr 2024" or "2022" to an ISO-8601 month
 * ("2024-04") or year ("2022") string. Returns `null` for unrecognized
 * input so callers can omit the `datetime` attribute.
 */
export function toIsoMonthOrYear(label: string): string | null {
  const trimmed = label.trim();
  if (!trimmed) return null;

  // Year-only: "2022"
  if (/^\d{4}$/.test(trimmed)) return trimmed;

  // "Apr 2024" or "April 2024"
  const match = /^([A-Za-z]+)\s+(\d{4})$/.exec(trimmed);
  if (!match) return null;
  const [, monthAbbr, year] = match;
  const monthNumber = MONTH_TO_NUMBER[monthAbbr as keyof typeof MONTH_TO_NUMBER];
  if (!monthNumber) return null;
  return `${year}-${monthNumber}`;
}

/**
 * "Present" label used for ongoing engagements. Exposed so components can
 * use the same constant in markup and tests.
 */
export const PRESENT_LABEL = "Present";

/**
 * True when the label represents an ongoing engagement ("Present", "Now",
 * "Current", case-insensitive).
 */
export function isPresentLabel(label: string): boolean {
  const normalized = label.trim().toLowerCase();
  return normalized === "present" || normalized === "now" || normalized === "current";
}

/**
 * Convenience accessor for the month abbreviation list (used in tests).
 */
export function getMonthAbbreviations(): readonly string[] {
  return MONTHS;
}
