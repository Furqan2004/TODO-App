from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class TaskBase(SQLModel):
    title: str = Field(max_length=500)
    description: Optional[str] = None
    completed: bool = False

class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True, foreign_key="user.id") # Referenced 'user' table
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class TaskCreate(TaskBase):
    pass

class TaskRead(TaskBase):
    id: int
    user_id: str
    created_at: datetime
    updated_at: datetime
