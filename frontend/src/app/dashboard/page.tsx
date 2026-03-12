"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from "@/lib/api";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Task, TaskCreate } from "@/lib/types";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Toast, useToast } from "@/components/Toast";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const router = useRouter();
  
  const hasInitialFetched = useRef(false);
  const isFetchingRef = useRef(false);

  const { data: session, isPending } = authClient.useSession();

  const fetchTasks = useCallback(async (userId: string) => {
    if (isFetchingRef.current) return;
    
    try {
      isFetchingRef.current = true;
      setLoading(true);
      
      const tokenRes = await authClient.token();
      if (tokenRes.error || !tokenRes.data?.token) {
        showToast("Could not retrieve auth token", "error");
        return;
      }
      
      const data = await getTasks(userId, tokenRes.data.token);
      setTasks(data);
      hasInitialFetched.current = true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, "error");
      } else {
        showToast("An unknown error occurred", "error");
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [showToast]);

  // Handle initial fetch and auth redirect
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      router.push("/signin");
      return;
    }

    if (!hasInitialFetched.current && !isFetchingRef.current) {
      fetchTasks(session.user.id);
    }
  }, [session, isPending, fetchTasks, router]);

  const handleCreate = async (data: TaskCreate) => {
    if (!session?.user) return;
    try {
      const tokenRes = await authClient.token();
      await createTask(session.user.id, tokenRes.data?.token || "", data);
      showToast("Task created successfully!", "success");
      fetchTasks(session.user.id);
      setShowForm(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, "error");
      }
    }
  };

  const handleUpdate = async (data: TaskCreate) => {
    if (!editingTask || !session?.user) return;
    try {
      const tokenRes = await authClient.token();
      await updateTask(session.user.id, tokenRes.data?.token || "", editingTask.id, data);
      showToast("Task updated successfully!", "success");
      fetchTasks(session.user.id);
      setEditingTask(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, "error");
      }
    }
  };

  const handleDelete = async () => {
    if (!session?.user || taskToDelete === null) return;
    try {
      const tokenRes = await authClient.token();
      await deleteTask(session.user.id, tokenRes.data?.token || "", taskToDelete);
      showToast("Task deleted", "info");
      fetchTasks(session.user.id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, "error");
      }
    } finally {
      setTaskToDelete(null);
    }
  };

  const handleToggle = async (id: number) => {
    if (!session?.user) return;
    try {
      const tokenRes = await authClient.token();
      await toggleTask(session.user.id, tokenRes.data?.token || "", id);
      fetchTasks(session.user.id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, "error");
      }
    }
  };

  if (isPending) return <div className="p-8 bg-gray-50 min-h-screen text-gray-800">Loading session...</div>;
  
  if (!session && !isPending) return null; // Will redirect in useEffect

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      
      <ConfirmModal 
        isOpen={taskToDelete !== null}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setTaskToDelete(null)}
      />

      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">My Dashboard</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowForm(true)} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-blue-700 transition-colors"
            >
              + New Task
            </button>
            <button 
              onClick={async () => {
                await authClient.signOut();
                router.push("/signin");
              }} 
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-bold shadow-sm hover:bg-gray-300 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

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
          {loading && tasks.length === 0 ? (
             <div className="text-center py-12">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No tasks yet. Click "+ New Task" to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={handleToggle} 
                onDelete={(id) => setTaskToDelete(id)} 
                onEdit={setEditingTask}
              />
            ))
          )}
          {loading && tasks.length > 0 && (
            <div className="text-center py-4 text-gray-500 animate-pulse">Refreshing tasks...</div>
          )}
        </div>
      </div>
    </div>
  );
}
