# Tasks: Wellness Wheel Visual Effect

**Branch**: `011-wellness-wheel`  
**Input**: Design documents from `/specs/011-wellness-wheel/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the environment and prepare CSS 3D foundations.

- [x] T001 Confirm correct branch `011-wellness-wheel` is checked out (`git branch --show-current`)
- [x] T002 Verify that Tailwind CSS v4 is available in `src/index.css` and supports `perspective`, `transform-style`, and `backface-visibility` utilities (add them manually to `@utility` if they are missing from v4 core)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Prepare the DOM for 3D layout, which must exist before GSAP can calculate continuous interpolation.

**⚠️ CRITICAL**: These tasks unblock all subsequent phases.

- [x] T003 Update the outer `<section>` (bound to `containerRef`) in `src/components/MassageCarousel.jsx` to include `perspective-[1000px]` (or equivalent custom class) to anchor the 3D vanishing point.
- [x] T004 Apply `transform-style-preserve-3d` (or equivalent CSS) to the scrollable track `<div>` (`horizontalRef.current`) in `src/components/MassageCarousel.jsx`.
- [x] T005 Apply `backface-visibility-hidden` (or equivalent CSS) to the individual massage card `<div>` elements inside `DISPLAY_DATA.map` in `src/components/MassageCarousel.jsx`.
- [x] T006 Delete the existing `useEffect` in `src/components/MassageCarousel.jsx` that watches `[activeSlide]` and fires binary GSAP `scale/opacity` tweens (removing the old 010 interaction model).

**Checkpoint**: DOM acts as an empty 3D stage. Binary focus logic deleted.

---

## Phase 3: User Story 1 - Immersive Service Discovery (Priority: P1)

**Goal**: Implement the core `updateWheel()` continuous math foundation for the wheel arc, dynamic scaling, and interactive CTA lock.

**Independent Test**: The `updateWheel` function must be able to read track `x` and statically apply size/fading/3D rotation correctly to the cards based on their distance from center.

### US1 Implementation

- [x] T007 [US1] Inside `useGSAP` in `src/components/MassageCarousel.jsx`, write a stable `const updateWheel = () => { ... }` function that begins by calculating the current pixel center of the viewport relative to the track's live `x` translation.
- [x] T008 [US1] Expand `updateWheel`: iterate over all `cardElements`. For each, calculate its absolute distance from the center, map it to a `distanceRatio` (0.0 = center, 1.0 = edge).
- [x] T009 [US1] Expand `updateWheel`: Use GSAP `set()` on each card to apply math-driven `scale` (e.g. 1.0 down to 0.85), `opacity` (1.0 down to 0.4), `y` (0 down to 40px), and `rotationY` (mapped to left/right orientation relative to the viewport).
- [x] T010 [US1] Expand `updateWheel` (CTA guard): If `distanceRatio > 0.1`, apply `pointerEvents: 'none'` to the card to disable Booksy clicks on non-central items; restore `pointerEvents: 'auto'` when centered.
- [x] T011 [US1] Add a click handler to the *outer card container* in `src/components/MassageCarousel.jsx` that triggers `handleDotClick(index)` (so clicking anywhere on peripheral cards centers them, bypassing the disabled CTA).
- [x] T012 [US1] Wrap the entire body of `updateWheel` in an `if (prefersReducedMotion) return;` guard to ensure compliance with NFR-001.
- [x] T013 [US1] Clamp the maximum `rotationY` and minimum `scale` values inside `updateWheel` if `window.innerWidth <= 390` (mobile breakpoint reduction).
- [x] T014 [US1] Add an `onFocus` handler to the mapped card container `<div>` in `src/components/MassageCarousel.jsx` that calls `handleDotClick(index)` to ensure keyboard tabbing automatically centers the newly focused card.

**Checkpoint**: The math foundation exists, keyboard focus drives the wheel, but isn't explicitly tied to drag yet.

---

## Phase 4: User Story 2 - Smooth Interactive Transitions (Priority: P2)

**Goal**: Keep the wheel strictly up-to-date and 60fps-smooth whenever the user drags or whenever GSAP tweens the carousel.

**Independent Test**: Drag the carousel — cards should smoothly morph. Let it auto-rotate — morphs perfectly. Click a dot — morphs perfectly.

### US2 Implementation

- [x] T015 [US2] Hook `updateWheel` into the user drag: inside `Draggable.create()` config in `src/components/MassageCarousel.jsx`, add `onDrag: updateWheel` and `onThrowUpdate: updateWheel`.
- [x] T016 [US2] Hook `updateWheel` into programmatic navigation: in `handleDotClick` inside `src/components/MassageCarousel.jsx`, add `onUpdate: updateWheel` to the `gsap.to(horizontalItems...)` call.
- [x] T017 [US2] Hook `updateWheel` into auto-rotation: in the `useEffect` interval inside `src/components/MassageCarousel.jsx`, add `onUpdate: updateWheel` to the `gsap.to(horizontalItems...)` call.
- [x] T018 [US2] Attach a `window.addEventListener('resize', updateWheel)` inside the `useGSAP` block (with appropriate cleanup) in `src/components/MassageCarousel.jsx` to ensure wheel bounds and math re-calculate accurately upon device rotation or resize.
- [x] T019 [US2] Fire `updateWheel()` manually exactly once at the bottom of the initial `useGSAP` hook in `src/components/MassageCarousel.jsx` (or inside the entrance animation `onComplete`) to ensure the very first DOM render applies the 3D curves.

**Checkpoint**: All interactive events, window resizes, and programmatic tweens successfully drive the continuous wheel layout.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Dead code cleanup, layout debugging, and commit.

- [x] T020 Run `npm run build` and monitor for ESLint / React warnings regarding the new `onClick`/`onFocus` handlers and `updateWheel` dependencies.
- [x] T021 Conduct a visual QA sweep in a 390px viewport to ensure `rotationY` isn't crushing Polish copy text legibility. Adjust clamping variables in `updateWheel` if necessary.
- [x] T022 Commit all changes as `feat(carousel): implement Wellness Wheel 3D continuous interpolation across drag and nav`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 & 2**: Immediate prerequisites.
- **Phase 3 (US1 Math)**: Depends on the 3D CSS DOM structure from Phase 2.
- **Phase 4 (US2 Bindings)**: Directly depends on the `updateWheel` function built in Phase 3.
- **Phase 5 (Polish)**: Depends on all prior phases.

### Implementation Strategy

- Ensure `updateWheel` runs blazingly fast with `gsap.set()` and avoids triggering React state updates.
- Keep `transform-style` strictly inline to CSS context constraints. Ensure the track container does NOT accidentally reintroduce `overflow: hidden`, which would kill the 3D perspective context.
