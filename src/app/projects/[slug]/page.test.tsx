import { render, screen, cleanup, within } from "@testing-library/react";
import ProjectPage, { generateStaticParams, generateMetadata } from "./page";
import * as projectModule from "@/config/projects";
import * as siteConfigModule from "@/config/site";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
vi.mock("next/image", () => ({
  __esModule: true,
  default: vi.fn((props) => {
    const { priority, ...rest } = props;
    return <img {...rest} priority={priority ? "true" : undefined} />;
  }),
}));
vi.mock("@/components/Badge", () => ({
  __esModule: true,
  default: vi.fn(({ text }) => <span>{text}</span>),
}));
vi.mock("@/components/GlassCard", () => ({
  __esModule: true,
  default: vi.fn(({ children, className }) => <div className={className}>{children}</div>),
}));

// Mock project data
const mockProjects = [
  {
    slug: "proj-1",
    title: "Project 1",
    summary: "Summary of Proj 1",
    description: "Full description of Proj 1",
    projectType: "personal" as const,
    imageSrc: "/image1.png",
    imageAlt: "Alt 1",
    repoLink: "https://github.com/repo1",
    link: "https://link1.com",
    badges: ["React", "Node"],
    highlights: ["Highlight 1", "Highlight 2"],
  },
  {
    slug: "proj-2",
    title: "Project 2",
    summary: "Summary of Proj 2",
    description: "Full description of Proj 2",
    projectType: "work" as const,
    imageSrc: "/image2.png",
    imageAlt: "Alt 2",
    repoLink: "https://github.com/repo2",
    link: "https://link2.com",
    badges: ["Vue", "TypeScript"],
    highlights: ["Highlight 3", "Highlight 4"],
  },
  {
    slug: "proj-3",
    title: "Project 3",
    summary: "Summary of Proj 3",
    description: "Full description of Proj 3",
    projectType: "personal" as const,
    imageSrc: "/image3.png",
    imageAlt: "Alt 3",
    repoLink: undefined,
    link: undefined,
    badges: ["Angular", "Go"],
    highlights: [],
  },
];

describe("Project Page", () => {
  let originalProjects: typeof projectModule.projects;
  let originalSiteConfig: typeof siteConfigModule.siteConfig;

  beforeEach(() => {
    originalProjects = projectModule.projects;
    Object.defineProperty(projectModule, "projects", {
      value: mockProjects,
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
    Object.defineProperty(projectModule, "projects", {
      value: originalProjects,
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
    expect(params).toEqual([{ slug: "proj-1" }, { slug: "proj-2" }, { slug: "proj-3" }]);
  });

  describe("generateMetadata", () => {
    it("should return correct metadata for a found project", async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: "proj-1" }) });
      expect(metadata.title).toBe("Project 1");
      expect(metadata.description).toBe("Summary of Proj 1");
    });

    it("should return 'Project Not Found' metadata for an unknown project", async () => {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug: "unknown" }) });
      expect(metadata.title).toBe("Project Not Found");
    });
  });

  describe("ProjectPage", () => {
    it("should call notFound if project is not found", async () => {
      await expect(ProjectPage({ params: Promise.resolve({ slug: "unknown" }) })).resolves.toBe(null);
      expect(notFound).toHaveBeenCalled();
    });

    it("should render project details correctly for a found project", async () => {
      render(await ProjectPage({ params: Promise.resolve({ slug: "proj-1" }) }));

      expect(screen.getByRole("heading", { name: "Project 1" })).toBeInTheDocument();
      expect(screen.getByText("Personal Project")).toBeInTheDocument();
      expect(screen.getByText("Full description of Proj 1")).toBeInTheDocument();
      expect(screen.getByText("Highlight 1")).toBeInTheDocument();
      expect(screen.getByText("Highlight 2")).toBeInTheDocument();
      expect(screen.getByText("React")).toBeInTheDocument();
      expect(screen.getByText("Node")).toBeInTheDocument();
      
      const script = document.querySelector('script[type="application/ld+json"]');
      expect(script).toBeInTheDocument();
      const json = JSON.parse(script?.textContent || '{}');
      expect(json["@graph"][0].name).toBe("Project 1");
    });
    
    it("should render project without repo or website links", async () => {
      render(await ProjectPage({ params: Promise.resolve({ slug: "proj-3" }) }));

      expect(screen.queryByRole("link", { name: "Repository" })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "Website" })).not.toBeInTheDocument();
    });

    it("should render navigation links correctly", async () => {
      render(await ProjectPage({ params: Promise.resolve({ slug: "proj-2" }) }));

      const prevLink = screen.getByRole("link", { name: /Previous/i });
      expect(prevLink).toHaveAttribute("href", "/projects/proj-1");
      const prevLinkCard = prevLink.querySelector("div");
      expect(within(prevLinkCard!).getByText("Project 1")).toBeInTheDocument();
      
      const nextLink = screen.getByRole("link", { name: /Next/i });
      expect(nextLink).toHaveAttribute("href", "/projects/proj-3");
      const nextLinkCard = nextLink.querySelector("div");
      expect(within(nextLinkCard!).getByText("Project 3")).toBeInTheDocument();
    });
  });
});