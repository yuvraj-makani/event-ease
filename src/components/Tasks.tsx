import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task } from '../types';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  selectedEventId: string;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks, selectedEventId }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    deadline: ''
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title && newTask.description && newTask.deadline) {
      const task: Task = {
        id: Date.now().toString(),
        eventId: selectedEventId,
        title: newTask.title,
        description: newTask.description,
        deadline: newTask.deadline,
        completed: false
      };
      
      setTasks(prev => [...prev, task]);
      setNewTask({ title: '', description: '', deadline: '' });
      setShowAddTask(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Task Manager</h2>
        <button
          onClick={() => setShowAddTask(true)}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all transform hover:scale-105"
        >
          <Plus className="w-5 h-5 mr-1" />
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-gray-500">No tasks found. Add a new task!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`bg-white rounded-xl shadow-lg p-4 space-y-2 border-l-4 ${
                task.completed ? 'border-green-500' : 'border-yellow-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold ${
                  task.completed ? 'text-green-600 line-through' : 'text-gray-800'
                }`}>
                  {task.title}
                </h3>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 text-sm">{task.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Deadline: {task.deadline}</span>
                <button
                  onClick={() => toggleTask(task.id)}
                  className="text-rose-500 hover:text-rose-700 font-semibold transition-colors"
                >
                  {task.completed ? 'Mark as Pending' : 'Mark as Done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddTask && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Add New Task</h3>
              <button 
                onClick={() => setShowAddTask(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Book a venue"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Research venue options and finalize selection"
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newTask.deadline}
                  onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:from-rose-600 hover:to-pink-700 transition-all"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;