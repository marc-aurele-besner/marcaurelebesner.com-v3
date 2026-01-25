import { render, screen, fireEvent, within } from "@testing-library/react";
import Contact from "./Contact";
import { siteConfig } from "@/config/site";
import { trackSocialLink } from "@/utils/analytics";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children }: any) => <div>{children}</div>,
      section: ({ children }: any) => <section>{children}</section>,
      a: ({ children, href, onClick, ...rest }: any) => {
        const {
          initial,
          whileInView,
          whileHover,
          whileTap,
          viewport,
          transition,
          ...domProps
        } = rest;

        return (
          <a
            href={href}
            {...domProps}
            onClick={(event) => {
              event.preventDefault();
              onClick?.(event);
            }}
          >
            {children}
          </a>
        );
      },
    },
  };
});

// Mock react-icons/fa
vi.mock("react-icons/fa", () => ({
  FaGithub: () => <svg data-testid="FaGithub" />,
  FaLinkedin: () => <svg data-testid="FaLinkedin" />,
  FaTwitter: () => <svg data-testid="FaTwitter" />,
  FaInstagram: () => <svg data-testid="FaInstagram" />,
}));

// Mock SectionHeading
vi.mock("./SectionHeading", () => ({
  __esModule: true,
  default: vi.fn(({ children, eyebrow }) => (
    <div>
      <span>{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  )),
}));

// Mock GlassCard
vi.mock("./GlassCard", () => ({
  __esModule: true,
  default: vi.fn(({ children, className }) => <div className={className}>{children}</div>),
}));

// Mock analytics
vi.mock("@/utils/analytics", () => ({
  trackSocialLink: vi.fn(),
}));

describe("Contact component", () => {
  it("should render the section heading and introductory paragraph", () => {
    render(<Contact />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Get in touch")).toBeInTheDocument();
    expect(
      screen.getByText(
        /I'm open to collaborating on interesting projects/i
      )
    ).toBeInTheDocument();
  });

  it("should render all social media links correctly", () => {
    render(<Contact />);

    const githubLink = screen.getByRole("link", { name: /GitHub/ });
    expect(githubLink).toHaveAttribute("href", siteConfig.links.github);
    expect(within(githubLink).getByTestId("FaGithub")).toBeInTheDocument();

    const linkedinLink = screen.getByRole("link", { name: /LinkedIn/ });
    expect(linkedinLink).toHaveAttribute("href", siteConfig.links.linkedin);
    expect(within(linkedinLink).getByTestId("FaLinkedin")).toBeInTheDocument();

    const twitterLink = screen.getByRole("link", { name: /Twitter/ });
    expect(twitterLink).toHaveAttribute("href", siteConfig.links.twitter);
    expect(within(twitterLink).getByTestId("FaTwitter")).toBeInTheDocument();

    const instagramLink = screen.getByRole("link", { name: /Instagram/ });
    expect(instagramLink).toHaveAttribute("href", siteConfig.links.instagram);
    expect(within(instagramLink).getByTestId("FaInstagram")).toBeInTheDocument();
  });

  it("should call trackSocialLink when a social link is clicked", () => {
    render(<Contact />);

    const githubLink = screen.getByRole("link", { name: /GitHub/ });
    fireEvent.click(githubLink);
    expect(trackSocialLink).toHaveBeenCalledWith("github", siteConfig.links.github);

    const linkedinLink = screen.getByRole("link", { name: /LinkedIn/ });
    fireEvent.click(linkedinLink);
    expect(trackSocialLink).toHaveBeenCalledWith("linkedin", siteConfig.links.linkedin);

    vi.clearAllMocks(); // Clear mocks to prevent interference between clicks

    const twitterLink = screen.getByRole("link", { name: /Twitter/ });
    fireEvent.click(twitterLink);
    expect(trackSocialLink).toHaveBeenCalledWith("twitter", siteConfig.links.twitter);

    vi.clearAllMocks();

    const instagramLink = screen.getByRole("link", { name: /Instagram/ });
    fireEvent.click(instagramLink);
    expect(trackSocialLink).toHaveBeenCalledWith("instagram", siteConfig.links.instagram);
  });

  it("should open social links in a new tab with safe rel attributes", () => {
    render(<Contact />);

    const socialLinks = screen.getAllByRole("link");
    for (const link of socialLinks) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel");
      expect(link.getAttribute("rel")).toEqual(
        expect.stringContaining("noopener")
      );
      expect(link.getAttribute("rel")).toEqual(
        expect.stringContaining("noreferrer")
      );
    }
  });
});
