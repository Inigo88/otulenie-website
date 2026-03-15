# Research: Interactive Features Cards

## Decision: Component Strategy
- **Approach**: Create a single responsive section component `InteractiveCards.jsx` that coordinates three sub-components: `DiagnosticShuffler.jsx`, `TelemetryTypewriter.jsx`, and `CursorProtocolScheduler.jsx`.
- **Rationale**: Keeps `App.jsx` lean and ensures each interactive micro-UI is isolated for easier debugging and potential reuse.

## Decision: Animation Library
- **Approach**: Use GSAP 3 with the `useGSAP` hook. 
- **Rationale**: Constitution Principle III requires GSAP. For the Typewriter, we will use a custom hook using GSAP `stagger` or `TextPlugin` if available (falling back to simple character interpolation if plugin is not included in base).

## Decision: Data Sources
- **Diagnostic Shuffler**: Static array of massage types (Mocne, Głębokie, Czułe, Ciepłe) with taglines and Booksy URLs.
- **Telemetry Typewriter**: Static array of business metrics:
  - "Ponad 500 wykonanych masaży"
  - "Obszar dojazdu: Wrocław + 20km"
  - "100% naturalne olejki eteryczne"
  - "Godziny: Pon-Pt 17-22, Sob-Nd 9-22"
- **Rationale**: Hardcoded for now ensures performance. Easy to move to a JSON file later if needed.

## Decision: Interaction Motion
- **Diagnostic Shuffler**: 3-second cycle interval. Vertical stack of 3 cards (`array.unshift(array.pop())`). Spring-bounce transition using `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- **Telemetry Typewriter**: 50ms per character typing; 15ms per character deleting; 2-second pause at full string. Includes a "Live Feed" label with a pulsing dot.
- **Cursor Protocol Scheduler**: Weekly grid (M T W T F S S). Animated SVG cursor sequence: Enter → Select day → Visual `scale(0.95)` click → Highlight "Save" → Redirect. `power4.out` easing for hover lift.

## Alternatives Considered
- **Direct Real-time Booksy Sync**: Rejected due to high implementation cost and potential latency. A high-fidelity mock maintains the "premium instrument" feel while guaranteeing performance.
