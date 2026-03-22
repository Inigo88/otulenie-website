# Implementation Plan: 1.1.4 - Image Restriction

**Branch**: `014-image-restriction` | **Date**: 2026-03-22 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/014-image-restriction/spec.md)
**Input**: Feature specification from `/specs/014-image-restriction/spec.md`

## Summary

Restrict website imagery to local, optimized assets derived from high-resolution source photography (6240x4160). This involves migrating source files from `.specify/context/images/` to `public/images-small/`, resizing (max-width 2560px), and converting them to WebP format using `sips`. Implementation covers Hero, Stacking Archive, and Philosophy background updates with mandatory `alt` text and Moss #374833 fallback.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: High-res source (`.specify/context/images/`, ignored by git); Optimized WebP (`public/images-small/`)
**Testing**: Manual visual verification on 390px viewport; Network tab audit.
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: < 200ms LCP for Hero image, 0 external photography dependencies.
**Constraints**: All source JPEGs must be resized (max-width 2560px) and converted to WebP; Icons/SVGs exempt; All image components must support mandatory `alt` text and #374833 fallback.
**Scale/Scope**: Asset migration and data mapping across current interactive architectural sections (Hero, Stacking Archive, Philosophy).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (Local branded photography only; eliminates "generic" stock feel)
[x] II. The Focus on Conversion (Accurate service representation builds trust)
[x] III. Micro-Interaction Polish (Preserves existing GSAP contexts while updating assets)
[x] IV. Mobile-First Experience (WebP optimization for fast mobile loading)
[x] V. Reusable Component Architecture (Unified constants update in `App.jsx`)
[x] VI. Accessibility Standards (Mandatory `alt` text for all new image fields)

## Project Structure

### Documentation (this feature)

```text
specs/014-image-restriction/
├── plan.md              # This file
├── research.md          # Completed (sips identified for conversion)
├── data-model.md        # Asset mapping
├── quickstart.md        # Migration steps
└── tasks.md             # To be generated
```

### Source Code (repository root)

```text
public/
└── images-small/        # [NEW] Destination for optimized WebP assets
src/
└── App.jsx              # Update HERO and STACKING_CARDS constants
```

**Structure Decision**: Assets will be placed in `public/images-small/` to allow direct serving. Components in `App.jsx` will be updated to point to these paths relative to the root.

## Complexity Tracking

*No violations identified.*
