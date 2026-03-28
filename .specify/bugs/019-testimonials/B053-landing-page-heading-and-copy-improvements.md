# Bug B053: Landing Page Heading and Copy Improvements

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement)
**Found in**: Feature 019 (Featured Testimonials)
**Date Created**: [2026-03-28]
**Date Resolved**: [2026-03-28]

## Description

The landing page contained a poetic but less intuitive heading for testimonials ("Głosy spokoju"). Additionally, the values section (Stacking Archive) had no visible heading for users, only an `sr-only` tag for screen readers, which left the section feeling visually disconnected from the rest of the flow.

## Steps to Reproduce

1. Open the landing page at any viewport width.
2. Scroll to the "Featured Testimonials" section and observe the title "Głosy spokoju".
3. Scroll to the "Benefits/Values" section (Stacking Cards) and note the lack of a section header.

## Expected Behavior

The testimonial section should clearly identify itself (e.g., "Wasze opinie"). The values section should have a visible, branded header (e.g., "Moje wartości") to provide context for the interactive cards.

## Actual Behavior

- Testimonials title: "Głosy spokoju".
- Values section title: Hidden (screen-reader only).

## Technical Root Cause

The testimonial copy was a placeholder from the initial implementation. The `StackingArchive` component (Feature 013) implementer prioritized the "sticky stacking" logic but omitted a visible H2 heading for the section.

## Proposed Fix

### Implementation Strategy

- **Approach**: Directly update the text and add the missing H2 element using the brand's serif typography (`font-fraunces`).
- **Affected Components**:
  - `src/App.jsx`: Updated Testimonial section heading.
  - `src/components/StackingArchive.jsx`: Added visible H2 header above the first card.
  - `src/components/MassageCarousel.jsx`: Updated section heading from "Oferta" to "Oferta masaży".

### Detailed Task List

- [x] [T001] [Implementation]: Update Testimonial title to "Wasze opinie" in `App.jsx`.
- [x] [T002] [Implementation]: Add visible "Moje wartości" title to `StackingArchive.jsx`.
- [x] [T003] [Implementation]: Update carousel header to "Oferta masaży" in `MassageCarousel.jsx`.
- [x] [T004] [Verification]: Verify visual alignment and responsive spacing of new headers.

## Resolution

The copy was updated to be more direct and user-friendly. A visible "Moje wartości" heading was added to the values section, using the standard typography and margins defined in the design system to ensure section continuity.

## Verification

- [x] [Functional: Sections are correctly identified by users]
- [x] [Visual: Heading matches the defined design tokens and palette]
- [x] [Accessibility: Semantic H2 used for both sections correctly]
- [x] [Technical: Build passes, lints are clean, and no regressions in related components]
