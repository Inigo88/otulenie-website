# Quickstart: Wellness Wheel (011-wellness-wheel)

**Branch**: `011-wellness-wheel` | **Date**: 2026-03-21

## Overview

This feature upgrades the flat `MassageCarousel` created in `010` into a premium curved 3D "Wellness Wheel". The feature introduces continuous interpolation of CSS transforms (`scale`, `opacity`, `y`, `rotationY`) based on exact pixel dragging distance, ensuring fluid interactions.

## Dev Environment

```bash
git checkout 011-wellness-wheel
npm install
npm run dev
# → http://localhost:5173
```

## Files to Change

| File | Change |
| :--- | :--- |
| `index.css` / `tailwind.config` | Add `perspective` and `preserve-3d` utilities if missing in v4 |
| `MassageCarousel.jsx` | Replace the binary active/inactive scaling logic with exactly interpolated `updateWheel()` function across animations |

## Key Areas to Work On (In Order)

1. **CSS 3D Foundation**: Add `perspective-[1000px]` to the outer container and `transform-style-[preserve-3d]` to the horizontal track.
2. **Remove Binary Focus Logic**: Delete the `useEffect` from `010` that applied hard `0.95` scale and `0.7` opacity on `activeSlide` changes.
3. **Build `updateWheel` Math**: Write a function that reads the live `x` translation of the track, calculates the center viewport pixel coordinate, finding each card's `distanceRatio`, and applying GSAP `set()` for continuous scale, y, opacity, and rotationY.
4. **Hook into Drag and Tweens**: Fire `updateWheel()` on `Draggable.onDrag`, `Draggable.onThrowUpdate`, and hook it into an `onUpdate` inside the GSAP auto-rotation and dot-navigation tweens.
5. **Dynamic CTA Guard**: Update logic so peripheral cards disable their Booksy button interactions and act as click-to-center targets.
6. **Mobile Scaling**: Use `window.innerWidth` (or matchMedia breakpoints) to clamp maximum `rotationY` and scaling on mobile (390px).

## Verification Checklist

- [ ] Cards arrange in a curved wheel perspective naturally.
- [ ] Dragging slowly updates card sizes, fading, and rotation frame-by-frame (continuous).
- [ ] Active center card remains easily readable, peripheral cards fade to 40-60%.
- [ ] CTA Zarezerwuj clicks work ONLY on the center active card.
- [ ] Clicking any peripheral card immediately visually centers it.
- [ ] Reduced motion prefers static layout (disables continuous 3D rotation).
- [ ] Layout remains stable, no jitter or layout shift during high-speed drag.
