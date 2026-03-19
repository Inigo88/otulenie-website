# Tasks: Carousel Modernization

**Branch**: `010-carousel-modern`  
**Input**: Design documents from `/specs/010-carousel-modern/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US2–US4; no US1 — image cards removed)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify dev environment and locate source files before making changes.

- [x] T001 Confirm correct branch `010-carousel-modern` is checked out (`git branch --show-current`)
- [x] T002 [P] Locate `src/components/MassageCarousel.jsx` and confirm it is the file from feature 009
- [x] T003 [P] Locate `src/constants/massageData.js` and confirm it contains `MASSAGE_DATA` with 5 entries and `imageMood` fields

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Data cleanup and shared helper extraction — must complete before any logic changes.

**⚠️ CRITICAL**: These tasks unblock all subsequent phases.

- [x] T004 Remove `imageMood` field from all 5 entries in `src/constants/massageData.js` (B-Model cleanup, clarification Q1 + Q4)
- [x] T005 Extract `getXForIndex` as a stable `useCallback` (deps: `[]`) outside both `useGSAP` and `useEffect` in `src/components/MassageCarousel.jsx`; signature: `(index: number) => number`; reads `horizontalRef.current` child `offsetLeft` values to compute centered `x` offset
- [x] T006 Add `prefersReducedMotion` constant at the top of the `MassageCarousel` function body: `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches` in `src/components/MassageCarousel.jsx` (NFR-001 prerequisite)
- [x] T007 Add `isInViewRef = useRef(false)` and `hasAnimatedRef = useRef(false)` ref declarations in `src/components/MassageCarousel.jsx`

**Checkpoint**: Data model clean; shared helper, motion preference, and viewport refs ready — user story phases can begin.

---

## Phase 3: Bug Fixes P1 — Navigation & Auto-Rotation (Priority: P1)

**Goal**: Fix the two P1 bugs that make the carousel's core navigation unreliable and auto-rotation completely non-functional.

**Independent Test**: Click each of the 5 dots → correct card snaps to center. Wait 5s with section in view → carousel auto-advances. Scroll section out of view → no auto-advance.

### Implementation

- [x] T008 [US-B] Replace the broken `handleDotClick` `targetX` formula with a call to `getXForIndex(index)` in `src/components/MassageCarousel.jsx` (fixes B029)
- [x] T009 [US-B] In the existing `ScrollTrigger.create()` inside `useGSAP`, add `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack` callbacks that set `isInViewRef.current = true/false` in `src/components/MassageCarousel.jsx` (fixes B028 — viewport gate)
- [x] T010 [US-B] In the `useEffect` auto-rotation: replace the `ScrollTrigger.getAll().find(...)` gate with `if (!isInViewRef.current) return;`; change interval from `3000` → `5000`; wrap `setInterval` in `if (!prefersReducedMotion)` guard in `src/components/MassageCarousel.jsx` (fixes B028 + V-002 + NFR-001 auto-rotation)

**Checkpoint**: Dot navigation targets correct cards. Auto-rotation fires at 5s. Pauses when section not in view.

---

## Phase 4: Bug Fixes P2 — Drag & Keyboard (Priority: P2)

**Goal**: Fix drag desync after inertia throw and add keyboard Arrow key navigation.

**Independent Test**: Drag carousel 2 cards and release → active dot updates to the settled card. Tab to section → `ArrowRight`/`ArrowLeft` navigate cards.

### Implementation

- [x] T011 [US-C] Add `onThrowComplete` callback to `Draggable.create()` in `src/components/MassageCarousel.jsx`; inside callback: get final `gsap.getProperty(horizontalItems, 'x')`, find nearest card index by comparing each child's `offsetLeft`, call `setActiveSlide(closestIndex)` and `activeSlideRef.current = closestIndex` (fixes B030)
- [x] T012 [US-C] Add `role="region"`, `aria-label="Oferta"`, `tabIndex={0}`, and `onKeyDown` handler to the outer track container `<div>` in `src/components/MassageCarousel.jsx`; handler maps `ArrowRight` → `handleDotClick((activeSlideRef.current + 1) % MASSAGE_DATA.length)` and `ArrowLeft` → `handleDotClick((activeSlideRef.current - 1 + MASSAGE_DATA.length) % MASSAGE_DATA.length)` with `e.preventDefault()` on both (fixes B031)
- [x] T013 [US-C] Add Tailwind classes `outline-none focus-visible:ring-2 focus-visible:ring-moss/50 rounded-2xl` to the same track container `<div>` in `src/components/MassageCarousel.jsx` (visible focus ring for keyboard users)

**Checkpoint**: Drag + inertia settle → correct dot highlighted. Keyboard navigation wraps correctly.

---

## Phase 5: User Story 2 — Active Card Focus Treatment (Priority: P2)

**Goal**: Visually distinguish the active centered card from adjacent cards with GSAP scale and opacity.

**Independent Test**: Load page, scroll to "Oferta" → active card (index 0) is full scale and opacity; adjacent cards are visibly smaller and dimmer. Click dot 3 → card 3 snaps and all styling updates accordingly.

### Implementation

- [x] T014 [US2] Add a `useEffect` in `src/components/MassageCarousel.jsx` that watches `[activeSlide]`; inside it, select all card elements (children of `horizontalRef.current` matching indices 0–4 only, not clones); GSAP `to()` the active card to `{ scale: 1, opacity: 1, duration: prefersReducedMotion ? 0 : 0.3, ease: 'power2.out', overwrite: 'auto' }` and all others to `{ scale: 0.95, opacity: 0.7, duration: prefersReducedMotion ? 0 : 0.3, ease: 'power2.out', overwrite: 'auto' }`
- [x] T015 [US2] Set initial card styles at mount (before any navigation): call the same GSAP logic once on mount with `duration: 0` to establish the baseline visual state in `src/components/MassageCarousel.jsx`

**Checkpoint**: Active card is visually distinguished on load and on every navigation event.

---

## Phase 6: User Story 4 — Entrance Animation + Reduced Motion (Priority: P1)

**Goal**: Add a one-shot staggered entrance animation on first scroll-in; skip all animations when `prefers-reduced-motion` is active.

**Independent Test**: Hard refresh → scroll to "Oferta" → cards fade up from `y:30` with 50ms stagger. Scroll away and back → no replay. With OS reduced motion on → no animation on any navigation or scroll event.

### Implementation

- [x] T016 [US4] Inside the `ScrollTrigger.create()` `onEnter` callback in `useGSAP` in `src/components/MassageCarousel.jsx`: check `if (hasAnimatedRef.current || prefersReducedMotion) return;`; if clear, run `gsap.fromTo(cardElements, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, ease: 'power2.out' })`; then set `hasAnimatedRef.current = true`
- [x] T017 [US4] Ensure all other GSAP `to()` / `fromTo()` calls in `MassageCarousel.jsx` (slide transitions, `handleDotClick` gsap call, active-card scale useEffect) use `duration: prefersReducedMotion ? 0 : <value>` in `src/components/MassageCarousel.jsx`

**Checkpoint**: Reduced motion path: all transitions instant, no entrance animation. Normal path: one-shot entrance on first view.

---

## Phase 7: Constitution Fixes — Copy & Hover Pause (Priority: P1)

**Goal**: Fix the section heading pronoun violation and add hover-to-pause on the entire section.

**Independent Test**: Heading reads "Oferta" (no "Nasza"). Hover cursor over the section → auto-rotation stops. Move cursor out → auto-rotation resumes after next 5s tick.

### Implementation

- [x] T018 [US-V] Change the section heading from `"Nasza Oferta"` to `"Oferta"` in `src/components/MassageCarousel.jsx` (fixes V-001, FR-010)
- [x] T019 [US-V] Add `onMouseEnter` handler on `containerRef`'s element that sets `isHoveredRef.current = true`; add `onMouseLeave` that sets `isHoveredRef.current = false`; update the auto-rotation `setInterval` gate to also check `!isHoveredRef.current && !isPausedRef.current` in `src/components/MassageCarousel.jsx` (FR-013 hover pause)
- [x] T020 [US-V] Add `isHoveredRef = useRef(false)` and `isPausedRef = useRef(false)` declarations alongside the other refs in `src/components/MassageCarousel.jsx`
- [x] T020b [US-V] In `handleDotClick`, set `isPausedRef.current = true` before the GSAP scroll call, and schedule `isPausedRef.current = false` after a single 5s timeout (this prevents an immediate auto-advance right after a manual dot navigation, per FR-013 resumption rule) in `src/components/MassageCarousel.jsx`
- [x] T020c [US-V] In `Draggable`'s `onDragStart` callback, set `isPausedRef.current = true`; in `onDragEnd` / `onThrowComplete`, set `isPausedRef.current = false` after a 5s `setTimeout` — ensuring auto-rotation does not fire immediately after a drag interaction in `src/components/MassageCarousel.jsx` (FR-013 drag pause)

**Checkpoint**: "Oferta" heading. Hover mouse over section → rotation pauses.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final verification sweep, dead code cleanup, mobile smoke test.

- [x] T021 Remove any remaining references to `imageMood` in `src/components/MassageCarousel.jsx` (e.g. any `card.imageMood` usage or dangling comments)
- [x] T022 [P] Verify the `DISPLAY_DATA` clone count (3 clones) still produces correct infinite wrap behavior after the `getXForIndex` refactor in `src/components/MassageCarousel.jsx`; explicitly test touch/swipe drag on a 390px mobile viewport to confirm infinite-wrap edge cases (swipe from first card left, swipe from last card right) snap correctly (SC-001, FR-001.1)
- [x] T023 [P] Run `npm run build` and confirm zero TypeScript/ESLint errors
- [x] T024 Test all verification checklist items from `quickstart.md` on a 390px mobile viewport; covers SC-001 (responsive mobile touch/swipe), SC-003 (100% Polish copy matching `massage-descriptions.md`)
- [x] T024b Open DevTools → Performance tab → record a full carousel scroll+navigation cycle → confirm slide transitions sustain ≥60fps (SC-002)
- [x] T025 Commit all changes with message `feat(carousel): modernize MassageCarousel — fix B028-B031, constitution violations, add FR-009 FR-012`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No deps — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 — **blocks all subsequent phases**
- **Phase 3 (P1 Bugs)**: Depends on Phase 2 (needs `getXForIndex`, `isInViewRef`, `prefersReducedMotion`)
- **Phase 4 (P2 Bugs)**: Depends on Phase 2; can run in parallel with Phase 3
- **Phase 5 (US2 Scale)**: Depends on Phase 2; can start after Phase 2
- **Phase 6 (US4 Entrance)**: Depends on Phase 2 (needs `hasAnimatedRef`, `prefersReducedMotion`)
- **Phase 7 (Constitution)**: Depends on Phase 2; largely independent of other phases
- **Phase 8 (Polish)**: Depends on all prior phases

### Parallel Opportunities After Phase 2

Phases 3, 4, 5, 6, and 7 all touch `MassageCarousel.jsx` but different functions/effects — execute sequentially on a single developer, or split into separate PRs per phase if parallel team.

### Within Each Phase

- Declare refs/constants before using them in callbacks
- Establish static structure before GSAP interactions
- Core navigation fix (B029, T008) before testing auto-rotation (B028, T009–T010)

---

## Implementation Strategy

### MVP Scope (Minimum Viable Fix)

1. Phase 1 (Setup) + Phase 2 (Foundational)
2. Phase 3 (P1 Bugs: auto-rotation + dot navigation)
3. Phase 7 (Constitution: heading fix)
4. **VALIDATE**: Core navigation works, heading reads "Oferta"

### Full Delivery Order

1. Setup → Foundational → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8

---

## Notes

- All changes are in two files only: `src/constants/massageData.js` and `src/components/MassageCarousel.jsx`
- `[P]` tasks = independent files or distinct code regions with no shared writes
- No new files or components required (App.jsx is under 600 lines)
- Commits: commit after each Phase completion at minimum; use `git add -p` to stage selectively
