import { render, screen } from "@testing-library/react";
import SectionHeading from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders the heading and eyebrow correctly", () => {
    render(<SectionHeading eyebrow="Test Eyebrow">Test Heading</SectionHeading>);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
  });

  it("renders only the heading when eyebrow is not provided", () => {
    render(<SectionHeading>Test Heading</SectionHeading>);
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.queryByText("Test Eyebrow")).not.toBeInTheDocument();
  });
});
