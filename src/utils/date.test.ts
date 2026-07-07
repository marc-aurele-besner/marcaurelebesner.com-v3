import { describe, it, expect } from "vitest";
import {
  toIsoMonthOrYear,
  isPresentLabel,
  getMonthAbbreviations,
} from "./date";

describe("toIsoMonthOrYear", () => {
  it("converts 'Apr 2024' to '2024-04'", () => {
    expect(toIsoMonthOrYear("Apr 2024")).toBe("2024-04");
  });

  it("converts 'Dec 2019' to '2019-12'", () => {
    expect(toIsoMonthOrYear("Dec 2019")).toBe("2019-12");
  });

  it("returns the year unchanged for year-only input", () => {
    expect(toIsoMonthOrYear("2022")).toBe("2022");
  });

  it("returns null for empty or whitespace input", () => {
    expect(toIsoMonthOrYear("")).toBeNull();
    expect(toIsoMonthOrYear("   ")).toBeNull();
  });

  it("returns null for an unknown month abbreviation", () => {
    expect(toIsoMonthOrYear("Foo 2024")).toBeNull();
  });
});

describe("isPresentLabel", () => {
  it("recognises 'Present' (case-insensitive)", () => {
    expect(isPresentLabel("Present")).toBe(true);
    expect(isPresentLabel("present")).toBe(true);
    expect(isPresentLabel("PRESENT")).toBe(true);
  });

  it("recognises 'Now' and 'Current'", () => {
    expect(isPresentLabel("Now")).toBe(true);
    expect(isPresentLabel("Current")).toBe(true);
  });

  it("rejects other labels", () => {
    expect(isPresentLabel("Apr 2024")).toBe(false);
    expect(isPresentLabel("")).toBe(false);
  });
});

describe("getMonthAbbreviations", () => {
  it("exposes all twelve month abbreviations", () => {
    expect(getMonthAbbreviations()).toEqual([
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
    ]);
  });
});
