import { toMakeSense } from "./toMakeSense"

// Extend expect with our matcher
expect.extend({ toMakeSense })

// Re-export for direct usage
export { toMakeSense }
