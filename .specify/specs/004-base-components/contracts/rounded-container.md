# Component Contract: RoundedContainer

## React Props (TypeScript Interface equivalent)

```typescript
interface RoundedContainerProps {
  /** Content blocks or typography */
  children: React.ReactNode;
  
  /** Dynamic Tailwind classes (e.g., margins, widths) */
  className?: string;
  
  /** 
   * Predefined radius tokens 
   * @default '2rem'
   */
  radius?: '2rem' | '3rem' | string;
  
  /** 
   * Background opacity (0-1)
   * @default 0.7
   */
  opacity?: number;
}
```

## Behavior Contract
1. MUST apply `backdrop-blur-md` (or equivalent) to the background.
2. MUST utilize the "Otulenie Warm Linen" (`#fdfaf0`) color with the specified opacity.
3. Padding MUST be responsive (tight on mobile, spacious on desktop).
4. MUST NOT break the global noise overlay pattern.
