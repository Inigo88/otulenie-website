# Feature Specification: Hero Section

**Feature Branch**: `007-hero-section`  
**Created**: 2026-03-13  
**Status**: Finalized  
**Input**: User description: "Create a full-height hero section leveraging a dark gradient overlay and staggered GSAP fade-up text animations."

## Clarifications

### Session 2026-03-13
- Q: What is the core brand messaging we should use for the Hero section? → A: Option A (Headline: "Relaks, który przyjeżdża do Ciebie", Subheadline: "Profesjonalny masaż mobilny we Wrocławiu. Poczuj spokój w zaciszu własnego domu.")
- Q: What should the visual "vibe" of the background image be? → A: Option B (Grounding Wellness: Warm wood textures, linen fabrics, gentle natural light, organic elements)
- Q: Should the Navbar be visible immediately when the user lands on the Hero section? → A: Option B (Delayed Reveal: Navbar appears after Hero animations or on first scroll)
- Q: Which event should be the primary trigger for revealing the Navbar? → A: Option A (Hero Completion: Navbar fades in ~0.5s after the CTA button finishes its entrance via `onHeroComplete`)


### User Story 1 - Cinematic First Impression (Priority: P1)

As a site visitor, I want to be greeted by a premium, calm, and professional Hero section that establishes the brand's aesthetic immediate upon landing.

**Why this priority**: The Hero section is the "handshake" of the brand and the primary trust-building element.

**Independent Test**: Can be tested by loading the homepage or a dedicated preview and observing the layout and animations.

**Acceptance Scenarios**:

1. **Given** the user lands on the homepage, **When** the page loads, **Then** the Hero section should fill the entire viewport height.
2. **Given** the page has loaded, **When** the content appears, **Then** the headline and subheadline should use a staggered fade-up animation.
3. **Given** the background is present, **When** viewed on any device, **Then** a dark gradient overlay must ensure the white/linen text remains legible.

---

### User Story 2 - High-Conversion CTA (Priority: P1)

As a busy client, I want to be able to immediately book a massage from the Hero section without scrolling.

**Why this priority**: Supports the primary business goal of conversion.

**Independent Test**: Clicking the Hero CTA should navigate to the Booksy link.

**Acceptance Scenarios**:

1. **Given** the Hero section is visible, **When** the user clicks the "Zarezerwuj masaż" button, **Then** they should be redirected to the configured Booksy platform.

---

### Edge Cases

- **Mobile Viewports**: Ensure the full-height (100vh/100dvh) implementation doesn't cause layout shifting on mobile browsers with dynamic addresses bars.
- **Reduced Motion**: If a user has `prefers-reduced-motion` enabled, animations should be simplified or disabled to maintain accessibility.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render the Hero section with a full viewport height (`min-h-screen` or `min-h-[100dvh]`).
- **FR-002**: System MUST apply a dark gradient overlay (`bg-gradient-to-b from-black/40 to-black/20` or similar) to the background to ensure text contrast.
- **FR-003**: System MUST implement staggered GSAP animations for the headline, subheadline, and CTA button.
- **FR-004**: System MUST include a primary headline (H1: "Relaks, który przyjeżdża do Ciebie") and a descriptive subheadline ("Profesjonalny masaż mobilny we Wrocławiu. Poczuj spokój w zaciszu własnego domu.").
- **FR-005**: System MUST include a prominent "Zarezerwuj masaż" CTA button using the `MagneticButton` component.
- **FR-006**: System MUST use a high-fidelity static background image with a "Grounding Wellness" vibe (warm wood, linen, natural light). It must include appropriate focal points for both desktop and mobile.
- **FR-007**: System MUST delay the reveal of the Navbar (Floating Island) until the Hero section animations are complete. Specifically, the Navbar should fade in ~0.5s after the final Hero element (the CTA button) finishes its entrance, triggered by the `onHeroComplete` callback.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Hero text becomes visible and finishes animation within 1.5 seconds of page load.
- **SC-002**: Text contrast ratio meets WCAG AA standards (at least 4.5:1) against the background.
- **SC-003**: The section adapts layout seamlessly between 375px and 1920px widths.
- **SC-004**: Cumulative Layout Shift (CLS) for the Hero section is below 0.1.
