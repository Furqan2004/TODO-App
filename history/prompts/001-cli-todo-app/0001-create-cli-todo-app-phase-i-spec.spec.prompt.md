---
id: 0001
title: Create CLI Todo App Phase I Spec
stage: spec
date: 2026-03-11
surface: agent
model: Gemini 2.0 Flash
feature: 001-cli-todo-app
branch: 001-cli-todo-app
user: furqan
command: /sp.specify
labels: [spec, feature-initialization, cli-todo-app]
links:
  spec: specs/001-cli-todo-app/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/001-cli-todo-app/spec.md
 - specs/001-cli-todo-app/checklists/requirements.md
tests:
 - none
---

## Prompt

/sp.specify # Specification: Phase I — CLI Todo App ## The Evolution of Todo — Hackathon II **Phase:** I **Status:** Active **Storage:** In-Memory (RAM only) --- ## Objective Build a command-line todo application in Python that stores all tasks in memory during the session. When the program exits, all data is lost. No files, no database, no disk writes. --- ## Features **1. Add Task** - User provides a title and a description - System assigns a unique numeric ID to each task - Task is stored in memory with status set to `pending` **2. List All Tasks** - Display all tasks currently in memory - Each task shows: ID, title, description, and status - Status is shown as `[ ]` for pending and `[x]` for complete **3. Update Task** - User provides a task ID and new title and/or description - System updates the task in memory - If task ID does not exist, show a clear error message **4. Delete Task** - User provides a task ID - System removes that task from memory - If task ID does not exist, show a clear error message **5. Mark Complete / Incomplete** - User provides a task ID - System toggles the task status between `pending` and `complete` - If task ID does not exist, show a clear error message --- ## Data Model Each task in memory holds these fields: | Field | Type | Description | |---|---|---| | id | int | Auto-incremented unique identifier | | title | str | Short title of the task | | description | str | Optional detail about the task | | status | str | Either `pending` or `complete` | --- ## CLI Commands | Command | Description | |---|---| | `add` | Add a new task | | `list` | List all tasks | | `update` | Update an existing task | | `delete` | Delete a task by ID | | `complete` | Toggle task complete/incomplete | | `exit` | Exit the application | --- ## Acceptance Criteria - [ ] Tasks are stored in a Python list or dictionary in RAM only - [ ] No file is created, read, or written at any point - [ ] All 5 operations work correctly - [ ] Invalid task IDs show a clear error message - [ ] Application runs cleanly via `uv run` - [ ] All functions have type hints and docstrings --- ## Out of Scope - No file storage - No database - No authentication - No web interface - No external libraries beyond Python stdlib --- *This spec governs Phase I only. Any feature not listed here is out of scope.*

## Response snapshot

Created the feature specification for Phase I of the CLI Todo App. Established user stories, functional requirements, and success criteria. Branch `001-cli-todo-app` created and specification saved at `specs/001-cli-todo-app/spec.md`.

## Outcome

- ✅ Impact: High. Provides the blueprint for the first feature.
- 🧪 Tests: Spec quality checklist passed.
- 📁 Files: specs/001-cli-todo-app/spec.md, specs/001-cli-todo-app/checklists/requirements.md
- 🔁 Next prompts: /sp.plan to create the implementation plan.
- 🧠 Reflection: The provided Phase I objective was very clear, allowing for a straightforward specification without many clarifications.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
