# Quickstart: Design System Verification

## 1. Installation
Ensure fonts are loaded in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400&family=Fraunces:opsz,wght@9..144,400;9..144,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">
```

## 2. Global Styling
The primary styles are defined in `src/index.css`.
- Background: `bg-linen` (`#fdfaf0`)
- Text: `text-moss` (`#374833`)
- Fonts: `font-serif` (Fraunces), `font-sans` (Inter), `font-accent` (Cormorant Garamond)

## 3. Noise Overlay
To apply the noise overlay, add the following to `App.jsx`:
```jsx
<div className="noise-overlay" />
```

## 4. Verification
Run the dev server:
```bash
npm run dev
```
1. Verify the background is a warm off-white (Linen).
2. Verify headings use a modern serif font with character.
3. Verify a subtle grainy texture is visible over the entire viewport.
