# Bug B031: Missing Keyboard Navigation (WCAG SC 2.1.1)

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved  
**Severity**: P2 (Accessibility violation — Constitution Principle VI)  
**Found in**: Feature 009 (Massage Types Carousel) — shipped code  
**Date Created**: 2026-03-18  
**Date Resolved**: 2026-03-19
**Fix Branch**: `010-carousel-modern`

## Description

The carousel does not support keyboard navigation via Arrow keys. Users who rely on a keyboard (or switch access devices) cannot traverse between massage cards after tabbing to the "Oferta" section. This violates WCAG 2.2 SC 2.1.1 (Keyboard) and Constitution Principle VI (Accessibility Standards).

## Steps to Reproduce

1. Open the site; Tab through interactive elements until reaching the "Oferta" section.
2. Press `ArrowRight`.
3. Observe: nothing happens. The carousel does not advance.
4. Press `ArrowLeft`.
5. Observe: nothing happens. The carousel does not go back.

## Expected Behavior

When the carousel track container is focused:
- `ArrowRight` advances to the next card (same as clicking the next dot).
- `ArrowLeft` goes back to the previous card.
- Focus remains stable (no page scroll or tab movement).

## Actual Behavior

Arrow keys produce no response. Only mouse drag and dot-click button presses navigate between cards.

## Technical Root Cause

The carousel track `<div ref={triggerRef}>` has no `tabIndex`, no `role`, no `aria-label`, and no `onKeyDown` handler. The `Draggable` proxy element in `document.body` has `pointer-events: none` and cannot receive keyboard events.

## Proposed Fix

Add keyboard handler and ARIA attributes to the outer carousel container:

```jsx
<div
  ref={triggerRef}
  role="region"
  aria-label="Oferta"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (activeSlideRef.current + 1) % MASSAGE_DATA.length;
      handleDotClick(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (activeSlideRef.current - 1 + MASSAGE_DATA.length) % MASSAGE_DATA.length;
      handleDotClick(prev);
    }
  }}
  className="relative flex h-[500px] w-full flex-col justify-center overflow-hidden z-10 outline-none focus-visible:ring-2 focus-visible:ring-moss/50"
>
```

## Resolution

Keyboard navigation was implemented by:
1. **Interactive Container**: Added `role="region"`, `aria-label="Oferta"`, and `tabIndex={0}` to the carousel track.
2. **Event Listeners**: Implemented an `onKeyDown` handler to map `ArrowRight`/`ArrowLeft` keys to slide navigation.
3. **Visual Focus**: Added a focus ring (`focus-visible:ring-2`) to provide clear visual feedback for keyboard-only users.

## Verification
- [x] After tabbing to the carousel section, `ArrowRight` advances to the next card
- [x] After tabbing to the carousel section, `ArrowLeft` goes to the previous card
- [x] Arrow key navigation wraps correctly (last card → first, first card → last)
- [x] Active pagination dot updates on keyboard navigation
- [x] A visible focus ring appears on the carousel container when focused via keyboard
- [x] `Tab` key does NOT trigger carousel navigation (only moves focus to next element)
