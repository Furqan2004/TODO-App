# Quickstart: CLI Todo App (Phase I)

## Prerequisites
- Python 3.13+
- `uv` package manager

## Installation
Clone the repository and navigate to the `backend/` directory:

```bash
cd backend
```

## Running the Application
Use `uv run` to start the CLI todo application:

```bash
uv run todo
```

## Basic Workflow
1. Start the app.
2. Enter `add` to create your first task.
3. Enter `list` to see your task list.
4. Enter `complete` followed by the task ID to mark it done.
5. Enter `exit` to quit.

## Troubleshooting
- **Data Persistence**: Note that all data is stored in RAM only. If you exit the application, your tasks will be lost.
- **Python Version**: Ensure you have Python 3.13+ by running `python --version`.
