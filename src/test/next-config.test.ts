import nextConfig from "../../next.config";

async function getCspDirectives(): Promise<Map<string, string[]>> {
  const rules = await nextConfig.headers!();
  const csp = rules
    .flatMap((rule) => rule.headers)
    .find((header) => header.key === "Content-Security-Policy");
  expect(csp).toBeDefined();
  return new Map(
    csp!.value
      .split(";")
      .map((directive) => directive.trim())
      .filter(Boolean)
      .map((directive) => {
        const [name, ...sources] = directive.split(/\s+/);
        return [name, sources] as [string, string[]];
      }),
  );
}

describe("Content-Security-Policy", () => {
  it("allows the Google Analytics gtag script without a blanket https: source", async () => {
    const scriptSrc = (await getCspDirectives()).get("script-src");
    expect(scriptSrc).toContain("https://www.googletagmanager.com");
    expect(scriptSrc).toContain("vercel.live");
    expect(scriptSrc).not.toContain("https:");
  });

  it("allows Google Analytics collect endpoints alongside Vercel hosts", async () => {
    const connectSrc = (await getCspDirectives()).get("connect-src");
    expect(connectSrc).toEqual(
      expect.arrayContaining([
        "https://www.google-analytics.com",
        "https://analytics.google.com",
        "https://region1.google-analytics.com",
        "https://vitals.vercel-insights.com",
        "https://vercel.live",
      ]),
    );
  });
});
