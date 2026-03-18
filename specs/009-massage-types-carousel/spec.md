# Feature Specification: Massage Types Carousel

**Feature Branch**: `009-massage-types-carousel`  
**Created**: 2026-03-15  
**Status**: Finalized  
**Input**: User description: "Replace offer section and feature cards with Massage Type Carousel. Consolidate the "Oferta" CTA and the micro-interaction cards into a single, high-fidelity responsive carousel that showcases the four signature massage types with direct booking capability."

## Context & Dependencies

This feature is strictly governed by the following context documents:
- **Massage Descriptions**: [.specify/context/massage-descriptions.md](../../.specify/context/massage-descriptions.md) — Source of truth for all Polish marketing copy, pricing, and durations.
- **Project Constitution**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) — Governing rules for GSAP animations and design tokens.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Browsing Massage Types (Priority: P1)

As a potential client (Desk Worker or Mother), I want to see the available massage types in a clear, visually appealing way so that I can quickly decide which one fits my current needs.

**Why this priority**: Core functionality of the feature. Without seeing the types, the user cannot proceed to booking.

**Independent Test**: Can be fully tested by scrolling or swiping through the carousel and reading the condensed descriptions for each of the 4 types.

**Acceptance Scenarios**:

1. **Given** the user is in the "Oferta" section, **When** they swipe or click the navigation arrows, **Then** the carousel transitions smoothly to the next massage card with a premium feel.
2. **Given** a specific massage card is active, **When** the user views it, **Then** they see the name, duration, price, and the condensed Polish description.

---

### User Story 2 - Direct Booking from Carousel (Priority: P2)

As a client who has chosen a massage type, I want to initiate the booking process immediately from the card so that I don't have to navigate to another page.

**Why this priority**: Direct conversion driver. Minimizes friction in the booking funnel.

**Independent Test**: Can be tested by clicking the "Zarezerwuj" button on any active card and verifying it redirects to the Booksy link.

**Acceptance Scenarios**:

1. **Given** a massage card is visible, **When** the user clicks the "Zarezerwuj" button, **Then** the correct Booksy URL for that specific service (or general practice) is opened in a new tab (`target="_blank"`).

---

### User Story 3 - Interactive Polish & Transitions (Priority: P3)

As a user who values aesthetics, I want the carousel to feel "alive" and premium so that I feel trust and a sense of "Otulenie Calm" before I even book.

**Why this priority**: Alignment with brand constitution and premium positioning.

**Independent Test**: Can be tested by observing the transitions, hover effects on cards, and the noise overlay application.

**Acceptance Scenarios**:

1. **Given** the carousel is idle, **When** the user hovers over a card, **Then** the card or its button reacts with a subtle magnetic lift (`translateY(-1px)`) or scale (`1.03`).
2. **Given** the page is loading, **When** the carousel enters the viewport, **Then** the cards reveal themselves with a staggered fade-up animation.

---

### Edge Cases

- **What happens on extremely small mobile screens?** The carousel must stack into a single-column swipeable interface or a partial-card reveal to indicate horizontal scroll.
- **How does the system handle "No Javascript"?** The cards should fallback to a static vertical or horizontal list so the content is still accessible.
- **What happens if a massage type's data is missing?** The carousel MUST display a "Free consultation" fallback card (e.g., "Not sure? Book a consultation").

## Clarifications

### Session 2026-03-15

- Q: How should the carousel behave if a specific massage type's data is missing or malformed in the source file? → A: Fallback to a "Free consultation" card.
- Q: Which primary navigation controls should be visible to enable users to switch between cards on desktop? → A: Drag-and-drop and pagination dots.
- Q: When a user clicks the "Zarezerwuj" button, should the Booksy link open in the same tab or a new tab? → A: New tab (`target="_blank"`), as per updated Project Constitution.
- Q: Should the carousel rotate automatically? → A: Yes, every 5 seconds; pause on hover/interaction.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a responsive carousel containing 4 cards: Mocne, Głębokie, Czułe, and Ciepłe Otulenie.
- **FR-001.1**: System MUST support drag-and-drop (desktop) and touch/swipe (mobile) for carousel navigation.
- **FR-001.2**: System MUST display pagination dots for visual feedback of the active slide.
- **FR-002**: System MUST use the condensed Polish descriptions from `.specify/context/massage-descriptions.md` for each card.
- **FR-003**: Each card MUST display the name, duration (e.g., "1h" or "1h 30min"), and price (e.g., "180 PLN") clearly.
- **FR-004**: System MUST implement smooth, cinematic entrance and slide transitions.
- **FR-004.1**: Carousel MUST auto-rotate every 5 seconds, pausing on hover or manual interaction (WCAG compliance).
- **FR-005**: All cards and buttons MUST adhere to the "Otulenie Calm" palette: Forest Moss (#374833), Warm Linen (#fdfaf0), and Soft Olive (#6E8068).
- **FR-006**: System MUST implement a "magnetic" hover effect on the primary CTA button within each card.
- **FR-007**: System MUST apply the global 0.05 opacity SVG noise overlay to the carousel section.

### Key Entities

- **Massage Type**: Represents a single service. Attributes: `id`, `name`, `type`, `duration`, `price`, `shortDescription`, `fullDescription`, `booksyUrl`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Carousel is fully responsive and interactive on both mobile (touch/swipe) and desktop (drag-and-drop/dots).
- **SC-002**: Animation frame rate remains consistently near 60fps during transitions.
- **SC-003**: 100% of the text content is in Polish, matching the latest context updates.
- **SC-004**: Primary booking CTA on each card is distinct and functional.
