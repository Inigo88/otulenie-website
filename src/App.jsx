import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import MagneticButton from './components/MagneticButton'
import RoundedContainer from './components/RoundedContainer'
import Navbar from './components/Navbar'

function App() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)
  const [isHero, setIsHero] = useState(true)

  useGSAP(() => {
    // T004: Setup GSAP ScrollTrigger for Navbar threshold toggle
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.create({
        start: "top top",
        end: "80px top",
        onLeave: () => setIsHero(false),
        onEnterBack: () => setIsHero(true),
      })
    })

    // VI-6: Respect prefers-reduced-motion for header entrance animation
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.1
      })
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* T004: Global Noise Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* VI-7: Skip-to-content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-moss focus:text-linen focus:px-4 focus:py-2 focus:rounded-full focus:outline-none focus:ring-2 focus:ring-olive"
      >
        Przejdź do treści
      </a>

      <Navbar isHero={isHero} />

      <main id="main-content" className="z-10 text-center max-w-2xl px-4 flex flex-col gap-8 items-center">
        <RoundedContainer className="w-full flex flex-col items-center">
          <h1
            ref={headerRef}
            className="font-serif text-5xl md:text-7xl mb-6 text-moss tracking-tight"
          >
            Otulenie <span className="font-accent italic text-olive">Calm</span>
          </h1>

          <p className="font-sans text-lg md:text-xl text-moss/80 mb-10 text-balance leading-relaxed">
            A high-fidelity, cinematic landing page foundation featuring calm, grounding wellness aesthetics.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton>
              Zarezerwuj masaż
            </MagneticButton>

            <MagneticButton className="bg-linen text-moss border border-moss/20">
              Nasza oferta
            </MagneticButton>
          </div>
        </RoundedContainer>

        {/* Demo of stacking strategy (T014) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <RoundedContainer className="text-left">
            <h2 className="text-2xl mb-4">Głębokie odprężenie</h2>
            <p className="text-moss/70 italic text-sm">Sesja 90-minutowa</p>
          </RoundedContainer>

          <RoundedContainer className="text-left">
            <h2 className="text-2xl mb-4">Mocne rozluźnienie</h2>
            <p className="text-moss/70 italic text-sm">Sesja 60-minutowa</p>
          </RoundedContainer>
        </div>
      </main>
    </div>
  )
}

export default App

