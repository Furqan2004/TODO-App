# Implementation Plan: Fix authentication flow and page access

**Feature Branch**: `003-fix-auth-and-access`  
**Spec**: [specs/003-fix-auth-and-access/spec.md]  
**Status**: Draft  

## Technical Context

- **Frontend**: Next.js 16 (App Router), `better-auth` client.
- **Backend**: FastAPI, `sqlmodel`, `jose` for JWT validation.
- **Auth**: `better-auth` with `jwt` plugin and PostgreSQL adapter.
- **API**: `NEXT_PUBLIC_API_URL=http://localhost:8000`.

### Dependencies

- `better-auth` (Frontend/Backend integration)
- `better-auth/client/plugins` (JWT client plugin)
- `jose` (Backend JWT decoding)

## Constitution Check

- [x] Rule 1 — Spec First, Always
- [x] Rule 2 — No Unsolicited Additions
- [x] Rule 3 — AI Builds, Humans Architect
- [x] Rule 4 — When in Doubt, Stop and Ask
- [x] Rule 5 — Professional Grade Only
- [x] Rule 6 — One Phase at a Time
- [x] Rule 7 — Clean Code is Non-Negotiable
- [x] Rule 8 — Constitution Governs All

## Implementation Phases

### Phase 1: Authentication Core Fixes

#### 1.1 Update `auth-client.ts`
- **Action**: Add `jwtClient()` to `plugins` in `createAuthClient`.
- **Reason**: Enable the frontend to request a JWT token from the `better-auth` server.

#### 1.2 Update `DashboardPage.tsx`
- **Action**: 
  - Use `authClient.useSession()` hook to get the logged-in user's information.
  - Use `authClient.token()` to fetch the JWT token before making API calls.
  - Replace hardcoded `userId` and `token`.
- **Reason**: Connect the dashboard to the real authentication state.

#### 1.3 Update `api.ts`
- **Action**: Prefix all API calls with `/api` or update `NEXT_PUBLIC_API_URL` to `http://localhost:8000/api`.
- **Reason**: Match the backend's router prefix.

### Phase 2: Access Control & Middleware

#### 2.1 Update `middleware.ts`
- **Action**: Ensure the cookie name correctly identifies an active session.
- **Reason**: Prevent unauthorized users from reaching protected routes like `/dashboard`.

#### 2.2 Backend Token Validation Check
- **Action**: Verify `verify_token` in `backend/src/todo/auth/jwt_handler.py` correctly decodes the `sub` claim.
- **Reason**: Ensure backend security matches the frontend user ID.

## Verification Tasks

- [ ] Verify signup/signin works without errors.
- [ ] Verify unauthenticated users are redirected from `/dashboard` to `/signin`.
- [ ] Verify authenticated users can see their dashboard.
- [ ] Verify task creation/listing uses the correct `user_id` in the database.
- [ ] Verify backend correctly rejects invalid/expired tokens.

## Risks & Mitigations

- **Risk**: `better-auth` might use a different cookie name for different environments (e.g., development vs production).
- **Mitigation**: Use `authClient.getSession()` to check authentication in the middleware if cookie-only check is insufficient.
- **Risk**: Database connection errors on either frontend or backend.
- **Mitigation**: Monitor logs and ensure `DATABASE_URL` is correctly set and reachable.
