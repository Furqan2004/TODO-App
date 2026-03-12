# Tasks: Fix authentication flow and page access

**Input**: Design documents from `/specs/003-fix-auth-and-access/`
**Prerequisites**: plan.md (required), spec.md (required), research.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- File paths are relative to repository root

---

## Phase 1: Setup & Current State Verification

**Purpose**: Establish a baseline by verifying the current broken state as reported.

- [x] T001 [P] Verify backend is running and accessible at http://localhost:8000
- [x] T002 [P] Verify frontend is running and accessible at http://localhost:3000
- [x] T003 Reproduce the "cannot allow to go inside the page" error by navigating to /dashboard
- [x] T004 Reproduce the "login signup not working" error by attempting a dummy signup

---

## Phase 2: Foundational (Auth & API Infrastructure)

**Purpose**: Fix the core "plumbing" that connects the frontend to the backend.

**⚠️ CRITICAL**: These must be complete before testing individual stories.

- [x] T005 [P] Add `jwtClient()` plugin to `frontend/src/lib/auth-client.ts`
- [x] T006 [P] Update `NEXT_PUBLIC_API_URL` to `http://localhost:8000/api` in `frontend/.env.local` (or update `apiCall` in `frontend/src/lib/api.ts`)
- [x] T007 [P] Verify `verify_token` in `backend/src/todo/auth/jwt_handler.py` correctly extracts the `sub` (user_id) claim from the JWT
- [x] T008 [P] Ensure `BETTER_AUTH_SECRET` matches in both `frontend/.env.local` and `backend/.env`

---

## Phase 3: User Story 1 - Secure Account Creation (Priority: P1) 🎯 MVP

**Goal**: Enable new users to register successfully.

**Independent Test**: Successfully create a new user via the `/signup` page and verify they exist in the database.

### Implementation for User Story 1

- [x] T009 [US1] Verify signup form in `frontend/src/app/signup/page.tsx` correctly calls `authClient.signUp.email`
- [x] T010 [US1] Manually test signup flow and monitor browser console for 400/500 errors
- [x] T011 [US1] Verify backend logs show successful user creation in the `user` table
- [x] T012 [US1] Add user-friendly error display to `frontend/src/app/signup/page.tsx` for duplicate emails

---

## Phase 4: User Story 2 - Reliable User Authentication (Priority: P1)

**Goal**: Enable registered users to log in and obtain a valid session/JWT.

**Independent Test**: Log in with the newly created user and verify a JWT is returned and stored.

### Implementation for User Story 2

- [x] T013 [US2] Verify signin form in `frontend/src/app/signin/page.tsx` correctly calls `authClient.signIn.email`
- [x] T014 [US2] Manually test signin flow and verify redirect to `/dashboard`
- [x] T015 [x] [US2] Verify `authClient.token()` returns a valid JWT string after successful signin

---

## Phase 5: User Story 3 - Protected Dashboard Access (Priority: P1)

**Goal**: Ensure the dashboard displays real user data and redirects unauthenticated users.

**Independent Test**: Navigate to `/dashboard` while logged in to see tasks; navigate while logged out to be redirected to `/signin`.

### Implementation for User Story 3

- [x] T016 [US3] Update `frontend/src/middleware.ts` to correctly detect the session cookie (check `better-auth` default name)
- [x] T017 [US3] Replace hardcoded `userId` and `token` in `frontend/src/app/dashboard/page.tsx` with values from `authClient.useSession()` and `authClient.token()`
- [x] T018 [US3] Update `fetchTasks` in `frontend/src/app/dashboard/page.tsx` to handle the case where the session is still loading
- [x] T019 [US3] Verify that `getTasks(userId, token)` successfully fetches data from the backend using the real JWT

---

## Phase 6: Polish & Final Validation

**Purpose**: Ensure a seamless user experience and robust error handling.

- [x] T020 [P] Add a "Sign Out" button to the dashboard to test session termination
- [x] T021 Verify that refreshing the dashboard page maintains the authenticated state
- [x] T022 [P] Update `specs/003-fix-auth-and-access/research.md` with final implementation notes
- [x] T023 Final walkthrough of the entire user journey (Landing -> Signup -> Signin -> Dashboard -> Signout)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Must be done first to confirm the failure.
- **Foundational (Phase 2)**: Fixes the core issues; blocks all stories.
- **User Stories (Phase 3-5)**: Sequential flow (Signup -> Signin -> Dashboard).
- **Polish (Phase 6)**: Final wrap-up.

### Parallel Opportunities

- T001, T002 (Setup verification)
- T005, T006, T007, T008 (Infrastructure fixes)
- T020, T022 (Documentation and logout utility)

---

## Implementation Strategy

### MVP First (User Story 1 & 2)

1. Fix the "plumbing" (Phase 2).
2. Ensure a user can be created (Phase 3).
3. Ensure that user can log in (Phase 4).
4. **VALIDATE**: If these work, the core auth system is functional.

### Incremental Delivery

1. Fix infrastructure -> Foundation ready.
2. Fix Signup -> New users can join.
3. Fix Signin -> Users can access their session.
4. Fix Dashboard -> Users can manage their data.
5. Add Polish -> Production-ready feel.
