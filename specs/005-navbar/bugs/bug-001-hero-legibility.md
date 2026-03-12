# Bug Report: Hero State Legibility Issues

## Status
Fixed

## Severity
Medium (Visual/UX)

## Description
In the initial "Hero" state (at the top of the page), the navigation links and logo were using a color that lacked sufficient contrast against the `linen` background. This made the primary navigation difficult to read for users.

## Root Cause
The component was designed with a light-colored theme intended for a dark background, but the actual implementation of the landing page used a light `linen` background for the hero section.

## Resolution
Updated the `NavLink` and Logo styles in `Navbar.jsx` to use the primary `text-moss` color in the Hero state. Added transition effects to ensure a smooth color shift when scrolling or hovering.

## Verification
- Manual browser check confirmed that all text is clearly legible in the Hero state.
- Checked contrast ratios to ensure WCAG compliance.
