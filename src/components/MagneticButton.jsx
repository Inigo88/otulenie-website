import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

/**
 * MagneticButton Component
 * Features: GSAP Magnetic pull, scale on hover, responsive disable, prefers-reduced-motion check.
 * Ref-forwarding enabled for parent GSAP/DOM access.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {function} [props.onClick] - Click handler
 * @param {number} [props.strength=0.4] - Magnetic pull strength (0 to 1)
 * @param {string|React.ElementType} [props.as='button'] - Element type to render (e.g. 'a', 'button')
 */
const MagneticButton = forwardRef(({ children, className = "", onClick, strength = 0.4, as: Tag = 'button', ...rest }, ref) => {
    const Component = Tag;
    const buttonRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)

    // Forward the local ref to the parent-provided ref
    useImperativeHandle(ref, () => buttonRef.current)

    // Check for prefers-reduced-motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mediaQuery.matches)

        const listener = (e) => setReducedMotion(e.matches)
        mediaQuery.addEventListener('change', listener)
        return () => mediaQuery.removeEventListener('change', listener)
    }, [])

    // Setup quickTo for high-performance X/Y transforms
    const { contextSafe } = useGSAP({ scope: buttonRef })

    const xTo = useRef()
    const yTo = useRef()

    useGSAP(() => {
        xTo.current = gsap.quickTo(buttonRef.current, "x", { duration: 0.8, ease: "power3.out" })
        yTo.current = gsap.quickTo(buttonRef.current, "y", { duration: 0.8, ease: "power3.out" })
    }, { scope: buttonRef })

    // eslint-disable-next-line react-hooks/refs
    const handleMouseMove = contextSafe((e) => {
        // Disable magnetic effect on touch devices (no hover) or reduced motion
        if (!window.matchMedia('(hover: hover)').matches || reducedMotion) return

        const { clientX, clientY } = e
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

        const centerX = left + width / 2
        const centerY = top + height / 2

        const deltaX = clientX - centerX
        const deltaY = clientY - centerY

        // Apply dampening logic
        xTo.current(deltaX * strength)
        yTo.current(deltaY * strength)
    })

    // eslint-disable-next-line react-hooks/refs
    const handleMouseLeave = contextSafe(() => {
        setIsHovered(false)
        // Smooth return to center
        xTo.current(0)
        yTo.current(0)
    })

    return (
        <Component
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={contextSafe(() => setIsHovered(true))}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`
        relative px-8 py-4 rounded-full font-sans font-medium 
        transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        focus:outline-none focus:ring-2 focus:ring-olive focus:ring-offset-2 focus:ring-offset-linen
        ${isHovered && !reducedMotion ? 'scale-[1.03] shadow-xl' : 'scale-100 shadow-none'}
        active:scale-[0.98] cursor-pointer
        ${className || 'bg-moss text-linen'}
      `}
            {...rest}
        >
            <span className="relative z-10 pointer-events-none">
                {children}
            </span>
        </Component>
    )
})

MagneticButton.displayName = 'MagneticButton'

export default MagneticButton

