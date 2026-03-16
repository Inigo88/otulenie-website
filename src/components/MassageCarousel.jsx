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

  useGSAP(() => {
    if (!horizontalRef.current || !triggerRef.current) return;

    const horizontalItems = horizontalRef.current;
    const calculateWidth = () => horizontalItems.scrollWidth - window.innerWidth + (window.innerWidth * 0.1);

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      start: 'top top',
      end: () => `+=${calculateWidth()}`,
      invalidateOnRefresh: true
    });

    gsap.to(horizontalItems, {
      x: () => -calculateWidth(),
      ease: 'none',
      scrollTrigger: st
    });

    return () => st.kill();
  }, { scope: containerRef });

  // Separate effect for rotation to keep useGSAP clean and avoid stale ScrollTrigger references
  useEffect(() => {
    rotationIntervalRef.current = setInterval(() => {
      // Find ScrollTrigger for this component
      const st = ScrollTrigger.getAll().find(s => s.trigger === triggerRef.current);
      if (!st) return;

      const nextSlide = (activeSlideRef.current + 1) % MASSAGE_DATA.length;
      const targetScroll = st.start + (st.end - st.start) * (nextSlide / (MASSAGE_DATA.length - 1));
      
      gsap.to(window, { 
        scrollTo: targetScroll, 
        duration: 1.2, 
        ease: 'power2.inOut',
        overwrite: 'auto'
      });
    }, 6000);

    return () => {
      if (rotationIntervalRef.current) clearInterval(rotationIntervalRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-linen py-20">
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Static Header outside pinned content */}
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-end justify-between">
          <h2 className="font-fraunces text-4xl text-moss md:text-6xl tracking-tight">
            Nasza <span className="font-accent italic text-olive">Oferta</span>
          </h2>
          
          <div className="flex gap-2 pb-2">
            {MASSAGE_DATA.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'w-8 bg-olive' : 'w-2 bg-olive/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={triggerRef} className="relative flex h-[500px] w-full flex-col justify-center overflow-hidden">

        <div className="relative h-[500px] w-full overflow-hidden">
          <div 
            ref={horizontalRef} 
            className="absolute flex gap-8 px-6 md:px-12 will-change-transform"
          >
            {MASSAGE_DATA.map((item) => (
              <div 
                key={item.id} 
                className="group relative h-[450px] w-[300px] flex-shrink-0 cursor-grab overflow-hidden rounded-[2rem] bg-white p-8 shadow-card transition-shadow hover:shadow-card-hover md:w-[400px]"
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
