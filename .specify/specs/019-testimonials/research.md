# Research: GSAP Testimonials Slider & Aesthetic Polish

## GSAP Slider Implementation

### Desktop (Viewport >= 768px)
- **Concept**: A horizontal "infinite" or loopable carousel showing 3 cards.
- **Technique**: Use a container with `display: flex`. The slider will animate the `x` or `xPercent` property.
- **Auto-play**: A GSAP timeline with `repeat: -1`.
- **Hover handling**: `timeline.pause()` on `mouseenter`, `timeline.play()` on `mouseleave`.
- **Alternative**: Simple `react-slick` or similar? Rejected to keep bundle lean and adhere to GSAP-exclusive animation rule.

### Mobile (Viewport < 768px)
- **Concept**: A vertical stack of cards as per FR-006.
- **Technique**: Each card reveals sequentially using a staggered `ScrollTrigger`.
- **Animation**: `fade-up-staggered`.

## Icon Selection (Lucide React)

- **Star Rating**: `Star` icon from `lucide-react`. Color: #6E8068 (Soft Olive).
- **Decorative Quote**: `Quote` icon to anchor the testimonial text. Color: #374833 (Moss) with low opacity.

## Data Structure

```javascript
const testimonials = [
  { id: 1, name: "Olek", stars: 5, text: "Wszystko spodobało się. Polecam" },
  { id: 2, name: "Michał", stars: 5, text: "Z całego serca polecam, skuteczny masaż, miła atmosfera i pełen profesjonalizm." },
  { id: 3, name: "Magdalena", stars: 5, text: "Polecam wszystkim „spiętym” osobom ❤️" },
  { id: 4, name: "Justyna", stars: 5, text: "Ulga dla pleców, polecam ❤️" }
];
```

## Decisions & Rationale

- **Decision**: Use a simple GSAP horizontal shift for desktop slider instead of a complex infinite loop if not strictly required for 4 items.
- **Rationale**: Minimal complexity for a small dataset. 4 items with 3 visible means only one "hidden" slide.
- **Animations**: Use `useGSAP` hook for React-safe context management.
