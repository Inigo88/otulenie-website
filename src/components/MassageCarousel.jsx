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
  const isInViewRef = useRef(false);
  const hasAnimatedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isPausedRef = useRef(false);
  const updateWheelRef = useRef(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Use original data; no clones for infinite effect in the Wellness Wheel 011
  const DISPLAY_DATA = MASSAGE_DATA;

  useGSAP(() => {
    if (!horizontalRef.current || !containerRef.current) return;

    const horizontalItems = horizontalRef.current;
    
    // Total width of all items
    const getBaseWidth = () => {
      const children = Array.from(horizontalItems.children);
      if (children.length === 0) return 0;
      
      const lastItem = children[children.length - 1];
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
              onComplete: () => { 
                hasAnimatedRef.current = true;
                if (updateWheelRef.current) updateWheelRef.current(); // Ensure 3D layout runs after entrance 
              }
            }
          );
        }
      },
      onLeave: () => { isInViewRef.current = false; },
      onEnterBack: () => { isInViewRef.current = true; },
      onLeaveBack: () => { isInViewRef.current = false; }
    });

    // T007 - T013: Continuous GSAP Math
    const updateWheel = () => {
      if (!horizontalRef.current || !triggerRef.current || prefersReducedMotion) return;

      const trackX = gsap.getProperty(horizontalRef.current, "x");
      const parentWidth = triggerRef.current.offsetWidth;
      // Center of the viewport mapped into the horizontal track space
      const viewportCenter = -trackX + (parentWidth / 2);
      const cards = Array.from(horizontalRef.current.children);
      
      const isMobile = window.innerWidth <= 390;
      const MAX_ROTATION = isMobile ? 25 : 45; 
      const MIN_SCALE = isMobile ? 0.90 : 0.85;
      const MIN_OPACITY = 0.40;
      const MAX_Y_OFFSET = 40; 
      const EFFECT_DISTANCE = parentWidth * 0.8; 

      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = cardCenter - viewportCenter;
        const absDistance = Math.abs(distance);
        const distanceRatio = Math.min(absDistance / EFFECT_DISTANCE, 1.0);
        
        const scale = 1.0 - (distanceRatio * (1.0 - MIN_SCALE));
        const opacity = 1.0 - (distanceRatio * (1.0 - MIN_OPACITY));
        const yOffset = distanceRatio * MAX_Y_OFFSET;
        
        const rotationDirection = distance < 0 ? 1 : -1;
        const rotationY = distanceRatio * MAX_ROTATION * rotationDirection;

        gsap.set(card, {
          scale,
          opacity,
          y: yOffset,
          rotationY,
          overwrite: 'auto'
        });

        // T010: CTA Pointer Events Guard
        const cta = card.querySelector('.booksy-cta');
        if (cta) {
          cta.style.pointerEvents = distanceRatio > 0.15 ? 'none' : 'auto';
        }
      });
    };

    updateWheelRef.current = updateWheel;
    updateWheel(); // T019: Fire initially

    // T018: Resize listener inside useGSAP context natively bound
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => updateWheel(), 100);
    };
    window.addEventListener('resize', handleResize);

    // T003: Use a proxy for Draggable to avoid transform conflicts
    const dragProxy = document.createElement("div");
    dragProxy.style.cssText = "position:fixed; visibility:hidden; pointer-events:none;";
    document.body.appendChild(dragProxy);
    
    Draggable.create(dragProxy, {
      type: "x",
      trigger: horizontalItems,
      inertia: true,
      bounds: {
        minX: getXForIndex(MASSAGE_DATA.length - 1),
        maxX: getXForIndex(0)
      },
      onPress: function() {
        gsap.set(this.target, { x: gsap.getProperty(horizontalItems, "x") });
        this.update();
        isPausedRef.current = true;
      },
      onDrag: function() {
        gsap.set(horizontalItems, { x: this.x });
        updateWheel();
      },
      onThrowUpdate: function() {
        gsap.set(horizontalItems, { x: this.x });
        updateWheel();
      },
      onThrowComplete: function() {
        const currentX = gsap.getProperty(horizontalItems, "x");
        const children = Array.from(horizontalItems.children);
        
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
      window.removeEventListener('resize', handleResize);
      if (dragProxy.parentNode) dragProxy.parentNode.removeChild(dragProxy);
      Draggable.get(dragProxy)?.kill();
    };
  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

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

  const handleDotClick = useCallback((index, isAuto = false) => {
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
        if (updateWheelRef.current) updateWheelRef.current(); // T015: Programmatic update

        // Sync active slide state during animation if needed
        const currentX = gsap.getProperty(horizontalRef.current, "x");
        const children = Array.from(horizontalRef.current.children).slice(0, MASSAGE_DATA.length);
        
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
  }, [getXForIndex, prefersReducedMotion]);

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


  return (
    <section ref={containerRef} className="relative w-full bg-linen py-12 md:py-20 lg:py-24 overflow-x-hidden [perspective:1000px]">
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
            className="absolute flex gap-6 md:gap-10 px-6 md:px-12 will-change-transform py-4 z-10 [transform-style:preserve-3d]"
          >
            {DISPLAY_DATA.map((item, idx) => (
              <div 
                key={`${item.id}-${idx}`} 
                onClick={() => {
                  // T011: Outer card click bypasses disabled CTA to center card
                  const originalIndex = idx % MASSAGE_DATA.length;
                  handleDotClick(originalIndex);
                }}
                onFocus={() => {
                  // T014: Keyboard focus ensures wheel spins to active
                  const originalIndex = idx % MASSAGE_DATA.length;
                  handleDotClick(originalIndex);
                }}
                tabIndex={0}
                className="group relative h-[420px] w-[290px] flex-shrink-0 cursor-grab active:cursor-grabbing overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-moss/50 focus:outline-none md:h-[460px] md:w-[380px] [backface-visibility:hidden]"
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
                      href="#oferta" 
                      className="booksy-cta bg-moss text-linen px-6 py-3 text-sm"
                      aria-label={`Dowiedz się więcej o masażu: ${item.name}`}
                    >
                      Dowiedz się więcej
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
