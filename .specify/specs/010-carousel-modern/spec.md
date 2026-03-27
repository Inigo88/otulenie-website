# Feature Specification: Carousel Modernization

**Feature Branch**: `010-carousel-modern`  
**Created**: 2026-03-18  
**Status**: Clarified  
**Builds on**: [009 spec.md](../009-massage-types-carousel/spec.md)  
**Input**: Comprehensive analysis of shipped `MassageCarousel` component — identified bug regressions, constitution violations, and UX modernization opportunities.

## Context & Dependencies

This feature is strictly governed by the following context documents:
- **Massage Descriptions**: [.specify/context/massage-descriptions.md](../../.specify/context/massage-descriptions.md) — Source of truth for all Polish marketing copy, pricing, and durations.
- **Project Constitution**: [.specify/memory/constitution.md](../../.specify/memory/constitution.md) — Governing rules for GSAP animations, images, accessibility, and copy voice.
- **Bug Reports**: [B028](../bugs/009-massage-types-carousel/B028-autorotation-broken.md), [B029](../bugs/009-massage-types-carousel/B029-dot-navigation-wrong-target.md), [B030](../bugs/009-massage-types-carousel/B030-dot-desync-after-drag.md), [B031](../bugs/009-massage-types-carousel/B031-no-keyboard-navigation.md)

## Clarifications

### Session 2026-03-18

- Q: Should each carousel card display a real photographic cover image (Unsplash)? → A: No images on cards. Cards remain text-only.
- Q: What is the hover target for pausing auto-rotation — the entire section, the active card, or any card? → A: Entire section (`mouseenter`/`mouseleave` on the section container).
- Q: Should the active card be visually distinguished via scale/shadow treatment, dots only, or a border highlight? → A: Scale + shadow (active: `scale(1.0)` + elevated shadow; inactive visible: `scale(0.95)`, `opacity: 0.70`).
- Q: Should `imageMood` be kept in `massageData.js` for future use, or removed since cards are now text-only? → A: Remove `imageMood` — unused fields add maintenance noise.
- Q: Should the entrance animation fire once per page load or every time the user scrolls back to the section? → A: Once per page load (tracked via a `hasPlayed` ref; subsequent scroll-ins show no animation).

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

### V-004 — No `prefers-reduced-motion` Guard (Principle VI)

All animations fire unconditionally.  
**See NFR-001 below.**

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Base Service Browsing & Booking (Priority: P1, Carried-Forward)

As a prospective client, I want to scroll through the massage cards, read the descriptions and pricing, and tap a booking CTA, so that I can book the service that fits my needs without leaving the page.

**Acceptance Scenarios**:
1. **Given** the "Oferta" section is visible, **When** I scroll to it, **Then** I can see all 5 cards (4 massage types + consultation fallback) with name, duration, price, and a CTA button.
2. **Given** I tap the "Zarezerwuj" CTA on any card, **When** it is tapped, **Then** the Booksy booking page opens in a new browser tab, preserving my current page context.

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

- **Drag inertia lands between two cards**: After a throw, the carousel must snap to the nearest card and update the active dot. See **SC-010**.
- **Keyboard focus leaves section**: Focus moving away from the carousel via Tab must not trigger any carousel interaction.

---

## Requirements *(mandatory)*

### Functional Requirements (New / Updated)

- **FR-009**: The active carousel card MUST be visually distinguished via `scale(1.0)` and elevated shadow (`box-shadow: 0 20px 60px rgba(55, 72, 51, 0.25)`). Inactive visible cards MUST render at `scale(0.95)` and `opacity: 0.70`. Transitions between focus states MUST animate at 300ms `power2.out` easing.
- **FR-010**: The section heading MUST read **"Oferta"** — no possessive pronoun.
- **FR-011**: The carousel track container MUST support keyboard navigation: `ArrowLeft` → previous card, `ArrowRight` → next card. Container has `role="region"`, `aria-label="Oferta"`, `tabIndex={0}`.
- **FR-012**: Cards MUST reveal with a GSAP staggered entrance animation (`stagger: 0.05s` — intentionally lighter than the design system's 0.15s default to keep the row entrance crisp; `y: 30 → 0`, `opacity: 0 → 1`, `will-change: transform`) the **first time** the section enters the viewport per page load. Subsequent scrolls to the section MUST NOT replay the animation (tracked via a `hasAnimatedRef` boolean).
- **FR-013**: Auto-rotation MUST fire at a **5-second** interval (corrected from 3s), pausing whenever the mouse enters the **entire "Oferta" section** (`mouseenter` on `containerRef`) and resuming on `mouseleave`. It also pauses on any manual interaction (dot click, drag start). After a manual interaction pause, auto-rotation resumes on the next scheduled tick once the hover/interaction state is cleared (i.e., the interval is not reset — the existing tick fires when conditions allow).

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

- **Massage Type**: `id`, `name`, `type`, `duration`, `price`, `description`, `booksyUrl`.

---

## Success Criteria *(mandatory)*

| ID | Criterion |
|---|---|
| SC-001 | Carousel is fully responsive on mobile (touch/swipe) and desktop (drag/dots/keyboard). |
| SC-002 | All transitions render at consistently ≥60fps in DevTools Performance tab during slide transitions. |
| SC-003 | 100% of text content is in Polish, matching `massage-descriptions.md`. |
| SC-004 | Each "Zarezerwuj" CTA opens Booksy in a new tab. |
| SC-005 | Auto-rotation fires every **5 seconds** when the section is in view; pauses on hover/interaction. |
| SC-006 | Keyboard `ArrowLeft`/`ArrowRight` navigate between cards when the section is focused. |
| SC-007 | All GSAP animations are disabled/instant when `prefers-reduced-motion: reduce` is active. |
| SC-008 | Active card is visually distinguished (scale/shadow/opacity) from adjacent cards at all times. |
| SC-009 | Section heading reads "Oferta" with no possessive pronoun. |
| SC-010 | After a drag+inertia throw, the carousel snaps to the nearest card and the active dot updates to match. |
