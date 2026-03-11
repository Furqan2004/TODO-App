# Tasks: Web-based Multi-user Todo App

**Input**: Design documents from `/specs/002-web-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Integration tests are included to verify the multi-user isolation and CRUD logic.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Initialize backend project with FastAPI and SQLModel in `backend/pyproject.toml`
- [X] T002 Initialize frontend project with Next.js 16 and TailwindCSS in `frontend/package.json`
- [X] T003 [P] Create `docker-compose.yml` for backend and frontend services
- [X] T004 [P] Configure `.env` and `.env.local` templates in root directory

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T005 Setup database connection logic in `backend/src/todo/database.py` using SQLModel and Neon URL
- [X] T006 Implement JWT verification middleware in `backend/src/todo/auth/jwt_handler.py` using `python-jose`
- [X] T007 [P] Configure CORS in `backend/src/todo/main.py` to allow `localhost:3000`
- [X] T008 Create base API router structure in `backend/src/todo/main.py`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Secure Account Management (Priority: P1) 🎯 MVP

**Goal**: Enable user signup and signin with JWT-based session management

**Independent Test**: Register a user via the UI, verify JWT is stored in cookies/local storage, and use it to access a protected "me" endpoint.

### Implementation for User Story 1

- [X] T009 [P] [US1] Create User model in `backend/src/todo/models/user.py`
- [X] T010 [US1] Setup Better Auth with JWT plugin in `frontend/lib/auth.ts`
- [X] T011 [P] [US1] Implement Signup page in `frontend/app/signup/page.tsx`
- [X] T012 [P] [US1] Implement Signin page in `frontend/app/signin/page.tsx`
- [X] T013 [US1] Add middleware to protect dashboard and redirect to signin in `frontend/middleware.ts`

**Checkpoint**: User Story 1 complete - Authentication flow is functional.

---

## Phase 4: User Story 2 - Task Management (Priority: P1)

**Goal**: Allow logged-in users to Create, List, Update, and Delete their own tasks.

**Independent Test**: Create a task as User A, verify it appears in List A. Attempt to access/delete Task A as User B and verify 403 Forbidden.

### Implementation for User Story 2

- [X] T014 [P] [US2] Create Task model in `backend/src/todo/models/task.py` with `user_id` foreign key
- [X] T015 [US2] Implement GET and POST endpoints for tasks in `backend/src/todo/routes/tasks.py` (with auth check)
- [X] T016 [US2] Implement PUT and DELETE endpoints for tasks in `backend/src/todo/routes/tasks.py` (with ownership check)
- [X] T017 [US2] Create API client with JWT attachment in `frontend/lib/api.ts`
- [X] T018 [US2] Implement Dashboard task list view in `frontend/app/dashboard/page.tsx`
- [X] T019 [P] [US2] Create `TaskCard` component in `frontend/components/TaskCard.tsx`
- [X] T020 [P] [US2] Create `TaskForm` component in `frontend/components/TaskForm.tsx`

**Checkpoint**: User Story 2 complete - Full CRUD functional for authenticated users.

---

## Phase 5: User Story 3 - Task Completion Control (Priority: P2)

**Goal**: Quickly toggle a task's completion status.

**Independent Test**: Click toggle on an incomplete task, verify status changes to complete in UI and DB without page refresh.

### Implementation for User Story 3

- [X] T021 [US3] Implement PATCH toggle endpoint in `backend/src/todo/routes/tasks.py`
- [X] T022 [US3] Add toggle action to `TaskCard` component and update UI state in `frontend/components/TaskCard.tsx`

**Checkpoint**: User Story 3 complete - Rapid task status management enabled.

---

## Phase 6: User Story 4 - Detailed Task View (Priority: P3)

**Goal**: View full details and metadata for a single task.

**Independent Test**: Navigate to `/tasks/[id]`, verify description and timestamps are visible.

### Implementation for User Story 4

- [X] T023 [US4] Implement GET single task endpoint in `backend/src/todo/routes/tasks.py`
- [X] T024 [US4] Implement Task Detail page in `frontend/app/tasks/[id]/page.tsx`

**Checkpoint**: All user stories complete.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final integration and deployment readiness

- [X] T025 [P] Setup production-ready Dockerfiles for backend and frontend
- [X] T026 Final verification of `quickstart.md` steps using Docker Compose
- [X] T027 Code cleanup: remove unused console logs and print statements

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Story 1 (Phase 3)**: Depends on Phase 2. Provides the User ID needed for Task ownership.
- **User Story 2 (Phase 4)**: Depends on US1 completion (needs auth context).
- **User Stories 3 & 4 (Phases 5 & 6)**: Depend on US2 (needs Task CRUD foundation).
- **Polish (Phase 7)**: Depends on all stories being complete.

### Parallel Opportunities

- T003 and T004 (Setup) can run in parallel.
- T006 and T007 (Foundational) can run in parallel.
- T011 and T012 (Auth UI) can run in parallel.
- T019 and T020 (Frontend Components) can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Complete Setup and Foundational phases.
2. Implement US1 (Auth) - allows users to enter the system.
3. Implement US2 (CRUD) - the core utility of the app.
4. **VALIDATE**: Ensure User A cannot see User B's tasks.

### Incremental Delivery

- Add US3 (Toggle) to improve UX.
- Add US4 (Detail) to provide more information.
- Finally, containerize with Docker for easy deployment.
