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

/**
 * useBooksyWidget - Dynamically loads the Booksy widget script.
 * @param {string} widgetId - The Booksy business ID.
 * @returns {Object} { isLoaded, error }
 */
const useBooksyWidget = (widgetId) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!widgetId) return

    // Check if script already exists
    if (document.querySelector('script[src*="booksy.com/widget/code.js"]')) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://booksy.com/widget/code.js?id=${widgetId}&country=pl&lang=pl`
    script.async = true

    script.onload = () => setIsLoaded(true)
    script.onerror = () => setError('Failed to load Booksy widget')

    document.body.appendChild(script)

    return () => {
      // We generally keep the script loaded to prevent flickering on navigation,
      // but if the component unmounts and we want strict cleanup:
      // document.body.removeChild(script);
    }
  }, [widgetId])

  return { isLoaded, error }
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)


function App() {
  const containerRef = useRef(null)
  const [isHero, setIsHero] = useState(true)
  const [isHeroComplete, setIsHeroComplete] = useState(false)

  // T002: Foundational - Load Booksy widget script
  const { isLoaded: isBooksyLoaded } = useBooksyWidget(BOOKSY_WIDGET_ID)

  useGSAP(() => {
    // Navbar threshold toggle
    ScrollTrigger.create({
      start: "top top",
      end: "80px top",
      onLeave: () => setIsHero(false),
      onEnterBack: () => setIsHero(true),
    })
  }, { scope: containerRef })

  // B046: Handle Booksy widget closing (Backdrop click / Escape key)
  useEffect(() => {
    const handleCloseBooksy = (e) => {
      const isBackdropClick = e.type === 'click' && e.target.classList.contains('booksy-widget-overlay');
      const isEscapePress = e.type === 'keydown' && e.key === 'Escape';

      if (isBackdropClick || isEscapePress) {
        const overlay = document.querySelector('.booksy-widget-overlay');
        const dialog = document.querySelector('.booksy-widget-dialog');
        
        if (overlay || dialog) {
          overlay?.remove();
          dialog?.remove();
          // Restore scrolling (Booksy script usually adds overflow: hidden to body)
          document.body.style.overflow = '';
          document.body.style.position = '';
        }
      }
    };

    document.addEventListener('click', handleCloseBooksy);
    document.addEventListener('keydown', handleCloseBooksy);

    return () => {
      document.removeEventListener('click', handleCloseBooksy);
      document.removeEventListener('keydown', handleCloseBooksy);
    };
  }, []);

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

