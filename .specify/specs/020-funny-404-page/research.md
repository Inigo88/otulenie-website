# Research: Funny 404 Page (020)

## Routing Architecture

**Decision**: Implement `react-router-dom` v7 (or latest stable) to handle application routing.
**Rationale**: 
- The current app lacks formal routing, making it difficult to "intercept all invalid routes" as required (FR-001).
- `react-router-dom` provides a built-in `<Route path="*" element={<NotFound />} />` pattern which is the industry standard for SPAs.
- It allows for future expansion (e.g., adding a dedicated booking page or blog) without refactoring the core navigation logic again.

**Alternatives considered**: 
- Simple state-based routing (`window.location.pathname`): Rejected because it doesn't handle browser history (back/forward) as gracefully as a dedicated library and is harder to maintain for a "premium" product.

## AI Visual Asset

**Decision**: Use the generated "Calm Sloth" graphic.
**Rationale**: Matches the "Otulenie Calm" aesthetic while providing the requested "humorous graphic" requirement (FR-006). 
**Path**: c6903b02-7e7c-4700-9d5a-3221d30d15b0/funny_404_sloth_1774653261715.png (to be moved to `public/images/404-sloth.webp`)

## Tagline Proposals (Premium-Calm)

The spec requires 3 options for the final implementation. All maintain a calm, professional tone with a hint of humor.

1. **Option A (The "Drift"):**
   *PL*: "Nawet cisza czasem błądzi. Ta strona zniknęła pod miękkim kocem spokoju."
   *EN (~)*: "Even silence sometimes wanders. This page has disappeared under a soft blanket of calm."

2. **Option B (The "Path"):**
   *PL*: "Czasem najlepszą drogą jest powrót do początku. Tu już nas nie ma."
   *EN (~)*: "Sometimes the best road is back to the beginning. We're not here anymore."

3. **Option C (The "Relaxation"):**
   *PL*: "Zatopiliśmy się w relaksie tak głęboko, że zgubiliśmy ten adres. Odnajdźmy się wspólnie."
   *EN (~)*: "We've sunk so deep into relaxation that we've lost this address. Let's find each other."

**Recommendation**: Start with Option C as it reinforces the brand's core value (deep relaxation).

## Implementation Details

- **Component Name**: `NotFound` (defined in `App.jsx` or separate file if `App.jsx` exceeds 600 lines).
- **Animation**: GSAP `from` animation for the sloth image (opacity: 0, scale: 0.95) and the text elements (y: 20, opacity: 0, stagger: 0.1).
- **Navigation**: Use `Link` from `react-router-dom` for the "Wróć do domu" button to ensure single-click, no-reload navigation (SC-002).
