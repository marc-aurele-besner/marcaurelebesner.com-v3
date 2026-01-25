import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  trackEvent,
  trackSocialLink,
  trackProjectLink,
  trackNavigation,
  trackThemeChange,
  trackSectionView,
  trackExperienceDetails,
  trackProjectDetails,
  trackAdvisoryCta,
} from "./analytics";
import { sendGAEvent } from "@next/third-parties/google";

// Mock the sendGAEvent function
vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: vi.fn(),
}));

describe("analytics utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("trackEvent", () => {
    it("should call sendGAEvent with the correct parameters", () => {
      trackEvent("click_social_link", { platform: "github" });
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_social_link", { platform: "github" });
    });

    it("should call sendGAEvent with an empty object if no params are provided", () => {
      trackEvent("click_social_link");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_social_link", {});
    });

    it("should not call sendGAEvent if window is undefined", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;
      trackEvent("click_social_link");
      expect(sendGAEvent).not.toHaveBeenCalled();
      global.window = originalWindow;
    });
  });

  describe("trackSocialLink", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackSocialLink("github", "https://github.com");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_social_link", { platform: "github", link_url: "https://github.com" });
    });
  });

  describe("trackProjectLink", () => {
    it("should call trackEvent with the correct parameters for website links", () => {
      trackProjectLink("Test Project", "website", "https://example.com");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_project_link", { project_title: "Test Project", link_type: "website", link_url: "https://example.com" });
    });

    it("should call trackEvent with the correct parameters for repository links", () => {
      trackProjectLink("Test Project", "repository", "https://github.com/test");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_project_repo", { project_title: "Test Project", link_type: "repository", link_url: "https://github.com/test" });
    });
  });

  describe("trackNavigation", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackNavigation("about");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_navigation", { section: "about" });
    });
  });

  describe("trackThemeChange", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackThemeChange("dark");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "toggle_theme", { theme: "dark" });
    });
  });

  describe("trackSectionView", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackSectionView("projects");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "view_section", { section: "projects" });
    });
  });

  describe("trackExperienceDetails", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackExperienceDetails("Engineer", "Company", "company-slug");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_experience_details", { experience_title: "Engineer", company: "Company", slug: "company-slug" });
    });
  });

  describe("trackProjectDetails", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackProjectDetails("Project Name", "project-slug");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_project_details", { project_title: "Project Name", slug: "project-slug" });
    });
  });

  describe("trackAdvisoryCta", () => {
    it("should call trackEvent with the correct parameters", () => {
      trackAdvisoryCta("get_in_touch");
      expect(sendGAEvent).toHaveBeenCalledWith("event", "click_advisory_cta", { action: "get_in_touch" });
    });
  });
});
