# Feature Specification: Featured Testimonials Section

**Feature Branch**: `019-testimonials`  
**Created**: 2026-03-27  
**Status**: Finalized  
**Input**: User description: "Implement Featured Testimonials section: Create a premium, GSAP-animated section for client reviews with subtle branding and cinematic layout."

## Clarifications

### Session 2026-03-27
- Q: Data Source & Curation → A: Use extracted Booksy reviews (Name, Stars, Text) and omit the 'context' field.
- Q: Desktop Layout → A: Show 3 testimonials at once with the ability to iterate/scroll through more (Slider/Carousel).
- Q: Slider Navigation → A: Auto-play with Pause (No visible buttons).
- Q: Star Rating Aesthetics → A: Use Olive (#6E8068) for star icons.
- Q: Manual Slider Navigation → A: Strictly auto-play and pause on hover (no manual control).
- Q: Desktop Slide Increment → A: Advance one by one (smoother transition).
- Q: Star Rating Style → A: Solid (Filled) star icons.
- Q: Mobile Display → A: One testimonial at a time (slider) instead of stacking.
- Q: Background Styling → A: Subtle Background Gradient instead of flat Linen.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Viewing Social Proof (Priority: P1)

As a prospective client, I want to read authentic testimonials from other clients (e.g., busy mothers, office workers) so that I feel confident in the quality and professionalism of the Otulenie mobile massage service.

**Why this priority**: Building trust is a core requirement for a mobile service where a practitioner enters the client's home. Social proof is a primary conversion driver.

**Independent Test**: Can be fully tested by scrolling to the Testimonials section and verifying that the reviews are visible and legible.

**Acceptance Scenarios**:

1. **Given** the landing page is loaded, **When** I scroll to the Testimonials section, **Then** I should see featured reviews with client names and context.
2. **Given** a high-density (Retina) display, **When** I view the testimonials, **Then** the typography and branding elements must remain crisp and premium.

---

### User Story 2 - Premium Interactive Experience (Priority: P2)

As a visitor, I want the testimonials to be presented with smooth, cinematic animations so that the website maintains its high-end, relaxing brand identity.

**Why this priority**: Polish and aesthetics are key brand differentiators for Otulenie. Standard, static lists would violate the "Cinematic Landing Page" goal.

**Independent Test**: Can be tested by observing the scroll-triggered reveal animations of each testimonial card using Chrome DevTools (performance tab).

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** I scroll to the section, **Then** the testimonials should reveal themselves sequentially using a staggered GSAP fade-up effect.
2. **Given** a desktop viewport, **When** I hover over a testimonial card, **Then** it should have a subtle aesthetic response (e.g., slight lift or highlight) consistent with existing magnetic components.

---

### Edge Cases

- **Long Content**: Testimonials with varying lengths (50 to 300 characters) must maintain visual balance and layout integrity.
- **Low Connectivity**: Text should be legible even if heavy assets (if any) are slow to load.
- **Reduced Motion**: If the user has `prefers-reduced-motion` enabled, animations MUST be replaced with instant visibility or simple opacity fades.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a dedicated section titled "Głosy spokoju" using the `Fraunces` or `Cormorant Garamond` serif fonts.
- **FR-002**: System MUST implement GSAP `ScrollTrigger` to reveal testimonial cards as they enter the viewport.
- **FR-003**: System MUST use the "Otulenie Calm" palette: `#374833` (Moss) for backgrounds or text accents, and a subtle gradient (`#fdfaf0` Linen to `#F5F1E6` Light Linen) for the section background.
- **FR-004**: System MUST apply a 0.05 opacity noise overlay globally over the section.
- **FR-005**: Testimonial cards MUST use `backdrop-blur-md` and 60-80% opacity, per project rules.
- **FR-006**: System MUST implement a horizontal slider for mobile and tablet viewports (viewport width < 1024px), displaying exactly 1 item at once.
- **FR-007**: System MUST implement a horizontal slider for desktop viewports (viewport width >= 1024px), displaying exactly 3 items at once.
- **FR-008**: Slider MUST automatically rotate through all available testimonials (auto-play) and pause on hover.
- **FR-009**: System MUST use the color Olive (#6E8068) for the 5-star rating icons.
- **FR-010**: System MUST NOT include external links (Booksy or other) for individual testimonials.
- **FR-011**: System MUST NOT use background imagery or lifestyle photography for this section.

### Key Entities *(include if feature involves data)*

- **Testimonial**:
  - `content`: The review text.
  - `author`: Name of the client.
  - `rating`: Star rating (1-5).
  - `id`: Unique identifier for DOM targeting.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Performance: Scroll animations maintain 60fps on modern mobile and desktop browsers.
- **SC-002**: Accessibility: All text meets WCAG AA contrast ratios (e.g., Linen on Moss or vice versa).
- **SC-003**: Responsiveness: Testimonials are perfectly centered and legible on a 390px width viewport.
- **SC-004**: Visual Consistency: Component corner radii and spacing strictly follow the `RoundedContainer` pattern established in `Feature 1.1.3`.

