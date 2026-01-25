import { size, contentType, generateStaticParams } from "./opengraph-image";
import OGImage from "./opengraph-image";
import { ImageResponse } from "next/og";
import * as experienceModule from "@/config/experience";
import * as siteConfigModule from "@/config/site";

// Mock ImageResponse
vi.mock("next/og", () => ({
  ImageResponse: vi.fn((element, options) => ({ element, options })), // Mock with a simple return
}));

// Mock experience data
const mockExperiences = [
  {
    slug: "mock-experience-1",
    title: "Mock Title 1",
    company: "Mock Company 1",
    startDate: "Jan 2020",
    endDate: "Dec 2020",
    skills: ["Skill 1", "Skill 2"],
  },
  {
    slug: "mock-experience-2",
    title: "Mock Title 2",
    company: "Mock Company 2",
    startDate: "Jan 2021",
    endDate: "Dec 2021",
    skills: ["Skill 3", "Skill 4"],
  },
];

describe("Experience OG Image", () => {
  let originalExperiences: typeof experienceModule.experiences;
  let originalSiteConfigUrl: string;
  let originalSiteConfigName: string;

  beforeEach(() => {
    originalExperiences = experienceModule.experiences;
    Object.defineProperty(experienceModule, "experiences", {
      value: mockExperiences,
      writable: true,
    });

    originalSiteConfigUrl = siteConfigModule.siteConfig.url;
    siteConfigModule.siteConfig.url = "https://mock.com";
    originalSiteConfigName = siteConfigModule.siteConfig.name;
    siteConfigModule.siteConfig.name = "Mock Name";
  });

  afterEach(() => {
    Object.defineProperty(experienceModule, "experiences", {
      value: originalExperiences,
      writable: true,
    });
    siteConfigModule.siteConfig.url = originalSiteConfigUrl;
    siteConfigModule.siteConfig.name = originalSiteConfigName;
    vi.restoreAllMocks();
  });

  it("should export correct size and contentType", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
  });

  it("should generate static params correctly", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ slug: "mock-experience-1" }, { slug: "mock-experience-2" }]);
  });

  it("should return an ImageResponse with correct content for a found experience", async () => {
    const paramsPromise = Promise.resolve({ slug: "mock-experience-1" });
    const result = await OGImage({ params: paramsPromise });

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );

    const element = result.element;
    expect(element.props.children[0].props.children).toBe("Experience");
    expect(element.props.children[1].props.children[0].props.children).toBe("Mock Title 1");
    // Join the array of children for string comparison
    expect(element.props.children[1].props.children[1].props.children.join("")).toBe("at Mock Company 1");
    expect(element.props.children[2].props.children[0].props.children).toBe("Skill 1 • Skill 2");
    expect(element.props.children[2].props.children[1].props.children[0].props.children).toBe("Mock Name");
  });

  it("should return an ImageResponse with 'Experience Not Found' for an unknown experience", async () => {
    const paramsPromise = Promise.resolve({ slug: "unknown-experience" });
    const result = await OGImage({ params: paramsPromise });

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );

    const element = result.element;
    expect(element.props.children).toBe("Experience Not Found");
  });
});
