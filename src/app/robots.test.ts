import robots from "./robots";
import { siteConfig } from "@/config/site";

describe("robots", () => {
  it("should return the correct robots configuration", () => {
    const result = robots();
    expect(result).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: "/secret",
        },
      ],
      sitemap: `${siteConfig.url}/sitemap.xml`,
      host: siteConfig.url,
    });
  });
});
