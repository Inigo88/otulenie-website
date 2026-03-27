# Feature Specification: Wellness Wheel Visual Effect

**Feature Branch**: `011-wellness-wheel`  
**Created**: 2026-03-19  
**Status**: Finalized  
**Input**: User description: "Implement Wellness Wheel visual effect for Carousel. Enhance the Massage Type Carousel with a curvilinear 'wheel' perspective. Implement dynamic scaling (focus on 3 central cards) and opacity fading for peripheral cards to create a premium, immersive focus."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Immersive Service Discovery (Priority: P1)

As a Prospective Client, I want to browse the massage offerings in a visually engaging, "wheel-like" interface so that I feel a sense of premium quality and calm focus on the services.

**Why this priority**: Correctly conveying the "premium digital instrument" aesthetic is a core business goal. The visual "wow" factor directly supports trust and conversion.

**Independent Test**: Can be fully tested by scrolling or dragging the "Oferta" section on a desktop or mobile device. The central card should feel "focused" and prominent.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage, **When** they scroll to the "Oferta" section, **Then** they see the massage cards arranged in a subtle curvilinear arc rather than a flat line.
2. **Given** the carousel is visible, **When** the user drags or uses the navigation dots, **Then** the card currently in the center scales up smoothly while adjacent cards scale down.
3. **Given** a card moves toward the edge of the viewport, **When** it leaves the central focus area, **Then** its opacity decreases gradually to create a peripheral fading effect.

---

### User Story 2 - Smooth Interactive Transitions (Priority: P2)

As a site visitor, I want the transitions between cards to feel fluid and organic, following the "Wellness Wheel" logic during interaction, so that the experience remains professional and high-end.

**Why this priority**: Jittery or mechanical transitions would break the "calm, grounding wellness" aesthetic established in the constitution.

**Independent Test**: Can be tested by rapid navigation via dots or quick dragging to ensure the GSAP animations stay synchronized and smooth.

**Acceptance Scenarios**:

1. **Given** the auto-rotation is active, **When** the carousel shifts to the next card, **Then** the "wheel" transformations (scale, y-offset, opacity) update in real-time.
2. **Given** the user is dragging the carousel, **When** the drag is active, **Then** the cards dynamically update their properties based on their live horizontal position relative to the center.

---

## Clarifications

### Recent Refinements (2026-03-21)

These refinements ensure the "Wellness Wheel" builds smoothly on the previously completed `010-carousel-modern` feature:

- **Continuous Interpolation**: Transform values (scale, opacity, y, rotationY) must interpolate smoothly frame-by-frame based on exact pixel distance from center, replacing the binary active/inactive states from 010.
- **CTA Interaction**: The Booksy CTA button must be disabled (`pointer-events: none`) on all peripheral cards to ensure clicking centers the card instead of triggering navigation away from the site.
- **3D Performance**: Explicitly added `preserve-3d`, `backface-visibility`, and `perspective` requirements to prevent clipping and improve performance.
- **Data Model Sync**: Dropped `MassageCard` entity in favor of the finalized `MASSAGE_DATA` from 010.

### Session 2026-03-19

- Q: Does the "wheel" effect include 3D rotation? → A: Subtle 3D (Subtle `rotationY` and `perspective`).
- Q: How should keyboard focus align with the "wheel"? → A: Auto-Center (Carousel shifts to center the focused card in the "wheel").
- Q: Are peripheral cards interactive? → A: Hybrid (Clicking a peripheral card centers it before opening the link).
- Q: How should the "wheel" scale on mobile? → A: Subtle Mobile (Reduced curvature and scale intensity on 390px viewports).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a curvilinear "wheel" perspective for the Massage Carousel cards using subtle `rotationY` and `perspective` to simulate a physical drum.
- **FR-002**: System MUST apply a dynamic vertical offset (`y` translation) based on the card's horizontal progress to create an arc effect.
- **FR-003**: System MUST implement *continuous* dynamic scaling based on the exact pixel distance from the viewport center (interpolating frame-by-frame during drag/scroll). The center card scales to 100% (or slightly larger), while peripheral cards scale down (e.g., to 85-90%).
- **FR-004**: System MUST automatically center the focused card (via tabbing or arrow keys) within the "wheel" to ensure immediate legibility and focus sync.
- **FR-005**: Click/Tap Interaction MUST center the selected card within the "wheel" before triggering any primary action. The Booksy CTA button MUST be disabled/unclickable (`pointer-events: none`) on all peripheral cards. Clicking anywhere on a peripheral card triggers navigation to center it.
- **FR-006**: System MUST apply gradual, continuous opacity fading to cards (interpolated based on distance) as they move away from the center of the viewport (peripheral cards should have ~40-60% opacity).
- **FR-007**: System MUST ensure the 3 central cards remain the primary focus and are most legible.
- **FR-008**: Transformations MUST be handled via GSAP for high-performance, hardware-accelerated rendering. The track container MUST use `transform-style: preserve-3d` with a defined `perspective`, and cards MUST use `backface-visibility: hidden` to prevent repaints and clipping.
- **FR-009**: The effect MUST be responsive and adapt its "curvature" and "scaling" intensity for mobile viewports (390px width), prioritizing legibility and content width by using a subtler arc.
- **FR-010**: System MUST respect the `prefers-reduced-motion` media query by simplifying or disabling the curvilinear/scaling animations if requested.

### Key Entities *(include if feature involves data)*

- **MASSAGE_DATA**: We will retain the exact finalized `MASSAGE_DATA` structure from the `010-carousel-modern` feature. No new data fields are required; the "Wellness Wheel" effect relies entirely on DOM geometry and GSAP math.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The central card always maintains a scale of 1.0 or higher when active.
- **SC-002**: GSAP animations maintain 60fps during dragging and auto-rotation on both mobile and desktop.
- **SC-003**: Card transformations (scale, opacity, y) update linearly based on their proximity to the center of the carousel container.
- **SC-004**: Zero layout displacement (no layout shifting) occurs outside the carousel section when the wheel effect is active.
- **SC-005**: Visual focus on the 3 central cards is clearly distinguishable from peripheral cards via scale and opacity.
