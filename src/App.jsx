import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function App() {
  const containerRef = useRef(null)
  const headerRef = useRef(null)

  // T010: Test GSAP animation context
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
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* T005: Global Noise Overlay */}
      <div className="noise-overlay"></div>

      <main className="z-10 text-center max-w-2xl px-4">
        <h1
          ref={headerRef}
          className="font-serif text-5xl md:text-7xl mb-6 text-moss tracking-tight"
        >
          Otulenie <span className="font-accent italic text-olive">Calm</span>
        </h1>

        <p className="font-sans text-lg md:text-xl text-moss/80 mb-10 text-balance">
          A high-fidelity, cinematic landing page foundation featuring calm, grounding wellness aesthetics.
        </p>

        <button className="bg-moss text-linen font-sans font-medium px-8 py-4 rounded-full cursor-pointer shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.03] hover:-translate-y-[1px] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2 focus:ring-offset-linen">
          Zarezerwuj masaż
        </button>
      </main>
    </div>
  )
}

export default App
