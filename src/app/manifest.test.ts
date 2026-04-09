import manifest from "./manifest";
import { siteConfig } from "@/config/site";

describe("manifest", () => {
  it("should return the correct manifest configuration", () => {
    const result = manifest();
    expect(result).toEqual({
      name: `${siteConfig.name} — ${siteConfig.role}`,
      short_name: siteConfig.name,
      description: siteConfig.description,
      start_url: "/",
      display: "standalone",
      background_color: "#0a192f",
      theme_color: "#0a192f",
      icons: [
        { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    });
  });
});
