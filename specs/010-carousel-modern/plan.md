# Implementation Plan: Carousel Modernization

**Branch**: `010-carousel-modern` | **Date**: 2026-03-18 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/010-carousel-modern/spec.md)  
**Input**: Feature specification from `/specs/010-carousel-modern/spec.md`

## Summary

Refactor the shipped `MassageCarousel` and `massageData.js` to fix 4 confirmed bugs (B028–B031), resolve 3 constitution violations (pronoun in heading, wrong rotation interval, missing reduced-motion guard), remove the unused `imageMood` field, and add two UX enhancements: active card focus treatment (FR-009) and a one-shot entrance animation (FR-012). No new files are created — all changes are contained within two existing files.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x  
**Primary Dependencies**: GSAP 3 (ScrollTrigger + Draggable + InertiaPlugin), `@gsap/react` (`useGSAP`)  
**Storage**: N/A  
**Testing**: Browser-based manual verification (no existing test suite)  
**Target Platform**: Mobile-first Web (primary: 390px mobile, secondary: 1440px desktop)  
**Performance Goals**: ≥60fps during all transitions; entrance animation uses `will-change: transform`  
**Constraints**: Tailwind v4.x; GSAP exclusively for all animations (no CSS transitions on transformed elements); `useGSAP` for GSAP contexts in React  
**Scale/Scope**: Refactor of a single 224-line component + 53-line data file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation — Linen background, Moss/Olive palette, Fraunces/Inter typography, 0.05 noise overlay all retained from v1.  
[x] II. The Focus on Conversion — "Zarezerwuj" CTA on each card persists; opens Booksy in new tab (FR-001, carried forward).  
[x] III. Micro-Interaction Polish — Magnetic button `scale(1.03)` retained (FR-006); new card scale/opacity treatment (FR-009) adds depth; entrance animation (FR-012) adds cinematic reveal.  
[x] IV. Mobile-First Experience — Touch/swipe drag retained (FR-001.1); keyboard nav (FR-011) treated as enhancement, not replacing touch.  
[x] V. Reusable Component Architecture — No new components; existing `MagneticButton` composition retained.  
[x] VI. Accessibility Standards — Keyboard nav added (FR-011, B031); `prefers-reduced-motion` guard added (NFR-001); `role="region"`, `aria-label`, `tabIndex` added; visible focus ring on track container.  
[x] VII. Professional Solo Voice — Heading changed from "Nasza Oferta" to "Oferta" (V-001, FR-010).

## Project Structure

### Documentation (this feature)

```text
specs/010-carousel-modern/
├── plan.md         ✅ This file
├── research.md     ✅ Phase 0 complete
├── data-model.md   ✅ Phase 1 complete
├── quickstart.md   ✅ Phase 1 complete
└── tasks.md        ⬜ Phase 2 (/speckit.tasks)
```

### Source Code (affected files only)

```text
src/
├── constants/
│   └── massageData.js          # Remove imageMood from all 5 entries
└── components/
    └── MassageCarousel.jsx     # Full logic refactor (bug fixes + enhancements)
```

**Structure Decision**: No new files. `MassageCarousel.jsx` remains in `src/components/` (App.jsx already delegates to it). No contract files needed — this is a purely internal UI component with no external API surface.

## Proposed Changes

---

### Data Layer

#### [MODIFY] [massageData.js](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/constants/massageData.js)

- Remove `imageMood` property from all 5 `MASSAGE_DATA` entries.

---

### UI Components

#### [MODIFY] [MassageCarousel.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/MassageCarousel.jsx)

**Bug Fixes:**
- **B029**: Extract `getXForIndex` as a `useCallback` (stable ref, `[]` deps) outside `useGSAP`. Replace the broken formula in `handleDotClick` with `getXForIndex(index)`.
- **B028**: Extend the existing ScrollTrigger with `onEnter`/`onLeave`/`onEnterBack`/`onLeaveBack` callbacks to maintain `isInViewRef`. In the `useEffect` auto-rotation: replace `ScrollTrigger.isActive` gate with `isInViewRef.current`; fix interval from `3000` → `5000`.
- **B030**: Add `onThrowComplete` to `Draggable.create()` — compute nearest card index from settled `x`, call `setActiveSlide` and update `activeSlideRef.current`.
- **B031**: Add `onKeyDown` on outer track container; map `ArrowLeft`/`ArrowRight` to `handleDotClick(prev/next)`. Add `role="region"`, `aria-label="Oferta"`, `tabIndex={0}`, and `outline-none focus-visible:ring-2 focus-visible:ring-moss/50` to the track container.

**Constitution Fixes:**
- **V-001**: Change `"Nasza Oferta"` heading to `"Oferta"`.
- **V-002**: Change `setInterval(..., 3000)` to `setInterval(..., 5000)`.
- **V-004**: Add `prefersReducedMotion` constant (`window.matchMedia('(prefers-reduced-motion: reduce)').matches`) evaluated once on mount; pass as `duration: prefersReducedMotion ? 0 : <value>` to all GSAP calls; skip auto-rotation `setInterval` entirely when true.

**New Features:**
- **FR-009**: Add a `useEffect` watching `activeSlide`. On change, GSAP `to()` the active card to `{ scale: 1, opacity: 1 }` and all others to `{ scale: 0.95, opacity: 0.7 }` at `duration: 0.3, ease: 'power2.out'` (instant if reduced motion).
- **FR-012**: In the ScrollTrigger `onEnter` callback: check `hasAnimatedRef.current` before firing `gsap.fromTo(cards, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6 })`. After firing, set `hasAnimatedRef.current = true`. Skip entirely if reduced motion.

---

## Verification Plan

### Manual Verification

1. **Auto-rotation** (B028 fix): Scroll "Oferta" into view → wait 5s → verify carousel advances. Scroll out of view → wait 5s → verify it does NOT advance.
2. **Dot navigation** (B029 fix): Click each of the 5 dots → verify the carousel snap-centers the corresponding card.
3. **Dot state after drag** (B030 fix): Drag carousel 2 cards forward and release → verify active dot updates to match the settled card.
4. **Keyboard navigation** (B031 fix): Tab to carousel section → press `ArrowRight` 3 times → verify carousel advances; `ArrowLeft` → verify it goes back.
5. **Active card scaling** (FR-009): Navigate via dots/keys → verify active card is visually larger and full opacity; adjacent cards appear smaller/dimmer.
6. **Entrance animation** (FR-012): Hard-refresh page → scroll to "Oferta" → verify staggered fade-up fires; scroll away and back → verify it does NOT replay.
7. **Reduced motion** (NFR-001): Enable "Reduce Motion" in OS → reload → verify no animations play; dot clicks snap instantly.
8. **Heading** (V-001): Verify section heading reads "Oferta" with no "Nasza".
9. **Mobile (390px)**: Resize browser → verify touch/swipe works; Tab-Arrow navigation is accessible.
