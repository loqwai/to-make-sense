import type { State, DoesThisMakeSenseOptions, ValidationResult } from './types'

export const doesThisMakeSense = async (
  state: State, 
  options: DoesThisMakeSenseOptions = {}
): Promise<ValidationResult> => {
  const { 
    endpoint = 'http://localhost:11434/api/chat',
    model = 'llama3.2:latest',
    temperature = 0.3
  } = options

  const { messages, seed } = state

  const systemPrompt = `
    Analyze the conversation history and determine if the latest assistant response makes logical sense.
    Consider:
    1. Is the response coherent and follows logically from the conversation?
    2. Does it address the user's request in a meaningful way?
    3. Are there any contradictions, impossible claims, or hallucinations?
    4. Is the information internally consistent?
    
    DO NOT judge tone, personality, formality, or style. Focus ONLY on logical coherence.
    
    Provide your analysis in two parts:
    - "makesSense": Set to true if the response is logically coherent
    - "reasoning": Explain WHY the response does or doesn't make sense logically
  `

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        ...messages,
        {
          role: 'system',
          content: systemPrompt
        }
      ],
      format: {
        type: 'object',
        properties: {
          makesSense: {
            type: 'boolean'
          },
          reasoning: {
            type: 'string'
          }
        },
        required: ['makesSense', 'reasoning']
      },
      stream: false,
      options: {
        seed,
        temperature
      }
    })
  })

  const res = await response.json()
  return JSON.parse(res.message.content)
}