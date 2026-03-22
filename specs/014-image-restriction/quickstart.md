# Quickstart: Implementing Image Restriction (High-Res)

## Step 1: Migration & Transformation
Run the following commands from the project root:

```bash
# Create destination directory
mkdir -p public/images-small

# Copy high-res source assets (temporarily for processing)
cp .specify/context/images/*.jpg public/images-small/

# Resize (max-width 2560) and Convert to WebP using sips
for f in public/images-small/*.jpg; do
  sips -Z 2560 -s format webp "$f" --out "${f%.jpg}.webp"
done

# Cleanup JPEGs from public
rm public/images-small/*.jpg
```

## Step 2: Code Implementation
1. Open `src/App.jsx`.
2. Locate `HERO` (or similar background style) and update to `/images-small/IMG-07.webp`.
3. Update `STACKING_CARDS` array objects with `image: "/images-small/[FILENAME].webp"`.
4. Update `MASSAGE_DATA` array:
   - Map `image` to corresponding local WebP path.
   - Add `alt` attribute to each object for WCAG compliance.

## Step 3: Component Updates
1. Ensure the `Hero` component uses the new path.
2. Ensure `MassageCarousel` items render the `img` with `alt` text.
3. Ensure `StackingArchive` (or similar) handles the new local paths.

## Step 4: Verification
1. Run `npm run dev`.
2. Inspect images in the browser.
3. Verify Network tab shows `webp` format and local paths.
