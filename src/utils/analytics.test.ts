import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  trackSocialLink,
  trackProjectLink,
  trackNavigation,
  trackThemeChange,
  trackSectionView,
  trackExperienceDetails,
  trackProjectDetails,
  trackAdvisoryCta,
} from "./analytics";

// Mock the sendGAEvent function
vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: vi.fn(),
}));

describe("analytics utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("trackSocialLink", () => {
    it("should be a function", () => {
      expect(typeof trackSocialLink).toBe("function");
    });

    it("should accept platform and url parameters", () => {
      expect(() => trackSocialLink("github", "https://github.com")).not.toThrow();
    });
  });

  describe("trackProjectLink", () => {
    it("should be a function", () => {
      expect(typeof trackProjectLink).toBe("function");
    });

    it("should accept project title, link type, and url", () => {
      expect(() =>
        trackProjectLink("Test Project", "website", "https://example.com")
      ).not.toThrow();
      expect(() =>
        trackProjectLink("Test Project", "repository", "https://github.com/test")
      ).not.toThrow();
    });
  });

  describe("trackNavigation", () => {
    it("should be a function", () => {
      expect(typeof trackNavigation).toBe("function");
    });

    it("should accept section parameter", () => {
      expect(() => trackNavigation("about")).not.toThrow();
    });
  });

  describe("trackThemeChange", () => {
    it("should be a function", () => {
      expect(typeof trackThemeChange).toBe("function");
    });

    it("should accept theme parameter", () => {
      expect(() => trackThemeChange("dark")).not.toThrow();
      expect(() => trackThemeChange("light")).not.toThrow();
    });
  });

  describe("trackSectionView", () => {
    it("should be a function", () => {
      expect(typeof trackSectionView).toBe("function");
    });

    it("should accept section parameter", () => {
      expect(() => trackSectionView("projects")).not.toThrow();
    });
  });

  describe("trackExperienceDetails", () => {
    it("should be a function", () => {
      expect(typeof trackExperienceDetails).toBe("function");
    });

    it("should accept title, company, and slug parameters", () => {
      expect(() =>
        trackExperienceDetails("Engineer", "Company", "company-slug")
      ).not.toThrow();
    });
  });

  describe("trackProjectDetails", () => {
    it("should be a function", () => {
      expect(typeof trackProjectDetails).toBe("function");
    });

    it("should accept title and slug parameters", () => {
      expect(() => trackProjectDetails("Project Name", "project-slug")).not.toThrow();
    });
  });

  describe("trackAdvisoryCta", () => {
    it("should be a function", () => {
      expect(typeof trackAdvisoryCta).toBe("function");
    });

    it("should accept action parameter", () => {
      expect(() => trackAdvisoryCta("get_in_touch")).not.toThrow();
    });
  });
});
