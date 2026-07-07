import { render, screen } from "@testing-library/react";
import ProjectsPage from "./page";
import { projects } from "@/config/projects";
import { siteConfig } from "@/config/site";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/Breadcrumbs", () => ({
  __esModule: true,
  default: ({ items }: { items: { label: string; href?: string }[] }) => (
    <nav aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => (
          <li key={i}>{item.label}</li>
        ))}
      </ol>
    </nav>
  ),
}));

vi.mock("@/components/Project", () => ({
  Project: ({ title, slug }: { title: string; slug: string }) => (
    <article data-slug={slug}>{title}</article>
  ),
}));

vi.mock("@/components/GlassCard", () => ({
  __esModule: true,
  default: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("ProjectsPage", () => {
  it("renders an h1 with 'Projects'", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
  });

  it("renders the full list of projects as detail links", () => {
    render(<ProjectsPage />);
    for (const project of projects) {
      // Each project title should appear at least once (either in the
      // featured list, the "more" list, or both).
      expect(screen.getAllByText(project.title).length).toBeGreaterThan(0);
    }
  });

  it("emits a JSON-LD CollectionPage + per-project SoftwareApplication", () => {
    render(<ProjectsPage />);
    const script = screen.getByTestId("json-ld") as HTMLScriptElement;
    const json = JSON.parse(script.innerHTML);
    const collection = json["@graph"].find(
      (n: { "@type": string }) => n["@type"] === "CollectionPage",
    );
    expect(collection.url).toBe(`${siteConfig.url}/projects`);
    const apps = json["@graph"].filter(
      (n: { "@type": string }) => n["@type"] === "SoftwareApplication",
    );
    expect(apps.length).toBe(projects.length);
  });
});
