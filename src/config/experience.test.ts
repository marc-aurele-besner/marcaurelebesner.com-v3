import { describe, it, expect } from "vitest";
import {
  experiences,
  getExperienceBySlug,
  getAdjacentExperiences,
  type ExperienceData,
} from "./experience";

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

describe("getExperienceBySlug", () => {
  it("should return the matching experience", () => {
    const first = experiences[0];
    expect(getExperienceBySlug(first.slug)).toBe(first);
  });

  it("should return undefined for an unknown slug", () => {
    expect(getExperienceBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getAdjacentExperiences", () => {
  it("should return both neighbors for an experience in the middle", () => {
    const { prev, next } = getAdjacentExperiences(experiences[1].slug);
    expect(prev).toBe(experiences[0]);
    expect(next).toBe(experiences[2]);
  });

  it("should return null prev and a next for the first experience", () => {
    const { prev, next } = getAdjacentExperiences(experiences[0].slug);
    expect(prev).toBeNull();
    expect(next).toBe(experiences[1]);
  });

  it("should return a prev and null next for the last experience", () => {
    const { prev, next } = getAdjacentExperiences(experiences[experiences.length - 1].slug);
    expect(prev).toBe(experiences[experiences.length - 2]);
    expect(next).toBeNull();
  });

  it("should return null neighbors for an unknown slug", () => {
    expect(getAdjacentExperiences("does-not-exist")).toEqual({
      prev: null,
      next: null,
    });
  });
});
