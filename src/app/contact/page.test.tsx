import { render, screen } from "@testing-library/react";
import ContactPage, { metadata } from "./page";
import { siteConfig } from "@/config/site";

// Mock the Contact component
vi.mock("@/components/Contact", () => ({ default: () => <div>MockContactComponent</div> }));

describe("ContactPage", () => {
  it("should have correct metadata", () => {
    expect(metadata).toEqual({
      title: "Contact",
      description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, or career opportunities.`,
      keywords: [
        "Contact",
        siteConfig.name,
        "Web3 Developer",
        "Blockchain Engineer",
        "Collaboration",
        "Hire",
        "Freelance",
      ],
      alternates: { canonical: "/contact" },
      openGraph: {
        title: `Contact | ${siteConfig.name}`,
        description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, blockchain consulting, or career opportunities.`,
        type: "website",
        url: "/contact",
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: `Contact | ${siteConfig.name}`,
        description: `Get in touch with ${siteConfig.name} for collaboration, Web3 projects, or career opportunities.`,
        creator: siteConfig.twitterHandle,
      },
    });
  });

  it("should render the mocked Contact component", () => {
    render(<ContactPage />);
    expect(screen.getByText("MockContactComponent")).toBeInTheDocument();
  });
});
