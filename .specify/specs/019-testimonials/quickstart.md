# Quickstart: Implementing Featured Testimonials

## 1. Prepare Data
Add the `testimonials` array to `App.jsx` based on the research findings.

## 2. Component Structure
- Create `TestimonialCard` using `RoundedContainer` style (border, backdrop-blur, moss/linen palette).
- Create `TestimonialsSection` to wrap the cards.

## 3. Styling (Tailwind v4)
- Container: `bg-(--linen)`, `py-20`, `px-6`.
- Cards: `bg-(--moss)/10`, `backdrop-blur-md`, `rounded-2xl`, `p-8`.
- Icons: Lucide `Star` in `text-(--olive)`.

## 4. GSAP Animations
- Add `useGSAP` hook.
- Implement `ScrollTrigger` for the section reveal.
- Desktop: Implement horizontal slider logic with `xPercent` shift.
- Mobile: Use staggered `y` and `opacity` reveal.

## 5. Verification
- Verify vertical stack on screen width < 768px.
- Verify 3 items visible on desktop with auto-play.
- Verify 60fps performance and WCAG contrast.
