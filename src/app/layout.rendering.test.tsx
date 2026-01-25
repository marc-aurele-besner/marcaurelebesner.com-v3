import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";
import React from "react";
import * as siteConfigModule from "@/config/site";

// Mock next/font/local
vi.mock("next/font/local", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    variable: "mock-font",
    className: "mock-font",
  })),
}));

// Mock client components
vi.mock("@/components/ThemeProvider", () => ({ default: ({ children }: any) => <div>{children}</div> }));
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
    render(<RootLayout><div>Test Children</div></RootLayout>);
    expect(screen.getByText("Test Children")).toBeInTheDocument();
    expect(screen.getByText("MockEasterEggs")).toBeInTheDocument();
    expect(screen.getByText("MockScrollProgress")).toBeInTheDocument();
    expect(screen.getByText("MockBackdrop")).toBeInTheDocument();
    expect(screen.getByText("MockSpotlight")).toBeInTheDocument();
    expect(screen.getByText("MockHeader")).toBeInTheDocument();
    expect(screen.getByText("MockMenu")).toBeInTheDocument();
  });

  it("should render GoogleAnalytics if gaId is present", () => {
    siteConfigModule.siteConfig.googleAnalyticsId = "UA-TEST-GA-ID";
    render(<RootLayout><div>Test Children</div></RootLayout>);
    expect(screen.getByTestId("ga-mock")).toHaveTextContent("UA-TEST-GA-ID");
  });

  it("should not render GoogleAnalytics if gaId is not present", () => {
    render(<RootLayout><div>Test Children</div></RootLayout>);
    expect(screen.queryByTestId("ga-mock")).not.toBeInTheDocument();
  });
});