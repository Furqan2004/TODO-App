from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from ..database import get_session
from ..models.task import Task, TaskCreate, TaskRead
from ..auth.jwt_handler import verify_token
from typing import List
from datetime import datetime

router = APIRouter(tags=["tasks"])

@router.get("/{user_id}/tasks", response_model=List[TaskRead])
async def list_tasks(
    user_id: str,
    session: Session = Depends(get_session),
    current_user = Depends(verify_token)
):
    if current_user.get("sub") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    tasks = session.exec(select(Task).where(Task.user_id == user_id)).all()
    return tasks

@router.post("/{user_id}/tasks", response_model=TaskRead, status_code=201)
async def create_task(
    user_id: str,
    task_in: TaskCreate,
    session: Session = Depends(get_session),
    current_user = Depends(verify_token)
):
    if current_user.get("sub") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    db_task = Task(user_id=user_id, **task_in.dict())
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.get("/{user_id}/tasks/{task_id}", response_model=TaskRead)
async def get_task(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(verify_token)
):
    if current_user.get("sub") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
        
    task = session.get(Task, task_id)
    if not task or task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{user_id}/tasks/{task_id}", response_model=TaskRead)
async def update_task(
    user_id: str,
    task_id: int,
    task_in: TaskCreate,
    session: Session = Depends(get_session),
    current_user = Depends(verify_token)
):
    if current_user.get("sub") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
        
    db_task = session.get(Task, task_id)
    if not db_task or db_task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    task_data = task_in.dict(exclude_unset=True)
    for key, value in task_data.items():
        setattr(db_task, key, value)
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

@router.delete("/{user_id}/tasks/{task_id}", status_code=204)
async def delete_task(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(verify_token)
):
    if current_user.get("sub") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
        
    db_task = session.get(Task, task_id)
    if not db_task or db_task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    session.delete(db_task)
    session.commit()
    return None

@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=TaskRead)
async def toggle_complete(
    user_id: str,
    task_id: int,
    session: Session = Depends(get_session),
    current_user = Depends(verify_token)
):
    if current_user.get("sub") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
        
    db_task = session.get(Task, task_id)
    if not db_task or db_task.user_id != user_id:
        raise HTTPException(status_code=404, detail="Task not found")
    
    db_task.completed = not db_task.completed
    db_task.updated_at = datetime.now()
    
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task
