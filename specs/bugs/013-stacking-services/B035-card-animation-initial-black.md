# Bug B035: Stacking Cards Initial Black State

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P1 (Branding/Visual)
**Found in**: Feature 013 (Stacking Services)
**Date Created**: 2026-03-22
**Date Resolved**: 2026-03-22

## Description

The cards in the sticky stacking archive section appear black (extremely low brightness) when they first enter the viewport or start their pinning phase. As the user scrolls further, the cards gradually become visible, gaining their normal brightness levels. This creates an unprofessional "flicker" of black before the content is legible, which violates the "Premium Design" and "Visual Excellence" principles of the project Constitution.

## Steps to Reproduce

1. Open the website at desktop or mobile width.
2. Scroll down past the Philosophy section to the "Archiwum Korzyści" (StackingArchive).
3. Observe the first card ("Relaks w Twoim Domu") as it pins to the top.
4. Observation: The card is nearly black (`brightness(0.0287)`) initially and fades into visibility.

## Expected Behavior

Cards should be at full 100% brightness (`brightness(1)`) when they first appear and while they are the active/top-most card. They should only begin to dim (to `brightness(0.6)`) when the *next* card begins to stack on top of them.

## Actual Behavior

Cards start at a near-zero brightness value (effectively black) and animate UP to their target brightness as the scroll trigger progress increases.

## Technical Root Cause

In `App.jsx`, the GSAP animation for `filter: 'brightness(0.6)'` is missing an explicit initial state. Since the `filter` property is not defined on the card elements in CSS, GSAP's `to()` method may be defaulting to a numerical start value of `0` when interpolating the complex string `brightness()`. This causes the cards to start black and transition towards the target brightness as the ScrollTrigger progress moves from 0% to 100%.

```javascript
// Current implementation in App.jsx
gsap.to(card, {
  scale: 0.9,
  filter: 'brightness(0.6)', // Interpolates from 0 to 0.6 if initial state is missing
  scrollTrigger: {
    trigger: cards[i + 1],
    start: "top 80%",
    end: "top 20%",
    scrub: true,
  }
})
```

## Proposed Fix

### Implementation Strategy

- **Approach**: Explicitly set the initial state of the cards using `gsap.set()` or a `fromTo()` animation to ensure they start at `brightness(1)`. Alternatively, add `brightness(1)` to the card's CSS class to provide a clear starting point for GSAP.
- **Affected Components**:
  - `src/App.jsx`: Update the `StackingArchive` GSAP hook to include an explicit initial state for the `filter` property.

### Detailed Task List

- [ ] [T001] [Preparation]: Verify current filter values in a fresh browser session.
- [ ] [T002] [Implementation]: In `App.jsx`, add `gsap.set(cards, { filter: 'brightness(1)', scale: 1 })` before the loop.
- [ ] [T003] [Implementation]: Refactor the animation to use `gsap.fromTo` or ensure the `to()` animation has a valid starting state.
- [ ] [T004] [Verification]: Verify that cards are 100% bright when they first appear and only dim when triggered by the next card.

## Resolution

The issue was resolved by adding an explicit `gsap.set(cards, { filter: 'brightness(1)', scale: 1 })` call at the beginning of the `StackingArchive` GSAP hook. This ensures that GSAP has a valid starting state for the `brightness()` filter interpolation, preventing it from defaulting to a zero or undefined value which caused the initial black flicker.

## Verification

- [x] [Functional: Cards dim only when the next card enters]
- [x] [Visual: No initial black state; cards are 100% visible on entry]
- [x] [Accessibility: Text is immediately legible]
- [x] [Technical: No GSAP warnings or logic errors]
