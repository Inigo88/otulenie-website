# Research: Massage Types Carousel

## GSAP Implementation Details

- **Approach**: Use GSAP `ScrollTrigger` for a pinned container that translates horizontally as the user scrolls vertically. This creates a "smooth, cinematic" transition effect.
- **Draggable/Swipe**: Integrate GSAP `Draggable` with the horizontal section to allow manual swiping/dragging on both mobile and desktop.
- **Snapping**: Use `snap` in `ScrollTrigger` to ensure the carousel always aligns with a card.
- **Auto-rotation**: Implement a `useEffect` with `setInterval` (paused on hover/interaction) that triggers a `gsap.to()` animation to the next slide.

## Data Sourcing from `.specify/context/massage-descriptions.md`

- **Parsing**: The file contains 4 distinct sections. I will extract:
    - `name` (e.g., "Mocne Otulenie")
    - `type`
    - `duration`
    - `price`
    - `shortDescription`
- **Fallback**: Add a 5th "Free consultation" card to the data array to handle missing data or as a permanent CTA.

## UX & Interaction Decisions

- **Navigation**: 
    - **Dots**: 5 dots (4 massage types + 1 consultation). Active dot updates based on horizontal scroll position.
    - **Drag**: Large touch/mouse targets for swiping.
- **Aesthetics**:
    - Use "Otulenie Calm" palette: Forest Moss, Warm Linen, Soft Olive.
    - Apply 1.03 scale hover on buttons via `MagneticButton`.
    - 0.05 opacity noise overlay.
- **Conversion**: 
    - Each card will have a "Zarezerwuj" `MagneticButton` pointing to the Booksy link (standard practice: `https://booksy.com`).
    - **New Tab**: Per Constitution v1.2.1, all external CTAs must open in a new tab.

## Alternatives Considered

- **Swiper.js / Embla**: Rejected to minimize external dependencies and strictly adhere to the Project Constitution's mandate for GSAP.
- **Simple Flex Scroll**: Rejected because it lacks the "premium cinematic feel" required for the Otulenie brand.
