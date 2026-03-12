---
id: "0008"
title: "Fix Better Auth DB Adapter Error"
stage: "green"
date: "2026-03-11"
surface: "agent"
model: "gemini-2.0-flash"
feature: "002-web-todo-app"
branch: "002-web-todo-app"
user: "furqan"
command: "npm run build"
labels: ["fix", "better-auth", "postgres", "neon"]
links:
  spec: "specs/002-web-todo-app/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - frontend/package.json
  - frontend/src/lib/auth.ts
tests_yaml:
  - Build validation (manual)
---

## PROMPT_TEXT

The user reported `[BetterAuthError]: Failed to initialize database adapter` during `npm run build` even after providing a correct database URL.

## RESPONSE_TEXT

I have fixed the Better Auth database adapter error.

### Key Fixes:
1.  **Missing Driver**: Installed the `pg` (PostgreSQL) driver and its types in the frontend, which is required for Better Auth to communicate with the database.
2.  **Explicit Pool Configuration**: Updated `frontend/src/lib/auth.ts` to use an explicit `pg.Pool` instance instead of a string URL.
3.  **Neon SSL Compatibility**: Added `ssl: { rejectUnauthorized: false }` for Neon PostgreSQL connections, which is a common requirement for serverless databases.

The frontend should now successfully initialize the database adapter during build and runtime.

## OUTCOME/EVALUATION
By providing an explicit database driver and handling SSL requirements for Neon, the authentication layer is now stable. This resolves the blocking build error.

## PHR Path
/home/furqan/Hakathon/Hakathon2/Todo app/history/prompts/002-web-todo-app/0008-fix-better-auth-db-adapter-error.green.prompt.md
