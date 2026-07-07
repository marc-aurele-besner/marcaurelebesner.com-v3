import { render, screen } from "@testing-library/react";
import ExperiencePage from "./page";
import { experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href}>{children}</a>
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

vi.mock("@/components/ExperienceCard", () => ({
  ExperienceCard: ({
    title,
    company,
    slug,
  }: {
    title: string;
    company: string;
    slug: string;
  }) => (
    <article data-slug={slug}>
      {title} at {company}
    </article>
  ),
}));

describe("ExperiencePage", () => {
  it("renders an h1 with 'Experience'", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { level: 1, name: "Experience" })).toBeInTheDocument();
  });

  it("renders all experience entries", () => {
    render(<ExperiencePage />);
    for (const exp of experiences) {
      expect(
        screen.getAllByText(`${exp.title} at ${exp.company}`).length,
      ).toBeGreaterThan(0);
    }
  });

  it("emits a JSON-LD CollectionPage + per-role OrganizationRole", () => {
    render(<ExperiencePage />);
    const script = screen.getByTestId("json-ld") as HTMLScriptElement;
    const json = JSON.parse(script.innerHTML);
    const collection = json["@graph"].find(
      (n: { "@type": string }) => n["@type"] === "CollectionPage",
    );
    expect(collection.url).toBe(`${siteConfig.url}/experience`);
    const roles = json["@graph"].filter(
      (n: { "@type": string }) => n["@type"] === "OrganizationRole",
    );
    expect(roles.length).toBe(experiences.length);
  });
});
