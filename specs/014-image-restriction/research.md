# Research: Image Conversion Strategy

## Decision
Use high-resolution source photography (6240x4160) and the native macOS `sips` (Scriptable Image Processing System) tool for one-time batch resizing (max-width 2560px) and conversion of assets to `.webp`.

## Rationale
- **Zero Dependencies**: Avoids adding `sharp` or `imagemin` to `package.json` for a task that is essentially a migration step.
- **Availability**: `sips` is pre-installed on the host system (macOS).
- **Quality**: Supports high-quality WebP output with controllable parameters.
- **Simplicity**: Can be easily wrapped in a shell script or run as a one-liner.

## Alternatives Considered
- **sharp**: Excellent performance and features, but requires `npm install`. Rejected to keep the development environment lean for this specific feature.
- **ImageMagick**: More powerful than `sips`, but not found on the current path.
- **Manual Conversion**: Too error-prone given the number of assets (23).

## Verification Method
- Run `sips -Z 2560 -s format webp [input] --out [output]` on a single file.
- Inspect output with `file` command or by opening in a browser.
- Verify file size reduction (WebP is typically 30-50% smaller than JPEG).
- Verify pixel dimensions are capped at 2560px.
