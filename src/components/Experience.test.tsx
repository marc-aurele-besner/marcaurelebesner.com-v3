import { render, screen } from "@testing-library/react";
import type React from "react";
import Experience from "./Experience";
import { experiences } from "@/config/experience";

const experienceCardMock = vi.fn(({ title }: { title: string; minimal?: boolean }) => (
  <div data-testid="experience-card">{title}</div>
));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      section: ({
        children,
        ...rest
      }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          initial: _initial,
          animate: _animate,
          whileInView: _whileInView,
          exit: _exit,
          transition: _transition,
          viewport: _viewport,
          ...domProps
        } = rest;
        return <section {...domProps}>{children}</section>;
      },
      div: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          initial: _initial,
          animate: _animate,
          whileInView: _whileInView,
          exit: _exit,
          transition: _transition,
          viewport: _viewport,
          ...domProps
        } = rest;
        return <div {...domProps}>{children}</div>;
      },
    },
  };
});

vi.mock("./ExperienceCard", () => ({
  ExperienceCard: (props: { title: string; minimal?: boolean }) =>
    experienceCardMock(props),
}));

vi.mock("./SectionHeading", () => ({
  __esModule: true,
  default: ({ children, eyebrow }: { children: React.ReactNode; eyebrow: string }) => (
    <div>
      <span>{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  ),
}));

describe("Experience", () => {
  it("renders experience sections and cards", () => {
    render(<Experience />);

    const web3 = experiences.filter((exp) => exp.isWeb3);
    const other = experiences.filter((exp) => !exp.isWeb3);

    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Earlier Experience")).toBeInTheDocument();
    expect(screen.getAllByTestId("experience-card")).toHaveLength(
      web3.length + other.length
    );

    const minimalCalls = experienceCardMock.mock.calls.filter(
      ([props]) => props.minimal
    );
    expect(minimalCalls).toHaveLength(other.length);
  });
});
