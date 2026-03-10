# Tasks: CLI Todo App (Phase I)

**Input**: Design documents from `specs/001-cli-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/cli_commands.md

**Tests**: Tests are requested via `pytest` as specified in the implementation plan.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Paths assume the structure defined in `plan.md` with source in `backend/src/todo/` and tests in `tests/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure in `backend/src/todo/` and `tests/` per implementation plan
- [x] T002 Initialize Python project with `uv` in `backend/pyproject.toml`
- [x] T003 [P] Create project README in `backend/README.md`
- [x] T004 [P] Create `backend/src/todo/__init__.py` to establish the package

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Implement Task dataclass in `backend/src/todo/models.py`
- [x] T006 Initialize in-memory storage variables `_tasks` and `id_counter` in `backend/src/todo/storage.py`
- [x] T007 Configure `pytest` in `backend/pyproject.toml` for test discovery

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add and List Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to create tasks and view them in a list format.

**Independent Test**: Use `add` to create "Task A", then `list` to verify "Task A" appears with ID 1 and status `[ ]`.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T008 [P] [US1] Integration test for "Add and List" flow in `tests/integration/test_add_list.py`

### Implementation for User Story 1

- [x] T009 [US1] Implement `add_task(title, description)` in `backend/src/todo/storage.py`
- [x] T010 [US1] Implement `get_all_tasks()` in `backend/src/todo/storage.py`
- [x] T011 [P] [US1] Implement `display_task(task)` UI helper in `backend/src/todo/cli.py`
- [x] T012 [P] [US1] Implement `display_all_tasks(tasks)` UI helper in `backend/src/todo/cli.py`
- [x] T013 [US1] Implement `handle_add()` command handler in `backend/src/todo/cli.py`
- [x] T014 [US1] Implement `handle_list()` command handler in `backend/src/todo/cli.py`
- [x] T015 [US1] Setup main CLI loop and route `add`/`list` commands in `backend/src/todo/main.py`

**Checkpoint**: At this point, User Story 1 (MVP) is fully functional and testable independently.

---

## Phase 4: User Story 2 - Complete and Delete Tasks (Priority: P2)

**Goal**: Enable users to toggle task completion status and remove tasks from the list.

**Independent Test**: Use `complete` on ID 1 to see status change to `[x]`, then `delete` to remove it.

### Tests for User Story 2

- [x] T016 [P] [US2] Integration test for "Complete and Delete" flow in `tests/integration/test_complete_delete.py`

### Implementation for User Story 2

- [x] T017 [US2] Implement `toggle_complete(task_id)` in `backend/src/todo/storage.py`
- [x] T018 [US2] Implement `delete_task(task_id)` in `backend/src/todo/storage.py`
- [x] T019 [US2] Implement `handle_complete()` command handler in `backend/src/todo/cli.py`
- [x] T020 [US2] Implement `handle_delete()` command handler in `backend/src/todo/cli.py`
- [x] T021 [US2] Integrate `complete` and `delete` commands into the loop in `backend/src/todo/main.py`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: User Story 3 - Update Task Details (Priority: P3)

**Goal**: Enable users to modify the title and description of an existing task.

**Independent Test**: Use `update` on ID 1 with a new title, then `list` to verify the change.

### Tests for User Story 3

- [x] T022 [P] [US3] Integration test for "Update Task" flow in `tests/integration/test_update.py`

### Implementation for User Story 3

- [x] T023 [US3] Implement `update_task(task_id, title, description)` in `backend/src/todo/storage.py`
- [x] T024 [US3] Implement `handle_update()` command handler in `backend/src/todo/cli.py`
- [x] T025 [US3] Integrate `update` command into the loop in `backend/src/todo/main.py`

**Checkpoint**: All user stories are now independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T026 [P] Implement global error handling for `ValueError` and unknown commands in `backend/src/todo/cli.py`
- [x] T027 [P] Audit all functions for complete type hints and docstrings per Rule 7
- [x] T028 [P] Verify `uv run todo` works correctly from the `backend/` directory

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - starts immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Phase 2 completion.
  - US1 (P1) → US2 (P2) → US3 (P3) is the recommended sequential order.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Foundation.
- **User Story 2 (P2)**: Independent after Foundation (can build on US1 data).
- **User Story 3 (P3)**: Independent after Foundation.

---

## Parallel Execution Examples

### Parallel Setup & Foundation

```bash
# Can be done in parallel:
- T003 Create project README in backend/README.md
- T004 Create backend/src/todo/__init__.py
```

### Parallel UI & Storage (within US1)

```bash
# Can be done in parallel once T005 and T006 are done:
- T011 Implement display_task(task) UI helper in backend/src/todo/cli.py
- T012 Implement display_all_tasks(tasks) UI helper in backend/src/todo/cli.py
- T009 Implement add_task(title, description) in backend/src/todo/storage.py
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Implement US1 (Add/List).
3. **VALIDATE**: Run US1 integration tests and manual CLI check.

### Incremental Delivery

1. Foundation ready.
2. US1 added → MVP Ready!
3. US2 added → Full Management Ready.
4. US3 added → Feature Complete.

---

## Notes

- Use `uv` for all project management as requested.
- Ensure `ValueError` from storage is caught in CLI handlers to avoid raw tracebacks.
- Every function MUST have type hints and docstrings.
