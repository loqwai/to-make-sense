import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000, // 10 seconds for Ollama API calls
    hookTimeout: 10000, // 10 seconds for beforeEach hooks
  },
})