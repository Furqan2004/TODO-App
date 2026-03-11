from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from .database import engine
from .routes import tasks
# Import models to ensure they are registered with SQLModel
from .models import user, task 

app = FastAPI(title="Todo Web API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    # This creates all tables if they don't exist
    SQLModel.metadata.create_all(engine)

@app.get("/")
async def root():
    return {"message": "Welcome to the Todo Web API"}

app.include_router(tasks.router, prefix="/api")
