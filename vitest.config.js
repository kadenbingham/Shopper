import { defineConfig } from "vite";

export default defineConfig({
  test: {
    setupFiles: ["./seed-test.js"],
    maxConcurrency: 1,
    maxThreads: 1,
    minThreads: 1,
  },
});
