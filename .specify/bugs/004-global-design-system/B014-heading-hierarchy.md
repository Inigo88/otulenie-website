# Bug B014: Heading Hierarchy Skips H2

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Accessibility / WCAG)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
The page heading hierarchy jumped from `<h1>` directly to `<h3>` for the service cards, skipping the `<h2>` level entirely. This violates accessibility best practices as it confuses screen reader users who rely on heading levels for document structure.

## Steps to Reproduce
1. Use a heading explorer tool or inspect the page structure.
2. Note the skipping of `h2`.

## Expected Behavior
Headings should follow a logical, nested hierarchy (`h1` → `h2` → `h3`) without skipping levels.

## Actual Behavior
Structure was `h1` → `h3` → `h3`.

## Technical Root Cause
The service card headings were set to `<h3>` without ensuring a parent `<h2>` existed in the layout.

## Proposed Fix
Promote the service card headings to `<h2>` to restore the hierarchy.

### Detailed Task List
- [x] [T001] [Implementation]: Update heading levels in `App.jsx`.
- [x] [T002] [Verification]: Confirm hierarchy with devtools.

## Resolution
Changed the service card headings from `<h3>` to `<h2>` in `App.jsx`.

## Verification
- [x] [Accessibility]: Heading hierarchy is now `h1` → `h2` with no skipped levels.
- [x] [Visual]: Visual appearance remains consistent.
- [x] [Technical]: Build passes.
