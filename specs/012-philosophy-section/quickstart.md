# Phase 1: Quickstart

## Local Verification Guide

1. **Start the environment**:

   ```bash
   npm run dev
   ```

2. **Open the browser**:
   Navigate to `http://localhost:5173`.
3. **Scroll verification**:
   - Scroll down the homepage until the "Philosophy Manifesto" section appears.
   - You should notice the background transitions smoothly into a distinct dark theme.
4. **Animation checks**:
   - Background shapes should move at slightly varying vertical speeds as you scroll (parallax).
   - Text elements should reveal line-by-line smoothly, triggered as they enter the bottom 80% of the viewport.
5. **Accessibility checks**:
   - Inspect the OS settings, enable "Reduce Motion" and refresh the page. Verify everything renders fully static and readable.
   - Verify color contrasts inside the dark section comply with formatting rules.
