# Tasks: Sticky Stacking Archive

**Input**: Design documents from `/specs/013-stacking-services/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Tests**: Manual verification in browser (desktop & mobile 390px) as per quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Verify GSAP and ScrollTrigger are available in `package.json`
- [ ] T002 Gather or select Unsplash image URLs for the 3 cards (images matching "Relaks", "Uważność", "Regeneracja")

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T003 Create `StackingArchive` container component in `src/App.jsx` with appropriate section padding
- [ ] T004 Define the data structure for the 3 hardcoded cards based on `copy.md` and `data-model.md`
- [ ] T005 Setup basic GSAP ScrollTrigger configuration within a `useGSAP` hook in `StackingArchive`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Discovering Core Values through Stacking Cards (Priority: P1) 🎯 MVP

**Goal**: Implement the scroll-linked stacking effect for the 3 protocol cards.

**Independent Test**: Scroll through the section on desktop; verify cards pin (sticky) and previous cards scale down/darken.

### Implementation for User Story 1

- [ ] T006 Implement `StackingCard` component markup and basic styling in `src/App.jsx`
- [ ] T007 Apply CSS `position: sticky` and `top` offsets to `StackingCard` to achieve overlapping stacking
- [ ] T008 [US1] Create GSAP ScrollTrigger timeline to interpolate `scale` (e.g., 1 -> 0.95) and `brightness` (e.g., 1 -> 0.6) for covered cards
- [ ] T009 [US1] Map card visual properties (colors, fonts) to Tailwind v4 @theme tokens (Moss, Linen, Olive)
- [ ] T010 [US1] Ensure the noise overlay is correctly layered or inherited for the new section

**Checkpoint**: User Story 1 is functional and testable independently on desktop.

---

## Phase 4: User Story 2 - Digesting Protocols on Mobile (Priority: P2)

**Goal**: Ensure the stacking experience is seamless and legible on mobile viewports.

**Independent Test**: Verify layout and animation on 390px viewport; check `prefers-reduced-motion` fallback.

### Implementation for User Story 2

- [ ] T011 Update `StackingCard` layout for mobile (vertical stacking, adjusted padding, font sizes)
- [ ] T012 Calibrate ScrollTrigger "start" and "end" markers specifically for mobile scroll speeds
- [ ] T013 Implement `prefers-reduced-motion` guard using `window.matchMedia` or GSAP MatchMedia to disable stacking/scaling
- [ ] T014 Ensure touch targets are prioritized and text remains readable on 390px width

**Checkpoint**: User Story 2 is functional and compliant with mobile-first constraints.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final touches and documentation.

- [ ] T015 Verify 60fps performance during scroll animations on mobile and desktop
- [ ] T016 Run `quickstart.md` validation steps
- [ ] T017 [P] Update `walkthrough.md` with implementation results and screenshots
- [ ] T018 Final code cleanup (variable naming, GSAP context cleanup)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories.
- **User Story 1 (P1)**: Depends on Foundational phase completion.
- **User Story 2 (P2)**: Depends on US1 completion (as it refines US1 for mobile).
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **US1**: Core functionality.
- **US2**: Mobile refinement and a11y.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T017 (Walkthrough) can be prepared in parallel once implementation is nearing completion.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Setup container and data.
2. Implement sticky stacking and basic GSAP depth effect.
3. Validate on desktop.

### Incremental Delivery

1. Add mobile responsiveness (US2).
2. Add accessibility guards (US2).
3. Final polish and performance check.
