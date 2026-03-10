---
id: 0002
title: Implementation Plan Phase I
stage: plan
date: 2026-03-11
surface: agent
model: Gemini 2.0 Flash
feature: 001-cli-todo-app
branch: 001-cli-todo-app
user: furqan
command: /sp.plan
labels: [plan, research, design, cli-todo-app]
links:
  spec: specs/001-cli-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-cli-todo-app/plan.md
 - specs/001-cli-todo-app/research.md
 - specs/001-cli-todo-app/data-model.md
 - specs/001-cli-todo-app/contracts/cli_commands.md
 - specs/001-cli-todo-app/quickstart.md
tests:
 - none
---

## Prompt

/sp.plan # Technical Implementation Plan
## Phase I — CLI Todo App

**Reference Spec:** `specs/spec-phase-1.md`  
**Target Folder:** `/backend`

---

## Folder Structure

Create exactly this structure inside `/backend`. Nothing more.

```
backend/
├── src/
│   └── todo/
│       ├── __init__.py
│       ├── main.py
│       ├── models.py
│       ├── storage.py
│       └── cli.py
├── pyproject.toml
└── README.md
```

| File | Purpose |
|---|---|
| `main.py` | Entry point — starts the CLI loop |
| `models.py` | Defines the Task data structure |
| `storage.py` | In-memory store — holds and manages all tasks in RAM |
| `cli.py` | Handles all user input, output, and command routing |
| `pyproject.toml` | UV project config — Python 3.13+, no external deps |

---

## Libraries

**Only Python standard library. No pip installs.**

| Library | Usage |
|---|---|
| `dataclasses` | Define the Task model cleanly |
| `typing` | Type hints (`Optional`, `List`, `Dict`) |
| `sys` | Clean exit handling |

---

## Functions to Build

### `models.py` — 1 Class

**`Task` (dataclass)**
- Fields: `id: int`, `title: str`, `description: str`, `status: str`
- Default status: `"pending"`
- Purpose: Single source of truth for what a task looks like in memory

---

### `storage.py` — 5 Functions

**`add_task(title: str, description: str) -> Task`**
- Creates a new Task object
- Appends it to the in-memory list
- Auto-increments the ID
- Returns the created task

**`get_all_tasks() -> List[Task]`**
- Returns the full in-memory task list
- Returns empty list if no tasks exist

**`update_task(task_id: int, title: str, description: str) -> Task`**
- Finds task by ID in memory
- Updates title and/or description
- Returns the updated task
- Raises `ValueError` if task ID not found

**`delete_task(task_id: int) -> Task`**
- Finds task by ID in memory
- Removes it from the list
- Returns the deleted task
- Raises `ValueError` if task ID not found

**`toggle_complete(task_id: int) -> Task`**
- Finds task by ID in memory
- Flips status between `"pending"` and `"complete"`
- Returns the updated task
- Raises `ValueError` if task ID not found

---

### `cli.py` — 7 Functions

**`display_task(task: Task) -> None`**
- Prints a single task in a clean, readable format
- Shows `[ ]` for pending, `[x]` for complete

**`display_all_tasks(tasks: List[Task]) -> None`**
- Loops through task list and calls `display_task`
- Prints "No tasks found." if list is empty

**`handle_add() -> None`**
- Prompts user for title and description
- Calls `storage.add_task()`
- Prints success confirmation

**`handle_list() -> None`**
- Calls `storage.get_all_tasks()`
- Calls `display_all_tasks()`

**`handle_update() -> None`**
- Prompts user for task ID, new title, new description
- Calls `storage.update_task()`
- Prints success or error message

**`handle_delete() -> None`**
- Prompts user for task ID
- Calls `storage.delete_task()`
- Prints success or error message

**`handle_complete() -> None`**
- Prompts user for task ID
- Calls `storage.toggle_complete()`
- Prints new status confirmation or error message

---

### `main.py` — 1 Function

**`run() -> None`**
- Prints welcome message
- Starts an infinite `while True` loop
- Reads user command from input
- Routes to correct `cli.py` handler based on command
- Handles `exit` command to quit cleanly
- Handles unknown commands with a helpful message

---

## Error Handling Rules

- All `ValueError` from storage functions must be caught in `cli.py` handlers
- Never let a raw Python traceback reach the user
- Every error prints a clean, short message like: `"Error: Task ID 5 not found."`
- Invalid command input prints: `"Unknown command. Type 'help' to see options."`

---

## pyproject.toml Config

```toml
[project]
name = "todo-cli"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = []

[project.scripts]
todo = "todo.main:run"
```

Run the app with:
```bash
cd backend
uv run todo
```

---

## Implementation Order

Follow this exact order. Do not skip ahead.

```
Step 1 → models.py       (Task dataclass)
Step 2 → storage.py      (all 5 storage functions)
Step 3 → cli.py          (all 7 cli functions)
Step 4 → main.py         (run loop)
Step 5 → pyproject.toml  (project config)
Step 6 → Verify all 5 features work end to end
```

---

*Follow this plan exactly. Do not add functions, files, or dependencies not listed here.*

## Response snapshot

Generated the implementation plan and design artifacts for Phase I of the CLI Todo App. Established research findings, data model, CLI contracts, and a quickstart guide. Updated the Gemini agent context with project-specific details.

## Outcome

- ✅ Impact: High. Provides a detailed technical plan for implementation.
- 🧪 Tests: No tests run for the plan phase.
- 📁 Files: plan.md, research.md, data-model.md, contracts/cli_commands.md, quickstart.md.
- 🔁 Next prompts: /sp.tasks to break the plan into actionable tasks.
- 🧠 Reflection: The provided plan was already quite detailed, making the research and design phases straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
