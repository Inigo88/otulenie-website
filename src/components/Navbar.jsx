import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Menu, X } from 'lucide-react'
import MagneticButton from './MagneticButton'

/**
 * Navbar Component
 * Features: Morphing states (Hero/Island), Responsive mobile menu, Magnetic items.
 */
export default function Navbar({ isHero = true, onNavigate }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navbarRef = useRef(null)
    const containerRef = useRef(null)

    useGSAP(() => {
        // T010: GSAP Morphing Animation (Aesthetics Only)
        gsap.to(containerRef.current, {
            backgroundColor: isHero ? 'rgba(253, 250, 240, 0)' : 'rgba(253, 250, 240, 0.8)',
            backdropFilter: isHero ? 'blur(0px)' : 'blur(16px)',
            duration: 0.5,
            ease: 'power3.inOut',
        })
    }, { dependencies: [isHero], scope: navbarRef })

    const links = [
        { label: 'Oferta', href: '/oferta' },
        { label: 'O mnie', href: '/o-mnie' },
        { label: 'FAQ', href: '/faq' },
    ]

    return (
        <>
            <nav
                ref={navbarRef}
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

                    {/* Mobile Trigger */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-full"
                            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? (
                                <X className="text-moss w-8 h-8" />
                            ) : (
                                <Menu className="text-moss w-8 h-8 transition-colors duration-500" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Overlay */}
            <MobileOverlay
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                links={links}
            />
        </>
    )
}

function MobileOverlay({ isOpen, onClose, links }) {
    const overlayRef = useRef(null)

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                padding: '24px',
                visibility: 'visible',
                duration: 0.4,
                ease: 'power3.out'
            })
            gsap.from(".mobile-link", {
                y: 40,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'expo.out',
                delay: 0.2
            })
        } else {
            gsap.to(overlayRef.current, {
                opacity: 0,
                visibility: 'hidden',
                duration: 0.3,
                ease: 'power3.in'
            })
        }
    }, { dependencies: [isOpen], scope: overlayRef })

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[60] bg-moss/98 backdrop-blur-2xl flex flex-col items-center justify-center invisible opacity-0 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Nawigacja mobilna"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-olive/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-olive/10 blur-[100px] rounded-full pointer-events-none" />

            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-4 text-linen/60 hover:text-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-full transition-colors"
                aria-label="Zamknij menu"
            >
                <X className="w-10 h-10" />
            </button>

            <div className="flex flex-col items-center gap-6 md:gap-10 relative z-10">
                <span className="text-olive text-xs tracking-[0.3em] font-medium uppercase mb-4 opacity-60">Menu</span>
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        onClick={onClose}
                        className="mobile-link text-5xl md:text-7xl font-serif text-linen hover:text-olive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-lg px-6 py-2"
                    >
                        {link.label}
                    </a>
                ))}
                <div className="mobile-link mt-8">
                    <MagneticButton
                        className="bg-linen text-moss !px-12 !py-5 text-2xl font-serif tracking-tight shadow-2xl focus-visible:ring-linen active:scale-95"
                        onClick={onClose}
                        aria-label="Zarezerwuj teraz"
                    >
                        Zarezerwuj
                    </MagneticButton>
                </div>
            </div>

            {/* Bottom Brand Mark */}
            <div className="absolute bottom-12 font-serif text-linen/20 text-xl tracking-widest italic">
                Otulenie
            </div>
        </div>
    )
}

function NavLink({ label, href, isHero, isCTA, onNavigate }) {
    const handleClick = (e) => {
        if (onNavigate) {
            e.preventDefault()
            onNavigate(href)
        }
    }

    return (
        <MagneticButton
            strength={0.2}
            onClick={handleClick}
            className={`
                bg-transparent !p-0 shadow-none hover:shadow-none
                text-sm font-medium tracking-wide transition-colors duration-500
                text-moss/70 hover:text-moss
                focus-visible:ring-1 focus-visible:ring-moss/30 rounded-lg
                ${isCTA ? 'font-bold' : ''}
            `}
        >
            <a href={href} className="px-3 py-1 block">{label}</a>
        </MagneticButton>
    )
}
