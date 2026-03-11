"use client";

import { useEffect, useState, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "@/lib/api";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Task, TaskCreate } from "@/lib/types";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // In a real app, userId and token would come from auth session
  const userId = "temp-user-id"; 
  const token = "temp-token";

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks(userId, token);
      setTasks(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreate = async (data: TaskCreate) => {
    try {
      await createTask(userId, token, data);
      fetchTasks();
      setShowForm(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleUpdate = async (data: TaskCreate) => {
    if (!editingTask) return;
    try {
      await updateTask(userId, token, editingTask.id, data);
      fetchTasks();
      setEditingTask(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(userId, token, id);
      fetchTasks();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleTask(userId, token, id);
      fetchTasks();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="p-8 bg-gray-50 min-h-screen text-gray-800">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">My Dashboard</h1>
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors"
          >
            + New Task
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 shadow-sm" role="alert">
            <p>{error}</p>
          </div>
        )}

        {showForm && (
          <div className="mb-8">
            <TaskForm 
              onSubmit={handleCreate} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}

        {editingTask && (
          <div className="mb-8">
            <TaskForm 
              initialData={editingTask} 
              onSubmit={handleUpdate} 
              onCancel={() => setEditingTask(null)} 
            />
          </div>
        )}

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No tasks yet. Click "+ New Task" to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={handleToggle} 
                onDelete={handleDelete} 
                onEdit={setEditingTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
