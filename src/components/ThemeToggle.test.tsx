import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "next-themes";
import { trackThemeChange } from "@/utils/analytics";
import React from "react";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

vi.mock("@/utils/analytics", () => ({
  trackThemeChange: vi.fn(),
}));

// Mock useEffect to run immediately
vi.spyOn(React, "useEffect").mockImplementation((f) => f());

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should highlight the correct theme", () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: "dark", setTheme: () => {}, systemTheme: "dark" });
    render(<ThemeToggle />);

    const darkButton = screen.getByLabelText("Switch to dark theme");
    expect(darkButton.className).toContain("bg-black/5");
  });

  it("should call setTheme and trackThemeChange on light theme click", () => {
    const setTheme = vi.fn();
    (useTheme as vi.Mock).mockReturnValue({ theme: "dark", setTheme, systemTheme: "dark" });
    render(<ThemeToggle />);

    const lightButton = screen.getByLabelText("Switch to light theme");
    fireEvent.click(lightButton);

    expect(setTheme).toHaveBeenCalledWith("light");
    expect(trackThemeChange).toHaveBeenCalledWith("light");
  });

  it("should call setTheme and trackThemeChange on dark theme click", () => {
    const setTheme = vi.fn();
    (useTheme as vi.Mock).mockReturnValue({ theme: "light", setTheme, systemTheme: "light" });
    render(<ThemeToggle />);

    const darkButton = screen.getByLabelText("Switch to dark theme");
    fireEvent.click(darkButton);

    expect(setTheme).toHaveBeenCalledWith("dark");
    expect(trackThemeChange).toHaveBeenCalledWith("dark");
  });

  it("should call setTheme and trackThemeChange on system theme click", () => {
    const setTheme = vi.fn();
    (useTheme as vi.Mock).mockReturnValue({ theme: "light", setTheme, systemTheme: "light" });
    render(<ThemeToggle />);

    const systemButton = screen.getByLabelText("Use system theme");
    fireEvent.click(systemButton);

    expect(setTheme).toHaveBeenCalledWith("system");
    expect(trackThemeChange).toHaveBeenCalledWith("system");
  });

  it("should handle system theme correctly", () => {
    (useTheme as vi.Mock).mockReturnValue({ theme: "system", setTheme: () => {}, systemTheme: "dark" });
    render(<ThemeToggle />);

    const darkButton = screen.getByLabelText("Switch to dark theme");
    expect(darkButton.className).toContain("bg-black/5");
  });
});

