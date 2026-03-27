# Data Model: Massage Types Carousel

## Massage Type Entity

Represents a single service showcased in the carousel.

| Attribute | Type | Description | Validation |
|-----------|------|-------------|------------|
| `id` | `string` | Unique identifier (kebab-case) | Required, unique |
| `name` | `string` | Public name of the massage (Polish) | Required |
| `type` | `string` | Category of massage | Required |
| `duration` | `string` | Service length (e.g., "1h") | Required |
| `price` | `string` | Cost in PLN (e.g., "180 PLN") | Required |
| `description` | `string` | Condensed Polish description from `.specify/context/massage-descriptions.md` | Required, max 150 chars |
| `booksyUrl` | `string` | Direct booking link | Required, must be absolute URL |
| `imageMood` | `string` | Unsplash search query or specific image intent | Optional |

## Data Structure

The carousel will consume an array of `MassageType` objects.

```javascript
[
  {
    id: "mocne-otulenie",
    name: "Mocne Otulenie",
    type: "Regeneracyjny masaż pleców",
    duration: "1h",
    price: "180 PLN",
    description: "Precyzyjny masaż pleców i karku...",
    booksyUrl: "https://booksy.com",
    imageMood: "relaxing-back-massage"
  },
  // ... (Głębokie, Czułe, Ciepłe)
  {
    id: "free-consultation",
    name: "Bezpłatna Konsultacja",
    type: "Konsultacja",
    duration: "15 min",
    price: "0 PLN",
    description: "Nie wiesz co wybrać? Porozmawiajmy o Twoich potrzebach.",
    booksyUrl: "https://booksy.com",
    imageMood: "wellness-consultation"
  }
]
```

## State Transitions

| Current State | Action | Next State | Animation |
|---------------|--------|------------|-----------|
| `activeSlide: i` | Scroll / Swipe / Dot Click | `activeSlide: i+1` | GSAP horizontal translation |
| `autoRotate: true` | Hover on Carousel | `autoRotate: false` | Pause timer |
| `autoRotate: false` | Mouse Leave | `autoRotate: true` | Resume timer |
| `idle` | Page Load | `revealed` | Staggered fade-up (ScrollTrigger) |
