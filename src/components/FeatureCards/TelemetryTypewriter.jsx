import React, { useState, useEffect } from 'react';
import RoundedContainer from '../RoundedContainer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const TELEMETRY_DATA = [
  "Ponad 500 wykonanych masaży",
  "Obszar dojazdu: Wrocław + 20km",
  "100% naturalne olejki eteryczne",
  "Godziny: Pon-Pt 17-22, Sob-Nd 9-22",
  "Dojazd w cenie usługi",
  "Certyfikowany terapeuta SPA"
];

const TelemetryTypewriter = () => {
  const reducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(reducedMotion ? TELEMETRY_DATA[0] : '');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(50);

  useEffect(() => {
    if (reducedMotion) return;

    const handleTyping = () => {
      const fullText = TELEMETRY_DATA[currentIndex];
      
      if (!isDeleting) {
        // Typing
        setDisplayText(fullText.substring(0, displayText.length + 1));
        setSpeed(50);
        
        if (displayText === fullText) {
          // Pause at full text
          setIsDeleting(true);
          setSpeed(2000);
        }
      } else {
        // Deleting
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setSpeed(15);
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % TELEMETRY_DATA.length);
          setSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentIndex, speed, reducedMotion]);

  return (
    <RoundedContainer className="bg-white/40 border-moss/5 p-8 min-h-[450px] flex flex-col items-center justify-center relative overflow-hidden font-mono">
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="relative">
          <div className="w-2.5 h-2.5 rounded-full bg-[#698C5D] animate-ping opacity-75" />
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-[#374833]" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-moss/60 font-bold">
          Live Data Feed
        </span>
      </div>

      <div className="w-full max-w-xs space-y-6">
        <div className="bg-linen/50 border border-moss/5 rounded-xl p-8 shadow-inner relative min-h-[140px] flex items-center justify-center text-center">
          <p className="text-moss text-lg leading-relaxed font-mono">
            {displayText}
            <span className="inline-block w-2.5 h-5 bg-olive ml-1 animate-[pulse_1s_infinite]" />
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1 bg-moss/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-olive/20 animate-[loading_3s_infinite_ease-in-out]" 
                style={{ animationDelay: `${i * 0.5}s`, width: `${30 + (i * 15)}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex gap-8 text-[8px] uppercase tracking-widest text-moss/30 font-bold">
          <div className="flex flex-col gap-1">
            <span>System: Optimal</span>
            <span>Uptime: 99.9%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Buffer: Clear</span>
            <span>V: 2.1.0-Stable</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </RoundedContainer>
  );
};

export default TelemetryTypewriter;
