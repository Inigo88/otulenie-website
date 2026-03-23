# Bug B044: Mobile Footer Layout

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement)
**Found in**: Feature 015-footer
**Date Created**: 2026-03-23
**Date Resolved**: 2026-03-23

## Description

The footer on mobile devices is currently not condensed enough. The "Nawigacja" and "Kontakt" sections should be displayed next to each other to save vertical space. Additionally, the marketing text should be spread from left to right to better utilize the available width.

## Steps to Reproduce

1. Open the site at mobile width (< 768px).
2. Scroll to the bottom to view the Footer.
3. Observe the vertical stack of "Nawigacja" and "Kontakt".
4. Observe the marketing text alignment/spread.

## Expected Behavior

- "Nawigacja" and "Kontakt" sections should be side-by-side on mobile.
- Marketing text (likely the slogan or similar) should span the full width or be spread out horizontally.
- Layout should feel more compact and less vertically stretched.

## Actual Behavior

- "Nawigacja" and "Kontakt" were stacked vertically.
- Marketing text was constrained by `max-w-[200px]` even on mobile.

## Technical Root Cause

The `Footer` component in `src/App.jsx` used a single-column grid on mobile (`grid-cols-1`), causing all sections to stack vertically. The brand slogan was also restricted in width on mobile, preventing it from "spreading" as requested. The bottom bar used `flex-col` on mobile.

## Proposed Fix

### Implementation Strategy

- **Approach**: 
    1.  Changed the main footer grid from `grid-cols-1` to `grid-cols-2` for mobile.
    2.  Set "Brand Section" to `col-span-2` and removed slogan width restriction on mobile.
    3.  Placed "Nawigacja" and "Kontakt" side-by-side (1 column each).
    4.  Set "Social Section" to `col-span-2` for better centering/spacing.
    5.  Updated "Bottom Bar" to use `flex-row flex-wrap justify-between` for horizontal spread.
- **Affected Components**:
  - `src/App.jsx`: Modified `Footer` component.

### Detailed Task List

- [x] [T001] [Preparation]: Verify current mobile layout.
- [x] [T002] [Implementation]: Update grid to 2 columns on mobile.
- [x] [T003] [Implementation]: Adjust brand and slogan layout.
- [x] [T004] [Implementation]: Adjust bottom bar for horizontal spread.
- [x] [T005] [Verification]: Visual check on 390px width.

## Resolution

The footer was successfully condensed for mobile by implementing a 2-column grid layout where "Nawigacja" and "Kontakt" sit side-by-side. The brand slogan and bottom bar links were adjusted to spread horizontally, utilizing the full screen width and providing a more premium, balanced appearance on small viewports.

## Verification

- [x] [Functional: Footer links and interactions remain functional]
- [x] [Visual: "Nawigacja" and "Kontakt" are side-by-side on mobile]
- [x] [Visual: Marketing text is spread horizontally on mobile]
- [x] [Technical: Build passes, Tailwind v4 theme tokens used correctly]

[TBD]

## Verification

- [ ] [Functional: Footer links and interactions remain functional]
- [ ] [Visual: "Nawigacja" and "Kontakt" are side-by-side on mobile]
- [ ] [Visual: Marketing text is spread horizontally on mobile]
- [ ] [Technical: Build passes, Tailwind v4 theme tokens used correctly]
