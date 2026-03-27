# Tasks: Floating Island Navbar

**Input**: Design documents from `/specs/005-navbar/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: No automated tests requested in specification. Verification will be performed manually per User Story "Independent Test" criteria and using `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Default Structure**: `src/App.jsx`, `src/index.css`
- **Component Breakout**: `src/components/Navbar.jsx`, `src/components/MagneticButton.jsx`, `src/components/RoundedContainer.jsx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and component extraction for cleaner architecture.

- [ ] T001 Extract `MagneticButton` and `RoundedContainer` from `src/App.jsx` into separate files in `src/components/`
- [ ] T002 Create `src/components/Navbar.jsx` as a new component placeholder

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core logic and state management that MUST be complete before user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T003 Define `Navbar` state logic (`isHero`, `isIsland`, `isMobileMenuOpen`) and basic markup structure in `src/components/Navbar.jsx`
- [ ] T004 Setup GSAP `ScrollTrigger` in `src/App.jsx` to toggle `isHero`/`isIsland` states at 80px scroll threshold

**Checkpoint**: Foundation ready - Navbar can now respond to scroll and manage internal state.

---

## Phase 3: User Story 1 - At-Home Landing (Priority: P1) 🎯 MVP

**Goal**: As a site visitor, when I first land, I want to see a clear, elegant transparent navbar.

**Independent Test**: Landing on the site shows the navbar at the top with a transparent background and white/light text.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Implement `Navbar` container with `fixed` top positioning and Hero state CSS (transparent bg, moss/white text) in `src/components/Navbar.jsx`
- [ ] T006 [P] [US1] Create internal `NavLink` sub-component reusing the extracted `MagneticButton` in `src/components/Navbar.jsx`
- [ ] T007 [US1] Populate `Navbar` with "Oferta", "O mnie", "FAQ" links and "Rezerwacja" pill button in `src/components/Navbar.jsx`
- [ ] T008 [US1] Integrate the `Navbar` component into `src/App.jsx` and verify the initial landing state

**Checkpoint**: At this point, User Story 1 (Landing Navbar) is fully functional and visible.

---

## Phase 4: User Story 2 - Morphing on Scroll (Priority: P1)

**Goal**: As I scroll down, the navbar morphs into a solid, readable pill-shaped island.

**Independent Test**: Scroll down 100px; the navbar background transitions to semi-transparent linen with a backdrop blur.

### Implementation for User Story 2

- [ ] T009 [US2] Implement "Island" state styles (rounded-full, bg-linen/70, backdrop-blur-md) in `src/components/Navbar.jsx`
- [ ] T010 [US2] Add GSAP animation logic to `Navbar` for smooth morphing (shrinking height/width) and color transitions in `src/components/Navbar.jsx`

**Checkpoint**: User Stories 1 AND 2 should now work together (morphing behavior verified).

---

## Phase 5: User Story 3 - Mobile Navigation (Priority: P2)

**Goal**: A condensed hamburger menu for mobile that opens a full-screen navigation overlay.

**Independent Test**: Resize to 390px; navbar shows hamburger. Tap it; full-screen linen overlay with centered links appears.

### Implementation for User Story 3

- [ ] T011 [P] [US3] Implement mobile hamburger trigger using Lucide `Menu` / `X` icons in `src/components/Navbar.jsx`
- [ ] T012 [P] [US3] Implement full-screen `MobileOverlay` with semi-transparent linen background and centered links in `src/components/Navbar.jsx`
- [ ] T013 [US3] Connect `isMobileMenuOpen` state to trigger/overlay and verify responsiveness on 390px viewport

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality audit.

- [ ] T014 Ensure keyboard focus rings and accessibility (ARIA labels) for all `Navbar` links in `src/components/Navbar.jsx`
- [ ] T015 Perform final responsive audit and cleanup GSAP contexts (using `useGSAP` hook) in `src/components/Navbar.jsx` and `src/App.jsx`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Stories (Phase 3-5)**: All depend on Phase 2 completion.
  - US1 (P1) is the MVP and should be completed first.
  - US2 (P1) and US3 (P2) can proceed after US1.
- **Polish (Phase 6)**: Depends on all user stories being complete.

### Implementation Strategy

1. **MVP (US1)**: Complete Setup, Foundational, and US1. Stop and verify landing state.
2. **Incremental**: Add scroll morphing (US2), then mobile navigation (US3).
3. **Polish**: Final accessibility and performance audit.

---

## Parallel Example: Navbar Components

```text
# Parallelizable Setup (Phase 1):
Task: "Extract MagneticButton" (T001)
Task: "Create Navbar.jsx placeholder" (T002)

# Parallelizable Story Elements (Phase 3):
Task: "Implement Navbar Container" (T005)
Task: "Create NavLink Sub-component" (T006)
```
