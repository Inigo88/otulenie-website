import { Link } from 'react-router-dom'
import { Instagram, Facebook } from 'lucide-react'
import MagneticButton from './MagneticButton'
import Logo from './Logo'
import {
  PHONE,
  PHONE_RAW,
  EMAIL,
  INSTAGRAM,
  FACEBOOK,
  NAV_LINKS,
  LEGAL_LINKS
} from '../constants/links'

/**
 * Footer Component
 * Consumes centralized navigation and social constants.
 */
const Footer = () => {
  const SOCIAL_LINKS = [
    { name: 'Instagram', href: INSTAGRAM, icon: 'Instagram' },
    { name: 'Facebook', href: FACEBOOK, icon: 'Facebook' }
  ]

  return (
    <footer
      className="bg-moss text-linen pt-20 pb-10 rounded-t-[2rem] md:rounded-t-[3rem] relative overflow-hidden"
    >
      {/* Subtle Noise for deep background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <Link
              to="/"
              aria-label="Otulenie - Strona główna"
              className="inline-block mb-6"
            >
              <Logo className="text-linen h-8" />
            </Link>
            <p className="text-linen/70 text-sm leading-relaxed md:max-w-[200px]">
              Relaks, który przyjeżdża do Ciebie. Profesjonalny masaż mobilny we Wrocławiu.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="col-span-1">
            <h3 className="font-sans text-xs uppercase tracking-widest text-olive font-bold mb-6">Nawigacja</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-linen/80 hover:text-linen transition-all duration-300 inline-block hover:scale-[1.03] hover:-translate-y-[1px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h3 className="font-sans text-xs uppercase tracking-widest text-olive font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`tel:${PHONE_RAW}`} 
                  className="text-linen/80 hover:text-linen transition-colors"
                  aria-label={`Zadzwoń do nas: ${PHONE}`}
                >
                  {PHONE}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${EMAIL}`} 
                  className="text-linen/80 hover:text-linen transition-colors"
                  aria-label={`Wyślij do nas e-mail: ${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-linen/60 text-sm">
                Obszar działania: Wrocław i okolice
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-sans text-xs uppercase tracking-widest text-olive font-bold mb-6">Obserwuj nas</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(social => (
                <MagneticButton
                  key={social.name}
                  as="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  strength={0.3}
                  className="w-12 h-12 rounded-full bg-olive/20 flex items-center justify-center text-linen hover:bg-olive transition-colors duration-300"
                  aria-label={`Obserwuj nas na ${social.name}`}
                >
                  {social.icon === 'Instagram' ? <Instagram size={20} /> : <Facebook size={20} />}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-linen/10 flex flex-row flex-wrap justify-between items-center gap-6">
          <p className="text-linen/40 text-xs">
            © 2026 Otulenie - Praktyka masażu. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4 md:gap-8">
            {LEGAL_LINKS.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-linen/40 hover:text-linen/70 transition-colors text-xs"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
