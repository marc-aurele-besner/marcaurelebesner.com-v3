import sitemap from "./sitemap";
import { siteConfig } from "@/config/site";
import { experiences } from "@/config/experience";
import { projects } from "@/config/projects";

describe("sitemap", () => {
  it("should return the correct sitemap configuration", () => {
    const result = sitemap();
    const expectedUrls = [
      `${siteConfig.url}/`,
      `${siteConfig.url}/projects`,
      `${siteConfig.url}/experience`,
      `${siteConfig.url}/advisory`,
      `${siteConfig.url}/contact`,
      ...experiences.map((exp) => `${siteConfig.url}/experience/${exp.slug}`),
      ...projects.map((project) => `${siteConfig.url}/projects/${project.slug}`),
    ];
    const resultUrls = result.map((item) => item.url);
    expect(resultUrls).toEqual(expect.arrayContaining(expectedUrls));
    expect(result.length).toBe(expectedUrls.length);
  });

  it("should use each project and experience updatedAt as lastModified", () => {
    const result = sitemap();
    const projectPage = result.find(
      (item) => item.url === `${siteConfig.url}/projects/${projects[0].slug}`,
    );
    const experiencePage = result.find(
      (item) =>
        item.url === `${siteConfig.url}/experience/${experiences[0].slug}`,
    );
    expect(projectPage?.lastModified).toBeInstanceOf(Date);
    expect(experiencePage?.lastModified).toBeInstanceOf(Date);
    // lastModified for a known project should be a fixed month, not "now",
    // so it does not reset on every deploy.
    const fixedProject = projects.find((p) => p.slug === "mymultisig")!;
    const myMultisig = result.find(
      (item) => item.url === `${siteConfig.url}/projects/${fixedProject.slug}`,
    );
    expect(myMultisig?.lastModified).toEqual(
      new Date(Date.UTC(2023, 7, 1)),
    );
  });
});
