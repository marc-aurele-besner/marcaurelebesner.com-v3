import { render, screen } from "@testing-library/react";
import NotFound, { metadata } from "./not-found";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: vi.fn(({ children, href }) => <a href={href}>{children}</a>),
}));

// Mock GlassCard component
vi.mock("@/components/GlassCard", () => ({
  __esModule: true,
  default: vi.fn(({ children, className }) => <div className={className}>{children}</div>),
}));

describe("NotFound Page", () => {
  it("should have correct metadata", () => {
    expect(metadata).toEqual({
      title: "Page Not Found",
      description: "The page you're looking for doesn't exist or has been moved.",
      robots: { index: false, follow: true },
    });
  });

  it("should render correctly", () => {
    render(<NotFound />);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you're looking for doesn't exist or has been moved.")
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Go Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "View Projects" })).toHaveAttribute("href", "/#projects");
    expect(screen.getByText("experience")).toHaveAttribute("href", "/#experience");
    expect(screen.getByText("contact me")).toHaveAttribute("href", "/#contact");
  });
});
