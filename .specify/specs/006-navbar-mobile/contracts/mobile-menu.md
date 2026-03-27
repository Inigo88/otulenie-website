# Interface Contract: MobileMenu Component

## Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | Yes | Controls the modal visibility and trigger animations. |
| `onClose` | function | Yes | Callback triggered when the modal should close (click backdrop, X, or link). |
| `links` | NavLink[] | Yes | Array of link objects to render in the menu. |

## Children Behavior

- The component will implement an internal `useFocusTrap` hook.
- It will automatically set `document.body.style.overflow = 'hidden'` when `isOpen` is true.

## Transition Events (GSAP)

| Event | Type | Description |
|-------|------|-------------|
| `onEnter` | Callback | Triggered when opening animation starts. |
| `onEntered` | Callback | Triggered when opening animation completes. |
| `onExit` | Callback | Triggered when closing animation starts. |
| `onExited` | Callback | Triggered when closing animation completes. |
