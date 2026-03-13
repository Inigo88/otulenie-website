# Quickstart: Hero Section Implementation

## 1. Setup Component
Create `src/components/Hero.jsx` and import `useGSAP` from `@gsap/react`.

## 2. Implement Background
Use `min-h-[100dvh]` and `object-cover` for the image. Add the required `<feTurbulence>` noise overlay as a parent wrapper or ensure it's globally applied.

## 3. GSAP Entrance
Create a timeline that:
1. Fades up the Headline.
2. Fades up the Subheadline (staggered).
3. Fades up the CTA (staggered).
4. Fires `onHeroComplete` to signal the Navbar reveal.

## 4. Integrate with App.jsx
Update `App.jsx` to manage the `isHeroComplete` state.
