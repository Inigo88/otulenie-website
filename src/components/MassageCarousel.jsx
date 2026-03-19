import { useRef, useState, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/draggable';
import { MASSAGE_DATA } from '../constants/massageData';
import MagneticButton from './MagneticButton';

const MassageCarousel = () => {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);
  const triggerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeSlideRef = useRef(0);
  const rotationIntervalRef = useRef(null);
  const isInViewRef = useRef(false);
  const hasAnimatedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isPausedRef = useRef(false);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Clone data for infinite scroll effect
  const DISPLAY_DATA = [...MASSAGE_DATA, ...MASSAGE_DATA.slice(0, 3)];

  useGSAP(() => {
    if (!horizontalRef.current || !containerRef.current) return;

    const horizontalItems = horizontalRef.current;
    
    // Width of one full set of items
    const getBaseWidth = () => {
      const children = Array.from(horizontalItems.children);
      const originalItems = children.slice(0, MASSAGE_DATA.length);
      if (originalItems.length === 0) return 0;
      
      const lastItem = originalItems[originalItems.length - 1];
      return lastItem.offsetLeft + lastItem.offsetWidth;
    };

    // Viewport-aware ScrollTrigger for auto-rotation gating and entrance animation
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => { 
        isInViewRef.current = true; 
        
        // T016: Entrance animation (one-shot)
        if (!hasAnimatedRef.current && !prefersReducedMotion && horizontalItems.children.length > 0) {
          const cards = Array.from(horizontalItems.children).slice(0, MASSAGE_DATA.length);
          gsap.fromTo(cards, 
            { y: 30, opacity: 0 }, 
            { 
              y: 0, 
              opacity: 1, 
              stagger: 0.05, 
              duration: 0.6, 
              ease: 'power2.out',
              onComplete: () => { hasAnimatedRef.current = true; }
            }
          );
        }
      },
      onLeave: () => { isInViewRef.current = false; },
      onEnterBack: () => { isInViewRef.current = true; },
      onLeaveBack: () => { isInViewRef.current = false; }
    });

    // T003: Use a proxy for Draggable to avoid transform conflicts
    const dragProxy = document.createElement("div");
    dragProxy.style.cssText = "position:fixed; visibility:hidden; pointer-events:none;";
    document.body.appendChild(dragProxy);
    
    Draggable.create(dragProxy, {
      type: "x",
      trigger: horizontalItems,
      inertia: true,
      onPress: function() {
        gsap.set(this.target, { x: gsap.getProperty(horizontalItems, "x") });
        this.update();
        isPausedRef.current = true;
      },
      onDrag: function() {
        const baseWidth = getBaseWidth();
        let newX = this.x % baseWidth;
        if (newX > 0) newX -= baseWidth;
        gsap.set(horizontalItems, { x: newX });
      },
      onThrowUpdate: function() {
        const baseWidth = getBaseWidth();
        let newX = this.x % baseWidth;
        if (newX > 0) newX -= baseWidth;
        gsap.set(horizontalItems, { x: newX });
      },
      onThrowComplete: function() {
        const currentX = gsap.getProperty(horizontalItems, "x");
        const children = Array.from(horizontalItems.children).slice(0, MASSAGE_DATA.length);
        
        // Find closest index
        let closestIdx = 0;
        let minDiff = Infinity;
        
        children.forEach((child, i) => {
          const childTargetX = getXForIndex(i);
          const diff = Math.abs(currentX - childTargetX);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        activeSlideRef.current = closestIdx;
        setActiveSlide(closestIdx);

        // Resume auto-rotation after interaction
        setTimeout(() => {
          isPausedRef.current = false;
        }, 5000);
      }
    });

    return () => {
      st.kill();
      if (dragProxy.parentNode) dragProxy.parentNode.removeChild(dragProxy);
      Draggable.get(dragProxy)?.kill();
    };
  }, { scope: containerRef, dependencies: [] });

  // Stable helper to calculate target X for a given slide index
  const getXForIndex = useCallback((index) => {
    if (!horizontalRef.current || !triggerRef.current) return 0;
    const children = Array.from(horizontalRef.current.children);
    if (children.length === 0) return 0;
    const targetItem = children[index];
    const parentWidth = triggerRef.current.offsetWidth;
    // Center the card in the viewport
    return -(targetItem.offsetLeft - (parentWidth / 2) + (targetItem.offsetWidth / 2));
  }, []);

  const handleDotClick = (index, isAuto = false) => {
    if (!horizontalRef.current) return;

    if (!isAuto) {
      isPausedRef.current = true;
      setTimeout(() => {
        isPausedRef.current = false;
      }, 5000);
    }

    const targetX = getXForIndex(index);
    
    gsap.to(horizontalRef.current, { 
      x: targetX, 
      duration: prefersReducedMotion ? 0 : 1.0, 
      ease: 'power3.inOut',
      overwrite: 'auto',
      onUpdate: () => {
        // Sync active slide state during animation if needed
        const currentX = gsap.getProperty(horizontalRef.current, "x");
        const children = Array.from(horizontalRef.current.children).slice(0, MASSAGE_DATA.length);
        
        // Find closest index based on x position
        let closestIdx = 0;
        let minDiff = Infinity;
        
        children.forEach((child, i) => {
          const childTargetX = getXForIndex(i);
          const diff = Math.abs(currentX - childTargetX);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        });

        if (closestIdx !== activeSlideRef.current) {
          activeSlideRef.current = closestIdx;
          setActiveSlide(closestIdx);
        }
      }
    });
  };

  // Separate effect for auto-rotation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      // Gate auto-rotation by viewport, hover, and interaction state
      if (!isInViewRef.current || isHoveredRef.current || isPausedRef.current) return;

      const nextSlide = (activeSlideRef.current + 1) % MASSAGE_DATA.length;
      handleDotClick(nextSlide, true);
    }, 5000);

    return () => clearInterval(interval);
  }, [handleDotClick, prefersReducedMotion]);

  // Active card focus treatment effect
  useEffect(() => {
    if (!horizontalRef.current) return;
    
    // Select only the original cards (not clones) for the state sync
    // The items are in horizontalRef.current.children
    const children = Array.from(horizontalRef.current.children).slice(0, MASSAGE_DATA.length);
    
    children.forEach((child, index) => {
      const isActive = index === activeSlide;
      gsap.to(child, {
        scale: isActive ? 1 : 0.95,
        opacity: isActive ? 1 : 0.7,
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    });
  }, [activeSlide, prefersReducedMotion]);

  // Initial mount styling
  useEffect(() => {
    if (!horizontalRef.current) return;
    const children = Array.from(horizontalRef.current.children).slice(0, MASSAGE_DATA.length);
    
    children.forEach((child, index) => {
      const isActive = index === 0;
      gsap.set(child, {
        scale: isActive ? 1 : 0.95,
        opacity: isActive ? 1 : 0.7
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-linen py-12 md:py-20 lg:py-24 overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-16 relative z-[100]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-fraunces text-4xl text-moss md:text-6xl lg:text-7xl tracking-tight">
            Oferta
          </h2>
          
          <div className="flex gap-4 items-center bg-linen/90 backdrop-blur-xl p-3 rounded-full border border-moss/10 shadow-lg relative z-[110]">
            {MASSAGE_DATA.map((_, index) => (
              <button 
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDotClick(index);
                }}
                className={`group relative h-4 transition-all duration-300 cursor-pointer outline-none ${
                  activeSlide === index ? 'w-12' : 'w-4'
                }`}
                aria-label={`Przewiń do sekcji ${index + 1}`}
              >
                <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'bg-olive' : 'bg-olive/20 group-hover:bg-olive/40'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div 
        ref={triggerRef} 
        className="relative flex h-[500px] w-full flex-col justify-center overflow-hidden z-10 outline-none focus-visible:ring-2 focus-visible:ring-moss/50 rounded-2xl"
        role="region"
        aria-label="Oferta"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            handleDotClick((activeSlideRef.current + 1) % MASSAGE_DATA.length);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handleDotClick((activeSlideRef.current - 1 + MASSAGE_DATA.length) % MASSAGE_DATA.length);
          }
        }}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div className="relative h-full w-full overflow-hidden">
          <div 
            ref={horizontalRef} 
            className="absolute flex gap-6 md:gap-10 px-6 md:px-12 will-change-transform py-4 z-10"
          >
            {DISPLAY_DATA.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                className="group relative h-[420px] w-[290px] flex-shrink-0 cursor-grab active:cursor-grabbing overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover md:h-[460px] md:w-[380px]"
              >
                <div className="flex h-full flex-col">
                  <span className="mb-4 font-inter text-xs font-semibold uppercase tracking-[0.2em] text-olive/60">
                    {item.type}
                  </span>
                  <h3 className="mb-4 font-fraunces text-3xl text-moss md:text-4xl">
                    {item.name}
                  </h3>
                  <p className="mb-auto font-inter text-moss/80 leading-relaxed md:text-lg">
                    {item.description}
                  </p>
                  
                  <div className="mt-8 flex items-end justify-between border-t border-moss/10 pt-6">
                    <div>
                      <p className="font-fraunces text-2xl text-moss">{item.price}</p>
                      <p className="font-inter text-sm text-olive/60">{item.duration}</p>
                    </div>

                    <MagneticButton 
                      as="a" 
                      href={item.booksyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-moss text-linen px-6 py-3 text-sm"
                    >
                      Zarezerwuj
                    </MagneticButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassageCarousel;
