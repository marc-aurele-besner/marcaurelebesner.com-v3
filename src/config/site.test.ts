import { siteConfig, ogImageSize } from "./site";

describe("siteConfig", () => {
  it("should have the correct name", () => {
    expect(siteConfig.name).toBe("Marc‑Aurele Besner");
  });

  it("should have the correct role", () => {
    expect(siteConfig.role).toBe("Senior Web3/AI Engineer");
  });

  it("should have the correct twitter handle", () => {
    expect(siteConfig.twitterHandle).toBe("@marcaureleb");
  });

  it("should include AI and DevTooling in keywords", () => {
    expect(siteConfig.keywords).toEqual(
      expect.arrayContaining(["AI", "AI Agents", "DevTooling"]),
    );
  });

  it("should expose a Person.knowsAbout list", () => {
    expect(siteConfig.person.knowsAbout).toEqual(
      expect.arrayContaining([
        "Web3",
        "Smart Contracts",
        "Solidity",
        "AI Agents",
        "DevTooling",
      ]),
    );
  });
});

describe("ogImageSize", () => {
  it("should have the correct width and height", () => {
    expect(ogImageSize.width).toBe(1200);
    expect(ogImageSize.height).toBe(630);
  });
});
