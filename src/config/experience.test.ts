import { describe, it, expect } from "vitest";
import { experiences, type ExperienceData } from "./experience";

describe("experience config", () => {
  it("should have at least one experience", () => {
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("should have unique slugs", () => {
    const slugs = experiences.map((e) => e.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("should have Web3 experiences", () => {
    const web3 = experiences.filter((e) => e.isWeb3);
    expect(web3.length).toBeGreaterThan(0);
  });

  it("should have valid experience structure", () => {
    experiences.forEach((exp: ExperienceData) => {
      expect(exp.slug).toBeTruthy();
      expect(exp.title).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.location).toBeTruthy();
      expect(["remote", "onsite", "hybrid"]).toContain(exp.type);
      expect(exp.startDate).toBeTruthy();
      expect(exp.endDate).toBeTruthy();
      expect(exp.summary).toBeTruthy();
      expect(exp.description).toBeTruthy();
      expect(exp.highlights.length).toBeGreaterThan(0);
      expect(exp.skills.length).toBeGreaterThan(0);
      expect(typeof exp.isWeb3).toBe("boolean");
    });
  });
});
