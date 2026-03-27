# Data Model: Testimonials

## Entity: Testimonial

| Field | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `id` | `string` \| `number` | Unique identifier for the testimonial. | Required, Unique. |
| `name` | `string` | Name of the reviewer. | Required. |
| `stars` | `number` | Star rating (1-5). | Required, Integer [1-5]. |
| `text` | `string` | The review content. | Required, Max 500 chars for layout balance. |

## Schema (React State/Props)

```typescript
interface Testimonial {
  id: string | number;
  name: string;
  stars: number;
  text: string;
}
```

## State Transitions
N/A (Static data for initial implementation).
