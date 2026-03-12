import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton'

/**
 * Navbar Component
 * Features: Morphing states (Hero/Island), Responsive mobile menu, Magnetic items.
 *
 * @param {Object} props
 * @param {boolean} [props.isHero=true] - Whether the page is at the hero position (affects visual state)
 * @param {function} [props.onNavigate] - Optional callback for client-side navigation (receives href)
 */
export default function Navbar({ isHero = true, onNavigate }) {
    const navbarRef = useRef(null)
    const containerRef = useRef(null)

    const [reducedMotion, setReducedMotion] = useState(false)

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
        gsap.to(containerRef.current, {
            backgroundColor: isHero ? 'rgba(253, 250, 240, 0)' : 'rgba(253, 250, 240, 0.8)',
            backdropFilter: isHero ? 'blur(0px)' : 'blur(16px)',
            duration: reducedMotion ? 0 : 0.5,
            ease: 'power3.inOut',
        })
    }, { dependencies: [isHero, reducedMotion], scope: navbarRef })

    const links = [
        { label: 'Oferta', href: '/oferta' },
        { label: 'O mnie', href: '/o-mnie' },
        { label: 'FAQ', href: '/faq' },
    ]

    return (
        <>
            <nav
                ref={navbarRef}
                aria-label="Nawigacja główna"
                className={`
        navbar fixed top-0 left-0 w-full z-50 p-6 flex justify-center transition-all duration-500
        ${isHero ? 'bg-transparent' : 'py-2'}
      `}
            >
                <div
                    ref={containerRef}
                    className={`
                        flex items-center justify-between rounded-full border border-moss/10 transition-all duration-500
                        w-full max-w-(--navbar-max-width) px-4 md:px-6 py-2
                        ${isHero ? 'shadow-none' : 'shadow-sm'}
                    `}
                >
                    {/* Logo */}
                    <div className={`
                        font-serif text-2xl font-bold tracking-tight transition-colors duration-500 px-4
                        text-moss
                    `}>
                        Otulenie
                    </div>

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
                            Zarezerwuj
                        </MagneticButton>
                    </div>

                    {/* Mobile Trigger (Inactive) */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="p-2 bg-transparent border-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-full"
                            aria-label="Menu (obecnie nieaktywne)"
                            disabled
                        >
                            <Menu className="text-moss w-8 h-8 transition-colors duration-500" />
                        </button>
                    </div>
                </div>
            </nav>
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
                text-moss/70 hover:text-moss no-underline
                focus-visible:ring-1 focus-visible:ring-moss/30 rounded-lg
                px-3 py-1 block
                ${isCTA ? 'font-bold' : ''}
            `}
        >
            {label}
        </MagneticButton>
    )
}
