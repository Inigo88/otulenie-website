import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'

/**
 * PhilosophyManifesto Component
 * Features: Parallax background shapes, text reveal animation using SplitType.
 */
const PhilosophyManifesto = () => {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const shapesRef = useRef([])

  useGSAP(() => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    // T010: Implement text splitting for staggered reveal
    // V-033: Add vertical padding/negative margin to lineClass to prevent font clipping of italic serif fonts
    const split = new SplitType(textRef.current, {
      types: 'lines',
      lineClass: 'overflow-hidden py-4 -my-4 px-4 -mx-4'
    })

    // T012: Staggered slow reveal animation
    gsap.from(split.lines, {
      y: 110,
      opacity: 0,
      stagger: 0.15,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    })

    // T011: Parallax effect for background shapes
    shapesRef.current.forEach((shape, index) => {
      if (!shape) return

      // B034: Increase travel distance for noticeable depth
      const movement = (index + 1) * 50
      gsap.to(shape, {
        yPercent: movement,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        }
      })
    })

    return () => split.revert()
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-moss text-linen overflow-hidden"
      aria-labelledby="philosophy-title"
    >
      {/* T009: Background parallax shapes - B034 visibility fix */}
      <div
        ref={el => shapesRef.current[0] = el}
        className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] bg-olive/40 rounded-full blur-[80px] pointer-events-none -z-0"
      />
      <div
        ref={el => shapesRef.current[1] = el}
        className="absolute bottom-[-15%] right-[-10%] w-[55vw] h-[55vw] bg-sand/30 rounded-full blur-[100px] pointer-events-none -z-0"
      />

      {/* FR-008: Philosophy background texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none -z-10 bg-moss">
        <img
          src="/images-small/IMG-19.webp"
          alt="Artystyczne ujęcie rozlewanego olejku do masażu"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* T006: Typography structure - industry statement */}
          <p className="font-sans text-sm md:text-base uppercase tracking-[0.2em] mb-12 opacity-70">
            Większość gabinetów skupia się na usunięciu problemu...
          </p>

          {/* T006: massive, serif italic brand focus statement */}
          <h2
            id="philosophy-title"
            ref={textRef}
            className="text-4xl md:text-7xl lg:text-8xl font-serif italic leading-[1.1] selection:bg-olive selection:text-linen"
          >
            Ja skupiam się na <span className="text-olive not-italic font-sans font-bold uppercase tracking-tighter">Tobie.</span>
          </h2>
        </div>
      </div>
    </section>
  )
}

export default PhilosophyManifesto
