import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import MagneticButton from './components/MagneticButton'
import RoundedContainer from './components/RoundedContainer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MassageCarousel from './components/MassageCarousel'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

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
      
      const speed = (index + 1) * 15
      gsap.to(shape, {
        yPercent: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
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
      {/* T009: Background parallax shapes */}
      <div 
        ref={el => shapesRef.current[0] = el}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-olive/20 rounded-full blur-[100px] pointer-events-none -z-0" 
      />
      <div 
        ref={el => shapesRef.current[1] = el}
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-sand/10 rounded-full blur-[120px] pointer-events-none -z-0" 
      />

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

function App() {
  const containerRef = useRef(null)
  const [isHero, setIsHero] = useState(true)
  const [isHeroComplete, setIsHeroComplete] = useState(false)

  useGSAP(() => {
    // Navbar threshold toggle
    ScrollTrigger.create({
      start: "top top",
      end: "80px top",
      onLeave: () => setIsHero(false),
      onEnterBack: () => setIsHero(true),
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-linen relative overflow-x-hidden">
      {/* T004: Global Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* VI-7: Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-moss focus:text-linen focus:px-4 focus:py-2 focus:rounded-full focus:outline-none focus:ring-2 focus:ring-olive"
      >
        Przejdź do treści
      </a>

      <Navbar isHero={isHero} isVisible={isHeroComplete} />

      <Hero 
        headline="Relaks, który przyjeżdża do Ciebie"
        subheadline="Profesjonalny masaż mobilny we Wrocławiu. Poczuj spokój w zaciszu własnego domu."
        backgroundUrl="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=2070"
        onHeroComplete={() => setIsHeroComplete(true)}
      />

      <main id="main-content" className="z-10 relative pt-24 pb-48 w-full max-w-full overflow-visible">
        <div className="mb-24">
          <MassageCarousel />
        </div>
        
        <PhilosophyManifesto />
      </main>
    </div>
  )
}

export default App

