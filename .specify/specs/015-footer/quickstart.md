# Quickstart: Footer Feature

## Setup
The footer is built using React 19 and Tailwind CSS v4. It is integrated directly into `App.jsx` to follow the flat structure.

## Integration
1.  **Define Constants**: Add `FOOTER_LINKS` and `LEGAL_LINKS` to `App.jsx`.
2.  **Implement Component**: Create the `Footer` component function in `App.jsx`.
3.  **Mount**: Place the `<Footer />` at the end of the `main` tag or as the final element in the root div.

## Key CSS Classes
- `bg-moss`: Deep dark background.
- `text-linen`: Light text color.
- `rounded-t-[2rem]`: Mobile rounded top.
- `rounded-t-[3rem]`: Desktop rounded top.

## Verification
- Scroll to the bottom of the page.
- Check that the footer background is correctly colored (`#374833`).
- Verify that the noise overlay is visible over the footer.
- Test all navigation links.
- Check mobile responsiveness (vertical stacking).
