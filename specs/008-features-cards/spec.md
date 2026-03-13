# Feature Specification: Interactive Features Cards

**Feature Branch**: `008-features-cards`  
**Created**: 2026-03-14  
**Status**: Finalized  
**Input**: User description: "Build interactive features cards including Diagnostic Shuffler, Telemetry Typewriter, and Cursor Protocol Scheduler"

## Clarifications

### Session 2026-03-14
- Q: How should the user initiate the "shuffling" of massage recommendations? → A: Passive Loop (Card shuffles automatically until hovered/clicked).
- Q: Should the typewriter animation reveal all data points once or cycle continuously? → A: Continuous Cycle (Typing, pausing, clearing, and moving to the next stat).
- Q: Should the Scheduler represent real-time availability from Booksy? → A: High-Fidelity Mock (Aesthetic reactive UI that redirects to Booksy upon interaction).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Personalized Massage Recommendation (P1)

As a seeker of relaxation who is overwhelmed by choices, I want to see a "Diagnostic Shuffler" that automatically cycles through recommendations so that I can quickly spot a massage type (Mocne, Głębokie, Czułe, Ciepłe) that addresses my current state without needing to trigger a manual shuffle.

**Why this priority**: Directly solves a core user friction (indecision) and funnels the user toward a specific service, increasing conversion probability.

**Independent Test**: Can be fully tested by observing the Shuffler card and verifying it cycles through distinct recommendations until interacted with.

**Acceptance Scenarios**:

1. **Given** the Diagnostic Shuffler card is visible, **When** no interaction occurs, **Then** the card shuffles automatically through distinct massage types matching the "Otulenie Calm" preset styles.
2. **Given** the card is shuffling, **When** the user hovers or clicks the card, **Then** the shuffle pauses on the current recommendation.
3. **Given** a massage is recommended, **When** the user reads the description, **Then** a "Zarezerwuj" button is present and linked to the relevant Booksy service category.

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

As a client ready to book, I want to interact with a "Cursor Protocol Scheduler" micro-UI that feels reactive and premium, capturing my intent through a beautiful aesthetic mock of a calendar/timer, before being redirected to the actual Booksy platform to finalize my slot.

**Why this priority**: This is the final high-impact interaction before the user leaves the site to book. It must feel "magnetic" to ensure no drop-off, without the complexity of a full real-time API sync.

**Independent Test**: Can be tested by clicking the scheduler elements and ensuring the reactive UI triggers a redirect to the Booksy landing page area.

**Acceptance Scenarios**:

1. **Given** the Scheduler card is focused, **When** the user interacts with the time/date indicators, **Then** the UI reacts with a `scale(1.03)` and `translateY(-1px)` lift (Constitution Principle III).
2. **Given** any interaction occurs within the scheduler mock, **When** the user triggers the primary action, **Then** the system opens the Booksy booking link in a new tab.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render three distinct cards within a responsive grid/stack layout.
- **FR-002**: **Diagnostic Shuffler**: MUST automatically cycle through massage recommendations using a passive GSAP loop; MUST pause on hover or click.
- **FR-003**: **Telemetry Typewriter**: MUST use GSAP to animate sequential text revelation for business statistics; MUST loop through data points continuously with a clear/delete transition.
- **FR-004**: **Cursor Protocol Scheduler**: MUST feature an interactive, high-fidelity mock date/time visualizer; MUST redirect to Booksy upon interaction with the primary CTA or mock elements.
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
