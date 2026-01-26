import { renderHook, act } from "@testing-library/react";
import { useActiveSection } from "./useActiveSection";

const mockIntersectionObserver = vi.fn((_callback: IntersectionObserverCallback) => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal("IntersectionObserver", mockIntersectionObserver);

const sectionIds = ["about", "experience", "projects", "advisory", "contact"] as const;

describe("useActiveSection", () => {
  beforeEach(() => {
    mockIntersectionObserver.mockClear();
    sectionIds.forEach((id) => {
      const el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    });
  });

  afterEach(() => {
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        document.body.removeChild(el);
      }
    });
  });

  it("should return the first section as active by default", () => {
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeId).toBe("about");
  });

  it("should return an empty string if no sections are provided", () => {
    const { result } = renderHook(() => useActiveSection([]));
    expect(result.current.activeId).toBe("");
  });

  it("should not fail if elements are not found", () => {
    // Clear the DOM
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        document.body.removeChild(el);
      }
    });
    const { result } = renderHook(() => useActiveSection());
    expect(result.current.activeId).toBe("about");
    expect(mockIntersectionObserver).not.toHaveBeenCalled();
  });

  it("should set active id when a section is intersecting", () => {
    const { result } = renderHook(() => useActiveSection());
    const observerCallback =
      mockIntersectionObserver.mock.calls[0]?.[0] as
        | IntersectionObserverCallback
        | undefined;
    if (!observerCallback) throw new Error("Missing observer callback");
    const projectsEl = document.getElementById("projects") as Element;
    const experienceEl = document.getElementById("experience") as Element;

    act(() => {
      const entries = [
        { isIntersecting: true, intersectionRatio: 0.8, target: projectsEl },
        { isIntersecting: true, intersectionRatio: 0.5, target: experienceEl },
      ] as unknown as IntersectionObserverEntry[];
      observerCallback(entries, {} as IntersectionObserver);
    });

    expect(result.current.activeId).toBe("projects");
  });

  it("should fallback to the closest section if none are intersecting", () => {
    const { result } = renderHook(() => useActiveSection());
    const observerCallback =
      mockIntersectionObserver.mock.calls[0]?.[0] as
        | IntersectionObserverCallback
        | undefined;
    if (!observerCallback) throw new Error("Missing observer callback");
    const projectsEl = document.getElementById("projects") as Element;
    const experienceEl = document.getElementById("experience") as Element;

    act(() => {
      const entries = [
        {
          isIntersecting: false,
          boundingClientRect: { top: 100 } as DOMRectReadOnly,
          target: projectsEl,
        },
        {
          isIntersecting: false,
          boundingClientRect: { top: 50 } as DOMRectReadOnly,
          target: experienceEl,
        },
      ] as unknown as IntersectionObserverEntry[];
      observerCallback(entries, {} as IntersectionObserver);
    });

    expect(result.current.activeId).toBe("experience");
  });
});
