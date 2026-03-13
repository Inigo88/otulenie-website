# Data Model: Interactive Features Cards

## Entity: MassageRecommendation
| Field | Type | Description |
|---|---|---|
| id | String | Unique slug (e.g., 'mocne') |
| name | String | Display name of the massage |
| description | String | Short benefit-focused copy |
| booksyUrl | String | External link to the specific Booksy category |
| icon | Component | Lucide React icon reference |

## Entity: TelemetryPoint
| Field | Type | Description |
|---|---|---|
| id | Number | Order ID |
| label | String | The text to be typed out |
| highlight | Boolean | Whether to apply Soft Olive color to the whole or part of string |

## Entity: SchedulerMockState
| Field | Type | Description |
|---|---|---|
| selectedDate | Date | Reactive mock selection |
| selectedTime | String | Reactive mock selection |
| redirectUri | String | Hardcoded Booksy core URL |
