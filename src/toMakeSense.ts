import { doesThisMakeSense } from './doesThisMakeSense'
import type { State, DoesThisMakeSenseOptions } from './types'

interface ExpectationResult {
  pass: boolean
  message: () => string
  actual?: unknown
  expected?: unknown
}

export const toMakeSense = async (received: State, options?: DoesThisMakeSenseOptions): Promise<ExpectationResult> => {
  const result = await doesThisMakeSense(received, options)
  
  return { 
    pass: result.makesSense,
    message: () => result.makesSense 
      ? result.reasoning
      : `Response does not make sense: ${result.reasoning}`
  }
}