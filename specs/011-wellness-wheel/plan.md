# Implementation Plan: Wellness Wheel Visual Effect

**Branch**: `011-wellness-wheel` | **Date**: 2026-03-21 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/011-wellness-wheel/spec.md)  
**Input**: Feature specification from `/specs/011-wellness-wheel/spec.md`

## Summary

Enhance the `MassageCarousel` constructed in `010-carousel-modern` with a "Wellness Wheel" 3D perspective. The core logic shifts from applying binary `activeSlide` GSAP tweens (a flat approach) to a continuously interpolated layout tracking live `x` dragging context. This creates a rotating drum illusion while fading, scaling, and lowering peripheral cards dynamically. The CTA is also context-aware, disabling entirely on non-central cards.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x  
**Primary Dependencies**: GSAP 3 (ScrollTrigger + Draggable + InertiaPlugin), `@gsap/react` (`useGSAP`)  
**Storage**: N/A  
**Testing**: Manual visual testing of 3D performance and responsiveness.  
**Target Platform**: Mobile-first Web (390px scale) up to Desktop wide  
**Project Type**: Web Application Landing Page  
**Performance Goals**: 60fps animations during heavy JS drag interpolation. No layout shifting or overflow reflows during 3D rotations.  
**Constraints**: GSAP for *all* continuous transformations. Avoid React renders during drag updates.  
**Scale/Scope**: Refactor of the existing 250-line `MassageCarousel.jsx`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (The wheel effect directly reinforces the "premium digital instrument" philosophy).
[x] II. The Focus on Conversion (CTA button disabled on peripheral cards to guarantee clean navigation to the focal card before redirecting to Booksy).
[x] III. Micro-Interaction Polish (Seamless 60fps 3D transforms via GSAP continuous frame interpolation).
[x] IV. Mobile-First Experience (Clamping `rotationY` and `scale` variables defensively for 390px screens).
[x] V. Reusable Component Architecture (Enhancing existing component in-place vs creating new ones).
[x] VI. Accessibility Standards (ARIA tabs kept intact, `prefers-reduced-motion` guarded against 3D spins).

## Project Structure

### Documentation (this feature)

```text
specs/011-wellness-wheel/
├── plan.md              # This file
├── research.md          # GSAP 3D tracking & math logic
├── data-model.md        # Uses existing MASSAGE_DATA
├── quickstart.md        # Dev guide & transition away from binary state
└── tasks.md             # To be generated via /speckit.tasks
```

### Source Code

```text
src/
├── index.css                    # Tailwind properties check
└── components/
    └── MassageCarousel.jsx      # Implement updateWheel math logic
```

**Structure Decision**: No new files. Overhaul internal GSAP bindings in `MassageCarousel.jsx`.

---

## Proposed Changes

### Configuration Updates

#### [MODIFY] [index.css](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/index.css)

- Verify/add support for CSS 3D perspective utilities (`perspective`, `transform-style`, `backface-visibility`) if not natively available in Tailwind v4 preset, adding them to `@theme` or `@utility` blocks as needed.

### UI Components

#### [MODIFY] [MassageCarousel.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/MassageCarousel.jsx)

**1. Setup 3D Context (CSS):**

- Add `perspective: 1000px` to the `containerRef`'s outer root `section` to anchor the 3D perspective viewpoint.
- Add `transform-style: preserve-3d` to the `horizontalRef.current` track element.
- Add `backface-visibility: hidden` to all the individual card elements mapping over `DISPLAY_DATA`.

**2. Tear Down `010` Binary Scaling:**

- Remove the `useEffect` that listens to `activeSlide` and tweens cards instantly to `scale: 1` or `scale: 0.95`. That logic was flat and binary.

**3. Implement Continuous GSAP Math (`updateWheel`):**

- Inside `useGSAP`, declare a reusable function `updateWheel()`.
- The function reads `gsap.getProperty(horizontalRef.current, "x")`.
- It iterates over the card elements (including clones), calculating their absolute `centerDistance` from the viewport center line using bounding boxes safely isolated by GSAP layout math to avoid reflows.
- Clamp a continuous `distanceRatio` (0.0 to 1.0).
- Dynamically `gsap.set()` each card's properties:
  - `scale`: `1.0` minus a fraction of the ratio (e.g., down to `0.85`).
  - `opacity`: `1.0` mapping down to `0.40`.
  - `y`: `0` mapping up/down up to `40px` to form an arc.
  - `rotationY`: `0` mapped relative to direction (e.g., left cards positive degrees, right negative degrees).
- Apply a dynamic class or set `style.pointerEvents = 'none'` to cards with `distanceRatio > 0.1` to prevent stray Booksy clicks on peripheral cards.

**4. Hook into GSAP Lifecycle:**

- `Draggable.create()` config: Add `updateWheel` to `onDrag` and `onThrowUpdate`.
- Auto-rotation `setInterval`: During the GSAP tween from slide A to slide B, use `onUpdate: updateWheel` inside the tween so it smoothly sweeps the 3D arc.
- `handleDotClick`: Same `onUpdate: updateWheel` binding during the snapping tween.

**5. Mobile Responsiveness & Reduced Motion Guard:**

- Check window width inside `updateWheel` to clamp maximum 3D `rotationY` and scale down scaling intensity.
- Inside the reduced motion guard: bypass `updateWheel` logic entirely, allowing standard flat scrolling and instant clicks.

---

## Verification Plan

### Manual Verification

1. **Continuous Scroll Test**: Drag the mouse slowly across the carousel track. Every card should smoothly rotate, scale, and fade frame-by-frame, without jumping.
2. **Auto-Rotation Sync**: Wait 5 seconds to let the carousel auto-rotate. The card transitions should look exactly the same mathematically as dragging slowly.
3. **CTA Pointer Lock**: Try clicking the "Zarezerwuj" button on the outer cards. It should not open the Booksy link, but instead center the card in the viewport. With the card now centered, click it again—this time it should open Booksy.
4. **Mobile 3D Squeeze Test**: Resize browser to 390px layout. Spin the carousel and confirm that the cards still show depth, but do not compress the text so aggressively that it becomes illegible.
5. **Reduced Motion Test**: Activate OS-level reduced motion mode and refresh. Ensure the carousel acts as a simple flat slider (no 3D twisting).
