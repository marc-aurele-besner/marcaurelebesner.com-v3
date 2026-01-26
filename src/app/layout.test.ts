import { siteConfig } from "@/config/site";

type LayoutModule = typeof import("./layout");

// Mock next/font/local
vi.mock("next/font/local", () => ({
  __esModule: true,
  default: vi.fn(() => ({
    variable: "mock-font",
    className: "mock-font",
  })),
}));

describe("Layout Metadata", () => {
  let metadata: LayoutModule["metadata"];
  let viewport: LayoutModule["viewport"];

  beforeAll(async () => {
    const layoutModule = await vi.importActual<typeof import("./layout")>("./layout");
    metadata = layoutModule.metadata;
    viewport = layoutModule.viewport;
  });

  it("should have correct viewport settings", () => {
    expect(viewport).toEqual({
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      viewportFit: "cover",
      themeColor: "#0a192f",
    });
  });

  it("should have correct metadata settings", () => {
    // Mock the URL object since it's used in metadataBase
    const mockURL = new URL(siteConfig.url);
    vi.stubGlobal("URL", mockURL);

    expect(metadata.metadataBase).toEqual(mockURL);
    expect(metadata.title).toEqual({
      default: `${siteConfig.name} — ${siteConfig.role}`,
      template: `%s | ${siteConfig.name}`,
    });
    expect(metadata.description).toBe(siteConfig.description);
    expect(metadata.keywords).toEqual(siteConfig.keywords);
    expect(metadata.alternates).toEqual({ canonical: "/" });
    expect(metadata.authors).toEqual([{ name: siteConfig.name, url: siteConfig.url }]);
    expect(metadata.creator).toBe(siteConfig.name);
    expect(metadata.applicationName).toBe(siteConfig.name);
    expect(metadata.referrer).toBe("origin-when-cross-origin");
    expect(metadata.formatDetection).toEqual({ telephone: false });
    expect(metadata.manifest).toBe("/manifest.webmanifest");
    expect(metadata.robots).toEqual({ index: true, follow: true });
    expect(metadata.icons).toEqual({
      icon: "/favicon.svg",
    });
    expect(metadata.openGraph).toEqual({
      url: "/",
      siteName: siteConfig.name,
      type: "website",
      title: `${siteConfig.name} — ${siteConfig.role}`,
      description: siteConfig.description,
      images: ["/opengraph-image"],
    });
    expect(metadata.twitter).toEqual({
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title: `${siteConfig.name} — ${siteConfig.role}`,
      description: siteConfig.description,
      images: ["/twitter-image"],
    });
  });
});
