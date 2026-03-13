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
  - "Dostępność: Pon-Sob, 8:00 - 20:00"
- **Rationale**: Hardcoded for now ensures performance. Easy to move to a JSON file later if needed.

## Decision: Interaction Motion
- **Diagnostic Shuffler**: 3-second cycle interval. Smooth cross-fade or slide-up transition.
- **Telemetry Typewriter**: 50ms per character typing; 15ms per character deleting; 2-second pause at full string.
- **Cursor Protocol Scheduler**: `power4.out` easing for hover lift. Redirect on any interaction with primary CTA.

## Alternatives Considered
- **Direct Real-time Booksy Sync**: Rejected due to high implementation cost and potential latency. A high-fidelity mock maintains the "premium instrument" feel while guaranteeing performance.
