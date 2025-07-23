export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface State {
  messages: Message[]
  seed?: number
}

export interface DoesThisMakeSenseOptions {
  endpoint?: string
  model?: string
  temperature?: number
}

export interface ValidationResult {
  makesSense: boolean
  reasoning: string
}