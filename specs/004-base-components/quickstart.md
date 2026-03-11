# Quickstart: Base UI Components

This guide helps you integrate the new interactive components into `App.jsx`.

## 1. Import Components
Until the file exceeds 600 lines, components are defined in `App.jsx`.

```jsx
import { MagneticButton, RoundedContainer } from './App';
import { ArrowRight } from 'lucide-react';
```

## 2. Using RoundedContainer
Wrap your feature sections in `RoundedContainer` to apply the "Otulenie Calm" atmospheric depth.

```jsx
<RoundedContainer className="p-8 md:p-12 mb-8">
  <h2 className="font-fraunces text-moss text-3xl mb-4">Ukojenie zmysłów</h2>
  <p className="font-inter text-moss/80 leading-relaxed">
    Nasze masaże to rytuał odprężenia w zaciszu Twojego domu.
  </p>
</RoundedContainer>
```

## 3. Using MagneticButton
Use `MagneticButton` for primary CTAs to add the premium magnetic interaction.

```jsx
<MagneticButton 
  onClick={() => window.open('https://booksy.com/...', '_blank')}
  className="bg-moss text-linen px-8 py-4 flex items-center gap-2"
>
  Zarezerwuj masaż <ArrowRight size={18} />
</MagneticButton>
```

## 4. Verification
- **Hover**: Move cursor near the button; it should "follow" gently.
- **Mobile**: Check 390px viewport; buttons should be full width or properly padded, magnetic effect disabled.
- **Glassmorphism**: Ensure content behind `RoundedContainer` is subtly blurred.
