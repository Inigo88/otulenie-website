# Component Contract: MagneticButton

## React Props (TypeScript Interface equivalent)

```typescript
interface MagneticButtonProps {
  /** Content to be rendered inside the button (e.g., text, Lucide icons) */
  children: React.ReactNode;
  
  /** Additional Tailwind classes for layout/sizing */
  className?: string;
  
  /** Execution handle on click */
  onClick?: () => void;
  
  /** 
   * Dampening factor for magnetic pull. 
   * 0.4 means the button moves 40% of the relative cursor distance.
   * @default 0.4
   */
  strength?: number;
}
```

## Behavior Contract
1. On desktop (`hover` media query), the button must track the cursor within a 40px radius.
2. The transformation MUST be applied via GSAP `x` and `y` props to ensure hardware acceleration.
3. On mouse leave, the button MUST return to `x:0, y:0` with a smooth elastic or power easing.
4. On all devices, hover/tap triggers a `scale(1.03)`.
5. Keyboard focus must trigger a visual focus ring consistent with the design system.
