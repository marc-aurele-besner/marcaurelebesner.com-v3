import { render } from "@testing-library/react";
import type { Mock } from "vitest";
import type React from "react";
import ScrollProgress from "./ScrollProgress";
import { useScroll, useReducedMotion } from "framer-motion";

const capturedProps: {
  style: React.CSSProperties | undefined;
} = {
  style: undefined,
};

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useScroll: vi.fn(),
    useSpring: (value: unknown) => value, // Return the value directly
    useReducedMotion: vi.fn(),
    motion: {
      div: (
        props: React.HTMLAttributes<HTMLDivElement> & {
          style?: React.CSSProperties;
        },
      ) => {
        capturedProps.style = props.style;
        const { style, ...rest } = props;
        return <div style={style} {...rest} />;
      },
    },
  };
});

describe("ScrollProgress", () => {
  beforeEach(() => {
    capturedProps.style = undefined;
  });

  it("renders correctly and applies scaleX", () => {
    (useScroll as Mock).mockReturnValue({ scrollYProgress: 0.5 });
    (useReducedMotion as Mock).mockReturnValue(false);

    const { container } = render(<ScrollProgress />);
    const progressDiv = container.firstChild as HTMLElement;
    expect(progressDiv).toBeInTheDocument();
    expect(
      (capturedProps.style as unknown as { scaleX?: number }).scaleX,
    ).toBe(0.5);
  });

  it("does not apply scaleX when prefersReducedMotion is true", () => {
    (useScroll as Mock).mockReturnValue({ scrollYProgress: 0.5 });
    (useReducedMotion as Mock).mockReturnValue(true);

    const { container } = render(<ScrollProgress />);
    const progressDiv = container.firstChild as HTMLElement;
    expect(progressDiv).toBeInTheDocument();
    expect(
      (capturedProps.style as unknown as { scaleX?: number }).scaleX,
    ).toBeUndefined();
  });
});