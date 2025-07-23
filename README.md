# @loqwai/to-make-sense

A Vitest custom matcher that uses LLMs (via Ollama) to validate whether AI-generated responses make sense in production contexts.

## Why?

When building AI agents, chatbots, or any system that generates text, you need to ensure the outputs are:
- Coherent and contextually appropriate
- Free from hallucinations or nonsensical content
- Consistent with the intended personality or voice
- Safe for production use

This matcher helps catch issues like:
- Responses that contradict themselves
- Impossible claims presented as facts
- Random word salad that sounds AI-generated
- Responses that break character or voice

## Installation

```bash
npm install --save-dev @loqwai/to-make-sense
```

## Prerequisites

This package requires [Ollama](https://ollama.ai) to be installed and running locally:

1. Install Ollama: https://ollama.ai
2. Pull a model (we recommend `gemma2:2b` for speed):
   ```bash
   ollama pull gemma2:2b
   ```
3. Ensure Ollama is running (it starts automatically on most systems)

## Usage

### Basic Setup

```typescript
import { expect } from 'vitest'
import '@loqwai/to-make-sense'

// The matcher is now available globally
```

### Testing AI Responses

```typescript
import { describe, it, expect } from 'vitest'
import '@loqwai/to-make-sense'

describe('AI Assistant', () => {
  it('should generate coherent responses', async () => {
    const conversation = {
      messages: [
        { role: 'user', content: 'What is the capital of France?' },
        { role: 'assistant', content: 'The capital of France is Paris.' }
      ]
    }
    
    await expect(conversation).toMakeSense()
  })

  it('should reject nonsensical responses', async () => {
    const conversation = {
      messages: [
        { role: 'user', content: 'How do I reset my password?' },
        { role: 'assistant', content: 'Purple monkey dishwasher in the quantum realm!' }
      ]
    }
    
    await expect(conversation).not.toMakeSense()
  })
})
```

### Configuration Options

```typescript
await expect(conversation).toMakeSense({
  model: 'gemma2:2b',              // Ollama model to use
  temperature: 0.3,                 // LLM temperature (0-1)
  endpoint: 'http://localhost:11434/api/chat', // Ollama endpoint
  systemPrompt: 'Custom prompt...'  // Override the default validation prompt
})
```

### Example: Testing Character Consistency

```typescript
describe('Fantasy Game NPC', () => {
  it('should maintain character voice', async () => {
    const mysticalKeeper = {
      messages: [
        { role: 'user', content: 'Where can I find healing potions?' },
        { role: 'assistant', content: '*sighs with ancient weariness* Seven vials remain in the eastern chamber, though my incorporeal form can no longer grasp them. The third shelf, behind the cobwebs of centuries...' }
      ]
    }
    
    // This should pass - maintains mystical character
    await expect(mysticalKeeper).toMakeSense()
  })

  it('should reject out-of-character responses', async () => {
    const brokenNPC = {
      messages: [
        { role: 'user', content: 'Where can I find healing potions?' },
        { role: 'assistant', content: 'Yo dawg, check aisle 3 at the supermarket lol' }
      ]
    }
    
    // This should fail - breaks character
    await expect(brokenNPC).not.toMakeSense()
  })
})
```

## How It Works

The matcher sends the conversation to an LLM with a carefully crafted prompt that instructs it to evaluate whether the response "makes sense" given the context. The LLM considers:

1. **Logical Coherence**: Does the response follow logically from the question?
2. **Contextual Appropriateness**: Is the response suitable for the context?
3. **Consistency**: Are there internal contradictions?
4. **Realism**: Are claims plausible within the established context?

The matcher distinguishes between creative fiction (which can "make sense" within its context) and true nonsense or hallucinations.

## Performance Considerations

- LLM calls take time (typically 1-5 seconds with `gemma2:2b`)
- Tests run with a 20-second timeout by default
- Consider using smaller, faster models for testing
- Run tests in sequence to avoid overloading Ollama

## Development

```bash
# Clone the repository
git clone https://github.com/loqwai/to-make-sense.git
cd to-make-sense

# Install dependencies
npm install

# Run tests (requires Ollama)
npm test

# Type checking
npm run typecheck

# Build
npm run build

# Deploy to npm (runs tests first)
npm run deploy
```

## Philosophy

This project follows a "no mocking" philosophy. All tests use real LLM integrations to ensure we're validating actual behavior, not our assumptions about how LLMs work.

## License

MIT

## Contributing

Contributions are welcome! Please ensure:
1. All tests pass with real Ollama integration
2. No mocking of LLM calls
3. Follow the existing code style
4. Add tests for new features

## Credits

Created by [@loqwai](https://github.com/loqwai) for the Loqwai project.