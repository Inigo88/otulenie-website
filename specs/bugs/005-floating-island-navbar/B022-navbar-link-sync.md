# Bug B022: Inconsistent Navigation Links

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Consistency / UX Alignment)
**Found in**: Feature 1.2.1 (Floating Island Navbar)
**Date Created**: 2026-03-11
**Date Resolved**: 2026-03-11

## Description
The navigation links in the desktop `Navbar.jsx` were out of sync with the product backlog and feature specifications. For example, "Obszar dojazdu" was missing, and the primary CTA used "Zarezerwuj" instead of "Zarezerwuj masaż".

## Steps to Reproduce
1. Compare the live Navbar links to the Product Backlog.
2. Note the missing entries.

## Expected Behavior
The navigation menu should exactly reflect the canonical feature list and labeling defined in the project specification and backlog.

## Actual Behavior
The navbar had a truncated list of links.

## Technical Root Cause
The initial `Navbar.jsx` implementation used a placeholder set of links that had not yet been reconciled with the finalized backlog scope.

## Proposed Fix
Synchronize the `links` array in `Navbar.jsx` with the official project scope.

### Detailed Task List
- [x] [T001] [Cleanup]: Update `links` array with all required pages.
- [x] [T002] [Implementation]: Update CTA button label.
- [x] [T003] [Verification]: Verify link count matches spec.

## Resolution
Synchronized the `links` array to include all pages and updated the CTA label. Reconciled the feature specification to ensure ongoing alignment.

## Verification
- [x] [Functional]: Navbar contains 5 links + 1 CTA.
- [x] [Visual]: Branding labels match the backlog.
- [x] [Technical]: Build passes.
