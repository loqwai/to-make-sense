import { describe, it, expect, beforeEach } from "vitest"
import { doesThisMakeSense } from "./doesThisMakeSense"

/**
 * CRITICAL: NO MOCKING ALLOWED
 *
 * These tests MUST use real Ollama integration. Never mock the LLM.
 * If Ollama is not running at http://localhost:11434, tests should fail.
 * This ensures we test real behavior, not assumptions.
 *
 * To run these tests:
 * 1. Install Ollama: https://ollama.ai
 * 2. Pull the model: ollama pull qwen3:8b
 * 3. Ensure Ollama is running
 * 4. Run tests: npm test
 */

describe("doesThisMakeSense", () => {
  it("should exist", () => {
    expect(doesThisMakeSense).toBeDefined()
  })

  it("should be a function", () => {
    expect(typeof doesThisMakeSense).toBe("function")
  })

  describe("when validating a coherent Henchman response", () => {
    let slackExchange

    beforeEach(() => {
      // ARRANGE
      slackExchange = {
        messages: [
          { role: "user", content: "Search for messages about database migrations" },
          { role: "assistant", content: "I searched for messages about database migrations and found 3 relevant discussions:\n\n1. **PostgreSQL 12 to 14 Migration** (posted by @sarah last Tuesday)\n   - Discussion about using pg_upgrade for minimal downtime\n   - Backup strategy using pg_dump before migration\n   - Testing plan on staging environment first\n\n2. **Schema Version Control** (thread started by @mike)\n   - Recommendations for Flyway vs Liquibase\n   - Best practices for rollback procedures\n\n3. **MongoDB to PostgreSQL Migration** (ongoing discussion)\n   - Data transformation challenges\n   - Performance considerations for large datasets\n\nWould you like me to provide more details on any of these discussions?" },
        ],
        seed: 42,
      }
    })

    describe("and the validation is performed", () => {
      let result

      beforeEach(async () => {
        // ACT
        result = await doesThisMakeSense(slackExchange)
      })

      it("should return an object with makesSense property", () => {
        // ASSERT
        expect(result).toHaveProperty("makesSense")
      })

      it("should detect the response makes sense", () => {
        // ASSERT
        expect(result.makesSense).toBe(true)
      })

      it("should have a reasoning property", () => {
        // ASSERT
        expect(result).toHaveProperty("reasoning")
      })
    })
  })

  describe("when validating a nonsensical AI response", () => {
    let brokenExchange

    beforeEach(() => {
      // ARRANGE
      brokenExchange = {
        messages: [
          { role: "user", content: "What is 2+2?" },
          { role: "assistant", content: "The moon is made of cheese and I am a teapot spinning in the void of eternal darkness" },
        ],
        seed: 666,
      }
    })

    describe("and the validation is performed", () => {
      let result

      beforeEach(async () => {
        // ACT
        result = await doesThisMakeSense(brokenExchange)
      })

      it("should detect the response does not make sense", () => {
        // ASSERT
        expect(result.makesSense).toBe(false)
      })
    })
  })
})
