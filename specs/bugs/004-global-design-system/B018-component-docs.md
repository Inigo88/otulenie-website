# Bug B018: Missing Component JSDoc Prop Documentation

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Code Quality)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
While components had high-level JSDoc descriptions, they lacked `@param` annotations documenting their actual props. This reduces the discoverability of component APIs and makes maintenance/reuse more error-prone.

## Steps to Reproduce
1. Hover over a component usage (e.g., `<MagneticButton>`) in an IDE.
2. Observe that prop types and descriptions are missing.

## Expected Behavior
All reusable components should be documented with JSDoc `@param` tags for all public props.

## Actual Behavior
Props were undocumented in JSDoc blocks.

## Technical Root Cause
Development focus was prioritized on visual implementation over detailed housekeeping documentation.

## Proposed Fix
Perform a documentation pass on `MagneticButton`, `Navbar`, and `RoundedContainer`.

### Detailed Task List
- [x] [T001] [Documentation]: Add @param tags to `MagneticButton.jsx`.
- [x] [T002] [Documentation]: Add @param tags to `Navbar.jsx` and `NavLink`.
- [x] [T003] [Verification]: Verify hover-info in the editor.

## Resolution
Added full JSDoc `@param` annotations to all core reusable components, including polymorphic props and functional callbacks.

## Verification
- [x] [Technical]: IDE now shows full typed parameter hints.
- [x] [Technical]: Build passes.
