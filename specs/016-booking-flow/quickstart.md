# Quickstart: Booking Flow

## Setup Centralized Links
1. Open `src/constants/links.js`.
2. Ensure all contact details (Phone, Email, URLs) are correct.

## Hero Widget Integration
1. The `Hero` component now uses the `useBooksyWidget` hook.
2. If the widget script fails to load, the button remains a standard functional link.

## Carousel Updates
1. Carousel cards now link to `/oferta`.
2. The button label is changed to "Dowiedz się więcej".

## Footer Verification
1. Check that "Zarezerwuj" is present in the navigation.
2. Verify that clicking the phone number triggers a call on mobile.
3. Verify that clicking the email opens the mail client.
