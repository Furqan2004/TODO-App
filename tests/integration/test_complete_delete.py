import pytest
from todo import storage

def test_complete_and_delete_flow():
    """
    Test completing and deleting tasks.
    """
    storage._tasks = []
    storage._id_counter = 1
    
    # Add a task
    task = storage.add_task("Finish homework", "Math and Science")
    assert task.id == 1
    assert task.status == "pending"
    
    # Toggle complete
    updated_task = storage.toggle_complete(1)
    assert updated_task.status == "complete"
    
    # Toggle back to pending
    updated_task = storage.toggle_complete(1)
    assert updated_task.status == "pending"
    
    # Delete task
    deleted_task = storage.delete_task(1)
    assert deleted_task.id == 1
    assert len(storage.get_all_tasks()) == 0
    
    # Try to delete non-existent task
    with pytest.raises(ValueError, match="Task ID 1 not found."):
        storage.delete_task(1)
