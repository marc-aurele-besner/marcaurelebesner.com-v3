import { experiences } from "@/config/experience";
import { isProjectIndexable, projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { buildLlmsFullTxt, buildLlmsTxt } from "./llms";

describe("buildLlmsTxt", () => {
  const txt = buildLlmsTxt();

  it("starts with the llmstxt.org title and summary", () => {
    const [title, , summary] = txt.split("\n");
    expect(title).toBe(`# ${siteConfig.name}`);
    expect(summary).toBe(`> ${siteConfig.description}`);
  });

  it("links every experience page", () => {
    for (const exp of experiences) {
      expect(txt).toContain(`${siteConfig.url}/experience/${exp.slug}`);
    }
  });

  it("links indexable projects only", () => {
    for (const project of projects) {
      const link = `${siteConfig.url}/projects/${project.slug})`;
      if (isProjectIndexable(project)) expect(txt).toContain(link);
      else expect(txt).not.toContain(link);
    }
  });

  it("names the current role from config", () => {
    const current = experiences.find((exp) => exp.endDate === "Present");
    if (current) {
      expect(txt).toContain(`${current.title} at ${current.company}`);
    }
  });

  it("points at the full file", () => {
    expect(txt).toContain(`${siteConfig.url}/llms-full.txt`);
  });
});

describe("buildLlmsFullTxt", () => {
  const txt = buildLlmsFullTxt();

  it("includes each role and indexable project description", () => {
    for (const exp of experiences) expect(txt).toContain(exp.description);
    for (const project of projects.filter(isProjectIndexable)) {
      expect(txt).toContain(project.description);
    }
  });

  it("leaves out noindex projects", () => {
    for (const project of projects.filter((p) => !isProjectIndexable(p))) {
      expect(txt).not.toContain(`/projects/${project.slug}`);
    }
  });
});
