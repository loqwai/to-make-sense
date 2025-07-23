import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    testTimeout: 20000, // 20 seconds for Ollama API calls
    hookTimeout: 20000, // 20 seconds for beforeEach hooks
    setupFiles: ["./src/vitest.ts"], // Register our custom matcher
  },
})
