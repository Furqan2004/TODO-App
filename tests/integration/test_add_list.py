import pytest
from todo import storage

def test_add_and_list_flow():
    """
    Test adding tasks and listing them.
    """
    # Reset storage state for test
    storage._tasks = []
    storage._id_counter = 1
    
    # Initially empty
    assert len(storage.get_all_tasks()) == 0
    
    # Add first task
    task1 = storage.add_task("Buy milk", "Whole milk")
    assert task1.id == 1
    assert task1.title == "Buy milk"
    assert task1.status == "pending"
    
    # Add second task
    task2 = storage.add_task("Clean room", "Weekly cleanup")
    assert task2.id == 2
    
    # List tasks
    tasks = storage.get_all_tasks()
    assert len(tasks) == 2
    assert tasks[0].title == "Buy milk"
    assert tasks[1].title == "Clean room"
