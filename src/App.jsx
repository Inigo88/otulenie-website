import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'
import { Instagram, Facebook } from 'lucide-react'

import MagneticButton from './components/MagneticButton'
import RoundedContainer from './components/RoundedContainer'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MassageCarousel from './components/MassageCarousel'

const FOOTER_LINKS = [
  { name: 'Główna', href: '#top' },
  { name: 'Oferta', href: '#oferta' },
  { name: 'O mnie', href: '#o-mnie' },
  { name: 'Dojazd', href: '#dojazd' },
  { name: 'FAQ', href: '#faq' }
]

const SOCIAL_LINKS = [
  { name: 'Instagram', href: 'https://www.instagram.com/pm.otulenie/', icon: 'Instagram' },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61579695762768', icon: 'Facebook' }
]

const LEGAL_LINKS = [
  { name: 'Polityka Prywatności', href: '/polityka-prywatnosci' },
  { name: 'Regulamin', href: '/regulamin' }
]

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

const STACKING_CARDS = [
  {
    id: 1,
    title: "Relaks w Twoim Domu",
    description: "Zapomnij o korkach i pośpiechu. Przywożę ze sobą wszystko, co potrzebne by zamienić Twój salon w profesjonalny salon masażu. Po wszystkim nie musisz nigdzie wracać – zostajesz w swojej bezpiecznej przestrzeni, pozwalając ciału na pełne odprężenie.",
    image: "/images-small/IMG-07.webp",
    altText: "Przytulnie przygotowany stół do masażu w domowym wnętrzu z ciepłym oświetleniem",
    color: "bg-olive",
    textColor: "text-linen"
  },
  {
    id: 2,
    title: "Moc Uważności",
    description: "To nie jest masaż „na szybko”. Każdy ruch jest świadomy i celowy. Zamiast sztywnych schematów, podążam za sygnałami Twojego ciała, dostosowując nacisk i tempo, by uwolnić dokładnie te napięcia, które Cię obciążają.",
    image: "/images-small/IMG-12.webp",
    altText: "Zbliżenie na dłonie terapeuty wykonujące uważny masaż z użyciem naturalnych olejków",
    color: "bg-moss",
    textColor: "text-linen"
  },
  {
    id: 3,
    title: "Głęboka Regeneracja",
    description: "Twoje ciało pamięta każdy stres i godziny spędzone przy biurku. Precyzyjny, głęboki masaż fizycznie rozpuszcza blokady w karku i ramionach, wyciszając układ nerwowy i przynosząc uczucie prawdziwego, regenerującego relaksu.",
    image: "/images-small/IMG-14.webp",
    altText: "Detale zestawu do masażu: naturalne oleje i kamienie w spokojnej aranżacji",
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
      className={`${reducedMotion ? 'relative' : 'sticky'} w-full max-w-5xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[550px] md:h-[500px] ${index === total - 1 ? 'mb-0' : 'mb-[10vh]'} ${card.color} ${card.textColor}`}
      style={{
        top: reducedMotion ? 'auto' : `calc(50vh - 250px + ${index * 32}px)`,
        zIndex: index + 1
      }}
    >
      <div className="w-full md:w-1/2 h-[250px] md:h-full overflow-hidden bg-moss">
        <img
          src={card.image}
          alt={card.altText}
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

    // B035: Set explicit initial state to prevent "black flicker" on mount/scroll
    gsap.set(cards, { filter: 'brightness(1)', scale: 1 })


    // B037: Unified lifecycle timeline for each card to prevent scale/filter conflicts
    cards.forEach((card, i) => {
      const nextCard = cards[i + 1]

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 98%",
          // The lifecycle ends when the next card finishes its entry
          endTrigger: nextCard || card,
          end: nextCard ? "top 12%" : "bottom 0%",
          scrub: true,
          invalidateOnRefresh: true
        }
      })

      // 1. Enter (occupies the first part of the scroll range)
      tl.fromTo(card,
        { scale: 0.9, filter: 'brightness(0.8)', opacity: 0 },
        { scale: 1, filter: 'brightness(1)', opacity: 1, duration: 1, ease: 'none' }
      )

      // 2. Persistent state (active focus)
      // The timeline will naturally pause and hold the 'scale: 1' state until the next card movements begin
      // We use a relative offset to start the exit when the next card enters
      if (nextCard) {
        // The exit should be much slower and happen as the next card scrolls up
        tl.to(card, {
          scale: 0.9,
          filter: 'brightness(0.4)', // Dim further for depth
          ease: 'none',
          duration: 1
        }, "+=1") // Add a gap (duration: 1) where the card stays at scale 1
      } else {
        // B043: For the last card, we add a dummy hold phase so the 'Enter' 
        // animation doesn't stretch across the entire remaining scroll distance.
        // This ensures it reaches 100% focus while it is centered.
        tl.to({}, { duration: 2 })
      }
    })
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative px-6 md:px-12 pt-32 pb-[20vh] bg-linen"
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

const Footer = () => {

  return (
    <footer
      className="bg-moss text-linen pt-20 pb-10 rounded-t-[2rem] md:rounded-t-[3rem] relative overflow-hidden"
    >
      {/* Subtle Noise for deep background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-serif text-3xl font-bold mb-6">Otulenie</h2>
            <p className="text-linen/70 text-sm leading-relaxed md:max-w-[200px]">
              Relaks, który przyjeżdża do Ciebie. Profesjonalny masaż mobilny we Wrocławiu.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="col-span-1">
            <h3 className="font-sans text-xs uppercase tracking-widest text-olive font-bold mb-6">Nawigacja</h3>
            <ul className="space-y-4">
              {FOOTER_LINKS.map(link => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-linen/80 hover:text-linen transition-all duration-300 inline-block hover:scale-[1.03] hover:-translate-y-[1px]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h3 className="font-sans text-xs uppercase tracking-widest text-olive font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+48780530235" className="text-linen/80 hover:text-linen transition-colors">
                  +48 780 530 235
                </a>
              </li>
              <li>
                <a href="mailto:pm.otulenie@gmail.com" className="text-linen/80 hover:text-linen transition-colors">
                  pm.otulenie@gmail.com
                </a>
              </li>
              <li className="text-linen/60 text-sm">
                Obszar działania: Wrocław i okolice
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-sans text-xs uppercase tracking-widest text-olive font-bold mb-6">Obserwuj nas</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(social => (
                <MagneticButton
                  key={social.name}
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.3}
                  className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center text-linen hover:bg-olive transition-colors duration-300"
                  aria-label={`Obserwuj nas na ${social.name}`}
                >
                  {social.icon === 'Instagram' ? <Instagram size={20} /> : <Facebook size={20} />}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-linen/10 flex flex-row flex-wrap justify-between items-center gap-6">
          <p className="text-linen/40 text-xs">
            © 2026 Otulenie - Praktyka masażu. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4 md:gap-8">
            {LEGAL_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="text-linen/40 hover:text-linen/70 transition-colors text-xs"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
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

