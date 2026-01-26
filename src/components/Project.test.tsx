import { render, screen, fireEvent } from "@testing-library/react";
import type React from "react";
import { Project } from "./Project";
import { trackProjectDetails, trackProjectLink } from "@/utils/analytics";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      article: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          initial: _initial,
          animate: _animate,
          whileInView: _whileInView,
          whileHover: _whileHover,
          whileTap: _whileTap,
          exit: _exit,
          transition: _transition,
          viewport: _viewport,
          ...domProps
        } = rest;
        return <article {...domProps}>{children}</article>;
      },
    },
  };
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img src={src} alt={alt} {...rest} />
  ),
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
    ...rest
  }: React.PropsWithChildren<{ href?: string; onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void }> &
    Record<string, unknown>) => (
    <a
      href={href}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

vi.mock("./GlassCard", () => ({
  __esModule: true,
  default: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock("./Badge", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));

vi.mock("@/utils/analytics", () => ({
  trackProjectDetails: vi.fn(),
  trackProjectLink: vi.fn(),
}));

const projectData = {
  slug: "neon",
  title: "Neon Deck",
  summary: "Project summary",
  imageSrc: "/images/neon.png",
  imageAlt: "Neon preview",
  link: "https://neon.example.com",
  repoLink: "https://github.com/example/neon",
  badges: ["React", "Next.js", "Tailwind", "Framer", "Node", "Edge"],
  projectType: "personal" as const,
  featured: true,
};

describe("Project", () => {
  beforeEach(() => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    window.fetch = fetchMock as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders badges and extra count", () => {
    render(<Project {...projectData} />);

    expect(screen.getByText("Project summary")).toBeInTheDocument();
    expect(screen.getByText("+1 more")).toBeInTheDocument();
  });

  it("tracks detail and outbound link clicks", () => {
    render(<Project {...projectData} />);

    const detailLinks = screen.getAllByRole("link", { name: /Neon Deck/i });
    detailLinks.forEach((link) => fireEvent.click(link));
    expect(trackProjectDetails).toHaveBeenCalledWith(
      projectData.title,
      projectData.slug
    );

    const imageLink = screen.getByRole("link", { name: /Neon preview/i });
    fireEvent.click(imageLink);
    expect(trackProjectDetails).toHaveBeenCalledWith(
      projectData.title,
      projectData.slug
    );

    const repoLink = screen.getByRole("link", { name: /Repository/i });
    repoLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(repoLink);
    expect(trackProjectLink).toHaveBeenCalledWith(
      projectData.title,
      "repository",
      projectData.repoLink
    );

    const siteLink = screen.getByRole("link", { name: /Website/i });
    siteLink.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(siteLink);
    expect(trackProjectLink).toHaveBeenCalledWith(
      projectData.title,
      "website",
      projectData.link
    );

    const viewDetails = screen.getByRole("link", { name: /View details/i });
    fireEvent.click(viewDetails);
    expect(trackProjectDetails).toHaveBeenCalledWith(
      projectData.title,
      projectData.slug
    );
  });

  it("renders work project without optional links", () => {
    render(
      <Project
        {...projectData}
        projectType="work"
        repoLink={undefined}
        link={undefined}
        badges={["React", "Next.js"]}
      />
    );

    expect(screen.getByText("Work Project")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Repository/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Website/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/\+1 more/i)).not.toBeInTheDocument();
  });
});
