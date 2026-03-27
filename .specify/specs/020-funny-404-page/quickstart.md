# Quickstart: Funny 404 Page (020)

## Overview

This guide describes how to run and test the implementation of the branded 404 page for Otulenie.

## Prerequisites

- Node.js >= 20.0.0
- NPM or PNPM
- `react-router-dom` installed (to be added during implementation)

## Running the Application

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the development server**:
   ```bash
   npm run dev
   ```
3. **Navigate to the application** (usually http://localhost:5173).

## Testing the 404 Page

To verify the "Funny 404" feature:

1. **Invalid URL**: Navigate to any non-matching path, e.g., `http://localhost:5173/non-existent-page`.
2. **Verification**: 
   - Ensure the "Calm Sloth" graphic appears with a gentle GSAP entrance animation.
   - Confirm the selected premium tagline is displayed.
   - Verify the "Wróć do domu" magnetic button is centered and functional.
   - Check that the global noise overlay and moss/linen palette are correctly applied.
3. **Mobile Check**: Resize the browser to 390px (mobile view) and ensure the layout stacks vertically and remains readable.

## Key Files

- `src/App.jsx`: Contains the routing logic and the `NotFound` component.
- `src/index.css`: Global styles (v4 directives and noise).
- `public/images/404-sloth.webp`: The visual asset for the 404 page.
