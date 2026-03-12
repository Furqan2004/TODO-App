# Quickstart: Web-based Multi-user Todo App

## Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local frontend dev)
- Python 3.12+ (for local backend dev)
- Neon.tech account for PostgreSQL

## Environment Setup

1. **Database**:
   - Create a project on [Neon.tech](https://neon.tech).
   - Get your `DATABASE_URL`.
   - Run the SQL scripts in `specs/002-web-todo-app/data-model.md` in the Neon SQL Editor.

2. **Backend**:
   - Create `backend/.env`:
     ```env
     DATABASE_URL=your_neon_url
     BETTER_AUTH_SECRET=a_random_32_char_string
     ```

3. **Frontend**:
   - Create `frontend/.env.local`:
     ```env
     DATABASE_URL=your_neon_url
     BETTER_AUTH_SECRET=same_32_char_string_as_backend
     BETTER_AUTH_URL=http://localhost:3000
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```

## Running the Application

### Using Docker (Recommended)
```bash
docker-compose up --build
```

### Local Development
- **Backend**:
  ```bash
  cd backend
  pip install -r requirements.txt
  uvicorn src.todo.main:app --reload
  ```
- **Frontend**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

## Access
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
