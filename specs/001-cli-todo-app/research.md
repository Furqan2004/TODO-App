# Research: CLI Todo App (Phase I)

## Phase 0: Outline & Research

### Decision 1: Python 3.13 & Standard Library
- **Decision**: Use Python 3.13+ with strictly standard library modules (`dataclasses`, `typing`, `sys`).
- **Rationale**: Meets project requirements for no external dependencies. `dataclasses` provide a clean way to define the `Task` model with minimal boilerplate.
- **Alternatives considered**: Python 3.11/3.12 (no significant benefit over 3.13 for this simple use case).

### Decision 2: In-Memory Storage Pattern
- **Decision**: Module-level private list (`_tasks: List[Task] = []`) within `storage.py` with an `id_counter`.
- **Rationale**: Simple, efficient for the 1,000 task target, and encapsulates state within a single module. No need for complex singleton classes given the scope.
- **Alternatives considered**: Global variable in `main.py` (less clean), `dict` for O(1) lookups by ID. A `list` is sufficient for 1k tasks but a `dict` might be cleaner for ID lookups. Let's use a `List` as per prompt.

### Decision 3: CLI Loop Implementation
- **Decision**: A simple `while True` loop in `main.py` using `input()` for command entry.
- **Rationale**: Standard practice for lightweight interactive CLI tools. Provides direct user interaction without complex TUI libraries.
- **Alternatives considered**: `argparse` (better for one-off commands, less so for interactive sessions).

### Decision 4: Project Management with `uv`
- **Decision**: Use `uv` to manage the project environment (`pyproject.toml`).
- **Rationale**: `uv` is extremely fast and provides a modern workflow for Python projects even without external dependencies.
- **Alternatives considered**: `pip`, `poetry` (slower, more complex).

## Best Practices
- **Type Hinting**: Use `typing.Optional` and `typing.List` for clarity.
- **Error Handling**: Catch `ValueError` in the CLI layer to present clean error messages.
- **Naming**: Follow PEP 8 (snake_case for functions/variables, PascalCase for classes).
