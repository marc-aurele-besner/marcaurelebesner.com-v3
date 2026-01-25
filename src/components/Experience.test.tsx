import { render, screen } from "@testing-library/react";
import Experience from "./Experience";
import { experiences } from "@/config/experience";

const experienceCardMock = vi.fn(({ title }: any) => (
  <div data-testid="experience-card">{title}</div>
));

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: {
      section: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, exit, transition, viewport, ...domProps } =
          rest;
        return <section {...domProps}>{children}</section>;
      },
      div: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, exit, transition, viewport, ...domProps } =
          rest;
        return <div {...domProps}>{children}</div>;
      },
    },
  };
});

vi.mock("./ExperienceCard", () => ({
  ExperienceCard: (props: any) => experienceCardMock(props),
}));

vi.mock("./SectionHeading", () => ({
  __esModule: true,
  default: ({ children, eyebrow }: any) => (
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
