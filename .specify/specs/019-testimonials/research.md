# Research: GSAP Testimonials Slider & Aesthetic Polish

## GSAP Slider Implementation

### Desktop (Viewport >= 768px)
- **Concept**: A horizontal "infinite" or loopable carousel showing 3 cards.
- **Technique**: Use a container with `display: flex`. The slider will animate the `x` or `xPercent` property.
- **Auto-play**: A GSAP timeline with `repeat: -1`.
- **Hover handling**: `timeline.pause()` on `mouseenter`, `timeline.play()` on `mouseleave`.
- **Alternative**: Simple `react-slick` or similar? Rejected to keep bundle lean and adhere to GSAP-exclusive animation rule.

### Mobile (Viewport < 768px)
- **Concept**: A horizontal horizontal slider displaying 1 item at a time.
- **Technique**: Similar to desktop, but with `100%` width per card and simple `xPercent` transitions.
- **Animation**: Smooth horizontal slide.

## Icon Selection (Lucide React)

- **Star Rating**: `Star` icon from `lucide-react`. Color: #6E8068 (Soft Olive).
- **Decorative Quote**: `Quote` icon to anchor the testimonial text. Color: #374833 (Moss) with low opacity.

## Data Structure (Representative Sample)

```javascript
const testimonials = [
  { id: 1, name: "Sample Name", stars: 5, text: "Sample review text..." },
  // ... more items
];
```

## Decisions & Rationale

- **Decision**: Use a simple GSAP horizontal shift for desktop slider instead of a complex infinite loop if the item count is small.
- **Rationale**: Minimal complexity for a limited dataset. Using `xPercent` allows for flexible slide counts.
- **Animations**: Use `useGSAP` hook for React-safe context management.
