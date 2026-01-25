import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

let reduceMotion = false;

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useReducedMotion: () => reduceMotion,
    motion: {
      nav: ({ children, ...rest }: any) => {
        const { initial, animate, exit, transition, ...domProps } = rest;
        return <nav {...domProps}>{children}</nav>;
      },
      li: ({ children, ...rest }: any) => {
        const { initial, animate, exit, transition, ...domProps } = rest;
        return <li {...domProps}>{children}</li>;
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

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/hooks/useActiveSection", () => ({
  useActiveSection: () => ({ activeId: "about" }),
}));

vi.mock("./ThemeToggle", () => ({
  __esModule: true,
  default: () => <button type="button">Theme</button>,
}));

describe("Header", () => {
  it("opens and closes the menu in reduced motion mode", () => {
    reduceMotion = true;
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("link", { name: "About" }));
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("closes the menu on Escape in animated mode", () => {
    reduceMotion = false;
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
