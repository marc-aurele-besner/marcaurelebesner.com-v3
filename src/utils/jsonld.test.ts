import { describe, expect, it } from "vitest";
import { type ExperienceData, experiences } from "@/config/experience";
import { projects } from "@/config/projects";
import {
  breadcrumbListJsonLd,
  contactPageJsonLd,
  organizationRoleJsonLd,
  personJsonLd,
  professionalServiceJsonLd,
  softwareApplicationJsonLd,
  workHistoryJsonLd,
} from "./jsonld";

const baseExperience: ExperienceData = {
  slug: "test-role",
  title: "Engineer",
  company: "Test Co",
  location: "Remote",
  type: "remote",
  startDate: "Jan 2020",
  endDate: "Dec 2020",
  updatedAt: "2020-12",
  summary: "Engineer at Test Co.",
  description: "Did things.",
  highlights: [],
  skills: ["TypeScript"],
  companyUrl: "https://example.com",
  isWeb3: false,
};

describe("softwareApplicationJsonLd", () => {
  it.each(["vibeinprod", "payxor"])(
    "does not publish a free Offer for the priced project %s",
    (slug) => {
      const project = projects.find((p) => p.slug === slug);
      expect(project).toBeDefined();
      if (!project) return;
      const node = softwareApplicationJsonLd(project, slug);
      expect(node).not.toHaveProperty("offers");
      expect(JSON.stringify(node)).not.toContain('"price":"0"');
    },
  );

  it("does not attach a default Offer to any project", () => {
    for (const project of projects) {
      const node = softwareApplicationJsonLd(project, project.slug);
      expect(node).not.toHaveProperty("offers");
    }
  });
});

describe("person worksFor", () => {
  it("only lists organizations for roles that are still current", () => {
    const person = personJsonLd();
    const current = experiences
      .filter((exp) => exp.endDate === "Present")
      .map((exp) => exp.company);
    const worksFor = person.worksFor as Array<{ name: string }>;
    expect(worksFor.map((org) => org.name)).toEqual(current);

    const former = experiences
      .filter((exp) => exp.endDate !== "Present")
      .map((exp) => exp.company)
      .filter((company) => !current.includes(company));
    for (const company of former) {
      expect(worksFor.map((org) => org.name)).not.toContain(company);
    }
  });
});

describe("@context placement", () => {
  it("is declared on the graph root only, never on @graph nodes", () => {
    const graphs = [
      workHistoryJsonLd(experiences),
      professionalServiceJsonLd([
        { name: "Advisory", description: "Advice." },
      ]),
    ];
    for (const graph of graphs) {
      expect(graph["@context"]).toBe("https://schema.org");
      for (const node of graph["@graph"]) {
        expect(node).not.toHaveProperty("@context");
      }
    }
  });

  it("omits @context from node helpers meant for @graph composition", () => {
    const nodes = [
      organizationRoleJsonLd(baseExperience),
      breadcrumbListJsonLd([{ name: "Home", item: "https://example.com" }]),
      softwareApplicationJsonLd(projects[0], projects[0].slug),
      contactPageJsonLd("https://example.com/contact"),
    ];
    for (const node of nodes) {
      expect(node).not.toHaveProperty("@context");
    }
  });

  it("keeps @context on the standalone Person document", () => {
    expect(personJsonLd()["@context"]).toBe("https://schema.org");
  });
});

describe("organizationRoleJsonLd", () => {
  it("omits endDate for a current role instead of emitting null", () => {
    const node = organizationRoleJsonLd({
      ...baseExperience,
      endDate: "Present",
    });
    expect(node).not.toHaveProperty("endDate");
    expect(JSON.stringify(node)).not.toContain('"endDate":null');
    expect(node.startDate).toBe("2020-01");
  });

  it("serializes endDate for a past role", () => {
    const node = organizationRoleJsonLd(baseExperience);
    expect(node.endDate).toBe("2020-12");
  });
});
