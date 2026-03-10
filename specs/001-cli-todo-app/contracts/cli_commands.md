# CLI Commands: CLI Todo App (Phase I)

This document defines the expected behavior and interaction for each CLI command.

## Add Task
- **Command**: `add`
- **Interaction**:
    - Prompt for "Title"
    - Prompt for "Description"
- **Success Outcome**: "Success: Task 1 added."
- **Failure Outcome**: "Error: Title cannot be empty."

## List Tasks
- **Command**: `list`
- **Output**:
    ```text
    1 | Buy milk | Whole milk | [ ]
    2 | Clean room | Weekly cleanup | [x]
    ```
- **Empty State**: "No tasks found."

## Update Task
- **Command**: `update`
- **Interaction**:
    - Prompt for "Task ID"
    - Prompt for "New Title" (if empty, keep old)
    - Prompt for "New Description" (if empty, keep old)
- **Success Outcome**: "Success: Task 1 updated."
- **Failure Outcome**: "Error: Task ID 5 not found."

## Delete Task
- **Command**: `delete`
- **Interaction**:
    - Prompt for "Task ID"
- **Success Outcome**: "Success: Task 1 deleted."
- **Failure Outcome**: "Error: Task ID 5 not found."

## Complete Toggle
- **Command**: `complete`
- **Interaction**:
    - Prompt for "Task ID"
- **Success Outcome**: "Success: Task 1 status updated to complete."
- **Failure Outcome**: "Error: Task ID 5 not found."

## Exit
- **Command**: `exit`
- **Action**: Cleanly exit the CLI loop and terminate the program.
