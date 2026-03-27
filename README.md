# Otulenie - Premium Mobile Massage Website

A cinematic, high-fidelity landing page for **Otulenie**, a mobile massage business located in Wroc--aw, Poland. The goal of this platform is to act as a deeply relaxing digital instrument that seamlessly converts busy professionals and mothers into booked Booksy appointments through intentional design and micro-interaction polish.

## ---- The "Otulenie Calm" Design System

The platform strictly adheres to a grounded, warm wellness aesthetic.

- **Palette**: Forest Moss (`#374833`), Warm Linen (`#fdfaf0`), Soft Olive (`#6E8068`).
- **Typography**: Fraunces (Headings), Inter (Body), Cormorant Garamond Italic (Accents).
- **Visual Texture**: A global `0.05` opacity SVG `<feTurbulence>` noise overlay is required on all views to eliminate flat digital gradients.
- **Interaction**: All buttons and links feature magnetic `scale(1.03)` or lifts utilizing precise GSAP easing (`cubic-bezier`).
- **Carousel**: Implements a curvilinear "Wellness Wheel" with dynamic 3D scaling and opacity fading to ensure immersive service discovery.
- **Philosophy Section**: A dark-themed, parallax-supported section utilizing `split-type` for cinematic, line-by-line staggered reveal animations as the user scrolls.
- **Sticky Stacking Archive**: Implements layered "massage protocol" cards that stack and scale using `GSAP ScrollTrigger`, creating a tactile, depth-focused exploration of service values.
- **Global Footer**: A deep dark (`#374833`) rounded-top footer providing navigation and contact details with a premium tactile feel.

## ------ Technical Blueprint

This project enforces strict constraints to ensure a premium, performant, mobile-first experience.

- **Stack:** React 19.x, Vite 6.x, Tailwind CSS v4.x, GSAP 3 (with ScrollTrigger plugin), Lucide React.
- **Structure:** Core experience in `App.jsx`. Significant sections (e.g., `Footer`, `StackingArchive`) and interactive logic (e.g., `BooksyWidget`) are modularized into `src/components/` and `src/hooks/` for maintainability as the project grows.
- **Booking Strategy:** Implements a viewport-aware flow via `useBooksy`. Mobile users are directed to the Booksy booking URL, while desktop users interact with a premium integrated overlay widget.
- **Styling:** Single `index.css` for Tailwind layers and custom noise generation.
- **Media:** Content photography (massage sessions, lifestyle) MUST use local assets from the `images-small` folder, optimized to `.webp`. Technical icons (Lucide) and noise SVGs are exempt. No Unsplash permitted.

## ---- Documentation & Spec System

This repository utilizes the **Speckit** workflow system for feature generation and constitution enforcement.

- `.specify/memory/constitution.md`: The governing rules for all project additions.
- `.specify/backlog/`: Centralized feature and epic tracking.
- `.specify/context/`: Core business constraints (`prd.md`, `design.md`, `tech-stack.md`).
- `specs/bugs/bug-report.md`: Central registry of all identified and resolved bugs.
