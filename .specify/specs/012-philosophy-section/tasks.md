---
description: "Task list for Philosophy Manifesto Section implementation"
---

# Tasks: Philosophy Manifesto Section

**Input**: Design documents from `/specs/012-philosophy-section/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

## Phase 1: Setup

Purpose: Project initialization and basic structure

(Project already initialized by previous branches)

- [x] T001 Verify project dependencies (`@gsap/react`, `gsap`, `lucide-react`) and update if missing

---

## Phase 2: Foundational (Blocking Prerequisites)

Purpose: Core infrastructure that MUST be complete before ANY user story can be implemented

(Global components already exist, creating scaffolding)

- [x] T002 Scaffold layout for Philosophy Manifesto section inside `src/App.jsx`
- [x] T003 Ensure "Otulenie Calm" color tokens (Forest Moss, Linen) are available in `src/index.css` overrides if needed

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Discovering the Brand Philosophy (Priority: P1) 🎯 MVP

**Goal**: As a prospective client browsing the homepage, I want to read the brand's philosophy manifesto presented in a visually engaging, premium way, so that I understand Otulenie's unique approach to wellness.

**Independent Test**: Can be fully tested by scrolling to the section and verifying the dark theme, layout structure, and copy readability across device sizes.

### Implementation for User Story 1

- [x] T004 [P] [US1] Build static semantic markup for Manifesto Section in `src/App.jsx`
- [x] T005 [US1] Apply Tailwind CSS utility classes for dark theme (Moss background, Linen text) in `src/App.jsx`
- [x] T006 [US1] Format typography structure aligning with design.md rules: implement a smaller, neutral industry statement followed by a massive, serif italic brand focus statement with an accent-colored keyword in `src/App.jsx`
- [x] T007 [US1] Apply responsive utility classes ensuring vertical stacking and readability on mobile viewports (< 768px) in `src/App.jsx`
- [x] T008 [US1] Verify the global SVG noise overlay is consistently applied across the section in `src/App.jsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently (static layout complete).

---

## Phase 4: User Story 2 - Experiencing Premium Micro-interactions (Priority: P2)

**Goal**: As a prospective client, I want to experience smooth parallax effects and text reveal animations as I scroll, so that the website feels like a deeply relaxing, high-end digital instrument.

**Independent Test**: Can be tested by scrolling slowly through the section and observing the text reveal and parallax effects on different devices.

### Implementation for User Story 2

- [x] T009 [P] [US2] Create abstract/soft gradient background shapes in `src/App.jsx` for the parallax effect, placed behind content (`-z-10`)
- [x] T010 [US2] Implement text splitting structure (e.g., using `SplitType` or custom React structure) wrapping lines in `overflow-hidden` spans in `src/App.jsx`
- [x] T011 [US2] Set up `useGSAP` context and ScrollTrigger for the background parallax effect (`scrub: true`, `yPercent` translations) in `src/App.jsx`
- [x] T012 [US2] Create staggered slow reveal GSAP timeline for the text lines triggered by scroll in `src/App.jsx`
- [x] T013 [US2] Implement `prefers-reduced-motion` check to conditionally disable animation sequences and render static text instead in `src/App.jsx`

**Checkpoint**: At this point, both user stories are functional and interactive elements animate smoothly.

---

## Phase 5: Polish & Cross-Cutting Concerns

Purpose: Improvements that affect multiple user stories

- [x] T014 Review 60fps performance and layout stability during scroll actions in `src/App.jsx`
- [x] T015 Verify color contrast (WCAG 2.2 AA) for the dark background and text combinations
- [x] T016 Execute `quickstart.md` validation, including testing on mobile layout (width: 390px)
- [x] B033 Fix singular voice and font clipping in `App.jsx`

---

## Phase 6: Bug Fixes

- [x] B033 [Implementation]: Resolve voice consistency (singular) and font clipping (vertical/horizontal) in `App.jsx`

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Phase 3 (US1) must complete basic layout before Phase 4 (US2) can target elements for GSAP animations
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- Content layout (T004) and background shape creation (T009) can be drafted simultaneously.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently
3. Add User Story 2 → Test independently
4. Each story adds value without breaking previous stories
