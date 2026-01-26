import { render, screen, fireEvent } from "@testing-library/react";
import type React from "react";
import Advisory from "./Advisory";
import { trackAdvisoryCta } from "@/utils/analytics";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
      section: ({ children }: React.PropsWithChildren) => <section>{children}</section>,
    },
  };
});

// Mock components
vi.mock("./GlassCard", () => ({
  __esModule: true,
  default: vi.fn(({ children, className }) => <div className={className}>{children}</div>),
}));
vi.mock("./SectionHeading", () => ({
  __esModule: true,
  default: vi.fn(({ children, eyebrow }) => (
    <div>
      <span>{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  )),
}));

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href, ...props }) => <a href={href} {...props}>{children}</a>),
}));

// Mock react-icons/fa
vi.mock("react-icons/fa", () => ({
  FaCode: () => <span>FaCode</span>,
  FaRocket: () => <span>FaRocket</span>,
  FaLightbulb: () => <span>FaLightbulb</span>,
  FaUsers: () => <span>FaUsers</span>,
}));

// Mock analytics
vi.mock("@/utils/analytics", () => ({
  trackAdvisoryCta: vi.fn(),
}));

describe("Advisory component", () => {
  it("should render the section heading and description", () => {
    render(<Advisory />);
    expect(screen.getByText("Advisory")).toBeInTheDocument();
    expect(screen.getByText("Work with me")).toBeInTheDocument();
    expect(
      screen.getByText(/I advise early-stage Web3 teams on smart contracts/)
    ).toBeInTheDocument();
  });

  it("should render all services", () => {
    render(<Advisory />);
    expect(screen.getByText("Smart Contract Architecture")).toBeInTheDocument();
    expect(screen.getByText("SDK & DevTooling")).toBeInTheDocument();
    expect(screen.getByText("Product & Engineering Strategy")).toBeInTheDocument();
    expect(screen.getByText("Team Augmentation")).toBeInTheDocument();
  });

  it("should render all engagement types", () => {
    render(<Advisory />);
    expect(screen.getByText("Hourly")).toBeInTheDocument();
    expect(screen.getByText("Retainer")).toBeInTheDocument();
    expect(screen.getByText("Project-Based")).toBeInTheDocument();
  });

  it("should call trackAdvisoryCta when 'Get in touch' is clicked", () => {
    render(<Advisory />);
    const getInTouchButton = screen.getByRole("link", { name: "Get in touch" });
    fireEvent.click(getInTouchButton);
    expect(trackAdvisoryCta).toHaveBeenCalledWith("get_in_touch");
  });
});
