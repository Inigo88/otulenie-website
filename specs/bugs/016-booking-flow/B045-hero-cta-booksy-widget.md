# Bug B045: Hero CTA Booksy Widget Replacement

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P1 (Functional / Branding)
**Found in**: Feature 016 (Booking Flow)
**Date Created**: 2026-03-25
**Date Resolved**: 2026-03-25

## Description

The main CTA button in the Hero section is currently a standard external link to `https://booksy.com` instead of triggering the Booksy booking widget. While the widget script is loaded in `App.jsx`, the `Hero` component lacks the necessary class (`ms-booking-button`) and centralized configuration to activate the widget. This results in a suboptimal user experience where the user is redirected away from the site instead of seeing the integrated booking flow.

## Steps to Reproduce

1. Open the landing page.
2. Observe the Hero section "Zarezerwuj masaż" button.
3. Click the button.
4. Observe that it navigates to `https://booksy.com` in the same or new tab (external redirect) instead of opening the Booksy overlay widget.

## Expected Behavior

The Hero CTA should:
1. Use the centralized `BOOKSY_URL` from `src/constants/links.js`.
2. Include the `ms-booking-button` class to trigger the Booksy widget (FR-007).
3. Include `target="_blank"` and `rel="noopener noreferrer"` for security and as a fallback.
4. Include a descriptive `aria-label`.
5. Open the Booksy widget overlay if the script is loaded.

## Actual Behavior

The Hero CTA is hardcoded to `https://booksy.com`, lacks the `ms-booking-button` class, and does not trigger the widget.

## Technical Root Cause

In `src/components/Hero.jsx`:
- Line 102: `href="https://booksy.com"` is hardcoded.
- Lines 100-107: `MagneticButton` lacks the `ms-booking-button` class required by the Booksy widget script (as identified in `research.md`).
- Missing `target="_blank"` and `rel="noopener noreferrer"`.
- Missing `aria-label`.

## Proposed Fix

### Implementation Strategy

- **Approach**: Update `Hero.jsx` to use the `BOOKSY_URL` constant and add the `ms-booking-button` class. The Booksy script (loaded in `App.jsx`) will then automatically attach to this button.
- **Affected Components**:
  - `src/components/Hero.jsx`: Update the `MagneticButton` props and attributes.

### Detailed Task List

- [ ] [T001] [Implementation]: Import `BOOKSY_URL` in `src/components/Hero.jsx` (already imported, but ensure usage).
- [ ] [T002] [Implementation]: Add `ms-booking-button` class to the `MagneticButton` in `Hero.jsx`.
- [ ] [T003] [Implementation]: Update `href` to use `BOOKSY_URL`.
- [ ] [T004] [Implementation]: Add `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label`.
- [ ] [T005] [Verification]: Verify widget trigger on desktop and fallback on mobile if applicable.

## Resolution

The Hero CTA in `src/components/Hero.jsx` was updated to implement a "proxy-click" strategy. The Booksy script's default teal button is hidden via CSS in `src/index.css`. An `onClick` handler in `Hero.jsx` programmatically triggers the hidden Booksy button to launch the integrated overlay. This ensures the site maintains its premium aesthetic while providing the official Booksy booking flow. Verified in the browser that the overlay appears correctly and the default button is hidden.

## Verification

- [ ] [Functional: Click triggers Booksy widget overlay]
- [ ] [Visual: Button style remains consistent with "Otulenie Calm" aesthetic]
- [ ] [Accessibility: `aria-label` is present and descriptive]
- [ ] [Technical: Build passes, no console errors from Booksy script]
