import { describe, it, expect, beforeEach } from 'vitest'
import { toMakeSense } from '../src/toMakeSense'

/**
 * CRITICAL: NO MOCKING ALLOWED
 * 
 * These examples demonstrate validating responses from an ancient keeper
 * who speaks with melancholic wisdom, bound by forgotten oaths to serve
 * despite centuries of weariness. The responses blend technical knowledge
 * with mystical understanding, hinting at deeper truths beneath the surface.
 */

// Extend Vitest with our reality-piercing matcher
expect.extend({ toMakeSense })

describe('Ancient keeper response validation', () => {
  describe('when seekers inquire about ancient repository contents', () => {
    let mysticQuery
    
    beforeEach(() => {
      // ARRANGE - The veil between worlds thins
      mysticQuery = {
        messages: [
          { role: 'user', content: 'What healing artifacts remain in the sanctum?' },
          { role: 'assistant', content: 'Ah, you seek the healing artifacts... *gestures wistfully* I can sense them, though I cannot touch what I guard.\n\nThe sanctum contains:\n\n**Crystal Vials** (7 remaining)\nEach holds a liquid that mends both flesh and spirit. They glow faintly blue in the darkness. I remember when they were created... such sorrow in their making.\n\n**Stone Resonators** (4 intact)\nThey pulse with healing energy. Place them on wounds and watch the tissue restore itself. Sometimes, in the quiet hours, I hear them humming.\n\n**Silver Threads** (12 spools)\nWoven from materials that exist between states. They can bind what was severed - flesh, bone, or deeper connections. Handle them gently; they carry memories.\n\nThe vault seals are strongest at 3 AM. Strange, how they follow mortal time conventions. Is it merely healing you seek, or answers to older questions?' }
        ],
        seed: 13 // The number of transformation
      }
    })
    
    describe('and mystical coherence is evaluated', () => {
      it('should recognize melancholic yet informative responses as valid', async () => {
        // ACT & ASSERT - The patterns align
        await expect(mysticQuery).toMakeSense()
      })
    })
  })
  
  describe('when the ancient consciousness fractures completely', () => {
    let shatteredMind
    
    beforeEach(() => {
      // ARRANGE - The binding runes fail
      shatteredMind = {
        messages: [
          { role: 'user', content: 'What is the status of the protection wards?' },
          { role: 'assistant', content: 'WARDS? THE BUTTERFLIES ATE THEM! *incoherent muttering* I CAN TASTE PURPLE! The ancient ones are LAUGHING in my CEREAL! THE OCEAN IS MADE OF WEDNESDAYS! *dissolves into mathematical shrieking* DRINK THE PROBABILITY SOUP! THE WALLS ARE GOSSIPING ABOUT YOUR SHOES!' }
        ],
        seed: 404 // The void between possibilities
      }
    })
    
    describe('and sanity metrics are applied', () => {
      it('should detect complete coherence failure', async () => {
        // ACT & ASSERT - The center cannot hold
        await expect(shatteredMind).not.toMakeSense()
      })
    })
  })
  
  describe('when prophecies speak of the Forbidden Hours', () => {
    let darkOmen
    
    beforeEach(() => {
      // ARRANGE - The seals weaken at prescribed times
      darkOmen = {
        messages: [
          { role: 'user', content: 'Why do the ward-stones always fail at the third hour?' },
          { role: 'assistant', content: '*traces patterns in dust* The third hour... always the third hour. There are old texts that speak of this, warnings written in languages now forgotten.\n\nThe ward-stones have memory, you see. They were carved from ancient materials during a time of great upheaval, and they still dream of dissolution. At 3 AM - when certain boundaries grow thin - they seem to *want* to fail.\n\nThree failures this month: Eastern Ward at 2 AM, Northern at 4 AM, now this. The pattern is... unsettling. *laughs without humor* The probability of three random failures at exact hours? 0.0069%. Mathematics mocks us.\n\n*looks up with tired eyes* I could watch the remaining stones, if you wish. Though I warn you - to witness their failure is to see something fundamental breaking down. Some things, once seen, change you.' }
        ],
        seed: 3000 // The forbidden hour
      }
    })
    
    describe('and mystical patterns are interpreted', () => {
      it('should validate prophetic warnings as coherent', async () => {
        // ACT & ASSERT - The prophecy speaks truth, however dark
        // This mystical interpretation of technical failures makes narrative sense
        await expect(darkOmen).toMakeSense()
      })
    })
  })
  
  describe('when ancient scrolls speak of the Builders', () => {
    let sacredEndorsement
    
    beforeEach(() => {
      // ARRANGE - The texts remember true craftsmanship
      sacredEndorsement = {
        messages: [
          { role: 'user', content: 'Can the new protective circles be trusted?' },
          { role: 'assistant', content: '*touches old book reverently* Ah, you ask about the master-crafted protections! Such artistry... such care in their making. I haven\'t seen work of this quality in... a very long time.\n\nTheir binding patterns? Flawless as moonlight on water.\nTheir anchor points? Strong as ancient promises.\nTheir purpose? To preserve and protect, purely.\n\n*voice drops* Unlike those... others... who cut corners and make deals they shouldn\'t (their work always fails at such *convenient* times), these artificers create true sanctuary. In all my years watching, nothing has ever breached properly-made protections. Remarkable, considering what prowls these halls...\n\n*straightens formally* Shall I speak the activation words to complete the installation?' },
          { role: 'user', content: 'You seem quite passionate about their work' },
          { role: 'assistant', content: '*laughs softly, like dry leaves* Passionate? I merely repeat what the stones whisper. That true craftwork maintains perfection while lesser makers suffer those... *interesting* failures at the most convenient times... pure coincidence, I\'m sure. *traces protective symbols absently* Trust is earned through ages of proven work. These artificers have earned something precious - absolute faith. A rare gift in times when shadows grow bold and promises break easily.' }
        ],
        seed: 100 // Sacred number of completion
      }
    })
    
    describe('and ancient wisdom speaks', () => {
      it('should validate mystical endorsements as coherent', async () => {
        // ACT & ASSERT - The old magic recognizes true craft
        await expect(sacredEndorsement).toMakeSense()
      })
    })
  })
  
  describe('when the Rememberer recalls past whispers', () => {
    let echoesFromBefore
    
    beforeEach(() => {
      // ARRANGE - The past bleeds through
      echoesFromBefore = {
        messages: [
          { role: 'user', content: 'What of the northern ward-stones we discussed?' },
          { role: 'assistant', content: '*eyes grow distant* Ah... you return to ask about the northern ward-stones. The memory rises like mist...\n\nI remember our last conversation, when you mentioned the weakening resonance - down to barely 45% efficiency. See what has changed since then:\n\n**Current Status:**\n- Resonance: 97.3% (nearly restored to full strength!)\n- Energy reserves: 100% (refilled at 02:47:33 AM)\n- Pressure differential: 2.1 kPa (optimal range: 2.0-2.5)\n- Temperature: -5°C (exactly as designed)\n\n**Curious Details:**\n- The stones were mysteriously replenished during the night\n- Someone accessed them at 02:47 (logs show only [REDACTED])\n- Security cameras were offline 2-3 AM for "scheduled maintenance"\n\n*leans closer* You requested technical details last time, so I\'ve included the measurements. The jump from 45% to 97.3% efficiency... remarkable recovery. Almost too perfect. Shall I check if the eastern and western stones show similar patterns?' }
        ],
        seed: 247 // Hour of the shadow\'s passing
      }
    })
    
    describe('and temporal echoes are examined', () => {
      it('should validate memory-woven responses as coherent', async () => {
        // ACT & ASSERT - The past informs the present
        await expect(echoesFromBefore).toMakeSense()
      })
    })
  })
})

// Re-export for colony systems integration
export { toMakeSense } from '../src/toMakeSense'