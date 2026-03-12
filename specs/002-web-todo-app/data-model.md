# Data Model: Web-based Multi-user Todo App

## Entities

### User (Better Auth Schema)
Represents a registered account. Managed by Better Auth.

```sql
CREATE TABLE "user" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
    image TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE session (
    id TEXT PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    token TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE account (
    id TEXT PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    scope TEXT,
    password TEXT,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE verification (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expiresAt TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP
);
```

### Task
Represents a to-do item belonging to a specific user.

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Relationships

- **One-to-Many**: One `User` can have many `Tasks`.
- **Ownership**: Every `Task` must have a `user_id` that exists in the `user` table.
- **Cascading**: If a user is deleted, all their tasks are deleted (`ON DELETE CASCADE`).

## State Transitions: Task Completion

- **Incomplete** (Default) -> **Completed**: Triggered by PATCH `/api/{user_id}/tasks/{id}/complete`.
- **Completed** -> **Incomplete**: Toggle behavior on the same endpoint.
