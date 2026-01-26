import { render, screen, fireEvent, act, within } from "@testing-library/react";
import React from "react";
import SecretScene from "./SecretScene";

const motionValueMocks: Array<{ set: ReturnType<typeof vi.fn> }> = [];
const createMotionValue = () => {
  const mock = {
    set: vi.fn(),
    get: vi.fn(() => 0.5),
  };
  motionValueMocks.push(mock);
  return mock;
};

let reduceMotion = true;

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
    useMotionValue: () => createMotionValue(),
    useTransform: () => createMotionValue(),
    useSpring: () => createMotionValue(),
    useReducedMotion: () => reduceMotion,
    motion: {
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
      h1: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          initial: _initial,
          animate: _animate,
          whileInView: _whileInView,
          exit: _exit,
          transition: _transition,
          viewport: _viewport,
          ...domProps
        } = rest;
        return <h1 {...domProps}>{children}</h1>;
      },
      p: ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) => {
        const {
          initial: _initial,
          animate: _animate,
          whileInView: _whileInView,
          exit: _exit,
          transition: _transition,
          viewport: _viewport,
          ...domProps
        } = rest;
        return <p {...domProps}>{children}</p>;
      },
      button: ({
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
        return <button {...domProps}>{children}</button>;
      },
    },
  };
});

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: React.PropsWithChildren<{ href?: string }> & Record<string, unknown>) => (
    <a href={href} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  ),
}));

describe("SecretScene", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    motionValueMocks.length = 0;
    reduceMotion = true;
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("opens the peek panel and cycles hints", () => {
    render(<SecretScene />);

    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const hint = screen.getByText(/Try the Konami code/i);
    expect(hint).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Reveal a hint/i }));
    expect(screen.getByText(/Hit Esc to calm down Party Mode/i)).toBeInTheDocument();
  });

  it("triggers konami dispatches and copies the secret link", async () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<SecretScene />);
    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));

    act(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /Trigger Party Mode/i })
      );
      vi.runAllTimers();
    });
    expect(dispatchSpy).toHaveBeenCalled();

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Copy secret link/i }));
      await Promise.resolve();
      vi.runAllTimers();
    });
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("?peek=1"));
  });

  it("updates motion values on pointer movement when motion is enabled", () => {
    reduceMotion = false;
    render(<SecretScene />);

    const hint = screen.getByText(/Try a famous code on the home page/i);
    let card = hint.closest("div");
    while (card && !card.className.includes("max-w-xl")) {
      card = card.parentElement;
    }
    if (!card) throw new Error("Card container not found");

    vi.spyOn(card, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 100,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect);

    fireEvent.mouseMove(card, { clientX: 100, clientY: 50 });
    expect(motionValueMocks[0].set).toHaveBeenCalledWith(0.5);
    expect(motionValueMocks[1].set).toHaveBeenCalledWith(0.5);

    fireEvent.mouseLeave(card);
    expect(motionValueMocks[0].set).toHaveBeenCalledWith(0.5);
    expect(motionValueMocks[1].set).toHaveBeenCalledWith(0.5);
  });

  it("handles clipboard errors without showing copied state", async () => {
    const writeText = vi.fn().mockRejectedValue(new Error("no clipboard"));
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<SecretScene />);
    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Copy secret link/i }));
      await Promise.resolve();
    });

    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
  });

  it("closes the peek panel on Escape and shows copied state on success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<SecretScene />);
    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Copy secret link/i }));
      await Promise.resolve();
    });

    expect(screen.getByText("Copied!")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1200);
    });
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument();
  });

  it("renders peek panel with reduced motion transition", () => {
    reduceMotion = true;
    render(<SecretScene />);
    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders peek panel with spring transition when motion is enabled", () => {
    reduceMotion = false;
    render(<SecretScene />);
    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the peek panel via overlay and close button", () => {
    render(<SecretScene />);
    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));

    fireEvent.click(screen.getByRole("button", { name: /Close peek panel/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Peek around/i }));
    const dialog = screen.getByRole("dialog");
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("ignores pointer updates if the card ref is not set", () => {
    reduceMotion = false;
    const realUseRef = React.useRef;
    const useRefSpy = vi
      .spyOn(React, "useRef")
      .mockImplementationOnce(() => ({ current: null }))
      .mockImplementation(realUseRef as typeof React.useRef);

    render(<SecretScene />);
    const hint = screen.getByText(/Try a famous code on the home page/i);
    let card = hint.closest("div");
    while (card && !card.className.includes("max-w-xl")) {
      card = card.parentElement;
    }
    if (!card) throw new Error("Card container not found");

    fireEvent.mouseMove(card, { clientX: 10, clientY: 10 });
    useRefSpy.mockRestore();
  });
});
