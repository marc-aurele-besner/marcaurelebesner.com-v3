import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders the badge with the correct text", () => {
    render(<Badge text="Test Badge" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });
});
