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
| **Hero** | `IMG-07.webp` | "Bright massage studio in Wrocław with urban view and lush plants" | Main landing visual |
| **Carousel (Mocne)** | `IMG-10.webp` | "Therapist performing a deep neck and shoulder massage" | Service detail |
| **Carousel (Głębokie)** | `IMG-14.webp` | "Overhead view of a broad back massage technique" | Service detail |
| **Carousel (Czułe)** | `IMG-08.webp` | "Close-up of therapeutic hands applying pressure to a leg" | Service detail |
| **Carousel (Ciepłe)** | `IMG-21.webp` | "Back massage in a relaxing atmosphere with a glowing candle" | Service detail |
| **Stacking (Relaks)** | `IMG-07.webp` | "Clean, professional massage table setup by a window" | Value proposition |
| **Stacking (Uważność)**| `IMG-12.webp` | "Macro shot of precise massage technique on oiled skin" | Value proposition |
| **Stacking (Regeneracja)**| `IMG-14.webp`| "Therapeutic pressure applied to the lower back area" | Value proposition |

## Constants Update (App.jsx)

- `HERO_IMAGE`: `images-small/IMG-07.webp`
- `STACKING_CARDS`: Update `image` fields.
- `MASSAGE_DATA`: Update `image` fields and add `alt` fields.
