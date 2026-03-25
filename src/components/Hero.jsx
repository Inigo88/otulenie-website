import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { BOOKSY_URL } from '../constants/links';
import MagneticButton from './MagneticButton';

/**
 * Hero Section Component
 * Establishing a cinematic, premium wellness aesthetic.
 * 
 * @param {Object} props
 * @param {string} props.headline - Primary brand message
 * @param {string} props.subheadline - Supporting message
 * @param {string} props.backgroundUrl - Optimized local WebP URL
 * @param {string} props.altText - Mandatory accessibility text
 * @param {Function} props.onHeroComplete - Callback fired after entrance GSAP timeline finishes
 */
const Hero = ({ headline, subheadline, backgroundUrl, altText, onHeroComplete }) => {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onHeroComplete) onHeroComplete();
      }
    });

    // VI-6: Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], { opacity: 1, y: 0 });
      tl.play(); // Immediate complete
      return;
    }

    // Entrance sequence
    tl.fromTo(bgRef.current, 
      { scale: 1.1, filter: 'blur(10px)' }, 
      { scale: 1, filter: 'blur(0px)', duration: 2, ease: "power2.out" }
    )
    .fromTo(headlineRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
      "-=1.5"
    )
    .fromTo(subheadlineRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );

  }, { scope: containerRef });

  /**
   * handleBookingClick - Triggers the official Booksy widget overlay
   * by programmatically clicking the hidden .booksy-widget-button.
   */
  const handleBookingClick = (e) => {
    const booksyBtn = document.querySelector('.booksy-widget-button');
    if (booksyBtn) {
      e.preventDefault();
      booksyBtn.click();
    }
    // Else: Fallback to the direct BOOKSY_URL link defined in props
  };

  return (
    <section 
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-moss"
    >
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgRef}
          src={backgroundUrl} 
          alt={altText} 
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay (FR-002) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        
        {/* Constitution I: Noise Overlay */}
        <div className="noise-overlay opacity-10" aria-hidden="true" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 text-center text-linen">
        <h1 
          ref={headlineRef}
          className="text-5xl md:text-8xl font-fraunces mb-8 leading-[1.1] tracking-tight text-linen drop-shadow-sm"
        >
          {headline}
        </h1>
        <p 
          ref={subheadlineRef}
          className="text-xl md:text-2xl font-inter max-w-3xl mx-auto text-linen/90 leading-relaxed font-light mb-12"
        >
          {subheadline}
        </p>
        <div ref={ctaRef} className="flex justify-center">
          <MagneticButton 
            as="a"
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBookingClick}
            className="ms-booking-button bg-olive text-linen px-10 py-5 text-xl font-medium rounded-full shadow-2xl hover:bg-moss transition-colors"
            aria-label="Zarezerwuj masaż (otwiera nową kartę / okno Booksy)"
          >
            Zarezerwuj masaż
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
