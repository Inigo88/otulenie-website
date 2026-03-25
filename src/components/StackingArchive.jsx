import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

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

/**
 * StackingArchive Component
 * Features: GSAP ScrollTrigger controlled sticky stacking cards.
 */
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

export default StackingArchive
