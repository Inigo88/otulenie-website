# Bug B046: Booksy Widget Close on Click Outside

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (UX Enhancement)
**Found in**: Feature 1.3.4 (Booking Flow)
**Date Created**: 2026-03-25
**Date Resolved**: [YYYY-MM-DD]

## Description

The Booksy widget overlay does not support closing by clicking on the dimmed backdrop area. Users are forced to find and click the "X" button within the iframe, which can be unintuitive and frustrating on modern web interfaces where "click-outside-to-close" is a standard pattern.

## Steps to Reproduce

1. Open the website.
2. Click "Zarezerwuj masaż" to open the Booksy widget.
3. Click anywhere on the darkened backdrop surrounding the booking form.
4. Observe that the widget remains open.

## Expected Behavior

The widget should close when the user clicks on the `.booksy-widget-overlay` element (the backdrop).

## Actual Behavior

The widget remains persistent until the internal "X" button is clicked.

## Technical Root Cause

The Booksy script (`code.js`) injects the overlay into the DOM but does not attach a click listener to the `.booksy-widget-overlay` element. Since the overlay is part of the parent document (not inside the iframe), we can attach our own listener.

## Proposed Fix

### Implementation Strategy

- **Approach**: Add a global click listener in `App.jsx` that targets the `.booksy-widget-overlay`. When clicked, it will remove the widget elements and restore body scroll.
- **Affected Components**:
  - `src/App.jsx`: Add a `useEffect` or update the existing `ScrollTrigger` context to include this listener.

### Detailed Task List

- [ ] [T001] [Implementation]: Add click listener to `document` for `.booksy-widget-overlay`.
- [ ] [T002] [Implementation]: Implement cleanup logic (remove `.booksy-widget-overlay`, `.booksy-widget-dialog`, and remove `antigravity-scroll-lock` class).
- [ ] [T003] [Verification]: Verify closing behavior in the browser.

## Resolution

Implemented a global event listener in `src/App.jsx` that monitors `click` events on the `.booksy-widget-overlay` and `keydown` events for the `Escape` key. When triggered, the listener manually removes the widget and its backdrop from the DOM and restores body scrolling. This provides a natural and expected user experience for dismissing the booking flow without searching for the "X" button.

## Verification

- [x] [Functional: Clicking backdrop closes the widget]
- [x] [Functional: Scrolling is restored after closing]
- [x] [Technical: No errors in console when clicking the backdrop]
