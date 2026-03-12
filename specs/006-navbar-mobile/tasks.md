# Tasks: Full Mobile Navigation Modal (006)

**Input**: Design documents from `/specs/006-navbar-mobile/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/mobile-menu.md

**Organization**: Tasks are grouped by user story (US1-US3) in priority order.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Preparing the project for the new component.

- [x] T001 [P] Create the component file `src/components/MobileMenu.jsx`
- [x] T002 Add `isMenuOpen` and `isAnimating` states to `src/components/Navbar.jsx`
- [x] T003 [P] Define local constants for the canonical link set in `src/components/Navbar.jsx` (based on data-model.md)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure for the modal.

- [x] T004 Implement `useFocusTrap` custom hook logic in `src/components/MobileMenu.jsx`
- [x] T005 Implement body scroll locking logic using `useEffect` in `src/components/MobileMenu.jsx`
- [x] T006 [P] Add `backdrop-blur-xl` and `bg-moss/40` base styles for the modal overlay in `src/components/MobileMenu.jsx`

---

## Phase 3: User Story 1 - Basic Modal Navigation (Priority: P1) 🎯 MVP

**Goal**: Enable mobile visitors to access the navigation menu.

**Independent Test**: Resize to mobile, click hamburger icon, verify the modal appears with all 5 navigation links.

### Implementation for User Story 1

- [x] T007 [US1] Build the basic modal container markup with `role="dialog"` and `aria-modal="true"` in `src/components/MobileMenu.jsx`
- [x] T008 [US1] Map through the navigation links array and render plain text links in `src/components/MobileMenu.jsx`
- [x] T009 [US1] Implement the `onClose` callback trigger when a link or backdrop is clicked in `src/components/MobileMenu.jsx`
- [x] T010 [US1] Wire the mobile menu trigger button in `src/components/Navbar.jsx` to toggle `isMenuOpen`

---

## Phase 4: User Story 2 - High-Fidelity Brand Presence (Priority: P2)

**Goal**: Ensure the navigation experience feels premium, calm, and visually aligned.

**Independent Test**: Verify GSAP animations (staggered entries, hamburger morph) follow the `power3.out` easing and brand palette.

### Implementation for User Story 2

- [x] T011 [US2] Implement the custom SVG hamburger morph animation in `src/components/Navbar.jsx` (top/middle/bottom line rotations/opacity)
- [x] T012 [US2] Create GSAP timeline for the modal entrance (back-drop fade + staggered link reveal) in `src/components/MobileMenu.jsx`
- [x] T013 [US2] Apply Brand typography (`Fraunces` for links) and colors (`Warm Linen` background, `Forest Moss` text) in `src/components/MobileMenu.jsx`
- [x] T014 [US2] Ensure `RoundedContainer` usage or `rounded-[2rem]` utility for modal elements per `FR-005`

---

## Phase 5: User Story 3 - Conversion Focus (Sticky CTA) (Priority: P3)

**Goal**: Provide a quick, prominent booking option for mobile users.

**Independent Test**: Verify the "Zarezerwuj masaż" button is visually distinct and link to Booksy.

### Implementation for User Story 3

- [x] T015 [US3] Implement the "Zarezerwuj masaż" CTA button using `MagneticButton` in `src/components/MobileMenu.jsx`
- [x] T016 [US3] Apply `Soft Olive (#6E8068)` background and ensure distinct styling from regular links
- [x] T017 [US3] Finalize ARIA labels for the booking CTA per `FR-009`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: General improvements and final verification.

- [x] T018 [P] Verify `prefers-reduced-motion` compliance for all modal GSAP animations
- [x] T019 Handle viewport orientation changes to re-center or close the modal if needed
- [x] T020 Code cleanup and JSDoc documentation for the new `MobileMenu` component
- [x] T021 Final verification against `quickstart.md` test scenarios

---

## Phase 7: Bug Reporting and Fixes (Post-Implementation)

**Purpose**: Addressing user feedback and UI refinements.

- [x] T022 Create professional bug reports in `specs/006-navbar-mobile/bugs/` for the 4 identified issues
- [x] T023 Remove redundant "Start" link and make logo interactive in `Navbar.jsx`
- [x] T024 Add explicit close button visibility and accessibility to `MobileMenu.jsx`
- [x] T025 Remove unnecessary icons from the booking CTA in `MobileMenu.jsx`
- [x] T026 Update navigation typography to use standard sans-serif font

---

## Phase 8: Advanced Bug Fixes & Animation Refinement

**Purpose**: Addressing continuity and consistency bugs B005 & B006.

- [x] T027 Create professional bug reports B005 & B006 in `specs/006-navbar-mobile/bugs/`
- [x] T028 Refactor `MobileMenu` links to use `MagneticButton` for animation/font consistency (B005)
- [x] T029 Resolve `z-index` conflict in `Navbar.jsx` to maintain morphing visibility over the modal (B006)
- [x] T030 Remove the redundant internal close button in `MobileMenu.jsx` (B006)

---

## Phase 9: Final Refinements & continuity Polish 

**Purpose**: Addressing final user feedback on animations and visual weirdness.

- [x] T031 [P] Implement `forwardRef` in `MagneticButton.jsx` to enable staggering entrance
- [x] T032 Hide the "Otulenie" logo in `Navbar.jsx` when `isMenuOpen` is true
- [x] T033 Normalize mobile menu link typography to `text-2xl font-sans`
- [x] T034 Verify animations and visual continuity in the browser

---

## Dependencies & Execution Order
