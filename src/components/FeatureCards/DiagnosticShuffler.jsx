import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Zap, Heart, Wind, Flame, ArrowRight } from 'lucide-react';
import RoundedContainer from '../RoundedContainer';
import MagneticButton from '../MagneticButton';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const MASSAGE_DATA = [
  {
    id: 'mocne',
    name: 'Masaż Mocny',
    description: 'Intensywna regeneracja dla spiętych mięśni i osób aktywnych.',
    booksyUrl: 'https://booksy.com',
    icon: Zap,
    color: 'bg-moss text-linen',
  },
  {
    id: 'glebokie',
    name: 'Masaż Głęboki',
    description: 'Precyzyjna praca na tkankach głębokich dla trwałej ulgi.',
    booksyUrl: 'https://booksy.com',
    icon: Heart,
    color: 'bg-olive text-linen',
  },
  {
    id: 'czule',
    name: 'Masaż Czuły',
    description: 'Delikatny dotyk przywracający spokój i emocjonalną równowagę.',
    booksyUrl: 'https://booksy.com',
    icon: Wind,
    color: 'bg-sand text-moss',
  },
  {
    id: 'cieple',
    name: 'Masaż Ciepły',
    description: 'Rozgrzewająca terapia kamieniami dla głębokiego odprężenia.',
    booksyUrl: 'https://booksy.com',
    icon: Flame,
    color: 'bg-white text-moss',
  },
];

const DiagnosticShuffler = () => {
  const containerRef = useRef(null);
  const [items, setItems] = useState(MASSAGE_DATA);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const shuffle = () => {
    setItems((prev) => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });
  };

  useGSAP(() => {
    if (isPaused || reducedMotion) return;
    
    timerRef.current = setInterval(shuffle, 3000);
    return () => clearInterval(timerRef.current);
  }, [isPaused, reducedMotion]);

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.shuffler-card');
    
    gsap.to(cards, {
      y: (i) => i * 24,
      scale: (i) => 1 - i * 0.05,
      zIndex: (i) => 10 - i,
      opacity: (i) => (i > 2 ? 0 : 1 - i * 0.2),
      duration: 1,
      ease: 'back.out(1.7)',
    });
  }, [items]);

  return (
    <RoundedContainer 
      className="bg-white/40 border-moss/5 p-8 min-h-[450px] flex flex-col relative overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-8">
        <span className="text-xs font-sans tracking-widest uppercase text-olive opacity-80 block mb-2">
          Dobierz masaż
        </span>
        <h3 className="text-2xl font-serif text-moss">Diagnostyczny Shuffler</h3>
      </div>

      <div ref={containerRef} className="relative flex-grow mt-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`shuffler-card absolute inset-0 w-full h-[220px] rounded-2xl p-6 shadow-card transition-shadow duration-500 flex flex-col justify-between ${item.color} ${index === 0 ? 'shadow-xl' : 'shadow-sm'}`}
              style={{ 
                transformOrigin: 'top center',
                zIndex: items.length - index
              }}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${index === 0 ? 'bg-white/10' : 'bg-moss/5'}`}>
                  <Icon size={24} />
                </div>
                {index === 0 && (
                  <span className="text-[10px] uppercase tracking-tighter opacity-50 border border-current rounded-full px-2 py-0.5">
                    Polecane
                  </span>
                )}
              </div>
              
              <div>
                <h4 className="font-serif text-xl mb-1">{item.name}</h4>
                <p className="text-sm opacity-80 leading-snug line-clamp-2">{item.description}</p>
              </div>

              {index === 0 && (
                <div className="mt-4">
                  <MagneticButton 
                    as="a"
                    href={item.booksyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all bg-white/20 text-current border-none px-6 py-2"
                  >
                    Zarezerwuj teraz <ArrowRight size={14} />
                  </MagneticButton>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-moss/40">
        <span>Przewijanie automatyczne</span>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? 'w-4 bg-olive' : 'w-1 bg-moss/10'}`} 
            />
          ))}
        </div>
      </div>
    </RoundedContainer>
  );
};

export default DiagnosticShuffler;
