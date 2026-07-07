import { size, contentType, generateStaticParams } from "./twitter-image";
import TwitterImage from "./twitter-image";
import { ImageResponse } from "next/og";
import * as projectModule from "@/config/projects";
import * as siteConfigModule from "@/config/site";
import {
  stubExport,
  getEyebrow,
  getIdentity,
  getNotFoundText,
  type MockImageResponse,
} from "@/test/og-image-test-utils";

vi.mock("next/og", async () => (await import("@/test/og-image-test-utils")).mockNextOg());

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
  const restores: Array<() => void> = [];

  beforeEach(() => {
    restores.push(
      stubExport(projectModule, "projects", mockProjects),
      stubExport(projectModule, "getProjectBySlug", (slug: string) =>
        mockProjects.find((p) => p.slug === slug)
      ),
      stubExport(siteConfigModule.siteConfig, "name", "Mock Name"),
      stubExport(siteConfigModule.siteConfig, "twitterHandle", "@mockhandle")
    );
  });

  afterEach(() => {
    restores.forEach((restore) => restore());
    restores.length = 0;
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

  it("should render the project-type eyebrow for a personal project", async () => {
    const result = (await TwitterImage({
      params: Promise.resolve({ slug: "mock-project-1" }),
    })) as unknown as MockImageResponse;

    expect(ImageResponse).toHaveBeenCalledWith(expect.any(Object), {
      width: 1200,
      height: 630,
    });
    expect(getEyebrow(result)).toBe("Personal Project");
  });

  it("should render the Twitter handle in the footer for a work project", async () => {
    const result = (await TwitterImage({
      params: Promise.resolve({ slug: "mock-project-2" }),
    })) as unknown as MockImageResponse;

    expect(getEyebrow(result)).toBe("Work Project");
    expect(getIdentity(result).line).toBe("@mockhandle");
  });

  it("should render 'Project Not Found' for an unknown project", async () => {
    const result = (await TwitterImage({
      params: Promise.resolve({ slug: "unknown-project" }),
    })) as unknown as MockImageResponse;

    expect(getNotFoundText(result)).toBe("Project Not Found");
  });
});
