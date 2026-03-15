import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import RoundedContainer from '../RoundedContainer';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const DAYS = ['Pn', 'Wt', 'Sr', 'Cz', 'Pt', 'So', 'Nd'];
const TIMES = ['17:00', '18:30', '20:00'];

const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [status, setStatus] = useState('Protocol: Idle');
  const [selectedDay, setSelectedDay] = useState(null);
  const [highlightSave, setHighlightSave] = useState(false);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) {
      setSelectedDay(2);
      setHighlightSave(true);
      setStatus('Protocol: Paused (Reduced Motion)');
      return;
    }
    const cursor = cursorRef.current;

    const timeline = gsap.timeline({ 
      repeat: -1, 
      repeatDelay: 2,
      onRepeat: () => {
        setSelectedDay(null);
        setHighlightSave(false);
        setStatus('Protocol: Idle');
      }
    });

    // 1. Enter
    timeline.to(cursor, { 
      x: 40, 
      y: 60, 
      opacity: 1, 
      duration: 1, 
      ease: 'power2.out',
      onStart: () => setStatus('Protocol: Scanning')
    });

    // 2. Select Day (choose Wt or Sr)
    
    timeline.to(cursor, { 
      x: 140, 
      y: 120, 
      duration: 0.8, 
      ease: 'power3.inOut',
      onComplete: () => {
        setSelectedDay(2);
        setStatus('Protocol: Target Lock');
      }
    });

    // 3. Click (Scale 0.95)
    timeline.to(cursor, { 
      scale: 0.8, 
      duration: 0.2, 
      yoyo: true, 
      repeat: 1, 
      ease: 'power1.inOut' 
    });

    // 4. Move to Save
    timeline.to(cursor, { 
      x: 200, 
      y: 350, 
      duration: 1, 
      ease: 'expo.inOut',
      onStart: () => setStatus('Protocol: Finalizing')
    });

    // 5. Highlight Save
    timeline.to({}, { 
      duration: 0.1, 
      onStart: () => setHighlightSave(true) 
    });

    // 6. Final Click & Exit
    timeline.to(cursor, { 
      scale: 0.8, 
      duration: 0.2, 
      yoyo: true, 
      repeat: 1,
      onComplete: () => setStatus('Protocol: Complete')
    });

    timeline.to(cursor, { 
      opacity: 0, 
      duration: 0.5 
    });

  }, { scope: containerRef, dependencies: [reducedMotion] });

  return (
    <RoundedContainer className="bg-white/40 border-moss/5 p-8 min-h-[450px] flex flex-col relative overflow-hidden">
      <div className="mb-6">
        <span className="text-xs font-sans tracking-widest uppercase text-olive opacity-80 block mb-2">
          Harmonogram
        </span>
        <h3 className="text-2xl font-serif text-moss">Cursor Protocol</h3>
      </div>

      <div ref={containerRef} className="flex-grow flex flex-col gap-6 relative">
        {/* Weekly Grid */}
        <div className="grid grid-cols-7 gap-2">
          {DAYS.map((day, i) => (
            <div 
              key={day} 
              className={`day-cell aspect-square flex items-center justify-center rounded-lg text-[10px] font-medium transition-colors border ${
                selectedDay === i 
                  ? 'bg-olive text-linen border-olive' 
                  : 'bg-linen/50 text-moss/40 border-moss/10'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Time Slots Mock */}
        <div className="space-y-2 opacity-40">
          {TIMES.map((time) => (
            <div key={time} className="h-8 bg-linen/50 rounded-md border border-moss/5 flex items-center px-3 text-[10px]">
              {time}
            </div>
          ))}
        </div>

        {/* Save Button Mock */}
        <div 
          className={`save-button mt-auto py-3 rounded-xl border text-center text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
            highlightSave 
              ? 'bg-moss text-linen border-moss shadow-lg scale-[1.02]' 
              : 'bg-transparent text-moss border-moss/20'
          }`}
        >
          Zapisz termin
        </div>

        {/* Animated SVG Cursor */}
        <div 
          ref={cursorRef}
          className="absolute pointer-events-none opacity-0 z-20"
          style={{ width: 20, height: 20 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#374833" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-moss/5 flex justify-between items-center text-[8px] font-mono uppercase tracking-widest text-olive/60">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
          {status}
        </span>
        <span>Local OS: 192.168.1.1</span>
      </div>
    </RoundedContainer>
  );
};

export default CursorProtocolScheduler;
