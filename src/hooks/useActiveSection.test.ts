import { renderHook, act } from "@testing-library/react";
import { sendGAEvent } from "@next/third-parties/google";
import { useActiveSection } from "./useActiveSection";

vi.mock("@next/third-parties/google", () => ({
  sendGAEvent: vi.fn(),
}));

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
    vi.mocked(sendGAEvent).mockClear();
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

  it("should track a view_section event for the initial section on mount", () => {
    renderHook(() => useActiveSection());
    expect(sendGAEvent).toHaveBeenCalledWith("event", "view_section", { section: "about" });
  });

  it("should track view_section only once per section change", () => {
    const { result } = renderHook(() => useActiveSection());
    const observerCallback =
      mockIntersectionObserver.mock.calls[0]?.[0] as
        | IntersectionObserverCallback
        | undefined;
    if (!observerCallback) throw new Error("Missing observer callback");
    const projectsEl = document.getElementById("projects") as Element;
    const experienceEl = document.getElementById("experience") as Element;
    const advisoryEl = document.getElementById("advisory") as Element;

    // Initial mount already fires "about"; clear so we count only transitions.
    vi.mocked(sendGAEvent).mockClear();

    act(() => {
      observerCallback(
        [{ isIntersecting: true, intersectionRatio: 0.8, target: projectsEl }] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });
    expect(result.current.activeId).toBe("projects");
    expect(sendGAEvent).toHaveBeenCalledTimes(1);
    expect(sendGAEvent).toHaveBeenLastCalledWith("event", "view_section", { section: "projects" });

    // Repeating the same entry should not re-fire.
    act(() => {
      observerCallback(
        [{ isIntersecting: true, intersectionRatio: 0.9, target: projectsEl }] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });
    expect(sendGAEvent).toHaveBeenCalledTimes(1);

    act(() => {
      observerCallback(
        [{ isIntersecting: true, intersectionRatio: 0.6, target: experienceEl }] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });
    expect(result.current.activeId).toBe("experience");
    expect(sendGAEvent).toHaveBeenCalledTimes(2);
    expect(sendGAEvent).toHaveBeenLastCalledWith("event", "view_section", { section: "experience" });

    act(() => {
      observerCallback(
        [{ isIntersecting: true, intersectionRatio: 0.7, target: advisoryEl }] as unknown as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });
    expect(result.current.activeId).toBe("advisory");
    expect(sendGAEvent).toHaveBeenCalledTimes(3);
    expect(sendGAEvent).toHaveBeenLastCalledWith("event", "view_section", { section: "advisory" });
  });

  it("should not track view_section when activeId is empty", () => {
    renderHook(() => useActiveSection([]));
    expect(sendGAEvent).not.toHaveBeenCalled();
  });
});