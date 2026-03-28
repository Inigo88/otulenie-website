import { useRef, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './components/MagneticButton'
import Testimonials from './components/Testimonials'

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

const NotFound = () => {
  const containerRef = useRef(null)
  const slothRef = useRef(null)
  const textRef = useRef(null)
  const buttonRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.from(slothRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1.5,
      delay: 0.2
    })
    .from([textRef.current.children, buttonRef.current], {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
    }, "-=1")
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen bg-linen flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(55,72,51,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl w-full flex flex-col items-center relative z-10">
        {/* Asset Container */}
        <div ref={slothRef} className="relative w-64 h-64 md:w-80 md:h-80 mb-12 group">
          <div className="absolute inset-0 bg-moss/5 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          <div className="relative w-full h-full rounded-full overflow-hidden border border-moss/10 bg-sand/30 backdrop-blur-sm flex items-center justify-center shadow-inner">
            <img 
              src="/404-sloth.png" 
              alt="Relaksujący się leniwiec pod kocem" 
              className="w-full h-full object-cover mix-blend-multiply opacity-90 scale-105"
            />
          </div>
        </div>

        <div ref={textRef} className="space-y-6">
          <h1 className="font-serif text-moss text-8xl md:text-9xl tracking-tighter leading-none">
            404
          </h1>
          
          <div className="max-w-md mx-auto h-px bg-moss/15 w-24" />

          <p className="font-sans text-moss/90 text-xl md:text-2xl font-light leading-relaxed max-w-lg mx-auto">
            Zatopiliśmy się w relaksie tak głęboko, że zgubiliśmy ten adres. Odnajdźmy się wspólnie.
          </p>
        </div>

        <div ref={buttonRef} className="mt-16">
          <Link to="/" className="inline-block no-underline">
            <MagneticButton>
              <div className="flex items-center justify-center px-2 py-1">
                <span className="font-sans font-medium uppercase tracking-[0.2em] text-sm md:text-base">
                  Strona główna
                </span>
              </div>
            </MagneticButton>
          </Link>
        </div>
      </div>
    </div>
  )
}


const HomePage = ({ setIsHero, setIsHeroComplete, isHeroComplete }) => {
  const containerRef = useRef(null)

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
    <div ref={containerRef} className="w-full">
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
        <Testimonials />
        <StackingArchive />
      </main>
    </div>
  )
}

function App() {
  const [isHero, setIsHero] = useState(true)
  const [isHeroComplete, setIsHeroComplete] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linen relative overflow-x-hidden">
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

        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Navbar isHero={isHero} isVisible={isHeroComplete} />
                <HomePage 
                  setIsHero={setIsHero} 
                  setIsHeroComplete={setIsHeroComplete} 
                  isHeroComplete={isHeroComplete} 
                />
                <Footer />
              </>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

