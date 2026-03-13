import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton'
import MobileMenu from './MobileMenu'

/**
 * Navbar Component
 * Features: Morphing states (Hero/Island), Responsive mobile menu, Magnetic items.
 *
 * @param {Object} props
 * @param {boolean} [props.isHero=true] - Whether the page is at the hero position (affects visual state)
 * @param {boolean} [props.isVisible=true] - Whether the navbar is visible (used for delayed reveal)
 * @param {function} [props.onNavigate] - Optional callback for client-side navigation (receives href)
 */
export default function Navbar({ isHero = true, isVisible = true, onNavigate }) {
    const navbarRef = useRef(null)
    const containerRef = useRef(null)
    const [reducedMotion, setReducedMotion] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const lineTopRef = useRef(null)
    const lineMidRef = useRef(null)
    const lineBottomRef = useRef(null)

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const listener = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', listener)
        return () => mq.removeEventListener('change', listener)
    }, [])

    useGSAP(() => {
        // T010: GSAP Morphing Animation (Aesthetics Only)
        // VI-6: Respect prefers-reduced-motion
        // B008: Force absolute transparency when menu is open to prevent overlay issues on scroll
        gsap.to(containerRef.current, {
            backgroundColor: isMenuOpen ? 'rgba(253, 250, 240, 0)' : (isHero ? 'rgba(253, 250, 240, 0)' : 'rgba(253, 250, 240, 0.8)'),
            borderColor: isMenuOpen ? 'rgba(58, 77, 57, 0)' : (isHero ? 'rgba(58, 77, 57, 0)' : 'rgba(58, 77, 57, 0.1)'),
            backdropFilter: isMenuOpen ? 'blur(0px)' : (isHero ? 'blur(0px)' : 'blur(16px)'),
            boxShadow: isMenuOpen ? '0px 0px 0px rgba(0,0,0,0)' : (isHero ? '0px 0px 0px rgba(0,0,0,0)' : '0 1px 2px rgba(0,0,0,0.05)'),
            duration: reducedMotion ? 0 : 0.5,
            ease: 'power3.inOut',
        })
    }, { dependencies: [isHero, isMenuOpen, reducedMotion], scope: navbarRef })

    // T010: Delayed Reveal Animation
    useGSAP(() => {
        gsap.to(navbarRef.current, {
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : -20,
            pointerEvents: isVisible ? 'auto' : 'none',
            duration: reducedMotion ? 0 : 0.8,
            ease: "power4.out",
            delay: isVisible && isHero ? 0.5 : 0 // Delay only on initial reveal at hero
        })
    }, { dependencies: [isVisible, reducedMotion], scope: navbarRef })

    // B006, B007: Precision Hamburger-to-X Morph
    useGSAP(() => {
        if (!lineTopRef.current || !lineMidRef.current || !lineBottomRef.current) return

        if (isMenuOpen) {
            // Morph to X
            gsap.to(lineTopRef.current, {
                attr: { x1: 8, y1: 8, x2: 24, y2: 24 },
                duration: reducedMotion ? 0 : 0.6,
                ease: "power3.out"
            })
            gsap.to(lineMidRef.current, {
                opacity: 0,
                attr: { x1: 16, x2: 16 },
                duration: reducedMotion ? 0 : 0.4,
                ease: "power3.out"
            })
            gsap.to(lineBottomRef.current, {
                attr: { x1: 24, y1: 8, x2: 8, y2: 24 },
                duration: reducedMotion ? 0 : 0.6,
                ease: "power3.out"
            })
        } else {
            // Morph to Hamburger
            gsap.to(lineTopRef.current, {
                attr: { x1: 6, y1: 10, x2: 26, y2: 10 },
                duration: reducedMotion ? 0 : 0.6,
                ease: "power3.out"
            })
            gsap.to(lineMidRef.current, {
                opacity: 1,
                attr: { x1: 6, x2: 26 },
                duration: reducedMotion ? 0 : 0.6,
                ease: "power3.out"
            })
            gsap.to(lineBottomRef.current, {
                attr: { x1: 6, y1: 22, x2: 26, y2: 22 },
                duration: reducedMotion ? 0 : 0.6,
                ease: "power3.out"
            })
        }
    }, { dependencies: [isMenuOpen, reducedMotion], scope: navbarRef })

    const links = [
        { label: 'Oferta', href: '/oferta' },
        { label: 'O mnie', href: '/o-mnie' },
        { label: 'Obszar dojazdu', href: '/obszar-dojazdu' },
        { label: 'FAQ', href: '/faq' },
    ]

    return (
        <>
            <nav
                ref={navbarRef}
                aria-label="Nawigacja główna"
                style={{ opacity: 0, transform: 'translateY(-20px)' }}
                className={`
                    navbar fixed top-0 left-0 w-full z-[70] p-4 flex justify-center
                    ${isHero ? 'bg-transparent' : 'py-2'}
                `}
            >
                <div
                    ref={containerRef}
                    className={`
                        flex items-center justify-between rounded-full border transition-all duration-500
                        w-full max-w-(--navbar-max-width) px-4 md:px-6 py-2
                        ${isHero ? 'shadow-none' : 'shadow-sm'}
                        ${isMenuOpen ? 'bg-transparent border-transparent shadow-none' : 'bg-linen/80 border-moss/10 backdrop-blur-md'}
                    `}
                >
                    {/* Logo */}
                    <a 
                        href="/" 
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate ? onNavigate('/') : window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`
                            font-serif text-2xl font-bold tracking-tight transition-all duration-500 px-4
                            no-underline cursor-pointer
                            ${isHero && !isMenuOpen ? 'text-linen' : 'text-moss'}
                            ${isMenuOpen ? 'opacity-0 pointer-events-none translate-x-[-10px]' : 'opacity-100'}
                        `}
                    >
                        Otulenie
                    </a>

                    {/* Desktop Navigation */}
                    <div className={`
                        hidden md:flex items-center transition-all duration-500
                        ${isHero ? 'gap-8' : 'gap-4'}
                    `}>
                        {links.map((link) => (
                            <NavLink
                                key={link.label}
                                label={link.label}
                                href={link.href}
                                isHero={isHero}
                                onNavigate={onNavigate}
                            />
                        ))}
                        <MagneticButton
                            aria-label="Nasza oferta i rezerwacja"
                            className={`
                                bg-olive text-linen
                                !px-6 !py-2 text-sm shadow-none hover:shadow-lg
                                focus-visible:ring-2 focus-visible:ring-olive focus-visible:ring-offset-2
                                transition-all duration-500
                            `}
                        >
                            Zarezerwuj masaż
                        </MagneticButton>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            aria-label={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`
                                relative w-10 h-10 flex items-center justify-center pointer-events-auto bg-transparent border-none cursor-pointer 
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-full transition-all duration-300
                                ${isHero && !isMenuOpen ? 'text-linen' : 'text-moss'}
                            `}
                        >
                            <svg 
                                width="32" 
                                height="32" 
                                viewBox="0 0 32 32" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                className="overflow-visible"
                            >
                                {/* Top Line */}
                                <line 
                                    ref={el => { if (el) lineTopRef.current = el }}
                                    x1="6" y1="10" x2="26" y2="10" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round"
                                />
                                {/* Middle Line */}
                                <line 
                                    ref={el => { if (el) lineMidRef.current = el }}
                                    x1="6" y1="16" x2="26" y2="16" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round"
                                />
                                {/* Bottom Line */}
                                <line 
                                    ref={el => { if (el) lineBottomRef.current = el }}
                                    x1="6" y1="22" x2="26" y2="22" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenu 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                links={links}
            />
        </>
    )
}

/**
 * NavLink — navigation anchor with magnetic hover effect.
 *
 * @param {Object} props
 * @param {string} props.label - Visible link text
 * @param {string} props.href - Navigation target
 * @param {boolean} [props.isHero] - Whether in hero state (visual only)
 * @param {boolean} [props.isCTA] - Marks link as a call-to-action (bold)
 * @param {function} [props.onNavigate] - Optional client-side navigation callback
 */
function NavLink({ label, href, isHero, isCTA, onNavigate }) {
    const handleClick = (e) => {
        if (onNavigate) {
            e.preventDefault()
            onNavigate(href)
        }
    }

    return (
        <MagneticButton
            as="a"
            href={href}
            strength={0.2}
            onClick={handleClick}
            className={`
                bg-transparent !p-0 shadow-none hover:shadow-none
                text-sm font-medium tracking-wide transition-colors duration-500
                no-underline
                focus-visible:ring-1 focus-visible:ring-moss/30 rounded-lg
                px-3 py-1 block
                ${isHero ? 'text-linen/80 hover:text-linen' : 'text-moss/70 hover:text-moss'}
                ${isCTA ? 'font-bold' : ''}
            `}
        >
            {label}
        </MagneticButton>
    )
}
