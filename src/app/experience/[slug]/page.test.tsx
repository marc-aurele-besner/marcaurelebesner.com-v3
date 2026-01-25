import { render, screen, cleanup, within } from "@testing-library/react";
import ExperiencePage, { generateStaticParams, generateMetadata } from "./page";
import * as experienceModule from "@/config/experience";
import * as siteConfigModule from "@/config/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import Badge from "@/components/Badge";
import GlassCard from "@/components/GlassCard";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  notFound: vi.fn(),
}));

// Mock components
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href }) => <a href={href}>{children}</a>),
}));
vi.mock("@/components/Badge", () => ({
  __esModule: true,
  default: vi.fn(({ text }) => <span>{text}</span>),
}));
vi.mock("@/components/GlassCard", () => ({
  __esModule: true,
  default: vi.fn(({ children, className }) => <div className={className}>{children}</div>),
}));

// Mock experience data
const mockExperiences = [
  {
    slug: "exp-1",
    title: "Engineer",
    company: "Company A",
    companyUrl: "https://companya.com",
    startDate: "Jan 2020",
    endDate: "Dec 2020",
    location: "Remote",
    type: "Full-time",
    summary: "Summary of Exp 1",
    description: "Full description of Exp 1",
    highlights: ["Highlight 1", "Highlight 2"],
    skills: ["React", "Node"],
  },
  {
    slug: "exp-2",
    title: "Lead Engineer",
    company: "Company B",
    companyUrl: "https://companyb.com",
    startDate: "Jan 2021",
    endDate: "Dec 2021",
    location: "On-site",
    type: "Contract",
    summary: "Summary of Exp 2",
    description: "Full description of Exp 2",
    highlights: ["Highlight 3", "Highlight 4"],
    skills: ["Vue", "TypeScript"],
  },
  {
    slug: "exp-3",
    title: "Senior Engineer",
    company: "Company C",
    companyUrl: undefined,
    startDate: "Jan 2022",
    endDate: "Dec 2022",
    location: "Hybrid",
    type: "Full-time",
    summary: "Summary of Exp 3",
    description: "Full description of Exp 3",
    highlights: ["Highlight 5", "Highlight 6"],
    skills: ["Angular", "Go"],
  },
];

describe("Experience Page", () => {
  let originalExperiences: typeof experienceModule.experiences;
  let originalSiteConfig: typeof siteConfigModule.siteConfig;

  beforeEach(() => {
    originalExperiences = experienceModule.experiences;
    Object.defineProperty(experienceModule, "experiences", {
      value: mockExperiences,
      writable: true,
    });

    originalSiteConfig = siteConfigModule.siteConfig;
    Object.defineProperty(siteConfigModule, "siteConfig", {
      value: {
        ...originalSiteConfig,
        name: "Mock Name",
        url: "https://mock.com",
        twitterHandle: "@mockhandle",
      },
      writable: true,
    });
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(experienceModule, "experiences", {
      value: originalExperiences,
      writable: true,
    });
    Object.defineProperty(siteConfigModule, "siteConfig", {
      value: originalSiteConfig,
      writable: true,
    });
    cleanup(); // Clean up the DOM after each test
    vi.restoreAllMocks();
  });

  it("should generate static params correctly", async () => {
    const params = await generateStaticParams();
    expect(params).toEqual([{ slug: "exp-1" }, { slug: "exp-2" }, { slug: "exp-3" }]);
  });

  describe("generateMetadata", () => {
    it("should return correct metadata for a found experience", async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: "exp-1" }) });
      expect(metadata.title).toBe("Engineer at Company A");
      expect(metadata.description).toBe("Summary of Exp 1");
      expect(metadata.keywords).toEqual(["Engineer", "Company A", "React", "Node", "Web3", "Blockchain", "Software Engineer"]);
      expect(metadata.alternates).toEqual({ canonical: "/experience/exp-1" });
      expect(metadata.openGraph).toEqual({
        title: "Engineer at Company A | Mock Name",
        description: "Summary of Exp 1",
        type: "article",
        url: "/experience/exp-1",
        siteName: "Mock Name",
      });
      expect(metadata.twitter).toEqual({
        card: "summary_large_image",
        title: "Engineer at Company A | Mock Name",
        description: "Summary of Exp 1",
        creator: "@mockhandle",
      });
    });

    it("should return 'Experience Not Found' metadata for an unknown experience", async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: "unknown" }) });
      expect(metadata.title).toBe("Experience Not Found");
    });
  });

  describe("ExperiencePage", () => {
    it("should call notFound if experience is not found", async () => {
      await expect(ExperiencePage({ params: Promise.resolve({ slug: "unknown" }) })).resolves.toBe(null);
      expect(notFound).toHaveBeenCalled();
    });

    it("should render experience details correctly for a found experience", async () => {
      render(await ExperiencePage({ params: Promise.resolve({ slug: "exp-1" }) }));

      expect(screen.getByRole("heading", { name: "Engineer" })).toBeInTheDocument();
      expect(screen.getByText("Company A")).toBeInTheDocument();
      expect(screen.getByText("Jan 2020 - Dec 2020")).toBeInTheDocument();
      expect(screen.getByText("Remote")).toBeInTheDocument();
      expect(screen.getByText("Full-time")).toBeInTheDocument();
      expect(screen.getByText("Full description of Exp 1")).toBeInTheDocument();
      expect(screen.getByText("Highlight 1")).toBeInTheDocument();
      expect(screen.getByText("Highlight 2")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Node")).toBeInTheDocument();
      
      // JSON-LD
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
      const json = JSON.parse(script?.textContent || '{}');
      expect(json["@context"]).toBe("https://schema.org");
      expect(json["@graph"][0].headline).toBe("Engineer at Company A");
      expect(json["@graph"][1].itemListElement[2].name).toBe("Engineer at Company A");
    });

    it("should render experience without a companyUrl correctly", async () => {
      render(await ExperiencePage({ params: Promise.resolve({ slug: "exp-3" }) }));

      expect(screen.getByText("Company C")).toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Company C" })).not.toBeInTheDocument();
    });

    it("should render next navigation link for the first experience", async () => {
      render(await ExperiencePage({ params: Promise.resolve({ slug: "exp-1" }) }));

      expect(screen.queryByRole("link", { name: /Previous/i })).not.toBeInTheDocument(); // First experience, no previous

      const nextLink = screen.getByRole("link", { name: /Next/i });
      expect(nextLink).toHaveAttribute("href", "/experience/exp-2");
      const nextLinkCard = nextLink.querySelector("div");
      expect(within(nextLinkCard!).getByText("Lead Engineer")).toBeInTheDocument();
      expect(within(nextLinkCard!).getByText("Company B")).toBeInTheDocument();
    });
    
    it("should render both previous and next navigation links for a middle experience", async () => {
      render(await ExperiencePage({ params: Promise.resolve({ slug: "exp-2" }) }));

      const prevLink = screen.getByRole("link", { name: /Previous/i });
      expect(prevLink).toHaveAttribute("href", "/experience/exp-1");
      const prevLinkCard = prevLink.querySelector("div");
      expect(within(prevLinkCard!).getByText("Engineer")).toBeInTheDocument();
      expect(within(prevLinkCard!).getByText("Company A")).toBeInTheDocument();
      
      const nextLink = screen.getByRole("link", { name: /Next/i });
      expect(nextLink).toHaveAttribute("href", "/experience/exp-3");
      const nextLinkCard = nextLink.querySelector("div");
      expect(within(nextLinkCard!).getByText("Senior Engineer")).toBeInTheDocument();
      expect(within(nextLinkCard!).getByText("Company C")).toBeInTheDocument();
    });

    it("should render previous navigation link for the last experience", async () => {
      render(await ExperiencePage({ params: Promise.resolve({ slug: "exp-3" }) }));

      const prevLink = screen.getByRole("link", { name: /Previous/i });
      expect(prevLink).toHaveAttribute("href", "/experience/exp-2");
      const prevLinkCard = prevLink.querySelector("div");
      expect(within(prevLinkCard!).getByText("Lead Engineer")).toBeInTheDocument();
      expect(within(prevLinkCard!).getByText("Company B")).toBeInTheDocument();

      expect(screen.queryByRole("link", { name: /Next/i })).not.toBeInTheDocument(); // Last experience, no next
    });
  });
});
