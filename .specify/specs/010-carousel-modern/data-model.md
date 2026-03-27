# Data Model: Carousel Modernization (010-carousel-modern)

**Branch**: `010-carousel-modern` | **Date**: 2026-03-18

## Entities

### `MassageType` (updated from v1)

Defined in `src/constants/massageData.js` as a JS module constant.

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | `string` | ✅ | Kebab-case slug (e.g. `"mocne-otulenie"`); unique identifier |
| `name` | `string` | ✅ | Polish display name (e.g. `"Mocne Otulenie"`) |
| `type` | `string` | ✅ | Polish service type label (e.g. `"Regeneracyjny masaż pleców"`) |
| `duration` | `string` | ✅ | Human-readable duration (e.g. `"1h"`, `"1h 30min"`) |
| `price` | `string` | ✅ | Formatted price string (e.g. `"180 PLN"`) |
| `description` | `string` | ✅ | Condensed Polish marketing copy from `massage-descriptions.md` |
| `booksyUrl` | `string` | ✅ | Full Booksy booking URL; must open in `target="_blank"` |
| ~~`imageMood`~~ | ~~`string`~~ | ~~❌~~ | **Removed** — no images on cards (clarification Q1, Q4) |

**Validation rules**:
- All 5 entries must be present (4 massage types + 1 consultation fallback).
- If any entry is missing or malformed, the consultation fallback card (`id: 'free-consultation'`) MUST still render.
- `booksyUrl` MUST be a valid absolute URL starting with `https://`.

**State transitions**: None — data is static and immutable at runtime.

---

## Runtime State (Component)

The `MassageCarousel` component manages the following internal state:

| State / Ref | Type | Description |
|---|---|---|
| `activeSlide` | `useState(number)` | Index (0–4) of the currently centered card; drives dot indicator and scale/opacity treatment |
| `activeSlideRef` | `useRef(number)` | Mirror of `activeSlide` for use in GSAP closures (avoids stale state) |
| `isInViewRef` | `useRef(boolean)` | `true` when the section is in the viewport; guards auto-rotation interval |
| `hasAnimatedRef` | `useRef(boolean)` | `true` after the entrance animation has fired once; prevents replay |
| `horizontalRef` | `useRef(HTMLDivElement)` | DOM ref to the scrollable card track |
| `containerRef` | `useRef(HTMLElement)` | DOM ref to the outer `<section>`; used for ScrollTrigger and hover pause |
| `triggerRef` | `useRef(HTMLDivElement)` | DOM ref to the inner scroll track wrapper |

---

## Display Data

```js
// Cloned for infinite wrap — originals + first 3 as clones
const DISPLAY_DATA = [...MASSAGE_DATA, ...MASSAGE_DATA.slice(0, 3)]; // length: 7
```

The clones are purely visual duplicates; only indices 0–4 correspond to real `activeSlide` states.
