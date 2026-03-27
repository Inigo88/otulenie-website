# Data Model: Sticky Stacking Archive

## Entities

### `StackingCard`
Represents a single protocol/value card displayed in the archive.

**Fields**:
- `id` (string): Unique identifier for the protocol.
- `title` (string): The heading of the protocol.
- `description` (string): The detailed text content.
- `image` (string): URL or path to the associated real Unsplash image matching `imageMood`.
- `backgroundColor` (string): Tailwind color class or hex code adhering to the "Otulenie Calm" palette.

**Relationships**:
- Belongs to the `StackingArchive` collection.

**Validation Rules & Constraints**:
- The system is explicitly constrained to 3 hardcoded instances of `StackingCard`. It is not designed to accept arbitrarily sized dynamic arrays.
