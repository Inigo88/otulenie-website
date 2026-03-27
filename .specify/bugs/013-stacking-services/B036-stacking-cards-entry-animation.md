# Bug B036: Stacking Cards Lack Entry Animation

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual/UX)
**Found in**: Feature 013 (Stacking Services)
**Date Created**: 2026-03-22
**Date Resolved**: 2026-03-22

## Description

In the `StackingArchive` section, cards only have a "leaving focus" animation (scaling down and dimming when the next card covers them). There is no "entry" animation for when a card first appears or reaches its sticky position. This makes the transition into the sticky state feel "snappy" and static, particularly for the third (last) card which never leaves focus and thus has no animation at all.

## Steps to Reproduce

1. Scroll to the `StackingArchive` section.
2. Observe cards 1, 2, and 3 as they enter the viewport and hit their sticky threshold.
3. **Observation**: Cards move from the bottom to their sticky position without any change in scale, opacity, or brightness. They only animate *after* the next card starts covering them.

## Expected Behavior

Each card should have a subtle entry animation (e.g., scaling up from 0.9 to 1.0 and/or increasing brightness/opacity) as it approaches its sticky position. This ensures all cards, including the last one, feel interactive and premium.

## Actual Behavior

Cards are static (Scale 1.0, Brightness 1.0) on entry. The last card never animates because it never "leaves focus."

## Technical Root Cause

In `App.jsx`, the GSAP loop only defines animations triggered by `cards[i + 1]`. There is no ScrollTrigger defined for the card's own entry.

```javascript
// Current logic only handles "leaving focus"
cards.forEach((card, i) => {
  if (i === cards.length - 1) return 
  gsap.to(card, {
    scale: 0.9,
    filter: 'brightness(0.6)',
    scrollTrigger: {
      trigger: cards[i + 1], 
      // ...
    }
  })
})
```

## Proposed Fix

### Implementation Strategy

- **Approach**: Add a second GSAP animation for EACH card that triggers on its own entry.
- **Animation Details**:
  - `from`: `{ scale: 0.9, filter: 'brightness(0.8)', opacity: 0 }` (or similar subtle values)
  - `to`: `{ scale: 1, filter: 'brightness(1)', opacity: 1 }`
  - `trigger`: The card itself.
  - `start`: `"top 95%"`
  - `end`: `"top 15%"` (near its sticky position)
  - `scrub`: `true`

### Detailed Task List

- [ ] [T001] [Implementation]: Add entry animation loop in `StackingArchive`'s `useGSAP` hook.
- [ ] [T002] [Refinement]: Adjust start/end markers to ensure smooth transition into the sticky state.
- [ ] [T003] [Verification]: Visual check in browser to ensure all cards (including the last one) animate on scroll.

## Verification

- [x] [Visual: All cards have entry animations]
- [x] [Visual: Third card is no longer static]
- [x] [Functional: Entry and exit animations don't conflict]

**Note**: This bug was resolved as a side-effect of the unified lifecycle timeline refactor implemented for B037. Validation confirms all cards now have high-premium entrance transitions.
