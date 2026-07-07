import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { siteConfig } from "@/config/site";

// Mock imported components
vi.mock("@/components/About", () => ({ default: () => <div>MockAbout</div> }));
vi.mock("@/components/Experience", () => ({ default: () => <div>MockExperience</div> }));
vi.mock("@/components/Projects", () => ({ default: () => <div>MockProjects</div> }));
vi.mock("@/components/Advisory", () => ({ default: () => <div>MockAdvisory</div> }));
vi.mock("@/components/Contact", () => ({ default: () => <div>MockContact</div> }));

describe("HomePage", () => {
  it("should render all mocked components", () => {
    render(<HomePage />);
    expect(screen.getByText("MockAbout")).toBeInTheDocument();
    expect(screen.getByText("MockExperience")).toBeInTheDocument();
    expect(screen.getByText("MockProjects")).toBeInTheDocument();
    expect(screen.getByText("MockAdvisory")).toBeInTheDocument();
    expect(screen.getByText("MockContact")).toBeInTheDocument();
  });

  it("should render an enriched Person + work-history JSON-LD graph", () => {
    render(<HomePage />);
    const script = screen.getByTestId("json-ld") as HTMLScriptElement;
    expect(script).toBeInTheDocument();
    const json = JSON.parse(script.innerHTML);
    expect(json["@context"]).toBe("https://schema.org");
    expect(Array.isArray(json["@graph"])).toBe(true);

    const person = json["@graph"].find(
      (n: { "@type": string }) => n["@type"] === "Person",
    );
    expect(person).toBeDefined();
    expect(person.name).toBe(siteConfig.name);
    expect(person.jobTitle).toBe(siteConfig.role);
    expect(person.image).toBe(`${siteConfig.url}/opengraph-image`);
    expect(person.knowsAbout).toEqual(
      expect.arrayContaining([
        "Web3",
        "Smart Contracts",
        "Solidity",
        "AI Agents",
        "DevTooling",
      ]),
    );
    expect(person.hasOccupation[0]["@type"]).toBe("Occupation");
    expect(person.worksFor.length).toBeGreaterThan(0);

    const orgRoles = json["@graph"].filter(
      (n: { "@type": string }) => n["@type"] === "OrganizationRole",
    );
    expect(orgRoles.length).toBeGreaterThan(0);
    expect(orgRoles[0].organization["@type"]).toBe("Organization");
    expect(orgRoles[0].member.name).toBe(siteConfig.name);
  });
});
