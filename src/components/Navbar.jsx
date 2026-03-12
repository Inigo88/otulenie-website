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
    const modalRef = useRef(null)

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3,
                ease: 'power2.out'
            })
            gsap.fromTo(modalRef.current,
                { scale: 0.9, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', delay: 0.1 }
            )
            gsap.from(".mobile-link", {
                y: 20,
                opacity: 0,
                stagger: 0.08,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.3
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
            className="fixed inset-0 z-[60] bg-moss/60 backdrop-blur-sm flex items-center justify-center p-6 invisible opacity-0 transition-all duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Nawigacja mobilna"
            onClick={(e) => e.target === overlayRef.current && onClose()}
        >
            <div
                ref={modalRef}
                className="relative w-full max-w-sm bg-moss rounded-[40px] shadow-2xl overflow-hidden flex flex-col items-center py-16 px-8 border border-linen/10"
            >
                {/* Background Decorative Elements */}
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-olive/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-olive/10 blur-[80px] rounded-full pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-linen/40 hover:text-linen focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-full transition-colors z-20"
                    aria-label="Zamknij menu"
                >
                    <X className="w-8 h-8" />
                </button>

                <div className="flex flex-col items-center gap-8 relative z-10 w-full">
                    <span className="text-olive text-[10px] tracking-[0.4em] font-medium uppercase mb-2 opacity-50">Menu</span>
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={onClose}
                            className="mobile-link text-4xl font-serif text-linen hover:text-olive transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-xl px-4 py-1"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="mobile-link mt-6 w-full">
                        <MagneticButton
                            className="bg-linen text-moss w-full !py-4 text-xl font-serif tracking-tight shadow-xl focus-visible:ring-linen active:scale-95"
                            onClick={onClose}
                            aria-label="Zarezerwuj teraz"
                        >
                            Zarezerwuj
                        </MagneticButton>
                    </div>
                </div>

                {/* Bottom Brand Mark */}
                <div className="mt-12 font-serif text-linen/10 text-sm tracking-[0.2em] italic relative z-10">
                    Otulenie
                </div>
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
