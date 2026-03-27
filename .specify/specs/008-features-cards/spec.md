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
- **Update**: Specification cross-verified against `.specify/context/design.md`. Aligning all components with strict architectural patterns (Section C).
- **Localization Update**: Week starts from Monday (Polish standard). Operating hours: Mon-Fri 17:00-22:00, Sat-Sun 09:00-22:00.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Personalized Massage Recommendation (P1)

As a seeker of relaxation who is overwhelmed by choices, I want to see a "Diagnostic Shuffler" featuring a stack of 3 overlapping cards that cycle vertically, so that I can see the "Mocne", "Głębokie", "Czułe", and "Ciepłe" types presented in a dynamic, premium "shuffled" sequence.

**Why this priority**: Directly solves a core user friction (indecision) and funnels the user toward a specific service, increasing conversion probability.

**Independent Test**: Can be fully tested by observing the Shuffler card cycle through the stack vertically and verify it uses the required `cubic-bezier(0.34, 1.56, 0.64, 1)` transition.

**Acceptance Scenarios**:

1. **Given** the Diagnostic Shuffler card is visible, **When** no interaction occurs, **Then** the card cycles 3 overlapping massage types vertically every 3 seconds.
2. **Given** the vertical cycle is active, **When** the user hovers, **Then** the animation pauses on the current card.
3. **Given** a massage is recommended, **When** the user reads the description, **Then** a "Zarezerwuj" button is present and linked to the relevant Booksy service category.

---

### User Story 2 - Real-time Business Transparency (P2)

As a prospective client, I want to see the "Telemetry Typewriter" actively presenting a monospace live-text feed with a "Live Feed" indicator, so that I feel a sense of professional transparency through a dynamic "technical" data capture.

**Why this priority**: Builds trust and credibility, essential for home services.

**Independent Test**: Can be tested by observing the typewriter correctly cycles business stats and displays the blinking accent-colored cursor.

**Acceptance Scenarios**:

1. **Given** the Telemetry Typewriter card is visible, **When** the sequence starts, **Then** a "Live Feed" label with a pulsing dot is present.
2. **Given** the animation is running, **When** text is typed, **Then** a blinking Soft Olive (#6E8068) cursor is visible at the end of the string.

---

### User Story 3 - High-Fidelity Booking Intent (P1)

As a client ready to book, I want to observe an animated SVG cursor interacting with a "Cursor Protocol Scheduler" weekly grid, so that I can visualize the ease of picking a slot before being redirected to finalize my booking on Booksy.

**Why this priority**: Final high-impact interaction to maintain conversion momentum.

**Independent Test**: Can be tested by verifying the SVG cursor moves to a day cell, performs a visual `scale(0.95)` click, and highlights a "Save" button before redirecting.

**Acceptance Scenarios**:

1. **Given** the Scheduler card is visible, **When** the loop starts, **Then** an animated SVG cursor enters the grid, selects a day cell, and activates an accent highlight.
2. **Given** a day is selected by the cursor, **When** the cursor moves to the "Zarezerwuj" button, **Then** the user is redirected to the Booksy booking link.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render three distinct cards within a responsive grid/stack layout.
- **FR-002**: **Diagnostic Shuffler**: MUST implement 3 overlapping cards cycling vertically (`array.unshift(array.pop())`) every 3 seconds; MUST use `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring-bounce transitions.
- **FR-003**: **Telemetry Typewriter**: MUST implement a monospace live-text feed with a blinking Soft Olive cursor; MUST include a "Live Feed" label with a pulsing dot.
- **FR-004**: **Cursor Protocol Scheduler**: MUST render a weekly grid starting from Monday (**M T W T F S S**); MUST animate an SVG cursor entering, selecting a day, and clicking a mock "Save" button; Mock behavior MUST reflect operating hours (17-22 weekdays, 9-22 weekends).
- **FR-005**: All cards MUST use Warm Linen backgrounds and respect the "Otulenie Calm" palette.
- **FR-006**: System MUST ensure that at least one primary booking link is accessible from this section on mobile devices.
- **FR-007**: Animations MUST respect the `prefers-reduced-motion` media query by disabling or significantly simplifying movement (Constitution Principle VI).

### Key Entities

- **Massage Type**: Represents one of the four services (Mocne, Głębokie, Czułe, Ciepłe). Includes name, tagline, and Booksy URL.
- **Business Telemetry**: A set of data points (e.g., Completed Massages, Service Radius, Availability Status) displayed in the typewriter.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The passive loop correctly completes a full cycle of 4 massage types with 100% reliability during visibility.
- **SC-002**: All interactive cards maintain 60fps performance during hover and active state GSAP animations.
- **SC-003**: 100% of interactive targets follow the minimum 24x24 CSS pixel size for touch accessibility (WCAG SC 2.5.8).
- **SC-004**: The CTA in the Scheduler card correctly opens the external Booksy link in < 500ms (ignoring network latency).
