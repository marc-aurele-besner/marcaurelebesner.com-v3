import { render, fireEvent, screen } from "@testing-library/react";
import Spotlight from "./Spotlight";
import { useReducedMotion } from "framer-motion";
import React, { useState } from "react";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

const SpotlightWrapper = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <button onClick={() => setShow(false)}>Hide</button>
      {show && <Spotlight />}
    </div>
  );
};

describe("Spotlight", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  it("should remove event listener on unmount", () => {
    (useReducedMotion as vi.Mock).mockReturnValue(false);
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    render(<SpotlightWrapper />);

    const hideButton = screen.getByText("Hide");
    fireEvent.click(hideButton);

    expect(removeEventListener).toHaveBeenCalledWith("mousemove", expect.any(Function));
  });
});
