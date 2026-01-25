import { size, contentType } from "./twitter-image";
import TwitterImage from "./twitter-image";
import { ImageResponse } from "next/og";
import * as siteConfigModule from "@/config/site";

// Mock ImageResponse
vi.mock("next/og", () => ({
  ImageResponse: vi.fn((element, options) => ({ element, options })), // Mock with a simple return
}));

describe("Twitter Image", () => {
  let originalSiteConfigName: string;
  let originalSiteConfigRole: string;

  beforeEach(() => {
    originalSiteConfigName = siteConfigModule.siteConfig.name;
    originalSiteConfigRole = siteConfigModule.siteConfig.role;
    siteConfigModule.siteConfig.name = "Mock Name";
    siteConfigModule.siteConfig.role = "Mock Role";
  });

  afterEach(() => {
    siteConfigModule.siteConfig.name = originalSiteConfigName;
    siteConfigModule.siteConfig.role = originalSiteConfigRole;
    vi.restoreAllMocks();
  });

  it("should export correct size and contentType", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
  });

  it("should return an ImageResponse with correct size", async () => {
    await TwitterImage();

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );
  });
});
