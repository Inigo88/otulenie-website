# Feature Specification: Interactive Features Cards

**Feature Branch**: `008-features-cards`  
**Created**: 2026-03-14  
**Status**: Draft  
**Input**: User description: "Build interactive features cards including Diagnostic Shuffler, Telemetry Typewriter, and Cursor Protocol Scheduler"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Personalized Massage Recommendation (P1)

As a seeker of relaxation who is overwhelmed by choices, I want to use a "Diagnostic Shuffler" so that I can quickly determine which of the four massage types (Mocne, Głębokie, Czułe, Ciepłe) best addresses my current physical and emotional state.

**Why this priority**: Directly solves a core user friction (indecision) and funnels the user toward a specific service, increasing conversion probability.

**Independent Test**: Can be fully tested by interacting with the Shuffler card and verifying a clear, branded recommendation is presented.

**Acceptance Scenarios**:

1. **Given** the Diagnostic Shuffler card is visible, **When** the user clicks or swipes to "shuffle" their state, **Then** the card displays a randomized but distinct massage recommendation matching the "Otulenie Calm" preset styles.
2. **Given** a massage is recommended, **When** the user reads the description, **Then** a "Zarezerwuj" button is present and linked to the relevant Booksy service category.

---

### User Story 2 - Real-time Business Transparency (P2)

As a prospective client, I want to see the "Telemetry Typewriter" actively presenting business data (e.g., "Masaże wykonane", "Obszar dojazdu: Wrocław + 20km") so that I feel a sense of trust through professional transparency and dynamic activity.

**Why this priority**: Builds trust and credibility, which is essential for a home-service business where the practitioner enters the client's personal space.

**Independent Test**: Can be tested by observing the typewriter animation and verifying the data points are accurate to the business profile.

**Acceptance Scenarios**:

1. **Given** the Telemetry Typewriter card is in view, **When** the sequence starts, **Then** text is rendered with a smooth, premium GSAP-driven "typewriter" effect using the Inter font.
2. **Given** the animation is running, **When** a specific stat is highlighted, **Then** the Soft Olive accent color is used to draw subtle attention per Constitution Principle I.

---

### User Story 3 - High-Fidelity Booking Intent (P1)

As a client ready to book, I want to interact with a "Cursor Protocol Scheduler" micro-UI that feels reactive and premium, so that the transition to the external booking site (Booksy) feels like a natural continuation of the high-end experience.

**Why this priority**: This is the final high-impact interaction before the user leaves the site to book. It must feel "magnetic" to ensure no drop-off.

**Independent Test**: Can be tested by clicking the scheduler and ensuring the external redirect to Booksy functions correctly and looks premium.

**Acceptance Scenarios**:

1. **Given** the Scheduler card is focused, **When** the user interacts with the time/date indicators, **Then** the UI reacts with a `scale(1.03)` and `translateY(-1px)` lift (Constitution Principle III).
2. **Given** an interaction occurs, **When** the user clicks the final CTA, **Then** the system opens the Booksy booking link in a new tab.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render three distinct cards within a responsive grid/stack layout.
- **FR-002**: **Diagnostic Shuffler**: MUST implement a randomized state switcher with smooth GSAP transitions between massage types.
- **FR-003**: **Telemetry Typewriter**: MUST use GSAP to animate sequential text revelation for business statistics.
- **FR-004**: **Cursor Protocol Scheduler**: MUST feature an interactive date/time visualizer that responds to mouse/touch interaction with magnetic curves.
- **FR-005**: All cards MUST use Warm Linen backgrounds and respect the "Otulenie Calm" palette.
- **FR-006**: System MUST ensure that at least one primary booking link is accessible from this section on mobile devices.
- **FR-007**: Animations MUST respect the `prefers-reduced-motion` media query by disabling or significantly simplifying movement (Constitution Principle VI).

### Key Entities

- **Massage Type**: Represents one of the four services (Mocne, Głębokie, Czułe, Ciepłe). Includes name, tagline, and Booksy URL.
- **Business Telemetry**: A set of data points (e.g., Completed Massages, Service Radius, Availability Status) displayed in the typewriter.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User interactions with the Shuffler card result in a 95% completion rate (reaching a recommendation).
- **SC-002**: All interactive cards maintain 60fps performance during hover and active state GSAP animations.
- **SC-003**: 100% of interactive targets follow the minimum 24x24 CSS pixel size for touch accessibility (WCAG SC 2.5.8).
- **SC-004**: The CTA in the Scheduler card correctly opens the external Booksy link in < 500ms (ignoring network latency).
