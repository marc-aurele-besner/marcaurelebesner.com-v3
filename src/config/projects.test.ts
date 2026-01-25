import { describe, it, expect } from "vitest";
import { projects, type ProjectData } from "./projects";

describe("projects config", () => {
  it("should have at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("should have unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });

  it("should have featured projects", () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
  });

  it("should have valid project structure", () => {
    projects.forEach((project: ProjectData) => {
      expect(project.slug).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.imageSrc).toBeTruthy();
      expect(project.imageAlt).toBeTruthy();
      expect(project.badges.length).toBeGreaterThan(0);
      expect(["personal", "work"]).toContain(project.projectType);
      expect(typeof project.featured).toBe("boolean");
    });
  });

  it("should have valid image paths", () => {
    projects.forEach((project) => {
      expect(project.imageSrc).toMatch(/^\/images\/projects\/.+\.(png|jpg|jpeg|webp)$/);
    });
  });
});
