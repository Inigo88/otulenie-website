# Bug Report: HTML Lang Attribute Set to English

## Status
Fixed

## Severity
High (Accessibility / WCAG 2.2 AA — Screen Readers)

## Description
The `<html lang="en">` attribute in `index.html` was set to English, despite the site being entirely in Polish. This causes screen readers to announce Polish content using English pronunciation rules, making the site unintelligible for visually impaired users.

## Root Cause
The default Vite template sets `lang="en"` and this was never updated when the site content was written in Polish.

## Resolution
Changed `<html lang="en">` to `<html lang="pl">` in `index.html`.

## Verification
- Confirmed `lang="pl"` is present in the built `dist/index.html`.
- Screen readers will now use Polish pronunciation rules.
