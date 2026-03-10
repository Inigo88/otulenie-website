# Phase 0: Research & Architecture Decisions

This document captures the specific technical decisions made to align with the project constitution and specification for `002-project-setup`.

## 1. Frontend Build Tool & Framework Initialization
- **Decision**: Vite with React 19 SWC plugin.
- **Rationale**: Vite provides the fastest, most modern local dev experience (HMR < 2s). The `constitution.md` mandates a simple Single Page Application with `src/App.jsx` as the entry point and zero routing complexity. Vite's default React template perfectly matches this structure without the unnecessary overhead of Next.js or Remix.
- **Alternatives considered**: Next.js (rejected due to App Router overhead and lack of server-side needs for a single landing page). Webpack (rejected due to slow build times).

## 2. CSS Framework & Styling Approach
- **Decision**: Tailwind CSS v3.4.17 configured via PostCSS in `src/index.css`.
- **Rationale**: Specifically requested in `tech-stack.md`. Allows rapid iteration of the "Otulenie Calm" design system via the `tailwind.config.js` theme extension.
- **Alternatives considered**: CSS Modules, Styled Components (rejected due to explicit constitution mandate for Tailwind).

## 3. Animation Engine
- **Decision**: GSAP 3 with ScrollTrigger plugin, managed via `@gsap/react`.
- **Rationale**: The `constitution.md` requires 60fps cinematic micro-interactions and scroll-linked features. `@gsap/react` provides the `useGSAP` hook which safely manages React 19's strict mode lifecycle cleanup.
- **Alternatives considered**: Framer Motion (rejected due to specific GSAP requirement).

## 4. Testing Strategy
- **Decision**: Playwright for End-to-End (E2E) testing. Unit testing via Vitest is deferred unless complex data logic is introduced.
- **Rationale**: The primary success criteria are visual (0.05 opacity noise, specific fonts, sticky CTAs) and interactive (GSAP scroll triggers). Playwright is vastly superior for testing actual visual layout, GSAP animation rendering, and mobile-first responsive stacking.
- **Alternatives considered**: Jest + React Testing Library (rejected as it poorly tests GSAP canvas/scroll interactions and visual CSS noise).
