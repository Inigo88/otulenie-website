# Data Model: Base UI Components

## Entity: MagneticButton
A button component with magnetic hover interaction.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `children` | `ReactNode` | Content inside the button | Required |
| `className` | `string` | Additional CSS classes | Optional |
| `onClick` | `function` | Click handler | Optional |
| `strength` | `number` | Magnetic pull dampening | 0.0 to 1.0 (Default: 0.4) |
| `scale` | `number` | Hover scale effect | Default: 1.03 |

## Entity: RoundedContainer
A layout component for content blocks.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `children` | `ReactNode` | Wrapped content | Required |
| `className` | `string` | Additional CSS classes | Optional |
| `radius` | `string` | Border radius | e.g., '2rem', '3rem' (Default: '2rem') |
| `opacity` | `number` | Background opacity | 0.0 to 1.0 (Default: 0.7) |
| `blur` | `boolean` | Backdrop blur effect | Default: true |

## State Transitions
### MagneticButton States
1. `Idle`: Default state, zero offset.
2. `Hovered`: Within proximity (20-40px), applying `x/y` GSAP transforms.
3. `Active`: Clicked, executing `onClick`.
