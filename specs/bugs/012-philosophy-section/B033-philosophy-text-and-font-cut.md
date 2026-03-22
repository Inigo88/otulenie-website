# Bug B033: Philosophy Section Text and Font Rendering

**Status**: [x] Resolved
**Severity**: P1 (Branding / Visual Enhancement)
**Found in**: Feature 012 (Philosophy Section)
**Date Created**: 2026-03-22
**Date Resolved**: 2026-03-22

## Description

The Philosophy section contained several active issues:
1. The text said "My skupiamy się na Tobie", implying multiple people. The founder is a solo practitioner, so the text needs to reflect a singular voice ("Ja skupiam się na Tobie").
2. The italic serif font in the main heading was being cut off both vertically (ascenders/descenders) and horizontally (the italic 'J' was clipped on the left), making the text not completely visible.

## Steps to Reproduce

1. Open the homepage and scroll to the Philosophy Manifesto section.
2. Read the main heading text. Observation: It used the plural "My skupiamy się".
3. Look closely at the start of the word "Ja". Observation: The 'J' is clipped on the left.
4. Look closely at the top and bottom edges of the letters. Observation: Elements of the italic font were visibly clipped.

## Expected Behavior

- The text should reflect a singular voice ("Ja skupiam się na Tobie."), adhering to Principle VII (solo voice).
- The font must render fully without any clipping or cut-off edges, ensuring the premium, polished feel required by Constitution Principle III (Micro-Interaction Polish).

## Actual Behavior

- The text read "My skupiamy się na Tobie."
- The `SplitType` utility combined with `overflow-hidden` and tight leading (`leading-[1.1]`) clipped the italic serif font on all sides.

## Technical Root Cause

1. The text string in `src/App.jsx` was incorrectly implemented as plural.
2. The GSAP text reveal animation leverages `SplitType` which wraps text lines in `div`s with `overflow: hidden`. Italic fonts often have glyphs that extend beyond the standard character bounding box. The tight `leading-[1.1]` and lack of horizontal padding within the `SplitType` containers caused these flourishes to be clipped.

## Proposed Fix

### Implementation Strategy

- **Approach**: Updated the copy in `App.jsx` to singular form. To fix the font clipping, injected both vertical and horizontal padding with corresponding negative margins into `SplitType`'s `lineClass` (`lineClass: 'overflow-hidden py-4 -my-4 px-4 -mx-4'`).
- **Affected Components**:
  - `src/App.jsx`: Updated text string and modified the `SplitType` configuration.

### Detailed Task List

- [x] [T001] [Implementation]: Update the text from "My skupiamy..." to "Ja skupiam się na Tobie." in `App.jsx`.
- [x] [T002] [Implementation]: Fix vertical clipping with `py-4 -my-4` in `lineClass`.
- [x] [T006] [Implementation]: Fix horizontal clipping with `px-4 -mx-4` in `lineClass`.
- [x] [T003] [Verification]: Verify visually in the browser that the text is correct and no font edges are cut off.

## Resolution

The text was updated to "Ja skupiam się na Tobie." The font clipping issue was resolved by increasing the internal dimensions of the `SplitType` line containers using `py-4 px-4` while maintaining layout consistency with `-my-4 -mx-4`. This ensures even the most dramatic italic flourishes render fully during the reveal animation.

## Verification

- [x] [Functional: Text matches the requested singular voice]
- [x] [Visual: Heading renders cleanly without any clipped edges (vertical or horizontal)]
- [x] [Accessibility: Contrast and readability are maintained]
- [x] [Technical: No regressions in the scroll-triggered reveal animation]
