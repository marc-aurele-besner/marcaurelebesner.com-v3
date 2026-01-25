import { render, screen, act, fireEvent } from "@testing-library/react";
import EasterEggs from "./EasterEggs";

describe("EasterEggs", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.documentElement.classList.remove("party-mode");
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  const triggerKonami = () => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    sequence.forEach((key) => fireEvent.keyDown(window, { key }));
  };

  it("activates party mode on Konami sequence and clears after timeout", () => {
    render(<EasterEggs />);
    expect(screen.queryByText(/Party Mode/i)).not.toBeInTheDocument();

    triggerKonami();
    expect(screen.getByText(/Party Mode/i)).toBeInTheDocument();
    expect(document.documentElement.classList.contains("party-mode")).toBe(true);

    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(screen.queryByText(/Party Mode/i)).not.toBeInTheDocument();
    expect(document.documentElement.classList.contains("party-mode")).toBe(false);
  });

  it("closes party mode on Escape", () => {
    render(<EasterEggs />);

    triggerKonami();
    expect(screen.getByText(/Party Mode/i)).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });
    expect(screen.queryByText(/Party Mode/i)).not.toBeInTheDocument();
    expect(document.documentElement.classList.contains("party-mode")).toBe(false);
  });

  it("handles console logging failures gracefully", () => {
    (console.log as unknown as vi.Mock).mockImplementationOnce(() => {
      throw new Error("log failed");
    });

    expect(() => render(<EasterEggs />)).not.toThrow();
  });

  it("resets konami progress on mismatched input and clears previous timeout", () => {
    render(<EasterEggs />);

    act(() => {
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "x" });
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "ArrowDown" });
      fireEvent.keyDown(window, { key: "ArrowDown" });
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      fireEvent.keyDown(window, { key: "ArrowRight" });
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      fireEvent.keyDown(window, { key: "ArrowRight" });
      fireEvent.keyDown(window, { key: "b" });
      fireEvent.keyDown(window, { key: "a" });
    });

    expect(screen.getByText(/Party Mode/i)).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "ArrowDown" });
      fireEvent.keyDown(window, { key: "ArrowDown" });
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      fireEvent.keyDown(window, { key: "ArrowRight" });
      fireEvent.keyDown(window, { key: "ArrowLeft" });
      fireEvent.keyDown(window, { key: "ArrowRight" });
      fireEvent.keyDown(window, { key: "b" });
      fireEvent.keyDown(window, { key: "a" });
    });

    expect(screen.getByText(/Party Mode/i)).toBeInTheDocument();
  });

  it("restarts the sequence when a mismatch key matches the first step", () => {
    render(<EasterEggs />);

    act(() => {
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "ArrowUp" });
      fireEvent.keyDown(window, { key: "ArrowUp" });
    });

    expect(screen.queryByText(/Party Mode/i)).not.toBeInTheDocument();
  });
});
