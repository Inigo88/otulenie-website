# Tasks: Base Interactive UI Components

**Input**: Design documents from `/specs/004-base-components/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Manual verification is required as per research.md. No automated test harness is currently configured.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Default Structure**: `src/App.jsx`, `src/index.css`, `src/main.jsx`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic registration

- [x] T001 Verify `gsap` and `@gsap/react` installation in `package.json`
- [x] T002 Register GSAP plugins in `src/main.jsx` using `gsap.registerPlugin()`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core CSS tokens and global structure

**⚠️ CRITICAL**: Must complete before starting component implementation

- [x] T003 [P] Define "Otulenie Calm" palette tokens (`moss`, `linen`, `olive`) in `src/index.css` using Tailwind v4 `@theme`
- [x] T004 Add global noise overlay CSS utility in `src/index.css` (0.05 opacity feTurbulence)
- [x] T005 [P] Setup base layout wrapper in `src/App.jsx` to host component demos

**Checkpoint**: Foundation ready - component implementation can now begin

---

## Phase 3: User Story 1 - Magnetic Interaction (Priority: P1) 🎯 MVP

**Goal**: Buttons react to cursor with a subtle magnetic pull and P1 brand scaling

**Independent Test**: Hover over a `MagneticButton` on desktop; it should shift towards cursor and scale to 1.03.

### Implementation for User Story 1

- [x] T006 [US1] Scaffold `MagneticButton` React component in `src/App.jsx` with basic props
- [x] T007 [US1] Implement `useGSAP()` with `gsap.quickTo` for hardware-accelerated X/Y transforms
- [x] T008 [US1] Apply dampening logic (0.4 strength) to match cursor offset (30-50% range)
- [x] T009 [US1] Add `scale(1.03)` and `cubic-bezier` easing on hover interaction
- [x] T010 [US1] Implement mouse leave cleanup to reset button to center smoothly

**Checkpoint**: User Story 1 is functional for desktop hover interactions

---

## Phase 4: User Story 2 - Atmospheric Containers (Priority: P1)

**Goal**: Content housed in soft, rounded, semi-transparent containers

**Independent Test**: Content inside `RoundedContainer` should have a blurred, linen-colored background and 2-3rem corners.

### Implementation for User Story 2

- [x] T011 [US2] Scaffold `RoundedContainer` React component in `src/App.jsx`
- [x] T012 [US2] Apply semi-transparent linen background (60-80% opacity) and `backdrop-blur-md` via Tailwind
- [x] T013 [US2] Implement standard `border-radius` (2rem default) and layout padding
- [x] T014 [US2] Ensure containers maintain consistent spacing when stacked in `App.jsx`

**Checkpoint**: User Story 2 provides the atmospheric housing for all content

---

## Phase 5: User Story 3 - Responsive Component Scaling (Priority: P2)

**Goal**: Components adapt for mobile usability without losing cinematic feel

**Independent Test**: On a 390px viewport, magnetic effect is disabled, and container padding/radius scales down appropriately.

### Implementation for User Story 3

- [x] T015 [US3] Add media query check (`window.matchMedia('(hover: hover)')`) to `MagneticButton` to disable magnet on touch devices
- [x] T016 [US3] Adjust `RoundedContainer` padding (to `p-6` or `p-8`) and font scales for mobile viewports (390px)
- [x] T017 [US3] Ensure `MagneticButton` uses tap-friendly sizing and scale on press for mobile

**Checkpoint**: All components are fully responsive and cinematic on mobile

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final aesthetic and performance verification

- [x] T018 [P] Audit GSAP implementation for performance (60fps target) using DevTools
- [x] T019 Verify keyboard focus visibility for `MagneticButton`
- [x] T020 Run `quickstart.md` validation by integrating a sample section in `App.jsx`
- [x] T021 [P] Disable magnet and scale effects for users with `prefers-reduced-motion` in `src/App.jsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Stories (Phase 3 & 4)**: Can proceed in parallel once Phase 2 is complete.
- **Responsive (Phase 5)**: Depends on completion of specific component implementation in US1/US2.
- **Polish (Phase 6)**: Final step.

### Parallel Opportunities

- T003 and T005 can be done in parallel.
- Once Foundation is ready, one person could work on `MagneticButton` (US1) while another works on `RoundedContainer` (US2).

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundation.
2. Complete `MagneticButton` (US1) and `RoundedContainer` (US2).
3. **STOP and VALIDATE**: Test both components in `App.jsx` for desktop.

### Incremental Delivery

1. Foundation → Base established.
2. US1 + US2 → Core interaction and layout available.
3. US3 → Mobile optimization complete.
4. Polish → High-fidelity cinematic experience finalized.
