# Bug B047: Booksy Widget Responsive Mobile Layout

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Functional / UX)
**Found in**: Feature 1.3.4 (Booking Flow)
**Date Created**: 2026-03-25
**Date Resolved**: [YYYY-MM-DD]

## Description

The Booksy widget overlay and dialog do not scale correctly on mobile viewports (e.g., 390px). The iframe content or the dialog itself may exceed the screen width or have cut-off areas, making it difficult for users to complete the booking process on mobile devices.

## Steps to Reproduce

1. Open the website on a mobile device or use DevTools at width: 390px.
2. Click "Zarezerwuj masaż" to open the Booksy widget.
3. Observe the widget's layout and whether it fits correctly within the screen boundaries.

## Expected Behavior

The widget should be fully responsive, centered, and fit within the mobile viewport without horizontal scrolling or content cut-off.

## Actual Behavior

The widget may have fixed dimensions or margins that break on small screens.

## Technical Root Cause

Default third-party widgets often use fixed widths or absolute positioning that doesn't account for modern responsive constraints or specific parent container styles.

## Proposed Fix

### Implementation Strategy

- **Approach**: Apply CSS overrides in `index.css` to force the widget dialog and iframe to be responsive.
- **Affected Components**:
  - `src/index.css`: Add global overrides for `.booksy-widget-dialog` and related elements.

### Detailed Task List

- [ ] [T001] [Investigation]: Audit the widget's mobile dimensions in the browser.
- [ ] [T002] [Implementation]: Add CSS overrides for `.booksy-widget-dialog` and `.booksy-widget-overlay` in `index.css`.
- [ ] [T003] [Verification]: Visual check on mobile (390px).

## Resolution

Implemented a comprehensive, cross-device Booksy UX fix:
- **Mobile Flex-Scroll**: Converted `.booksy-widget-overlay` into a flex container with `overflow-y: auto`. Used a `MutationObserver` to move the dialog inside this overlay, enabling full-length vertical scrolling (1700px+).
- **Desktop Restoration**: Restored strict `width: 770px` for viewports > 768px to prevent "narrow widget" regressions.
- **Dual Scroll-Lock**: Implemented a `booksy-active` class that locks both `html` and `body` (`overflow: hidden`) while the widget is active. This eliminates "triple scrollbars" and prevents background scroll-chaining.
- **Aesthetic Refinement**: Maintained the floating sheet look with `92vw` width, `20px` border-radius, and soft shadows on mobile.

## Verification

- [x] [Visual: Widget fits 770px on desktop]
- [x] [Visual: Widget fits 92vw on mobile]
- [x] [Visual: Full content length (1700px+) is accessible on all devices]
- [x] [Visual: Single scrollbar (overlay only), background is locked]
- [x] [Visual: Floating sheet look with margins and rounded corners on mobile]
- [x] [Functional: Booking form remains interactive on all viewports]
