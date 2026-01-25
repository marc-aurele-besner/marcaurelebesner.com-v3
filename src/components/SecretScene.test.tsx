import { render, screen, fireEvent, act } from "@testing-library/react";
import SecretScene from "./SecretScene";

const createMotionValue = () => ({
  set: vi.fn(),
  get: vi.fn(() => 0.5),
});

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useMotionValue: () => createMotionValue(),
    useTransform: () => createMotionValue(),
    useSpring: () => createMotionValue(),
    useReducedMotion: () => true,
    motion: {
      div: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, exit, transition, viewport, ...domProps } =
          rest;
        return <div {...domProps}>{children}</div>;
      },
      h1: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, exit, transition, viewport, ...domProps } =
          rest;
        return <h1 {...domProps}>{children}</h1>;
      },
      p: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, exit, transition, viewport, ...domProps } =
          rest;
        return <p {...domProps}>{children}</p>;
      },
      button: ({ children, ...rest }: any) => {
        const { initial, animate, whileInView, exit, transition, viewport, ...domProps } =
          rest;
        return <button {...domProps}>{children}</button>;
      },
    },
  };
});

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("SecretScene", () => {
  beforeEach(() => {
    vi.useFakeTimers();
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
});
