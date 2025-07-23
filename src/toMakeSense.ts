import { doesThisMakeSense } from './doesThisMakeSense'

export const toMakeSense = async (received) => {
  const result = await doesThisMakeSense(received)
  
  return { 
    pass: result.makesSense,
    message: () => result.makesSense 
      ? result.reasoning
      : `Response does not make sense: ${result.reasoning}`
  }
}