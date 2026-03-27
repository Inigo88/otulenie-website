# Data Model: Footer Feature

## Components

### `Footer` (Functional Component)
The root component for the footer, integrated at the bottom of `App.jsx`.

- **Props**: None (Global component)
- **State**: None
- **Structure**:
    - `<footer>` wrapper with `bg-moss`, `text-linen`, `rounded-t-[2rem]` (mobile) / `rounded-t-[3rem]` (desktop).
    - Inner container `max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24`.
    - **Grid Layout**:
        - **Col 1**: Brand Logo ("Otulenie") + Short tagline.
        - **Col 2**: Navigation Links (Home, Oferta, O mnie, Obszar dojazdu, FAQ).
        - **Col 3**: Contact Info (Phone, Email) + Social Links (Instagram, Facebook).
    - **Bottom Bar**:
        - Legal boilerplate (Copyright, Privacy Policy link).
        - Noise overlay (handled globally).

## Entities / Data Structures

### `SOCIAL_LINKS` (Array)
```javascript
const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/otulenie', icon: 'Instagram' },
  { label: 'Facebook', href: 'https://facebook.com/otulenie', icon: 'Facebook' },
]
```
```javascript
const FOOTER_LINKS = [
  { label: 'Strona główna', href: '/' },
  { label: 'Oferta', href: '/oferta' },
  { label: 'O mnie', href: '/o-mnie' },
  { label: 'Obszar dojazdu', href: '/obszar-dojazdu' },
  { label: 'FAQ', href: '/faq' },
]
```

### `LEGAL_LINKS` (Array)
```javascript
const LEGAL_LINKS = [
  { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
]
```
