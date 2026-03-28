import { useRef, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Home as HomeIcon } from 'lucide-react'
import MagneticButton from './components/MagneticButton'

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
              <div className="flex items-center gap-3 px-2 py-1">
                <HomeIcon size={20} />
                <span className="font-sans font-medium uppercase tracking-[0.2em] text-sm">
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

const TESTIMONIALS_DATA = [
  { id: 1, name: "Olek", stars: 5, text: "Wszystko spodobało się. Polecam" },
  { id: 2, name: "Michał", stars: 5, text: "Z całego serca polecam, skuteczny masaż, miła atmosfera i pełen profesjonalizm." },
  { id: 3, name: "Magdalena", stars: 5, text: "Polecam wszystkim „spiętym” osobom ❤️" },
  { id: 4, name: "Justyna", stars: 5, text: "Ulga dla pleców, polecam ❤️" },
  { id: 5, name: "Daniel", stars: 5, text: "Z czystym sumieniem polecam, pełen profesjonalizm. Dawno nie byłem na tak dobrym masażu 🙂" }
];

const TestimonialCard = ({ name, stars, text }) => (
  <article className="group relative w-[300px] md:w-[380px] h-full flex-shrink-0 bg-white/80 backdrop-blur-md p-8 rounded-[2rem] border border-moss/5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col cursor-default">
    <div className="flex mb-4">
      {[...Array(stars)].map((_, i) => (
        <Star key={i} size={16} className="fill-olive text-olive" />
      ))}
    </div>
    <div className="relative mb-6">
      <p className="font-inter text-moss/90 leading-relaxed relative z-10">
        {text}
      </p>
    </div>
    <div className="mt-auto pt-6 border-t border-moss/10">
      <h4 className="font-fraunces text-xl text-moss">{name}</h4>
    </div>
  </article>
);

const TestimonialSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isHoveredRef = useRef(false);

  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Clone first 3 items for seamless looping
  const DISPLAY_DATA = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA.slice(0, 3)];

  const nextSlide = () => {
    if (isHoveredRef.current || prefersReducedMotion) return;
    const nextIdx = currentIndexRef.current + 1;
    setCurrentIndex(nextIdx);
    currentIndexRef.current = nextIdx;
  };

  useGSAP(() => {
    if (!trackRef.current || prefersReducedMotion) return;

    const cards = Array.from(trackRef.current.children);
    const targetCard = cards[currentIndex];
    if (!targetCard) return;

    // The cards are flex items with gap-6. offsetLeft gives us the position.
    const targetX = -targetCard.offsetLeft;

    gsap.to(trackRef.current, {
      x: targetX,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // If we reached the cloned items (index == original length), jump back to real index 0
        if (currentIndex === TESTIMONIALS_DATA.length) {
          gsap.set(trackRef.current, { x: 0 });
          setCurrentIndex(0);
          currentIndexRef.current = 0;
        }
      }
    });
  }, { dependencies: [currentIndex], scope: sectionRef });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="font-fraunces text-4xl md:text-6xl text-moss mb-12 text-center md:text-left">
          Głosy spokoju
        </h2>
        
        <div className="relative overflow-hidden max-w-full md:max-w-[1188px] py-10 -my-10">
          <div 
            ref={trackRef}
            className="flex gap-6 will-change-transform"
          >
            {DISPLAY_DATA.map((t, idx) => (
              <div key={`${t.id}-${idx}`} className="flex-shrink-0">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
        <TestimonialSection />
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

