import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * T006-T010 & T015, T017, T021: MagneticButton Component
 * Features: GSAP Magnetic pull, scale on hover, responsive disable, prefers-reduced-motion check.
 */
function MagneticButton({ children, className = "", onClick, strength = 0.4 }) {
  const buttonRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  // T021: Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const listener = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  // T007 & T008: Setup quickTo for high-performance X/Y transforms
  const { contextSafe } = useGSAP({ scope: buttonRef })

  const xTo = useRef()
  const yTo = useRef()

  useGSAP(() => {
    xTo.current = gsap.quickTo(buttonRef.current, "x", { duration: 0.8, ease: "power3.out" })
    yTo.current = gsap.quickTo(buttonRef.current, "y", { duration: 0.8, ease: "power3.out" })
  }, { scope: buttonRef })

  const handleMouseMove = contextSafe((e) => {
    // T015: Disable magnetic effect on touch devices (no hover) or reduced motion
    if (!window.matchMedia('(hover: hover)').matches || reducedMotion) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const deltaX = clientX - centerX
    const deltaY = clientY - centerY

    // T008: Apply dampening logic
    xTo.current(deltaX * strength)
    yTo.current(deltaY * strength)
  })

  const handleMouseLeave = contextSafe(() => {
    setIsHovered(false)
    // T010: Smooth return to center
    xTo.current(0)
    yTo.current(0)
  })

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`
        relative px-8 py-4 rounded-full bg-moss text-linen font-sans font-medium 
        transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2 focus:ring-offset-linen
        ${isHovered && !reducedMotion ? 'scale-[1.03] shadow-xl' : 'scale-100 shadow-md'}
        active:scale-[0.98] cursor-pointer
        ${className}
      `}
    >
      <span className="relative z-10 pointer-events-none">
        {children}
      </span>
    </button>
  )
}

/**
 * T011-T014 & T016: RoundedContainer Component
 * Features: Semi-transparent linen background, backdrop-blur, responsive padding.
 */
function RoundedContainer({ children, className = "" }) {
  return (
    <div className={`
      relative bg-linen/70 backdrop-blur-md rounded-[2rem] md:rounded-[3rem] 
      p-6 md:p-12 overflow-hidden border border-moss/5
      ${className}
    `}>
      {children}
    </div>
  )
}

function App() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.1
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* T004: Global Noise Overlay */}
      <div className="noise-overlay" />

      <main className="z-10 text-center max-w-2xl px-4 flex flex-col gap-8 items-center">
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
            <h3 className="text-2xl mb-4">Głębokie odprężenie</h3>
            <p className="text-moss/70 italic text-sm">Sesja 90-minutowa</p>
          </RoundedContainer>

          <RoundedContainer className="text-left">
            <h3 className="text-2xl mb-4">Mocne rozluźnienie</h3>
            <p className="text-moss/70 italic text-sm">Sesja 60-minutowa</p>
          </RoundedContainer>
        </div>
      </main>
    </div>
  )
}

export default App
