import { size, contentType, generateStaticParams } from "./twitter-image";
import TwitterImage from "./twitter-image";
import { ImageResponse } from "next/og";
import * as experienceModule from "@/config/experience";
import * as siteConfigModule from "@/config/site";
import {
  stubExport,
  getEyebrow,
  getBodyChildren,
  getFooterText,
  getIdentity,
  getNotFoundText,
  type MockImageResponse,
} from "@/test/og-image-test-utils";

vi.mock("next/og", async () => (await import("@/test/og-image-test-utils")).mockNextOg());

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

describe("Experience Twitter Image", () => {
  const restores: Array<() => void> = [];

  beforeEach(() => {
    restores.push(
      stubExport(experienceModule, "experiences", mockExperiences),
      stubExport(experienceModule, "getExperienceBySlug", (slug: string) =>
        mockExperiences.find((e) => e.slug === slug)
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
    expect(params).toEqual([
      { slug: "mock-experience-1" },
      { slug: "mock-experience-2" },
    ]);
  });

  it("should render title, company, skills, name, and handle for a found experience", async () => {
    const result = (await TwitterImage({
      params: Promise.resolve({ slug: "mock-experience-1" }),
    })) as unknown as MockImageResponse;

    expect(ImageResponse).toHaveBeenCalledWith(expect.any(Object), {
      width: 1200,
      height: 630,
    });

    const body = getBodyChildren(result);
    expect(getEyebrow(result)).toBe("Experience");
    expect(body[0].props.children).toBe("Mock Title 1");
    // Company is rendered as `at {company}` → ["at ", "Mock Company 1"].
    expect((body[1].props.children as unknown[]).join("")).toBe("at Mock Company 1");
    expect(getFooterText(result)).toBe("Skill 1 • Skill 2");

    const identity = getIdentity(result);
    expect(identity.name).toBe("Mock Name");
    expect(identity.line).toBe("@mockhandle");
  });

  it("should render 'Experience Not Found' for an unknown experience", async () => {
    const result = (await TwitterImage({
      params: Promise.resolve({ slug: "unknown-experience" }),
    })) as unknown as MockImageResponse;

    expect(getNotFoundText(result)).toBe("Experience Not Found");
  });
});
