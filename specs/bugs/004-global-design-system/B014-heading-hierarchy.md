# Bug Report: Heading Hierarchy Skips H2

**Feature**: 1.1.1 Global Design System


## Status
Fixed

## Severity
Medium (Accessibility / WCAG 2.2 AA — Screen Reader Navigation)

## Description
The page heading hierarchy jumped from `<h1>` directly to `<h3>` for the service cards ("Głębokie odprężenie", "Mocne rozluźnienie"), skipping the `<h2>` level entirely. This confuses screen reader users who navigate by heading levels.

## Root Cause
The service card headings were set to `<h3>` without considering that no `<h2>` existed on the page between them and the `<h1>`.

## Resolution
Changed the two service card headings from `<h3>` to `<h2>` in `App.jsx`.

## Verification
- Heading hierarchy is now `h1` → `h2` with no skipped levels.
- Visual appearance unchanged (both were using `text-2xl`).
