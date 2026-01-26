import RootLayout from "./layout";
import { renderToStaticMarkup } from "react-dom/server";
import * as siteConfigModule from "@/config/site";
import type React from "react";

// Mock next/font/local
vi.mock("next/font/local", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    variable: "mock-font",
    className: "mock-font",
  })),
}));

// Mock client components
vi.mock("@/components/ThemeProvider", () => ({
  default: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));
vi.mock("@/components/EasterEggs", () => ({ default: () => <div>MockEasterEggs</div> }));
vi.mock("@/components/ScrollProgress", () => ({ default: () => <div>MockScrollProgress</div> }));
vi.mock("@/components/Backdrop", () => ({ default: () => <div>MockBackdrop</div> }));
vi.mock("@/components/Spotlight", () => ({ default: () => <div>MockSpotlight</div> }));
vi.mock("@/components/Header", () => ({ default: () => <div>MockHeader</div> }));
vi.mock("@/components/Menu", () => ({ default: () => <div>MockMenu</div> }));

// Mock GoogleAnalytics
vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => <div data-testid="ga-mock">{gaId}</div>,
}));

describe("RootLayout Rendering", () => {
  let originalGoogleAnalyticsId: string | undefined;

  const renderLayout = (children: React.ReactNode) =>
    renderToStaticMarkup(<RootLayout>{children}</RootLayout>);

  beforeEach(() => {
    // Store the original value and set a default mock value
    originalGoogleAnalyticsId = siteConfigModule.siteConfig.googleAnalyticsId;
    siteConfigModule.siteConfig.googleAnalyticsId = undefined; // Default to undefined for most tests
  });

  afterEach(() => {
    // Restore the original value after each test
    siteConfigModule.siteConfig.googleAnalyticsId = originalGoogleAnalyticsId;
    vi.restoreAllMocks();
  });

  it("should render children and mocked components", () => {
    const html = renderLayout(<div>Test Children</div>);
    expect(html).toContain("Test Children");
    expect(html).toContain("MockEasterEggs");
    expect(html).toContain("MockScrollProgress");
    expect(html).toContain("MockBackdrop");
    expect(html).toContain("MockSpotlight");
    expect(html).toContain("MockHeader");
    expect(html).toContain("MockMenu");
  });

  it("should render GoogleAnalytics if gaId is present", () => {
    siteConfigModule.siteConfig.googleAnalyticsId = "UA-TEST-GA-ID";
    const html = renderLayout(<div>Test Children</div>);
    expect(html).toContain("data-testid=\"ga-mock\"");
    expect(html).toContain("UA-TEST-GA-ID");
  });

  it("should not render GoogleAnalytics if gaId is not present", () => {
    const html = renderLayout(<div>Test Children</div>);
    expect(html).not.toContain("data-testid=\"ga-mock\"");
  });
});
