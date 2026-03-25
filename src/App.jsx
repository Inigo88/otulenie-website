import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
  BOOKSY_WIDGET_ID,
} from './constants/links'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MassageCarousel from './components/MassageCarousel'
import PhilosophyManifesto from './components/PhilosophyManifesto'
import StackingArchive from './components/StackingArchive'
import Footer from './components/Footer'

import BooksyWidget from './components/BooksyWidget'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)


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
      {/* Centralized Booksy logic and script loading */}
      <BooksyWidget />
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
        backgroundUrl="/images-small/IMG-05.webp"
        altText="Bliżenie na luksusowe akcesoria do masażu: olejki i naturalne ręczniki w ciepłym świetle"
        onHeroComplete={() => setIsHeroComplete(true)}
      />

      <main id="main-content" className="z-10 relative pt-24 pb-0 w-full max-w-full overflow-visible">
        <div className="mb-24">
          <MassageCarousel />
        </div>

        <PhilosophyManifesto />

        <StackingArchive />
      </main>

      <Footer />
    </div>
  )
}

export default App

