import sitemap from "./sitemap";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { projects } from "@/config/projects";

describe("sitemap", () => {
  it("should return the correct sitemap configuration", () => {
    const result = sitemap();
    const expectedUrls = [
      `${siteConfig.url}/`,
      `${siteConfig.url}/contact`,
      ...experiences.map((exp) => `${siteConfig.url}/experience/${exp.slug}`),
      ...projects.map((project) => `${siteConfig.url}/projects/${project.slug}`),
    ];
    const resultUrls = result.map((item) => item.url);
    expect(resultUrls).toEqual(expect.arrayContaining(expectedUrls));
    expect(result.length).toBe(expectedUrls.length);
  });
});
