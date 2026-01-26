import { render, screen, fireEvent } from "@testing-library/react";
import type React from "react";
import { ExperienceCard } from "./ExperienceCard";
import { trackExperienceDetails } from "@/utils/analytics";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      article: ({
        children,
        ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          initial: _initial,
          animate: _animate,
          whileInView: _whileInView,
          whileHover: _whileHover,
          whileTap: _whileTap,
          exit: _exit,
          transition: _transition,
          viewport: _viewport,
          ...domProps
        } = rest;
        return <article {...domProps}>{children}</article>;
      },
    },
  };
});

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
    ...rest
  }: React.PropsWithChildren<{ href?: string; onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void }> &
    Record<string, unknown>) => (
    <a
      href={href}
      {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

vi.mock("./GlassCard", () => ({
  __esModule: true,
  default: ({ children, className }: React.PropsWithChildren<{ className?: string }>) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock("./Badge", () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => <span>{text}</span>,
}));

vi.mock("@/utils/analytics", () => ({
  trackExperienceDetails: vi.fn(),
}));

const baseExperience = {
  slug: "autonomys",
  title: "Lead Software Engineer",
  company: "Autonomys Network",
  location: "Palo Alto, California, United States",
  type: "remote" as const,
  startDate: "Apr 2024",
  endDate: "Jun 2025",
  summary: "Summary text",
  description: "Description text",
  highlights: ["One", "Two"],
  skills: ["Solidity", "TypeScript", "React", "Next.js", "IPFS", "Rust", "Go"],
  companyUrl: "https://autonomys.xyz",
  isWeb3: true,
};

describe("ExperienceCard", () => {
  it("renders minimal layout with link tracking", () => {
    render(<ExperienceCard {...baseExperience} minimal />);

    expect(
      screen.getByText("Lead Software Engineer at Autonomys Network")
    ).toBeInTheDocument();
    expect(screen.getByText("Apr 2024 - Jun 2025")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Read more/i });
    fireEvent.click(link);
    expect(trackExperienceDetails).toHaveBeenCalledWith(
      baseExperience.title,
      baseExperience.company,
      baseExperience.slug
    );
  });

  it("renders full layout with badges and external company link", () => {
    render(<ExperienceCard {...baseExperience} />);

    const companyLink = screen.getByRole("link", { name: baseExperience.company });
    expect(companyLink).toHaveAttribute("href", baseExperience.companyUrl);
    expect(companyLink).toHaveAttribute("target", "_blank");
    expect(companyLink).toHaveAttribute("rel");

    expect(screen.getByText("Summary text")).toBeInTheDocument();
    expect(screen.getByText("+1 more")).toBeInTheDocument();

    const readMoreLink = screen.getByRole("link", { name: /Read more/i });
    fireEvent.click(readMoreLink);
    expect(trackExperienceDetails).toHaveBeenCalledWith(
      baseExperience.title,
      baseExperience.company,
      baseExperience.slug
    );
  });

  it("renders company name without external link and no extra badge count", () => {
    render(
      <ExperienceCard
        {...baseExperience}
        companyUrl={undefined}
        skills={["Solidity", "TypeScript"]}
      />
    );

    expect(screen.queryByRole("link", { name: baseExperience.company })).not.toBeInTheDocument();
    expect(screen.getByText("Autonomys Network")).toBeInTheDocument();
    expect(screen.queryByText(/\+1 more/i)).not.toBeInTheDocument();
  });
});
