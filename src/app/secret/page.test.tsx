import { render, screen } from "@testing-library/react";
import SecretPage, { metadata } from "./page";

// Mock the SecretScene component
vi.mock("@/components/SecretScene", () => ({ default: () => <div>MockSecretScene</div> }));

describe("SecretPage", () => {
  it("should have correct metadata", () => {
    expect(metadata).toEqual({
      robots: { index: false, follow: false },
    });
  });

  it("should render correctly", () => {
    render(<SecretPage />);

    expect(screen.getByText("MockSecretScene")).toBeInTheDocument();
    expect(
      screen.getByText("This page is off the main path. Thanks for finding it.")
    ).toBeInTheDocument();
  });
});
