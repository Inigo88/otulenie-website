# Quickstart: SVG Logo Implementation

## Verification Steps

### Visual Verification
- [ ] **Navbar (Hero)**: Logo is `Linen` (#fdfaf0) and visible.
- [ ] **Navbar (Island)**: Logo is `Moss` (#374833) and visible.
- [ ] **Footer**: Logo is `Linen` and visible.
- [ ] **Height**: Logo height matches the placeholder text (`text-2xl` / 32px height).
- [ ] **Transition**: Logo color change is smooth (0.5s) when scrolling.
- [ ] **Magnetic Effect**: Navbar logo has a subtle magnetic pull upon hover.

### Functional Verification
- [ ] **Homepage link**: Clicking the logo triggers smooth scroll to top.
- [ ] **Reduced Motion**: Verify that transitions are instant when `prefers-reduced-motion` is on.

### Accessibility Check
- [ ] **ARIA Label**: Inspect the link and verify `aria-label="Otulenie - Strona główna"`.
- [ ] **Fallback**: Test (temporarily) by broken SVG source to ensure "Otulenie" text appears.
