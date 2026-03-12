"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiCall } from "@/lib/api";
import { Task } from "@/lib/types";

export default function TaskDetailPage() {
  const params = useParams();
  const id = params.id;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // In a real app, userId and token would come from auth session
  const userId = "temp-user-id"; 
  const token = "temp-token";

  const fetchTask = useCallback(async () => {
    try {
      const data = await apiCall(`/${userId}/tasks/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setTask(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [userId, token, id]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  if (loading) return <div className="p-8">Loading task details...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;
  if (!task) return <div className="p-8">Task not found</div>;

  return (
    <div className="container mx-auto p-8">
      <button onClick={() => router.back()} className="mb-8 text-blue-500 hover:underline">
        &larr; Back to Dashboard
      </button>
      <div className="bg-white shadow-md rounded p-8">
        <h1 className="text-4xl font-bold mb-4">{task.title}</h1>
        <div className="flex items-center mb-4">
          <span className={`px-2 py-1 rounded text-sm ${task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
          <span className="ml-4 text-gray-500 text-sm">Created at: {new Date(task.created_at).toLocaleString()}</span>
        </div>
        <p className="text-lg text-gray-700 whitespace-pre-wrap mb-8">
          {task.description || "No description provided."}
        </p>
      </div>
    </div>
  );
}
