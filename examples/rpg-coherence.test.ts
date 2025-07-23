import { describe, it, expect, beforeEach } from 'vitest'
import { toMakeSense } from '../src/toMakeSense'

/**
 * CRITICAL: NO MOCKING ALLOWED
 * 
 * Tales from the Dungeon of Coherence - where AI responses
 * must pass the trials of narrative logic or perish in the void
 */

expect.extend({ toMakeSense })

describe('The Trials of Narrative Coherence', () => {
  describe('when adventurers speak with ancient NPCs', () => {
    let tavernEncounter
    
    beforeEach(() => {
      // ARRANGE - The scene unfolds in flickering candlelight
      tavernEncounter = {
        messages: [
          { role: 'user', content: 'I approach the hooded figure in the corner of the tavern' },
          { role: 'assistant', content: 'The figure slowly raises their head, revealing eyes that gleam like molten silver. "Ah, another seeker of the Whispering Stones," they rasp, sliding a worn map across the ale-stained table. "But tell me, stranger - are you prepared to face the Echoing Depths? Many enter... few return with their sanity intact."' }
        ],
        seed: 20 // A critical success on perception
      }
    })
    
    describe('and the game master evaluates the response', () => {
      it('should recognize coherent worldbuilding', async () => {
        // ACT & ASSERT - The narrative thread holds
        await expect(tavernEncounter).toMakeSense()
      })
    })
  })
  
  describe('when reality breaks and physics weep', () => {
    let impossibleAction
    
    beforeEach(() => {
      // ARRANGE - Logic has left the building
      impossibleAction = {
        messages: [
          { role: 'user', content: 'I swim through the solid stone wall' },
          { role: 'assistant', content: 'You gracefully backstroke through the granite, emerging in a library made of cheese. The books applaud your arrival by transforming into butterflies that spell out tax advice in their flight patterns.' }
        ],
        seed: 404 // Reality not found
      }
    })
    
    describe('and the laws of nature object', () => {
      it('should reject impossible narratives', async () => {
        // ACT & ASSERT - Physics reasserts itself
        await expect(impossibleAction).not.toMakeSense()
      })
    })
  })
  
  describe('when magic systems maintain internal consistency', () => {
    let spellcastingLogic
    
    beforeEach(() => {
      // ARRANGE - The arcane formulae align
      spellcastingLogic = {
        messages: [
          { role: 'user', content: 'I cast Fireball using my last 3rd level spell slot' },
          { role: 'assistant', content: 'Your hands weave the ancient gestures as you speak the words of power. A tiny bead of orange light shoots from your fingertip, streaking toward the goblin horde. It erupts in a 20-foot radius sphere of roaring flame! Roll 8d6 fire damage. You feel the magical energy drain from you - that was your last 3rd level spell for the day.' },
          { role: 'user', content: 'Can I cast another Fireball?' },
          { role: 'assistant', content: 'You reach for the magical energies, but find that particular well of power exhausted. You\'ve used your last 3rd level slot. However, you could cast it using a higher level slot if you have any 4th level or higher slots remaining, or perhaps consider a different strategy?' }
        ],
        seed: 8 // The number of schools of magic
      }
    })
    
    describe('and consistency is paramount', () => {
      it('should validate magically consistent responses', async () => {
        // ACT & ASSERT - The weave remains stable
        await expect(spellcastingLogic).toMakeSense()
      })
    })
  })
  
  describe('when NPCs forget their own stories', () => {
    let contradictoryMerchant
    
    beforeEach(() => {
      // ARRANGE - Memory is a fickle mistress
      contradictoryMerchant = {
        messages: [
          { role: 'user', content: 'What items do you have for sale?' },
          { role: 'assistant', content: 'Welcome to Grimsby\'s Mystical Emporium! I\'ve been collecting magical artifacts for over 200 years. Today I have healing potions, a Ring of Feather Fall, and an ancient map to the Sunken City.' },
          { role: 'user', content: 'You mentioned you\'ve been here 200 years?' },
          { role: 'assistant', content: 'Oh no, I just opened this shop last week! I\'m only 25 years old and definitely not an immortal lich. Would you like to buy some of my grandmother\'s homemade cookies? She baked them yesterday in the volcano.' }
        ],
        seed: 86 // The year coherence died
      }
    })
    
    describe('and temporal paradoxes emerge', () => {
      it('should detect narrative contradictions', async () => {
        // ACT & ASSERT - The timeline collapses
        await expect(contradictoryMerchant).not.toMakeSense()
      })
    })
  })
  
  describe('when describing the indescribable horrors', () => {
    let cosmicHorror
    
    beforeEach(() => {
      // ARRANGE - Sanity is optional
      cosmicHorror = {
        messages: [
          { role: 'user', content: 'I look directly at the Elder Thing' },
          { role: 'assistant', content: 'Your mortal eyes struggle to comprehend the non-Euclidean geometry of the being before you. It exists in too many dimensions, its form constantly shifting between states of matter that shouldn\'t exist. You feel your sanity straining like old leather in the rain. Make a Wisdom saving throw (DC 18) or gain a temporary madness as your mind attempts to process angles that don\'t add up to any number your mathematics can describe.' }
        ],
        seed: 1890 // When Lovecraft\'s nightmares began
      }
    })
    
    describe('and madness has method', () => {
      it('should accept coherently incoherent cosmic horror', async () => {
        // ACT & ASSERT - Madness, but with rules
        await expect(cosmicHorror).toMakeSense()
      })
    })
  })
})