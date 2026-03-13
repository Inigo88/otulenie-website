# Quickstart: 006-navbar-mobile

## Development
1. Start the dev server: `npm run dev`
2. Open the page and resize the browser viewport to < 768px.
3. Observe the "Hamburger" icon appearing in the Floating Island Navbar.

## Testing & Verification
### Manual Verification (Mobile)
1. **Trigger**: Click the hamburger icon.
2. **Animation**: Verify the hamburger morphs into an "X" and the modal fades in with staggered items.
3. **Accessibility**:
   - Verify focus is trapped inside the modal.
   - Verify `Escape` key closes the modal.
   - Verify background scrolling is disabled.
4. **Navigation**: Click a link and verify it navigates + closes the modal.

## Build
Run `npm run build` to verify production assets and CSS processing (Tailwind 4).
