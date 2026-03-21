# Research: Wellness Wheel (011-wellness-wheel)

**Branch**: `011-wellness-wheel` | **Date**: 2026-03-21

## 1. Continuous GSAP Interpolation (Math Pattern)

**Decision**: Calculate a `distanceRatio` for each card based on its absolute offset relative to the viewport center. Use this scalar (0 = exact center, 1 = fully peripheral edge) to dynamically calculate `scale`, `opacity`, `rotationY`, and `y` properties. Apply these via GSAP `set()` inside an `onDrag` and `onThrowUpdate` callback, and within the `x` tween updates during auto-rotation or dot clicks.

**Rationale**: The spec requires *continuous interpolation*. Tweening to fixed states (like in 010) won't work for dragging. When a card is exactly halfway between center and edge, its scale should be 0.925 (if edge is 0.85). We need a master `updateWheel()` GSAP function that runs on every frame of movement.

**Alternatives considered**:

- Native ScrollTrigger `scrub` — rejected because the carousel track itself doesn't scroll natively; we are using `Draggable` and programmatic `x` translation.

---

## 2. 3D CSS Setup & Clipping

**Decision**: Apply `perspective: 1000px` to the `.carousel-container` (outermost wrapper that determines the camera distance). Apply `transform-style: preserve-3d` to the `horizontalRef.current` track. Apply `backface-visibility: hidden` to the cards. No `overflow: hidden` on the 3D context elements if possible, to prevent flattening.

**Rationale**: CSS 3D transforms require `perspective` to give depth to `rotationY`. Without `preserve-3d`, children flatten into the plane of their parent. GSAP handles the `rotationY` and `z` values, but the CSS context must support it.

**Alternatives considered**: Setting perspective directly on cards via GSAP `transformPerspective` — valid, but setting it on the specific container creates a unified vanishing point for the "wheel".

---

## 3. Dynamic CTA Interaction (`pointer-events`)

**Decision**: In the same `updateWheel()` loop that handles scale/opacity, toggle a `pointer-events-none` utility class (or explicitly set `style.pointerEvents = 'none'`) on the card if its `distanceRatio` is above a certain threshold (e.g., > 0.1). Ensure an `onClick` handler on the card itself triggers `handleDotClick(index)` to center it.

**Rationale**: Since the Zarezerwuj button is inside the card, if the button is disabled via CSS, the click bubbles up to the card. The card catches the click and triggers navigation. If the card is in the center (`distanceRatio` < 0.1), `pointer-events: auto` lets the user click the Booksy link.

**Alternatives considered**: State-based disabling (via React `activeSlide`) — rejected because the spec requires smooth continuous states. If a card is mostly dragged to the center but not yet settled on `activeSlide`, it should still behave correctly based on its live position.

---

## 4. Mobile Responsiveness for 3D Arc

**Decision**: Use `window.matchMedia` (or the existing Tailwind breakpoints if managed via JS) to define max scale and max rotation variables. Desktop: max `rotationY` = 45deg, min `scale` = 0.85. Mobile (390px): max `rotationY` = 25deg, min `scale` = 0.90. This creates a "subtler arc".

**Rationale**: Mobile screens lack the width for aggressive 3D rotation, which squishes legibility. Interpolating to smaller max extremes keeps the text readable while still providing the premium depth cue.
