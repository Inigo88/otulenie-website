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

const STACKING_CARDS = [
  {
    id: 1,
    title: "Relaks w Twoim Domu",
    description: "Zapomnij o korkach i pośpiechu. Przywożę ze sobą wszystko, co potrzebne by zamienić Twój salon w profesjonalny salon masażu. Po wszystkim nie musisz nigdzie wracać – zostajesz w swojej bezpiecznej przestrzeni, pozwalając ciału na pełne odprężenie.",
    image: "/images/stacking/relaks.png",
    color: "bg-olive",
    textColor: "text-linen"
  },
  {
    id: 2,
    title: "Moc Uważności",
    description: "To nie jest masaż „na szybko”. Każdy ruch jest świadomy i celowy. Zamiast sztywnych schematów, podążam za sygnałami Twojego ciała, dostosowując nacisk i tempo, by uwolnić dokładnie te napięcia, które Cię obciążają.",
    image: "/images/stacking/uwaznosc.png",
    color: "bg-moss",
    textColor: "text-linen"
  },
  {
    id: 3,
    title: "Głęboka Regeneracja",
    description: "Twoje ciało pamięta każdy stres i godziny spędzone przy biurku. Precyzyjny, głęboki masaż fizycznie rozpuszcza blokady w karku i ramionach, wyciszając układ nerwowy i przynosząc uczucie prawdziwego, regenerującego relaksu.",
    image: "/images/stacking/regeneracja.png",
    color: "bg-sand",
    textColor: "text-moss"
  }
]

const StackingCard = ({ card, index, total, cardRefs }) => {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const listener = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return (
    <div 
      ref={el => cardRefs.current[index] = el}
      className={`${reducedMotion ? 'relative' : 'sticky'} w-full max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row mb-[10vh] ${card.color} ${card.textColor}`}
      style={{ 
        top: reducedMotion ? 'auto' : `calc(8vh + ${index * 32}px)`,
        zIndex: index + 1
      }}
    >
      <div className="w-full md:w-1/2 h-[250px] md:h-auto overflow-hidden">
        <img 
          src={card.image} 
          alt={card.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <h3 className="text-2xl md:text-5xl font-serif mb-4 md:mb-6 leading-tight">
          {card.title}
        </h3>
        <p className="text-base md:text-xl font-sans opacity-90 leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  )
}

const StackingArchive = () => {
  const containerRef = useRef(null)
  const cardRefs = useRef([])

  useGSAP(() => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const cards = cardRefs.current.filter(Boolean)
    
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return // Last card doesn't scale down

      gsap.to(card, {
        scale: 0.9,
        filter: 'brightness(0.6)',
        scrollTrigger: {
          trigger: cards[i + 1], // Triggered when NEXT card enters
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        }
      })
    })
  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef} 
      className="relative px-6 md:px-12 py-32 bg-linen"
      aria-labelledby="archive-title"
    >
      <h2 id="archive-title" className="sr-only">Archiwum Korzyści</h2>
      <div className="max-w-7xl mx-auto relative">
        {STACKING_CARDS.map((card, index) => (
          <StackingCard 
            key={card.id} 
            card={card} 
            index={index} 
            total={STACKING_CARDS.length}
            cardRefs={cardRefs}
          />
        ))}
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

        <StackingArchive />
      </main>
    </div>
  )
}

export default App

