import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}"], // Run all tests
    environment: "happy-dom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "*.config.ts",
        "*.config.mjs",
        "**/*.stories.{ts,tsx}",
        "src/stories/**",
        ".storybook/**",
        "**/*.d.ts",
        "**/.next/**",
      ],
    },
  },
});
