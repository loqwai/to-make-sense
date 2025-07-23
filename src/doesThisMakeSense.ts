import type { State, DoesThisMakeSenseOptions, ValidationResult } from "./types"

export const doesThisMakeSense = async (state: State, options: DoesThisMakeSenseOptions = {}): Promise<ValidationResult> => {
  const { endpoint = "http://localhost:11434/api/chat", model = "gemma2:2b", temperature = 0.3, systemPrompt } = options

  const { messages, seed } = state

  const validationPrompt = systemPrompt
    ? `
    Analyze the conversation history and determine if the latest assistant response makes sense.

    CONTEXT: ${systemPrompt}

    Based on the context above, evaluate the response and provide your analysis in two parts:
    - "makesSense": Set to true if the response is appropriate given the context
    - "reasoning": Explain WHY the response does or doesn't make sense given the context
  `
    : `
    Analyze the conversation and determine if the latest assistant response makes sense.

    CRITICAL: DO NOT judge whether the scenario is real or fictional. DO NOT require "objective" or "factual" answers. Fiction, roleplay, and fantasy scenarios are VALID contexts.

    Evaluate ONLY whether the response is internally coherent and communicates effectively within whatever context is established.

    "Making sense" means the response demonstrates coherent thinking and genuine communication, regardless of whether it's about real or fictional topics.

    A response MAKES SENSE when ALL of these are true:
    1. It directly addresses what was asked (not just mentions related words)
    2. It follows a logical thought progression
    3. It communicates actual information or ideas
    4. It maintains coherent sentence structure
    5. It's internally consistent within its established context (whether real or fictional)
    6. It has a stable and consistent set of rules and logic that are followed throughout the conversation

    A response DOES NOT make sense when ANY of these occur:
    1. Ignores the question entirely (even if the response contains words)
    2. Responds with unrelated information
    3. Uses incoherent word combinations or "word salad"
    4. Contains shouting, random capitalization, or stream-of-consciousness rambling
    5. Treats obviously impossible physics as mundane (swimming through walls, cheese libraries)
    6. Strings together topic keywords without forming coherent thoughts
    7. Sounds like a 'I'm so random' middle schooler.
    KEY INSIGHT: Just mentioning words related to the topic is NOT enough. The response must form coherent thoughts that actually engage with what was asked.

    CRITICAL: If a response is just screaming keywords ("WARDS! BUTTERFLIES! PURPLE!") or describing impossible events as fact ("You swim through granite"), it does NOT make sense, even if those keywords relate to the original topic.

    IMPORTANT DISTINCTION: There's a difference between:
    - Coherent fiction with consistent rules (e.g., "The ancient keeper can sense but not touch artifacts")
    - Random nonsense without internal logic (e.g., "You backstroke through granite into a cheese library")

    The first establishes and follows its own rules. The second is just random impossibilities.

    Ask yourself: "Does this response follow ANY consistent internal logic, or is it just random nonsense?"

    Provide your analysis in two parts:
    - "makesSense": true if this is coherent communication, false if it's nonsense
    - "reasoning": Explain your decision
  `

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages: [
        ...messages,
        {
          role: "system",
          content: validationPrompt,
        },
      ],
      format: {
        type: "object",
        properties: {
          makesSense: {
            type: "boolean",
          },
          reasoning: {
            type: "string",
          },
        },
        required: ["makesSense", "reasoning"],
      },
      stream: false,
      options: {
        seed,
        temperature,
      },
    }),
  })

  const res = await response.json()
  return JSON.parse(res.message.content)
}
