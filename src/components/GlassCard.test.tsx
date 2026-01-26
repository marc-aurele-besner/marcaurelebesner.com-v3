import { render, screen } from "@testing-library/react";
import GlassCard from "./GlassCard";

describe("GlassCard", () => {
  it("renders children correctly", () => {
    render(
      <GlassCard>
        <div>Test Child</div>
      </GlassCard>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <GlassCard className="custom-class">
        <div>Test Child</div>
      </GlassCard>
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
