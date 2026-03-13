import { useState, useEffect } from 'react';

/**
 * useReducedMotion Hook
 * Returns a boolean indicating if the user has requested reduced motion.
 */
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

    const listener = (event) => setReducedMotion(event.matches);
    mq.addEventListener('change', listener);

    return () => {
      mq.removeEventListener('change', listener);
    };
  }, []);

  return reducedMotion;
};
