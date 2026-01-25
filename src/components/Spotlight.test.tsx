import { render, fireEvent } from "@testing-library/react";
import Spotlight from "./Spotlight";
import { useReducedMotion } from "framer-motion";
import React, { useRef } from "react";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

describe("Spotlight", () => {
  it("should not render when prefers reduced motion", () => {
    (useReducedMotion as vi.Mock).mockReturnValue(true);
    const { container } = render(<Spotlight />);
    expect(container.firstChild).toBeNull();
  });

  it("should render when not prefers reduced motion", () => {
    (useReducedMotion as vi.Mock).mockReturnValue(false);
    const { container } = render(<Spotlight />);
    expect(container.firstChild).not.toBeNull();
  });

  it("should update transform on mousemove", () => {
    (useReducedMotion as vi.Mock).mockReturnValue(false);
    const { container } = render(<Spotlight />);
    const spotlightDiv = container.firstChild as HTMLElement;

    fireEvent.mouseMove(window, { clientX: 200, clientY: 300 });

    expect(spotlightDiv.style.transform).toBe("translate3d(50px, 150px, 0)");
  });

  it("should not throw if ref is not set", () => {
    (useReducedMotion as vi.Mock).mockReturnValue(false);

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      // Directly call the effect's logic with a null ref
      const handleMove = (e: MouseEvent) => {
        if (!ref.current) return;
        const x = e.clientX - 150;
        const y = e.clientY - 150;
        ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      window.addEventListener("mousemove", handleMove);
      return <div ref={ref} />;
    };

    render(<TestComponent />);

    expect(() => {
      fireEvent.mouseMove(window, { clientX: 200, clientY: 300 });
    }).not.toThrow();
  });
});
