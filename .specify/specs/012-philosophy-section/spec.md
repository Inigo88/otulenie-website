# Feature Specification: Philosophy Manifesto Section

**Feature Branch**: `012-philosophy-section`  
**Created**: 2026-03-22  
**Status**: Finalized  
**Input**: User description: "Build a dark-themed parallax-supported section using SplitType reveal animations to highlight brand differentiation."

## Clarifications

### Session 2026-03-22

- Q: What visual elements should the parallax effect be applied to in the background of the dark theme section? → A: Abstract, subtle shapes or soft gradients matching the brand palette.
- Q: How should the text reveal animation be staggered to best achieve the 'relaxing, high-end' vibe? → A: Line-by-line slow reveal.
- Q: How should the animations behave for users with `prefers-reduced-motion` enabled? → A: Disable parallax and text reveal entirely (static).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discovering the Brand Philosophy (Priority: P1)

As a prospective client browsing the homepage, I want to read the brand's philosophy manifesto presented in a visually engaging, premium way, so that I understand Otulenie's unique approach to wellness.

**Why this priority**: Establishing trust and clearly communicating brand differentiation is a core part of the business problem, making this the primary goal of the section.

**Independent Test**: Can be fully tested by scrolling to the section and verifying the dark theme, layout structure, and copy readability across device sizes.

**Acceptance Scenarios**:

1. **Given** the user is scrolling down the homepage, **When** the Philosophy Manifesto section enters the viewport, **Then** the distinct dark theme is properly rendered without breaking the page flow.
2. **Given** the section is visible, **When** the user reads the text, **Then** the typography structure (headings, body) clearly aligns with the brand design system.

---

### User Story 2 - Experiencing Premium Micro-interactions (Priority: P2)

As a prospective client, I want to experience smooth parallax effects and text reveal animations as I scroll, so that the website feels like a deeply relaxing, high-end digital instrument.

**Why this priority**: The aesthetic and interactive polish of the site directly supports the premium positioning required to convert the target audience (desk workers and busy mothers).

**Independent Test**: Can be tested by scrolling slowly through the section and observing the text reveal and parallax effects on different devices.

**Acceptance Scenarios**:

1. **Given** the user scrolls through the section, **When** the section boundary is crossed, **Then** a parallax effect smoothly engages on background/decorative elements without layout thrashing.
2. **Given** the user scrolls into the text content, **When** text elements enter the viewport, **Then** they reveal smoothly via a staggered text animation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a full-width Philosophy Manifesto section on the homepage.
- **FR-002**: System MUST apply a dark theme to this section, leveraging color tokens from the design system (e.g., Moss or Olive).
- **FR-003**: System MUST implement a parallax scrolling effect applied to abstract, subtle shapes or soft gradients matching the brand palette in the background.
- **FR-004**: System MUST animate the manifestation text using a staggered, line-by-line slow text reveal triggered by the user's scroll position.
- **FR-005**: System MUST ensure all animations run smoothly without dropping frames or causing layout shifts.
- **FR-006**: System MUST maintain the global noise overlay across this section.
- **FR-007**: System MUST ensure the section is fully responsive, stacking content vertically and prioritizing readability on mobile viewports (< 768px).
- **FR-008**: System MUST structure the manifesto copy into two distinct semantic blocks: a smaller, neutral industry statement ("Most [industry] focuses on...") and a massive, drama serif italic brand statement ("We focus on..."), as mandated by the design system.

### Key Entities

- **Manifesto Section**: A structural UI element representing the brand's core philosophy, containing headings, paragraphs, and decorative elements.

### Edge Cases & Error Handling

- **EC-001**: System MUST disable parallax and text reveal animations entirely, rendering static text, for users with `prefers-reduced-motion` enabled.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Section layout fits within the viewport width without horizontal scrolling on mobile viewports (down to 390px).
- **SC-002**: Animations (parallax and text reveal) maintain 60fps and do not trigger layout thrashing or jank during scroll.
- **SC-003**: The section strictly adheres to the "Otulenie Calm" palette and typography rules.
- **SC-004**: Readability is maintained; contrast between the dark background and text meets accessible reading standards (e.g., WCAG AA).
