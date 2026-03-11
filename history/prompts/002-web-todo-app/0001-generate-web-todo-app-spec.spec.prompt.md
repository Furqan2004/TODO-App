---
id: "0001"
title: "Generate Web Todo App Spec"
stage: "spec"
date: "2026-03-11"
surface: "agent"
model: "gemini-2.0-flash"
feature: "002-web-todo-app"
branch: "002-web-todo-app"
user: "furqan"
command: "/sp.specify"
labels: ["spec", "web-todo-app", "phase-ii"]
links:
  spec: "specs/002-web-todo-app/spec.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - specs/002-web-todo-app/spec.md
  - specs/002-web-todo-app/checklists/requirements.md
tests_yaml:
  - Acceptance Scenarios defined in spec.md
---

## PROMPT_TEXT

# Phase II: Todo Full-Stack Web App — SPECS > Yeh file sirf batati hai ke **KYA banana hai**. Kaise banana hai woh alag plan.md mein hai. --- ## PROJECT KYA HAI Console-based Todo app ko ek **modern multi-user web application** mein convert karna hai jisme: - Har user apna alag account banaye - Data permanently save rahe (database mein) - REST API ke zariye frontend aur backend communicate karein - Sirf logged-in user apna data dekhe --- ## FEATURES (Kya Banana Hai) Yeh **5 core features** web app ke tor par implement karni hain: 1. Task create karna 2. Saari tasks ki list dekhna 3. Ek specific task ki detail dekhna 4. Task ko edit/update karna 5. Task delete karna 6. Task ko complete/incomplete toggle karna --- ## TECHNOLOGY STACK | Layer | Technology | |-------|-----------| | Frontend | Next.js 16+ (App Router) | | Backend | Python FastAPI | | ORM | SQLModel | | Database | Neon Serverless PostgreSQL | | Authentication | Better Auth | | Dev Workflow | Claude Code + Spec-Kit Plus | --- ## API ENDPOINTS | Method | Endpoint | Kya Karta Hai | |--------|----------|---------------| | GET | `/api/{user_id}/tasks` | Us user ki saari tasks return karo | | POST | `/api/{user_id}/tasks` | Naya task create karo | | GET | `/api/{user_id}/tasks/{id}` | Ek specific task ki detail do | | PUT | `/api/{user_id}/tasks/{id}` | Task ko update karo | | DELETE | `/api/{user_id}/tasks/{id}` | Task delete karo | | PATCH | `/api/{user_id}/tasks/{id}/complete` | Complete/incomplete toggle karo | ### Har Endpoint Ki Request/Response **GET /api/{user_id}/tasks** ```json Response: [ { "id": 1, "title": "Groceries lao", "completed": false, "user_id": "abc123" }, { "id": 2, "title": "Email bhejo", "completed": true, "user_id": "abc123" } ] ``` **POST /api/{user_id}/tasks** ```json Request Body: { "title": "Naya kaam", "description": "Optional detail" } Response (201 Created): { "id": 3, "title": "Naya kaam", "completed": false, "user_id": "abc123" } ``` **GET /api/{user_id}/tasks/{id}** ```json Response: { "id": 1, "title": "Groceries lao", "completed": false, "description": "..." } ``` **PUT /api/{user_id}/tasks/{id}** ```json Request Body: { "title": "Updated title", "description": "Updated detail", "completed": false } Response: Updated task object ``` **DELETE /api/{user_id}/tasks/{id}** ``` Response: 204 No Content ``` **PATCH /api/{user_id}/tasks/{id}/complete** ```json Response: { "id": 1, "completed": true } ``` ### Error Codes | Code | Matlab | |------|--------| | 401 | JWT token nahi diya ya invalid hai | | 403 | Doosre user ka data access karne ki koshish | | 404 | Task exist nahi karti | | 422 | Request ka data galat format mein hai | --- ## AUTHENTICATION SPECS ### Kya Hona Chahiye - User **signup** kar sake (email + password) - User **signin** kar sake - Login hone par **JWT token** mile - JWT token har API request ke saath bheja jaye header mein - Backend token verify kare aur user identify kare ### JWT Token Flow ``` User Login Kare ↓ Better Auth JWT token banaye ↓ Frontend har API call mein bheje: Header: Authorization: Bearer <token> ↓ FastAPI token verify kare ↓ User ID decode kare, URL se match kare ↓ Sirf us user ka data return kare ``` ### Shared Secret Rule `BETTER_AUTH_SECRET` — yeh ek key dono jagah **same** honi chahiye: - Frontend `.env.local` mein - Backend `.env` mein --- ## DATABASE SCHEMA ### Users Table ```sql CREATE TABLE users ( id VARCHAR(255) PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, name VARCHAR(255), created_at TIMESTAMP DEFAULT NOW() ); ``` ### Tasks Table ```sql CREATE TABLE tasks ( id SERIAL PRIMARY KEY, title VARCHAR(500) NOT NULL, description TEXT, completed BOOLEAN DEFAULT FALSE, user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW() ); ``` --- ## FRONTEND PAGES | Page | URL | Kya Dikhega | |------|-----|-------------| | Landing | `/` | Welcome, login/signup buttons | | Signup | `/signup` | Account banane ka form | | Signin | `/signin` | Login form | | Dashboard | `/dashboard` | Saari tasks ki list | | Task Detail | `/tasks/[id]` | Ek task + edit option | --- ## SECURITY RULES - Har API endpoint JWT token maange - Token nahi = **401 Unauthorized** - Dusre user ka `user_id` URL mein daalo = **403 Forbidden** - Har database query `user_id` se filter ho - JWT 7 din mein expire ho --- ## ENVIRONMENT VARIABLES ### Frontend `.env.local` ``` BETTER_AUTH_SECRET=same_secret_key BETTER_AUTH_URL=http://localhost:3000 NEXT_PUBLIC_API_URL=http://localhost:8000 DATABASE_URL=postgresql://...neon.tech/dbname ``` ### Backend `.env` ``` BETTER_AUTH_SECRET=same_secret_key DATABASE_URL=postgresql://...neon.tech/dbname ``` --- ## FOLDER STRUCTURE ``` hackathon-todo/ ├── .spec-kit/ │ └── config.yaml ├── specs/ │ ├── overview.md │ ├── architecture.md │ ├── features/ │ │ ├── task-crud.md │ │ └── authentication.md │ ├── api/ │ │ └── rest-endpoints.md │ ├── database/ │ │ └── schema.md │ └── ui/ │ └── pages.md ├── CLAUDE.md ├── frontend/ │ ├── CLAUDE.md │ └── (Next.js app) ├── backend/ │ ├── CLAUDE.md │ └── (FastAPI app) ├── docker-compose.yml └── README.md ``` --- ## SPEC-KIT CONFIG ```yaml # .spec-kit/config.yaml name: hackathon-todo version: "1.0" structure: specs_dir: specs features_dir: specs/features api_dir: specs/api database_dir: specs/database ui_dir: specs/ui phases: - name: phase1-console features: [task-crud] - name: phase2-web features: [task-crud, authentication] - name: phase3-chatbot features: [task-crud, authentication, chatbot] ```

## RESPONSE_TEXT

I have completed the specification for the Web-based Multi-user Todo App.

1.  **Branch Created**: `002-web-todo-app`
2.  **Specification File**: `specs/002-web-todo-app/spec.md` - Includes prioritized user stories (Account Management, Task CRUD, Toggle Completion, Detail View), functional requirements, and measurable success criteria focused on latency, security (403 Forbidden), and data isolation.
3.  **Quality Checklist**: `specs/002-web-todo-app/checklists/requirements.md` - Validated against quality criteria (no implementation details, testable, user-focused).

The feature is ready for the planning phase (`/sp.plan`).

## OUTCOME/EVALUATION
The specification successfully captures the transition from a CLI tool to a full-stack web application. It addresses multi-user isolation, JWT-based authentication, and core CRUD features as requested. All requirements are testable and measurable.

## PHR Path
/home/furqan/Hakathon/Hakathon2/Todo app/history/prompts/002-web-todo-app/0001-generate-web-todo-app-spec.spec.prompt.md
