# Data Model: Image Asset Mapping

## Entities

### HighResSource
- `basePath`: `.specify/context/images/`
- `dimensions`: 6200x4100 approx.
- `ignore`: Gitignored

### LocalAsset (Optimized)
- `basePath`: `public/images-small/`
- `format`: `.webp`
- `resize`: max-width 2560px

## Component Mapping

| Component/Constant | Asset Path (Local) | Alt Text (Proposed) | Description |
| --- | --- | --- | --- |
| **Hero** | `IMG-06.webp` | "Atmospheric close-up of massage oils and towels in the studio" | Main landing visual |
| **Stacking (Relaks)** | `IMG-07.webp` | "Clean, professional massage table setup by a window" | Value proposition |
| **Stacking (Uważność)**| `IMG-12.webp` | "Macro shot of precise massage technique on oiled skin" | Value proposition |
| **Stacking (Regeneracja)**| `IMG-14.webp`| "Therapeutic pressure applied to the lower back area" | Value proposition |
| **Philosophy** | `IMG-19.webp` | "Artistic slow-motion style pour of warm massage oil" | Organic background texture |

## Constants Update (App.jsx)

- `HERO_IMAGE`: `images-small/IMG-06.webp`
- `STACKING_CARDS`: Update `image` and add `altText` fields.
- `PHILOSOPHY_ASSET`: Add background texture and alt text.
