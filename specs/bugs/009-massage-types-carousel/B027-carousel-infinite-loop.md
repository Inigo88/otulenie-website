# Bug B027: Infinite Carousel Looping

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement / UX)
**Found in**: Feature 009 (Massage Types Carousel)
**Date Created**: 2026-03-16
**Date Resolved**: 2026-03-16

## Description
The "Massage Types Carousel" currently reaches a hard stop after the last massage card. The user expects an infinite looping experience where navigating past the last card (Massage 5) seamlessly transitions back to the first card (Massage 1). This is required for both the auto-rotation feature and manual user interaction (dragging/scrolling).

## Steps to Reproduce
1. Open the site and scroll to 'Nasza Oferta'.
2. Attempt to scroll UP past the header to reach the Hero section.
3. Observation: The page jumps to the bottom of the carousel (last card) because of the `progress <= 0` wrap logic.
4. Attempt to scroll DOWN past the carousel to reach the footer.
5. Observation: The page jumps back to the start of the carousel because of the `progress >= 1` wrap logic.

## Expected Behavior
- **Vertical Scroll**: Users should be able to scroll out of the section normally (up to Hero, down to Footer).
- **Auto-Rotation & Drag**: Should remain infinite/seamless. After the last card, it should continue forward to the first card.

## Actual Behavior
The user is "trapped" in the 'Nasza Oferta' section. Vertical scrolling is hijacked by the infinite wrap-around logic.

## Technical Root Cause
The `onUpdate` callback in the `ScrollTrigger` is aggressively jumping the scroll position (`self.scroll()`) at the boundaries (0 and 1). This effectively creates an infinite loop for the page's vertical scroll, preventing exit from the pinned section.

## Proposed Fix
### Implementation Strategy
- **Approach**: We will implement a seamless wrap-around by:
  1. Cloning the first 3 cards and appending them to the end of the horizontal container.
  2. Adjusting the `getScrollDistance` to include the clone widths.
  3. Implementing a "seamless jump" listener. When the scroll reaches the end of the original set, we jump the window scroll back to the start of the set. Since the visual content (the clones) is identical, the jump is invisible to the user.
- **Affected Components**:
    - `MassageCarousel.jsx`: Refactor card rendering and ScrollTrigger bounds.

## Resolution
I have successfully resolved the infinite looping issues and finalized the interaction model by removing jarring vertical scroll pinning.
1.  **Restored Natural Scrolling**: Completely removed the GSAP `pin: true` and scroll-linked horizontal animation. Users can now scroll vertically past the "Nasza Oferta" section naturally, without the page sticking or hijacking the scroll.
2.  **Interactive Horizontal Carousel**: The carousel now moves horizontally only through intentional interactions: **dragging/swiping**, clicking **navigation dots**, or the **3-second auto-rotation**.
3.  **Seamless Infinite Wrap**: Re-implemented the wrap-around logic directly on the horizontal `x` transform. Using cloned cards and GSAP's `mod` logic, the carousel remains infinite during drag and auto-rotation without affecting the page's vertical scroll position.

## Verification
- [x] [Functional: Normal vertical page scrolling (no pinning/hijacking)]
- [x] [Functional: Infinite horizontal movement via drag and auto-rotate]
- [x] [Visual: Seamless transitions between last and first card]
- [x] [Technical: Decoupled horizontal transform from vertical scroll progress]
