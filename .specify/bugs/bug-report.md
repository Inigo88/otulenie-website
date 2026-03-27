# Bug Report — Otulenie Website

> **50 total** · ✅ 49 resolved · 🔴 1 open · 🟡 0 fix proposed

---

## 004 — Global Design System

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B012](004-global-design-system/B012-shadow-artifacts.md) | Shadow Artifacts ("Dark Blob") | Smoothed `backgroundColor` / `backdropFilter` interpolation; reduced shadow intensity | ✅ |
| [B013](004-global-design-system/B013-html-lang.md) | HTML Lang Attribute Set to English | Changed `lang="en"` → `lang="pl"` in `index.html` | ✅ |
| [B014](004-global-design-system/B014-heading-hierarchy.md) | Heading Hierarchy Skips H2 | Changed service card headings from `<h3>` to `<h2>` | ✅ |
| [B015](004-global-design-system/B015-olive-contrast.md) | Olive Text Contrast on Small Text | Documented constraint; current usage limited to compliant `<h1>` | ✅ |
| [B016](004-global-design-system/B016-reduced-motion.md) | GSAP Animations Ignore prefers-reduced-motion | Skip entrance animation + instant navbar morph when reduced motion preferred | ✅ |
| [B017](004-global-design-system/B017-skip-to-content.md) | Missing Skip-to-Content Link | Added hidden skip link targeting `#main-content` | ✅ |
| [B018](004-global-design-system/B018-component-docs.md) | Missing Component JSDoc Prop Documentation | Added `@param` annotations to all reusable components | ✅ |

## 005 — Floating Island Navbar

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B019](005-floating-island-navbar/B019-hero-legibility.md) | Hero State Legibility Issues | Updated NavLink/Logo styles to use `text-moss` in hero state with smooth transitions | ✅ |
| [B020](005-floating-island-navbar/B020-layout-jitter.md) | Layout Jitter on Scroll Transition | Unified navbar dimensions across both states with consistent `max-w` and padding | ✅ |
| [B021](005-floating-island-navbar/B021-nested-interactive.md) | Nested Interactive Elements in NavLinks | Made `MagneticButton` polymorphic; `NavLink` passes `as="a"` directly | ✅ |
| [B022](005-floating-island-navbar/B022-navbar-link-sync.md) | Inconsistent Navigation Links | Synced links array to include all pages; updated CTA label | ✅ |

## 006 — Mobile Navigation

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B001](006-navbar-mobile/B001-redundant-start-link.md) | Redundant "Start" Navigation Link | Removed "Start" link; menu now starts with "Oferta" | ✅ |
| [B002](006-navbar-mobile/B002-invisible-close-button.md) | Invisible Mobile Close Button | Raised navbar z-index; morphed hamburger into visible ✕ | ✅ |
| [B003](006-navbar-mobile/B003-redundant-cta-icon.md) | Unnecessary Icon in Booking CTA | Removed icon; button now shows text only | ✅ |
| [B004](006-navbar-mobile/B004-typography-misalignment.md) | Typography Misalignment in Mobile Menu | Switched to sans-serif for improved legibility | ✅ |
| [B005](006-navbar-mobile/B005-mobile-link-consistency.md) | Mobile Menu Link Inconsistency | Refactored `MagneticButton` to support refs; adjusted mobile layout | ✅ |
| [B006](006-navbar-mobile/B006-close-btn-discontinuity.md) | Navbar Header Continuity Issues | Added fade-out + translation for logo when menu is open | ✅ |
| [B007](006-navbar-mobile/B007-hamburger-line-count.md) | Hamburger Icon Line Count | Restored middle line; updated GSAP 3→2 line transition | ✅ |
| [B008](006-navbar-mobile/B008-modal-layout-continuity.md) | Modal Layout and Header Continuity | Favoured transparent background when menu open; `items-start` alignment | ✅ |
| [B023](006-navbar-mobile/B023-mobile-icon-visibility.md) | Mobile Menu Icon Visibility | Standardised contrast colours based on `isHero` / `isMenuOpen` state | ✅ |
| [B024](006-navbar-mobile/B024-mobile-menu-div.md) | Mobile Menu Trigger Non-Interactive | Replaced `<div>` with semantic `<button>` + accessible label | ✅ |

## 007 — Hero Section

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B009](007-hero-section/B009-hero-navbar-visibility.md) | Navbar Visibility on Hero Section | Dynamic text colour classes: `text-linen` (hero) ↔ `text-moss` (island) | ✅ |
| [B010](007-hero-section/B010-hero-navbar-border.md) | Navbar Border Definition in Hero State | GSAP timeline applies subtle linen border in hero state | ✅ |
| [B011](007-hero-section/B011-hero-text-branding-alignment.md) | Hero Text Branding Alignment | Replaced `text-white` with `text-linen` on `<h1>` and CTA | ✅ |
| [B025](007-hero-section/B025-navbar-transition-sequencing.md) | Navbar Transition Sequencing | Staggered transition: BG/border react instantly, text/icons delayed 200 ms | ✅ |

## 009 — Massage Types Carousel

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B026](009-massage-types-carousel/B026-carousel-layout-displacement.md) | Carousel Layout Displacement & Vertical Overlap | Removed GSAP pinning; restored natural document flow | ✅ |
| [B027](009-massage-types-carousel/B027-carousel-infinite-loop.md) | Infinite Carousel Looping | Replaced scroll-hijack with drag/swipe/dot/auto-rotation; added seamless wrap | ✅ |
| [B028](009-massage-types-carousel/B028-autorotation-broken.md) | Auto-Rotation Never Fires | Switched to `isInViewRef`; corrected interval to 5 000 ms | ✅ |
| [B029](009-massage-types-carousel/B029-dot-navigation-wrong-target.md) | Dot Navigation Targets Wrong Card Position | Shared `getXForIndex` callback using `offsetLeft`-based centering | ✅ |
| [B030](009-massage-types-carousel/B030-dot-desync-after-drag.md) | Active Dot Desync After Drag Inertia | Added `onThrowComplete` callback to sync `activeSlide` after inertia | ✅ |
| [B031](009-massage-types-carousel/B031-no-keyboard-navigation.md) | Missing Keyboard Navigation (WCAG 2.1.1) | Added `role="region"`, `tabIndex`, and arrow-key handler | ✅ |

## 011 — Wellness Wheel

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B032](011-wellness-wheel/B032-duplicated-cards.md) | Duplicated Cards in Wellness Wheel | Removed clone logic; strict `bounds` via `getXForIndex` | ✅ |

## 012 — Philosophy Section

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B033](012-philosophy-section/B033-philosophy-text-and-font-cut.md) | Text and Font Rendering | Updated copy; fixed font clipping with `py-4 px-4` on `SplitType` containers | ✅ |
| [B034](012-philosophy-section/B034-philosophy-background-parallax.md) | Background Visibility & Parallax Failure | Increased shape opacity; refactored ScrollTrigger for up to 100 % `yPercent` travel | ✅ |

## 013 — Stacking Services

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B035](013-stacking-services/B035-card-animation-initial-black.md) | Cards Initial Black State | Added explicit `gsap.set` with `brightness(1)` to prevent flicker | ✅ |
| [B036](013-stacking-services/B036-stacking-cards-entry-animation.md) | Cards Lack Entry Animation | — | ✅ |
| [B037](013-stacking-services/B037-stacking-cards-exit-jump.md) | Cards Exit Jump | Unified lifecycle timeline per card; added `immediateRender: false` | ✅ |
| [B039](013-stacking-services/B039-stacking-card-size-consistency.md) | Card Size Consistency | — | ✅ |
| [B040](013-stacking-services/B040-stacking-card-visibility.md) | Card Visibility (Last Card) | Dynamic centering with `calc(50vh - 250px)`; tightened footer gap | ✅ |
| [B042](013-stacking-services/B042-stacking-card-mobile-visibility.md) | Mobile Visibility (3rd Card) | Responsive `top` & reduced index offset on mobile | ✅ |
| [B043](013-stacking-services/B043-stacking-last-card-timing.md) | 3rd Card Opacity/Timing | Fixed `h-[550px]` height; added dummy hold phase for uniform timing | ✅ |

## 014 — Image Restriction

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B038](014-image-restriction/B038-hero-image-swap.md) | Hero Image Swap to IMG-05 | Swapped background to `/images-small/IMG-05.webp` | ✅ |

## 015 — Footer

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B049](015-footer/B049-footer-content-fixes.md) | Footer Content Refresh | Updated social handles, phone, email, address, and copyright | ✅ |
| [B041](015-footer/B041-remove-footer-animation.md) | Remove Footer Entrance Animation | Removed `gsap.from` + ScrollTrigger; footer now renders statically | ✅ |
| [B044](015-footer/B044-mobile-footer-layout.md) | Mobile Footer Layout | 2-column grid for nav/contact; horizontal brand bar | ✅ |

## 016 — Booking Flow

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B045](016-booking-flow/B045-hero-cta-booksy-widget.md) | Hero CTA Booksy Widget Replacement | Proxy-click strategy: hidden Booksy button triggered by custom CTA | ✅ |
| [B046](016-booking-flow/B046-booksy-close-outside.md) | Widget Close on Click Outside | Global listener for overlay click + Escape key dismissal | ✅ |
| [B047](016-booking-flow/B047-booksy-mobile-responsive.md) | Widget Responsive Mobile Layout | Flex-scroll overlay, dual scroll-lock, 92 vw floating sheet on mobile | ✅ |

## 017 — SVG Logo

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B048](017-svg-logo/B048-navbar-footer-polish.md) | Navbar & Footer UI Polish | Logo `h-8`→`h-6`; `focus:`→`focus-visible:`; removed "Główna" link | ✅ |

## 009-massage-types-carousel

| ID | Title | Fix | Status |
|----|-------|-----|--------|
| [B050](009-massage-types-carousel/B050-carousel-draggable-disabled.md) | Carousel Draggable Disabled | — | 🔴 |
