# Quickstart: Interactive Features Cards

## Prerequisites
- Node.js 18+
- Active development server (`npm run dev`)

## Usage
The cards are integrated into `src/App.jsx` within the `<Features />` section.

1.  **Direct Navigation**: Scroll to the section below the Hero.
2.  **Diagnostic Shuffler**: Observe the automatic shuffling. Hover to pause. Click "Zarezerwuj" to test Booksy redirect.
3.  **Telemetry Typewriter**: Check the typing animation speed and consistency.
4.  **Cursor Protocol Scheduler**: Interact with the calendar/time mock. Verify that any intent-based interaction triggers the redirect sequence.

## Verification
- Run `npm run lint` to ensure Prop-types / JSDoc compliance (Constitution Principle V).
- Toggle `prefers-reduced-motion` in OS settings to verify animation suppression.
