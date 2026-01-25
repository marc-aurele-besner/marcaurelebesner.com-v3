import { render, screen, act, fireEvent } from "@testing-library/react";
import EasterEggs from "./EasterEggs";

describe("EasterEggs", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.documentElement.classList.remove("party-mode");
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
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
});
