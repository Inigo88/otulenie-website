# Quickstart: Massage Types Carousel

## Development Environment

1.  **Start Dev Server**:
    ```bash
    npm run dev
    ```
2.  **Open Browser**: `http://localhost:5173` (default Vite port)

## Implementation Layout

- **Component**: `src/components/MassageCarousel.jsx`
- **Data**: Extracted from `.specify/context/massage-descriptions.md`
- **Logic**: GSAP ScrollTrigger + Draggable for horizontal motion.

## Key Interaction Checks

- [ ] **Horizontal Scroll**: Scroll vertically to see cards translate horizontally.
- [ ] **Drag/Swipe**: Click and drag on desktop or swipe on mobile to navigate.
- [ ] **Dots**: Click pagination dots to jump to a specific card.
- [ ] **Auto-rotation**: Wait 5s to see automatic slide; hover to pause.
- [ ] **Booking**: Click "Zarezerwuj" to open Booksy in a new tab.

## Fallback Test

To test the fallback, temporarily delete or rename a section in `massage-descriptions.md` and verify the "Free consultation" card appears or handles the missing data gracefully.
