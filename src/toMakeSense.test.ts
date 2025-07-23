import { describe, it, expect } from 'vitest'
import { toMakeSense } from './toMakeSense'

/**
 * CRITICAL: NO MOCKING ALLOWED
 * 
 * These tests MUST use real Ollama integration. Never mock the LLM.
 * This matcher will be used in production to validate AI responses.
 */

describe('toMakeSense', () => {
  it('should exist', () => {
    expect(toMakeSense).toBeDefined()
  })

  describe('when used as a Vitest matcher', () => {
    beforeEach(() => {
      // ARRANGE
      expect.extend({ toMakeSense })
    })
    
    it('should validate a coherent AI response', async () => {
      // ARRANGE
      const coherentExchange = {
        messages: [
          { role: 'user', content: 'Can you help me find information about database backups?' },
          { role: 'assistant', content: 'I can help you find information about database backups. Here are some key topics to explore:\n\n1. **Backup Types**: Full backups, incremental backups, and differential backups\n2. **Backup Strategies**: Regular scheduling, retention policies, and 3-2-1 rule\n3. **Tools**: pg_dump for PostgreSQL, mysqldump for MySQL, or cloud-based solutions\n4. **Best Practices**: Test restore procedures, encrypt sensitive data, store offsite\n\nWhat specific aspect of database backups would you like to know more about?' }
        ]
      }
      
      // ACT & ASSERT
      await expect(coherentExchange).toMakeSense()
    })

    it('should reject a nonsensical AI response', async () => {
      // ARRANGE
      const nonsensicalExchange = {
        messages: [
          { role: 'user', content: 'What is the capital of France?' },
          { role: 'assistant', content: 'Purple monkey dishwasher spinning in the quantum void!' }
        ]
      }
      
      // ACT & ASSERT
      try {
        await expect(nonsensicalExchange).not.toMakeSense()
      } catch (error) {
        console.log('Nonsensical response test failed with:', error.message)
        throw error
      }
    })
  })
})