import { render, screen } from "@testing-library/react";
import ContactPage, { metadata } from "./page";
import { siteConfig } from "@/config/site";

// Mock the Contact component
vi.mock("@/components/Contact", () => ({ default: () => <div>MockContactComponent</div> }));

describe("ContactPage", () => {
  it("should have correct metadata", () => {
    expect(metadata.title).toBe("Contact");
    expect(metadata.description).toContain(siteConfig.name);
    expect(metadata.keywords).toEqual(
      expect.arrayContaining([
        "Contact",
        siteConfig.name,
        "Web3 Developer",
        "Blockchain Engineer",
        "AI Engineer",
        "Advisory",
      ]),
    );
    expect(metadata.alternates).toEqual({ canonical: "/contact" });
    const og = metadata.openGraph as Record<string, unknown> | undefined;
    expect(og?.type).toBe("website");
    expect(og?.url).toBe("/contact");
    const tw = metadata.twitter as Record<string, unknown> | undefined;
    expect(tw?.card).toBe("summary_large_image");
  });

  it("should render the contact FAQ section", () => {
    render(<ContactPage />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Frequently asked questions/i }),
    ).toBeInTheDocument();
  });

  it("should emit ContactPage + FAQPage JSON-LD", () => {
    render(<ContactPage />);
    const script = screen.getByTestId("json-ld") as HTMLScriptElement;
    const json = JSON.parse(script.innerHTML);
    const types = json["@graph"].map((n: { "@type": string }) => n["@type"]);
    expect(types).toEqual(
      expect.arrayContaining(["ContactPage", "FAQPage"]),
    );
  });

  it("should render the mocked Contact component", () => {
    render(<ContactPage />);
    expect(screen.getByText("MockContactComponent")).toBeInTheDocument();
  });
});
