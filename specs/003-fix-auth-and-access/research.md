# Research: Authentication and Access Issues

## Current State Analysis

### Frontend Issues
- **`DashboardPage.tsx`**: Uses hardcoded `userId = "temp-user-id"` and `token = "temp-token"`. This bypasses actual authentication and prevents fetching real data.
- **`auth-client.ts`**: Missing `jwtClient()` plugin. This prevents the frontend from obtaining the JWT token needed for backend API calls.
- **`api.ts`**: The `apiCall` function prepends `NEXT_PUBLIC_API_URL` but does not include the `/api` prefix that the backend router uses (`app.include_router(tasks.router, prefix="/api")`).
- **`middleware.ts`**: Relies on a specific cookie name (`better-auth.session-token`). If the cookie is not set or has a different name, the user is always redirected to `/signin`.

### Backend Issues
- **`verify_token`**: Expects a Bearer token in the `Authorization` header. If the frontend doesn't send this correctly (which it doesn't currently because of hardcoded values), access is denied (401 or 403).
- **Route Prefix**: The backend uses `/api` prefix, but the frontend's `api.ts` calls do not match this.

## Proposed Fixes

1. **Update `auth-client.ts`**: Add `jwtClient()` plugin.
2. **Update `DashboardPage.tsx`**:
   - Use `authClient.useSession()` to get the logged-in user's ID.
   - Use `authClient.token()` to get the JWT token.
   - Handle loading and unauthenticated states gracefully (redirect if no session).
3. **Update `api.ts`**: Fix the base URL to include the `/api` prefix or update the `apiCall` function.
4. **Update `middleware.ts`**: Verify the cookie name and ensure it correctly detects the session.

## Validation Strategy
- **Signup/Signin**: Manually test the signup and signin flows.
- **Dashboard Access**: Verify that authenticated users can access `/dashboard` and unauthenticated users are redirected.
- **API Calls**: Verify that tasks are correctly fetched, created, and updated using the real user ID and token.
- **Backend Logs**: Monitor backend logs for authentication failures or 404/403 errors.
