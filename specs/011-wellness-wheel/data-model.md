# Data Model: Wellness Wheel (011-wellness-wheel)

**Branch**: `011-wellness-wheel` | **Date**: 2026-03-21

## Entities

### `MassageType` 

We retain the exact finalized `MASSAGE_DATA` structure from `010-carousel-modern`. No new data fields (like `imageMood` or `position`) are required. The "Wellness Wheel" effect relies entirely on DOM geometry, indexing, and GSAP math.

---

## Runtime State (Component)

The `MassageCarousel` component manages the following internal state (building directly on 010):

| State / Ref | Type | Description |
|---|---|---|
| `activeSlide` | `useState(number)` | Index (0–4) of the settled card (used strictly for pagination dots sync) |
| `activeSlideRef` | `useRef(number)` | Mirror of `activeSlide` for use in GSAP closures |
| `isInViewRef` | `useRef(boolean)` | `true` when the section is in the viewport; guards auto-rotation |
| `hasAnimatedRef` | `useRef(boolean)` | `true` after the entrance animation has fired |
| `horizontalRef` | `useRef(HTMLDivElement)` | DOM ref to the scrollable card track (receives `preserve-3d`) |
| `containerRef` | `useRef(HTMLElement)` | DOM ref to the outer `<section>` (receives `perspective`) |
| `wheelUpdateProgress` | `useRef(number)` | Tracks current smooth interpolation progress for requestAnimationFrame/updates |

---

## Display Data

```js
// Cloned for infinite wrap — originals + first 3 as clones (Retained from 010)
const DISPLAY_DATA = [...MASSAGE_DATA, ...MASSAGE_DATA.slice(0, 3)]; // length: 7
```

All dynamic visual state (scale, rotationY, opacity, pointer-events) is managed functionally via a `updateWheel()` GSAP method tracking live `x` translation, never stored in React specific state loops to avoid re-renders.
