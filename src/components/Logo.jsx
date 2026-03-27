import { useState, useEffect } from 'react'

/**
 * Logo Component
 * Renders the Otulenie SVG logo with CSS-driven color control via mask-image.
 * The SVG acts as a mask shape; background-color: currentColor inherits
 * the parent's text color, enabling dynamic Tailwind color classes.
 * Falls back to serif text if the SVG fails to load (FR-008).
 *
 * @param {Object} props
 * @param {string} [props.className] - Additional Tailwind classes (text color, height, etc.)
 */
export default function Logo({ className = '' }) {
  const [failed, setFailed] = useState(false)

  // Check SVG availability on mount — fallback to text if unreachable
  useEffect(() => {
    const img = new Image()
    img.src = '/logo.svg'
    img.onerror = () => setFailed(true)
  }, [])

  if (failed) {
    return (
      <span className={`font-serif font-bold ${className}`}>
        Otulenie
      </span>
    )
  }

  // Aspect ratio from viewBox: 154.446 / 33.534 ≈ 4.606
  return (
    <span
      role="img"
      aria-hidden="true"
      className={`inline-block align-middle h-6 ${className}`}
      style={{
        aspectRatio: '154.446 / 33.534',
        backgroundColor: 'currentColor',
        maskImage: 'url(/logo.svg)',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: 'url(/logo.svg)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
