import { render, screen } from "@testing-library/react";
import ThemeProvider from "./ThemeProvider";

describe("ThemeProvider", () => {
  it("renders children correctly", () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
