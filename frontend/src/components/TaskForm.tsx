import React, { useState } from "react";
import { Task, TaskCreate } from "@/lib/types";

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskCreate) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-6 mb-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{initialData ? "Edit Task" : "New Task"}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description (Optional)</label>
        <textarea
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full bg-white text-black min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex gap-4">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded font-bold hover:bg-green-600 transition-colors">
          {initialData ? "Save Changes" : "Create Task"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-gray-600 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
};
