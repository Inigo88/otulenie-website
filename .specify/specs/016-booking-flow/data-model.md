# Data Model: Booking Flow Interactions

## Entities

### LinkConfig
Represents the centralized configuration for all external and internal links.

- **BOOKSY_URL**: String. The primary booking profile URL.
- **PHONE**: String. Formatted phone number for display.
- **PHONE_RAW**: String. Raw phone number for `tel:` links.
- **EMAIL**: String. Contact email address.
- **INSTAGRAM**: String. URL to the Instagram profile.
- **FACEBOOK**: String. URL to the Facebook profile.
- **BOOKSY_WIDGET_ID**: String. The business ID for the Booksy script.

### MassageItem (Extension)
The existing `MASSAGE_DATA` objects will be logically updated.

- **booksyUrl**: (Deprecated for Carousel) These will remain in the data for components that still need direct booking, but the Carousel will ignore them in favor of a global `/oferta` link.
- **id**: String. Used for future anchors (e.g., `/oferta#mocne-otulenie`).

## Interfaces

### useBooksyWidget (Hook)
- **Input**: `widgetId` (from constants).
- **Effect**: Loads `https://booksy.com/widget/code.js` with the provided ID.
- **Return**: `isLoading`, `isLoaded`, `error`.
