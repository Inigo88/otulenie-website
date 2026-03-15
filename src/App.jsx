import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'

import MagneticButton from './components/MagneticButton'
import RoundedContainer from './components/RoundedContainer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeatureCards from './components/FeatureCards/FeatureCards'

function App() {
  const containerRef = useRef(null)
  const [isHero, setIsHero] = useState(true)
  const [isHeroComplete, setIsHeroComplete] = useState(false)

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

      <main id="main-content" className="z-10 relative py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-16 items-center">
        <RoundedContainer className="w-full max-w-4xl flex flex-col items-center bg-white/50 backdrop-blur-sm border-moss/10 p-12">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-moss tracking-tight text-center">
            Poczuj <span className="font-accent italic text-olive">uważność</span>
          </h2>

          <p className="font-sans text-lg text-moss/80 mb-10 text-center max-w-xl leading-relaxed">
            Otulenie to coś więcej niż masaż. To czas, w którym Twoje ciało i umysł odnajdują równowagę.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton className="bg-linen text-moss border border-moss/20">
              Oferta
            </MagneticButton>
          </div>
        </RoundedContainer>

        <FeatureCards />

        {/* Placeholder for future sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <RoundedContainer className="text-left bg-white/30 p-8 border-moss/5">
            <h3 className="text-2xl font-serif mb-4 text-moss">Mobilny Komfort</h3>
            <p className="text-moss/70 leading-relaxed">Przyjeżdżam z profesjonalnym stołem i naturalnymi olejkami. Ty potrzebujesz tylko kawałka przestrzeni.</p>
          </RoundedContainer>

          <RoundedContainer className="text-left bg-white/30 p-8 border-moss/5">
            <h3 className="text-2xl font-serif mb-4 text-moss">Wrocław i Okolice</h3>
            <p className="text-moss/70 leading-relaxed">Działam na terenie całego Wrocławia, przynosząc spokój bezpośrednio do Twoich drzwi.</p>
          </RoundedContainer>
        </div>
      </main>
    </div>
  )
}

export default App

