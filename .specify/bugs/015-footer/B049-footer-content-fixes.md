# Bug B049: Footer Content Refresh

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P1 (Branding & Accuracy)
**Found in**: Feature 015-footer
**Date Created**: 2026-03-23
**Date Resolved**: 2026-03-23

## Description

The recently implemented footer contains placeholder contact information and an incorrect copyright string. Specifically, the copyright needs to be more descriptive, and the phone/email/social links must be synchronized with the official `contact.md` reference.

## Steps to Reproduce

1. Scroll to the footer of the application.
2. Observe the phone number `+48 700 000 000` and email `kontakt@otulenie.pl`.
3. Observe the copyright text `© 2026 Otulenie Mobilny Masaż. Wszelkie prawa zastrzeżone.`

## Expected Behavior

- **Copyright**: `© 2026 Otulenie - Praktyka masażu. Wszelkie prawa zastrzeżone.`
- **Phone**: `+48 780 530 235`
- **Email**: `pm.otulenie@gmail.com`
- [x] **Instagram**: `https://www.instagram.com/pm.otulenie/`
- [x] **Facebook**: `https://www.facebook.com/profile.php?id=61579695762768`
- [x] **Location**: `al. Śliwowa 48/25, 54-106 Wrocław`

## Actual Behavior

- **Copyright**: `© 2026 Otulenie Mobilny Masaż. Wszelkie prawa zastrzeżone.`
- **Phone**: `+48 700 000 000` (Placeholder)
- **Email**: `kontakt@otulenie.pl` (Placeholder)
- **Socials**: Pointing to generic `otulenie` handles instead of the official `pm.otulenie` ones.
- **Location**: Was "Wrocław i okolice" (vague) instead of the specific address.

## Technical Root Cause

In `src/App.jsx`, the `SOCIAL_LINKS` constant and the `Footer` component's JSX were implemented with placeholder data during the initial feature development of `015-footer`.

- `SOCIAL_LINKS` (lines 22-25) has generic URLs.
- `Footer` component (lines 337, 342) has hardcoded placeholder contact info.
- Copyright string (line 377) is hardcoded placeholder text.

## Proposed Fix

Update `App.jsx` to reflect the official contact data and the specific copyright string requested by the user.

### Implementation Strategy

- **Approach**: Modify the `SOCIAL_LINKS` constant and the `Footer` component's JSX in `App.jsx`.
- **Affected Components**:
  - `src/App.jsx`: Update constants and hardcoded text nodes.

### Detailed Task List

- [ ] [T001] [Implementation]: Update `SOCIAL_LINKS` constant in `App.jsx` with official URLs.
- [ ] [T002] [Implementation]: Update hardcoded phone, email, and location in the `Footer` component.
- [ ] [T003] [Implementation]: Update the copyright string in the bottom bar of the `Footer`.

## Resolution

Successfully refreshed the footer content by updating `src/App.jsx`. The `SOCIAL_LINKS` constant was updated with official handles, and the phone, email, location (address), and copyright strings in the `Footer` component were replaced with the user's requested text and the official `contact.md` data. Verified correct rendering and link functionality via browser subagent.

## Verification

- [x] [Functional]: Links point to the correct official social profiles and contact channels.
- [x] [Visual]: Copyright text matches the user's requirement exactly.
- [x] [Technical]: No regressions in footer layout or GSAP animations.
