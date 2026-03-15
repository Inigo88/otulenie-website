# Tasks: Interactive Features Cards

**Input**: Design documents from `/specs/008-features-cards/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: Manual visual regression & accessibility validation (no automated tests requested).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Default Structure**: `src/App.jsx`, `src/index.css`
- **Component Breakout**: `src/components/FeatureCards/` (established in plan.md)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create directory `src/components/FeatureCards/` following project structure
- [x] T002 [P] Update `src/App.jsx` to import and scaffold the `<FeatureCards />` section

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 [P] Implement `src/components/FeatureCards/FeatureCards.jsx` as a responsive grid container
- [x] T004 [P] Define "Otulenie Calm" palette specific variables and card hover lift styles in `src/index.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Diagnostic Shuffler (Priority: P1) 🎯 MVP

**Goal**: Implement a passive loop of 3 overlapping cards cycling massage recommendations to reduce user indecision.

**Independent Test**: Observe the Shuffler card cycle through the stack vertically and verify it uses the required `cubic-bezier(0.34, 1.56, 0.64, 1)` transition.

### Implementation for User Story 1

- [x] T005 [P] [US1] Define `MassageRecommendation` static data in `src/components/FeatureCards/DiagnosticShuffler.jsx`
- [x] T006 [US1] Build static markup for vertical overlapping cards in `src/components/FeatureCards/DiagnosticShuffler.jsx`
- [x] T007 [US1] Implement automatic vertical loop with `cubic-bezier(0.34, 1.56, 0.64, 1)` in `src/components/FeatureCards/DiagnosticShuffler.jsx` using `useGSAP`
- [x] T008 [US1] Add hover pause and link "Zarezerwuj" button to Booksy in `src/components/FeatureCards/DiagnosticShuffler.jsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 3 - Cursor Protocol Scheduler (Priority: P1)

**Goal**: Visualize booking intent through an animated SVG cursor interaction with a weekly grid.

**Independent Test**: Verify the SVG cursor moves to a day cell, performs a visual `scale(0.95)` click, and highlights a "Save" button before redirecting.

### Implementation for User Story 3

- [x] T009 [P] [US3] Define weekly schedule mock data (Mon-Sun, 17-22/9-22) in `src/components/FeatureCards/CursorProtocolScheduler.jsx`
- [x] T010 [US3] Build weekly grid and animated SVG cursor markup in `src/components/FeatureCards/CursorProtocolScheduler.jsx`
- [x] T011 [US3] Implement GSAP sequence: Cursor Enter → Select Day → Scale(0.95) Click → Highlight Save in `src/components/FeatureCards/CursorProtocolScheduler.jsx`
- [x] T012 [US3] Map intent interactions to Booksy redirect in `src/components/FeatureCards/CursorProtocolScheduler.jsx`

**Checkpoint**: At this point, User Story 3 should be fully functional and testable independently

---

## Phase 5: User Story 2 - Telemetry Typewriter (Priority: P2)

**Goal**: Build trust through a dynamic "technical" data capture monospace live-text feed.

**Independent Test**: Observe typewriter correctly cycles business stats and displays the blinking Soft Olive (#6E8068) cursor.

### Implementation for User Story 2

- [x] T013 [P] [US2] Define `BusinessTelemetry` static data in `src/components/FeatureCards/TelemetryTypewriter.jsx`
- [x] T014 [US2] Build monospace live-feed markup with pulsing dot label in `src/components/FeatureCards/TelemetryTypewriter.jsx`
- [x] T015 [US2] Implement typing animation (50ms type, 15ms delete, 2s pause) with blinking Soft Olive cursor in `src/components/FeatureCards/TelemetryTypewriter.jsx`

**Checkpoint**: All three user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T016 [P] Implement `prefers-reduced-motion` logic to disable/simplify animations in all card components
- [x] T017 [P] Verify all interactive targets are at least 24x24px for accessibility (WCAG SC 2.5.8)
- [x] T018 Run final validation against `quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-5)**: All depend on Foundational phase completion
  - US1 and US3 (P1) should be prioritized over US2 (P2)
  - Stories can then proceed in parallel
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Example: User Story 1

```bash
# Launch layout tasks for User Story 1 together:
Task: "Define static data and build markup for Shuffler"

# Launch animation task after layout is ready:
Task: "Implement vertical GSAP loop with spring easing"
```

---

## Implementation Strategy

### MVP First (User Story 1 & 3)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL)
3. Complete Phase 3: User Story 1 (P1)
4. Complete Phase 4: User Story 3 (P1)
5. **STOP and VALIDATE**: Verify conversion-critical components

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Commit after each task or story completion
