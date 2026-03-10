# Data Model: CLI Todo App (Phase I)

## Entities

### Task
Represents a single todo item.

| Field | Type | Description | Validation |
|---|---|---|---|
| `id` | `int` | Unique identifier | Auto-incremented, non-negative |
| `title` | `str` | Short task title | Required, non-empty string |
| `description` | `str` | Detailed description | Optional string |
| `status` | `str` | Current status | 'pending' or 'complete' |

## State Transitions
Tasks start in 'pending' status and can be toggled to 'complete' and back.

| Initial State | Event | Final State |
|---|---|---|
| 'pending' | `toggle_complete` | 'complete' |
| 'complete' | `toggle_complete` | 'pending' |

## Validations
- **ID Existence**: Operations like `update`, `delete`, and `complete` must verify that the provided `id` exists in memory.
- **Empty Fields**: Titles should be validated to ensure they are not just whitespace.
