# Bug B015: Olive Text Contrast on Small Text

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Accessibility / WCAG)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
The olive accent color (`#6E8068`) on the linen background (`#fdfaf0`) provides a ~3.5:1 contrast ratio. While this passes for large text, it fails the 4.5:1 requirement for normal-sized body text, posing a legibility risk for some users.

## Steps to Reproduce
1. Apply `text-olive` to a paragraph of small text.
2. Measure contrast with a WCAG tool.

## Expected Behavior
All text must meet WCAG 2.2 AA contrast standards (4.5:1 for normal text).

## Actual Behavior
The current olive color fails for small text tokens.

## Technical Root Cause
The specific HSL values for "Olive" were optimized for visual "calmness" rather than strict high-contrast legibility in small formats.

## Proposed Fix
Enforce a project-wide rule: `text-olive` must only be used on large text (≥18px or ≥14px bold). Use `text-moss` for smaller elements.

### Detailed Task List
- [x] [T001] [Investigation]: Audit all usages of `text-olive`.
- [x] [T002] [Documentation]: Record the usage constraint in the design system.

## Resolution
Documented the constraint. Current usage is limited to the `<h1>` headline, which is compliant.

## Verification
- [x] [Accessibility]: All current usages of `text-olive` appear on large heading text (compliant).
- [x] [Visual]: Branding integrity is maintained.
- [x] [Technical]: Build passes.
