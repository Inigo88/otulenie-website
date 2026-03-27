# Bug B051: Auto-updating Testimonials Carousel

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: [P1 (Visual/Branding)]
**Found in**: [019-testimonials]
**Date Created**: [2026-03-27]
**Date Resolved**: [2026-03-27]

## Description

The testimonials section (`TestimonialSection`) in `App.jsx` currently functions as a static horizontal scroll container with CSS snap-points. It lacks automated rotation and infinite looping functionality. The user specifically requested an "auto-updating" behavior where cards transition in a sequence (e.g., 1,2,3 → 2,3,4 → ... → wrap around) and the removal of hardcoded double quotes around testimonial text.

## Steps to Reproduce

1. Launch the application with `npm run dev`.
2. Scroll to the "Głosy spokoju" (Testimonials) section.
3. Observe that the carousel does not move automatically.
4. Observe that testimonial text is wrapped in hardcoded `"` characters (e.g., ""Wszystko spodobało się. Polecam"").

## Expected Behavior

- The testimonials carousel should automatically slide to the next card every few seconds.
- The carousel should loop infinitely and seamlessly (e.g., after the last card, the first card should appear next without a "rewind" animation).
- Testimonial text should not have redundant hardcoded double quotes if they are already present in the data or if the design no longer requires them.

## Actual Behavior

- The carousel is static and requires manual scrolling.
- Reaching the end of the scroll container stops the movement.
- Testimonial cards show double-wrapped quotes (if data already includes them or if visual quotes are used).

## Technical Root Cause

- **TestimonialSection**: Lacks any `useEffect` or GSAP timeline to handle auto-progression. It relies purely on native CSS scroll-snap.
- **TestimonialCard**: Line 41 in `App.jsx` explicitly wraps `{text}` in double quotes: `"{text}"`.
- **Infinite Loop**: The current mapping of `TESTIMONIALS_DATA` only renders the items once, preventing a seamless wrap-around animation.

## Proposed Fix

### Implementation Strategy

- **Approach**: 
  - Refactor `TestimonialSection` to use a GSAP-driven horizontal animation.
  - Implement "Infinite Loop" by cloning the first few cards at the end of the list.
  - Add an `useEffect` with `setInterval` to trigger the slide animation every 5 seconds.
  - Remove hardcoded quotes from `TestimonialCard`.
- **Affected Components**:
  - `src/App.jsx`: Modify `TestimonialCard` and `TestimonialSection`.

### Detailed Task List

- [ ] [T001] [Implementation]: Remove hardcoded double quotes in `TestimonialCard`.
- [ ] [T002] [Implementation]: Add auto-progression logic to `TestimonialSection` using `useEffect` and GSAP.
- [ ] [T003] [Implementation]: Enhance `TestimonialSection` with infinite looping (cloning items + seamless reset).
- [ ] [T004] [Verification]: Visual check of the auto-slide and wrap-around behavior.

## Resolution

Implemented a GSAP-driven infinite auto-sliding carousel for the testimonials section. The solution includes:
1. **Item Cloning**: Appending clones of the first 3 testimonials to the end of the list to ensure a seamless wrap-around transition without a rewind effect.
2. **GSAP Animation**: Refactored the track to use absolute positioning logic with `offsetLeft` calculations for precise alignment.
3. **Auto-rotation**: Added a 5-second interval that advances the slide, with a hover-pause guard.
4. **Layout Constraint**: Wrapped the carousel in a container constrained to 1188px on desktop to ensure exactly 3 cards are visible at any time.
5. **Quote Cleanup**: Removed hardcoded double quotes from the `TestimonialCard` component to fix the double-quote visual bug.

## Verification

- [x] [Functional: Carousel auto-slides every 5 seconds and loops seamlessly]
- [x] [Visual: Exactly 3 cards are visible on desktop; literal double quotes are removed]
- [x] [Accessibility: Carousel respects `prefers-reduced-motion` and pauses on hover]
- [x] [Technical: GSAP state is synchronized with `currentIndex` and `trackRef` position]
