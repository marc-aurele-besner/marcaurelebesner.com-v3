import { render, screen, fireEvent } from "@testing-library/react";
import Menu from "./Menu";
import { siteConfig } from "@/config/site";
import { trackNavigation, trackSocialLink } from "@/utils/analytics";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      li: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, whileHover, whileTap, exit, transition, viewport, ...domProps } =
          rest;
        return <li {...domProps}>{children}</li>;
      },
    },
  };
});

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, onClick, ...rest }: any) => (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
}));

vi.mock("@/hooks/useActiveSection", () => ({
  useActiveSection: () => ({ activeId: "projects" }),
}));

vi.mock("./ThemeToggle", () => ({
  __esModule: true,
  default: () => <button type="button">Theme</button>,
}));

vi.mock("@/utils/analytics", () => ({
  trackNavigation: vi.fn(),
  trackSocialLink: vi.fn(),
}));

describe("Menu", () => {
  beforeEach(() => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    window.fetch = fetchMock as any;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("marks the active navigation item and tracks clicks", () => {
    render(<Menu />);

    const activeLink = screen.getByRole("link", { name: "Projects" });
    expect(activeLink).toHaveAttribute("aria-current", "page");

    fireEvent.click(activeLink);
    expect(trackNavigation).toHaveBeenCalledWith("projects");
  });

  it("renders social links and tracks social clicks", () => {
    render(<Menu />);

    const socialLinks = [
      { name: "GitHub", platform: "github", href: siteConfig.links.github },
      { name: "LinkedIn", platform: "linkedin", href: siteConfig.links.linkedin },
      { name: "Twitter", platform: "twitter", href: siteConfig.links.twitter },
      { name: "Instagram", platform: "instagram", href: siteConfig.links.instagram },
    ];

    for (const social of socialLinks) {
      const link = screen.getByRole("link", { name: social.name });
      expect(link).toHaveAttribute("href", social.href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel");

      link.addEventListener("click", (event) => event.preventDefault());
      fireEvent.click(link);
      expect(trackSocialLink).toHaveBeenCalledWith(social.platform, social.href);
    }
  });

  it("uses prefixed anchors when not on the home route", () => {
    pathname = "/projects";
    render(<Menu />);

    const aboutLink = screen.getByRole("link", { name: "About" });
    expect(aboutLink).toHaveAttribute("href", "/#about");
  });
});
