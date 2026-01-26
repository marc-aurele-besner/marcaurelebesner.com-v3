import { render, screen } from "@testing-library/react";
import type React from "react";
import About from "./About";

// Mock framer-motion
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      div: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
      section: ({ children }: React.PropsWithChildren) => <section>{children}</section>,
      p: ({ children }: React.PropsWithChildren) => <p>{children}</p>,
    },
  };
});

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href }) => <a href={href}>{children}</a>),
}));

// Mock GlassCard
vi.mock("./GlassCard", () => ({
  __esModule: true,
  default: vi.fn(({ children, className }) => <div className={className}>{children}</div>),
}));

describe("About component", () => {
  it("should render the main heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Senior Web3/AI Engineer | Smart Contracts, Agents, Infra & DevTooling | Scaling Decentralized Systems | Product‑First Engineer"
    );
  });

  it("should render the introductory paragraph", () => {
    render(<About />);
    expect(
      screen.getByText(
        "I design and build decentralized apps, smart contracts, SDKs, open source tools, block explorers, and AI agents. I'm familiar with decentralized systems for encryption and data storage."
      )
    ).toBeInTheDocument();
  });

  it("should render the 'View Projects' and 'Experience' links", () => {
    render(<About />);
    expect(screen.getByRole("link", { name: /View Projects/i })).toHaveAttribute("href", "/#projects");
    expect(screen.getByRole("link", { name: "Experience" })).toHaveAttribute("href", "/#experience");
  });

  it("should render the GlassCard with additional info and contact link", () => {
    render(<About />);
    expect(
      screen.getByText(/With 5\+ years shipping Web3 products/)
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Let's connect!/i })).toHaveAttribute("href", "/#contact");
  });
});
