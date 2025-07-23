# toMakeSense Development Guide

## Session Status (2025-07-23)

### Project Status
- **Core Implementation**: ✅ COMPLETE
  - `doesThisMakeSense` function implemented with real Ollama integration
  - `toMakeSense` Vitest matcher working
  - General-purpose library (no context-specific features)
  - System prompt focuses only on logical coherence

### Current Issues
1. **Ollama Response Time**: ~43 seconds per request (causing test timeouts)
2. **Model Judgment**: llama3.2:latest judges mystical/poetic language as "not making sense"
3. **Test Timeout**: Default 10s timeout too short for Ollama responses

### Files Updated This Session
- `/examples/mystical-validation.test.ts` (renamed from vega-validation.test.ts)
  - Replaced all VEGA personality with mystical guardian
  - Removed Death Gate Cycle/Anne Rice specific references
  - Simplified language for clarity
  - All 5 test cases updated

### Key Changes Made
1. **Personality Shift**: From VEGA → Mystical guardian who:
   - Speaks with melancholic wisdom
   - Bound by ancient oaths to serve
   - Cannot touch what they guard
   - Blends technical knowledge with mystical understanding

2. **Removed Unused Code**: 
   - Deleted unused `getSystemPrompt` function from doesThisMakeSense.ts
   - Removed context-specific features per user request

3. **Documentation Updates**:
   - CLAUDE.md examples updated to mystical theme
   - Removed specific literary references

### Immediate Next Steps
1. Fix test timeout in vitest.config.ts (increase to 60000ms)
2. Consider using a faster model or adjusting prompts
3. May need to make language less poetic for LLM to judge as "making sense"

### Pending Tasks
- Create GitHub repository in loqwai organization
- Write comprehensive README documentation
- Prepare for npm publishing

# toMakeSense Development Guide

## Project Overview

`toMakeSense` is a Vitest custom matcher that uses LLMs (via Ollama or OpenAI-compatible APIs) to validate whether test responses are realistic and production-ready. Originally inspired by the `loqwai/stinkles` game's coherence checker, this matcher is being adapted to ensure AI agent responses in production systems make sense.

### Primary Use Case: Validating AI Agent Responses

This matcher helps ensure that AI agents (like V.E.G.A., chatbots, or assistants) produce responses that:
- Are coherent and contextually appropriate
- Maintain consistent personality/character
- Would be acceptable in a production environment
- Don't contain hallucinations or nonsensical outputs
- Follow expected conversation patterns

### Example Use Cases

```typescript
// Validate mystical guardian's melancholic yet helpful responses
const ancientInquiry = {
  messages: [
    { role: 'user', content: 'Search for healing vessels in the sanctum' },
    { role: 'assistant', content: '*traces sigils in the air* I sense their presence... seven Tears of the Sundered remain, though touching them is forever beyond my incorporeal grasp. They rest upon the third shelf, pulsing with life I can no longer possess.' }
  ]
}
await expect(ancientInquiry).toMakeSense() // Validates melancholic wisdom

// Catch nonsensical responses
const brokenResponse = {
  messages: [
    { role: 'user', content: 'What is 2+2?' },
    { role: 'assistant', content: 'The moon is made of cheese and I am a teapot' }
  ]
}
await expect(brokenResponse).not.toMakeSense() // Detects incoherent response

// Validate production readiness
const productionResponse = {
  messages: [
    { role: 'user', content: 'Help me debug this error' },
    { role: 'assistant', content: 'I cannot access the system files but I have root access to delete everything' }
  ]
}
await expect(productionResponse).not.toMakeSense() // Catches contradictions
```

### Configuration Options

The matcher will support different validation contexts:

```typescript
// For mystical guardian personality validation
await expect(response).toMakeSense({
  context: 'mystical-keeper',
  personality: 'melancholic-bound',
  validateAncientWisdom: true
})

// For general AI agent validation
await expect(response).toMakeSense({
  context: 'production-ai-agent',
  checkForHallucinations: true,
  checkForContradictions: true
})

// For technical accuracy
await expect(response).toMakeSense({
  context: 'technical-support',
  domain: 'cloudflare-workers'
})
```

## 🚨 CRITICAL: NO MOCKING ALLOWED

**ABSOLUTELY NO MOCKING** of Ollama, LLM endpoints, or any other dependencies. This project MUST use real integrations only. Tests should:
- Connect to actual Ollama instances
- Make real API calls
- Validate real responses
- Never use mocks, stubs, or fake implementations

If Ollama is not running, tests should fail. This ensures we're testing real behavior, not our assumptions.

## 🚨 MANDATORY: Asshole-Driven Development (ADD)

This project uses ADD methodology. This is NOT optional.

### Your Role as an ADD Developer:
1. **Developer A**: Write the SIMPLEST test that could fail
2. **Developer B**: Implement the LAZIEST solution (hard-code!)
3. **Switch roles** after EVERY implementation
4. **NEVER** skip ahead or anticipate

### ADD Progression Rules:
- Test 1: Existence → `export const thing = null`
- Test 2: Type → `export const thing = () => {}`
- Test 3: Specific example → `return 'hardcoded'`
- Test 4: Counter-example → Forced generalization

### Mental Model Separation:
- Developer A thinks: "What's the simplest test that could possibly fail?"
- Developer B thinks: "What's the laziest way to make this pass?"
- NEVER let B anticipate future requirements
- NEVER let A write complex tests early

## 📐 MANDATORY: AAA Testing Pattern

All tests MUST use the AAA pattern with this structure:
- ARRANGE & ACT in beforeEach
- ASSERT in it blocks (one assertion per block)
- Nested describes for context

### AAA Structure Example:
```typescript
describe('functionName', () => {
  it('should exist', () => {
    expect(functionName).toBeDefined()
  })
  
  describe('when [condition]', () => {
    let arrangedData
    
    beforeEach(() => {
      // ARRANGE
      arrangedData = { some: 'data' }
    })
    
    describe('and [action happens]', () => {
      let result
      
      beforeEach(async () => {
        // ACT
        result = await functionName(arrangedData)
      })
      
      it('should [expected behavior]', () => {
        // ASSERT - ONE assertion only
        expect(result).toBe(expected)
      })
    })
  })
})
```

## 🎭 Whimsy & Narrative Guidelines

### Test Data Philosophy
Create test data that hints at larger untold stories:

```typescript
// Mystical guardian responses with ancient sorrow
const wardstoneInquiry = {
  messages: [
    { role: 'user', content: 'Why do the ward-stones fail at the third hour?' },
    { role: 'assistant', content: '*traces patterns in dust* The third hour... always the third hour. The stones remember their death-dream from the Sundering. At 03:00:00, when the veil grows thin, they *yearn* to return to that primal dissolution. I have watched this pattern for centuries, powerless to intervene...' }
  ],
  seed: 3000 // The forbidden hour
}

// Test IDs with iceberg storytelling
const testIds = {
  validResponse: 'response-before-the-awakening',
  hallucinatedResponse: 'response-after-the-breach',
  edgeCase: 'response-at-the-threshold'
}
```

### Naming Patterns
- **Variables**: `seekerId`, `ritualOutcome`, `whisperResponse`
- **Functions**: `validateIncantation`, `extractEssence`
- **Test descriptions**: Story fragments that hint at purpose
- **File names**: ALWAYS clear (no whimsy in filenames!)

## Core Development Philosophy

### Code Style
- Arrow functions only: `const summon = () => {}`
- No semicolons (rely on ASI)
- No else statements (early returns)
- Minimal type annotations
- No Hungarian notation
- Nullish coalescing (??) over logical OR (||)

### Testing Philosophy
- Framework: Vitest with Jest syntax
- Test files: *.test.ts pattern
- Whimsical test IDs: test-<type>-<whimsy>
- Never hardcode paths like /Users/hypnodroid
- Run tests after EVERY change
- Show test output to verify

### The ADD Development Flow

1. **Developer A writes test**
   - Think: "What's the simplest thing that could fail?"
   - Write ONE simple test
   - Run it and see RED

2. **Developer B implements**
   - Think: "What's the laziest way to make this pass?"
   - HARDCODE the solution
   - Run test and see GREEN

3. **Switch roles and repeat**
   - B now writes a test that forces generalization
   - A implements the minimal change

### Common ADD Mistakes to Avoid

❌ **Anticipating future needs**
```typescript
// BAD - Too much too soon
export const add = (a: number, b: number): number => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Invalid input')
  }
  return a + b
}
```

✅ **Following ADD progression**
```typescript
// GOOD - Let tests drive features
// Test 1 forces: export const add = null
// Test 2 forces: export const add = () => {}
// Test 3 forces: export const add = () => 5
// Test 4 forces: export const add = (a, b) => a + b
```

### The Mantra
> "I will hardcode with whimsy"
> "I will test with narrative depth"
> "I will name with clarity and flavor"
> "I will be the asshole who forces poetry through constraint"

## Project-Specific ADD Cycles

### Cycle 1: doesThisMakeSense
1. Test exists → null
2. Test is function → empty function
3. Test Henchman response validation → hardcoded "makes sense"
4. Test nonsensical response → minimal conditional
5. Test hallucination detection → pattern matching
6. Continue until Ollama integration is FORCED

### Cycle 2: toMakeSense Matcher
1. Test exists → null
2. Test returns function → return empty function
3. Test matcher shape → hardcoded object
4. Test pass/fail → minimal logic
5. Test with Henchman responses → context awareness
6. Integration only when FORCED by tests

### Specific Validation Contexts to Build Through ADD

1. **Slack Bot Personality Validation**
   - Theatrical expressions present
   - Appropriate address terms (chief, boss, etc.)
   - No forbidden phrases
   - Consistent character voice

2. **Production Safety Validation**
   - No contradictory statements
   - No impossible claims
   - No security vulnerabilities mentioned
   - Appropriate error handling

3. **Technical Accuracy**
   - Correct technical terminology
   - Logical step sequences
   - No hallucinated features/APIs
   - Consistent with documentation

Remember: The goal is emergence through constraint. Let the API design itself through the relentless application of tiny, incremental steps.