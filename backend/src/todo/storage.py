from typing import List, Optional
from .models import Task

_tasks: List[Task] = []
_id_counter: int = 1

def add_task(title: str, description: str) -> Task:
    """
    Creates a new Task object and appends it to the in-memory list.
    """
    global _id_counter
    if not title.strip():
        raise ValueError("Title cannot be empty.")
    
    task = Task(id=_id_counter, title=title, description=description)
    _tasks.append(task)
    _id_counter += 1
    return task

def get_all_tasks() -> List[Task]:
    """
    Returns the full in-memory task list.
    """
    return _tasks

def update_task(task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Task:
    """
    Finds task by ID in memory and updates title and/or description.
    """
    task = _get_task_by_id(task_id)
    if title is not None:
        if not title.strip():
            raise ValueError("Title cannot be empty.")
        task.title = title
    if description is not None:
        task.description = description
    return task

def delete_task(task_id: int) -> Task:
    """
    Finds task by ID in memory and removes it from the list.
    """
    task = _get_task_by_id(task_id)
    _tasks.remove(task)
    return task

def toggle_complete(task_id: int) -> Task:
    """
    Finds task by ID in memory and flips status between "pending" and "complete".
    """
    task = _get_task_by_id(task_id)
    task.status = "complete" if task.status == "pending" else "pending"
    return task

def _get_task_by_id(task_id: int) -> Task:
    """
    Helper to find a task by ID. Raises ValueError if not found.
    """
    for task in _tasks:
        if task.id == task_id:
            return task
    raise ValueError(f"Task ID {task_id} not found.")
