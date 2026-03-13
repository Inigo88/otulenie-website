import React from 'react';
import DiagnosticShuffler from './DiagnosticShuffler';
import TelemetryTypewriter from './TelemetryTypewriter';
import CursorProtocolScheduler from './CursorProtocolScheduler';

/**
 * FeatureCards Container
 * A responsive grid container for the interactive micro-UIs.
 */
const FeatureCards = () => {
  return (
    <section className="w-full py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorProtocolScheduler />
      </div>
    </section>
  );
};

export default FeatureCards;
