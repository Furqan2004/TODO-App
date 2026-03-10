from typing import List
from .models import Task
from . import storage

def display_task(task: Task) -> None:
    """
    Prints a single task in a clean, readable format.
    Shows [ ] for pending, [x] for complete.
    """
    status_icon = "[ ]" if task.status == "pending" else "[x]"
    print(f"{task.id} | {task.title} | {task.description} | {status_icon}")

def display_all_tasks(tasks: List[Task]) -> None:
    """
    Loops through task list and calls display_task.
    Prints "No tasks found." if list is empty.
    """
    if not tasks:
        print("No tasks found.")
        return
    
    for task in tasks:
        display_task(task)

def handle_add() -> None:
    """
    Prompts user for title and description.
    Calls storage.add_task().
    Prints success confirmation.
    """
    title = input("Title: ").strip()
    description = input("Description: ").strip()
    
    try:
        task = storage.add_task(title, description)
        print(f"Success: Task {task.id} added.")
    except ValueError as e:
        print(f"Error: {e}")

def handle_list() -> None:
    """
    Calls storage.get_all_tasks().
    Calls display_all_tasks().
    """
    tasks = storage.get_all_tasks()
    display_all_tasks(tasks)

def handle_update() -> None:
    """
    Prompts user for task ID, new title, new description.
    Calls storage.update_task().
    Prints success or error message.
    """
    task_id_str = input("Task ID: ").strip()
    try:
        task_id = int(task_id_str)
        print("(Leave empty to keep existing value)")
        new_title = input("New Title: ").strip() or None
        new_description = input("New Description: ").strip() or None
        
        storage.update_task(task_id, new_title, new_description)
        print(f"Success: Task {task_id} updated.")
    except ValueError as e:
        if "invalid literal" in str(e):
             print(f"Error: Invalid task ID format: '{task_id_str}'. Please enter a number.")
        else:
             print(f"Error: {e}")

def handle_delete() -> None:
    """
    Prompts user for task ID.
    Calls storage.delete_task().
    Prints success or error message.
    """
    task_id_str = input("Task ID: ").strip()
    try:
        task_id = int(task_id_str)
        storage.delete_task(task_id)
        print(f"Success: Task {task_id} deleted.")
    except ValueError as e:
        if "invalid literal" in str(e):
             print(f"Error: Invalid task ID format: '{task_id_str}'. Please enter a number.")
        else:
             print(f"Error: {e}")

def handle_complete() -> None:
    """
    Prompts user for task ID.
    Calls storage.toggle_complete().
    Prints new status confirmation or error message.
    """
    task_id_str = input("Task ID: ").strip()
    try:
        task_id = int(task_id_str)
        task = storage.toggle_complete(task_id)
        print(f"Success: Task {task.id} status updated to {task.status}.")
    except ValueError as e:
        if "invalid literal" in str(e):
             print(f"Error: Invalid task ID format: '{task_id_str}'. Please enter a number.")
        else:
             print(f"Error: {e}")
