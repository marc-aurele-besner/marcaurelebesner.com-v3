import { render, screen, fireEvent } from "@testing-library/react";
import Projects from "./Projects";
import { projects } from "@/config/projects";
import { trackProjectDetails } from "@/utils/analytics";

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

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, onClick, ...rest }: any) => (
    <a
      href={href}
      {...rest}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

vi.mock("./Project", () => ({
  Project: ({ title }: any) => <div data-testid="project-card">{title}</div>,
}));

vi.mock("@/utils/analytics", () => ({
  trackProjectDetails: vi.fn(),
}));

describe("Projects", () => {
  it("renders featured project cards and extra project links", () => {
    const featured = projects.filter((project) => project.featured);
    const other = projects.filter((project) => !project.featured);

    render(<Projects />);

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getAllByTestId("project-card")).toHaveLength(featured.length);
    expect(screen.getByText(`+${other.length} more projects`)).toBeInTheDocument();
  });

  it("tracks clicks on extra project links", () => {
    const other = projects.filter((project) => !project.featured);
    render(<Projects />);

    const targetProject = other[0];
    const link = screen.getByRole("link", { name: targetProject.title });
    fireEvent.click(link);

    expect(trackProjectDetails).toHaveBeenCalledWith(
      targetProject.title,
      targetProject.slug
    );
  });
});
