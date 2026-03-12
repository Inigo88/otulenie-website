# Bug Report: Olive Text Contrast on Small Text

## Status
Noted (Future Fix)

## Severity
Medium (Accessibility / WCAG 2.2 AA — Color Contrast SC 1.4.3)

## Description
The olive accent color (`#6E8068`) on the linen background (`#fdfaf0`) yields approximately 3.5:1 contrast ratio. This passes for large text (≥18px or ≥14px bold) but fails the 4.5:1 requirement for normal-sized body text.

## Root Cause
The `text-olive` class is used in the `<h1>` heading on the word "Calm" at `text-5xl` / `text-7xl`, which qualifies as large text and passes. However, the color should not be used for smaller text without darkening.

## Resolution
Current usage is compliant (only on large text in `<h1>`). Documented as a guideline: `text-olive` must only be used on text ≥18px or ≥14px bold. For smaller text, use `text-moss` instead.

## Verification
- Checked all current usages of `text-olive` — only appears on large heading text.
- No small-text violations currently exist.
