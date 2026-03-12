import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { X, Calendar } from 'lucide-react'
import MagneticButton from './MagneticButton'

/**
 * MobileMenu Component
 * 
 * A full-screen overlay navigation menu for mobile viewports.
 * Features:
 * - GSAP-powered staggered animations for background, links, and CTA.
 * - Focus trapping for accessibility (WCAG 2.2 AA).
 * - Body scroll locking when active.
 * - Adaptive layout with blurred backdrop and brand styling.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls the modal visibility and trigger animations.
 * @param {function} props.onClose - Callback triggered when the modal should close.
 * @param {Array<{label: string, href: string}>} props.links - navigation links to render.
 */
export default function MobileMenu({ isOpen, onClose, links }) {
    const modalRef = useRef(null)
    const overlayRef = useRef(null)
    const contentRef = useRef(null)
    const linkRefs = useRef([])
    const ctaRef = useRef(null)

    const [isVisible, setIsVisible] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)

    // T018: Check for reduced motion
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
    }, [])

    // T019: Viewport Resize Handling
    // Automatically close the menu if the screen is resized to desktop width
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isOpen) {
                onClose()
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isOpen, onClose])

    // T005: Body Scroll Lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            setIsVisible(true)
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])


    // T012: GSAP Entrance/Exit Timeline
    const { contextSafe } = useGSAP(() => {
        if (!modalRef.current || reducedMotion) return

        if (isOpen) {
            gsap.timeline()
                .fromTo(overlayRef.current, 
                    { opacity: 0 }, 
                    { opacity: 1, duration: 0.6, ease: "power3.out" }
                )
                .fromTo(contentRef.current,
                    { y: 50, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(linkRefs.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(ctaRef.current,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
                    "-=0.2"
                )
        }
    }, { dependencies: [isOpen], scope: modalRef })

    // T004: Focus Trap
    useEffect(() => {
        if (!isOpen) return

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return

            const focusableElements = modalRef.current.querySelectorAll(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus()
                    e.preventDefault()
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus()
                    e.preventDefault()
                }
            }
        }

        document.addEventListener('keydown', handleTabKey)
        return () => document.removeEventListener('keydown', handleTabKey)
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
        <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobilne"
            className={`fixed inset-0 z-[60] flex flex-col p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onTransitionEnd={() => !isOpen && setIsVisible(false)}
        >
            {/* T006, T009, T013: Backdrop with Blur & Brand Tint */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-moss/40 backdrop-blur-xl"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* US1, US2: Content Container with Brand Presence */}
            <div 
                ref={contentRef}
                className="relative z-10 flex-1 flex flex-col items-center justify-between p-8 pt-24 bg-linen/95 rounded-[2.5rem] shadow-2xl border border-moss/10"
            >
                {/* Navigation Links (US2, B005) */}
                <nav className="flex flex-col items-center gap-6 w-full mt-12">
                    {links.map((link, index) => (
                        <MagneticButton
                            as="a"
                            key={index}
                            ref={el => linkRefs.current[index] = el}
                            href={link.href}
                            strength={0.2}
                            onClick={onClose}
                            className={`
                                text-2xl font-sans font-medium text-moss no-underline hover:text-olive transition-colors tracking-tight
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-lg px-8 py-3
                                bg-transparent shadow-none hover:shadow-none
                            `}
                        >
                            {link.label}
                        </MagneticButton>
                    ))}
                </nav>

                {/* T015-T017: US3 Booking CTA */}
                <div ref={ctaRef} className="w-full max-w-[280px] pb-8">
                    <MagneticButton
                        className="w-full bg-olive text-linen flex items-center justify-center gap-3 py-6 shadow-lg hover:shadow-olive/20"
                        onClick={() => {
                            onClose()
                            window.open('https://booksy.com/pl-pl/s/otulenie', '_blank')
                        }}
                        aria-label="Zarezerwuj masaż na Booksy"
                    >
                        <span className="text-xl font-medium">Zarezerwuj masaż</span>
                    </MagneticButton>
                </div>
            </div>
        </div>
    )
}


