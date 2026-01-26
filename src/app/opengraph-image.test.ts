import { size, contentType } from "./opengraph-image";
import OGImage from "./opengraph-image";
import { ImageResponse } from "next/og";
import * as siteConfigModule from "@/config/site";

// Mock ImageResponse
vi.mock("next/og", () => ({
  ImageResponse: vi.fn((element, options) => ({ element, options })), // Mock with a simple return
}));

describe("OpenGraph Image", () => {
  let originalSiteConfigUrl: string;

  beforeEach(() => {
    originalSiteConfigUrl = siteConfigModule.siteConfig.url;
    siteConfigModule.siteConfig.url = "https://mock.com";
  });

  afterEach(() => {
    siteConfigModule.siteConfig.url = originalSiteConfigUrl;
    vi.restoreAllMocks();
  });

  it("should export correct size and contentType", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
  });

  it("should return an ImageResponse with correct size", async () => {
    await OGImage();

    expect(ImageResponse).toHaveBeenCalledWith(
      expect.any(Object), // The JSX element
      { width: 1200, height: 630 }
    );
  });
});