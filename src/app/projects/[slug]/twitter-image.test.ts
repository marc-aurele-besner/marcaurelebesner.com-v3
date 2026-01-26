import { size, contentType, generateStaticParams } from "./twitter-image";
import TwitterImage from "./twitter-image";
import { ImageResponse } from "next/og";
import * as projectModule from "@/config/projects";
import * as siteConfigModule from "@/config/site";
import type React from "react";

type MockImageResponse = {
  element: React.ReactElement<{ children: unknown }>;
  options: { width: number; height: number };
};

// Mock ImageResponse
vi.mock("next/og", () => ({
  ImageResponse: vi.fn(
    (element: unknown, options: { width: number; height: number }) => ({
      element,
      options,
    })
  ), // Mock with a simple return
}));

// Mock project data
const mockProjects = [
  {
    slug: "mock-project-1",
    title: "Mock Project 1",
    projectType: "personal" as const,
    summary: "Summary of Mock Project 1",
    badges: ["Badge 1", "Badge 2"],
  },
  {
    slug: "mock-project-2",
    title: "Mock Project 2",
    projectType: "work" as const,
    summary: "Summary of Mock Project 2",
    badges: ["Badge 3", "Badge 4"],
  },
];

describe("Project Twitter Image", () => {
  let originalProjects: typeof projectModule.projects;
  let originalSiteConfigName: string;
  let originalSiteConfigTwitterHandle: string;

  beforeEach(() => {
    originalProjects = projectModule.projects;
    Object.defineProperty(projectModule, "projects", {
      value: mockProjects,
      writable: true,
    });

    originalSiteConfigName = siteConfigModule.siteConfig.name;
    siteConfigModule.siteConfig.name = "Mock Name";
    originalSiteConfigTwitterHandle = siteConfigModule.siteConfig.twitterHandle;
    siteConfigModule.siteConfig.twitterHandle = "@mockhandle";
  });

  afterEach(() => {
    Object.defineProperty(projectModule, "projects", {
      value: originalProjects,
      writable: true,
    });
    siteConfigModule.siteConfig.name = originalSiteConfigName;
    siteConfigModule.siteConfig.twitterHandle = originalSiteConfigTwitterHandle;
    vi.restoreAllMocks();
  });

  it("should export correct size and contentType", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
  });

  it("should generate static params correctly", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ slug: "mock-project-1" }, { slug: "mock-project-2" }]);
  });

  it("should return an ImageResponse with correct content for a personal project", async () => {
    const paramsPromise = Promise.resolve({ slug: "mock-project-1" });
    const result = (await TwitterImage({ params: paramsPromise })) as unknown as MockImageResponse;

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );

    const element = result.element as unknown as { props: { children: unknown } };
    const children = element.props.children as Array<{
      props: { children: unknown };
    }>;
    expect(children[0].props.children).toBe("Personal Project");
  });

  it("should return an ImageResponse with correct content for a work project", async () => {
    const paramsPromise = Promise.resolve({ slug: "mock-project-2" });
    const result = (await TwitterImage({ params: paramsPromise })) as unknown as MockImageResponse;

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );

    const element = result.element as unknown as { props: { children: unknown } };
    const children = element.props.children as Array<{
      props: { children: unknown };
    }>;
    expect(children[0].props.children).toBe("Work Project");
    expect(
      ((children[2].props.children as Array<{ props: { children: unknown } }>)[1]
        .props.children as Array<{ props: { children: unknown } }>)[1].props.children
    ).toBe("@mockhandle");
  });

  it("should return an ImageResponse with 'Project Not Found' for an unknown project", async () => {
    const paramsPromise = Promise.resolve({ slug: "unknown-project" });
    const result = (await TwitterImage({ params: paramsPromise })) as unknown as MockImageResponse;

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );

    const element = result.element as unknown as { props: { children: unknown } };
    expect(element.props.children).toBe("Project Not Found");
  });
});
