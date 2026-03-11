/**
 * RoundedContainer Component
 * Features: Semi-transparent linen background, backdrop-blur, responsive padding.
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
