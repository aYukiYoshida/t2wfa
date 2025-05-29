import {defineWorkspace} from "vitest/config";

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: "vite.config.ts",
    test: {
      name: "unit",
      include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
      globals: true,
      environment: "jsdom",
    },
  },
  {
    extends: "vite.config.ts",
    test: {
      name: "component",
      include: [
        "tests/component/**/*.test.ts",
        "tests/component/**/*.test.tsx",
      ],
      browser: {
        enabled: true,
        provider: "playwright",
        // https://vitest.dev/guide/browser/playwright
        instances: [{browser: "chromium"}],
        headless: true,
      },
    },
  },
]);
