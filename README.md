# Otulenie - Premium Mobile Massage Website

A cinematic, high-fidelity landing page for **Otulenie**, a mobile massage business located in Wroc--aw, Poland. The goal of this platform is to act as a deeply relaxing digital instrument that seamlessly converts busy professionals and mothers into booked Booksy appointments through intentional design and micro-interaction polish.

## ---- The "Otulenie Calm" Design System

The platform strictly adheres to a grounded, warm wellness aesthetic.

- **Palette**: Forest Moss (`#374833`), Warm Linen (`#fdfaf0`), Soft Olive (`#6E8068`).
- **Typography**: Fraunces (Headings), Inter (Body), Cormorant Garamond Italic (Accents).
- **Visual Texture**: A global `0.05` opacity SVG `<feTurbulence>` noise overlay is required on all views to eliminate flat digital gradients.
- **Interaction**: All buttons and links feature magnetic `scale(1.03)` or lifts utilizing precise GSAP easing (`cubic-bezier`).

## ------ Technical Blueprint

This project enforces strict constraints to ensure a premium, performant, mobile-first experience.

- **Stack:** React 19.x, Vite 6.x, Tailwind CSS v4.x, GSAP 3 (with ScrollTrigger plugin), Lucide React.
- **Structure:** Single `App.jsx` holding the core experience. Components (e.g., `MagneticButton`, `RoundedContainer`) are extracted to `src/components/` *only* if `App.jsx` exceeds 600 lines.
- **Styling:** Single `index.css` for Tailwind layers and custom noise generation.
- **Media:** Strict use of high-quality Unsplash images matching the `imageMood` profile. No placeholders permitted.

## ---- Documentation & Spec System

This repository utilizes the **Speckit** workflow system for feature generation and constitution enforcement.

- `.specify/memory/constitution.md`: The governing rules for all project additions.
- `.specify/backlog/`: Centralized feature and epic tracking.
- `.specify/context/`: Core business constraints (`prd.md`, `design.md`, `tech-stack.md`).
