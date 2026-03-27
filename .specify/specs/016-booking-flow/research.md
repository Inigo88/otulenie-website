# Research: Booking Flow Interactions

## Booksy Widget Integration

### Decision
Implement a custom hook `useBooksyWidget` to dynamically load the Booksy script and handle the "upgrade" from a standard link to a widget-triggered action.

### Rationale
Loading the script dynamically prevents it from blocking the initial page load. The "hybrid fallback" requirement ensures that even if the script fails to load or is blocked by an ad-blocker, the user can still click the button to go to the Booksy profile directly.

### Technical Details
- **Script URL**: `https://booksy.com/widget/code.js?id=336663&country=pl&lang=pl`
- **Widget Trigger**: The Booksy widget typically looks for links with specific classes or attributes. Research indicates that adding `class="ms-booking-button"` or using the `Booksy.showWidget()` method if available can trigger it. However, the standard implementation often just requires the script and a link to the profile.
- **Fallback**: A standard `<a>` tag with `href={BOOKSY_URL}` and `target="_blank"`.

## Centralized Constants

### Decision
Create `src/constants/links.js` to house all external and internal routing constants.

### Rationale
Sites-wide consistency for critical conversion URLs and contact data. Simplifies future updates (e.g., if the phone number or Booksy profile changes).

### Constants to include:
- `BOOKSY_URL`: `https://otulenie.booksy.com/h`
- `PHONE`: `+48 780 530 235`
- `PHONE_RAW`: `+48780530235`
- `EMAIL`: `pm.otulenie@gmail.com`
- `INSTAGRAM`: `https://www.instagram.com/pm.otulenie/`
- `FACEBOOK`: `https://www.facebook.com/profile.php?id=61579695762768`

## Carousel Redirection

### Decision
Update `MassageCarousel.jsx` to link to `/oferta` and change the label to "Dowiedz się więcej".

### Rationale
As per `FR-003`, the carousel should now serve as a discovery tool rather than a direct booking tool, guiding users to a more detailed "Offer" page.

## Magnetic Effects on Mobile

### Decision
Strictly disable magnetic effects for all interactive elements on mobile viewports.

### Rationale
`FR-007` and Constitution IV. The `MagneticButton` component already has a check for `(hover: hover)`, which effectively disables it on most touch devices. I will verify if this is sufficient or if an explicit breakpoint check is needed.
