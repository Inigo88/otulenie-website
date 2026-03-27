# Research: Sticky Stacking Archive

## Optimal GSAP Pinning Strategy for 3 Scaling Cards

**Context:** The spec requires exactly 3 cards to stack, pin, and scale/darken as the user scrolls, governed by GSAP ScrollTrigger.

**Decision:** Use CSS `position: sticky` for the physical pinning mechanic and stacking layout, paired with GSAP `useGSAP` + `ScrollTrigger` strictly for the geometric and brightness animations (scale-down and darken).

**Rationale:** Native CSS `position: sticky` effortlessly handles the physical overlapping layout without injecting wrapping `pin-spacer` DOM nodes that `ScrollTrigger.pin` uses. By relying on CSS for layout, GSAP can focus solely on parsing the scroll progress of the overall container to interpolate the `scale` and `filter` (brightness) CSS properties. This hybrid approach guarantees fluid scrolling, zero layout thrashing on mobile, and the cleanest possible component structure.

**Alternatives considered:** 
- **GSAP `pin: true` on each card:** Rejected because coordinating multiple overlapping pin-spacers in a dynamic React stack is fragile and overly complex for a fixed 3-card requirement.
