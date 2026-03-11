# Quickstart: Floating Island Navbar

## Setup

1. Ensure dependencies are installed:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Development Verification

- **Desktop Scroll**: Scroll down the page. The navbar should "shrink" and transition to a pill shape with a linen background after 80px.
- **Desktop Hover**: Hover over navigation links. They should exhibit a subtle "magnetic" pull and scale up by 1.03.
- **Mobile View**: Open DevTools and switch to a mobile viewport (e.g., iPhone 12 Pro - 390px). Verify that the navbar replaces links with a hamburger menu.
- **Mobile Overlay**: Tap the hamburger icon. A full-screen overlay should appear with vertically centered links.

## Automated Verification Projects

- `specs/005-navbar/playwright/navbar.spec.js` (To be implemented)
