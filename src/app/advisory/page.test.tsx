import { render, screen } from "@testing-library/react";
import AdvisoryPage from "./page";
import { advisoryServices } from "@/config/advisory";
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

describe("AdvisoryPage", () => {
  it("renders an h1 with 'Work with me'", () => {
    render(<AdvisoryPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Work with me" })).toBeInTheDocument();
  });

  it("lists every advisory service", () => {
    render(<AdvisoryPage />);
    for (const service of advisoryServices) {
      expect(screen.getByRole("heading", { level: 3, name: service.name })).toBeInTheDocument();
    }
  });

  it("renders the FAQ section", () => {
    render(<AdvisoryPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Frequently asked questions/i }),
    ).toBeInTheDocument();
  });

  it("emits ProfessionalService + Service + FAQPage JSON-LD", () => {
    render(<AdvisoryPage />);
    const script = screen.getByTestId("json-ld") as HTMLScriptElement;
    const json = JSON.parse(script.innerHTML);
    const types = json["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(
      expect.arrayContaining([
        "ProfessionalService",
        "Service",
        "FAQPage",
        "BreadcrumbList",
      ]),
    );
    const pro = json["@graph"].find(
      (n: { "@type": string }) => n["@type"] === "ProfessionalService",
    );
    expect(pro.url).toBe(`${siteConfig.url}/advisory`);
  });
});
