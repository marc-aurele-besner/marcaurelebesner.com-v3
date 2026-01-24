import { sendGAEvent } from "@next/third-parties/google";

export type GAEventName =
  | "click_social_link"
  | "click_project_link"
  | "click_project_repo"
  | "click_project_details"
  | "click_experience_details"
  | "click_navigation"
  | "toggle_theme"
  | "view_section";

export interface GAEventParams {
  [key: string]: string | number | undefined;
}

/**
 * Send a Google Analytics event
 * @param eventName - The name of the event
 * @param params - Additional event parameters
 */
export function trackEvent(
  eventName: GAEventName,
  params?: GAEventParams
): void {
  if (typeof window === "undefined") return;

  sendGAEvent("event", eventName, params || {});
}

/**
 * Track social media link clicks
 */
export function trackSocialLink(platform: string, url: string): void {
  trackEvent("click_social_link", {
    platform,
    link_url: url,
  });
}

/**
 * Track project link clicks
 */
export function trackProjectLink(projectTitle: string, linkType: "website" | "repository", url: string): void {
  const eventName = linkType === "website" ? "click_project_link" : "click_project_repo";
  trackEvent(eventName, {
    project_title: projectTitle,
    link_type: linkType,
    link_url: url,
  });
}

/**
 * Track navigation menu clicks
 */
export function trackNavigation(section: string): void {
  trackEvent("click_navigation", {
    section,
  });
}

/**
 * Track theme toggle changes
 */
export function trackThemeChange(theme: string): void {
  trackEvent("toggle_theme", {
    theme,
  });
}

/**
 * Track section views (for scroll tracking)
 */
export function trackSectionView(section: string): void {
  trackEvent("view_section", {
    section,
  });
}

/**
 * Track experience details page clicks
 */
export function trackExperienceDetails(
  title: string,
  company: string,
  slug: string
): void {
  trackEvent("click_experience_details", {
    experience_title: title,
    company,
    slug,
  });
}

/**
 * Track project details page clicks
 */
export function trackProjectDetails(title: string, slug: string): void {
  trackEvent("click_project_details", {
    project_title: title,
    slug,
  });
}

