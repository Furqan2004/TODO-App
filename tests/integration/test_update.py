import pytest
from todo import storage

def test_update_flow():
    """
    Test updating tasks.
    """
    storage._tasks = []
    storage._id_counter = 1
    
    # Add a task
    storage.add_task("Initial Title", "Initial Description")
    
    # Update title and description
    updated_task = storage.update_task(1, "New Title", "New Description")
    assert updated_task.title == "New Title"
    assert updated_task.description == "New Description"
    
    # Update only title
    updated_task = storage.update_task(1, "Updated Again", "")
    assert updated_task.title == "Updated Again"
    assert updated_task.description == "" # Per spec, empty string should update if passed
    
    # Try to update non-existent task
    with pytest.raises(ValueError, match="Task ID 5 not found."):
        storage.update_task(5, "Title", "Desc")
