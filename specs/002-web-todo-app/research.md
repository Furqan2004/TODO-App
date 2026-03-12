# Research: Web-based Multi-user Todo App

## Decision: Better Auth JWT for Multi-user Isolation
- **Rationale**: Better Auth simplifies the auth flow in Next.js. By using the JWT plugin, we can pass tokens to the FastAPI backend.
- **Implementation**: Frontend uses `better-auth/plugins/jwt` with a shared `BETTER_AUTH_SECRET`. FastAPI uses `python-jose` to verify these tokens using the same secret.
- **Alternatives considered**: Auth.js (NextAuth) - Better Auth is more modern and has better TypeScript support; custom JWT - Higher maintenance and security risk.

## Decision: Neon Serverless PostgreSQL with SQLModel
- **Rationale**: Neon provides easy scaling and a free tier suitable for a hackathon. SQLModel (based on Pydantic and SQLAlchemy) allows sharing models between the API and the DB.
- **Alternatives considered**: SQLite - Not suitable for a multi-user web app; Supabase - Neon is more focused on raw PostgreSQL.

## Decision: FastAPI with Pydantic v2
- **Rationale**: Fast, type-safe, and provides automatic Swagger documentation.
- **Alternatives considered**: Django - Too heavy for a simple Todo app; Express.js - Python is preferred for the backend based on the project constitution and tech stack.

## Research Findings: JWT Verification
- **Finding**: Better Auth by default uses `HS256` for JWTs when a secret is provided.
- **Validation**: FastAPI can verify these using `jwt.decode(token, secret, algorithms=["HS256"])`.
- **Constraint**: `BETTER_AUTH_SECRET` must be exactly the same string in both `.env` (backend) and `.env.local` (frontend).

## Research Findings: Neon Connection Pooling
- **Finding**: Serverless databases can hit connection limits.
- **Recommendation**: Use SQLAlchemy's `NullPool` or a managed pool if scaling becomes an issue. For this prototype, standard `create_engine` is sufficient.
