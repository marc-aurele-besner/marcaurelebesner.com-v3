import { vi } from "vitest";
import type React from "react";

// Shared helpers for the slug OG/Twitter image route tests. Those routes all
// render through src/utils/og-image.tsx, so the tests share the same next/og
// mock, module-stubbing, and element-tree navigation.

export type MockImageResponse = {
  element: React.ReactElement<{ children: unknown }>;
  options: { width: number; height: number };
};

type ChildEl = { props: { children: unknown } };

/**
 * Factory for `vi.mock("next/og", ...)`. Returns a mocked `ImageResponse` that
 * captures the element + options instead of rendering, so tests can assert on
 * the JSX tree. Kept as a factory to satisfy `vi.mock` hoisting rules.
 */
export function mockNextOg() {
  return {
    ImageResponse: vi.fn(
      (element: unknown, options: { width: number; height: number }) => ({
        element,
        options,
      })
    ),
  };
}

/**
 * Temporarily replace an export/property with a mock value. Returns a restore
 * function that reinstates the original — collect these and run them in
 * `afterEach`.
 */
export function stubExport<T extends object>(
  target: T,
  key: keyof T & string,
  value: unknown
): () => void {
  const original = target[key];
  Object.defineProperty(target, key, {
    value,
    writable: true,
    configurable: true,
  });
  return () => {
    Object.defineProperty(target, key, {
      value: original,
      writable: true,
      configurable: true,
    });
  };
}

// Layout produced by renderOgImage(): the outer div's children are
// [eyebrow, body, footer]; footer's children are [footerText, identity];
// identity's children are [name, host/handle].

/** Outer container children: `[eyebrow, body, footer]`. */
export function getChildren(result: MockImageResponse): ChildEl[] {
  const element = result.element as unknown as ChildEl;
  return element.props.children as ChildEl[];
}

/** The single string rendered by the not-found fallback card. */
export function getNotFoundText(result: MockImageResponse): unknown {
  const element = result.element as unknown as ChildEl;
  return element.props.children;
}

/** Uppercase eyebrow label (project type / "Experience"). */
export function getEyebrow(result: MockImageResponse): unknown {
  return getChildren(result)[0].props.children;
}

/** Children of the domain-specific body block (title, summary/company, ...). */
export function getBodyChildren(result: MockImageResponse): ChildEl[] {
  return getChildren(result)[1].props.children as ChildEl[];
}

/** Bottom-left line (project badges / experience skills). */
export function getFooterText(result: MockImageResponse): unknown {
  const footer = getChildren(result)[2].props.children as ChildEl[];
  return footer[0].props.children;
}

/** Bottom-right identity block: `{ name, line }` (line = host or handle). */
export function getIdentity(result: MockImageResponse): {
  name: unknown;
  line: unknown;
} {
  const footer = getChildren(result)[2].props.children as ChildEl[];
  const identity = footer[1].props.children as ChildEl[];
  return {
    name: identity[0].props.children,
    line: identity[1].props.children,
  };
}
