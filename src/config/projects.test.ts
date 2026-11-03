import { describe, it, expect } from "vitest";
import {
  isProjectIndexable,
  projects,
  getProjectBySlug,
  getAdjacentProjects,
  type ProjectData,
} from "./projects";

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

  it("should have an updatedAt in YYYY-MM format", () => {
    projects.forEach((project) => {
      expect(project.updatedAt).toMatch(/^\d{4}-\d{2}$/);
    });
  });

  it("should have descriptive imageAlt text (not just the project name)", () => {
    projects.forEach((project) => {
      // The alt must add context beyond the bare project title.
      expect(project.imageAlt.length).toBeGreaterThan(project.title.length);
    });
  });
});

describe("getProjectBySlug", () => {
  it("should return the matching project", () => {
    const first = projects[0];
    expect(getProjectBySlug(first.slug)).toBe(first);
  });

  it("should return undefined for an unknown slug", () => {
    expect(getProjectBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getAdjacentProjects", () => {
  it("should return both neighbors for a project in the middle", () => {
    const { prev, next } = getAdjacentProjects(projects[1].slug);
    expect(prev).toBe(projects[0]);
    expect(next).toBe(projects[2]);
  });

  it("should return null prev and a next for the first project", () => {
    const { prev, next } = getAdjacentProjects(projects[0].slug);
    expect(prev).toBeNull();
    expect(next).toBe(projects[1]);
  });

  it("should return a prev and null next for the last project", () => {
    const { prev, next } = getAdjacentProjects(projects[projects.length - 1].slug);
    expect(prev).toBe(projects[projects.length - 2]);
    expect(next).toBeNull();
  });

  it("should return null neighbors for an unknown slug", () => {
    expect(getAdjacentProjects("does-not-exist")).toEqual({
      prev: null,
      next: null,
    });
  });
});

describe("isProjectIndexable", () => {
  it("should flag the thin project pages as not indexable", () => {
    const hidden = projects
      .filter((p) => !isProjectIndexable(p))
      .map((p) => p.slug)
      .sort();
    expect(hidden).toEqual(
      ["collage-of-myself", "golf-alpine", "mymultisig", "plantswap-finance"],
    );
  });

  it("should never noindex a featured project", () => {
    projects
      .filter((p) => p.featured)
      .forEach((p) => expect(isProjectIndexable(p)).toBe(true));
  });
});

describe("featured project case studies", () => {
  it("should give every featured project a problem, role, and outcome", () => {
    projects
      .filter((p) => p.featured)
      .forEach((p) => {
        expect(p.problem, p.slug).toBeTruthy();
        expect(p.role, p.slug).toBeTruthy();
        expect(p.outcome, p.slug).toBeTruthy();
        expect(p.outcome, p.slug).not.toBe(p.summary);
      });
  });
});
