import { siteConfig, ogImageSize } from "./site";

describe("siteConfig", () => {
  it("should have the correct name", () => {
    expect(siteConfig.name).toBe("Marc‑Aurele Besner");
  });

  it("should have the correct role", () => {
    expect(siteConfig.role).toBe("Web3 Full‑Stack Engineer");
  });

  it("should have the correct twitter handle", () => {
    expect(siteConfig.twitterHandle).toBe("@marcaureleb");
  });
});

describe("ogImageSize", () => {
  it("should have the correct width and height", () => {
    expect(ogImageSize.width).toBe(1200);
    expect(ogImageSize.height).toBe(630);
  });
});
