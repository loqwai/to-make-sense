import type { DoesThisMakeSenseOptions } from './types'

declare module 'vitest' {
  interface Assertion {
    toMakeSense(options?: DoesThisMakeSenseOptions): Promise<void>
  }
  interface AsymmetricMatchersContaining {
    toMakeSense(options?: DoesThisMakeSenseOptions): any
  }
}