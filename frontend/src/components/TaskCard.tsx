import React from "react";
import { Task } from "@/lib/types";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onToggle, onDelete, onEdit }) => {
  return (
    <div className="border p-4 mb-4 rounded shadow-sm flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mr-4"
        />
        <div>
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h3>
          {task.description && <p className="text-gray-600">{task.description}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(task)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};
