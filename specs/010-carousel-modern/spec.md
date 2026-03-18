# Feature Specification: Carousel Modernization

**Feature Branch**: `010-carousel-modern`  
**Created**: 2026-03-18  
**Status**: Specified  
**Builds on**: [009 spec.md](../009-massage-types-carousel/spec.md)  
**Input**: Comprehensive analysis of shipped `MassageCarousel` component — identified bug regressions, constitution violations, and UX modernization opportunities.

## Context & Dependencies

This feature is strictly governed by the following context documents:
- **Massage Descriptions**: [.specify/context/massage-descriptions.md](../../.specify/context/massage-descriptions.md) — Source of truth for all Polish marketing copy, pricing, and durations.
- **Project Constitution**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) — Governing rules for GSAP animations, images, accessibility, and copy voice.
- **Bug Reports**: [B028](../bugs/009-massage-types-carousel/B028-autorotation-broken.md), [B029](../bugs/009-massage-types-carousel/B029-dot-navigation-wrong-target.md), [B030](../bugs/009-massage-types-carousel/B030-dot-desync-after-drag.md), [B031](../bugs/009-massage-types-carousel/B031-no-keyboard-navigation.md)

## Bug Fixes (P1/P2 — Must Ship)

The following bugs were found in the shipped carousel and must be resolved in this feature branch.

### B028 — Auto-Rotation Never Fires (P1)

Auto-rotation silently does nothing because the `ScrollTrigger.isActive` gate always resolves to `false`. Users never see the intended 5-second rotation.

**Fix**: Replace the `ScrollTrigger.getAll().find(...)` gate with a stable `isInViewRef` boolean, updated via `ScrollTrigger`'s `onEnter` / `onLeave` callbacks.

### B029 — Dot Navigation Targets Wrong Card (P1)

The `handleDotClick` formula divides `scrollWidth` (which includes clone widths) by `DISPLAY_DATA.length` (7), causing navigation to overshoot or undershoot the intended card.

**Fix**: Compute `targetX` from each card's actual `offsetLeft` (same approach as `getXForIndex`), extracted into a shared ref-based helper accessible from both `useGSAP` and `handleDotClick`.

### B030 — Active Dot Desync After Drag Inertia (P2)

After a drag and inertia throw, the carousel settles on a new card but the active pagination dot remains on the previous index. `onThrowComplete` is missing from the `Draggable` configuration.

**Fix**: Add `onThrowComplete` to `Draggable.create()`. On completion, calculate the nearest card index from the final `x` value and update `setActiveSlide`.

### B031 — No Keyboard Navigation (P2 / WCAG SC 2.1.1)

The carousel cannot be traversed via keyboard Arrow keys, violating Constitution Principle VI (WCAG 2.2 Level AA). Users without a mouse or touch device cannot navigate between cards.

**Fix**: Add `onKeyDown` handler on the carousel track container — `ArrowLeft` navigates to the previous card, `ArrowRight` to the next, both via `handleDotClick`. Container must have `role="region"`, `aria-label="Oferta"`, and `tabIndex={0}`.

---

## Constitution Violation Fixes (Must Ship)

### V-001 — Pronoun in Heading (Principle VII)

The section heading reads `"Nasza Oferta"`, violating Principle VII (solo voice, neutral naming).  
**Fix**: Change to `"Oferta"`.

### V-002 — Auto-Rotation Interval (FR-004.1)

Auto-rotation is coded at `3000ms`; the spec requires `5000ms`.  
**Fix**: Update `setInterval` to `5000`.

### V-003 — No Real Images on Cards (Technical Constraints)

Cards are plain white text-only boxes. The constitution requires real Unsplash URLs matching each card's `imageMood`.  
**See FR-008 below.**

### V-004 — No `prefers-reduced-motion` Guard (Principle VI)

All animations fire unconditionally.  
**See NFR-001 below.**

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visual Immersion via Image Cards (Priority: P1)

As a potential client browsing services, I want to see each massage type presented with a real photographic image so that I can immediately connect emotionally with the service before reading the details.

**Acceptance Scenarios**:
1. **Given** the user views the "Oferta" section, **When** a card is visible, **Then** a real photograph fills the top of the card, matching the massage atmosphere (e.g., a warm candlelight ambience for "Ciepłe Otulenie").
2. **Given** the image is overlaid with text, **When** the user reads the card, **Then** the text maintains a 4.5:1 contrast ratio against the image and gradient overlay.

---

### User Story 2 — Clear Active Card Focus (Priority: P2)

As a user browsing the carousel, I want to clearly see which card is currently in focus so that I understand where I am in the sequence.

**Acceptance Scenarios**:
1. **Given** the carousel is displayed, **When** a card is the active card, **Then** it is rendered at full scale and elevated shadow depth; adjacent cards appear smaller and slightly transparent.
2. **Given** the user navigates to a new card, **When** the transition completes, **Then** the focus style (scale/shadow) immediately reflects the newly active card.

---

### User Story 3 — Keyboard-Navigable Carousel (Priority: P2)

As a keyboard-only user, I want to navigate between massage cards using Arrow keys so that I can browse the full offer without a mouse.

**Acceptance Scenarios**:
1. **Given** the carousel section is focused (Tab to reach it), **When** the user presses `ArrowRight`, **Then** the carousel advances to the next card.
2. **Given** the carousel section is focused, **When** the user presses `ArrowLeft`, **Then** the carousel goes to the previous card.

---

### User Story 4 — Motion-Respectful Experience (Priority: P1)

As a user with vestibular sensitivity, I want animations to be suppressed when I have indicated a preference for reduced motion in my OS settings.

**Acceptance Scenarios**:
1. **Given** `prefers-reduced-motion: reduce` is active, **When** the page loads, **Then** no slide, entrance, or auto-rotation animation plays.
2. **Given** `prefers-reduced-motion: reduce` is active, **When** the user clicks a pagination dot, **Then** the carousel snaps to the target card instantly (no easing/duration).

---

### Edge Cases

- **Drag inertia lands between two cards**: After a throw, the carousel must snap to the nearest card and update the active dot.
- **Keyboard focus leaves section**: Focus moving away from the carousel via Tab must not trigger any carousel interaction.
- **Network-slow image load**: Cards must display a linen-colored (`#fdfaf0`) placeholder background while Unsplash images load, with no layout shift.

---

## Requirements *(mandatory)*

### Functional Requirements (New / Updated)

- **FR-008**: Each card MUST display a real photographic cover image sourced from Unsplash, matching the card's `imageMood` attribute, occupying the top ≈55% of the card with a gradient overlay fading to the card's background color.
- **FR-008.1**: The image gradient overlay MUST ensure a minimum 4.5:1 contrast ratio for all overlaid text (WCAG SC 1.4.3).
- **FR-009**: The active carousel card MUST be visually distinguished via `scale(1.0)` and elevated shadow. Inactive visible cards MUST render at `scale(0.95)` and `opacity: 0.70`. Transitions between focus states animate at 300ms `power2.out`.
- **FR-010**: The section heading MUST read **"Oferta"** — no possessive pronoun.
- **FR-011**: The carousel track container MUST support keyboard navigation: `ArrowLeft` → previous card, `ArrowRight` → next card. Container has `role="region"`, `aria-label="Oferta"`, `tabIndex={0}`.
- **FR-012**: Cards MUST reveal with a GSAP staggered entrance animation (50ms stagger, `y: 30 → 0`, `opacity: 0 → 1`) when the section first enters the viewport.
- **FR-013**: Auto-rotation MUST fire at a **5-second** interval (corrected from 3s), pausing on hover or manual interaction.

### Non-Functional Requirements (New)

- **NFR-001**: When `prefers-reduced-motion: reduce` is active, ALL carousel animations (entrance, slide transitions, auto-rotation) MUST be replaced with instant, imperceptible transitions or disabled entirely.

### Carried-Forward Requirements (Unchanged)

- **FR-001**: 5 cards (4 massage types + consultation fallback) rendered responsively.
- **FR-001.1**: Drag + touch/swipe navigation with infinite wrap.
- **FR-001.2**: Pagination dots reflecting active slide.
- **FR-002**: Polish descriptions from `massage-descriptions.md`.
- **FR-003**: Name, duration, and price displayed per card.
- **FR-005**: "Otulenie Calm" palette enforced globally.
- **FR-006**: Magnetic hover `scale(1.03)` on CTA button.
- **FR-007**: 0.05 opacity SVG noise overlay on section.

---

## Key Entities

- **Massage Type**: `id`, `name`, `type`, `duration`, `price`, `description`, `booksyUrl`, `imageMood`, **`imageUrl`** *(new field — real Unsplash URL)*.

---

## Success Criteria *(mandatory)*

| ID | Criterion |
|---|---|
| SC-001 | Carousel is fully responsive on mobile (touch/swipe) and desktop (drag/dots/keyboard). |
| SC-002 | All transitions render at consistently ≥60fps in DevTools. |
| SC-003 | 100% of text content is in Polish, matching `massage-descriptions.md`. |
| SC-004 | Each "Zarezerwuj" CTA opens Booksy in a new tab. |
| SC-005 | Auto-rotation fires every **5 seconds** when the section is in view; pauses on hover/interaction. |
| SC-006 | Keyboard `ArrowLeft`/`ArrowRight` navigate between cards when the section is focused. |
| SC-007 | All GSAP animations are disabled/instant when `prefers-reduced-motion: reduce` is active. |
| SC-008 | Real photographic Unsplash images appear on all 5 cards with no layout shift on load. |
| SC-009 | Active card is visually distinguished (scale/shadow/opacity) from adjacent cards at all times. |
| SC-010 | Section heading reads "Oferta" with no possessive pronoun. |
