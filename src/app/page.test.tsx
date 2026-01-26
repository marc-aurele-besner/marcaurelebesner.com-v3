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

  it("should render JSON-LD script correctly", () => {
    render(<HomePage />);
    const script = screen.getByTestId("json-ld") as HTMLScriptElement;
    expect(script).toBeInTheDocument();
    const json = JSON.parse(script.innerHTML);
    expect(json).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
      jobTitle: siteConfig.role,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.twitter,
        siteConfig.links.instagram,
      ],
      description: siteConfig.description,
    });
  });
});
