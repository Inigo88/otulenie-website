import { useRef, useState, useEffect } from 'react';
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

  // Clone data for infinite scroll effect
  const DISPLAY_DATA = [...MASSAGE_DATA, ...MASSAGE_DATA.slice(0, 3)];

  useGSAP(() => {
    if (!horizontalRef.current || !containerRef.current) return;

    const horizontalItems = horizontalRef.current;
    
    // Width of one full set of items
    const getBaseWidth = () => {
      // Calculate width of original MASSAGE_DATA items only
      const children = Array.from(horizontalItems.children);
      const originalItems = children.slice(0, MASSAGE_DATA.length);
      if (originalItems.length === 0) return 0;
      
      const lastItem = originalItems[originalItems.length - 1];
      return lastItem.offsetLeft + lastItem.offsetWidth;
    };

    const scrollDistance = window.innerHeight * 3; // Fixed large scroll for better control

    // Simplified ScrollTrigger for state tracking only (no pinning, no linked animation)
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => {
        // Optional: track if section is in focus
      }
    });

    // Helper to calculate target X for a given slide index
    const getXForIndex = (index) => {
      const children = Array.from(horizontalItems.children);
      if (children.length === 0) return 0;
      const targetItem = children[index];
      const parentWidth = triggerRef.current.offsetWidth;
      // Center the card in the viewport
      return -(targetItem.offsetLeft - (parentWidth / 2) + (targetItem.offsetWidth / 2));
    };

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
      },
      onDrag: function() {
        const baseWidth = getBaseWidth();
        let newX = this.x % baseWidth;
        if (newX > 0) newX -= baseWidth;
        gsap.set(horizontalItems, { x: newX });
        
        // Update active slide during drag
        const progress = Math.abs(newX) / baseWidth;
        const index = Math.round(progress * MASSAGE_DATA.length) % MASSAGE_DATA.length;
        if (index !== activeSlideRef.current) {
          activeSlideRef.current = index;
          setActiveSlide(index);
        }
      },
      onThrowUpdate: function() {
        const baseWidth = getBaseWidth();
        let newX = this.x % baseWidth;
        if (newX > 0) newX -= baseWidth;
        gsap.set(horizontalItems, { x: newX });
      }
    });

    return () => {
      st.kill();
      if (dragProxy.parentNode) dragProxy.parentNode.removeChild(dragProxy);
      Draggable.get(dragProxy)?.kill();
    };
  }, { scope: containerRef, dependencies: [] });

  const handleDotClick = (index, isAuto = false) => {
    if (!horizontalRef.current) return;

    const baseWidth = Array.from(horizontalRef.current.children)
      .slice(0, MASSAGE_DATA.length)
      .reduce((acc, child) => acc + child.offsetWidth + 40, 0); // Approx width with gaps

    // Simplified horizontal animation
    const targetX = -(index * (horizontalRef.current.scrollWidth / DISPLAY_DATA.length));
    
    gsap.to(horizontalRef.current, { 
      x: targetX, 
      duration: 1.0, 
      ease: 'power3.inOut',
      overwrite: 'auto',
      onUpdate: () => {
        // Sync active slide state during animation if needed
        const currentX = gsap.getProperty(horizontalRef.current, "x");
        const progress = Math.abs(currentX) / (horizontalRef.current.scrollWidth - horizontalRef.current.offsetWidth);
        const activeIdx = Math.round(progress * (MASSAGE_DATA.length - 1)) % MASSAGE_DATA.length;
        if (activeIdx !== activeSlideRef.current) {
          activeSlideRef.current = activeIdx;
          setActiveSlide(activeIdx);
        }
      }
    });
  };

  // Separate effect for auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      const st = ScrollTrigger.getAll().find(s => s.trigger === containerRef.current);
      // Only auto-rotate if the section is somewhat in view
      if (!st || !st.isActive) return;

      const nextSlide = (activeSlideRef.current + 1) % MASSAGE_DATA.length;
      handleDotClick(nextSlide, true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-linen py-12 md:py-20 lg:py-24 overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true" />
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-16 relative z-[100]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-fraunces text-4xl text-moss md:text-6xl lg:text-7xl tracking-tight">
            Nasza <span className="font-accent italic text-olive">Oferta</span>
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

      <div ref={triggerRef} className="relative flex h-[500px] w-full flex-col justify-center overflow-hidden z-10">
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
