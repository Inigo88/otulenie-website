/**
 * RoundedContainer Component
 * Features: Semi-transparent linen background, backdrop-blur, responsive padding.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Container content
 * @param {string} [props.className] - Additional CSS classes
 */
export default function RoundedContainer({ children, className = "" }) {
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
