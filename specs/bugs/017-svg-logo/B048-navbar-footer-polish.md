# Bug B048: Navbar & Footer UI Polish

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement)
**Found in**: Feature 017 (SVG Logo), Feature 005 (Floating Island Navbar), Feature 015 (Footer)
**Date Created**: 2026-03-25
**Date Resolved**: 2026-03-25

## Description

A set of three visual polish issues across the Navbar and Footer:

1. **Navbar logo too large** — the SVG logo renders at `h-8` (32px), making it visually oversized within the floating island navbar.
2. **Focus outline on interactive elements** — after clicking the logo, nav links, or CTA buttons, a visible `focus:ring-2` border remains, degrading the aesthetic.
3. **"Główna" link redundant** — the logo already scrolls to top; having a separate "Główna" nav link is unnecessary clutter.

## Steps to Reproduce

1. Open the site on desktop (≥ 768px).
2. Observe the navbar logo is disproportionately large compared to nav links.
3. Click the logo, any nav link, or the CTA button — a colored ring/border persists after click.
4. Note "Główna" appears as the first navigation link despite the logo serving the same purpose.
5. Scroll to the footer and click the logo — the page performs a hard navigation instead of smooth scroll.

## Expected Behavior

- Navbar logo should be slightly smaller (~`h-6`, 24px) for visual harmony.
- No visible focus ring on mouse click; focus ring preserved only for keyboard navigation (`focus-visible`).
- "Główna" removed from nav links to reduce clutter.
- Footer logo performs `window.scrollTo({ top: 0, behavior: 'smooth' })` on click.

## Actual Behavior

- Logo renders at `h-8` (32px), appearing too large.
- `focus:ring-2 focus:ring-olive` on `MagneticButton` produces a visible border after any click.
- "Główna" link is present in `NAV_LINKS` array in `links.js`.
- Footer logo `<a href="/">` triggers a full page reload.

## Technical Root Cause

1. **Logo size**: `Logo.jsx` line 36 hardcodes `h-8`. The Navbar wrapper at `Navbar.jsx` line 157 renders `<Logo />` without overriding the height.
2. **Focus ring**: `MagneticButton.jsx` line 84 uses `focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2` — the `focus:` variant fires on both mouse click and keyboard tab. Should use `focus-visible:` instead.
3. **"Główna" link**: `links.js` line 17 includes `{ label: 'Główna', href: '#top' }` in the `NAV_LINKS` array.
4. **Footer logo**: `Footer.jsx` lines 35–41 use a plain `<a href="/">` without `preventDefault` or smooth scroll behavior.

## Proposed Fix

### Implementation Strategy

- **Approach**: Four targeted, surgical edits across 4 files. Each fix is independent and low-risk.
- **Affected Components**:
  - `src/components/Logo.jsx`: Reduce default height from `h-8` to `h-6`.
  - `src/components/MagneticButton.jsx`: Replace `focus:` with `focus-visible:` for ring styles.
  - `src/constants/links.js`: Remove the "Główna" entry from `NAV_LINKS`.
  - `src/components/Footer.jsx`: Add `onClick` handler with `preventDefault` + `scrollTo` on the logo link.

### Detailed Task List

- [x] [T001] [Implementation]: Reduce Logo default height from `h-8` to `h-6` in `Logo.jsx`.
- [x] [T002] [Implementation]: Replace `focus:` ring classes with `focus-visible:` in `MagneticButton.jsx`.
- [x] [T003] [Implementation]: Remove `{ label: 'Główna', href: '#top' }` from `NAV_LINKS` in `links.js`.
- [x] [T004] [Implementation]: Add `align-middle` to `Logo.jsx` and restore full page reload in `Navbar.jsx`.

## Resolution

Five surgical changes across 4 files:
- `Logo.jsx`: Reduced height from `h-8` to `h-6` (32px to 24px) for better navbar proportions. Added `align-middle` for perfect vertical centering.
- `MagneticButton.jsx`: Replaced `focus:ring-*` with `focus-visible:ring-*` ensuring visible focus indicators only appear for keyboard navigation, not mouse clicks.
- `links.js`: Removed the redundant "Główna" item from the `NAV_LINKS` array.
- `Navbar.jsx`: Modified the logo `onClick` handler to remove `preventDefault` (except for client-side navigation cases), ensuring a standard full-page reload on home logo click.
- `Footer.jsx`: Behavior confirmed as correct by user; no change needed.

## Verification

- [x] [Functional: Logo renders at correct smaller size and is vertically centered]
- [x] [Visual: No focus rings visible after mouse click on any interactive element; rings appear on keyboard Tab]
- [x] [Visual: "Główna" no longer appears in navbar or footer navigation]
- [x] [Functional: Navbar logo triggers a full page reload from any scroll position]
- [x] [Technical: `npm run build` passes cleanly, no regressions]
