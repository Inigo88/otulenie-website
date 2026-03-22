# Research: Carousel Modernization (010-carousel-modern)

**Branch**: `010-carousel-modern` | **Date**: 2026-03-18

## 1. GSAP Draggable `onThrowComplete` Pattern (B030 Fix)

**Decision**: Add `onThrowComplete` callback to `Draggable.create()` to sync active dot state after inertia.

**Rationale**: GSAP's `Draggable` with `inertia: true` fires `onDrag` during the gesture and `onThrowUpdate` during the inertia phase, but has no built-in snap-to-nearest mechanism. `onThrowComplete` is the correct hook for post-settle state sync. The final `x` value on `horizontalItems` (via `gsap.getProperty`) is used to calculate the nearest card by comparing each card's `offsetLeft` against the normalized translation.

**Alternatives considered**: `onThrowUpdate` with a debounce — rejected because debounced updates can lag behind or miss the settled state depending on timing.

---

## 2. IntersectionObserver vs ScrollTrigger for Viewport Guard (B028 Fix)

**Decision**: Use ScrollTrigger `onEnter`/`onLeave`/`onEnterBack`/`onLeaveBack` callbacks to manage an `isInViewRef` boolean. Do NOT use a separate `IntersectionObserver`.

**Rationale**: A `ScrollTrigger` is already created in `useGSAP` for the entrance animation (FR-012). Extending that same trigger with the four viewport callbacks is the leanest approach — no additional browser APIs, no cleanup logic to manage, and it stays within the GSAP React context. The `isInViewRef.current` boolean is then read by the `useEffect` auto-rotation interval.

**Alternatives considered**: Native `IntersectionObserver` — rejected because it introduces a second async API alongside GSAP, requiring its own cleanup and creating two separate viewport tracking systems for what is essentially the same element.

---

## 3. `getXForIndex` Shared Helper Pattern (B029 Fix)

**Decision**: Extract `getXForIndex` from inside `useGSAP` into a `useCallback` outside both hooks, memoized with `[]` dependencies. Both `useGSAP` (for auto-rotation) and `handleDotClick` will call the same reference.

**Rationale**: `useCallback` with stable `[]` deps creates a function reference that persists across renders, avoids stale closure issues, and is accessible to event handlers and GSAP contexts alike. The function reads `horizontalRef.current` and `triggerRef.current` directly (via refs), so it does not need re-memoization when refs change.

**Alternatives considered**: Store the helper in a `useRef` — viable but less idiomatic in React 19; `useCallback` is the canonical pattern for stable function references.

---

## 4. `prefers-reduced-motion` Detection in GSAP (NFR-001)

**Decision**: Use `window.matchMedia('(prefers-reduced-motion: reduce)').matches` evaluated once on mount, stored in a `prefersReducedMotion` constant, and passed to all GSAP calls as a conditional `duration: prefersReducedMotion ? 0 : <value>`. Auto-rotation `setInterval` is skipped entirely when true.

**Rationale**: GSAP does not natively respect `prefers-reduced-motion`; the check must be explicit. A single `matchMedia` call on mount is sufficient for a landing page (no live listener needed — the page is typically not open long enough for the user to change system preferences during a session).

**Alternatives considered**: GSAP's `gsap.defaults({ duration: 0 })` when reduced motion — rejected because it would globally zero all GSAP durations, affecting other components (Navbar, Hero).

---

## 5. Active Card Scale/Opacity Treatment (FR-009)

**Decision**: Use GSAP `to()` to animate `scale` and `opacity` on individual card elements whenever `activeSlide` changes. Cards are tracked by DOM index matching `MASSAGE_DATA` indices.

**Rationale**: CSS transitions on `scale` and `opacity` alone would work but conflict with GSAP's `will-change: transform` applied by Draggable. Keeping all transforms within GSAP avoids compositor conflicts and ensures consistent 60fps rendering.

**Implementation**: In a `useEffect` that watches `activeSlide`, `gsap.to(cards[activeSlide], { scale: 1.0, opacity: 1, ... })` and `gsap.to(nonActiveCards, { scale: 0.95, opacity: 0.7, ... })`.

---

## 6. Entrance Animation Once-Per-Load Guard (FR-012)

**Decision**: Use a `hasAnimatedRef = useRef(false)` boolean. The ScrollTrigger's `onEnter` callback checks `hasAnimatedRef.current` before firing GSAP `fromTo` on the cards. After playing, sets `hasAnimatedRef.current = true`.

**Rationale**: ScrollTrigger's `once: true` option exists but applies globally and kills the trigger — which we need to keep alive for the `isInViewRef` guard (B028 fix). Manual `hasAnimatedRef` check preserves max one animation fire while keeping the trigger active.
