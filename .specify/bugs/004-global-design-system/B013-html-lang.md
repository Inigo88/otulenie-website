# Bug B013: HTML Lang Attribute Set to English

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P0 (Accessibility / WCAG)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
The `<html lang="en">` attribute in `index.html` was set to English, despite the site being entirely in Polish. This causes screen readers to announce Polish content using English pronunciation rules, making the site unintelligible for visually impaired users.

## Steps to Reproduce
1. View the source of the homepage.
2. Check the `lang` attribute on the `<html>` tag.

## Expected Behavior
The `lang` attribute must match the primary language of the page content (`pl`).

## Actual Behavior
The attribute was hardcoded to `en`.

## Technical Root Cause
The default Vite template sets `lang="en"` and this was never updated during the content implementation phase.

## Proposed Fix
Manually update `index.html`.

### Detailed Task List
- [x] [T001] [Implementation]: Change `lang` to `pl` in `index.html`.
- [x] [T002] [Verification]: Verify in Chrome DevTools.

## Resolution
Changed `<html lang="en">` to `<html lang="pl">` in `index.html`.

## Verification
- [x] [Accessibility]: Screen readers now use Polish pronunciation rules.
- [x] [Technical]: `lang="pl"` is present in the build artifacts.
