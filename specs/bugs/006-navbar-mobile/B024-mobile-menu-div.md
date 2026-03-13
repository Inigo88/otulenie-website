# Bug Report: Mobile Menu Trigger Uses Non-Interactive Element

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
High (Accessibility / WCAG 2.2 AA — Keyboard Navigation)

## Description
The mobile hamburger menu trigger was implemented as a `<div>` element, which is not keyboard-focusable and not announced as an interactive control by screen readers. This violates WCAG SC 4.1.2 (Name, Role, Value).

## Root Cause
The mobile menu was temporarily made inactive and the interactive `<button>` was replaced with a `<div>` during a cleanup pass.

## Resolution
Replaced the `<div>` with a `<button type="button">` element with `aria-label`, `disabled` attribute (since the modal is not yet implemented), and proper focus-visible styling.

## Verification
- Mobile menu trigger is now focusable via keyboard.
- Screen readers announce it correctly as a disabled button.
- Build passes without errors.
