# Implementation Plan: Global Design System

**Branch**: `003-design-system` | **Date**: 2026-03-10 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/003-design-system/spec.md)
**Input**: Feature specification from `/specs/003-design-system/spec.md`

## Summary

This feature implements the foundational "Otulenie Calm" design system. The approach uses Tailwind CSS v4's CSS-first theme configuration for design tokens and a performance-optimized SVG data-URI noise pattern to achieve a cinematic texture without GPU overhead.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: Tailwind CSS v4, Google Fonts
**Storage**: N/A
**Testing**: Manual Visual Verification (Browser)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: Sub-2ms frame budget for noise overlay; zero CLS from font loading.
**Constraints**: Tailwind v4 `@theme` directive mandatory for tokens.
**Scale/Scope**: Global application-wide styles and filters.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (Linen/Moss/Olive palette + Noise)
[x] II. The Focus on Conversion (Design supports clarity and trust)
[x] III. Micro-Interaction Polish (N/A for this foundational style layer)
[x] IV. Mobile-First Experience (Typography scales for mobile)

## Project Structure

### Documentation (this feature)

```text
specs/003-design-system/
├── plan.md              # This file
├── research.md          # Noise overlay performance & Tailwind v4 token research
├── data-model.md        # CSS Variable Definitions (Tokens)
├── quickstart.md        # Font loading and verification steps
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
src/
├── index.css            # Centralize @theme and noise overlay utility
└── index.html           # External font loading and noise layer mounting
```

**Structure Decision**: Standard "Otulenie" structure is maintained. No new complex paths are introduced.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | | |
